import Image from "next/image";
import svgStar from "@/public/svgs/white-star.svg";

export default function SimpleButton() {
    return (
        <div className="relative w-20 h-20 rounded-full border-1 backdrop-blur-sm bg-white/20 hover:scale-85 transition-transform duration-400">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Image src={svgStar} alt="" width={20} height={20} />
            </div>
        </div>
    );
}
