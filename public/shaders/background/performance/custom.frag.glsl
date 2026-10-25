precision mediump float;

varying vec2 vUv;

#include <background_gradient>

void main() {
  gl_FragColor = vec4(backgroundGradient(vUv), 1.0);
}
