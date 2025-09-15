"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import BackdropMenuContent from "./BackdropMenuContent";

interface BackdropMenuProps {
    isOpen: boolean;
}

export default function BackdropMenu({ isOpen }: BackdropMenuProps) {
    const menuItemsRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!menuItemsRef.current || !backdropRef.current) return;

        const items = menuItemsRef.current.querySelectorAll(".innerMenuItem");
        const tl = gsap.timeline({
            onStart: () => {
                backdropRef.current!.classList.remove("hidden");
            }
        });

        if (isOpen) {
            tl.to(backdropRef.current, {
                opacity: 1,
                duration: 0.3,
                zIndex: 49
            })
            .fromTo(
                items,
                { y: "100%" },
                {
                    y: "0%",
                    stagger: 0.1,
                    duration: 0.4,
                },
                "+=0.05"
            );
        } else {
            tl.to(items, {
                y: "-100%",
                stagger: 0.1,
                duration: 0.3,
            })
            .to(backdropRef.current, {
                opacity: 0,
                duration: 0.3,
                zIndex: -1,
                onComplete: () => {
                    backdropRef.current!.classList.add("hidden");
                }
            });
        }
    }, [isOpen]);

    return (
        <div ref={backdropRef} className="opacity-0 backdrop-blur-sm w-screen h-screen absolute inset-0 bg-pink-400/30">
            <BackdropMenuContent ref={menuItemsRef} />
        </div>
    );
}