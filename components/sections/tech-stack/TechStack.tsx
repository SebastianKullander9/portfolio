"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { content } from "./data"
import Image from "next/image"
import "./borderGrid.css";
import TechCard from "./TechCard";
import gsap from "gsap";
import { useDomViewport } from "@/hooks/ui/useDomViewport";
import { useCardTimelines } from "@/hooks/animations/useCardTimelines";
import { useCardHeights } from "@/hooks/ui/useDetermineCardHeights";

export default function TechStack() {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    cardRefs.current = [];
    const [activeCard, setActiveCard] = useState<number | null>(null);
    const hasInitialized = useRef(false);
    const viewport = useDomViewport();
    const timelineRefs = useCardTimelines({ cardRefs });
    const { isMobile } = viewport;

    const cardHeights = useCardHeights({ cardRefs, isMobile });

    useEffect(() => {
        cardRefs.current.forEach((card) => {
            if (!card) return

            gsap.killTweensOf(card);
            gsap.set(card, { clearProps: "all" });
        });
    }, [isMobile]);

    useEffect(() => {
        if (hasInitialized.current) return;
        
        cardRefs.current.forEach((card) => {
            if (!card) return;
            
            gsap.set(card, {
                width: viewport.isMobile ? "auto" : "20%",
                height: viewport.isMobile ? "20%" : "auto"
            });
        });
        
        hasInitialized.current = true;
    }, [viewport.isMobile]);

    const animateCards = useCallback((expandedIndex: number | null) => {
        cardRefs.current.forEach((card, i) => {
            if (!card) return;
            
            let size: string;
            if (expandedIndex === null) {
                size = isMobile ? "20vh" : "20%";
            } else if (i === expandedIndex) {
                size = isMobile ? `${cardHeights[i]}px` : "40%";
            } else {
                size = isMobile ? "20vh" : "15%";
            }
            
            gsap.to(card, {
                [isMobile ? "height" : "width"]: size,
                duration: 0.6,
                ease: "power1.out"
            });
        });
    }, [isMobile, cardHeights]);

        const handleEnter = useCallback((index: number) => {
        timelineRefs.current[index]?.timeScale(1).play();
        animateCards(index);
    }, [animateCards, timelineRefs]);

    const handleLeave = useCallback((index: number) => {
        timelineRefs.current[index]?.timeScale(5).reverse();
        animateCards(null);
    }, [animateCards, timelineRefs]);

    const handleClick = useCallback((index: number) => {
        if (activeCard === index) {
            handleLeave(index);
            setActiveCard(null);
        } else {
            if (activeCard !== null) {
                handleLeave(activeCard);
            }
            handleEnter(index);
            setActiveCard(index);
        }
    }, [activeCard, handleEnter, handleLeave]);
    
    return (
        <section className="relative w-screen md:h-screen flex flex-col text-white">
            <div className="w-full h-5/10 flex flex-col md:flex-row items-center border-b-1 border-white">
                <div className="w-full h-[33vh] md:w-1/2 md:h-full site-x-padding flex items-center justify-center">
                    <h1 className="heading-1 font-normal special-heading">MY TECH STACK</h1>
                </div>
                <div className="w-full h-[33vh] md:w-1/2 md:h-full relative">
                    <div className="w-full h-full
                        bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
                        bg-[size:60px_60px]
                        xl:bg-[size:150px_150px]
                        bg-[position:-1px_-1px]
                        mask-[linear-gradient(to_left,rgba(0,0,0,1),rgba(0,0,0,0))]
                        border-grid"
                    ></div>

                    <Image src="/images/nanobanana-fixed.png" height={150} width={150} alt="" className="scale-85 md:scale-125 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-16" />
                </div>
            </div>
            <div className="w-full h-full md:h-5/10 flex flex-col md:flex-row">
                {content.map((card, index) => (
                    <TechCard
                        key={card.title}
                        id={card.id}
                        title={card.title}
                        technologies={card.list}
                        icon={card.icon}
                        onMouseEnter={isMobile ? undefined : () => handleEnter(index)}
                        onMouseLeave={isMobile ? undefined : () => handleLeave(index)}
                        onClick={isMobile ? () => handleClick(index) : undefined}
                        ref={(el) => { if (el) cardRefs.current[index] = el }}
                    />
                ))}
            </div>
        </section>
    )
}