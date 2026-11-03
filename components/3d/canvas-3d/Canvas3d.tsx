import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Scene from "../scene/Scene";
import { CanvasReady } from "@/hooks/ui/CanvasReady";

import { canvasConfig } from "../config/animationConfig";
const { CAMERA } = canvasConfig;

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
                // Tiny, so the near plane doesn't cut the logo open as it flies at the camera (0.01 cut it for the
                // last 11% of the fly-out, 0.001 for the last 2%, this never on screen)
                near: 0.0001,
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
            {/* No lights or environment map: the glass is lit by the background gradient itself */}
            <Scene />
            <CanvasReady onReady={onCanvasCreated} />
        </Canvas>
    );
}

export default Canvas3d;
