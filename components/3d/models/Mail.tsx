import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import useDetermineMeshMaterial from "@/hooks/performance/useDetermineMeshMaterial";

import { modelConfig } from "../config/animationConfig";
const {
    POSITION,
    ROTATION,
    SCALE,
} = modelConfig.MAILHOME;

interface ModelProps {
    ref?: React.Ref<THREE.Mesh>;
    performanceTier: "low" | "medium" | "high";
}

export default function Logo({ ref, performanceTier }: ModelProps) {
    const { nodes } = useGLTF("/models/mail4.glb") as unknown as {
        nodes: { [key: string]: THREE.Mesh }
    };

    const { viewport } = useThree();
    const vw = viewport.width;

    const scale = vw < 4 ? SCALE.MOBILE : vw < 10 ? SCALE.TABLET : SCALE.DESKTOP;

    const material = useDetermineMeshMaterial(performanceTier);

    return (
        <group >
            <mesh 
                ref={ref} 
                geometry={nodes.Cube.geometry}
                material={nodes.Cube.material}
                position={POSITION} 
                scale={scale}
                rotation={ROTATION}
            >
                {material}
            </mesh>
        </group>
    );
}

useGLTF.preload("/models/mail4.glb");