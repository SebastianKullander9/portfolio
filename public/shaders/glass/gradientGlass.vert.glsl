// Glass lit by the background, see components/3d/materials/gradientGlassMaterial.ts
uniform float uTexture;
uniform float uTextureScale;

varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec3 vBump;
// Position on the model in world-sized units, so the reflection flow is the same size on the logo and the mail
varying vec3 vFlowPos;

void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorldPos = world.xyz;
  // The models are scaled evenly, so the model matrix keeps normals perpendicular
  vWorldNormal = normalize(mat3(modelMatrix) * normal);
  vFlowPos = position * length(modelMatrix[0].xyz) * 10.0;

  // A rougher surface: small ripples that tilt the normal, in object space so they stay put as the model moves
  vBump = vec3(0.0);
  if (uTexture > 0.0) {
    vec3 p = position * uTextureScale;
    vec3 wave = sin(p + sin(p.yzx * 1.7 + 1.3) * 1.5);
    vBump = mat3(modelMatrix) * wave * (uTexture / length(modelMatrix[0].xyz));
  }

  gl_Position = projectionMatrix * viewMatrix * world;
}
