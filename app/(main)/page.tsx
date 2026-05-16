import HomeView from "@/components/sections/Home";
import About from "@/components/sections/about/About";
import Footer from "@/components/sections/Footer";
import ContactSection from "@/components/sections/contact/ContactSection";
import Carousel from "@/components/sections/carousel/Carousel";
import Works from "@/components/sections/works/Works";

export default function Home() {
    return (
        <>
            <div className="relative w-[100%] h-screen">
                <section className="w-[100%] h-[100lvh]" data-scroll-section="home" id="home">
                    <HomeView />
                </section>

                <section
                    className="w-[100%] h-screen"
                    data-scroll-section="spacer-1"
                    id="spacer-1"
                ></section>

                <section className="w-[100%] h-[150vh]" data-scroll-section="about" id="about">
                    <About />
                </section>

                <section data-scroll-section="works">
                    <Works />
                </section>

                <section className="w-[100%] h-screen" data-scroll-section="contact" id="contact">
                    <ContactSection />
                </section>

                <section className="w-[100%] h-[20vh]" data-scroll-section="spacer-2"></section>

                <Footer />
            </div>
        </>
    );
}
