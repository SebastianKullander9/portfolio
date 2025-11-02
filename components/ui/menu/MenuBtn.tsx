"use client";

import { useRef, useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import Image from "next/image";
import whiteStar from "../../../public/svgs/white-star.svg";
import BackdropMenu from "./BackdropMenu";
import "./style.css";
import gsap from "gsap";
import { useAnimationStore } from "@/store/useAnimationStore";

export default function MenuBtn() {
    const spinnerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const lenis = useLenis();
    const menuOpen = useAnimationStore((s) => s.menuOpen);
    const setMenuOpen = useAnimationStore((s) => s.setMenuOpen);

    if (!tlRef.current) {
        tlRef.current = gsap.timeline({ defaults: { duration: 0.2 }, paused: true });
    };

    useEffect(() => {
        if (!lenis) return;

        if (menuOpen) {
            lenis.stop();
        } else {
            lenis.start();
        }

        return () => {
            lenis.start();
        };
    }, [menuOpen, lenis]);

    useEffect(() => {
        if (!spinnerRef.current) return;

        setIsAnimating(true);

        const tl = gsap.timeline({
            defaults: { duration: 0.2, ease: "power2.out" },
            onComplete: () => setIsAnimating(false),
        });

        tl.to(spinnerRef.current, {
            rotate: menuOpen ? 45 : 0,
        })
        .to(spinnerRef.current, {
            "--scale": menuOpen ? 1.4 : 1,
        }, "<")
        .to(spinnerRef.current, {
            "--dot-offset": menuOpen ? "-15px" : "-3px",
        }, "<");

        tl.play();
    }, [menuOpen]);

    const handleClick = () => {
        if (isAnimating) return;
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <div className="group cursor-pointer">
                <div className="z-[9999] menu-icon" onClick={handleClick}>
                    <div ref={spinnerRef} className="menu-icon-cross absolute inset-0">
                        <div className="w-5 h-5 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 group-hover:w-8 group-hover:h-8 transform duration-300">
                            <Image src={whiteStar} alt="" width={100} height={100} />
                        </div>
                        <span className="dot top-left"></span>
                        <span className="dot top-right"></span>
                        <span className="dot bottom-left"></span>
                        <span className="dot bottom-right"></span>
                    </div>
                </div>
            </div>

            <BackdropMenu />
        </>
    );
}