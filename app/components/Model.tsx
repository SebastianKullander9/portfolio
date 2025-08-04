import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';

export default function Model() {
    const groupRef = useRef<THREE.Group>(null);
    const { scene } = useThree();

    const { nodes } = useGLTF("/models/sk-logo.glb") as unknown as {
        nodes: { [key: string]: THREE.Mesh }
    };

    const mesh = nodes["BézierCurve"];

    useEffect(() => {
        if (mesh) {
            mesh.material = new THREE.MeshPhysicalMaterial({
                color: "#94e9f8",
                metalness: 0.2,
                roughness: 0.4,
                transmission: 0.9,
                thickness: 1.5,
                transparent: true,
                opacity: 0.9,
                ior: 1.45,
                envMap: scene.environment,
                envMapIntensity: 1.0,
                clearcoat: 0.2,
                clearcoatRoughness: 0,
                attenuationColor: new THREE.Color(0xffffff),
                attenuationDistance: 1,
            });

            mesh.position.set(0, 0.05, 4.7);
            mesh.scale.set(0.10, 0.10, 0.10);
            mesh.rotation.y = 5.2;
        }
    }, [mesh, scene.environment]);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            const time = clock.getElapsedTime();
            const amplitude = 0.005;
            const speed = 5;
            groupRef.current.position.y = amplitude * Math.sin(time * speed);
        }
    });

    return (
        <group ref={groupRef} dispose={null}>
            {mesh && <primitive object={mesh} />}
        </group>
    );
}

useGLTF.preload('/models/sk-logo.glb');