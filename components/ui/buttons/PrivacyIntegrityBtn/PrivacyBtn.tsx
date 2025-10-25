import Link from "next/link";
import check from "../../../../public/svgs/check.svg";
import Image from "next/image";

type PrivacyBtnProps = {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PrivacyBtn({ checked, onChange }: PrivacyBtnProps) {
    return (
        <label className="flex gap-4 cursor-pointer items-center">
            <span className="relative inline-block w-7 h-7 border-1 border-white">
                <input 
                    type="checkbox" 
                    name="privacy"
                    checked={checked}
                    onChange={onChange}
                    className="opacity-0 absolute peer" 
                    required={true}
                />
                <Image src={check} width={20} height={20} alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden peer-checked:block invert" />
            </span>
            <Link 
                href="/"
                className="hover:underline underline-offset-4 text-sm md:text-xl"
            >
                I have read and agree to the Privacy Policy.
            </Link>
        </label>

    );
}