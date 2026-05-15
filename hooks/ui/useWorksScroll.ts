import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useWorksScroll(
    getSections: () => (HTMLElement | null)[],
    getSentinel: () => HTMLElement | null,
    D: number,
) {
    useEffect(() => {
        if (!D) return;

        const sections = getSections().filter(Boolean) as HTMLElement[];
        const sentinel = getSentinel();
        if (!sections.length || !sentinel) return;

        const images = sections.flatMap((el) =>
            Array.from(el.querySelectorAll<HTMLImageElement>("img[data-works-image]")),
        );

        Promise.all(
            images.map((img) =>
                img.complete ? Promise.resolve() : new Promise((r) => (img.onload = r)),
            ),
        ).then(() => {
            sections.forEach((el, i) => {
                const isLast = i === sections.length - 1;
                const naturalHeight = el.offsetHeight;

                ScrollTrigger.create({
                    trigger: el,
                    start: `top ${D * i}px`,
                    endTrigger: sentinel,
                    end: "bottom bottom",
                    pin: true,
                    pinSpacing: isLast,
                    ...(!isLast && {
                        onLeave: () => gsap.set(el, { height: D }),
                        onEnterBack: () => gsap.set(el, { height: D }),
                    }),
                });

                if (!isLast) {
                    const next = sections[i + 1];
                    gsap.fromTo(
                        el,
                        { height: naturalHeight },
                        {
                            height: D,
                            ease: "none",
                            scrollTrigger: {
                                trigger: next,
                                start: `top ${naturalHeight + D * i}px`,
                                end: `top ${D * (i + 1)}px`,
                                scrub: true,
                                onUpdate: (self) => {
                                    const h = gsap.utils.interpolate(
                                        naturalHeight,
                                        D,
                                        self.progress,
                                    );
                                    gsap.set(el, { height: h });
                                },
                                onLeave: () => gsap.set(el, { height: D }),
                                onLeaveBack: () => gsap.set(el, { height: naturalHeight }),
                            },
                        },
                    );
                }
            });

            ScrollTrigger.create({
                trigger: sentinel,
                start: "top bottom",
                onEnter: () => sections.slice(0, -1).forEach((el) => gsap.set(el, { height: D })),
                onLeaveBack: () =>
                    sections.slice(0, -1).forEach((el) => gsap.set(el, { height: D })),
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
            ScrollTrigger.clearScrollMemory();
        };
    }, [D]);
}
