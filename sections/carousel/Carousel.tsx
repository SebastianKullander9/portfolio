"use client";
//TODO: REFACTOR INTO SERVER / CLIENT

import { useEffect, useRef, useState } from "react";
import Core from "smooothy";
import CarouselCanvas from "@/components/3d/carousel/canvas/CarouselCanvas";
import { useSlidesStore } from "@/store/useSlidesStore";
import ViewMoreBtn from "@/components/ui/viewMoreBtn/ViewMoreBtn";
import Image from "next/image";
import svgStar from "../../public/svgs/white-star.svg";
import gsap from "gsap";

export default function Carousel() {
    const sliderWrapperRef = useRef<HTMLDivElement>(null);
    const starRefs = useRef<(HTMLImageElement | null)[]>([]);
    const { slides, setSlideWidth, setSliderVelocity, setSliderOffset } = useSlidesStore();
    const slideRef = useRef<HTMLDivElement>(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (!slideRef.current) return;

        setSlideWidth(slideRef.current.offsetWidth);
    }, [setSlideWidth])

    useEffect(() => { 
        if (!sliderWrapperRef.current) return;

        const slider = new Core(sliderWrapperRef.current, {
            infinite: true,
            snap: true,
        });

        let lastPos = slider.current;

        function animate() {
            slider.update();

            setCurrentSlide(slider.currentSlide);

            const newPos = slider.current;
            setSliderVelocity(newPos - lastPos);
            setSliderOffset(slider.current)
            lastPos = newPos;

            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    useEffect(() => {
        slides.forEach((_, i) => {
        const star = starRefs.current[i];
        if (!star) return;

        if (i === currentSlide) {
            gsap.to(star, { scale: 1, duration: 0.5, ease: "back.out(1.7)" });
        } else {
            gsap.to(star, { scale: 0, duration: 0.3 });
        }
        });
    }, [currentSlide, slides]);

    return (
        <section className="relative w-screen h-full">
            <div className="h-[20%] w-full flex justify-center items-center">
                <h1 className="text-6xl font-medium text-white">Things I&apos;ve Built</h1>
            </div>

            <div className="absolute w-screen h-1/2 top-1/2 -translate-y-1/2">   
                <CarouselCanvas />
            </div>
            <div className="absolute w-screen h-[60%] top-1/2 -translate-y-1/2">
                <div ref={sliderWrapperRef} className="w-full h-full flex flex-row overflow-hidden z-10">
                    {slides.map((slide, index) => (
                        <div ref={slideRef} key={index} className="slide w-1/3 flex-none">
                            <div className="slideContent m-5 h-[calc(100%-40px)] flex flex-col justify-between text-white text-md font-medium">
                                <div className="flex justify-between px-[13%] items-center">
                                    <p>{slide.title}</p>
                                    <p>{slide.id}</p>
                                </div>
                                <div className="flex justify-between px-[13%] items-center">
                                    <p className="w-1/2">{slide.summary}</p>
                                    <ViewMoreBtn linkTo="/" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-0 h-[20%] w-full flex justify-center items-center gap-4">
                {slides.map((_, index) => (
                    <div className="relative p-2" key={index}>
                        <div className="p-1 bg-white rounded-full"></div>
                        {index === currentSlide ? 
                            <Image ref={(el) => { starRefs.current[index] = el; }} src={svgStar} unoptimized className="absolute inset-0 scale-0" width={50} height={50} alt="" />
                            : <></>
                        }
                    </div>
                ))}
            </div>
        </section>
    )
}