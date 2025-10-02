import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import Scene from "../scene/Scene";

import { canvasConfig } from "../config/animationConfig";
const { CAMERA, DIRECTIONALLIGHT } = canvasConfig;

function Canvas3d() {
    return (
        <Canvas
            camera={{ 
                position: CAMERA.position,
                near: 0.01,
            }}
            gl={{
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.0,
                localClippingEnabled: true,
            }}
        >
            <directionalLight position={ DIRECTIONALLIGHT.position } intensity={ DIRECTIONALLIGHT.intensity } />
            <Environment preset="dawn"/>
            <Scene />
        </Canvas>
    );
}

export default Canvas3d;