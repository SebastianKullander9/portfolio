import Image from "next/image";
import MenuBtn from "../menu/MenuBtn";
import skLogo from "../../../public/svgs/sklogo2_refined_thinner.svg";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="fixed z-49 w-full pointer-events-auto">
      <div className="flex flex-row justify-between w-full site-x-padding site-y-padding">
        <div className="z-[9999]">
          <Link href="/">
            <Image src={skLogo} width={70} height={70} alt="" className="w-(--header-logo) h-auto" />
          </Link>
        </div>
        <MenuBtn />
      </div>
    </nav>
  );
}
