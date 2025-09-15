import React from 'react';
import { MeshTransmissionMaterial, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import { modelConfig } from '../config/animationConfig';
const {
    MATERIAL,
    POSITION,
    ROTATION,
    SCALE,
} = modelConfig;

interface ModelProps {
    ref?: React.Ref<THREE.Mesh>;
}

export default function Logo({ ref }: ModelProps) {
    const { nodes } = useGLTF("/models/sk-logo.glb") as unknown as {
        nodes: { [key: string]: THREE.Mesh }
    };

    const material = {
        thickness: MATERIAL.thickness,
        roughness: MATERIAL.roughness,
        transmission: MATERIAL.transmisson,
        ior: MATERIAL.ior,
        chromaticAberration: MATERIAL.chromaticAberration
    }

    return (
        <group >
            <mesh 
                ref={ref} 
                geometry={nodes.BézierCurve.geometry}
                material={nodes.BézierCurve.material}
                position={ POSITION } 
                scale={ SCALE }
                rotation={ ROTATION }
            >
                <MeshTransmissionMaterial {...material} color={"#F5AEB9"} />
            </mesh>
        </group>
    );
}

useGLTF.preload('/models/sk-logo.glb');

//mesh.position.set(0.035, -0.05, 4.765);
//mesh.rotation.y = 0.9;
//mesh.rotation.z = 0;

//thickness: 0 rougness: 0.5 transmission: 1.0  ior: 1.8