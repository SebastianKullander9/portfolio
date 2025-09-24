uniform float uVelocity;
uniform float uTime; // pass in performance.now() / 1000
varying vec2 vUv;

void main() {
    vUv = uv;

    // normalize Y from -1 → 1
    float yNorm = position.y / (3.0 / 2.0); // plane height = 3
    float curveFactor = 5.0 - yNorm * yNorm;

    // main movement based on slider velocity
    float effect = curveFactor * abs(uVelocity);
    float dragOffset = -effect * 2.3;
    float parabolaZ = -effect * 0.5;

    // --- breathing effect ---
    float breathe = sin(uTime * 2.0 + position.x * 0.5) * 0.1; 
    // uTime*2.0 → speed of breathing
    // position.x*0.5 → small phase offset per vertex for natural variation

    vec3 newPosition = position + vec3(0.0, 0.0, parabolaZ - dragOffset + breathe);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}