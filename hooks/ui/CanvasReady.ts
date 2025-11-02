import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

export function CanvasReady({ onReady }: { onReady: () => void }) {
  const frameCount = useRef(0);

  useFrame(() => {
    frameCount.current += 1;
    if (frameCount.current === 2) { // wait 1–2 frames for first render
      onReady();
    }
  });

  return null;
}