import Image from "next/image";
import skLogo from "../../public/svgs/sklogo2.svg";
import AnimatedLink from "../ui/animatedLink/AnimatedLink";

export default function Footer() {
    return (
        <footer className="w-full h-full text-white">
            <div className="w-full  border-b-1 border-[#E0E0E0]"></div>
            <div className="w-full h-9/10 flex flex-col-reverse xl:flex-row ">
                <div className="w-full xl:w-1/2 h-full xl:border-r-1 border-t-1 xl:border-t-0 border-[#E0E0E0]">
                    <div className="w-full h-1/2 flex items-center site-x-padding">
                        <p className="heading-2 font-normal max-w-prose leading-[1.6] xl:leading-[1.4]">Please feel free to contact me through 
                            <span className="special-heading heading-3 font-normal underline underline-offset-3 xl:no-underline"> Email </span> 
                            or the 
                            <span className="special-heading heading-3 font-normal underline underline-offset-3 xl:no-underline"> Contact form.</span></p>                        
                    </div>
                    <div className="h-1/2 flex flex-row site-x-padding justify-between items-center">
                    <div>
                        <div className="relative w-25 h-25">
                            <Image 
                                src={skLogo} 
                                fill
                                className="object-contain"
                                alt="Image of the websites logo. The letters S and K."
                            />
                        </div>
                    </div>
                        <div className="flex flex-row gap-4 xl:gap-12">
                            <div className="flex flex-col gap-4 xl:gap-8">
                                <h1 className="body-large font-medium">MENU</h1>
                                <div className="body">
                                    <AnimatedLink linkTo="" text="Top" />
                                    <AnimatedLink linkTo="" text="About" />
                                    <AnimatedLink linkTo="" text="Projects" />
                                    <AnimatedLink linkTo="" text="Contact" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 xl:gap-8">
                                <h1 className="body-large font-medium">EXPLORE</h1>
                                <div className="body">
                                    <AnimatedLink linkTo="" text="My stack" />
                                    <AnimatedLink linkTo="" text="Contact" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 xl:gap-8">
                                <h1 className="body-large font-medium">SOCIALS</h1>
                                <div className="body">
                                    <AnimatedLink linkTo="" text="GitHub" />
                                    <AnimatedLink linkTo="" text="LinkedIn" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="relative w-full xl:w-1/2 h-full 
                    bg-[linear-gradient(to_right,#E0E0E0_1px,transparent_1px),linear-gradient(to_bottom,#E0E0E0_1px,transparent_1px)] 
                    bg-[size:60px_60px]
                    xl:bg-[size:150px_150px]
                    bg-[position:-1px_-1px]"
                >   
                    <div className="relative w-full h-full">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-auto flex justify-center items-center  rotate-13">
                            <Image src="/images/nanobanana-fixed.png" width={300} height={500} alt="A card with some 3d objects, cube and spheres." />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-1/10 border-[#E0E0E0] border-t-1 flex flex-row items-center justify-between site-x-padding body-small">
                <p>Privacy Policy</p>
                <p>Copyright © Sebastian Kullander</p>
            </div>
        </footer>
    )
}