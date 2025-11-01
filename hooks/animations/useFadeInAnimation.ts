import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useAnimationStore } from "@/store/useAnimationStore";

function easeOutCubic(t: number) {
    return 1 - Math.pow(1 -t, 3);
}

const DURATION = 0.8;
const SCALEFROM = 0.5;

export function useFadeInAnimation() {
    const pathname = useAnimationStore((s) => s.pathname);
    const mountTime = useRef<number | null>(null);

    useEffect(() => {
        mountTime.current = null;
    }, [pathname]);

    const applyFadeIn = ( mesh: THREE.Mesh, time: number, baseScale: [number, number, number] ) => {
        if (mountTime.current === null) {
            mountTime.current = time;
        }

        const timeSinceMount = time - mountTime.current;
        const fadeProgress = Math.min(timeSinceMount / DURATION, 1);
        const easedFade = easeOutCubic(fadeProgress);

        if (mesh.material) {
            if ("opacity" in mesh.material) {
                mesh.material.transparent = true;
                mesh.material.opacity = easedFade;
            }

            const scaleMultiplier = SCALEFROM + ((1 - SCALEFROM) * easedFade);
            mesh.scale.set(
                baseScale[0] * scaleMultiplier,
                baseScale[1] * scaleMultiplier,
                baseScale[2] * scaleMultiplier
            );
        }

        return easedFade;
    };

    const reset = () => {
        mountTime.current = null;
    };

    return { applyFadeIn, reset, mountTime};
}