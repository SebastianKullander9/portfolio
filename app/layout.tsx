import type { Metadata } from "next";
import "./globals.css";
import { CanvasLoader } from "../components/canvas-loader/canvas-loader";
import SmoothScroll from "@/components/ui/smoothScroll/SmoothScroll";

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
                className={`antialiased`}
            >
                <SmoothScroll />
                <CanvasLoader />

                {children}
            </body>
        </html>
    );
}
