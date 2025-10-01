import Image from "next/image";
import svgStar from "../../../public/svgs/white-star.svg";
import ViewMoreBtn from "@/components/ui/viewMoreBtn/ViewMoreBtn";

export default function About() {
    return (
        <div className="w-full h-[calc(100vh-120px)] flex flex-col justify-center site-x-padding site-y-padding">
            <div className="flex flex-row gap-2 items-center mb-6 sm:mb-24">
                <Image src={svgStar} width={17} height={17} alt="" />
                <h1 className="site-text-size text-white">About</h1>            
            </div>
            <div className="grid grid-cols-3 grid-rows-2 h-8/10 text-white">
                <div className="col-span-3 sm:col-span-2 justify-self-start w-full h-full">
                    <p className="text-xl/8 lg:text-3xl/12 xl:text-5xl/18 font-medium">I’m a <span className="special-heading text-5xl"> Fullstack Developer </span> who loves turning design ideas into interactive experiences.  
                        I mostly work with the JavaScript stack and enjoy seeing how code, design, and a little bit of math can come together in creative ways
                    </p>
                </div>

                <div className="col-span-3 row-start-2 sm:col-start-3 sm:row-start-2 self-start sm:self-end justify-self-end">
                    <p className="site-text-size mb-6 sm:mb-12">I mainly do my work in the Javascript stack. Curious about the tools and technologies I use? Dive in to the stack for a deeper look.</p>
                    <div className="flex w-full justify-start sm:justify-end">
                        <ViewMoreBtn linkTo="/tech-stack" />
                    </div>
                </div>
            </div>
        </div>
    );
}