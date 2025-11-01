"use client";

import { ReactLenis, useLenis} from "lenis/react";
import { useEffect } from "react";
import { useAnimationStore } from "@/store/useAnimationStore";

function SmoothScroll() {
    const lenis = useLenis();
    const setScroll = useAnimationStore((s) => s.setScroll);

    useEffect(() => {
        if (!lenis) return;
        lenis.stop();
        return lenis.start();
    }, [lenis]);

    useEffect(() => {
        if(!lenis) return;

        /*const currentScroll = lenis.scroll;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        setScroll(currentScroll, maxScroll);*/

        lenis.on("scroll", ({ scroll }) => {
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            setScroll(scroll, maxScroll);
        });
    }, [setScroll, lenis]);

    return <ReactLenis root options={{ lerp: 0.1, duration: 1 }} />
}

export default SmoothScroll;