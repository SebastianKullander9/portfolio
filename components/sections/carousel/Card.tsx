import Image from "next/image";
import type { Project } from "./cardData";
import SimpleButton from "@/components/ui/buttons/simpleButton/SimpleButton";

interface CardProps extends Project {
    onOpen: () => void;
}

// A button, so it opens with a click, Enter or Space. Draggable swallows the click that ends a drag, so dragging
// the carousel doesn't open a card
export default function Card({ id, title, image, onOpen }: CardProps) {
    return (
        <button
            type="button"
            onClick={onOpen}
            aria-label={`Open ${title}`}
            className="group/card relative block w-61 sm:w-82 lg:w-96 xl:w-110 mt-5 text-white text-left rounded-3xl cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
            <Image
                src={image}
                alt=""
                width={1086}
                height={1448}
                sizes="(min-width: 1280px) 440px, (min-width: 1024px) 384px, (min-width: 640px) 328px, 244px"
                loading="eager"
                className="w-full h-auto rounded-3xl"
            />
            <span className="absolute inset-0 p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
                <span className="body-large">{id}</span>
                <span className="flex flex-row items-end justify-between gap-4">
                    <span className="heading-5">{title}</span>
                    <SimpleButton />
                </span>
            </span>
        </button>
    );
}
