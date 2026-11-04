"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getImageProps } from "next/image";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import type { Project } from "./cardData";
import ProjectLinks from "./ProjectLinks";
import ProjectTech from "./ProjectTech";
import SimpleButton, { CloseIcon } from "@/components/ui/buttons/simpleButton/SimpleButton";

interface ProjectViewerProps {
    project: Project;
    onClose: () => void;
}

// The card unfolds from a line across its middle: top and bottom edges move out together, and the content stays
// still (it's revealed, not stretched). A clip rather than a scale for that reason, and it keeps the corners round
const COLLAPSED = "inset(50% 0% 50% 0% round 1.5rem)";
const EXPANDED = "inset(0% 0% 0% 0% round 1.5rem)";
const OPEN = { duration: 0.15, ease: [0.25, 0.1, 0.75, 0.9] } as const;
const CLOSE = { duration: 0.125, ease: [0.25, 0.1, 0.75, 0.9] } as const;
// How long (ms) a slow image can hold the card back before it opens without it
const MAX_IMAGE_WAIT = 800;

/**
 * A project's expanded image, opened like a big card over the page: inset by the site's padding on every side. The wide image on landscape screens, anchored left where its scene is,
 * and the tall one on portrait screens, anchored to the top. Closes on a click outside it, its close button or Escape.
 * Rendered into <body>, so the carousel's stacking and clipping don't apply to it. Render it inside AnimatePresence,
 * which keeps it mounted while it collapses
 */
export default function ProjectViewer({ project, onClose }: ProjectViewerProps) {
    const lenis = useLenis();
    const imageRef = useRef<HTMLImageElement>(null);
    const [imageReady, setImageReady] = useState(false);

    // The page doesn't scroll underneath while it's open
    useEffect(() => {
        lenis?.stop();
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => {
            lenis?.start();
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [lenis, onClose]);

    // The first open has to fetch the image. The blur fades in straight away, and the card waits so it doesn't
    // unfold empty and then pop the image in
    useEffect(() => {
        const show = () => setImageReady(true);
        const timeout = setTimeout(show, MAX_IMAGE_WAIT);
        imageRef.current?.decode().then(show, show);
        return () => clearTimeout(timeout);
    }, []);

    // One <img> that switches file with the screen's orientation, so only the one that's shown is downloaded
    const common = { alt: project.title, sizes: "100vw", priority: true };
    const {
        props: { srcSet: desktop },
    } = getImageProps({ ...common, src: project.expanded.desktop });
    const {
        props: { srcSet: mobile, ...img },
    } = getImageProps({ ...common, src: project.expanded.mobile });

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            onClick={onClose}
            className="fixed inset-0 z-[60] cursor-pointer touch-none overscroll-contain site-y-padding site-x-padding"
        >
            {/* Its own layer, so only the blur fades. Fading the card too would show the page through it */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: OPEN }}
                exit={{ opacity: 0, transition: CLOSE }}
                className="absolute inset-0 backdrop-blur-md"
            />
            {/* Clicks on the card itself don't close it, only clicks around it or the button */}
            <motion.div
                onClick={(event) => event.stopPropagation()}
                initial={{ clipPath: COLLAPSED }}
                animate={{ clipPath: imageReady ? EXPANDED : COLLAPSED, transition: OPEN }}
                exit={{ clipPath: COLLAPSED, transition: CLOSE }}
                className="relative h-full w-full overflow-hidden cursor-default"
            >
                <picture>
                    <source media="(orientation: landscape)" srcSet={desktop} />
                    <source media="(orientation: portrait)" srcSet={mobile} />
                    <img
                        {...img}
                        ref={imageRef}
                        alt={project.title}
                        className="h-full w-full object-cover landscape:object-left portrait:object-top"
                    />
                </picture>
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-white">
                    <SimpleButton icon={<CloseIcon />} onClick={onClose} label="Close" autoFocus />
                </div>
                <p className="absolute top-4 right-4 sm:top-6 sm:right-6 body-large leading-none text-white">
                    {project.id}
                </p>
                {/* The right half on landscape screens, beside the scene. The bottom half on portrait screens,
                    under it, reaching a little up over the scene for its fade. Scrolls if the text is longer than
                    the space (data-lenis-prevent lets the wheel through while the page's smooth scroll is stopped) */}
                <div
                    data-lenis-prevent
                    className="project-text absolute overflow-y-auto overscroll-contain touch-pan-y text-white landscape:inset-y-0 landscape:right-0 landscape:w-1/2 landscape:py-28 portrait:inset-x-0 portrait:bottom-0 portrait:h-[calc(50%+2.5rem)] portrait:py-10 px-6 sm:px-10 lg:px-16"
                >
                    <div className="min-h-full flex flex-col justify-center gap-6 lg:gap-8">
                        <div className="flex items-center gap-4">
                            <h2 className="heading-3">{project.content.title}</h2>
                            <ProjectLinks links={project.links} title={project.title} />
                        </div>
                        {project.content.text.map((block, index) => (
                            <p key={index} className="body max-w-prose">
                                {block}
                            </p>
                        ))}
                        <ProjectTech tech={project.tech} />
                    </div>
                </div>
            </motion.div>
        </div>,
        document.body,
    );
}
