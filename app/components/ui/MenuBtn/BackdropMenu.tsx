import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import svgStar from "../../../../public/svgs/white-star.svg";

interface BackdropMenuProps {
    isOpen: boolean;
}

export default function BackdropMenu({ isOpen }: BackdropMenuProps) {
    const menuItemsRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!menuItemsRef.current || !backdropRef.current) return;

        const items = menuItemsRef.current.querySelectorAll(".innerMenuItem");
        const tl = gsap.timeline({
            onStart: () => {
                backdropRef.current!.classList.remove("hidden");
            }
        });

        if (isOpen) {
            tl.to(backdropRef.current, {
                opacity: 1,
                duration: 0.3,
                zIndex: 49
            })
            .fromTo(
                items,
                { y: "100%" },
                {
                    y: "0%",
                    stagger: 0.1,
                    duration: 0.4,
                },
                "+=0.05"
            );
        } else {
            tl.to(items, {
                y: "-100%",
                stagger: 0.1,
                duration: 0.3,
            })
            .to(backdropRef.current, {
                opacity: 0,
                duration: 0.3,
                zIndex: -1,
                onComplete: () => {
                    backdropRef.current!.classList.add("hidden");
                }
            });
        }
    }, [isOpen]);

    return (
        <div ref={backdropRef} className="opacity-0 backdrop-blur-sm w-screen h-screen absolute inset-0 bg-pink-400/30">
            <div ref={menuItemsRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-white font-semibold flex flex-col gap-2">
                <div className="overflow-hidden flex flex-row items-center gap-4 cursor-pointer group">
                    <Image src={svgStar} alt="" width={40} height={40} className="scale-0 group-hover:scale-100 transition-transform duration-300" />
                    <h1 className="innerMenuItem p-2">Home</h1>
                </div>
                <div className="overflow-hidden flex flex-row items-center gap-4 cursor-pointer group">
                    <Image src={svgStar} alt="" width={40} height={40} className="scale-0 group-hover:scale-100 transition-transform duration-300" />
                    <h1 className="innerMenuItem p-2">About</h1>
                </div>
                <div className="overflow-hidden flex flex-row items-center gap-4 cursor-pointer group">
                    <Image src={svgStar} alt="" width={40} height={40} className="scale-0 group-hover:scale-100 transition-transform duration-300" />
                    <h1 className="innerMenuItem p-2">Projects</h1>
                </div>
                <div className="overflow-hidden flex flex-row items-center gap-4 cursor-pointer group">
                    <Image src={svgStar} alt="" width={40} height={40} className="scale-0 group-hover:scale-100 transition-transform duration-300" />
                    <h1 className="innerMenuItem p-2">Contact</h1>
                </div>
            </div>
        </div>
    );
}