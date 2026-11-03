import AnimatedLink from "@/components/ui/animatedLink/AnimatedLink";

export default function ContactSection() {
    return (
        <section className="h-full w-full flex justify-center items-center">
            <div data-mail-anchor className="heading-1 font-normal text-white special-heading whitespace-nowrap leading-[1.4]">
                <AnimatedLink linkTo="/contact" text="Get In Touch" autoTextSize={false}/>
            </div>
        </section>
    );
}