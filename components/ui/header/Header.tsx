import Image from "next/image";
import MenuBtn from "../menuBtn/MenuBtn";
import skLogo from "../../../public/svgs/sklogo2.svg";
import ClientHeaderWrapper from "./ClientHeaderWrapper";

export default function Header() {
    return (
        <ClientHeaderWrapper>
            <nav className="fixed z-49 w-full pointer-events-auto">
                <div className="flex flex-row justify-between w-full site-x-padding site-y-padding">
                    <Image src={skLogo} width={70} height={70} alt=""/>
                    <MenuBtn />
                </div>
            </nav>
        </ClientHeaderWrapper>
    );
}