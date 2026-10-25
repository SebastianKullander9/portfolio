import React, { useEffect, useMemo } from "react";
import { createBackgroundGlassMaterial } from "@/components/3d/materials/backgroundGlassMaterial";

export default function useDetermineMeshMaterial(performanceTier: "low" | "medium" | "high") {
    const material = useMemo(
        () => createBackgroundGlassMaterial({ dispersion: performanceTier === "high" }),
        [performanceTier],
    );

    useEffect(() => () => material.dispose(), [material]);

    return useMemo(() => <primitive object={material} attach="material" />, [material]);
}
