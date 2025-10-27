import { useEffect, useState } from "react";

export function useDomViewport() {
    const [viewport, setViewport] = useState({ width: 0, isMobile: false });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setViewport({ width, isMobile: width < 768 });
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    return viewport;
}