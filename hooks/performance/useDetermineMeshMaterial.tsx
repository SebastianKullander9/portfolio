import React, { useEffect, useMemo } from "react";
import { createGradientGlassMaterial } from "@/components/3d/materials/gradientGlassMaterial";

export default function useDetermineMeshMaterial(performanceTier: "low" | "medium" | "high") {
    const material = useMemo(
        () => createGradientGlassMaterial({ dispersion: performanceTier === "high" }),
        [performanceTier],
    );

    useEffect(() => () => material.dispose(), [material]);

    return useMemo(() => <primitive object={material} attach="material" />, [material]);
}
