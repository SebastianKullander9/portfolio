import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useAnimationStore } from "@/store/useAnimationStore";
import { modelConfig } from "@/components/3d/config/animationConfig";

const { MAILCONTACT } = modelConfig;
const { BOBBINGDISTANCE, BOBBINGSPEED, POSITION, ROTATION, SCALE } = MAILCONTACT; 

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

export function useMailContactAnimations() {
    const ref = useRef<THREE.Mesh>(null);
    const scroll_progress = useAnimationStore((s) => s.progress);
    const [windowHeight, setWindowHeight] = useState(0);

    useEffect(() => {
        const setHeight = () => {
            setWindowHeight(window.innerHeight)
        }

        document.addEventListener("resize", setHeight);

        return () => document.removeEventListener("resize", setHeight);
    }, [windowHeight])

    if (ref.current) {
        ref.current.position.set( ...POSITION );
        ref.current.rotation.set( ...ROTATION );
        ref.current.scale.set( ...SCALE.DESKTOP);
    }

    const animationStart = 0.1;
    const animationEnd = 1.001;

    const animate = ({ clock }: { clock: THREE.Clock }) => {
        if (!ref.current) return;

        const time = clock.getElapsedTime();

        if (scroll_progress > animationStart && scroll_progress < animationEnd) {
            const t =
                (scroll_progress - animationStart) /
                (animationEnd - animationStart);

            ref.current.position.x = lerp(POSITION[0], 0.25, t);
            ref.current.position.z = lerp(POSITION[2], 4.3, t);
            
            ref.current.position.y = lerp(POSITION[1], 1, t) + BOBBINGDISTANCE * Math.sin(time * BOBBINGSPEED);
        } else {
            ref.current.position.y = POSITION[1] + BOBBINGDISTANCE * Math.sin(time * BOBBINGSPEED);
        }
    }

    return { ref, animate };
}