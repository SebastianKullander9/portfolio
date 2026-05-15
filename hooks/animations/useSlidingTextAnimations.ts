import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useAnimationStore } from "@/store/useAnimationStore";
import { slidingTextConfig } from "@/components/3d/config/animationConfig";

const { TEXT, FONTSIZE, CHARWITHESTIMATE, SLIDINGSPEED, CLIPTEXTATY, SCALETEXTMULTIPLIER } =
    slidingTextConfig;

export function useSlidingTextAnimations() {
    const refs = useRef<THREE.Mesh[]>([]);

    const textWidth = useMemo(() => TEXT.length * FONTSIZE * CHARWITHESTIMATE, []);
    const clippingPlane = useMemo(
        () => new THREE.Plane(new THREE.Vector3(0, -1, 0), CLIPTEXTATY),
        [],
    );
    const clippingApplied = useRef(false);

    useEffect(() => {
        return () => { clippingApplied.current = false; };
    }, []);

    const animate = () => {
        const scroll_progress = useAnimationStore.getState().progress;

        refs.current.forEach((mesh) => {
            if (!mesh) return;

            if (!clippingApplied.current) {
                if (Array.isArray(mesh.material)) {
                    mesh.material.forEach((m) => {
                        m.clippingPlanes = [clippingPlane];
                        m.clipShadows = true;
                    });
                } else if (mesh.material) {
                    mesh.material.clippingPlanes = [clippingPlane];
                    mesh.material.clipShadows = true;
                }
            }

            const targetY = scroll_progress * 0.5;
            mesh.position.y = targetY;

            const targetScaleY = Math.max(0.1, 1 - scroll_progress * SCALETEXTMULTIPLIER);
            mesh.scale.y = targetScaleY;

            mesh.position.x -= SLIDINGSPEED;

            if (mesh.position.x < -textWidth) {
                const maxX = Math.max(...refs.current.map((r) => r?.position.x ?? -Infinity));
                mesh.position.x = maxX + textWidth;
            }
        });

        clippingApplied.current = true;
    };

    return { refs, animate, textWidth };
}
