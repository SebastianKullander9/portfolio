import React from "react";
import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import { modelConfig } from "../config/animationConfig";
const {
    MATERIAL,
    POSITION,
    ROTATION,
    SCALE,
} = modelConfig.LOGO;

interface ModelProps {
    ref?: React.Ref<THREE.Mesh>;
}

export default function Logo({ ref }: ModelProps) {
    const { nodes } = useGLTF("/models/mail4.glb") as unknown as {
        nodes: { [key: string]: THREE.Mesh }
    };

    const material = {
        thickness: MATERIAL.thickness,
        roughness: MATERIAL.roughness,
        transmission: MATERIAL.transmission,
        ior: MATERIAL.ior,
        chromaticAberration: MATERIAL.chromaticAberration
    }

    return (
        <group >
            <mesh 
                ref={ref} 
                geometry={nodes.Cube.geometry}
                material={nodes.Cube.material}
                position={[0,2,4.5]} 
                scale={[0.015, 0.015, 0.015]}
                rotation={ [0, 0, 0]}
            >
                <MeshTransmissionMaterial {...material} color={"#F5AEB9"} />
            </mesh>
        </group>
    );
}

useGLTF.preload("/models/mail4.glb");