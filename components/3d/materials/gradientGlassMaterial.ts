import * as THREE from "three";
import vertexShader from "../../../public/shaders/glass/gradientGlass.vert.glsl";
import fragmentShader from "../../../public/shaders/glass/gradientGlass.frag.glsl";
import { backgroundTable, backgroundUniforms } from "../shaders/background";
import { modelConfig, planeConfig } from "../config/animationConfig";

const { PLANE } = planeConfig;

export type GradientGlassSettings = typeof modelConfig.MATERIAL.GRADIENT_GLASS;

// The values every gradient glass material uses, from the config. A tuning panel can edit these and call
// applyGradientGlassSettings() (see the material playground kept outside the repo)
export const gradientGlassSettings: GradientGlassSettings = { ...modelConfig.MATERIAL.GRADIENT_GLASS };

const blobs = backgroundTable?.blobs ?? [];
const base = backgroundTable?.base ?? [0.5, 0.5, 0.5];

// The darkest and brightest of the gradient's colours, as linear luminance
const luminances = [base, ...blobs.map((b) => b.color)].map((c) => {
    const lin = new THREE.Color().setRGB(c[0], c[1], c[2], THREE.SRGBColorSpace);
    return 0.2126 * lin.r + 0.7152 * lin.g + 0.0722 * lin.b;
});

// One set of uniform objects shared by every gradient glass material, so the logo and the mail always match
const uniforms = {
    uBlobPos: backgroundUniforms.uBlobPos,
    uBlobScale: backgroundUniforms.uBlobScale,
    uBgBase: { value: new THREE.Vector3(...base) },
    uBgColor: { value: blobs.map((b) => new THREE.Vector3(...b.color)) },
    uRefractBlobs: { value: blobs.map(() => new THREE.Vector2()) },
    uReflectBlobs: { value: blobs.map(() => new THREE.Vector2()) },
    uPlaneCenter: { value: new THREE.Vector3(...PLANE.position) },
    uPlaneSize: { value: new THREE.Vector2(PLANE.geometry[0], PLANE.geometry[1]) },
    uLumRange: { value: new THREE.Vector2(Math.min(...luminances), Math.max(...luminances)) },
    uViewHalf: { value: new THREE.Vector2(16 / 18, 0.5) },
    uIor: { value: 1.5 },
    uRefraction: { value: 1 },
    uLens: { value: 0 },
    uDispersion: { value: 0 },
    uTexture: { value: 0 },
    uTextureScale: { value: 1 },
    uReflection: { value: 1 },
    uReflectionSaturation: { value: 1 },
    uReflectionSpread: { value: 0 },
    uFresnelPower: { value: 3 },
    uFresnelMin: { value: 0.04 },
    uTime: { value: 0 },
    uFlow: { value: 0 },
    uFlowScale: { value: 1 },
    uFlowSpeed: { value: 1 },
    uIridescence: { value: 0 },
    uIridBands: { value: 2 },
    uIridShift: { value: 0 },
    uIridPastel: { value: 0.3 },
    uIridColors: { value: [0, 1, 2, 3].map(() => new THREE.Vector3(1, 1, 1)) },
    uHaze: { value: 0 },
    uRim: { value: 0 },
    uRimSharpness: { value: 6 },
    uHighlights: { value: 0 },
    uHighlightSharpness: { value: 4 },
    uHighlightColour: { value: 1 },
    uTint: { value: new THREE.Vector3(1, 1, 1) },
    uSaturation: { value: 1 },
    uBrightness: { value: 1 },
    uAbsorb: { value: new THREE.Vector3() },
    uThickness: { value: 0 },
};

// Blurring a soft blob roughly widens it and lowers its peak, so a blurred gradient is the same gradient
// with every radius grown by `blur` and every strength lowered by the same ratio, which keeps its colours
function widen(out: THREE.Vector2[], blur: number) {
    blobs.forEach((b, i) => {
        const r = b.radius + Math.max(0, blur);
        out[i].set(1 / r, (b.strength * b.radius) / r);
    });
}

const tmpColor = new THREE.Color();

// The settings into the shared uniforms. They don't change while the site runs, so this happens once
export function applyGradientGlassSettings() {
    const s = gradientGlassSettings;
    widen(uniforms.uRefractBlobs.value, s.frost);
    widen(uniforms.uReflectBlobs.value, s.reflectionBlur);
    uniforms.uIor.value = s.ior;
    uniforms.uRefraction.value = s.refraction;
    uniforms.uLens.value = s.lens;
    uniforms.uDispersion.value = s.dispersion;
    uniforms.uTexture.value = s.texture;
    uniforms.uTextureScale.value = s.textureScale;
    uniforms.uReflection.value = s.reflection;
    uniforms.uReflectionSaturation.value = s.reflectionSaturation;
    uniforms.uReflectionSpread.value = s.reflectionSpread;
    uniforms.uFresnelPower.value = s.fresnelPower;
    uniforms.uFresnelMin.value = s.fresnelMin;
    uniforms.uFlow.value = s.flow;
    uniforms.uFlowScale.value = s.flowScale;
    uniforms.uFlowSpeed.value = s.flowSpeed;
    uniforms.uIridescence.value = s.iridescence;
    uniforms.uIridBands.value = s.iridBands;
    uniforms.uIridShift.value = s.iridShift;
    uniforms.uIridPastel.value = s.iridPastel;
    [s.iridColor1, s.iridColor2, s.iridColor3, s.iridColor4].forEach((hex, i) => {
        tmpColor.set(hex);
        uniforms.uIridColors.value[i].set(tmpColor.r, tmpColor.g, tmpColor.b);
    });
    uniforms.uHaze.value = s.haze;
    uniforms.uRim.value = s.rim;
    uniforms.uRimSharpness.value = s.rimSharpness;
    uniforms.uHighlights.value = s.highlights;
    uniforms.uHighlightSharpness.value = s.highlightSharpness;
    uniforms.uHighlightColour.value = s.highlightColour;
    tmpColor.set(s.tint);
    uniforms.uTint.value.set(tmpColor.r, tmpColor.g, tmpColor.b);
    uniforms.uSaturation.value = s.saturation;
    uniforms.uBrightness.value = s.brightness;
    // The edge tint is the colour after one unit of glass, so absorption is its negative log
    tmpColor.set(s.edgeTint);
    uniforms.uAbsorb.value.set(-Math.log(Math.max(tmpColor.r, 0.01)), -Math.log(Math.max(tmpColor.g, 0.01)), -Math.log(Math.max(tmpColor.b, 0.01)));
    uniforms.uThickness.value = s.thickness;
}
applyGradientGlassSettings();

let lastFrame = -1;

// Once per rendered frame, whichever material draws first: the clock and the screen's shape
function update(frame: number, aspect: number) {
    if (frame === lastFrame) return;
    lastFrame = frame;
    uniforms.uTime.value = performance.now() / 1000;
    // Half the screen in short sides: landscape is (aspect / 2, 0.5), portrait (0.5, 0.5 / aspect)
    uniforms.uViewHalf.value.set(Math.max(aspect, 1) / 2, Math.max(1 / aspect, 1) / 2);
}

/**
 * Clear glass lit by the background itself: see public/shaders/glass/gradientGlass.frag.glsl.
 * If gradient.glsl can't be read as a blob table, the models get a plain see-through white instead.
 */
export function createGradientGlassMaterial({ dispersion }: { dispersion: boolean }): THREE.Material {
    if (!blobs.length) {
        console.warn("Couldn't read the blobs from gradient.glsl, so the glass material can't follow the background");
        return new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.35 });
    }

    // Dispersion splits the bent light into colours, so without bending (or dispersion) the three lookups
    // would land on the same spot: skip them and save their cost
    const s = gradientGlassSettings;
    const splitColours = dispersion && s.refraction > 0 && s.dispersion > 0;
    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        defines: splitColours ? { BG_BLOBS: blobs.length, BG_DISPERSION: "" } : { BG_BLOBS: blobs.length },
    });
    // Like the plane, the glass outputs display colours directly
    material.toneMapped = false;
    material.onBeforeRender = (renderer, _scene, camera) =>
        update(renderer.info.render.frame, camera instanceof THREE.PerspectiveCamera ? camera.aspect : 16 / 9);

    return material;
}
