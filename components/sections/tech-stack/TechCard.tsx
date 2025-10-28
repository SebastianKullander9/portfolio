import { Ref } from "react";
import Image from "next/image";
import IconPlaceholder from "./IconPlaceholder";

type technologies = {
    title: string;
    iconUrl: string;
}

type TechCardProps = {
    id: string;
    title: string;
    technologies: technologies[];
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void;
    ref: Ref<HTMLDivElement | null>;
    icon: {
        url: string;
        width: number;
        height: number;
    }
}

export default function TechCard({ id, title, technologies, icon, onMouseEnter, onMouseLeave, onClick, ref }: TechCardProps ) {
    return (
        <div 
            ref={ref} 
            className="w-full md:w-[25%] h-[20vh] md:h-full border-r-0 md:border-r-1 border-b-1 md:border-b-0 border-white p-8 overflow-hidden relative"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            <div className="flex flex-row justify-between font-bold items-center overflow-hidden relative">
                <p className="text-4xl">{id}</p>
                <h2 className="transformH2 text-xl sm:text-2xl md:text-3xl xl:text-4xl">{title}</h2>
            </div>
            <div className="scaleIcon bg-white/20 backdrop-blur-xl h-25 w-25 rounded-bl-3xl absolute right-0 top-0">
                <div className="w-full h-full relative">
                    <Image src={icon.url} width={icon.width} height={icon.height} alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2" />
                </div>
            </div>
            <h2 className="scaleH2 text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold mt-12">
                {title}
            </h2>
            <ul>
                {technologies.map((t) => (
                    <li key={t.title} className="overflow-hidden">
                        <div className="transformListItem flex flex-row gap-4 items-center">
                            {t.iconUrl === "" ? (
                                <IconPlaceholder name={t.title} />
                            ) : (
                                <Image src={t.iconUrl} width={35} height={35} alt="" className="invert" />
                            )}
                            <p className="text-3xl/14 font-medium">
                                {t.title}
                            </p>
                            
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}