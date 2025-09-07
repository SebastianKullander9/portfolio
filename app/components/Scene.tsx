"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import SlidingText from "./fiberComponents/SlidingText";
import Plane from "./fiberComponents/Plane";
import * as THREE from "three";
import { Suspense, useRef, useEffect } from "react";
import Model from "./fiberComponents/Model";
import Carousel from "./Carousel/Carousel";
import { EmblaOptionsType } from "embla-carousel";
import Home from "./pages/Home";
import About from "./pages/About";

import { canvasConfig, modelConfig } from "../config/animationConfig";
import Header from "./ui/Header";
const { CAMERA, DIRECTIONALLIGHT, SCROLLCONTROLS } = canvasConfig;
const { POSITION, ROTATION, BOBBINGDISTANCE, BOBBINGSPEED } = modelConfig;


function SceneContent() {
    const planeRef = useRef<THREE.Mesh>(null);
    const modelRef = useRef<THREE.Mesh>(null);
    const { gl, size } = useThree();

    const renderTarget = useRef(new THREE.WebGLRenderTarget(size.width, size.height)).current;

    const OPTIONS: EmblaOptionsType = { loop: true };
	const SLIDE_COUNT = 5;
	const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

    const backgroundScene = useRef(new THREE.Scene()).current;
    const backgroundCamera = useRef(new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100)).current;
    backgroundCamera.position.z = 5;

    const data = useScroll();

    const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

    function easeInOutCubic(t: number) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animateRotation(start: number[], end: number[], t: number, target: THREE.Mesh) {
        target.rotation.set(
            lerp(start[0], end[0], t),
            lerp(start[1], end[1], t),
            lerp(start[2], end[2], t)
        )
    }
    
    function animatePosition(start: number[], end: number[], t: number, target: THREE.Mesh, time: number) {
        const bobbing = BOBBINGDISTANCE * Math.sin(time * BOBBINGSPEED)
        target.position.set(
            lerp(start[0], end[0], t),
            lerp(start[1], end[1], t) + bobbing,
            lerp(start[2], end[2], t)
        )
    }

    useFrame(({ clock }) => {
        gl.setRenderTarget(renderTarget);
        gl.clear();
        gl.render(backgroundScene, backgroundCamera);
        gl.setRenderTarget(null);

        let a = data.range(0.5 / 1/6, 1/6);
        a = easeInOutCubic(a);
        const time = clock.getElapsedTime();

        if (modelRef.current) {
            animateRotation(ROTATION, [0, 0, 0], a, modelRef.current)
            animatePosition(POSITION, [0.2, -0.05, 4.650], a, modelRef.current, time)
        }
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
            <Model ref={modelRef} backgroundTexture={renderTarget.texture} />
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
        <>
            <Header />

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
        </>
    );
}