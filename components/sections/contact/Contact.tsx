import AnimatedLink from "@/components/ui/animatedLink/AnimatedLink";

export default function Contact() {
    return (
        <section className="h-full w-full flex justify-center items-center">
            <div className="text-5xl xl:text-7xl text-white special-heading whitespace-nowrap leading-[1.4]">
                <AnimatedLink linkTo="/" text="Get In Touch" autoTextSize={false}/>
            </div>
        </section>
    );
}