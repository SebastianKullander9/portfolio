"use client";

import svgStar from "../../../public/svgs/white-star.svg";
import Image from "next/image";
import { useScrollStore } from "@/store/useScrollStore";
import { useAnimationStore } from "@/store/useAnimationStore";
import { usePathname, useRouter } from "next/navigation";

type ScrollToLinkProps = {
    label: string;
    scrollToId: string;
}

export default function ScrollToLink({ label, scrollToId }: ScrollToLinkProps) {
    const router = useRouter();
    const pathname = usePathname();

    const setScrollToSection = useScrollStore((s) => s.setScrollToSection);
    const setPendingScroll = useScrollStore((s) => s.setPendingScroll);
    const menuOpen = useAnimationStore((s) => s.menuOpen);
    const setMenuOpen = useAnimationStore((s) => s.setMenuOpen);

    const handleClick = () => {
        if (pathname !== "/") {
            setPendingScroll(scrollToId);
            router.push("/");
            if (menuOpen) setMenuOpen(false);
            return;
        }

        if (menuOpen) {
            setPendingScroll(scrollToId);
            setMenuOpen(false);
        } else {
            setScrollToSection(scrollToId);
        }
    };

    return (
        <button onClick={handleClick} className="overflow-hidden flex flex-row items-center gap-4 cursor-pointer group">
            <Image src={svgStar} alt="" width={40} height={40} className="scale-0 group-hover:scale-100 transition-transform duration-300" />
            <h2 className="innerMenuItem p-2 heading-1 leading-10 md:leading-20">{label}</h2>
        </button>
    );
}