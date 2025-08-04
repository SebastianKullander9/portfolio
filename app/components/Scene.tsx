"use client";

import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import Plane from "./Plane";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import SlidingText from "./SlidingText";

export default function Scene() {
    return (
        <Canvas
            gl={{
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.0,
            }}
        >
            <Suspense>                
                <directionalLight position={1} intensity={5} />
                <Environment 
                    background={true}
                    files={["/cubemap/px.png",
                            "/cubemap/nx.png",
                            "/cubemap/py.png",
                            "/cubemap/ny.png",
                            "/cubemap/pz.png",
                            "/cubemap/nz.png",
                        ]}
                />

                <Plane />
                <Model />
            </Suspense>

            <SlidingText />
        </Canvas>
    );
}