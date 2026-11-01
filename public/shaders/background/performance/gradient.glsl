// Shared by the background plane and every material that needs to "see" the background.
// Blob positions are computed once per frame on the CPU (components/3d/shaders/background.ts),
// so this function has no trig and no time-dependent precision issues.
// Positions and radii are in screen short-side units, centred on the screen.
// Tuned in the SK Gradient Lab ("First version test"). Earlier versions are kept in its library.
uniform vec2 uBlobPos[14];
uniform float uBlobScale;

float bgBlob(vec2 p, vec2 pos, float radius) {
  return 1.0 - smoothstep(0.0, radius, distance(p, pos));
}

vec3 backgroundGradient(vec2 uv) {
  vec3 base  = vec3(0.417, 0.608, 0.665);
  vec3 pink  = vec3(0.748, 0.585, 0.693);
  vec3 purp  = vec3(0.636, 0.554, 0.742);
  vec3 rose  = vec3(0.615, 0.450, 0.517);
  vec3 white = vec3(0.703, 0.703, 0.725);

  // Centred before scaling to keep mediump precision
  vec2 p = (uv - 0.5) * uBlobScale;

  vec3 color = base;
  color = mix(color, purp,  bgBlob(p, uBlobPos[0],  0.53) * 0.52);
  color = mix(color, pink,  bgBlob(p, uBlobPos[1],  0.564) * 0.46);
  color = mix(color, pink,  bgBlob(p, uBlobPos[2],  0.611) * 0.46);
  color = mix(color, white, bgBlob(p, uBlobPos[3],  0.568) * 0.80);
  color = mix(color, white, bgBlob(p, uBlobPos[4],  0.568) * 0.80);
  color = mix(color, purp,  bgBlob(p, uBlobPos[5],  0.604) * 0.52);
  color = mix(color, pink,  bgBlob(p, uBlobPos[6],  0.611) * 0.46);
  color = mix(color, rose,  bgBlob(p, uBlobPos[7],  0.491) * 0.43);
  color = mix(color, purp,  bgBlob(p, uBlobPos[8],  0.604) * 0.52);
  color = mix(color, rose,  bgBlob(p, uBlobPos[9],  0.469) * 0.43);
  color = mix(color, white, bgBlob(p, uBlobPos[10], 0.568) * 0.80);
  color = mix(color, rose,  bgBlob(p, uBlobPos[11], 0.491) * 0.43);
  color = mix(color, pink,  bgBlob(p, uBlobPos[12], 0.596) * 0.46);
  color = mix(color, white, bgBlob(p, uBlobPos[13], 0.568) * 0.80);

  return color;
}
