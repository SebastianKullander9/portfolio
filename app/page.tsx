import Scene from "./components/Scene";

export default function Home() {
    return (
		<>
			<div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', width: '100vw', pointerEvents: 'none', zIndex: 0 }}>
				<Scene />
			</div>
			<div style={{ position: 'relative', zIndex: 1, padding: '100vh 20px 200vh 20px' }}>
				<h1>Scroll over the canvas</h1>
				<p>Lots of content here to scroll through...testtest</p>
			</div>
		</>
		
    );
}
