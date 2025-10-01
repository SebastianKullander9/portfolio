export default function Home() {
    return (
        <div className="relative w-full h-[100vh] inset-0 flex flex-col items-center text-white">
            <div className="absolute bottom-0 w-full flex flex-row justify-between site-x-padding site-y-padding items-center">
                <div className="site-text-size max-w-1/3 md:max-w-[200px] lg:max-w-[280px]">
                    <p>This portfolio is built on Next.js, React Three Fiber and Drei</p>
                </div>
                <div className="border-1 rounded-xl flex items-center marquee site-text-size max-w-1/3 md:max-w-[200px] lg:max-w-[220px] xl:max-w-[260px] py-4">
                    <div className="marquee-inner">
                        <span>This website is still under construction 👷‍♂️ 🚧 🔨</span>
                        <span>This website is still under construction 👷‍♂️ 🚧 🏗</span>
                    </div>
                </div>
            </div>
        </div>
    );
}