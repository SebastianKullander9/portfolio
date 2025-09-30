import React, { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";
import { useSlidesStore } from "@/store/useSlidesStore";
import { getTexture } from "@/helpers/preloadTextures";

interface ModelProps {
    WorldPerPixel: number;
    index: number;
    imgUrl: string;
    refProp?: React.RefObject<THREE.Group | null>;
}

export default function MacScreen({ WorldPerPixel, index, imgUrl, refProp }: ModelProps) {
    const { slideWidth } = useSlidesStore();

    const { nodes } = useGLTF("/models/mac-screen-compressed.glb") as unknown as {
        nodes: { [key: string]: THREE.Mesh }
    };

    const screenRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.MeshBasicMaterial>(new THREE.MeshBasicMaterial());

    const darkerMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: "#aaaaaa",
        roughness: 0.8,
        metalness: 0.1,
    }), []);

    useEffect(() => {
        const cached = getTexture(imgUrl);
        if (!cached) return;

        materialRef.current.map = cached;
        materialRef.current.needsUpdate = true;
    }, [imgUrl]);

    const slideWorldSpacing = slideWidth * WorldPerPixel;

    const correctedIndex = index - 3;
    const positionX = correctedIndex * slideWorldSpacing;

    return (
        <group
            ref={refProp}
            position={[positionX, -0.5, 0]}
            rotation={[0, 0, -0.1]}
            scale={[0.19, 0.19, 0.19]}
            renderOrder={10}
        >
            {Object.values(nodes).map((node: THREE.Mesh, i) => (
                node.isMesh && (
                    <mesh
                        ref={ i === 5 ? screenRef : null }
                        key={node.uuid}
                        geometry={node.geometry}
                        material={i === 5 ? materialRef.current : i === 9 ? darkerMaterial : darkerMaterial}
                    />
                )
            ))}
        </group>
    );
}

useGLTF.preload("/models/mac-screen.glb");