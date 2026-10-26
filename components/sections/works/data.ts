import frontend from "@/public/works/frontend.png";
import backend from "@/public/works/backend.png";
import creative from "@/public/works/creative.png";

export const worksData = [
  {
    eyebrow: "Interfaces",
    title: "Frontend",
    tags: "React, Next, Svelte, Vite, TypeScript, TailwindCSS, CSS Modules",
    text: "I build fast, responsive interfaces with clean component structure and attention to detail, from the first design sketch to the finished product.",
    image: frontend,
  },
  {
    eyebrow: "Systems",
    title: "Backend",
    tags: "Node, NestJS, Prisma, REST, GraphQL, PostgreSQL, MySQL, AWS",
    text: "I design APIs and data models that are typed, tested and built to grow.",
    image: backend,
  },
  {
    eyebrow: "Experiences",
    title: "Creative",
    tags: "Three.js, GSAP, Framer motion, Lenis, Blender, GIMP, InkScape",
    text: "I use motion, 3D and interaction to make websites feel alive, from smooth scroll and animation to 3D models.",
    image: creative,
  },
];
