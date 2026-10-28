import Image from "next/image";
import whiteStar from "../../../public/svgs/white-star.svg";

interface CarouselDotsProps {
    count: number;
    activeIndex: number;
    onSelect: (index: number) => void;
}

export default function CarouselDots({ count, activeIndex, onSelect }: CarouselDotsProps) {
    return (
        <div className="flex flex-row">
            {Array.from({ length: count }, (_, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => onSelect(index)}
                    aria-label={`Show project ${index + 1}`}
                    aria-current={activeIndex === index}
                    className="relative p-2 cursor-pointer"
                >
                    <span className="block p-1 rounded-full bg-white">
                        <Image
                            width={24}
                            height={24}
                            src={whiteStar}
                            className={`absolute inset-0 h-6 w-6 transform transition-transform ${activeIndex === index ? "scale-80" : "scale-0"}`}
                            alt=""
                        />
                    </span>
                </button>
            ))}
        </div>
    );
}
