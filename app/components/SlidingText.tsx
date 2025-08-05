import { Text } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll } from '@react-three/drei';

const text = "Sebastian Kullander Frontend Developer ";
const fontSize = 0.025;
const charWidthEstimate = 1.2;

export default function SlidingText() {
    const speed = 0.0004;

    const textWidth = useMemo(() => {
        return text.length * fontSize * charWidthEstimate;
    }, []);

    const NUM_INSTANCES = 2;
    const refs = useRef<THREE.Mesh[]>([]);
    const scroll = useScroll();

    const clipY = 0.023;
    const clippingPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, -1, 0), clipY), []);

    useFrame(() => {
        const scrollOffset = scroll.offset;

        refs.current.forEach((mesh) => {
            if (!mesh) return;

            const targetY = scrollOffset * 0.5;
            mesh.position.y = targetY;

            const targetScaleY = Math.max(0.1, 1 - scrollOffset * 20);
            mesh.scale.y = targetScaleY;
            
            mesh.position.x -= speed;

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
                    fontSize={fontSize}
                    color="white"
                    position={[i * textWidth, 0, 4.78]}
                    font="/fonts/Colabero.ttf"
                    material-toneMapped={false}
                >
                    {text}
                </Text>
            ))}
        </>
    );
}