"use client";

import { ReactLenis, useLenis} from "lenis/react";
import { useEffect } from "react";
import { useAnimationStore } from "@/store/useAnimationStore";
import { useScrollStore } from "@/store/useScrollStore";

function SmoothScroll() {
    const lenis = useLenis();
    const setScroll = useAnimationStore((s) => s.setScroll);
    const scrollToSection = useScrollStore((s) => s.scrollToSection);
    const setScrollToSection = useScrollStore((s) => s.setScrollToSection);
    const pendingScroll = useScrollStore((s) => s.pendingScroll);
    const setPendingScroll = useScrollStore((s) => s.setPendingScroll);
    const menuOpen = useAnimationStore((s) => s.menuOpen);

    useEffect(() => {
        if (!lenis) return;
        lenis.stop();
        return lenis.start();
    }, [lenis]);

    useEffect(() => {
        if(!lenis) return;

        lenis.on("scroll", ({ scroll }) => {
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            setScroll(scroll, maxScroll);
        });
    }, [setScroll, lenis]);

    useEffect(() => {
        if (!lenis) return;

        if (scrollToSection) {
            const element = document.getElementById(scrollToSection);
            if (element) {
            lenis.scrollTo(element, { offset: 0, duration: 2 });
            setScrollToSection(null);
            }
        }

        if (!menuOpen && pendingScroll) {
            const element = document.getElementById(pendingScroll);
            if (element) {
                lenis.scrollTo(element, { offset: 0, duration: 2 });
                setPendingScroll(null);
            }
        }
    }, [scrollToSection, pendingScroll, lenis, menuOpen, setScrollToSection, setPendingScroll]);

    return <ReactLenis root options={{ lerp: 0.1, duration: 1 }} />
}

export default SmoothScroll;