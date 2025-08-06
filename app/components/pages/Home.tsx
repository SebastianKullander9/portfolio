export default function Home() {
    return (
        <div className="w-9/10 h-8/10 flex flex-col justify-between text-white">
            <div className="w-full flex flex-row justify-between">
                <div className="font-bold text-5xl">S.K</div>
                <div className="font-bold text-5xl">Menu</div>
            </div>
            <div className="w-full flex flex-row justify-between">
                <div className="text-lg font-bold w-[15vw]">This portfolio is built on Next.js, React Three Fiber and Drei</div>
                <div className="text-lg font-bold w-[15vw] border-1 rounded-xl flex items-center marquee">
                    <div className="marquee-inner">
                        <span>This website is still under constructiton 👷‍♂️ 🚧 🔨</span>
                        <span>This website is still under constructiton 👷‍♂️ 🚧 🏗</span>
                    </div>
                </div>
            </div>
        </div>
    );
}