import { useMemo } from "react";
import { useThree } from "@react-three/fiber";

export type PerformanceTier = "low" | "medium" | "high";

export function useDevicePerformance(): PerformanceTier {
    const { gl } = useThree();

    const tier = useMemo(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            return "low";
        }

        const glContext = gl.getContext();
        const debugInfo = glContext.getExtension("WEBGL_debug_renderer_info");
        const renderer = debugInfo ? glContext.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "";
        const isHighEndGPU = /NVIDIA.*(?:RTX|GTX\s*(?:16|20|30|40)\d{2})|AMD.*(?:RX\s*[56789]\d{3}|Radeon\s*(?:VII|RX))|Apple\s*M[1-3]\s*(?:Pro|Max|Ultra)/i.test(renderer);
        const isMediumGPU = /NVIDIA.*(?:GTX\s*(?:9|10)\d{2}|MX\s*[3-5]\d{2})|AMD.*(?:RX\s*[45]\d{2}|Vega\s*(?:5[6-9]|[6-9]\d))|Intel.*(?:Iris.*Xe|Arc)/i.test(renderer);
        const isLowEndGPU = /Intel.*(?:HD\s*Graphics|UHD\s*Graphics\s*[6]\d{2}|Iris.*[3-5]\d{2})|AMD.*(?:Radeon.*Vega\s*[3-8]|R[2-5])/i.test(renderer);
        
        if (isHighEndGPU) {
            return "high";

        }
        
        if (isMediumGPU) {
            return "medium";

        }
        
        if (isLowEndGPU) {
            return "low";
        }        

        return "low";
    }, []);

    return tier;
}