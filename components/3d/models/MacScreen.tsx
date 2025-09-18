import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";

import { modelConfig } from "../config/animationConfig";
const {
    POSITION,
    ROTATION,
    SCALE,
} = modelConfig.MAC;

interface ModelProps {
    ref?: React.Ref<THREE.Mesh>;
}

export default function MacScreen({ ref }: ModelProps) {
    const { nodes } = useGLTF("/models/mac-screen.glb") as unknown as {
        nodes: { [key: string]: THREE.Mesh }
    };

    const screenRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.MeshBasicMaterial>(new THREE.MeshBasicMaterial());

    useEffect(() => {
        const loader = new THREE.TextureLoader();
        loader.load("/projects/temporary.png", (texture) => {
            texture.anisotropy = 16;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            texture.magFilter = THREE.LinearFilter;

            texture.center.set(0.5, 0.5);
            texture.rotation = Math.PI;
            texture.wrapS = THREE.RepeatWrapping;
            texture.repeat.x = -1;

            materialRef.current.map = texture;
            materialRef.current.needsUpdate = true;
        });
    }, []);

    return (
        <group
            ref={ref}
            position={ POSITION }
            rotation={ ROTATION }
            scale={ SCALE }   
        >
            {Object.values(nodes).map((node: THREE.Mesh, i) => (
                node.isMesh && (
                    <mesh
                        ref={ i === 5 ? screenRef : null }
                        key={node.uuid}
                        geometry={node.geometry}
                        material={i === 5 ? materialRef.current : i === 9 ? new THREE.MeshStandardMaterial({ color: "#F7F0F2" }) : node.material}
                    />
                )
            ))}
        </group>
    );
}

useGLTF.preload("/models/mac-screen.glb");