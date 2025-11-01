"use client";

import { ReactNode, MouseEvent as ReactMouseEvent } from "react";
import { useRouter } from "next/navigation";

type SmartBackBtnWrapperProps = {
    children: ReactNode;
    fallback?: string;
}

export default function SmartBackBtnWrapper({ children, fallback="/" }: SmartBackBtnWrapperProps) {
    const router = useRouter();

    const handleClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (window.history.length > 1) {
            router.back();
        } else {
            router.push(fallback)
        }
    }

    return (
        <button onClick={handleClick} className="text-white">
            { children }
        </button>
    )
}