import * as THREE from "three";
import gradientChunk from "../../../public/shaders/background/performance/gradient.glsl";

// The camera only sees a band of the plane (about 26% of it on desktop, 7% on a phone), so the blobs
// are laid out in screen units instead of plane uv. x runs from 0 to LAYOUT_LENGTH and y from 0 to 1,
// both measured in screen short sides. On landscape screens x runs along the long side; portrait
// screens keep sliding sideways and stretch y over their long side instead.
const LAYOUT_LENGTH = 1.9;

// Multiplies every blob's orbit speed. Changes how fast they drift, not the colour balance
const BLOB_SPEED = 1.12;

// [x, y, radiusX, radiusY, speed, offset], same order as the blobs in gradient.glsl
const BLOB_ORBITS: [number, number, number, number, number, number][] = [
    [0, 0.48, 0.128, 0.128, 0.3, 0],
    [0.2, 0.86, 0.192, 0.149, 0.25, 1.5],
    [0.57, 0.19, 0.171, 0.171, 0.2, 3],
    [1.14, 0.52, 0.149, 0.192, 0.35, 0.8],
    [2.1, 0.92, 0.192, 0.149, 0.19, 2.31],
    [0.95, 0.88, 0.128, 0.128, 0.28, 2.2],
    [1.33, 0.81, 0.149, 0.192, 0.32, 3.7],
    [0.4, 0.53, 0.128, 0.128, 0.27, 5.1],
    [1.71, 0.13, 0.192, 0.149, 0.31, 2.8],
    [0.96, 0.12, 0.171, 0.171, 0.24, 1.9],
    [0.58, 0.8, 0.149, 0.192, 0.19, 3.4],
    [1.72, 0.86, 0.192, 0.149, 0.23, 4.1],
    [2.1, 0.08, 0.149, 0.192, 0.32, 4.59],
    [0.19, 0.14, 0.171, 0.171, 0.29, 2.5],
];

// Slides the whole field, in screen short sides per second. Negative slides left
const SLIDE_SPEED = 0.4;

// 0 slides every blob together, 1 makes the last blob drawn twice as fast and the first one still
const SLIDE_PARALLAX = 1;

// The layout repeats every SLIDE_LOOP along x
const SLIDE_LOOP = 2.28;

// The biggest blob radius in gradient.glsl plus a little, so a blob only wraps once it's fully off-screen
const SLIDE_MARGIN = 0.621;

// Portrait screens slide sideways too, instead of along their long side
const SLIDE_PHONE_SIDEWAYS = true;

// Shared uniform objects: the plane updates them once per frame and every material
// that includes the gradient reads the same values, so they can never drift apart.
export const backgroundUniforms = {
    uBlobPos: { value: BLOB_ORBITS.map(() => new THREE.Vector2()) },
    // Plane uv to short-side units
    uBlobScale: { value: 1 },
};

// viewWidth and viewHeight are the part of the plane the camera sees, in plane uv, centred on the plane
export function updateBackgroundUniforms(time: number, viewWidth: number, viewHeight: number) {
    const positions = backgroundUniforms.uBlobPos.value;
    const shortSide = Math.min(viewWidth, viewHeight);
    const portrait = viewWidth < viewHeight;
    const long = Math.max(viewWidth, viewHeight) / shortSide;
    const sideways = portrait && SLIDE_PHONE_SIDEWAYS;
    // Stretch the layout's long axis to the screen's actual aspect
    const stretch = long / LAYOUT_LENGTH;
    // One loop of the layout covers the screen plus a margin on each side
    const period = (sideways ? 1 : long) + 2 * SLIDE_MARGIN;

    const t = time * BLOB_SPEED;
    // time is elapsed seconds * 10
    const slid = (time / 10) * SLIDE_SPEED;

    backgroundUniforms.uBlobScale.value = 1 / shortSide;

    for (let i = 0; i < BLOB_ORBITS.length; i++) {
        const [x, y, rx, ry, speed, offset] = BLOB_ORBITS[i];
        // -1 for the first blob drawn, 1 for the last
        const depth = BLOB_ORBITS.length > 1 ? (2 * i) / (BLOB_ORBITS.length - 1) - 1 : 0;
        const orbitX = Math.sin(t * speed + offset) * rx;
        const orbitY = Math.cos(t * speed + offset * 1.3) * ry;

        let along = (x / SLIDE_LOOP - 0.5) * period + orbitX * (sideways ? 1 : stretch) + slid * (1 + SLIDE_PARALLAX * depth);
        along = ((((along + period / 2) % period) + period) % period) - period / 2;

        if (sideways) positions[i].set(along, (y - 0.5) * long + orbitY);
        else if (portrait) positions[i].set(y + orbitY - 0.5, along);
        else positions[i].set(along, y + orbitY - 0.5);
    }
}

// Placeholder until the plane's first frame reports the real view
updateBackgroundUniforms(0, 16 / 9, 1);

export function withBackgroundGradient(shader: string) {
    return shader.replace("#include <background_gradient>", gradientChunk);
}

export { gradientChunk as backgroundGradientChunk };
