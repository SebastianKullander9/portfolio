import type { Metadata } from "next";
import "./globals.css";
import { CanvasLoader } from "@/components/canvas-loader/canvasLoader";
import SmoothScroll from "@/components/ui/smoothScroll/SmoothScroll";
import SmoothCursor from "@/components/ui/smoothCursor/SmoothCursor";

export const metadata: Metadata = {
    title: "SK",
    description: "Portfolio for sebastian kullander",
};

export default function RootLayout({
    children,
}:  Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`antialiased bg-[#FFD5E0]`}
            >
                <SmoothCursor />
                <SmoothScroll />
                <CanvasLoader />
                {children}
            </body>
        </html>
    );
}
