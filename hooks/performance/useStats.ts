import { useEffect, useRef, useState } from "react";
import Stats from "stats.js";
import { useFrame } from "@react-three/fiber";

export function useStats(panel = 0) {
    const statsRef = useRef<Stats | null>(null);
    const [enabled, setEnabled] = useState(
        typeof window !== "undefined" && window.location.hash === "#debug"
    );

    useEffect(() => {
        function handleHashChange() {
            setEnabled(window.location.hash === "#debug");
        };

        window.addEventListener("hashchange", handleHashChange);
        
        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

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