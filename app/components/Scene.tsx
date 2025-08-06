"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import SlidingText from "./fiberComponents/SlidingText";
import Plane from "./fiberComponents/Plane";
import * as THREE from "three";
import { Suspense, useRef, useEffect } from "react";
import Model from "./fiberComponents/Model";
import Carousel from "./carousel/Carousel";
import { EmblaOptionsType } from "embla-carousel";
import Home from "./pages/Home";
import About from "./pages/About";

import { canvasConfig } from "../config/animationConfig";
const { CAMERA, DIRECTIONALLIGHT, SCROLLCONTROLS } = canvasConfig;


function SceneContent() {
    const scroll = useScroll();
    const scrollOffset = useRef(0);
    const planeRef = useRef<THREE.Mesh>(null);
    const { gl, size } = useThree();

    const renderTarget = useRef(new THREE.WebGLRenderTarget(size.width, size.height)).current;

    const OPTIONS: EmblaOptionsType = { loop: true };
	const SLIDE_COUNT = 5;
	const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

    const backgroundScene = useRef(new THREE.Scene()).current;
    const backgroundCamera = useRef(new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100)).current;
    backgroundCamera.position.z = 5;

    useFrame(() => {
        scrollOffset.current = scroll.offset;

        gl.setRenderTarget(renderTarget);
        gl.clear();
        gl.render(backgroundScene, backgroundCamera);
        gl.setRenderTarget(null);
    });

    useEffect(() => {
          if(planeRef.current) {
            backgroundScene.add(planeRef.current);
          }
    }, [])

    // Resize handling
    useEffect(() => {
        renderTarget.setSize(size.width, size.height);
        backgroundCamera.aspect = size.width / size.height;
        backgroundCamera.updateProjectionMatrix();
    }, [size]);


    return (
        <>
            <Plane ref={planeRef} />
            <Model backgroundTexture={renderTarget.texture} />
            <SlidingText />

            <Scroll html>
                <div className="w-[100vw] h-[100vh] flex justify-center items-center">
                    <Home />
                </div>

                {/*Scroll view*/}
                <div className="w-[100vw] h-[100vh]"></div>
                <div className="w-[100vw] h-[100vh]">
                    <About />
                </div>

                {/*Scroll view*/}
                <div className="w-[100vw] h-[100vh]"></div>
                <div className="w-[100vw] h-[100vh]">
                    <Carousel slides={SLIDES} options={OPTIONS}/>
                </div>
            </Scroll>
        </>
    );
}

export default function Scene() {
    return (
        <Canvas
            camera={{ position: CAMERA.position }}
            gl={{
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.0,
                localClippingEnabled: true,
            }}
        >
            <Suspense fallback={null}>
                <directionalLight position={ DIRECTIONALLIGHT.position } intensity={ DIRECTIONALLIGHT.intensity } />
                <Environment preset="dawn"/>
                <ScrollControls pages={ SCROLLCONTROLS.pages } damping={ SCROLLCONTROLS.damping } >
                    <SceneContent />
                </ScrollControls>
            </Suspense>
        </Canvas>
    );
}