import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import Scene from "../scene/Scene";
import { CanvasReady } from "@/hooks/ui/CanvasReady";

import { canvasConfig } from "../config/animationConfig";
const { CAMERA, DIRECTIONALLIGHT } = canvasConfig;

type Canvas3dProps = {
    onCanvasCreated: () => void;
    frameloop?: "always" | "demand" | "never";
};

function Canvas3d({ onCanvasCreated, frameloop = "always" }: Canvas3dProps) {
    const isMobile =
        typeof window !== "undefined" && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    return (
        <Canvas
            frameloop={frameloop}
            camera={{
                position: CAMERA.position,
                near: 0.01,
            }}
            dpr={isMobile ? [1, 1.5] : [1, 2]}
            performance={{ min: 0.5 }}
            gl={{
                antialias: !isMobile,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.0,
                localClippingEnabled: true,
                powerPreference: "high-performance",
            }}
        >
            <directionalLight
                position={DIRECTIONALLIGHT.position}
                intensity={DIRECTIONALLIGHT.intensity}
            />
            <Environment preset="dawn" />
            <Scene />
            <CanvasReady onReady={onCanvasCreated} />
        </Canvas>
    );
}

export default Canvas3d;
