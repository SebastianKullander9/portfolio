"use client";

import { useEffect, useState } from "react";

export default function HeaderWrapper({ children }: { children: React.ReactNode }) {
    const [isAtBottom, setIsAtBottom] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            setIsAtBottom(scrollY + windowHeight >= docHeight - 130);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])
    
    return (
        <div className={isAtBottom ? "hidden" : ""}>
            {children}
        </div>
    );
}