import { Text } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAnimationStore } from '@/store/useAnimationStore';

import { slidingTextConfig } from '../config/animationConfig';
const {
    TEXT,
    FONTSIZE,
    CHARWITHESTIMATE,
    SLIDINGSPEED,
    CLIPTEXTATY,
    SCALETEXTMULTIPLIER,
    TEXTPOSITIONX,
} = slidingTextConfig;

export default function SlidingText() {
    const scroll_progress = useAnimationStore((s) => s.progress);

    const textWidth = useMemo(() => {
        return TEXT.length * FONTSIZE * CHARWITHESTIMATE;
    }, []);

    const NUM_INSTANCES = 2;
    const refs = useRef<THREE.Mesh[]>([]);

    const clippingPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, -1, 0), CLIPTEXTATY), []);

    useFrame(() => {
        refs.current.forEach((mesh) => {
            if (!mesh) return;

            const targetY = scroll_progress * 0.5;
            mesh.position.y = targetY;

            const targetScaleY = Math.max(0.1, 1 - scroll_progress * SCALETEXTMULTIPLIER);
            mesh.scale.y = targetScaleY;
            
            mesh.position.x -= SLIDINGSPEED;

            if (mesh.position.x < -textWidth) {
                const maxX = Math.max(
                    ...refs.current.map(ref => ref?.position.x ?? -Infinity)
                );
                mesh.position.x = maxX + textWidth;
            }

            if (Array.isArray(mesh.material)) {
                mesh.material.forEach(m => {
                    m.clippingPlanes = [clippingPlane];
                    m.clipShadows = true;
                    m.needsUpdate = true;
                });
            } else {
                mesh.material.clippingPlanes = [clippingPlane];
                mesh.material.clipShadows = true;
                mesh.material.needsUpdate = true;
            }
        });
    });

    return (
        <>
            {[...Array(NUM_INSTANCES)].map((_, i) => (
                <Text
                    key={i}
                    ref={(el) => (refs.current[i] = el!)}
                    fontSize={FONTSIZE}
                    color="white"
                    position={[i * textWidth, 0, TEXTPOSITIONX]}
                    font="/fonts/Colabero.ttf"
                    material-toneMapped={false}
                >
                    {TEXT}
                </Text>
            ))}
        </>
    );
}