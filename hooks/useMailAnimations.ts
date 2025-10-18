import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimationStore } from "@/store/useAnimationStore";
import * as THREE from "three";

import { pageConfig } from "@/components/3d/config/animationConfig";
const { TOTALPAGES } = pageConfig;

const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

function animatePosition(start: number[], end: number[], t: number, target: THREE.Mesh, time: number) {
    target.position.set(
        lerp(start[0], end[0], t),
        lerp(start[1], end[1], t),
        lerp(start[2], end[2], t)
    );
}

export function useMailAnimations() {
    const ref = useRef<THREE.Mesh>(null);
    const scroll_progress = useAnimationStore((s) => s.progress);

    const animationStart = 4.2 / TOTALPAGES;
    const animationEnd = 5.2 / TOTALPAGES

    useFrame(({ clock }) => {
        if (!ref.current) return;

        const time = clock.getElapsedTime();

        if (scroll_progress > animationStart && scroll_progress < animationEnd) {
            console.log("Running")
            const t = (scroll_progress - animationStart) / (animationEnd - animationStart);

            animatePosition([0, -1.5, 4.5], [0, 0.6, 4.5], t, ref.current, time)
        }


        ref.current.rotation.y += 0.004;
    });

    return ref;
}