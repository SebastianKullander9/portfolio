import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type FrameCallback = (state: {
    clock: THREE.Clock;
    delta: number;
    camera: THREE.Camera;
    // The canvas's size in CSS pixels. It's 100lvh tall, so on phones it can be taller than window.innerHeight
    size: { width: number; height: number };
}) => void;

export function useFrameManager(callbacks: FrameCallback[]) {
    useFrame((state, delta) => {
        const { clock, camera, size } = state;

        for (const cb of callbacks) {
            cb({ clock, delta, camera, size });
        }
    });
}