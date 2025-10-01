import Image from "next/image";
import svgStar from "../../../public/svgs/white-star.svg";
import ViewMoreBtn from "@/components/ui/viewMoreBtn/ViewMoreBtn";

export default function About() {
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
                        <ViewMoreBtn linkTo="/tech-stack" />
                    </div>
                </div>
            </div>
        </div>
    );
}