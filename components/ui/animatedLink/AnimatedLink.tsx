"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import SplitType from "gsap/SplitText";
import Link from "next/link";

interface AnimatedLinkProps {
    linkTo?: string;
    text: string;
    autoTextSize?: boolean;
    onClick?: () => void;
}

gsap.registerPlugin(SplitType);

export default function AnimatedLink({ linkTo, text, autoTextSize=true, onClick }: AnimatedLinkProps) {
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
                    { y: "-100%", stagger: 0.03 },
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

    const content = (
        <div 
            className="flex flex-row items-center gap-4 cursor-pointer w-fit group"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >   
            <div className="relative pr-1 overflow-hidden">
                <p ref={(element) => { if (element) splitRefs.current[0] = element}} className={`splitText ${autoTextSize ? "site-text-size" : ""}`}>{text}</p>
                <p ref={(element) => { if (element) splitRefs.current[1] = element}} className={`absolute splitText ${autoTextSize ? "site-text-size" : ""}`}>{text}</p>
            </div>
        </div>
    );

    if (linkTo) {
        return (
            <Link href={linkTo} className="flex">
                {content}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className="flex">
            {content}
        </button>
    );
}