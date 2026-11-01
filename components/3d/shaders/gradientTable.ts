export type Rgb = [number, number, number];

export type GradientBlob = { color: Rgb; radius: number; strength: number };

export type GradientTable = { base: Rgb; blobs: GradientBlob[] };

/**
 * The background's blobs (colour, radius, strength), read from gradient.glsl so it stays the one source
 * of truth. The plane runs that GLSL as written. Materials that need a blurred or per-channel version
 * of the gradient, and the lights that follow it, use this table instead.
 *
 * Expects the lab's export format: `vec3 name = vec3(r, g, b);` colours, `vec3 color = base;`, then one
 * `color = mix(color, name, bgBlob(p, uBlobPos[i], radius) * strength);` line per blob. Returns null
 * if anything is missing, so callers can fall back.
 */
export function parseGradientTable(glsl: string): GradientTable | null {
    const code = glsl.replace(/\/\/.*$/gm, "");
    const num = "(-?\\d*\\.?\\d+)";

    const palette = new Map<string, Rgb>();
    const colourLine = new RegExp(`vec3\\s+(\\w+)\\s*=\\s*vec3\\(\\s*${num}\\s*,\\s*${num}\\s*,\\s*${num}\\s*\\)\\s*;`, "g");
    for (const m of code.matchAll(colourLine)) palette.set(m[1], [Number(m[2]), Number(m[3]), Number(m[4])]);

    const base = palette.get(code.match(/vec3\s+color\s*=\s*(\w+)\s*;/)?.[1] ?? "");
    if (!base) return null;

    const blobs: GradientBlob[] = [];
    const blobLine = new RegExp(
        `color\\s*=\\s*mix\\(\\s*color\\s*,\\s*(\\w+)\\s*,\\s*bgBlob\\(\\s*p\\s*,\\s*uBlobPos\\[(\\d+)\\]\\s*,\\s*${num}\\s*\\)\\s*\\*\\s*${num}\\s*\\)\\s*;`,
        "g",
    );
    for (const m of code.matchAll(blobLine)) {
        const color = palette.get(m[1]);
        if (!color) return null;
        blobs[Number(m[2])] = { color, radius: Number(m[3]), strength: Number(m[4]) };
    }

    // Every index from 0 up must be present, in order
    if (!blobs.length || blobs.some((b) => !b) || blobs.length !== Object.keys(blobs).length) return null;
    return { base, blobs };
}
