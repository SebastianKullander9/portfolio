import { useRef, useEffect } from "react";
import * as THREE from "three";
import { modelConfig } from "@/components/3d/config/animationConfig";
import { useThree } from "@react-three/fiber";
import { useFadeInAnimation } from "./useFadeInAnimation";
import { useRangeProgress } from "./useRangeProgress";

const { BOBBINGDISTANCE, BOBBINGSPEED, POSITION, ROTATION, SCALE, EXIT } = modelConfig.LOGO;

const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animatePosition(start: number[], end: number[], t: number, target: THREE.Mesh) {
    target.position.set(
        lerp(start[0], end[0], t),
        lerp(start[1], end[1], t),
        lerp(start[2], end[2], t),
    );
}

function animateScale(start: number[], end: number[], t: number, target: THREE.Mesh) {
    target.scale.set(
        lerp(start[0], end[0], t),
        lerp(start[1], end[1], t),
        lerp(start[2], end[2], t),
    );
}

function animateRotation(start: number[], end: number[], t: number, target: THREE.Mesh) {
    target.rotation.set(
        lerp(start[0], end[0], t),
        lerp(start[1], end[1], t),
        lerp(start[2], end[2], t),
    );
}

function animateLogoPosition(t: number, start: number[], end: number[], target: THREE.Mesh) {
    const eased = easeInOutCubic(t);

    const drift = Math.sin(eased * Math.PI) * 0.05;

    target.position.set(
        lerp(start[0], end[0], eased) + drift,
        lerp(start[1], end[1], eased),
        lerp(start[2], end[2], eased),
    );

    return eased;
}

export function useLogoAnimations() {
    const ref = useRef<THREE.Mesh>(null);
    const progressRef = useRef(0);
    const { applyFadeIn } = useFadeInAnimation();

    const exitProgress = useRangeProgress("home", "spacer-1");

    useEffect(() => {
        progressRef.current = exitProgress;
    }, [exitProgress]);

    const { viewport } = useThree();
    const vw = viewport.width;
    const position = vw < 4 ? POSITION.MOBILE : vw < 10 ? POSITION.TABLET : POSITION.DESKTOP;
    const scale = vw < 4 ? SCALE.MOBILE : vw < 10 ? SCALE.TABLET : SCALE.DESKTOP;

    const animate = ({ clock }: { clock: THREE.Clock }) => {
        if (!ref.current) return;

        const t = progressRef.current;
        const time = clock.getElapsedTime();

        if (t <= 0) {
            ref.current.position.set(...position);
            ref.current.scale.set(...scale);
            ref.current.rotation.set(...ROTATION);
        } else if (t < 1) {
            const eased = animateLogoPosition(t, position, EXIT.POSITION, ref.current);
            animateScale(scale, EXIT.SCALE, eased, ref.current);
            animateRotation(ROTATION, EXIT.ROTATION, eased, ref.current);
        } else {
            ref.current.position.set(...EXIT.POSITION);
            ref.current.scale.set(...EXIT.SCALE);
            ref.current.rotation.set(...EXIT.ROTATION);
        }

        ref.current.position.y += BOBBINGDISTANCE * Math.sin(time * BOBBINGSPEED);

        applyFadeIn(ref.current, time, scale);
    };

    return { ref, animate };
}
