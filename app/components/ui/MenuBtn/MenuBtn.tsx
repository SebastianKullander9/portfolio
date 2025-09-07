import { useRef, useState } from "react";
import Image from "next/image";
import whiteStar from "../../../../public/svgs/white-star.svg";
import BackdropMenu from "./BackdropMenu";
import "./style.css";
import gsap from "gsap";

export default function MenuBtn() {
    const spinnerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    if (!tlRef.current) {
        tlRef.current = gsap.timeline({ defaults: { duration: 0.2 }, paused: true });
    }

    const handleClick = () => {
        if (!spinnerRef.current || isAnimating) return;

        setIsAnimating(true);

        const tl = gsap.timeline({
            defaults: { duration: 0.2 },
            onComplete: () => setIsAnimating(false)
        });

        if (!isOpen) {
            tl.to(spinnerRef.current, { rotate: "+=45" })
            .to(spinnerRef.current, { "--scale": 1.4 }, "<")
            .to(spinnerRef.current, { "--dot-offset": "-15px" }, "<");
        } else {
            tl.to(spinnerRef.current, { rotate: "-=45" })
            .to(spinnerRef.current, { "--scale": 1 }, "<")
            .to(spinnerRef.current, { "--dot-offset": "-3px" }, "<");
        }

        tl.play();
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="group cursor-pointer">
                {/* relative */}
                <div className="z-50 menu-icon" onClick={handleClick}>
                    <div ref={spinnerRef} className="menu-icon-cross absolute inset-0">
                        <div className="w-5 h-5 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 group-hover:w-8 group-hover:h-8 transform duration-300">
                            <Image src={whiteStar} alt="" width={100} height={100} />
                        </div>
                        <span className="dot top-left"></span>
                        <span className="dot top-right"></span>
                        <span className="dot bottom-left"></span>
                        <span className="dot bottom-right"></span>
                    </div>
                </div>
            </div>

            <BackdropMenu isOpen={isOpen} />
        </>
    );
}