import plus from "../../../../public/svgs/plus.svg";
import whiteStar from "../../../../public/svgs/white-star.svg";
import Image from "next/image";

type BaseButtonProps = {
    label: string;
};

export default function FormBtn({ label }: BaseButtonProps) {
    return (
        <div
            className="relative p-6 border-1 border-white w-full max-w-70 min-w-70 cursor-pointer backdrop-blur-sm bg-white/20 rounded-full group text-center"
        >
            {label}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 border-1 border-white rounded-full
                            backdrop-blur-sm bg-white/5 flex justify-center items-center
                            group-hover:scale-85 transition-all duration-200">
                <Image src={plus} alt="" width={24} height={24} className="absolute invert group-hover:scale-0 transition-all duration-200" />
                <Image src={whiteStar} alt="" width={22} height={22} className="scale-0 group-hover:scale-100 transition-all duration-200" />
            </div>
        </div>
    );
}