import React, { useState, useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { RxGithubLogo } from "react-icons/rx";
import { HiMiniMagnifyingGlassCircle } from "react-icons/hi2";
import { IoNavigateCircle } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
}

const slideContent = [
	{ url: "/projects/shade-gen.png", name: "Shade generator", text: "A shade generator with authenticatiton and project management" },
	{ url: "/projects/design-site.png", name: "Design site", text: "Some text about the design sitte" },
	{ url: "/projects/temporary.png", name: "TEMPORARY", text: "Some text about the TEMPORARY sitte" },
	{ url: "/projects/temporary.png", name: "TEMPORARY", text: "Some text about the TEMPORARY sitte" },
	{ url: "/projects/temporary.png", name: "TEMPORARY", text: "Some text about the TEMPORARY sitte" },

]

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
	const [tooltip, setTooltip] = useState("");


	const onPrevButtonClick = useCallback(() => {
		if (!emblaApi) return
		emblaApi.scrollPrev()
	}, [emblaApi])

	const onNextButtonClick = useCallback(() => {
		if (!emblaApi) return
		emblaApi.scrollNext()
	}, [emblaApi])

    return (
        <section className="w-full mx-auto">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex touch-pan-y ml-[-1rem]">
                    {slides.map((index) => (
                        <div
                            key={index}
                            className="transform-gpu flex-[0_0_60%] min-w-0 pl-4 mr-12"
                        >
                            <div className="relative h-[65vh] text-6xl font-semibold flex items-center justify-center select-none">
								<div className="">
									<Image src={slideContent[index].url} fill alt="temp" />
								</div>
                            </div>
							<div className="flex gap-8 items-center justify-between">
								<div>
									<p className="text-lg font-bold text-white">{slideContent[index].name}</p>
									<p className="font-semibold text-white">{slideContent[index].text}</p>
								</div>
								<div className="relative flex items-center gap-4 text-white font-semibold group">
									<div className={`absolute left-[-120px] transition-all duration-300 ${tooltip ? 'opacity-100' : 'opacity-0'} min-w-[100px] text-right`}>
									<p>{tooltip}</p>
									</div>

									<div onMouseEnter={() => setTooltip("Visit Site")} onMouseLeave={() => setTooltip("")}>
									<IoNavigateCircle size={42} className="transition-transform duration-300 hover:scale-110 cursor-pointer" />
									</div>

									<div onMouseEnter={() => setTooltip("View Code")} onMouseLeave={() => setTooltip("")}>
									<RxGithubLogo size={35} className="transition-transform duration-300 hover:scale-110 cursor-pointer" />
									</div>

									<div onMouseEnter={() => setTooltip("Read More")} onMouseLeave={() => setTooltip("")}>
									<HiMiniMagnifyingGlassCircle size={42} className="transition-transform duration-300 hover:scale-110 cursor-pointer" />
									</div>
								</div>
							</div>
                        </div>
                    ))}
                </div>
            </div>
			
			<div className="w-full text-white flex justify-center gap-50 mt-12">
					<button className="cursor-pointer hover:scale-110 transition-transform duration-300" onClick={onPrevButtonClick}><IoIosArrowBack size={45} /></button>
					<button className="cursor-pointer hover:scale-110 transition-transform duration-300" onClick={onNextButtonClick}><IoIosArrowForward size={45} /></button>
			</div>
        </section>
    )
}

export default EmblaCarousel;