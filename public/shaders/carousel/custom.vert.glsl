uniform float uTime;
varying vec2 vUv;

void main() {
    vUv = uv;

    float breathe = sin(uTime * 2.0 + position.x * 0.5) * 0.1;

    vec3 newPosition = position + vec3(0.0, 0.0, breathe);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}