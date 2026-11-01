import { useEffect, useRef } from "react";
import Stats from "stats.js";
import { useFrame } from "@react-three/fiber";
import { useDebugFlag } from "@/hooks/ui/useDebugFlag";

export function useStats(panel = 0) {
    const statsRef = useRef<Stats | null>(null);
    const enabled = useDebugFlag();

    useEffect(() => {
        if (!enabled) return;

        const stats = new Stats();
        stats.showPanel(panel);
        document.body.appendChild(stats.dom);
        statsRef.current = stats;

        return () => {
            document.body.removeChild(stats.dom);
        };
    }, [panel, enabled]);

    useFrame(() => {
        if (!enabled) return;

        statsRef.current?.begin();
        statsRef.current?.end();
    });
}
