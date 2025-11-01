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
                <p className="heading-4">{id}</p>
                <h2 className="transformH2 heading-4">{title}</h2>
            </div>
            <h2 className="scaleH2 heading-4 font-bold mt-12">
                {title}
            </h2>
            <ul className="flex flex-col gap-4">
                {technologies.map((t) => (
                    <li key={t.title} className="overflow-hidden">
                        <div className="transformListItem flex flex-row gap-4 items-center">
                            {t.iconUrl === "" ? (
                                <IconPlaceholder name={t.title} />
                            ) : (
                                <Image src={t.iconUrl} width={35} height={35} alt="" className="invert" />
                            )}
                            <p className="body-large font-medium">
                                {t.title}
                            </p>
                            
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}