"use client";

import { useRef } from "react";
import { worksData } from "./data";
import Image from "next/image";
import Divider from "./Divider";
import { useMeasureDivider } from "@/hooks/ui/useMeasureDivider";
import { useWorksScroll } from "@/hooks/ui/useWorksScroll";

export default function Works() {
    const { ref, height } = useMeasureDivider();
    const sectionRefs = useRef<(HTMLElement | null)[]>(Array(worksData.length).fill(null));
    const sentinelRef = useRef<HTMLDivElement>(null);

    useWorksScroll(
        () => sectionRefs.current,
        () => sentinelRef.current,
        height,
    );

    console.log("divider height:", height);

    return (
        <div className="site-x-padding">
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
                        <Image src={item.image} alt="" className="rounded-xl md:rounded-3xl" />
                    </div>
                    <div className="col-span-12 md:col-span-6 text-white grid grid-cols-12 mt-12 md:mt-0">
                        <div className="col-span-12 md:col-span-8 md:col-start-3 flex items-center">
                            <div className="flex flex-col gap-12">
                                <p className="heading-1">{item.title}</p>
                                <div className="flex flex-col gap-4 max-w-prose">
                                    <p className="body-large">{item.tags}</p>
                                    <p className="body">{item.text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
            <div ref={sentinelRef} className="h-[40vh] w-full" />
        </div>
    );
}
