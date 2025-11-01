"use client";

import * as THREE from "three";
import { useRef, useEffect } from "react";
import Plane from "../models/Plane";
import Logo from "../models/Logo";
import SlidingText from "../models/SlidingText";
import Mail from "../models/Mail";
import { useLogoAnimations } from "@/hooks/animations/useLogoAnimations";
import { usePathname } from "next/navigation";
import { useStats } from "@/hooks/performance/useStats";
import { useMailHomeAnimations } from "@/hooks/animations/useMailHomeAnimations";
import { useMailContactAnimations } from "@/hooks/animations/useMailContactAnimations";
import { useSlidingTextAnimations } from "@/hooks/animations/useSlidingTextAnimations";
import { useDevicePerformance } from "@/hooks/performance/useDevicePerformance";
import { useFrameManager } from "@/hooks/performance/useFrameManager";
import { useAnimationStore } from "@/store/useAnimationStore";

export default function Scene() {
    const pathname = usePathname();
    const setPathname = useAnimationStore((s) => s.setPathname);
    const planeRef = useRef<THREE.Mesh>(null);
    const logo = useLogoAnimations();
    const mailHome = useMailHomeAnimations();
    const mailContact = useMailContactAnimations();
    const slidingText = useSlidingTextAnimations();
    const performanceTier = useDevicePerformance();

    useEffect(() => {
        setPathname(pathname);
    }, [pathname, setPathname]);

    useFrameManager([logo.animate, pathname === "/" ? mailHome.animate : mailContact.animate, slidingText.animate]);

    useStats(0);

    return (
        <>
            <Plane ref={planeRef} />
            {pathname === "/" ? 
                <>
                    <Logo ref={logo.ref} performanceTier={performanceTier} />
                    <SlidingText refs={slidingText.refs} textWidth={slidingText.textWidth} />
                    <Mail ref={mailHome.ref} performanceTier={performanceTier} />
                </> 
            : pathname === "/contact" ?
                <>
                    <Mail ref={mailContact.ref} performanceTier={performanceTier} />
                </>
            :
                <>
                </>
            }
        </>
    );
}