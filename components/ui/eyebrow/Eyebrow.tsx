import { IconAsterisk } from "nucleo-micro-bold";

interface EyebrowProps {
    text: string;
}

export default function Eyebrow({ text }: EyebrowProps) {
    return (
        <div className="text-white flex flex-row items-center body-large gap-2 mb-16">
            <IconAsterisk size={22} />
            <p>{text}</p>
        </div>
    );
}
