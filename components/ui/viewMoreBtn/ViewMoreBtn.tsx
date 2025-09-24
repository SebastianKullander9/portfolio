"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import SplitType from "gsap/SplitText";
import Image from "next/image";
import svgStar from "../../../public/svgs/white-star.svg";
import Link from "next/link";

gsap.registerPlugin(SplitType);

export default function ViewMoreBtn({ linkTo }: { linkTo: string }) {
    const splitRefs = useRef<HTMLParagraphElement[]>([]);
    const splitInstances = useRef<SplitType[]>([]);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (splitRefs.current.length) {
            splitInstances.current = splitRefs.current.map(
                (element) => new SplitType(element, { type: "chars" })
            );

            tlRef.current = gsap.timeline({ paused: true });

            splitInstances.current.forEach((split) => {
                tlRef.current!.to(
                    split.chars,
                    { y: "-100%", stagger: 0.02 },
                    0
                );
            });
        }
    }, []);

    const handleEnter = () => {
        if (tlRef.current) tlRef.current.play();
    };

    const handleLeave = () => {
        if (tlRef.current) tlRef.current.reverse();
    };

    return (
        <Link href={linkTo}>
            <div 
                className="flex flex-row items-center gap-4 cursor-pointer w-fit group"
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
            >   
                <div className="relative overflow-hidden">
                    <p ref={(element) => { if (element) splitRefs.current[0] = element}} className="splitText text-lg">View More</p>
                    <p ref={(element) => { if (element) splitRefs.current[1] = element}} className=" absolute splitText text-lg">View More</p>
                    
                </div>
                <div className="relative w-9 h-9 rounded-full border-1 backdrop-blur-sm bg-white/20 group-hover:scale-85 transition-transform duration-400">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Image src={svgStar} alt="" width={20} height={20} />
                    </div>
                </div>
            </div>
        </Link>
    );
}