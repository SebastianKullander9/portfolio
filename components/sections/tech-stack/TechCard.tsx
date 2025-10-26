import { Ref } from "react";

type TechCardProps = {
    id: string;
    title: string;
    technologies: string[];
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void;
    ref: Ref<HTMLDivElement | null>;
}

export default function TechCard({ id, title, technologies, onMouseEnter, onMouseLeave, onClick, ref }: TechCardProps ) {
    return (
        <div 
            ref={ref} 
            className="w-full md:w-[25%] h-[25vh] md:h-full border-r-0 md:border-r-1 border-b-1 md:border-b-0 border-white p-8 overflow-hidden"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            <div className="flex flex-row justify-between font-bold items-center overflow-hidden">
                <p className="text-4xl">{id}</p>
                <h2 className="transformH2 text-xl sm:text-2xl md:text-3xl xl:text-4xl">{title}</h2>
            </div>
            <h2 className="scaleH2 text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold mt-12">
                {title}
            </h2>
            <ul>
                {technologies.map((tname) => (
                    <li key={tname} className="overflow-hidden">
                        <p className="transformListItem text-3xl/11 font-medium">
                            {tname}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}