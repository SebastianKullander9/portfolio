import HomeView from "@/components/sections/Home";
import About from "@/components/sections/about/About";
import Footer from "@/components/sections/Footer";
import Contact from "@/components/sections/contact/Contact";
import Carousel from "@/components/sections/carousel/Carousel";

export default function Home() {
    return (
		<>
			<div className="relative w-[100%] h-screen">

				<section className="w-[100%] h-screen">
					<HomeView />
				</section>

				<section className="w-[100%] h-screen"></section>
				
				<section className="w-[100%] h-screen">
					<About />
				</section>

				<section className="w-[100%] h-screen">
					<Carousel />
				</section>
				
				<section className="w-[100%] h-screen">
					<Contact />
				</section>
					
				<section className="w-[100%] h-screen"></section>

				<Footer />
			</div>
		</>
    );
}