import type { ReactNode } from "react";
import Image from "next/image";
import svgStar from "@/public/svgs/white-star-fully-symmetrical.svg";

interface SimpleButtonProps {
    // Without one it shows the star. With one, it shows the icon, which scales out as the star scales in on hover
    // or keyboard focus. Either way the whole button shrinks on hover
    icon?: ReactNode;
    // "md" is the full-size button, "sm" the small one (for rows of links)
    size?: "md" | "sm";
    // With href it's a link (opening in a new tab), with onClick a button. With neither it's decorative, for
    // inside a card that is the button itself
    href?: string;
    onClick?: () => void;
    label?: string;
    autoFocus?: boolean;
}

// Smaller below desktop, on phones down to just over a comfortable tap size. `icon` sizes the star or icon inside
const sizes = {
    md: {
        circle: "size-12 sm:size-14 lg:size-20",
        icon: "[&>*]:size-3.5 sm:[&>*]:size-4 lg:[&>*]:size-5",
    },
    sm: {
        circle: "size-11 lg:size-13",
        icon: "[&>*]:size-3.5 lg:[&>*]:size-4",
    },
};

const position =
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex transition-transform duration-400";

export default function SimpleButton({
    icon,
    size = "md",
    href,
    onClick,
    label,
    autoFocus,
}: SimpleButtonProps) {
    const circle = `group/btn relative block ${sizes[size].circle} shrink-0 rounded-full border-1 backdrop-blur-sm bg-white/20 hover:scale-85 focus-visible:scale-85 group-hover/card:scale-85 transition-transform duration-400`;
    const centred = `${position} ${sizes[size].icon}`;
    const star = <Image src={svgStar} alt="" width={20} height={20} />;

    const icons = icon ? (
        <>
            <span
                className={`${centred} scale-100 group-hover/btn:scale-0 group-focus-visible/btn:scale-0`}
            >
                {icon}
            </span>
            <span
                className={`${centred} scale-0 group-hover/btn:scale-100 group-focus-visible/btn:scale-100`}
            >
                {star}
            </span>
        </>
    ) : (
        <span className={centred}>{star}</span>
    );

    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`${circle} outline-none`}
            >
                {icons}
            </a>
        );
    }

    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                aria-label={label}
                autoFocus={autoFocus}
                className={`${circle} cursor-pointer outline-none`}
            >
                {icons}
            </button>
        );
    }

    return <span className={circle}>{icons}</span>;
}

// The X for close buttons
export function CloseIcon({ size = 20 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill="none"
            stroke="white"
            strokeWidth={1.5}
        >
            <path d="M3 3l14 14M17 3L3 17" />
        </svg>
    );
}
