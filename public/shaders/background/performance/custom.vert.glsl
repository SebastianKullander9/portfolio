// The gradient changes so slowly across the screen that it is evaluated once per vertex of a fine grid
// (components/3d/models/Plane.tsx) and blended across each triangle by the GPU, instead of once per
// pixel. Every pixel stays within a third of an 8-bit colour step of the per-pixel result.
varying vec3 vBgColor;

#include <background_gradient>

void main() {
  vBgColor = backgroundGradient(uv);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
