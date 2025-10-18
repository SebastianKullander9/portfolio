import Image from "next/image";
import svgStar from "../../../public/svgs/white-star.svg";
import { RefObject } from "react";

const menuItems = ["Home", "About", "Projects", "Contact"];

export default function BackdropMenuContent({ ref }: { ref?: RefObject<HTMLDivElement | null>}) {
    return (
        <div ref={ref} className="flex flex-col justify-end w-full h-full ">
            <div className="relative h-full">
                <div  className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/3 text-4xl/9 sm:text-5xl lg:text-6xl xl:text-7xl text-white font-medium flex flex-col xl:gap-2">
                    {menuItems.map((item) => (
                        <div key={item} className="overflow-hidden flex flex-row items-center gap-4 cursor-pointer group">
                            <Image src={svgStar} alt="" width={40} height={40} className="scale-0 group-hover:scale-100 transition-transform duration-300" />
                            <h1 className="innerMenuItem p-2">{item}</h1>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full site-x-padding site-y-padding site-text-size text-white">
                <div className="overflow-hidden flex flex-row gap-3">
                    <p className="outerMenuItem">GitHub</p>
                    <p className="outerMenuItem">/</p>
                    <p className="outerMenuItem">LinkedIn</p>
                </div>
            </div>
        </div>
    );
}
