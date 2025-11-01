import Image from "next/image";
import Link from "next/link";
import arrowRight from "../../../public/svgs/arrow-up-right.svg";
import { RefObject } from "react";
import ScrollToLink from "./ScrollToLink";
import { menuItems } from "./menuItemsData";

export default function BackdropMenuContent({ ref }: { ref?: RefObject<HTMLDivElement | null>}) {
    return (
        <div ref={ref} className="flex flex-col w-full h-full p-8">
            <div className="relative h-full">
                <div  className="w-full fixed top-1/2 -translate-y-1/2 text-white font-medium xl:gap-2 site-x-padding">
                    <div className="w-full flex flex-row">
                        <div className="pl-[64px] sm:pl-[98px] md:pl-[128px] lg: xl:pl-[192px]">
                            {menuItems.map((item) => (
                                <ScrollToLink 
                                    key={item.label} 
                                    label={item.label} 
                                    scrollToId={item.scrollToId} 
                                />
                            ))}
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className="w-full site-x-padding site-y-padding site-text-size text-white flex flex-row justify-between items-center">
                <div className="overflow-hidden flex flex-row gap-3">
                    <Link href="https://github.com/SebastianKullander9" target="_blank">
                        <div className="outerMenuItem flex flex-row group cursor-pointer items-center">
                            <p>GitHub</p>
                            <Image src={arrowRight} width={34} height={34} alt="" className="invert group-hover:scale-120 transition-transform duration-200" />
                        </div>
                    </Link>
                    <Link href="https://www.linkedin.com/in/sebastian-kullander-9922b9133/" target="_blank">
                        <div className="outerMenuItem flex flex-row group cursor-pointer items-center">
                            <p>LinkedIn</p>
                            <Image src={arrowRight} width={34} height={34} alt="" className="invert group-hover:scale-120 transition-transform duration-200" />
                        </div>
                    </Link>
                </div>

                <div className="overflow-hidden">
                    <p className="text-sm outerMenuItem">Copyright © Sebastian Kullander</p>
                </div>
            </div>
        </div>
    );
}
