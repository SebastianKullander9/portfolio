import { create } from "zustand";

type Slide = {
    id: string;
    title: string;
    summary: string;
    imgUrl: string;
}

interface SlideStore {
    slides: Slide[];
    slideWidth: number;
    sliderVelocity: number;
    sliderOffset: number;
    setSlides: (slides: Slide[]) => void;
    setSlideWidth: (slideWidth: number) => void;
    setSliderVelocity: (sliderVelocity: number) => void;
    setSliderOffset: (sliderOffset: number) => void;
}

export const useSlidesStore = create<SlideStore>((set) => ({
    slides: [
        { id: "01", title: "Porfolio", summary: "My porfolio", imgUrl: "/projects/temporary.png" },
        { id: "02", title: "Interactive Design", summary: "A website consisting of common design principles", imgUrl: "/projects/design-site.png" },
        { id: "03", title: "Music discover", summary: "A website to discover new artists", imgUrl: "/projects/music-discover.png" },
        { id: "04", title: "Shade gen", summary: "A shade generator website", imgUrl: "/projects/shade-gen.png" },
        { id: "05", title: "Stashbox library", summary: "A library where i save stuff for inspiration", imgUrl: "/projects/temporary.png" },
        { id: "06", title: "Project01", summary: "Temporary project, nothing here", imgUrl: "/projects/temporary.png" },
    ],
    setSlides: (slides) => set({ slides }),

    slideWidth: 0,
    setSlideWidth: (slideWidth) => set({ slideWidth }),

    sliderVelocity: 0,
    setSliderVelocity: (sliderVelocity) => set({ sliderVelocity }),

    sliderOffset: 0,
    setSliderOffset: (sliderOffset) => set({ sliderOffset }),
}));