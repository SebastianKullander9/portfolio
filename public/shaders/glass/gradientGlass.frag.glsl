// Glass lit by the background: the gradient seen through the model (bent like glass, optionally frosted),
// the same gradient reflected all over its surface, and highlights wherever that reflection catches the
// gradient's brightest blobs, in their own colours. As the blobs move, so do the reflections and highlights.
// All of it is evaluated analytically, so it's one draw per model with no render targets. BG_BLOBS, and
// BG_DISPERSION on the high tier, are set by components/3d/materials/gradientGlassMaterial.ts

varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec3 vBump;
varying vec3 vFlowPos;

// The background gradient (the blobs of gradient.glsl) as tables
uniform vec2 uBlobPos[BG_BLOBS];
uniform float uBlobScale;
uniform vec3 uBgBase;
uniform vec3 uBgColor[BG_BLOBS];
// Per blob: (1 / radius, strength), widened for frosting what's seen through the model and for the reflections
uniform vec2 uRefractBlobs[BG_BLOBS];
uniform vec2 uReflectBlobs[BG_BLOBS];
uniform vec3 uPlaneCenter;
uniform vec2 uPlaneSize;
// The darkest and brightest of the gradient's colours (linear luminance), so highlights find its brightest parts
uniform vec2 uLumRange;
// Half the visible screen, in screen short sides: reflections that reach past it are mirrored back in
uniform vec2 uViewHalf;

uniform float uIor;
uniform float uRefraction;
uniform float uLens;
uniform float uDispersion;
uniform float uReflection;
uniform float uReflectionSaturation;
uniform float uReflectionSpread;
uniform float uFresnelPower;
uniform float uFresnelMin;
uniform float uTime;
uniform float uFlow;
uniform float uFlowScale;
uniform float uFlowSpeed;
uniform float uIridescence;
uniform float uIridBands;
uniform float uIridShift;
uniform float uIridPastel;
// The film's colours, cycled in order around a curve
uniform vec3 uIridColors[4];
uniform float uHaze;
uniform float uRim;
uniform float uRimSharpness;
uniform float uHighlights;
uniform float uHighlightSharpness;
uniform float uHighlightColour;
uniform vec3 uTint;
uniform float uSaturation;
uniform float uBrightness;
uniform vec3 uAbsorb;
uniform float uThickness;

const vec3 LUMA = vec3(0.2126, 0.7152, 0.0722);

// gradient.glsl's falloff, with the radius and strength taken from a table
float bgFalloff(float d, vec2 blob) {
  float t = clamp(d * blob.x, 0.0, 1.0);
  return (1.0 - t * t * (3.0 - 2.0 * t)) * blob.y;
}

// The gradient at point p (screen short sides, centred) through one of the widened tables, in display (sRGB) values
vec3 bgGradient(vec2 p, bool reflected) {
  vec3 color = uBgBase;
  for (int i = 0; i < BG_BLOBS; i++) {
    vec2 blob = reflected ? uReflectBlobs[i] : uRefractBlobs[i];
    color = mix(color, uBgColor[i], bgFalloff(distance(p, uBlobPos[i]), blob));
  }
  return color;
}

// Three lookups in one pass over the blobs, one colour channel from each (for dispersion)
vec3 bgGradient3(vec2 uvR, vec2 uvG, vec2 uvB) {
  vec2 pR = (uvR - 0.5) * uBlobScale;
  vec2 pG = (uvG - 0.5) * uBlobScale;
  vec2 pB = (uvB - 0.5) * uBlobScale;
  vec3 color = uBgBase;
  for (int i = 0; i < BG_BLOBS; i++) {
    vec2 blob = uRefractBlobs[i];
    vec3 a = vec3(
      bgFalloff(distance(pR, uBlobPos[i]), blob),
      bgFalloff(distance(pG, uBlobPos[i]), blob),
      bgFalloff(distance(pB, uBlobPos[i]), blob)
    );
    color = mix(color, uBgColor[i], a);
  }
  return color;
}

// Where a ray from the surface hits the (flat, unrotated) background plane, in plane uv
vec2 bgPlaneUv(vec3 origin, vec3 dir) {
  float t = (uPlaneCenter.z - origin.z) / min(dir.z, -1e-4);
  return (origin.xy + dir.xy * t - uPlaneCenter.xy) / uPlaneSize + 0.5;
}

// The background point seen through the surface: refracted, then shifted by the lens amount
vec2 refractedUv(vec3 i, vec3 n, float ior) {
  return bgPlaneUv(vWorldPos, normalize(mix(i, refract(i, n, 1.0 / ior), uRefraction))) + n.xy * uLens;
}

// The film colour at phase t: the four colours in a smooth loop
vec3 iridPalette(float t) {
  t = fract(t) * 4.0;
  int k = int(t);
  return mix(uIridColors[k], uIridColors[(k + 1) % 4], smoothstep(0.0, 1.0, fract(t)));
}

vec3 toLinear(vec3 c) {
  return sRGBTransferEOTF(vec4(c, 1.0)).rgb;
}

void main() {
  vec3 n = normalize(vWorldNormal + vBump);
  vec3 i = normalize(vWorldPos - cameraPosition);
  float nv = clamp(dot(n, -i), 0.0, 1.0);

  // What's seen through the model: the background behind it, bent by the glass
  #ifdef BG_DISPERSION
    vec3 body = toLinear(bgGradient3(
      refractedUv(i, n, uIor * (1.0 - uDispersion)),
      refractedUv(i, n, uIor),
      refractedUv(i, n, uIor * (1.0 + uDispersion))
    ));
  #else
    vec3 body = toLinear(bgGradient((refractedUv(i, n, uIor) - 0.5) * uBlobScale, false));
  #endif
  body = mix(vec3(dot(body, LUMA)), body, uSaturation) * uTint * uBrightness;
  // Haze: the glass scatters a little white light, which lifts the body slightly above the background
  body = mix(body, vec3(1.0), uHaze);
  // Light crosses more glass near the edges, so they take on more of the edge tint
  body *= exp(-uAbsorb * (uThickness / max(nv, 0.15)));

  // The gradient reflected all over the surface: a little where the glass faces the camera, most at the
  // edges. Each part of the surface reflects a different part of the gradient, so the colours vary and move.
  // Past the screen's edge the gradient is only its base colour, so lookups there fold back in, like a mirror
  // A slow flowing pattern attached to the model. It bends the reflections so they swirl even where the
  // surface is straight (what's seen through stays undistorted), and streaks the iridescence
  vec3 fp = vFlowPos * uFlowScale;
  float ft = uTime * uFlowSpeed;
  vec3 w = sin(fp + vec3(ft, ft * 1.3, ft * 0.7)) + sin(fp.yzx * 1.7 - vec3(ft * 0.9, ft * 1.1, ft * 1.5));
  vec3 r = normalize(reflect(i, n) + w * uFlow);
  vec2 q = (bgPlaneUv(vWorldPos, i) - 0.5) * uBlobScale + r.xy * uReflectionSpread;
  q = abs(mod(q - uViewHalf, 4.0 * uViewHalf) - 2.0 * uViewHalf) - uViewHalf;
  vec3 env = toLinear(bgGradient(q, true));
  env = mix(vec3(dot(env, LUMA)), env, uReflectionSaturation);
  float fresnel = uFresnelMin + (1.0 - uFresnelMin) * pow(1.0 - nv, uFresnelPower);
  vec3 color = mix(body, env * uReflection, fresnel);

  // Highlights where the reflection catches the gradient's brightest blobs, in their own colours
  float bright = clamp((dot(env, LUMA) - uLumRange.x) / max(uLumRange.y - uLumRange.x, 1e-4), 0.0, 1.0);
  vec3 glow = mix(vec3(1.0), env / max(max(env.r, env.g), max(env.b, 1e-4)), uHighlightColour);
  color += glow * (uHighlights * pow(bright, uHighlightSharpness));

  // Iridescence: a thin film on the glass splits light into pastel bands that shift with the viewing angle,
  // like a soap bubble. They run along the curves, the flow pattern streaks them, and they drift slowly
  float film = (1.0 - nv) * uIridBands + dot(w, vec3(0.12, 0.08, 0.1)) + uIridShift + ft * 0.05;
  vec3 irid = mix(iridPalette(film), vec3(1.0), uIridPastel);
  float iw = uIridescence * mix(0.35, 1.0, pow(1.0 - nv, 1.5));
  // Screen blend, so the colours stay light and clear instead of muddying what's underneath
  color = 1.0 - (1.0 - color) * (1.0 - clamp(irid * iw, 0.0, 1.0));

  // A crisp light line along the silhouette
  color += uRim * pow(1.0 - nv, uRimSharpness);

  gl_FragColor = linearToOutputTexel(vec4(color, 1.0));
}
