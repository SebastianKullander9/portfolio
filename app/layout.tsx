import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/ui/Header";
import { CanvasLoader } from "../components/canvas-loader/canvas-loader";
import SmoothScroll from "../components/ui/SmoothScroll";

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
                <Header />
                <SmoothScroll />
                <CanvasLoader />

                {children}
            </body>
        </html>
    );
}
