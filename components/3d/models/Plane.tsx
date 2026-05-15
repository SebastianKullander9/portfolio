"use client";

import { forwardRef, useImperativeHandle, useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import vertexShader from "../../../public/shaders/background/performance/custom.vert.glsl";
import fragmentShader from "../../../public/shaders/background/performance/custom.frag.glsl";

import { planeConfig } from "../config/animationConfig";
const { UNIFORMS, PLANE } = planeConfig;

const Plane = forwardRef<THREE.Mesh, object>((_, ref) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useImperativeHandle(ref, () => meshRef.current!, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: UNIFORMS.uTime },
      incline: { value: UNIFORMS.incline },
      amplitude: { value: UNIFORMS.amplitude },
      uSpeed: { value: UNIFORMS.uSpeed },
    }),
    [],
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime() * 10.0;
    }
  });

  if (!vertexShader || !fragmentShader) return null;

  return (
    <mesh ref={meshRef} position={PLANE.position} rotation={PLANE.rotation}>
      <planeGeometry args={PLANE.geometry} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
});

Plane.displayName = "Plane";

export default Plane;
