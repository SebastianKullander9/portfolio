import Image from "next/image";
import stockholmIcon from "../../public/svgs/hero/stockholm-icon.svg";


export default function Home() {
    return (
        <div className="relative w-full h-[100svh] inset-0 flex flex-col items-center text-white">
            <div className="absolute bottom-0 w-full flex flex-row justify-between site-x-padding site-y-padding items-center">
                <div className="body-small max-w-[150px] md:max-w-[200px] lg:max-w-[280px]">
                    <p>Fullstack developer with a special interest for design, UX and creative development</p>
                </div>
                <div className="border-1 rounded-xl flex items-center overflow-hidden body-small max-w-[110px] max-h-[38px] md:max-h-[70px] md:max-w-[200px] lg:max-w-[220px] xl:max-w-[260px] py-4">
                <div className="marquee-content">
                    <div className="marquee-item">
                        <span>Based in Stockholm, Sweden</span>
                        <Image src={stockholmIcon} width={40} height={40} alt="" className="inline-block mx-3"/>
                    </div>
                    <div className="marquee-item">
                        <span>Based in Stockholm, Sweden</span>
                        <Image src={stockholmIcon} width={40} height={40} alt="" className="inline-block mx-3"/>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}