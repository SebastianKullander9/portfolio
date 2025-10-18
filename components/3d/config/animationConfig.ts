export const pageConfig = {
    TOTALPAGES: 6.2,
}

export const canvasConfig = {
    CAMERA: {
        position: [0, 0, 5] as [number, number, number],
    },
    DIRECTIONALLIGHT: {
        position: [0, 3, 5] as [number, number, number],
        intensity: 1.5,
    },
    SCROLLCONTROLS: {
        pages: 6,
        damping: 0.2,
    }
}

export const slidingTextConfig = {
    TEXT: "Sebastian  Kullander  Fullstack  Developer",
    FONTSIZE: 0.03,
    CHARWITHESTIMATE: 0.65,
    SLIDINGSPEED: 0.0004,
    CLIPTEXTATY: 0.023,
    SCALETEXTMULTIPLIER: 20,
    TEXTPOSITIONX: 4.8,
}

export const planeConfig = {
    UNIFORMS: {
        uTime: 0,
        incline: 0,
        amplitude: 0,
        uSpeed: 0.15,
    },
    PLANE: {
        position: [0, 0, 4] as [number, number, number],
        rotation: [0, 0, 0] as [number, number, number],
        geometry: [4, 4, 1, 1] as [number, number, number, number],
    }
}

export const modelConfig = {
    LOGO: {
        INITIALPOSITIONY: -0.03,
        BOBBINGDISTANCE: 0.0025,
        BOBBINGSPEED: 4,
        POSITION: {
            DESKTOP: [0.059, -0.03, 4.781] as [number, number, number],
            TABLET: [0, -0.03, 4.781] as [number, number, number],
            MOBILE: [-0.02, -0.03, 4.781] as [number, number, number],
        },
        ROTATION: [0, -0.9, -0.25] as [number, number, number],
        SCALE: {
            DESKTOP: [0.1, 0.1, 0.1] as [number, number, number],
            TABLET: [0.1, 0.1, 0.1] as [number, number, number],
            MOBILE: [0.09, 0.09, 0.09] as [number, number, number],
        },
    },
    MAIL: {
        POSITION: [0, 2, 4.5] as [number, number, number],
        SCALE: {
            DESKTOP: [0.015, 0.015, 0.015] as [number, number, number],
            TABLET: [0.015, 0.015, 0.015] as [number, number, number],
            MOBILE: [0.01, 0.01, 0.01] as [number, number, number],
        },
        ROTATION: [0, 0, 0] as [number, number, number],
    },
    MATERIAL: {
            TRANSMISSION_MATERIAL: {
            thickness: 0.9,
            roughness: 0.1,
            transmission: 1,
            ior: 0.8,
            anisotropy: 0.1,
        },
        PHYSICAL_MATERIAL: {
            metalness: 0,
            roughness: 0.05,
            transmission: 0.9,
            thickness: 0.5,
            opacity: 1,
        },
        STANDARD_MATERIAL: {
            metalness: 0,
            roughness: 0.05,
            opacity: 1,
        },
        COLOR: "#F5AEB9",
    }
}