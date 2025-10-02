import React from "react";
import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

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
    const { nodes } = useGLTF("/models/sk-logo-compressed.glb") as unknown as {
        nodes: { [key: string]: THREE.Mesh }
    };

    const { viewport } = useThree();
    console.log(viewport.width, viewport.height);

    const vw = viewport.width;

    const scale = vw < 4 ? SCALE.MOBILE : vw < 10 ? SCALE.TABLET : SCALE.DESKTOP;
    const position = vw < 4 ? POSITION.MOBILE : vw < 10 ? POSITION.TABLET : POSITION.DESKTOP;

    return (
        <group >
            <mesh 
                ref={ref} 
                geometry={nodes.BézierCurve.geometry}
                material={nodes.BézierCurve.material}
                position={ position } 
                scale={ scale }
                rotation={ ROTATION }
            >
                <MeshTransmissionMaterial {...MATERIAL} color={"#F5AEB9"} />
            </mesh>
        </group>
    );
}

useGLTF.preload("/models/sk-logo-compressed.glb");

