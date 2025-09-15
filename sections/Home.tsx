import Link from "next/link";

export default function Home() {
    return (
        <div className="relative w-[100vw] h-[100vh] inset-0 flex flex-col items-center text-white">
            <div className="absolute bottom-0 w-full p-4 md:p-8 xl:w-8/10 flex flex-row justify-between">
                <div className="text-lg font-bold w-[15vw]">This portfolio is built on Next.js, React Three Fiber and Drei
                    <Link href="/tech-stack">test</Link>
                </div>
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