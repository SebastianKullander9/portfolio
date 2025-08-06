import React, { useRef } from 'react';
import { MeshTransmissionMaterial, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

import { modelConfig } from "../../config/animationConfig";
const {
    INITIALPOSITIONY,
    BOBBINGDISTANCE,
    BOBBINGSPEED,
    MATERIAL,
    POSITION,
    SCALE,
} = modelConfig;

export default function Model({ backgroundTexture }: { backgroundTexture: THREE.Texture }) {
    const mesh = useRef<THREE.Mesh>(null);

    const { nodes } = useGLTF("/models/sk-logo.glb") as unknown as {
        nodes: { [key: string]: THREE.Mesh }
    };

    console.log(backgroundTexture)

    const baseY = INITIALPOSITIONY;
    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();

        if (mesh.current) {
            mesh.current.position.y = baseY + BOBBINGDISTANCE * Math.sin(time * BOBBINGSPEED);
        }
        
    });

    const material = {
        thickness: MATERIAL.thickness,
        roughness: MATERIAL.roughness,
        transmission: MATERIAL.transmisson,
        ior: MATERIAL.ior,
        chromaticAberration: MATERIAL.chromaticAberration
    }

    return (
        <group >
            <mesh ref={mesh} {...nodes.BézierCurve} position={ POSITION } scale={ SCALE }>
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