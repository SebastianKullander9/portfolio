interface DividerProps {
    index: number;
    year: string;
}

export default function Divider({ index, year }: DividerProps) {
    return (
        <div className="border-t border-white flex flex-row justify-between text-white text-lg py-8 md:py-16">
            <p>0{index + 1}</p>
            <p>{year}</p>
        </div>
    );
}
