import type { Metadata } from "next";
import "./globals.css";

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
                {children}
            </body>
        </html>
    );
}
