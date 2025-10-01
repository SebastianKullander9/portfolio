import Image from "next/image";
import skLogo from "../../public/svgs/sklogo2.svg";

export default function Footer() {
    return (
        <footer className="w-full h-full text-white">
            <div className="w-full h-1/10 border-b-1">
                
            </div>
            <div className="w-full h-8/10 flex flex-row">
                <div className="w-1/2 h-full border-r-1">
                    <div className="w-full h-1/2 flex items-center px-24">
                        <p className="text-6xl font-medium max-w-prose leading-[1.4]">Please feel free to contact me through email or the contact form.</p>                        
                    </div>
                    <div className="h-1/2 flex flex-row px-24 justify-between items-center">

                        <div className="flex">
                            <Image src={skLogo} width={100} height={100} alt="Image of the websites logo. The letters S and K." />
                        </div>
                        <div className="flex flex-row gap-12">
                            <div className="flex flex-col gap-8">
                                <h1 className="text-lg font-medium">MENU</h1>
                                <div>
                                    <p>Top</p>
                                    <p>About</p>
                                    <p>Projects</p>
                                    <p>Contact</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-8">
                                <h1 className="text-lg font-medium">EXPLORE</h1>
                                <p>My stack</p>
                            </div>
                            <div className="flex flex-col gap-8">
                                <h1 className="text-lg font-medium">SOCIALS</h1>
                                <div>
                                    <p>GitHub</p>
                                    <p>LinkedIn</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="relative w-1/2 h-full 
                    bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] 
                    bg-[size:160px_160px]
                    bg-[position:-1px_-1px]"
                >   
                    <div className="aspect-auto flex justify-center items-center w-full h-full rotate-13">
                        <Image src="/images/nanobanana-fixed.png" width={300} height={500} alt="A card with some 3d objects, cube and spheres." />
                    </div>
                </div>
            </div>
            <div className="w-full h-1/10 border-t-1 flex flex-row items-center justify-between px-24">
                <p>Privacy Policy</p>
                <p>Copyright © Sebastian Kullander</p>
            </div>
        </footer>
    )
}