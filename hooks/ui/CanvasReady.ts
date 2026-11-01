import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function CanvasReady({ onReady }: { onReady: () => void }) {
  const frameCount = useRef(0);

  useFrame(({ invalidate }) => {
    frameCount.current += 1;
    if (frameCount.current === 2) { // wait 1–2 frames for first render
      onReady();
    } else if (frameCount.current < 2) {
      // While the loader shows, the canvas only renders on demand: ask for the second frame
      // instead of waiting for something else (like an asset finishing) to trigger it
      invalidate();
    }
  });

  return null;
}
