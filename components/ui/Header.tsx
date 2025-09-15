import MenuBtn from "./MenuBtn/MenuBtn";
import Image from "next/image";
import skLogo from "../../public/svgs/sklogo2.svg";

export default function Header() {
    return (
        <nav className="fixed z-49 w-full pointer-events-auto">
            <div className="flex flex-row justify-between w-full p-4 md:p-8 xl:w-8/10 mx-auto">
                <Image src={skLogo} width={70} height={70} alt=""/>
                <MenuBtn />
            </div>
        </nav>
    );
}