import { useRef } from "react";
import * as THREE from "three";
import { useAnimationStore } from "@/store/useAnimationStore";
import { useFadeInAnimation } from "./useFadeInAnimation";
import { pageConfig } from "@/components/3d/config/animationConfig";
import { modelConfig } from "@/components/3d/config/animationConfig";
import { useDomViewport } from "../ui/useDomViewport";

const { TOTALPAGES } = pageConfig;
const { MAILHOME } = modelConfig;
const { SCALE } = MAILHOME;

const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

function animatePosition(
    start: number[],
    end: number[],
    t: number,
    target: THREE.Mesh
) {
    target.position.set(
        lerp(start[0], end[0], t),
        lerp(start[1], end[1], t),
        lerp(start[2], end[2], t)
    );
}

export function useMailHomeAnimations() {
    const ref = useRef<THREE.Mesh>(null);
    const { isMobile } = useDomViewport();

    const { applyFadeIn } = useFadeInAnimation();

    const animationStart = 3.5 / TOTALPAGES;
    const animationEnd = 5.7 / TOTALPAGES;

    const scale = isMobile ? SCALE.MOBILE : SCALE.TABLET;

    const animate = ({ clock }: { clock: THREE.Clock }) => {
        if (!ref.current) return;

        const scroll_progress = useAnimationStore.getState().progress;
        const time = clock.getElapsedTime();

        if (scroll_progress > animationStart && scroll_progress < animationEnd) {
            const t =
                (scroll_progress - animationStart) /
                (animationEnd - animationStart);
            animatePosition([0, -1.5, 4.5], [0, 0.6, 4.5], t, ref.current);
        }

        ref.current.rotation.y += 0.004;
        applyFadeIn(ref.current, time, scale);
    };

    return { ref, animate };
}