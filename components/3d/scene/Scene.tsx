"use client";

import * as THREE from "three";
import { useRef } from "react";
import Plane from "../models/Plane";
import Logo from "../models/Logo";
import SlidingText from "../models/SlidingText";
import Mail from "../models/Mail";
import { useLogoAnimations } from "@/hooks/useLogoAnimations";
import { usePathname } from "next/navigation";
import { useStats } from "@/hooks/useStats";
import { useMailHomeAnimations } from "@/hooks/useMailHomeAnimations";
import { useMailContactAnimations } from "@/hooks/useMailContactAnimations";
import { useSlidingTextAnimations } from "@/hooks/useSlidingTextAnimations";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";
import { useFrameManager } from "@/hooks/useFrameManager";


export default function Scene() {
    const pathname = usePathname();
    const planeRef = useRef<THREE.Mesh>(null);
    const logo = useLogoAnimations();
    const mailHome = useMailHomeAnimations();
    const mailContact = useMailContactAnimations();
    const slidingText = useSlidingTextAnimations();
    const performanceTier = useDevicePerformance();

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