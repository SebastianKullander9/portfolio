type IconPlaceholderProps = {
    name: string;
}

export default function IconPlaceholder({ name }: IconPlaceholderProps) {
    return (
        <div className="w-9 h-9 border-1 rounded-sm flex justify-center items-center">
            <p className="text-white font-bold">
                {name.split("")[0]}
            </p>
        </div>
    )
}