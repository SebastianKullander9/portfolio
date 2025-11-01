
import React, { useMemo } from "react";
import { MeshTransmissionMaterial } from "@react-three/drei";

import { modelConfig } from "../../components/3d/config/animationConfig";
const { TRANSMISSION_MATERIAL, STANDARD_MATERIAL, PHYSICAL_MATERIAL, COLOR } = modelConfig.MATERIAL;

export default function useDetermineMeshMaterial(performanceTier: "low" | "medium" | "high") {
    const material = useMemo(() => {
        switch (performanceTier) {
            case "low":
                return <meshPhysicalMaterial {...PHYSICAL_MATERIAL} color={COLOR} transparent/>
            case "medium":
                return <meshPhysicalMaterial {...PHYSICAL_MATERIAL} color={COLOR} transparent/>
            case "high":
            default:
                return (
                    <MeshTransmissionMaterial {...TRANSMISSION_MATERIAL} color={COLOR} transparent/>
                )
        }
    }, [performanceTier]);

    return material;
}
 
//<meshStandardMaterial {...STANDARD_MATERIAL} color={COLOR} />