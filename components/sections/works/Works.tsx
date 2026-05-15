"use client";

import { useRef } from "react";
import { worksData } from "./data";
import Image from "next/image";
import Divider from "./Divider";
import { useMeasureDivider } from "@/hooks/ui/useMeasureDivider";
import { useWorksScroll } from "@/hooks/ui/useWorksScroll";
import Eyebrow from "@/components/ui/eyebrow/Eyebrow";
import SimpleButton from "@/components/ui/buttons/simpleButton/SimpleButton";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton/PrimaryButton";

export default function Works() {
    const { ref, height } = useMeasureDivider();
    const sectionRefs = useRef<(HTMLElement | null)[]>(Array(worksData.length).fill(null));
    const sentinelRef = useRef<HTMLDivElement>(null);

    useWorksScroll(
        () => sectionRefs.current,
        () => sentinelRef.current,
        height,
    );

    return (
        <div className="site-x-padding">
            <Eyebrow text="Works" />
            {worksData.map((item, index) => (
                <section
                    key={index}
                    ref={(el) => {
                        sectionRefs.current[index] = el;
                    }}
                    className="grid grid-cols-12 overflow-hidden"
                    style={{ paddingBottom: height }}
                >
                    <div ref={index === 0 ? ref : undefined} className="col-span-12">
                        <Divider index={index} year={item.year} />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <Image
                            src={item.image}
                            alt=""
                            className="rounded-xl md:rounded-3xl"
                            data-works-image
                        />
                    </div>
                    <div className="col-span-12 md:col-span-6 text-white grid grid-cols-12 mt-12 md:mt-0 relative">
                        <div className="col-span-12 md:col-span-8 md:col-start-3 flex items-center">
                            <div className="flex flex-col gap-12">
                                <p className="heading-1">{item.title}</p>
                                <div className="flex flex-col gap-4 max-w-prose">
                                    <p className="body-large">{item.tags}</p>
                                    <p className="body">{item.text}</p>
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0">
                                <SimpleButton />
                            </div>
                        </div>
                    </div>
                    {index + 1 === worksData.length && (
                        <div
                            className="absolute border-b border-white w-full"
                            style={{ bottom: `calc(${height}px / 2)` }}
                        ></div>
                    )}
                </section>
            ))}
            <div className="w-full flex justify-end text-white">
                <PrimaryButton text="View Works" linkTo="" />
            </div>
            <div ref={sentinelRef} className="h-[20dvh] w-full" />
        </div>
    );
}
