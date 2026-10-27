// Shared by the background plane and every material that needs to "see" the background.
// Blob positions are computed once per frame on the CPU (components/3d/shaders/background.ts),
// so this function has no trig and no time-dependent precision issues.
uniform vec2 uBlobPos[16];

float bgBlob(vec2 uv, vec2 pos, float radius) {
  return 1.0 - smoothstep(0.0, radius, distance(uv, pos));
}

vec3 backgroundGradient(vec2 uv) {
  // Pastels darkened (same hues) so the white text on top stays readable, roughly 2.4-2.9:1
  vec3 base  = vec3(0.370, 0.664, 0.750);
  vec3 pink  = vec3(0.775, 0.544, 0.697);
  vec3 purp  = vec3(0.661, 0.541, 0.822);
  vec3 mint  = vec3(0.373, 0.702, 0.669);
  vec3 rose  = vec3(0.805, 0.577, 0.671);
  vec3 sky   = vec3(0.426, 0.687, 0.802);
  vec3 white = vec3(0.716, 0.716, 0.738);

  // Backup: the original, lighter pastels. Swap these in for the block above to go back.
  // vec3 base  = vec3(0.537, 0.780, 0.855);
  // vec3 pink  = vec3(0.820, 0.620, 0.750);
  // vec3 purp  = vec3(0.680, 0.580, 0.820);
  // vec3 mint  = vec3(0.550, 0.820, 0.790);
  // vec3 rose  = vec3(0.900, 0.700, 0.780);
  // vec3 sky   = vec3(0.600, 0.820, 0.920);
  // vec3 white = vec3(0.950, 0.950, 0.970);

  vec3 color = base;
  color = mix(color, pink,  bgBlob(uv, uBlobPos[0],  0.25) * 0.70);
  color = mix(color, purp,  bgBlob(uv, uBlobPos[1],  0.22) * 0.65);
  color = mix(color, mint,  bgBlob(uv, uBlobPos[2],  0.27) * 0.60);
  color = mix(color, rose,  bgBlob(uv, uBlobPos[3],  0.20) * 0.70);
  color = mix(color, sky,   bgBlob(uv, uBlobPos[4],  0.23) * 0.55);
  color = mix(color, purp,  bgBlob(uv, uBlobPos[5],  0.18) * 0.65);
  color = mix(color, white, bgBlob(uv, uBlobPos[6],  0.24) * 0.50);
  color = mix(color, mint,  bgBlob(uv, uBlobPos[7],  0.19) * 0.65);
  color = mix(color, pink,  bgBlob(uv, uBlobPos[8],  0.21) * 0.60);
  color = mix(color, white, bgBlob(uv, uBlobPos[9],  0.20) * 0.45);
  color = mix(color, sky,   bgBlob(uv, uBlobPos[10], 0.22) * 0.60);
  color = mix(color, rose,  bgBlob(uv, uBlobPos[11], 0.18) * 0.65);
  color = mix(color, white, bgBlob(uv, uBlobPos[12], 0.19) * 0.40);
  color = mix(color, purp,  bgBlob(uv, uBlobPos[13], 0.23) * 0.60);
  color = mix(color, pink,  bgBlob(uv, uBlobPos[14], 0.21) * 0.65);
  color = mix(color, white, bgBlob(uv, uBlobPos[15], 0.20) * 0.45);

  return color;
}
