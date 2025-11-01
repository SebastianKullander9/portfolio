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
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (!menuItemsRef.current || !backdropRef.current) return;

        const innerMenuItems = menuItemsRef.current.querySelectorAll(".innerMenuItem");
        const outerMenuItems = menuItemsRef.current.querySelectorAll(".outerMenuItem");
        const tl = gsap.timeline({
            onStart: () => {
                backdropRef.current!.classList.remove("hidden");
            }
        });

        if (tlRef.current) {
            tlRef.current.kill();
        }

        if (isOpen) {
            tl.to(backdropRef.current, {
                opacity: 1,
                duration: 0.1,
                zIndex: 9998
            })
            .fromTo(
                innerMenuItems,
                { y: "100%" },
                {
                    y: "0%",
                    stagger: 0.1,
                    duration: 0.4,
                },
                "+=0.05"
            )
            .fromTo(
                outerMenuItems,
                { y: "100%" },
                {
                    y: "0%",
                    stagger: 0.1,
                    duration: 0.4,
                },
                "<"
            );
        } else {
            tl.to(innerMenuItems, {
                y: "-100%",
                stagger: 0.1,
                duration: 0.3,
            })
            tl.to(outerMenuItems, {
                y: "-100%",
                stagger: 0.1,
                duration: 0.3,
            }, "<")
            .to(backdropRef.current, {
                opacity: 0,
                duration: 0.1,
                zIndex: -1,
                onComplete: () => {
                    backdropRef.current!.classList.add("hidden");
                }
            });
        }

        tlRef.current = tl;

    }, [isOpen]);

    return (
        <div ref={backdropRef} className="opacity-0 backdrop-blur-sm w-screen h-screen fixed inset-0 z-[9998] bg-pink-400/30">
            <BackdropMenuContent ref={menuItemsRef} />
        </div>
    );
}