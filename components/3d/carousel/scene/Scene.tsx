//FIX MAGIC POV VALUES HERE AND CANVAS INTO ANIMATIONCONFIG

import Plane from "../plane/Plane";
import MacScreen from "../models/MacScreen";
import { useThree } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useSlidesStore } from "@/store/useSlidesStore";
import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import React from "react";

export default function Scene() {
    const { camera, size } = useThree();
    const { slides, slideWidth, sliderOffset  } = useSlidesStore();
    const [vertexShader, setVertexShader] = useState<string | null>(null);
    const [fragmentShader, setFragmentShader] = useState<string | null>(null);

    const planeRefs = useRef<React.RefObject<THREE.Mesh | null>[]>([])
    const macRefs = useRef<React.RefObject<THREE.Group | null>[]>([]);

    useEffect(() => {
        fetch("/shaders/carousel/custom.vert.glsl").then(res => res.text()).then(setVertexShader);
        fetch("/shaders/carousel/custom.frag.glsl").then(res => res.text()).then(setFragmentShader);
    }, []);
 
    if (planeRefs.current.length !== slides.length) {
        planeRefs.current = slides.map(() => React.createRef<THREE.Mesh>());
    }
    
    if (macRefs.current.length !== slides.length) {
        macRefs.current = slides.map(() => React.createRef<THREE.Group>());
    }

    function getWorldPerPixel(cameraFov: number) {
        const fov = (cameraFov * Math.PI) / 180;
        const worldHeight = 2 * Math.tan(fov / 2) * camera.position.z;
        const cameraAspect = size.width / size.height;
        const worldWidth = worldHeight * cameraAspect;
        return worldWidth / window.innerWidth;
    }

    const WorldPerPixel = getWorldPerPixel(20);
    const slideWorldSpacing = slideWidth * WorldPerPixel;

    useFrame(({ clock }) => {
        const totalSlides = slides.length;
        const totalWidth = totalSlides * slideWorldSpacing;

        planeRefs.current.forEach((ref, index) => {
            if (!ref.current) return;
            
            let x = -(index - 3 - sliderOffset) * slideWorldSpacing;
            x = ((x + totalWidth / 2) % totalWidth + totalWidth) % totalWidth - totalWidth / 2;
            ref.current.position.x = x;

            const material = ref.current.material;

            if (material instanceof THREE.ShaderMaterial) {
                material.uniforms.uTime.value = clock.getElapsedTime();
            }
        });

        macRefs.current.forEach((ref, index) => {
            if (!ref.current) return;

            let x = -(index - 3 - sliderOffset) * slideWorldSpacing;
            x = ((x + totalWidth / 2) % totalWidth + totalWidth) % totalWidth - totalWidth / 2;

            const bobAmplitude = 0.05;
            const bobSpeed = 1;
            ref.current.position.y = -0.5 + Math.sin(clock.getElapsedTime() * bobSpeed + index) * bobAmplitude;

            const swayAmplitude = 0.1;
            const swaySpeed = 1.5;
            const sway = Math.sin(clock.getElapsedTime() * swaySpeed + index) * swayAmplitude;

            ref.current.position.x = x;

            ref.current.lookAt(camera.position);
            ref.current.rotation.y = -1.58 + sway;
            ref.current.rotation.z = -0.2 + sway * 0.2;
        });
    });

    if (!vertexShader || !fragmentShader) return null;

    return (
        <>  
            {slides.map((slide, index) => (
                <group key={index}>
                    <Plane refProp={planeRefs.current[index]} index={index} WorldPerPixel={WorldPerPixel} slideWidth={slideWidth} vertexShader={vertexShader} fragmentShader={fragmentShader} />
                    <MacScreen refProp={macRefs.current[index]} index={index} WorldPerPixel={WorldPerPixel} imgUrl={slide.imgUrl} />
                </group>
            ))}
        </>
    );
}