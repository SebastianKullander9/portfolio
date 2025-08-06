"use client";

import { useEffect, useState, forwardRef, useImperativeHandle, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const Plane = forwardRef<THREE.Mesh, Object>((_, ref) => {
    const [vertexShader, setVertexShader] = useState<string | null>(null);
    const [fragmentShader, setFragmentShader] = useState<string | null>(null);

    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useImperativeHandle(ref, () => meshRef.current!, []);

    useEffect(() => {
        fetch("/shaders/custom.vert.glsl").then(res => res.text()).then(setVertexShader);
        fetch("/shaders/custom.frag.glsl").then(res => res.text()).then(setFragmentShader);
    }, []);

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = clock.getElapsedTime() * 0.4;
        }
    });

    if (!vertexShader || !fragmentShader) return null;

    const uniforms = {
        uTime: { value: 0 },
        incline: { value: 0.0 },
        amplitude: { value: 0.25 },
        uSpeed: { value: 0.15 },
    };

    return (
        <mesh ref={meshRef} position={[0, 0, 4.5]} rotation={[0, 0, 0]}>
            <planeGeometry args={[4, 4, 25, 25]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
});

Plane.displayName = "Plane";

export default Plane;