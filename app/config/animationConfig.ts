import { chromaticAberration } from "three/examples/jsm/tsl/display/ChromaticAberrationNode.js"

export const canvasConfig = {
    CAMERA: {
        position: [0, 0, 5] as [number, number, number],
    },
    DIRECTIONALLIGHT: {
        position: [0, 3, 2] as [number, number, number],
        intensity: 3,
    },
    SCROLLCONTROLS: {
        pages: 6,
        damping: 0,
    }
}

export const slidingTextConfig = {
    TEXT: "Sebastian Kullander Frontend Developer ",
    FONTSIZE: 0.025,
    CHARWITHESTIMATE: 1.2,
    SLIDINGSPEED: 0.0004,
    CLIPTEXTATY: 0.023,
    SCALETEXTMULTIPLIER: 20,
    TEXTPOSITIONX: 4.7,
}

export const planeConfig = {
    UNIFORMS: {
        uTime: 0,
        incline: 0,
        amplitude: 0,
        uSpeed: 0.15,
    },
    PLANE: {
        position: [0, 0, 4.5] as [number, number, number],
        rotation: [0, 0, 0] as [number, number, number],
        geometry: [4, 4, 25, 25] as [number, number, number, number],
    }
}

export const modelConfig = {
    INITIALPOSITIONY: -0.05,
    BOBBINGDISTANCE: 0.0025,
    BOBBINGSPEED: 4,
    MATERIAL: {
        thickness: 0,
        roughness: 0.2,
        transmisson: 1.0,
        ior: 1.8,
        chromaticAberration: 0,
    },
    POSITION: [0, 0, 4.75] as [number, number, number],
    SCALE: [0.1, 0.1, 0.1] as [number, number, number],
}
