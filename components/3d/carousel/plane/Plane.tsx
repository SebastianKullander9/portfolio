import { useRef, useMemo } from "react";
import * as THREE from "three";

interface PlaneProps {
    refProp: React.RefObject<THREE.Mesh | null>;
    index: number;
    WorldPerPixel: number;
    slideWidth: number;
    vertexShader: string;
    fragmentShader: string;
}

export default function Plane({ refProp, index, WorldPerPixel, slideWidth, vertexShader, fragmentShader  }: PlaneProps ) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uVelocity: { value: 0 },
        }),
        []
    );

    const slideWorldSpacing = slideWidth * WorldPerPixel;
    const correctedIndex = index - 3;
    const positionX = correctedIndex * slideWorldSpacing;

    return (
        <mesh ref={refProp} position={[positionX, 0, 0]} renderOrder={1} scale={[0.5, 0.5, 0.5]}>
            <planeGeometry args={[2, 3, 10, 10]}  />
            <shaderMaterial
                depthWrite={false}
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    )
}