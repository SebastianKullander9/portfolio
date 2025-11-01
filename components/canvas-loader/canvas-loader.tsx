"use client";

import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("../3d/canvas-3d/Canvas3d"), {
    ssr: false,
});

export function CanvasLoader() {
    return (
        <div className="fixed inset-0 h-[100lvh]">
            <Canvas />
        </div>
    );
}