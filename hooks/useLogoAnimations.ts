import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useAnimationStore } from "@/store/useAnimationStore";

import { modelConfig } from "@/components/3d/config/animationConfig";
import { pageConfig } from "@/components/3d/config/animationConfig";
const { BOBBINGDISTANCE, BOBBINGSPEED, POSITION, ROTATION } = modelConfig.LOGO;
const { TOTALPAGES } = pageConfig;

const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

function easeInOutCubic(t: number) {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeInCirc(t: number) {
    return 1 - Math.sqrt(1 - t * t);
}

//let a = data.range(0.5 / 1/6, 1/6);
//a = easeInOutCubic(a);

function animatePosition(start: number[], end: number[], t: number, target: THREE.Mesh, time: number) {
    target.position.set(
        lerp(start[0], end[0], t),
        lerp(start[1], end[1], t),
        lerp(start[2], end[2], t)
    );
}

function animateRotation(start: number[], end: number[], t: number, target: THREE.Mesh) {
    target.rotation.set(
        lerp(start[0], end[0], t),
        lerp(start[1], end[1], t),
        lerp(start[2], end[2], t)
    );
}

export function useLogoAnimations() {
    const ref = useRef<THREE.Mesh>(null);
    const scroll_progress = useAnimationStore((s) => s.progress);
    const animationStart = 0.5 / TOTALPAGES;
    const animationMiddle= 2 / TOTALPAGES;
    const animationEnd = 3 / TOTALPAGES;


    useFrame(({ clock }) => {
        if (!ref.current) return;

        const time = clock.getElapsedTime();

        if (scroll_progress > animationStart && scroll_progress < animationMiddle) {
            const t = (scroll_progress - animationStart) / (animationMiddle - animationStart);
            animatePosition(POSITION.DESKTOP, [0.2, -0.05, 4.650], easeInOutCubic(t), ref.current, time);
            animateRotation(ROTATION, [0, 0, 0], easeInOutCubic(t), ref.current);
        } else if (scroll_progress > animationMiddle && scroll_progress < animationEnd) {
            const t = (scroll_progress - animationMiddle) / (animationEnd - animationMiddle);

            const targetScale = lerp(0.1, 0, easeInOutCubic(t));
            ref.current.scale.set(targetScale, targetScale, targetScale);
        }

        ref.current.position.y = POSITION.DESKTOP[1] + BOBBINGDISTANCE * Math.sin(time * BOBBINGSPEED);
    });

    return ref;
}