import localFont from "next/font/local";

// Every web font, self-hosted by Next: no request to a font CDN, and each fallback is metric-matched
// so text doesn't jump when the font arrives. The role tokens (body, display, special) that use these
// live in app/styles/tokens/typography.css.

// Satoshi, for body text. One variable file covers every weight from 300 to 900
export const satoshi = localFont({
    src: "../public/fonts/satoshi/Satoshi-Variable.woff2",
    weight: "300 900",
    variable: "--font-satoshi",
    display: "swap",
});

// TeX Gyre Heros, a free Helvetica, for headings and very large text.
// It has no medium weight, so font-medium shows as regular
export const heros = localFont({
    src: [
        { path: "../public/fonts/tg-heros/texgyreheros-regular.woff2", weight: "400", style: "normal" },
        { path: "../public/fonts/tg-heros/texgyreheros-italic.woff2", weight: "400", style: "italic" },
        { path: "../public/fonts/tg-heros/texgyreheros-bold.woff2", weight: "700", style: "normal" },
        { path: "../public/fonts/tg-heros/texgyreheros-bolditalic.woff2", weight: "700", style: "italic" },
    ],
    variable: "--font-heros",
    display: "swap",
});

// tanPearl, for the italic special headings
export const tanPearl = localFont({
    src: "../public/fonts/tan-pearl.otf",
    variable: "--font-tanpearl",
    display: "swap",
});

export const fontVariables = `${satoshi.variable} ${heros.variable} ${tanPearl.variable}`;
