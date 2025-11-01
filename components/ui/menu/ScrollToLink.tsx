"use client";

import svgStar from "../../../public/svgs/white-star.svg";
import Image from "next/image";
import { useScrollStore } from "@/store/useScrollStore";

type ScrollToLinkProps = {
    label: string;
    scrollToId: string;
}

export default function ScrollToLink({ label, scrollToId }: ScrollToLinkProps) {
    const setScrollToSection = useScrollStore((s) => s.setScrollToSection);

    return (
        <button onClick={() => setScrollToSection(scrollToId)} className="overflow-hidden flex flex-row items-center gap-4 cursor-pointer group">
            <Image src={svgStar} alt="" width={40} height={40} className=" scale-0 group-hover:scale-100 transition-transform duration-300" />
            <h2 className="innerMenuItem p-2 text-[80px]/25 leading-27">{label}</h2>
        </button>
    );
}