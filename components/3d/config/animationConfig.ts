export const canvasConfig = {
  CAMERA: {
    position: [0, 0, 5] as [number, number, number],
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
    // Flies straight toward the viewer and out of the screen as the next section's heading scrolls in
    FLYOUT: {
      // The element it's timed to: whatever has data-logo-flyout on it (the carousel's "Some of my Creations")
      ANCHOR: "[data-logo-flyout]",
      // Where the top of that element is on screen when the fly-out starts and when it's gone:
      // 1 = the bottom of the screen, 0.5 = the middle, 0 = the top. Over 1 starts before the heading is visible
      START: 1,
      END: 0.4,
      // How the logo grows as it comes at the camera (it moves, it isn't scaled): higher = it stays smaller for
      // longer, then rushes past. It reaches the camera at the end, so it leaves the screen without fading
      ZOOM: 14,
      ACCELERATION: 2, // higher = a slower start and a faster finish
      // How far to the side it ends up as it passes the camera, in the logo's world units (it's about 0.57
      // wide): negative = left. Barely moves at first, then more as it gets close
      SHIFT: -0.015,
    },
  },
  MAILHOME: {
    POSITION: [0, 2, 4.5] as [number, number, number],
    // Sits on the "Get In Touch" text (whatever has data-mail-anchor on it) and scrolls with it, at POSITION's depth
    ANCHOR: "[data-mail-anchor]",
    // Nudges it off the text's centre, in the text's own size: [0.5, 0] = its right edge, [0, 0.5] = its top
    OFFSET: [0, 0] as [number, number],
    // Trails behind the text as it comes up the screen, then catches up: where on screen it reaches the text
    // (0 = top, 0.5 = middle, 1 = bottom) and how far below the text it is as the text enters, in screen heights
    CATCHUP: 0.5,
    LAG: 0.35,
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
    // The logo and mail glass: clear glass lit by the background gradient (gradientGlassMaterial.ts)
    GRADIENT_GLASS: {
      // The glass: the background seen through the model, bent like real glass
      ior: 1.4,
      refraction: 0, // how much the glass bends the background (0 = none, 1 = physical)
      lens: -0.03, // shifts what's seen through the model: below 0 magnifies, above 0 shrinks
      dispersion: 0.03, // colour fringes, high performance tier only
      // Roughness
      frost: 0, // blurs what's seen through the model (0 = perfectly clear)
      texture: 0.14, // small surface ripples for a rougher look (0 = smooth)
      textureScale: 1, // higher = finer ripples
      // The gradient reflected all over the surface
      reflection: 1.2, // above 1, reflections are brighter than the background, like lights
      reflectionSaturation: 1.9, // colour strength of the reflections (1 = the gradient as it is)
      reflectionBlur: 0.18,
      reflectionSpread: 1.4, // how far across the screen the reflections reach, in screen heights: more colours
      fresnelPower: 5.2, // how quickly reflections fade from the edges toward the middle
      fresnelMin: 0.08, // reflection where the glass faces the camera
      // Flow: the reflections bend and swirl over the surface, even where it's straight
      flow: 0.57, // how much (0 = reflections follow the shape exactly)
      flowScale: 1.75, // higher = smaller swirls
      flowSpeed: 0.8,
      // Iridescence: pastel soap-bubble bands that shift with the viewing angle and run along the curves
      iridescence: 0.84,
      iridBands: 2.3, // how many colour bands across a curve
      iridShift: 0.2, // shifts which colours appear where
      iridPastel: 0, // 0 = the colours as picked, 1 = white
      // The film's colours, cycled in order around a curve
      iridColor1: "#ff7cc4",
      iridColor2: "#9c7dff",
      iridColor3: "#5ad4ec",
      iridColor4: "#efdc86",
      haze: 0, // lifts the body toward white, like slightly frosted glass
      rim: 0.62, // crisp light line along the silhouette
      rimSharpness: 14, // higher = thinner line
      // Highlights where the reflections catch the gradient's brightest blobs
      highlights: 0.65,
      highlightSharpness: 4,
      highlightColour: 0.56, // 0 = white highlights, 1 = the gradient's own colours
      // Colour of what's seen through the model (neutral by default)
      tint: "#ffffff",
      saturation: 2,
      brightness: 0.86,
      edgeTint: "#cfbcf0",
      thickness: 0, // how strongly the edges take on edgeTint (0 = off)
    },
  },
};
