import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import Scene from "../scene/Scene";
import { Environment } from "@react-three/drei";

import { canvasConfig } from "../../config/animationConfig";
const { DIRECTIONALLIGHT } = canvasConfig;

export default function CarouselCanvas() {
    return (
        <>
            <Canvas
                gl={{
                    toneMapping: THREE.LinearToneMapping,
                    toneMappingExposure: 1.0,
                    localClippingEnabled: true,
                }}
                camera={{ fov: 20 }}
                onCreated={({ gl }) => {
                    gl.outputColorSpace = THREE.SRGBColorSpace;
                }}
            >
                <directionalLight position={[0, 100, 5]} intensity={ 0.05 } />
                <Environment preset="dawn"/>
                <Scene />
            </Canvas>
        </>
    )
};