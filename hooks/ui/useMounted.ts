import { useEffect, useState } from "react";

export function useMounted() {
    const [hydrated, setHydrated] = useState(false);
    const [canvasMounted, setCanvasMounted] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    return { hydrated, canvasMounted, setCanvasMounted };
}