"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import SlidingText from "./SlidingText";
import Plane from "./Plane";
import * as THREE from "three";
import { Suspense, useState } from "react";
import Model from "./Model";

function SceneContent() {
    const scroll = useScroll();
    const [scrollOffset, setScrollOffset] = useState(0);

    useFrame(() => {
        console.log(scroll.offset)
        setScrollOffset(scroll.offset);
    });

    return (
        <>
            <Plane />
            <Model scrollOffset={scrollOffset} />
            <SlidingText />

            <Scroll html>
                <div style={{ position: 'absolute', top: '100vh', width: '100vw', padding: 40 }}>
                    <h1>Now scrolling into HTML content</h1>
                    <p>This scrolls after canvas scroll is finished.</p>
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
                <ScrollControls pages={1} damping={1}>
                    <SceneContent />
                </ScrollControls>
            </Suspense>
        </Canvas>
    );
}