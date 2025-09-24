//CONSIDER/FIX IF POSSIBLE: MOVE PLANE.TSX AND MACSCREEN.TSX USEFRAMES INTO CENTRALIZED USEFRAME FOR PERFORMANCE

import { useState, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useSlidesStore } from "@/store/useSlidesStore";

export default function Plane({ index, WorldPerPixel }: { index: number, WorldPerPixel: number }) {
    const planeRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const [vertexShader, setVertexShader] = useState<string | null>(null);
    const [fragmentShader, setFragmentShader] = useState<string | null>(null);
    const { slides, slideWidth, sliderVelocity, sliderOffset } = useSlidesStore();

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uVelocity: { value: 0 },
        }),
        []
    );

    useEffect(() => {
        fetch("/shaders/carousel/custom.vert.glsl").then(res => res.text()).then(setVertexShader);
        fetch("/shaders/carousel/custom.frag.glsl").then(res => res.text()).then(setFragmentShader);
    }, []);

    useFrame(({ clock }) => {
        if (!materialRef.current || !planeRef.current) return;

        materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
        materialRef.current.uniforms.uVelocity.value = sliderVelocity;

        const totalSlides = slides.length;
        const totalWidth = totalSlides * slideWorldSpacing;

        let x = -(correctedIndex - sliderOffset) * slideWorldSpacing;
        x = ((x + totalWidth/2) % totalWidth + totalWidth) % totalWidth - totalWidth/2;

        planeRef.current.position.x = x;
    });

    if (!vertexShader || !fragmentShader) return null;

    const slideWorldSpacing = slideWidth * WorldPerPixel;

    const correctedIndex = index - 3;
    const positionX = correctedIndex * slideWorldSpacing;

    return (
        <mesh ref={planeRef} position={[positionX, 0, 0]} renderOrder={1} scale={[0.5, 0.5, 0.5]}>
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