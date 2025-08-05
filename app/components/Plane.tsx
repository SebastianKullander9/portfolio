"use client";

import { useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Plane() {
    const [vertexShader, setVertexShader] = useState<string | null>(null);
    const [fragmentShader, setFragmentShader] = useState<string | null>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useEffect(() => {
        fetch("/shaders/custom.vert.glsl")
            .then(res => res.text())
            .then(text => setVertexShader(text));

        fetch("/shaders/custom.frag.glsl")
            .then(res => res.text())
            .then(text => setFragmentShader(text));
    }, []);

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = clock.getElapsedTime() * 0.4;
        }
    });

    if (!vertexShader || !fragmentShader) {
        return null;
    }

    const uniforms = {
        uTime: { value: 0 },
        incline: { value: -2.0 },
        amplitude: { value: 0.1 },
        uSpeed: { value: 0.25 },
    }
    
    return (
        <>
            <mesh position={[0, 0, 4.2]} rotation={[0, 0, 0]}>
                <planeGeometry args={[5, 5, 25, 25]} />
                <shaderMaterial
                    ref={materialRef}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={uniforms}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </>
    );
}