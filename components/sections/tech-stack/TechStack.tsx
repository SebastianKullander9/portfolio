"use client";

import { useEffect, useRef, useState } from "react";
import { content } from "./data"
import Image from "next/image"
import "./BorderGrid.css";
import TechCard from "./TechCard";
import gsap from "gsap";

export default function TechStack() {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    cardRefs.current = [];
    const timelineRefs = useRef<gsap.core.Timeline[]>([]);
    const [width, setWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [activeCard, setActiveCard] = useState<number | null>(null);
    const hasInitialized = useRef(false);

    useEffect(() => {
        const handleWidth = () => {
            const newWidth = window.innerWidth;
            setWidth(newWidth);
            setIsMobile(newWidth < 768);
        };
        handleWidth();

        window.addEventListener("resize", handleWidth);
        return () => window.removeEventListener("resize", handleWidth);
    }, []);

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
                width: isMobile ? "auto" : "20%",
                height: isMobile ? "20%" : "auto"
            });
        });
        
        hasInitialized.current = true;
    }, [isMobile]);
 
    useEffect(() => {
        cardRefs.current.forEach((card, index) => {
            if (!card) return;

            const listItems = card.querySelectorAll(".transformListItem");
            const transformH2 = card.querySelector(".transformH2");
            const scaleH2 = card.querySelector(".scaleH2");

            timelineRefs.current[index] = gsap.timeline({ paused: true })
                .to(scaleH2, { scaleY: 0, duration: 0.1, transformOrigin: "center center" })
                .fromTo(transformH2, { y: "-100%" }, { y: "0%", duration: 0.3, ease: "power1.out" }, "+=0.3" )
                .fromTo(listItems, { y: "-100%" }, { y: "0%", duration: 0.6, ease: "power1.out", stagger: 0.033 }, ">" )
                
        })
    }, []);

    const handleEnter = (index: number) => {
        const isMobile = width < 768;
        if (!cardRefs.current[index]) return;

        timelineRefs.current[index]?.timeScale(1).play();

        cardRefs.current.forEach((card, i) => {
            if (!card) return;

            if (i === index) {
                gsap.to(card, {
                    [isMobile ? "height" : "width"]: isMobile ? "500px" : "40%",
                    duration: 0.6, 
                    ease: "power1.out"
                });
            } else {
                gsap.to(card, {
                    [isMobile ? "height" : "width"]: isMobile ? "20vh" : "15%",
                    duration: 0.6, 
                    ease: "power1.out"
                });
            }
        })
    }

    const handleLeave = (index: number) => {
        const isMobile = width < 768;
        if (!cardRefs.current[index]) return;

        timelineRefs.current[index]?.timeScale(5).reverse();

        cardRefs.current.forEach((card) => {
            if (!card) return;

            gsap.to(card, {
                [isMobile ? "height" : "width"]: isMobile ? "20vh" : "20%",
                duration: 0.6, 
                ease: "power1.out"
            });
        })
    }

    const handleClick = (index: number) => {
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
    }

    return (
        <section className="relative w-screen md:h-screen flex flex-col text-white">
            <div className="w-full h-5/10 flex flex-col md:flex-row items-center border-b-1 border-white">
                <div className="w-full h-[33vh] md:w-1/2 md:h-full site-x-padding flex items-center justify-center">
                    <h1 className="text-4xl xl:text-7xl special-heading">MY TECH STACK</h1>
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