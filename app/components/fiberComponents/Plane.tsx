"use client";

import { useEffect, useState, forwardRef, useImperativeHandle, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import { planeConfig } from "../../config/animationConfig";
const { UNIFORMS, PLANE } = planeConfig;

const Plane = forwardRef<THREE.Mesh, object>((_, ref) => {
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
        uTime: { value: UNIFORMS.uTime },
        incline: { value: UNIFORMS.incline },
        amplitude: { value: UNIFORMS.amplitude },
        uSpeed: { value: UNIFORMS.uSpeed },
    };

    return (
        <mesh ref={meshRef} position={ PLANE.position } rotation={ PLANE.rotation }>
            <planeGeometry args={ PLANE.geometry } />
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