import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';

export default function Model() {
    const groupRef = useRef<THREE.Group>(null);
    const { scene } = useThree();
    const scroll = useScroll()

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
                transmission: 1,
                thickness: 0.5,
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

            mesh.position.set(-0.04, -0.05, 4.765);
            mesh.scale.set(0.10, 0.10, 0.10);
            mesh.rotation.y = 0.9;
        }
    }, [mesh, scene.environment]);

    const rotationY = useRef(-0.9);
    const baseY = -0.07;

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        console.log(scroll.offset)

        // Subtle float
        if (groupRef.current) {
            const amplitude = 0.004;
            const speed = 2;
            groupRef.current.position.y = amplitude * Math.sin(time * speed);
        }

        if (mesh) {
            // Scroll-triggered Y rotation from -10.4 to 0
            if (scroll.offset > 0.2) {
                const scrollProgress = Math.min((scroll.offset - 0.2) / 0.2, 1); // 0 to 1
                const targetRotation = THREE.MathUtils.lerp(-10.4, 0, scrollProgress);
                rotationY.current = targetRotation;
                mesh.rotation.y = rotationY.current;
            }

            // Optional: subtle float for mesh too (if you want)
            const amplitudeMesh = 0.0025;
            const speedMesh = 4;
            mesh.position.y = baseY + amplitudeMesh * Math.sin(time * speedMesh);
        }
    });

    return (
        <group ref={groupRef} dispose={null}>
            {mesh && <primitive object={mesh} />}
        </group>
    );
}

useGLTF.preload('/models/sk-logo.glb');

//mesh.position.set(0.035, -0.05, 4.765);
//mesh.rotation.y = 0.9;
//mesh.rotation.z = 0;