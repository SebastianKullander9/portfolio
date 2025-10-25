import left from "../../../../public/svgs/arrow-left.svg";
import whiteStar from "../../../../public/svgs/white-star.svg";
import Image from "next/image";

type BaseButtonProps = {
    label: string;
};

export default function BackBtn({ label }: BaseButtonProps) {
    return (
        <div
            className="relative w-full cursor-pointer rounded-full group text-center flex flex-row items-center gap-4"
        >
            {label}
            <div className="w-12 h-12 border-1 border-white rounded-full
                            backdrop-blur-sm bg-white/5 flex justify-center items-center
                            group-hover:scale-85 transition-all duration-200">
                <Image src={left} alt="" width={24} height={24} className="absolute invert group-hover:scale-0 transition-all duration-200" />
                <Image src={whiteStar} alt="" width={22} height={22} className="scale-0 group-hover:scale-100 transition-all duration-200" />
            </div>
        </div>
    );
}