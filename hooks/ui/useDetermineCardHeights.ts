import { useCallback, useEffect, useState, RefObject } from "react";
import gsap from "gsap";

type UseCardHeightsProps = {
    cardRefs: RefObject<(HTMLDivElement | null)[]>;
    isMobile: boolean;
};

export function useCardHeights({ cardRefs, isMobile }: UseCardHeightsProps) {
    const [cardHeights, setCardHeights] = useState<number[]>([]);

    const measureExpandedHeight = useCallback((index: number) => {
        const card = cardRefs.current?.[index];
        if (!card) return null;
        
        const currentHeight = card.style.height;
        const currentOverflow = card.style.overflow;
        
        gsap.set(card, { height: "auto", overflow: "visible" });
        const expandedHeight = card.scrollHeight;
        
        gsap.set(card, { height: currentHeight, overflow: currentOverflow });
        
        return expandedHeight;
    }, [cardRefs]);

    useEffect(() => {
        if (!cardRefs.current) return;
        
        const heights = cardRefs.current.map((_, index) => 
            measureExpandedHeight(index) || 0
        );
        setCardHeights(heights);
    }, [measureExpandedHeight, isMobile, cardRefs]);

    return cardHeights;
}