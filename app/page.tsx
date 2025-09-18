import HomeView from "@/sections/Home";
import About from "@/sections/about/About";
import Footer from "@/sections/Footer";
import Carousel from "@/sections/carousel/Carousel";

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
				
				<section className="w-[100%] h-screen"></section>

				<section className="w-[100%] h-screen"></section>

				<Footer />
			</div>
		</>
    );
}