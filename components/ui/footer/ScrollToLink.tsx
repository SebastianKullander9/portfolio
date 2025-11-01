"use client";

import { useScrollStore } from "@/store/useScrollStore";
import AnimatedLink from "../animatedLink/AnimatedLink";

type ScrollToLinkProps = {
    label: string;
    scrollToId: string;
}

export default function ScrollToLink({ label, scrollToId }: ScrollToLinkProps) {
    const setScrollToSection = useScrollStore((s) => s.setScrollToSection);

    return (
        <div>
            <AnimatedLink text={label} onClick={() => setScrollToSection(scrollToId)}/>
        </div>
    );
}