"use client";

import dynamic from "next/dynamic";
import { useMounted } from "@/hooks/ui/useMounted";
import { useProgress } from "@react-three/drei";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const Canvas3d = dynamic(() => import("../3d/canvas-3d/Canvas3d"), { ssr: false });

export function CanvasLoader() {
    const { hydrated, canvasMounted, setCanvasMounted } = useMounted();
    const { progress, active } = useProgress();
    const locked = useRef(false);

    const showOverlay = !hydrated || !canvasMounted || active;

    const progressMotion = useMotionValue(0);
    const displayProgress = useTransform(progressMotion, (value) => Math.round(value));

    useEffect(() => {
        if (progress >= 100) locked.current = true;

        progressMotion.set(locked.current ? 100 : progress);
    }, [progress, progressMotion]);

    return (
        <div className="fixed inset-0 h-[100lvh] w-screen overflow-hidden">
            <Canvas3d frameloop={showOverlay ? "demand" : "always"} onCanvasCreated={() => setCanvasMounted(true)} />

            <AnimatePresence>
                {showOverlay && (
                    <motion.div
                        key="overlay"
                        initial={{ y: 0 }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        style={{ willChange: "transform" }}
                        className="absolute inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-black"
                    >
                        <div className="heading-2 font-bold mb-2 text-[#E18F99]">
                            {!hydrated ? (
                                "0% Loading"
                            ) : (
                                <motion.div style={{ display: "inline-block" }}>
                                    {displayProgress.get()}% Loading
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}