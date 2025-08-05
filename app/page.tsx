import Scene from "./components/Scene";

export default function Home() {
    return (
			<div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', width: '100vw', pointerEvents: 'none', zIndex: 0 }}>
				<Scene />
			</div>
    );
}