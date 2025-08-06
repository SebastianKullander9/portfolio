import React, { useRef } from 'react';
import { MeshTransmissionMaterial, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function Model({ backgroundTexture }: { backgroundTexture: THREE.Texture }) {
    const mesh = useRef<THREE.Mesh>(null);

    const { nodes } = useGLTF("/models/sk-logo.glb") as unknown as {
        nodes: { [key: string]: THREE.Mesh }
    };

    console.log(backgroundTexture)

    const baseY = -0.05;
    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();

        if (mesh.current) {
            mesh.current.position.y = baseY + 0.0025 * Math.sin(time * 4);
        }
        
    });

    const material = {
        thickness: 0,
        roughness: 0.2,
        transmission: 1.0,
        ior: 1.8,
        chromaticAberration: 0
    }

    return (
        <group >
            <mesh ref={mesh} {...nodes.BézierCurve} position={[0, 0, 4.75]} scale={[0.1, 0.1, 0.1]}>
                <MeshTransmissionMaterial {...material} background={backgroundTexture} color={"#F5AEB9"} />
            </mesh>
        </group>
    );
}

useGLTF.preload('/models/sk-logo.glb');

//mesh.position.set(0.035, -0.05, 4.765);
//mesh.rotation.y = 0.9;
//mesh.rotation.z = 0;

//thickness: 0 rougness: 0.5 transmission: 1.0  ior: 1.8