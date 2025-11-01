import Image from "next/image";
import svgStar from "../../../public/svgs/white-star.svg";
import ViewMoreBtn from "@/components/ui/buttons/viewMoreBtn/ViewMoreBtn";

export default function About() {
    return (
        <div className="w-full flex flex-col justify-center site-x-padding site-y-padding">
            <div className="flex-row gap-2 items-center mb-12 sm:mb-24 flex">
                <Image src={svgStar} width={17} height={17} alt="" />
                <h1 className="body-large text-white font-normal">About</h1>            
            </div>
            <div className="grid grid-cols-3 grid-rows-2 lg:h-[110vh] text-white lg:site-x-padding">
                <div className="col-span-3 sm:col-span-2 justify-self-start w-full mb-12">
                    <p className="heading-1 xl:leading-23 font-medium"><span className="uppercase">Fullstack Developer</span> turning design ideas into interactive experiences with JavaScript, code, and a touch of math
                    </p>
                </div>

                <div className="col-span-3 row-start-2 sm:col-start-3 sm:row-start-2 self-start sm:self-end justify-self-end">
                    <p className="body-large mb-6 sm:mb-12">Curious about the tools and technologies I use? Dive in to the stack for a deeper look.</p>
                    <div className="flex w-full justify-start sm:justify-end">
                        <ViewMoreBtn linkTo="/tech-stack" />
                    </div>
                </div>
            </div>
        </div>
    );
}