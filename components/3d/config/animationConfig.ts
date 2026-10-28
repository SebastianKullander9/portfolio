export const pageConfig = {
    TOTALPAGES: 6.2,
};

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
    },
};

export const slidingTextConfig = {
    TEXT: "Sebastian  Kullander  Fullstack  Developer",
    FONTSIZE: 0.03,
    CHARWITHESTIMATE: 0.65,
    SLIDINGSPEED: 0.0004,
    CLIPTEXTATY: 0.023,
    SCALETEXTMULTIPLIER: 20,
    TEXTPOSITIONX: 4.8,
};

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
    },
};

export const modelConfig = {
    LOGO: {
        INITIALPOSITIONY: -0.03,
        BOBBINGDISTANCE: 0.0025,
        BOBBINGSPEED: 4,
        POSITION: {
            DESKTOP: [0.059, -0.03, 4.781] as [number, number, number],
            TABLET: [-0.02, -0.03, 4.781] as [number, number, number],
            MOBILE: [-0.02, -0.03, 4.781] as [number, number, number],
        },
        ROTATION: [0, -0.9, -0.25] as [number, number, number],
        SCALE: {
            DESKTOP: [0.1, 0.1, 0.1] as [number, number, number],
            TABLET: [0.09, 0.09, 0.09] as [number, number, number],
            MOBILE: [0.09, 0.09, 0.09] as [number, number, number],
        },
        EXIT: {
            POSITION: {
                DESKTOP: [0.025, -0.039, 4.7] as [number, number, number],
                TABLET: [0.022, -0.035, 4.68] as [number, number, number],
                MOBILE: [0.022, -0.035, 4.55] as [number, number, number],
            },
            ROTATION: [0, -0.2, 0] as [number, number, number],
            SCALE: [0.2, 0.2, 0.2] as [number, number, number],
            DRIFT: 0.05,
        },
    },
    MAILHOME: {
        POSITION: [0, 2, 4.5] as [number, number, number],
        SCALE: {
            DESKTOP: [0.015, 0.015, 0.015] as [number, number, number],
            TABLET: [0.015, 0.015, 0.015] as [number, number, number],
            MOBILE: [0.01, 0.01, 0.01] as [number, number, number],
        },
        ROTATION: [0, 0, 0] as [number, number, number],
    },
    MAILCONTACT: {
        POSITION: [0.25, 0, 4.3] as [number, number, number],
        SCALE: {
            DESKTOP: [0.03, 0.03, 0.03] as [number, number, number],
            TABLET: [0.015, 0.015, 0.015] as [number, number, number],
            MOBILE: [0.01, 0.01, 0.01] as [number, number, number],
        },
        ROTATION: [0, -1, -0.4] as [number, number, number],
        BOBBINGDISTANCE: 0.0025,
        BOBBINGSPEED: 4,
    },
    MATERIAL: {
        GLASS_MATERIAL: {
            roughness: 0.1,
            envMapIntensity: 0.6, // strength of the "dawn" environment highlights
            ior: 1.5,
            transmission: 1, // 0 = solid, 1 = background fully visible through the model
            refraction: 1, // multiplier on how much the glass bends the background (0 = no bending)
            dispersion: 0.03, // chromatic aberration, high performance tier only
            rim: 0.6, // strength of the background-coloured edge reflection
            rimSpread: 0.15, // how far the edge reflection samples from the point behind the model
        },
        COLOR: "#FFFFFF", // tints everything seen through the glass, keep close to white
    },
};
