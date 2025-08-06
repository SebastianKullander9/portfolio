"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import SlidingText from "./SlidingText";
import Plane from "./Plane";
import * as THREE from "three";
import { Suspense, useRef, useEffect } from "react";
import Model from "./Model";
import Carousel from "./Carousel/Carousel";
import { EmblaOptionsType } from "embla-carousel";

function SceneContent() {
    const scroll = useScroll();
    const scrollOffset = useRef(0);
    const { gl, size } = useThree();

    const renderTarget = useRef(new THREE.WebGLRenderTarget(size.width, size.height)).current;

    const OPTIONS: EmblaOptionsType = { loop: true }
	const SLIDE_COUNT = 5
	const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

    useFrame(() => {
        scrollOffset.current = scroll.offset;

        gl.setRenderTarget(renderTarget);
        gl.clear();
        gl.render(backgroundScene, backgroundCamera);
        gl.setRenderTarget(null);
    });

    const backgroundScene = useRef(new THREE.Scene()).current;
    const backgroundCamera = useRef(new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100)).current;
    backgroundCamera.position.z = 5;

    const planeRef = useRef<THREE.Mesh>(null);

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
                    <div className="w-9/10 h-8/10 flex flex-col justify-between text-white">
                        <div className="w-full flex flex-row justify-between">
                            <div className="font-bold text-5xl">S.K</div>
                            <div className="font-bold text-5xl">Menu</div>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <div className="text-lg font-bold w-[15vw]">This portfolio is built on Next.js, React Three Fiber and Drei</div>
                            <div className="text-lg font-bold w-[15vw] border-1 rounded-xl flex items-center marquee">
                                <div className="marquee-inner">
                                    <span>This website is still under constructiton 👷‍♂️ 🚧 🔨</span>
                                    <span>This website is still under constructiton 👷‍♂️ 🚧 🏗</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[100vw] h-[100vh]"></div>
                <div className="w-[100vw] h-[100vh]">
                    <div className="w-full h-full ">
                        <p className="w-9/10 mx-auto text-xl font-bold text-white">About</p>
                        <div className="w-9/10 h-8/10 flex items-center mx-auto">
                            <p className="max-w-2/4 text-3xl/12 text-white font-bold tracking-widest">
                            <span className="text-5xl">Sebastian Kullander</span> — I&apos;m a junior fullstack developer who&apos;s all about the web. I love building
                            web experiences that look great and are super easy to use. I mostly work with modern JavaScript
                            stuff like TypeScript, React, Next.js, and Node.js.
                            </p>
                        </div>
                    </div>
                </div>
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
            camera={{ position: [0, 0, 5] }}
            gl={{
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.0,
                localClippingEnabled: true,
            }}
        >
            <Suspense fallback={null}>
                <directionalLight position={[0, 3, 2]} intensity={3} />
                <Environment preset="dawn"/>
                <ScrollControls pages={6} damping={0} >
                    <SceneContent />
                </ScrollControls>
            </Suspense>
        </Canvas>
    );
}