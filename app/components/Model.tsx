import React, { useRef, useEffect, forwardRef, useImperativeHandle} from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';

type ModelProps = {
    scrollOffset: number;
}

export default function Model({ scrollOffset}: ModelProps) {
    const groupRef = useRef<THREE.Group>(null);
    const smoothedScroll = useRef(scrollOffset);
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

            mesh.position.set(0.035, -0.05, 4.765);
            mesh.scale.set(0.10, 0.10, 0.10);
            mesh.rotation.y = 0.9;
        }
    }, [mesh, scene.environment]);

    const keyframes = [
        { scroll: 0.05, rotation: 0.831 },
        { scroll: 0.108, rotation: 0.762 },
        { scroll: 0.166, rotation: 0.693 },
        { scroll: 0.224, rotation: 0.624 },
        { scroll: 0.282, rotation: 0.555 },
        { scroll: 0.34, rotation: 0.486 },
        { scroll: 0.398, rotation: 0.417 },
        { scroll: 0.456, rotation: 0.348 },
        { scroll: 0.514, rotation: 0.279 },
        { scroll: 0.572, rotation: 0.21 },
        { scroll: 0.63, rotation: 0.141 },
        { scroll: 0.688, rotation: 0.072 },
        { scroll: 0.746, rotation: 0.0 },
    ];

    function interpolateRotation(scrollOffset: number) {
    if (scrollOffset <= keyframes[0].scroll) return keyframes[0].rotation;
    if (scrollOffset >= keyframes[keyframes.length - 1].scroll) 
        return keyframes[keyframes.length - 1].rotation;

    for (let i = 0; i < keyframes.length - 1; i++) {
        const curr = keyframes[i];
        const next = keyframes[i + 1];
        if (scrollOffset >= curr.scroll && scrollOffset <= next.scroll) {
        const t = (scrollOffset - curr.scroll) / (next.scroll - curr.scroll);
        return curr.rotation + t * (next.rotation - curr.rotation);
        }
    }
    return 0;
    }
    
    useFrame(({ clock }) => {
        if (!groupRef.current || !mesh) return;

        const time = clock.getElapsedTime();
        const amplitude = 0.0025;
        const speed = 2.5;
        groupRef.current.position.y = amplitude * Math.sin(time * speed);

        smoothedScroll.current += (scrollOffset - smoothedScroll.current) * 0.15;

        mesh.rotation.y = interpolateRotation(smoothedScroll.current);

        const startScroll = keyframes[0].scroll;
        const endScroll = keyframes[keyframes.length - 1].scroll;
        const startX = 0.035;
        const endX = 0;

        let t = (smoothedScroll.current - startScroll) / (endScroll - startScroll);
        t = Math.min(Math.max(t, 0), 1);

        mesh.position.x = startX + t * (endX - startX);
    });

    return (
        <group ref={groupRef} dispose={null}>
            {mesh && <primitive object={mesh} />}
        </group>
    );
}

useGLTF.preload('/models/sk-logo.glb');