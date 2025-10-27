import { useRef, useEffect } from "react";
import gsap from "gsap";

type useCardTimelinesProps = {
    cardRefs: React.RefObject<(HTMLDivElement | null)[]>;
}

export function useCardTimelines({ cardRefs }: useCardTimelinesProps) {
    const timelineRefs = useRef<gsap.core.Timeline[]>([]);

    useEffect(() => {
        const timelines = timelineRefs.current;

        cardRefs.current.forEach((card, index) => {
            if (!card) return;

            const listItems = card.querySelectorAll(".transformListItem");
            const transformH2 = card.querySelector(".transformH2");
            const scaleH2 = card.querySelector(".scaleH2");
            
            timelineRefs.current[index] = gsap.timeline({ paused: true })
                .to(scaleH2, { scaleY: 0, duration: 0.1, transformOrigin: "center center" })
                .fromTo(transformH2, { y: "-100%" }, { y: "0%", duration: 0.3, ease: "power1.out" }, "+=0.3" )
                .fromTo(listItems, { y: "-100%" }, { y: "0%", duration: 0.6, ease: "power1.out", stagger: 0.033 }, ">" )
        });

        return () => timelines.forEach(tl => tl?.kill());
    }, [cardRefs]);

    return timelineRefs;
}