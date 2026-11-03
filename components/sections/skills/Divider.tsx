interface DividerProps {
    index: number;
}

export default function Divider({ index }: DividerProps) {
    return (
        <div className="border-t border-line flex flex-row justify-between text-white text-base py-5 md:py-10">
            <p>0{index + 1}</p>
        </div>
    );
}
