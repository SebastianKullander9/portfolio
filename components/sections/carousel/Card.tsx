import Image from "next/image";
import type { Project } from "./cardData";
import SimpleButton from "@/components/ui/buttons/simpleButton/SimpleButton";

export default function Card({ id, title, image }: Project) {
    return (
        <div className="group/card relative w-61 sm:w-82 lg:w-96 xl:w-110 mt-5 text-white">
            <Image
                src={image}
                alt={title}
                width={1086}
                height={1448}
                sizes="(min-width: 1280px) 440px, (min-width: 1024px) 384px, (min-width: 640px) 328px, 244px"
                loading="eager"
                className="w-full h-auto rounded-3xl"
            />
            <div className="absolute inset-0 p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
                <p className="body-large">{id}</p>
                <div className="flex flex-row items-end justify-between gap-4">
                    <p className="heading-5">{title}</p>
                    <SimpleButton />
                </div>
            </div>
        </div>
    );
}
