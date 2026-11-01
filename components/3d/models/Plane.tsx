"use client";

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

import vertexShader from "../../../public/shaders/background/performance/custom.vert.glsl";
import fragmentShader from "../../../public/shaders/background/performance/custom.frag.glsl";
import { backgroundUniforms, updateBackgroundUniforms, withBackgroundGradient } from "../shaders/background";

import { planeConfig } from "../config/animationConfig";
const { PLANE } = planeConfig;

const planeVertexShader = withBackgroundGradient(vertexShader);

// Grid spacing in screen short sides. The gradient is evaluated at every grid vertex and blended across
// the triangles between them, so this trades accuracy against vertex work: at 0.03 no pixel is off by
// more than a third of an 8-bit colour step from evaluating it per pixel, for about 2,500 vertices
const GRID_CELL = 0.03;

// A grid over just the part of the plane the camera sees (plus a sliver so no edge pixel is missed).
// It keeps the full plane's uv, so the gradient lines up with the glass that samples the same plane
function createViewGrid(viewWidth: number, viewHeight: number) {
  const shortSide = Math.min(viewWidth, viewHeight);
  const width = viewWidth * 1.02;
  const height = viewHeight * 1.02;
  const geometry = new THREE.PlaneGeometry(
    width,
    height,
    Math.ceil(width / shortSide / GRID_CELL),
    Math.ceil(height / shortSide / GRID_CELL),
  );

  const position = geometry.getAttribute("position");
  const uv = geometry.getAttribute("uv");
  for (let i = 0; i < position.count; i++) {
    uv.setXY(i, position.getX(i) / PLANE.geometry[0] + 0.5, position.getY(i) / PLANE.geometry[1] + 0.5);
  }

  return geometry;
}

const Plane = forwardRef<THREE.Mesh, object>((_, ref) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);

  useImperativeHandle(ref, () => meshRef.current!, []);

  // The part of the plane the camera sees, in world units
  const view = useMemo(() => {
    const fov = camera instanceof THREE.PerspectiveCamera ? camera.fov : 75;
    const height = 2 * Math.tan(THREE.MathUtils.degToRad(fov) / 2) * (camera.position.z - PLANE.position[2]);
    return { width: (height * size.width) / Math.max(1, size.height), height };
  }, [camera, size.width, size.height]);

  const geometry = useMemo(() => createViewGrid(view.width, view.height), [view]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uBlobPos: backgroundUniforms.uBlobPos,
      uBlobScale: backgroundUniforms.uBlobScale,
    }),
    [],
  );

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * 10.0;

    // The blobs are laid out inside the visible part of the plane, in plane uv
    updateBackgroundUniforms(time, view.width / PLANE.geometry[0], view.height / PLANE.geometry[1]);

    if (materialRef.current) {
      // R3F copies each uniform object on mount, so a plain number isn't shared and has to be copied every frame
      materialRef.current.uniforms.uBlobScale.value = backgroundUniforms.uBlobScale.value;
    }
  });

  if (!vertexShader || !fragmentShader) return null;

  return (
    <mesh ref={meshRef} position={PLANE.position} rotation={PLANE.rotation}>
      <primitive object={geometry} attach="geometry" />
      <shaderMaterial
        ref={materialRef}
        vertexShader={planeVertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
});

Plane.displayName = "Plane";

export default Plane;
