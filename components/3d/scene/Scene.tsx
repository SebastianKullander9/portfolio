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
import { useMailAnimations } from "@/hooks/useMailAnimations";

export default function Scene() {
    const pathname = usePathname();
    const planeRef = useRef<THREE.Mesh>(null);
    const logoRef = useLogoAnimations();
    const mailRef = useMailAnimations();
    useStats(0);

    return (
        <>
            <Plane ref={planeRef} />
            {pathname === "/" ? 
                <>
                    <Logo ref={logoRef} />
                    <SlidingText />
                    <Mail ref={mailRef} />
                </> : 
                <>
                </>
            }
        </>
    );
}