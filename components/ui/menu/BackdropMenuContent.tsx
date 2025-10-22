import Image from "next/image";
import svgStar from "../../../public/svgs/white-star.svg";
import Link from "next/link";
import arrowRight from "../../../public/svgs/arrow-up-right.svg";
import { RefObject } from "react";

const menuItems = ["Top", "About", "Projects", "Contact"];

export default function BackdropMenuContent({ ref }: { ref?: RefObject<HTMLDivElement | null>}) {
    return (
        <div ref={ref} className="flex flex-col w-full h-full">
            <div className="relative h-full">
                <div  className="w-full fixed top-1/2 -translate-y-1/2 text-white font-medium xl:gap-2 site-x-padding">
                    <div className="w-full flex flex-row justify-between">
                        <div>
                            <div className="flex flex-row gap-4 overflow-hidden leading-35 text-6xl">
                                <h1 className="special-heading innerMenuItem">Sections</h1>
                            </div>
                            {menuItems.map((item) => (
                                <div key={item} className="overflow-hidden flex flex-row items-center gap-4 cursor-pointer group">
                                    <Image src={svgStar} alt="" width={40} height={40} className=" absolute scale-0 group-hover:scale-100 transition-transform duration-300" />
                                    <h2 className="innerMenuItem p-2 text-5xl">{item}</h2>
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="">
                                <div className="overflow-hidden">
                                    <h1 className="special-heading outerMenuItem leading-35 text-6xl">Pages</h1>
                                </div>
                                <div className="overflow-hidden">
                                    <p className="outerMenuItem p-2 text-5xl">My stack</p>
                                </div>
                                <div className="overflow-hidden">
                                    <p className="outerMenuItem p-2 text-5xl">Contact</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="overflow-hidden">
                                <h1 className="special-heading text-6xl leading-35">Other links</h1>
                            </div>
                            <div className="overflow-hidden">
                                <div className="flex flex-row outerMenuItem">
                                    <p className=" p-2 text-5xl">My Blog</p>
                                    <div className="relative">
                                        <p className="absolute whitespace-nowrap uppercase tracking-widest text-sm">Coming soon</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>



            <div className="w-full site-x-padding site-y-padding site-text-size text-white flex flex-row justify-between items-center">
                
                <div className="overflow-hidden flex flex-row gap-3">
                    <Link href="https://github.com/SebastianKullander9" target="_blank">
                        <div className="outerMenuItem flex flex-row group cursor-pointer items-center">
                            <Image src={arrowRight} width={28} height={28} alt="" className="invert group-hover:scale-130 transition-transform duration-200" />
                            <p>GitHub</p>
                        </div>
                    </Link>
                    <p className="outerMenuItem"></p>
                    <Link href="https://www.linkedin.com/in/sebastian-kullander-9922b9133/" target="_blank">
                        <div className="outerMenuItem flex flex-row group cursor-pointer items-center">
                            <Image src={arrowRight} width={28} height={28} alt="" className="invert group-hover:scale-130 transition-transform duration-200" />
                            <p>LinkedIn</p>
                        </div>
                    </Link>
                </div>

                <div>
                    <p className="text-sm">Copyright © Sebastian Kullander</p>
                </div>
            </div>
        </div>
    );
}
