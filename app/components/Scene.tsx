"use client";

import Core, { damp } from "smooothy"
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import SlidingText from "./SlidingText";
import Plane from "./Plane";
import * as THREE from "three";
import { Suspense, useState, useEffect, useRef } from "react";
import Model from "./Model";

function SceneContent() {
    const scroll = useScroll();
    const [scrollOffset, setScrollOffset] = useState(0);
    const sliderRef = useRef<InstanceType<typeof Core> | null>(null);

    useFrame(() => {
        console.log(scroll.offset)
        setScrollOffset(scroll.offset);
    });

    useEffect(() => {
        const wrapper = document.querySelector("[data-slider]");

        if(!(wrapper instanceof HTMLElement)) return;

        const slider = new Core(wrapper, {
        infinite: true,
        snap: true
        });

        sliderRef.current = slider;

        let animationFrame: number;
        function animate() {
            console.log(slider)
        slider.update();
        animationFrame = requestAnimationFrame(animate);
        }
        animate();

        return () => {
        cancelAnimationFrame(animationFrame);
        slider.destroy();
        sliderRef.current = null;
        };
    }, []);

    return (
        <>
            <Plane />
            <Model scrollOffset={scrollOffset} />
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
                <div className="w-[100vw] h-[100vh]">
                </div>
                <div className="w-[100vw] h-[100vh]">
                    <div className="w-9/10 h-8/10 mx-auto">
                        <p className="text-xl font-bold text-white">Projects</p>
                        <div className="slider-wrapper flex overflow-hidden w-full h-[300px]" data-slider>
                            <div className="slide shrink-0 min-w-full h-full bg-red-500 flex justify-center items-center text-white text-3xl">Slide 1</div>
                            <div className="slide shrink-0 min-w-full h-full bg-green-500 flex justify-center items-center text-white text-3xl">Slide 2</div>
                            <div className="slide shrink-0 min-w-full h-full bg-blue-500 flex justify-center items-center text-white text-3xl">Slide 3</div>
                        </div>
                        <div className="flex justify-center gap-4 mb-4">
                            <button
                                className="px-4 py-2 bg-white text-black font-bold rounded hover:bg-gray-200"
                                onClick={() => sliderRef.current?.goToPrev()}
                            >
                                Prev
                            </button>
                            <button
                                className="px-4 py-2 bg-white text-black font-bold rounded hover:bg-gray-200"
                                onClick={() => sliderRef.current?.goToNext()}
                            >
                                Next
                            </button>
                        </div>
                    </div>
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
                <directionalLight position={[1, 1, 1]} intensity={5} />
                <Environment 
                    background
                    files={[
                        "/cubemap/px.png", "/cubemap/nx.png",
                        "/cubemap/py.png", "/cubemap/ny.png",
                        "/cubemap/pz.png", "/cubemap/nz.png",
                    ]}
                />
                <ScrollControls 
                pages={6}
                >
                    <SceneContent />
                </ScrollControls>
            </Suspense>
        </Canvas>
    );
}