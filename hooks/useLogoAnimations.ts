import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useAnimationStore } from "@/store/useAnimationStore";

import { modelConfig } from "@/components/3d/config/animationConfig";
const { BOBBINGDISTANCE, BOBBINGSPEED, POSITION, ROTATION } = modelConfig;

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
    const bobbing = BOBBINGDISTANCE * Math.sin(time * BOBBINGSPEED);
    target.position.set(
        lerp(start[0], end[0], t),
        lerp(start[1], end[1], t) + bobbing,
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

    useFrame(({ clock }) => {
        if (!ref.current) return;
        console.log(scroll_progress)

        const time = clock.getElapsedTime();

        animatePosition(POSITION, [0.2, -0.05, 4.650], easeInOutCubic(scroll_progress), ref.current, time);
        animateRotation(ROTATION, [0, 0, 0], easeInOutCubic(scroll_progress), ref.current);
    });

    return ref;
}