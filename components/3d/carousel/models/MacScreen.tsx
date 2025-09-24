//CONSIDER/FIX IF POSSIBLE: MOVE PLANE.TSX AND MACSCREEN.TSX USEFRAMES INTO CENTRALIZED USEFRAME FOR PERFORMANCE

import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSlidesStore } from "@/store/useSlidesStore";
import { useThree } from "@react-three/fiber";

import { modelConfig } from "../../config/animationConfig";
const {
    POSITION,
    ROTATION,
    SCALE,
} = modelConfig.MAC;

interface ModelProps {
    WorldPerPixel: number;
    index: number;
    imgUrl: string;
}

export default function MacScreen({ WorldPerPixel, index, imgUrl }: ModelProps) {
    const { slides, slideWidth, sliderOffset } = useSlidesStore();
    const { camera } = useThree();

    const { nodes } = useGLTF("/models/mac-screen.glb") as unknown as {
        nodes: { [key: string]: THREE.Mesh }
    };

    const screenRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.MeshBasicMaterial>(new THREE.MeshBasicMaterial());
    const groupRef = useRef<THREE.Group>(null);

    const darkerMaterial = new THREE.MeshStandardMaterial({
        color: "#aaaaaa",        // slightly darker base color
        roughness: 0.8,          // higher roughness = less shiny
        metalness: 0.1,          // lower metalness = less reflective
    });

    useEffect(() => {
        if (!imgUrl) return;

        console.log(imgUrl)
        const loader = new THREE.TextureLoader();
        loader.load(imgUrl, (texture) => {
            texture.anisotropy = 16;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.colorSpace = THREE.SRGBColorSpace;

            texture.center.set(0.5, 0.5);
            texture.rotation = Math.PI;
            texture.wrapS = THREE.RepeatWrapping;
            texture.repeat.x = -1;

            materialRef.current.map = texture;
            materialRef.current.needsUpdate = true;
        });
    }, []);

    
    const slideWorldSpacing = slideWidth * WorldPerPixel;

    const correctedIndex = index - 3;
    const positionX = correctedIndex * slideWorldSpacing;

    useFrame(({ clock }) => {
        if (!groupRef.current) return;

        const totalSlides = slides.length;
        const totalWidth = totalSlides * slideWorldSpacing;

        let x = -(correctedIndex - sliderOffset) * slideWorldSpacing;
        x = ((x + totalWidth/2) % totalWidth + totalWidth) % totalWidth - totalWidth/2;

        //bobbing
        const bobAmplitude = 0.05;
        const bobSpeed = 1;
        groupRef.current.position.y = -0.5 + Math.sin(clock.getElapsedTime() * bobSpeed + index) * bobAmplitude;

        //swaying
        const swayAmplitude = 0.1;
        const swaySpeed = 1.5;

        groupRef.current.position.x = x;
        groupRef.current.lookAt(camera.position);
        //groupRef.current.rotateY(-Math.PI / 2);
        groupRef.current.rotateZ(-0.2);
        groupRef.current.rotation.y = -1.58 + Math.sin(clock.getElapsedTime() * swaySpeed + index) * swayAmplitude;
        groupRef.current.rotation.z = (1.45) -1.58 + Math.sin(clock.getElapsedTime() * swaySpeed + index) * swayAmplitude;
    });

    return (
        <group
            ref={groupRef}
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