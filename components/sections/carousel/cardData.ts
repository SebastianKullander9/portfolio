import type { StaticImageData } from "next/image";
import lewaDesktop from "@/public/carousel/lewa/desktop-expanded.png";
import lewaMobile from "@/public/carousel/lewa/mobile-expanded.png";
import portfolioDesktop from "@/public/carousel/portfolio/desktop-expanded.png";
import portfolioMobile from "@/public/carousel/portfolio/mobile-expanded.png";
import reliweDesktop from "@/public/carousel/reliwe/desktop-expanded.png";
import reliweMobile from "@/public/carousel/reliwe/mobile-expanded.png";
import stashboxDesktop from "@/public/carousel/stashbox/desktop-expanded.png";
import stashboxMobile from "@/public/carousel/stashbox/mobile-expanded.png";

export interface ProjectLinks {
    github?: string;
    live?: string;
}

export interface Project {
    id: string;
    title: string;
    // The card in the carousel
    image: string;
    // The opened card: `desktop` is wide with the scene on the left (text goes on the right), `mobile` is tall
    // with the scene at the top (text goes below)
    expanded: { desktop: StaticImageData; mobile: StaticImageData };
    // What the opened card says: a title, then one paragraph per entry in `text`
    content: { title: string; text: string[] };
    // Shown beside the opened card's title. Leave either out, or both
    links?: ProjectLinks;
    // The technologies, listed under the text. Leave out to hide the section
    tech?: string[];
}

export const data: Project[] = [
    {
        id: "01",
        title: "Lewa Bostad",
        image: "/carousel/refined/lewa-centered.png",
        expanded: { desktop: lewaDesktop, mobile: lewaMobile },
        content: {
            title: "Lewa Bostad",
            text: [
                "What the project is and who it's for. Placeholder: replace with your own text.",
                "Your role, the stack, and what you're most proud of in it.",
            ],
        },
        // Placeholder URLs to preview the links: replace with the real ones
        links: {
            github: "https://github.com/SebastianKullander9",
            live: "https://example.com",
        },
        // Placeholder list to preview the section: replace with the real one
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    },
    {
        id: "02",
        title: "Portfolio",
        image: "/carousel/refined/portfolio-refined.png",
        expanded: { desktop: portfolioDesktop, mobile: portfolioMobile },
        content: {
            title: "Portfolio",
            text: [
                "What the project is and who it's for. Placeholder: replace with your own text.",
                "Your role, the stack, and what you're most proud of in it.",
            ],
        },
    },
    {
        id: "03",
        title: "Reliwe",
        image: "/carousel/refined/reliwe-refined.png",
        expanded: { desktop: reliweDesktop, mobile: reliweMobile },
        content: {
            title: "Reliwe",
            text: [
                "What the project is and who it's for. Placeholder: replace with your own text.",
                "Your role, the stack, and what you're most proud of in it.",
            ],
        },
    },
    {
        id: "04",
        title: "StashBox",
        image: "/carousel/refined/stashbox-refined.png",
        expanded: { desktop: stashboxDesktop, mobile: stashboxMobile },
        content: {
            title: "StashBox",
            text: [
                "What the project is and who it's for. Placeholder: replace with your own text.",
                "Your role, the stack, and what you're most proud of in it.",
            ],
        },
    },
];
