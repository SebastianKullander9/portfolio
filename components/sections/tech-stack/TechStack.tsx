"use client";

/* REFACTOR COMPONENT / SPLIT INTO CLIENT SERVER / CLEAN CODE */

import { content } from "./data";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import Image from "next/image";

export default function TechStack() {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    cardRefs.current = [];
    const timelines = useRef<gsap.core.Timeline[]>([]);

    useEffect(() => {
        cardRefs.current.forEach((card, i) => {
            if (!card) return;

            const heading = card.querySelector(".scaleHeading");
            const subHeading = card.querySelector(".transformHeading");
            const textId = card.querySelector(".scaleId");
            const listItems = card.querySelectorAll(".transformListItem");
            const cardImage = card.querySelector(".transformImage");

            timelines.current[i] = gsap.timeline({ paused: true })

                .to(heading, { scaleY: 0, duration: 0.1, }, "<" )

                

                //DISABLE TIMESCALE ON LEAVE FOR THIS ONE
                //.to(textId, { fontSize: "36px", duration: 0.2 }, ">" )


                .fromTo(subHeading, { y: "-100%"}, { y: "0%", duration: 0.3, ease: "power1.out"}, "+=0.3" )


                .fromTo(listItems, { y: "-100%" }, { y: "0%", duration: 0.4, stagger: 0.033 }, ">" )

                //.fromTo(cardImage, { y: "-100%" }, { y: "0%", duration: 0.7 }, "<")

                .fromTo(cardImage, 
                    {
                        clipPath: "inset(0 0 100% 0)",
                    },
                    {
                        clipPath: "inset(0 0 0% 0)",
                        duration: 0.7,
                        ease: "power1.out"
                    },
                    "<"
            );
        });
    }, []);

    const handleEnter = (index: number) => {
        if (!cardRefs.current[index]) return;

        gsap.to(cardRefs.current[index]?.querySelector(".scaleId"), {
            fontSize: "36px",
            duration: 0.6
        });

        timelines.current[index]?.timeScale(1).play();

        cardRefs.current.forEach((card, i) => {
            if (i === index) {
                gsap.to(card, { flexBasis: "40%", duration: 0.7, ease: "power1.out" });
            } else {
                gsap.to(card, { flexBasis: "15%", duration: 0.7, ease: "power1.out" });
            }
        })
    }

    const handleLeave = (index: number) => {
        if (!cardRefs.current[index]) return;

        gsap.to(cardRefs.current[index]?.querySelector(".scaleId"), {
            fontSize: "16px",
            duration: 0.6
        });

        timelines.current[index]?.timeScale(5).reverse();

        cardRefs.current.forEach((card) => {
            if (!card) return;
                gsap.to(card, { flexBasis: "20%", duration: 0.7, ease: "power1.out" 
            });
        });
    }

    return (
        <section className="w-screen h-screen">
            <div className="relative w-screen h-4/10 flex flex-row">
                <div className="w-1/2 h-full flex items-center site-x-padding">
                    <h1 className="text-white text-7xl special-heading">MY TECH STACK</h1>
                </div>

                <div className="w-1/2 h-full relative
                ">
                    <div className="w-full h-full
                                bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
                                bg-[size:60px_60px]
                                xl:bg-[size:150px_150px]
                                bg-[position:-1px_-1px]
                                mask-[linear-gradient(to_left,rgba(0,0,0,1),rgba(0,0,0,0))]
                                -webkit-mask-[linear-gradient(to_left,rgba(0,0,0,1),rgba(0,0,0,0))]"
                    ></div>

                    <Image src="/images/nanobanana-fixed.png" height={150} width={150} alt="" className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-16" />

                </div>

                
            </div>
            <div className="absolute bottom-0 w-screen h-6/10 flex text-white">
                {content.map((card, index) => 
                    <div 
                        ref={(el) => { if (el) cardRefs.current[index] = el }} key={card.id} 
                        onMouseEnter={() => handleEnter(index)} onMouseLeave={() => handleLeave(index)}
                        className="widthCard basis-[20%] h-full border-t-1 border-r-1 border-white p-8"
                    >   
                        <div className="flex flex-row justify-between uppercase pb-16 overflow-hidden items-center">
                            <p className="scaleId font-bold">{card.id}</p>
                            <h1 className="transformHeading text-4xl font-bold">{card.title}</h1>
                        </div>
                        <h1 ref={titleRef} className="scaleHeading text-4xl uppercase font-bold">{card.title}</h1>
                        <div className="flex justify-between">
                            <div className="w-1/2">
                                <ul>
                                    {card.list.map((item) => (
                                        <div key={item} className="overflow-hidden">
                                            <li className="transformListItem text-3xl/11 font-medium">{item}</li>
                                        </div>                   
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}