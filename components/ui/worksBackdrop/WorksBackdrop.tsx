"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const TOP_SHADE = `linear-gradient(to bottom,
    rgb(0 0 0 / 0.4) 0%,
    rgb(0 0 0 / 0.3) 8%,
    rgb(0 0 0 / 0.19) 20%,
    rgb(0 0 0 / 0.11) 35%,
    rgb(0 0 0 / 0.05) 55%,
    rgb(0 0 0 / 0.015) 78%,
    rgb(0 0 0 / 0) 100%)`;

export default function WorksBackdrop() {
    const pathname = usePathname();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const works = document.querySelector('[data-scroll-section="works"]');
        if (!works) {
            setVisible(false);
            return;
        }

        const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
        observer.observe(works);
        return () => observer.disconnect();
    }, [pathname]);

    return (
        <div
            className={`pointer-events-none absolute inset-0 backdrop-blur-md transition-[opacity,visibility] duration-700 ease-in-out ${
                visible ? "visible opacity-100" : "invisible opacity-0"
            }`}
        >
            <div className="absolute inset-x-0 top-0 h-[14vh]" style={{ background: TOP_SHADE }} />
        </div>
    );
}
