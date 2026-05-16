"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { useAnimationStore } from "@/store/useAnimationStore";
import { useScrollStore } from "@/store/useScrollStore";

const isMobile =
    typeof navigator !== "undefined" && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

interface Section {
    id: string;
    top: number;
    height: number;
}

function SmoothScroll() {
    const lenis = useLenis();
    const setScroll = useAnimationStore((s) => s.setScroll);
    const setSectionScroll = useAnimationStore((s) => s.setSectionScroll);
    const scrollToSection = useScrollStore((s) => s.scrollToSection);
    const setScrollToSection = useScrollStore((s) => s.setScrollToSection);
    const pendingScroll = useScrollStore((s) => s.pendingScroll);
    const setPendingScroll = useScrollStore((s) => s.setPendingScroll);
    const menuOpen = useAnimationStore((s) => s.menuOpen);
    const sectionsRef = useRef<Section[]>([]);

    function measure() {
        sectionsRef.current = [...document.querySelectorAll("[data-scroll-section]")].map((el) => ({
            id: (el as HTMLElement).dataset.scrollSection ?? "",
            top: (el as HTMLElement).offsetTop,
            height: (el as HTMLElement).offsetHeight,
        }));
    }

    function updateSections(scrollY: number) {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const current = [...sectionsRef.current].reverse().find((s) => scrollY >= s.top);
        setSectionScroll({
            global: scrollY / totalHeight,
            section: current?.id ?? null,
            local: current ? (scrollY - current.top) / current.height : 0,
            sections: sectionsRef.current,
        });
    }

    useEffect(() => {
        measure();
        window.addEventListener("load", measure);
        window.addEventListener("resize", measure);
        return () => {
            window.removeEventListener("load", measure);
            window.removeEventListener("resize", measure);
        };
    }, []);

    useEffect(() => {
        if (!lenis) return;
        (async () => {
            const gsap = (await import("gsap")).default;
            const { default: ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);
            lenis.on("scroll", ScrollTrigger.update);
        })();
        return () => lenis.off("scroll", ScrollTrigger.update);
    }, [lenis]);

    useEffect(() => {
        if (!lenis) return;
        lenis.stop();
        return lenis.start();
    }, [lenis]);

    useEffect(() => {
        if (!lenis) return;
        lenis.on("scroll", ({ scroll }) => {
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            setScroll(scroll, maxScroll);
            updateSections(scroll);
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

    useEffect(() => {
        if (!isMobile) return;
        const handleScroll = () => {
            const scroll = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            setScroll(scroll, maxScroll);
            updateSections(scroll);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [setScroll]);

    if (isMobile) return null;
    return <ReactLenis root options={{ lerp: 0.1, duration: 1 }} />;
}

export default SmoothScroll;
