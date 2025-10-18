import Image from "next/image";
import whiteStar from "../../../public/svgs/white-star.svg";

type Slide = {
    id: string;
    title: string;
    text: string;
    tags: string[];
}

interface CarouselDotsProps {
    data: Slide[];
    activeIndex: number;
}

export default function CarouseLDots({ data, activeIndex }: CarouselDotsProps) {
    return (
        <div className="flex flex-row">
            {data.map((_, index) => (
                <div key={index} className="relative p-2">
                    <div  className="p-1 rounded-full bg-white">
                        <Image 
                            width={25} height={25} 
                            src={whiteStar} 
                            className={`absolute inset-0 transform transition-transform ${activeIndex === index ? "scale-80" : "scale-0"}`} 
                            alt="an svg illustration of a small star" 
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}