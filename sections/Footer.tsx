export default function Footer() {
    return (
        <footer className="relative w-[100%] h-[100%] backdrop-blur-sm">
            <div className="absolute top-1/2 -translate-y-1/2 pl-8">
                <ul className="text-white text-7xl font-medium">
                    <li>Home</li>
                    <li>About</li>
                    <li>Projects</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div className="absolute right-0 top-0 text-xl text-white">
                <p>GitHub</p>
            </div>
            <div className="w-full absolute bottom-0  text-white">
                <div className="w-full absolute flex flex-row justify-between text-xl">
                    <p className="pl-11">Fullstack Developer</p>
                    <p className="pr-11">Stockholm Sweden</p>
                </div>
                <div className="flex justify-between">
                    <h1 className="bottom-0 text-[8.5vw] font-medium uppercase pl-8 leading-[1.2]">Sebastian </h1>
                    <h1 className="bottom-0 text-[8.5vw] font-medium uppercase pr-8 leading-[1.2]">kullander</h1>
                </div>
            </div>
        </footer>
    )
}