"use client";

import gsap from "gsap";
import { useEffect, useState } from "react";

export default function SmoothCursor() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const hasMouse = window.matchMedia("(pointer:fine)").matches;

        setIsDesktop(hasMouse);
    }, []);

    useEffect(() => {
        if (!isDesktop) return;

        gsap.set(".cursor", { xPercent:-50, yPercent: -50 });

        const cursor = document.querySelector(".cursor");

        let mouseX;
        let mouseY;

        window.addEventListener("mousemove", e => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            gsap.to(cursor, { duration: 0.25, x: mouseX, y: mouseY });

            if (e.target instanceof HTMLElement) {
                const interactive = e.target.closest("a, button, input, textarea, select, [role='button'], [data-interactive]");

                if (interactive && interactive.matches("a, button, input, textarea, select, [role='button'], img")) {
                    gsap.to(cursor, { scale: 0.5, duration: 0.3, ease: "power2.out" });

                } else {
                    gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" });
                }
            }
        });
    }, [isDesktop]);

    if (!isDesktop) return null;

    return (
        <div
            className="cursor w-10 h-10 border-1 border-pink-100 rounded-full z-[9999]  fixed top-0 left-0 pointer-events-none"
        />
    )
}