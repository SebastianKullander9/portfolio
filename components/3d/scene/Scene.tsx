"use client";

import * as THREE from "three";
import { useRef } from "react";
import Plane from "../models/Plane";
import Logo from "../models/Logo";
import SlidingText from "../models/SlidingText";
import { useLogoAnimations } from "@/hooks/useLogoAnimations";
import { usePathname } from "next/navigation";

export default function Scene() {
    const pathname = usePathname();
    const planeRef = useRef<THREE.Mesh>(null);
    const logoRef = useLogoAnimations();

    /*
    useFrame(({ clock }) => {
        //let a2 = data.range(2.5 / 6, 1/6);
        //a2 = easeInCirc(a2);
        
        const time = clock.getElapsedTime();

        /*if (modelRef.current) {
            

            if (a2 > 0) {
                animatePosition([0.2, -0.05, 4.650], [0.2, 0.5, 4.650], a2, modelRef.current, time);
            }
        }
    });*/

    return (
        <>
            <Plane ref={planeRef} />
            {pathname === "/" ? 
                <>
                    <Logo ref={logoRef} />
                    <SlidingText />
                </> : 
                <>
                </>
            }
        </>
    );
}