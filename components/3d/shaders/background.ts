import * as THREE from "three";
import gradientChunk from "../../../public/shaders/background/performance/gradient.glsl";

// [centerX, centerY, radiusX, radiusY, speed, offset], same order as the blobs in gradient.glsl
const BLOB_ORBITS: [number, number, number, number, number, number][] = [
    [0.2, 0.3, 0.12, 0.1, 0.3, 0.0],
    [0.75, 0.25, 0.1, 0.12, 0.25, 1.5],
    [0.5, 0.7, 0.13, 0.09, 0.2, 3.0],
    [0.85, 0.65, 0.09, 0.11, 0.35, 0.8],
    [0.15, 0.75, 0.11, 0.1, 0.28, 2.2],
    [0.6, 0.15, 0.1, 0.08, 0.22, 4.5],
    [0.4, 0.5, 0.14, 0.12, 0.18, 1.1],
    [0.9, 0.45, 0.08, 0.1, 0.32, 3.7],
    [0.3, 0.55, 0.11, 0.13, 0.27, 5.1],
    [0.65, 0.8, 0.09, 0.1, 0.31, 2.8],
    [0.1, 0.45, 0.1, 0.09, 0.24, 1.9],
    [0.8, 0.1, 0.12, 0.08, 0.19, 3.4],
    [0.45, 0.2, 0.08, 0.11, 0.36, 0.6],
    [0.25, 0.85, 0.13, 0.07, 0.23, 4.1],
    [0.7, 0.55, 0.1, 0.12, 0.29, 2.5],
    [0.55, 0.4, 0.09, 0.1, 0.33, 1.7],
];

// Shared uniform objects: the plane updates them once per frame and every material
// that includes the gradient reads the same values, so they can never drift apart.
export const backgroundUniforms = {
    uBlobPos: { value: BLOB_ORBITS.map(() => new THREE.Vector2()) },
};

export function updateBackgroundUniforms(time: number) {
    const positions = backgroundUniforms.uBlobPos.value;

    for (let i = 0; i < BLOB_ORBITS.length; i++) {
        const [cx, cy, rx, ry, speed, offset] = BLOB_ORBITS[i];
        positions[i].set(
            cx + Math.sin(time * speed + offset) * rx,
            cy + Math.cos(time * speed + offset * 1.3) * ry,
        );
    }
}

updateBackgroundUniforms(0);

export function withBackgroundGradient(shader: string) {
    return shader.replace("#include <background_gradient>", gradientChunk);
}

export { gradientChunk as backgroundGradientChunk };
