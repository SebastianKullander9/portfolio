import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useAnimationStore } from "@/store/useAnimationStore";
import { slidingTextConfig } from "@/components/3d/config/animationConfig";

const {
    TEXT,
    FONTSIZE,
    CHARWITHESTIMATE,
    SLIDINGSPEED,
    CLIPTEXTATY,
    SCALETEXTMULTIPLIER,
} = slidingTextConfig;

export function useSlidingTextAnimations() {
    const scroll_progress = useAnimationStore((s) => s.progress);

    const refs = useRef<THREE.Mesh[]>([]);

    const textWidth = useMemo(() => TEXT.length * FONTSIZE * CHARWITHESTIMATE,[]);
    const clippingPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, -1, 0), CLIPTEXTATY),[]);

    const animate = () => {
        refs.current.forEach((mesh) => {
            if (!mesh) return;

            const targetY = scroll_progress * 0.5;
            mesh.position.y = targetY;

            const targetScaleY = Math.max(0.1, 1 - scroll_progress * SCALETEXTMULTIPLIER);
            mesh.scale.y = targetScaleY;

            mesh.position.x -= SLIDINGSPEED;

            if (mesh.position.x < -textWidth) {
                const maxX = Math.max(...refs.current.map((r) => r?.position.x ?? -Infinity));
                mesh.position.x = maxX + textWidth;
            }

            if (Array.isArray(mesh.material)) {
                mesh.material.forEach((m) => {
                    m.clippingPlanes = [clippingPlane];
                    m.clipShadows = true;
                    m.needsUpdate = true;
                });
            } else if (mesh.material) {
                mesh.material.clippingPlanes = [clippingPlane];
                mesh.material.clipShadows = true;
                mesh.material.needsUpdate = true;
            }
        });
    };

    return { refs, animate, textWidth };
}