import React from "react";
import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import useDetermineMeshMaterial from "@/hooks/useDetermineMeshMaterial";

import { modelConfig } from "../config/animationConfig";
const {
    POSITION,
    ROTATION,
    SCALE,
} = modelConfig.LOGO;

interface ModelProps {
    ref?: React.Ref<THREE.Mesh>;
    performanceTier: "low" | "medium" | "high";
}

export default function Logo({ ref, performanceTier }: ModelProps) {
    const { nodes } = useGLTF("/models/sk-logo-compressed.glb") as unknown as {
        nodes: { [key: string]: THREE.Mesh }
    };

    const { viewport } = useThree();

    const { scale, position } = useMemo(() => {
        const vw = viewport.width;
        return {
            scale: vw < 4 ? SCALE.MOBILE : vw < 10 ? SCALE.TABLET : SCALE.DESKTOP,
            position: vw < 4 ? POSITION.MOBILE : vw < 10 ? POSITION.TABLET : POSITION.DESKTOP,
        }
    }, [viewport.width]);

    const material = useDetermineMeshMaterial(performanceTier);
    
    return (
        <group >
            <mesh 
                ref={ref} 
                geometry={nodes.BézierCurve.geometry}
                position={ position } 
                scale={ scale }
                rotation={ ROTATION }
            >
                {material}
            </mesh>
        </group>
    );
}

useGLTF.preload("/models/sk-logo-compressed.glb");

