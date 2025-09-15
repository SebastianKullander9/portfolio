import Image from "next/image";
import svgStar from "../../../public/svgs/white-star.svg";
import { RefObject } from "react";

const menuItems = ["Home", "About", "Projects", "Contact"];

export default function BackdropMenuContent({ ref }: { ref?: RefObject<HTMLDivElement | null>}) {
    return (
        <div ref={ref} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-white font-semibold flex flex-col gap-2">
            {menuItems.map((item) => (
                <div key={item} className="overflow-hidden flex flex-row items-center gap-4 cursor-pointer group">
                    <Image src={svgStar} alt="" width={40} height={40} className="scale-0 group-hover:scale-100 transition-transform duration-300" />
                    <h1 className="innerMenuItem p-2">{item}</h1>
                </div>
            ))}
        </div>
    );
}
