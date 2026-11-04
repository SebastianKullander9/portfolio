"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Card from "./Card";
import CarouselDots from "./CarouselDots";
import ProjectViewer from "./ProjectViewer";
import { data } from "./cardData";
import { useCarousel } from "@/hooks/ui/useCarousel";

export default function Carousel() {
    const rootRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const goToRef = useCarousel(rootRef, setActiveIndex);
    const close = useCallback(() => setOpenIndex(null), []);

    return (
        <div
            ref={rootRef}
            className="relative h-full overflow-hidden flex flex-col justify-center z-[1]"
        >
            <div className="h-full flex flex-col justify-center items-center">
                <h2
                    data-logo-flyout
                    className="text-white heading-3 font-normal max-w-prose leading-[1.6] xl:leading-[1.4]"
                >
                    Some of my{" "}
                    <span className="special-heading heading-3 font-normal">Creations</span>
                </h2>
            </div>

            <div data-carousel-track className="flex">
                {data.map((project, index) => (
                    <div
                        key={project.id}
                        data-carousel-slot
                        className="w-[73vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-[45vw] 2xl:w-[34vw] flex flex-shrink-0 justify-center"
                    >
                        <Card {...project} onOpen={() => setOpenIndex(index)} />
                    </div>
                ))}
            </div>

            <div className="w-full h-full flex justify-center items-center">
                <CarouselDots
                    count={data.length}
                    activeIndex={activeIndex}
                    onSelect={(index) => goToRef.current(index)}
                />
            </div>

            {/* Rendered into <body>, so nothing here clips or covers it */}
            <AnimatePresence>
                {openIndex !== null && (
                    <ProjectViewer
                        key={data[openIndex].id}
                        project={data[openIndex]}
                        onClose={close}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
