precision mediump float;

varying vec2 vUv;
varying float vNoise;

uniform float uTime;

float blob(vec2 uv, vec2 pos, float radius) {
  return 1.0 - smoothstep(0.0, radius, distance(uv, pos));
}

vec2 orbitPos(vec2 center, float rx, float ry, float speed, float offset) {
  return vec2(
    center.x + sin(uTime * speed + offset) * rx,
    center.y + cos(uTime * speed + offset * 1.3) * ry
  );
}

void main() {
  vec3 base  = vec3(0.537, 0.780, 0.855);
  vec3 pink  = vec3(0.820, 0.620, 0.750);
  vec3 purp  = vec3(0.680, 0.580, 0.820);
  vec3 mint  = vec3(0.550, 0.820, 0.790);
  vec3 rose  = vec3(0.900, 0.700, 0.780);
  vec3 sky   = vec3(0.600, 0.820, 0.920);
  vec3 white = vec3(0.950, 0.950, 0.970);

  vec2 b1  = orbitPos(vec2(0.20, 0.30), 0.12, 0.10, 0.30, 0.00);
  vec2 b2  = orbitPos(vec2(0.75, 0.25), 0.10, 0.12, 0.25, 1.50);
  vec2 b3  = orbitPos(vec2(0.50, 0.70), 0.13, 0.09, 0.20, 3.00);
  vec2 b4  = orbitPos(vec2(0.85, 0.65), 0.09, 0.11, 0.35, 0.80);
  vec2 b5  = orbitPos(vec2(0.15, 0.75), 0.11, 0.10, 0.28, 2.20);
  vec2 b6  = orbitPos(vec2(0.60, 0.15), 0.10, 0.08, 0.22, 4.50);
  vec2 b7  = orbitPos(vec2(0.40, 0.50), 0.14, 0.12, 0.18, 1.10);
  vec2 b8  = orbitPos(vec2(0.90, 0.45), 0.08, 0.10, 0.32, 3.70);
  vec2 b9  = orbitPos(vec2(0.30, 0.55), 0.11, 0.13, 0.27, 5.10);
  vec2 b10 = orbitPos(vec2(0.65, 0.80), 0.09, 0.10, 0.31, 2.80);
  vec2 b11 = orbitPos(vec2(0.10, 0.45), 0.10, 0.09, 0.24, 1.90);
  vec2 b12 = orbitPos(vec2(0.80, 0.10), 0.12, 0.08, 0.19, 3.40);
  vec2 b13 = orbitPos(vec2(0.45, 0.20), 0.08, 0.11, 0.36, 0.60);
  vec2 b14 = orbitPos(vec2(0.25, 0.85), 0.13, 0.07, 0.23, 4.10);
  vec2 b15 = orbitPos(vec2(0.70, 0.55), 0.10, 0.12, 0.29, 2.50);
  vec2 b16 = orbitPos(vec2(0.55, 0.40), 0.09, 0.10, 0.33, 1.70);

  float d1  = blob(vUv, b1,  0.25);
  float d2  = blob(vUv, b2,  0.22);
  float d3  = blob(vUv, b3,  0.27);
  float d4  = blob(vUv, b4,  0.20);
  float d5  = blob(vUv, b5,  0.23);
  float d6  = blob(vUv, b6,  0.18);
  float d7  = blob(vUv, b7,  0.24);
  float d8  = blob(vUv, b8,  0.19);
  float d9  = blob(vUv, b9,  0.21);
  float d10 = blob(vUv, b10, 0.20);
  float d11 = blob(vUv, b11, 0.22);
  float d12 = blob(vUv, b12, 0.18);
  float d13 = blob(vUv, b13, 0.19);
  float d14 = blob(vUv, b14, 0.23);
  float d15 = blob(vUv, b15, 0.21);
  float d16 = blob(vUv, b16, 0.20);

  vec3 color = base;
  color = mix(color, pink,  d1  * 0.70);
  color = mix(color, purp,  d2  * 0.65);
  color = mix(color, mint,  d3  * 0.60);
  color = mix(color, rose,  d4  * 0.70);
  color = mix(color, sky,   d5  * 0.55);
  color = mix(color, purp,  d6  * 0.65);
  color = mix(color, white, d7  * 0.50);
  color = mix(color, mint,  d8  * 0.65);
  color = mix(color, pink,  d9  * 0.60);
  color = mix(color, white, d10 * 0.45);
  color = mix(color, sky,   d11 * 0.60);
  color = mix(color, rose,  d12 * 0.65);
  color = mix(color, white, d13 * 0.40);
  color = mix(color, purp,  d14 * 0.60);
  color = mix(color, pink,  d15 * 0.65);
  color = mix(color, white, d16 * 0.45);

  gl_FragColor = vec4(color, 1.0);
}