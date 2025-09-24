//NOT USED RIGHT NOW

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useAnimationStore } from "@/store/useAnimationStore";

import { modelConfig } from "@/components/3d/config/animationConfig";
import { pageConfig } from "@/components/3d/config/animationConfig";

const { BOBBINGDISTANCE, BOBBINGSPEED, POSITION } = modelConfig.MAC;
const { TOTALPAGES } = pageConfig;

const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

function animatePosition(start: number[], end: number[], t: number, target: THREE.Mesh, time: number) {
    const bobbing = BOBBINGDISTANCE * Math.sin(time * BOBBINGSPEED);
    target.position.set(
        lerp(start[0], end[0], t),
        lerp(start[1], end[1], t) + bobbing,
        lerp(start[2], end[2], t)
    );
}

export function useMacAnimations() {
    const ref = useRef<THREE.Mesh>(null);
    const scroll_progress = useAnimationStore((s) => s.progress);
    const animationStart = 2.5 / TOTALPAGES;
    const animationMiddle= 3.5 / TOTALPAGES;
    const animationEnd = 4.5 / TOTALPAGES;

    useFrame(({ clock }) => {
        if (!ref.current) return;

        const time = clock.getElapsedTime();

        if (scroll_progress > animationStart && scroll_progress < animationMiddle) {
            const t = (scroll_progress - animationStart) / (animationMiddle - animationStart);
            animatePosition(POSITION, [0, -0.1, 4.5], t, ref.current, time);
        } else if (scroll_progress > animationMiddle && scroll_progress < animationEnd) {
            const t = (scroll_progress - animationMiddle) / (animationEnd - animationMiddle);
            animatePosition([0, -0.1, 4.5], [0, 0.7, 4.5], t, ref.current, time);
        }
    });

    return ref;
}