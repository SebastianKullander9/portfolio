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
                <section className="w-[100%] h-[100lvh]" id="home">
                    <HomeView />
                </section>

                <section className="w-[100%] h-screen"></section>

                <section className="w-[100%] h-[200vh]" id="about">
                    <About />
                </section>

                <section>
                    <Works />
                </section>

                {/*<section className="w-[100%] h-screen" id="projects">
            <Carousel />
        </section>*/}

                <section className="w-[100%] h-screen" id="contact">
                    <ContactSection />
                </section>

                <section className="w-[100%] h-[20vh]"></section>

                <Footer />
            </div>
        </>
    );
}
