import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type FrameCallback = (state: {
    clock: THREE.Clock;
    delta: number;
    camera: THREE.Camera;
}) => void;

export function useFrameManager(callbacks: FrameCallback[]) {
    useFrame((state, delta) => {
        const { clock, camera } = state;
        
        for (const cb of callbacks) {
            cb({ clock, delta, camera });
        }
    });
}