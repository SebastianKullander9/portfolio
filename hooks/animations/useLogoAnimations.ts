import { useRef } from "react";
import * as THREE from "three";
import { useAnimationStore } from "@/store/useAnimationStore";
import { modelConfig, pageConfig } from "@/components/3d/config/animationConfig";
import { useThree } from "@react-three/fiber";
import { useFadeInAnimation } from "./useFadeInAnimation";

const { BOBBINGDISTANCE, BOBBINGSPEED, POSITION, ROTATION, SCALE } = modelConfig.LOGO;
const { TOTALPAGES } = pageConfig;

const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

function easeInOutCubic(t: number) {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animatePosition(start: number[], end: number[], t: number, target: THREE.Mesh) {
    target.position.set(
        lerp(start[0], end[0], t),
        lerp(start[1], end[1], t),
        lerp(start[2], end[2], t)
    );
}

function animateScale(start: number[], end: number[], t: number, target: THREE.Mesh) {
    target.scale.set(
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

    const { applyFadeIn } = useFadeInAnimation();

    const animationStart = 0.5 / TOTALPAGES;
    const animationEnd = 1.5 / TOTALPAGES;

    const { viewport } = useThree();
    const vw = viewport.width;

    const position = vw < 4 ? POSITION.MOBILE : vw < 10 ? POSITION.TABLET : POSITION.DESKTOP;
    const scale = vw < 4 ? SCALE.MOBILE : vw < 10 ? SCALE.TABLET : SCALE.DESKTOP;

    const animate = ({ clock }: { clock: THREE.Clock }) => {
        if (!ref.current) return;

        const time = clock.getElapsedTime();
        
        if (scroll_progress <= animationStart) {
            ref.current.position.set(...position);
            ref.current.scale.set(...scale);
            ref.current.rotation.set(...ROTATION);
        } else if (scroll_progress > animationStart && scroll_progress < animationEnd) {
            const t = (scroll_progress - animationStart) / (animationEnd - animationStart);
            animatePosition(position, [0, 0, 5], easeInOutCubic(t), ref.current);
            animateScale(scale, [0.2, 0.2, 0.2], easeInOutCubic(t), ref.current);
            animateRotation(ROTATION, [0, 0, -0], easeInOutCubic(t), ref.current);
        } else {
            ref.current.position.set(0, 0, 5);
            ref.current.scale.set(0.2, 0.2, 0.2);
            ref.current.rotation.set(0, 0, -0);
        }

        ref.current.position.y = POSITION.DESKTOP[1] + BOBBINGDISTANCE * Math.sin(time * BOBBINGSPEED);
        applyFadeIn(ref.current, time, scale);
    };

    return { ref, animate };
}