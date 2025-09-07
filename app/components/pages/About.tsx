import { useRef, useEffect } from "react";
import Image from "next/image";
import svgStar from "../../../public/svgs/white-star.svg";
import gsap from "gsap";
import SplitType from "gsap/SplitText";

gsap.registerPlugin(SplitType);

export default function About() {
    const split1Ref = useRef<HTMLParagraphElement>(null);
    const split2Ref = useRef<HTMLParagraphElement>(null);
    const text1Ref = useRef<any>(null);
    const text2Ref = useRef<any>(null);
    const tlRef = useRef<gsap.core.Timeline>(null);


    useEffect(() => {
        if (split1Ref.current && split2Ref.current) {
            text1Ref.current = new SplitType(split1Ref.current, { type: "chars" });
            text2Ref.current = new SplitType(split2Ref.current, { type: "chars" });

            tlRef.current = gsap.timeline({ paused: true });

            tlRef.current.to(text1Ref.current.chars, {
                y: "-100%",
                stagger: 0.02,
            }, 0);

            tlRef.current.to(text2Ref.current.chars, {
                y: "-100%",
                stagger: 0.02,
            }, 0);
        }
    }, []);

    const handleEnter = () => {
        if (tlRef.current) tlRef.current.play();
    };

    const handleLeave = () => {
        if (tlRef.current) tlRef.current.reverse();
    };

    return (
        <div className="w-full xl:w-8/10 mx-auto h-[calc(100vh-120px)] p-4 md:p-8 flex flex-col justify-center">
            <div className="flex flex-row gap-2 items-center mb-24">
                <Image src={svgStar} width={17} height={17} alt="" />
                <h1 className="text-3xl text-white">About</h1>            
            </div>
            <div className="grid grid-cols-3 grid-rows-2 h-8/10 text-white">
                <div className="col-span-2 justify-self-start w-full h-full">
                    <p className="text-4xl/13">I’m a <span className="font-semibold uppercase">fullstack developer</span> who loves turning design ideas into interactive experiences. 
                        I get most excited when I figure out how to bring tricky design concepts to life in code. 
                        I mostly work with the JavaScript stack and enjoy seeing how code, design, and a little bit of math can come together in creative ways
                    </p>
                </div>

                <div className="col-start-3 row-start-2 self-end justify-self-end">
                    <p className="text-lg mb-8">I mainly do my work in the Javascript stack. Curious about the tools and technologies I use? Dive in to the stack for a deeper look.</p>
                    <div className="flex w-full justify-end">
                        <div 
                            className="flex flex-row items-center gap-4 cursor-pointer w-fit group"
                            onMouseEnter={handleEnter}
                            onMouseLeave={handleLeave}
                        >   
                            <div className="relative overflow-hidden">
                                <p ref={split1Ref} className="splitText text-lg">View More</p>
                                <p ref={split2Ref} className=" absolute splitText text-lg">View More</p>
                            </div>
                            <div className="relative w-9 h-9 rounded-full border-1 backdrop-blur-sm bg-white/20 group-hover:scale-85 transition-transform duration-400">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <Image src={svgStar} alt="" width={20} height={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}