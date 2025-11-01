import HomeView from "@/components/sections/Home";
import About from "@/components/sections/about/About";
import Footer from "@/components/sections/Footer";
import ContactSection from "@/components/sections/contact/ContactSection";
import Carousel from "@/components/sections/carousel/Carousel";

export default function Home() {
    return (
		<>
			<div className="relative w-[100%] h-screen">

				<section className="w-[100%] h-[100lvh]">
					<HomeView />
				</section>

				<section className="w-[100%] h-screen"></section>
				
				<section className="w-[100%] h-[200vh]">
					<About />
				</section>

				<section className="w-[100%] h-screen">
					<Carousel />
				</section>
				
				<section className="w-[100%] h-screen">
					<ContactSection />
				</section>

				<section className="w-[100%] h-[20vh]"></section>
					
				<Footer />
			</div>
		</>
    );
}