import PrimaryButton from "@/components/ui/buttons/PrimaryButton/PrimaryButton";
import Eyebrow from "@/components/ui/eyebrow/Eyebrow";

export default function About() {
    return (
        <div className="site-x-padding site-y-padding w-full md:h-screen grid grid-cols-12 text-white">
            <div className="col-span-12 md:col-span-10 lg:col-span-8 xl:col-span-6 mb-16 md:mb-0">
                <Eyebrow text="About" />
                <p className="heading-1 font-medium">
                    I&apos;m a fullstack developer based in Stockholm, Sweden, though the frontend
                    is where I feel most at home. Outside of work I spend time exploring design and
                    pushing my creativity.
                </p>
            </div>
            <div className="col-span-12 md:col-span-7 md:col-end-13 lg:col-span-5 lg:col-end-13 xl:col-span-3 xl:col-end-13 flex flex-col md:items-end justify-end gap-8">
                <p className="body-large">
                    I keep my stack current and my code clean. Scroll down to see some projects, or
                    check out what I&apos;m working with below.
                </p>
                <PrimaryButton text="View Stack" linkTo="/tech-stack" />
            </div>
        </div>
    );
}
