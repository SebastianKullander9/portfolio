"use client";

import Card from "./Card";
import { data } from "./cardData";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useEffect, useRef, useState } from "react";
import CarouseLDots from "./CarouselDots";

gsap.registerPlugin(Draggable, InertiaPlugin);

export default function Carousel() {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [carouselCurve, setCarouselCurve] = useState<number>();
    const [activeIndex, setActiveIndex] = useState<number>(0);

    useEffect(() => {
        const updateCurve = () => {
            if (window.innerWidth > 1536) {
                setCarouselCurve(500);
            } else if (window.innerWidth > 1280) {
                setCarouselCurve(325);
            } else if (window.innerWidth > 1024) {
                setCarouselCurve(225);
            } else if (window.innerWidth > 768) {
                setCarouselCurve(100);
            } else if (window.innerWidth > 640) {
                setCarouselCurve(50);
            } else setCarouselCurve(33);
        }

        updateCurve();

        window.addEventListener("resize", updateCurve);

        return () => window.removeEventListener("resize", updateCurve);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !carouselCurve) return;

        setTimeout(() => {
            const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
            if (cards.length === 0) return;

            const originalSetLength = data.length;
            const wrapWidth = cards[originalSetLength - 1].offsetLeft + cards[originalSetLength - 1].offsetWidth - cards[0].offsetLeft;

            const cardData = cards.map(card => ({
                offsetLeft: card.offsetLeft,
                offsetWidth: card.offsetWidth
            }));

            const updateCardCurve = (containerX: number) => {
                const viewportCenter = window.innerWidth / 2;
                let closestIndex = 0;
                let minDistance = Infinity;
                
                cards.forEach((card, index) => {
                    if (!card) return;
                    
                    const cardLeft = cardData[index].offsetLeft + containerX;
                    const cardCenter = cardLeft + cardData[index].offsetWidth / 2;
                    const distanceFromCenter = cardCenter - viewportCenter;

                    if(Math.abs(distanceFromCenter) < minDistance) {
                        minDistance = Math.abs(distanceFromCenter);
                        closestIndex = index % originalSetLength;
                    }

                    const maxDistance = window.innerWidth;
                    const normalizedDistance = distanceFromCenter / maxDistance;
                    
                    const curveAmount = carouselCurve;
                    const translateY = Math.pow(normalizedDistance, 2) * curveAmount;
                    
                    const slope = 2 * normalizedDistance * curveAmount / maxDistance;
                    const rotation = Math.atan(slope) * (180 / Math.PI);
                    
                    gsap.set(card, {
                        y: translateY,
                        rotation: rotation
                    });
                });

                setActiveIndex(closestIndex);
            };

            const draggableInstance = Draggable.create(container, {
                type: "x",
                edgeResistance: 0,
                inertia: true,
                onDrag: function() {
                    while (this.x < -wrapWidth) {
                        this.x = this.x + wrapWidth;
                    }
                    while (this.x > 0) {
                        this.x = this.x - wrapWidth;
                    }
                    gsap.set(container, { x: this.x });
                    updateCardCurve(this.x);
                },
                onThrowUpdate: function() {
                    while (this.x < -wrapWidth) {
                        this.x = this.x + wrapWidth;
                        this.endX = this.endX + wrapWidth;
                    }
                    while (this.x > 0) {
                        this.x = this.x - wrapWidth;
                        this.endX = this.endX - wrapWidth;
                    }
                    gsap.set(container, { x: this.x });
                    updateCardCurve(this.x);
                },
                onDragEnd: function() {
                    updateCardCurve(this.x);
                },
                onThrowComplete: function() {
                    updateCardCurve(this.x);
                }
            })[0];

            updateCardCurve(0);

            const middleSetStartIndex = originalSetLength;
            const firstCardOfMiddleSet = cardData[middleSetStartIndex];
            const viewportCenter = window.innerWidth / 2;
            const initialOffset = viewportCenter - firstCardOfMiddleSet.offsetWidth / 2 - firstCardOfMiddleSet.offsetLeft;
            
            gsap.set(container, { x: initialOffset });
            draggableInstance.update();
            updateCardCurve(initialOffset);

            return () => {
                draggableInstance.kill();
            };
        }, 100);
    }, [carouselCurve]);

    const duplicatedData = [...data, ...data, ...data];

    return (
        <div className="h-full overflow-hidden flex flex-col justify-center">
            <div className="h-full flex flex-col justify-center items-center">
                <h1 className="text-white heading-3 font-normal max-w-prose leading-[1.6] xl:leading-[1.4]">Some of my <span className="special-heading heading-3 font-normal">Creations</span></h1>
            </div>
            
            <div ref={containerRef} className="flex">
                {duplicatedData.map((card, index) => {
                    return (<div 
                        ref={(el) => { cardRefs.current[index] = el }} 
                        className="w-[73vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-[45vw] 2xl:w-[33vw] flex flex-shrink-0 justify-center" 
                        key={index}
                    >
                        <Card
                            id={card.id}
                            title={card.title}
                            text={card.text}
                            tags={card.tags}
                            githubUrl={card.github}
                        />
                    </div>)
                })}
            </div>

            <div className="w-full h-full flex justify-center items-center">
                <CarouseLDots data={data} activeIndex={activeIndex} />
            </div>
        </div>
    );
}