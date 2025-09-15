import HomeView from "@/sections/Home";
import About from "@/sections/about/About";

export default function Home() {
    return (
		<>
			<div className="relative w-screen h-screen">

				<section className="w-screen h-screen">
					<HomeView />
				</section>

				<section className="w-screen h-[70vh]"></section>
				
				<section className="w-screen h-screen">
					<About />
				</section>
			</div>
		</>
    );
}