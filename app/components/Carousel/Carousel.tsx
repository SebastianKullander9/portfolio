import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { DotButton, useDotButton } from './CarouselDotButtons'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './CarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="max-w-3xl mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y ml-[-1rem]">
          {slides.map((index) => (
            <div
              key={index}
              className="transform-gpu flex-[0_0_70%] min-w-0 pl-4"
            >
              <div className="shadow-inner rounded-[1.8rem] text-6xl font-semibold flex items-center justify-center h-[19rem] select-none">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[auto_1fr] justify-between gap-6 mt-7">
        <div className="grid grid-cols-2 gap-2 items-center">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="flex flex-wrap justify-end items-center -mr-[0.6rem]">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`appearance-none bg-transparent touch-manipulation inline-flex text-decoration-none cursor-pointer border-0 p-0 m-0 w-[2.6rem] h-[2.6rem] flex items-center justify-center rounded-full after:content-[''] after:w-[1.4rem] after:h-[1.4rem] after:rounded-full after:flex after:items-center after:justify-center after:shadow-[inset_0_0_0_0.2rem_var(--detail-medium-contrast)] ${
                index === selectedIndex
                  ? 'after:shadow-[inset_0_0_0_0.2rem_var(--text-body)]'
                  : ''
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel