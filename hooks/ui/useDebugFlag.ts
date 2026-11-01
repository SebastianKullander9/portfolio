import { useEffect, useState } from "react";

// True while the URL ends in #debug: shows the stats panel and the material sandbox.
// Starts false and is read after mount, so server and client render the same
export function useDebugFlag() {
    const [debug, setDebug] = useState(false);

    useEffect(() => {
        const update = () => setDebug(window.location.hash === "#debug");
        update();
        window.addEventListener("hashchange", update);
        return () => window.removeEventListener("hashchange", update);
    }, []);

    return debug;
}
