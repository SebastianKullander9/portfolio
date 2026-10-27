"use client";

import { RefObject } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// How long the finished stack stays on screen before it scrolls away.
const HOLD = "40svh";

/*
 * Stacking cards for the works section.
 *
 * The stage is position: sticky inside a track whose ::after spacer adds the scroll distance.
 * While it sticks, card i slides up until it reaches its slot at D * i (D = divider height), and the
 * card above it is cut at the next card's top by moving its mask up and its content back down by the
 * same amount. Transforms only: no layout or paint per frame, and no clip-path (which would break the
 * backdrop-blur on the buttons).
 *
 * Where scroll-driven animations are supported the browser runs all of it on the compositor (see the
 * works rules in globals.css) and this hook only writes the distances. Otherwise one ScrollTrigger
 * applies the same transforms from JS.
 */
export function useWorksStack(rootRef: RefObject<HTMLElement | null>) {
    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;

            const track = root.querySelector<HTMLElement>("[data-works-track]");
            const stage = root.querySelector<HTMLElement>("[data-works-stage]");
            const divider = root.querySelector<HTMLElement>("[data-works-divider]");
            const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-works-card]"));
            if (!track || !stage || !divider || !cards.length) return;

            const masks = cards.map((card) => card.querySelector<HTMLElement>("[data-works-mask]")!);
            const inners = cards.map((card) => card.querySelector<HTMLElement>("[data-works-inner]")!);
            const n = cards.length;
            const css = CSS.supports("animation-timeline: view()");

            let D = 0;
            let tops: number[] = [];
            let heights: number[] = [];
            let travel = 0;

            // Transforms never change offsetTop/offsetHeight, so this always reads the natural layout.
            const layout = () => {
                D = Math.round(divider.offsetHeight);
                root.style.setProperty("--works-d", `${D}px`);
                tops = cards.map((card) => card.offsetTop - cards[0].offsetTop);
                heights = cards.map((card) => card.offsetHeight);
                travel = Math.max(0, tops[n - 1] - D * (n - 1));
                root.style.setProperty("--works-extra", `calc(${travel}px + ${HOLD})`);
                root.style.setProperty("--works-travel", `${travel}px`);

                if (!css) return;
                cards.forEach((card, i) => {
                    const stick = tops[i] - D * i; // scroll distance until card i reaches its slot
                    card.toggleAttribute("data-moves", stick > 0);
                    card.toggleAttribute("data-clips", i < n - 1);
                    card.style.setProperty("--works-b", `${stick}px`);
                    card.style.setProperty("--works-to", `${-stick}px`);
                    if (i < n - 1) {
                        card.style.setProperty("--works-ma", `${stick}px`);
                        card.style.setProperty("--works-mb", `${tops[i + 1] - D * (i + 1)}px`);
                        card.style.setProperty("--works-cut", `${heights[i] - D}px`);
                    }
                });
            };

            // u = scroll distance since the stage stuck. The visible part of a card is exactly the gap to
            // the next card's top, so the cut edge and the next card always come from the same number.
            const render = (u: number) => {
                let prevY = 0;
                cards.forEach((card, i) => {
                    const y = Math.max(D * i, tops[i] - u);
                    card.style.transform = `translate3d(0, ${y - tops[i]}px, 0)`;
                    if (i > 0) {
                        const cut = heights[i - 1] - (y - prevY);
                        masks[i - 1].style.transform = `translate3d(0, ${-cut}px, 0)`;
                        inners[i - 1].style.transform = `translate3d(0, ${cut}px, 0)`;
                    }
                    prevY = y;
                });
            };

            layout();

            if (!css) {
                ScrollTrigger.create({
                    trigger: track,
                    start: () => (layout(), "top top"),
                    end: () => `+=${travel}`,
                    onUpdate: (self) => render(self.progress * travel),
                    onRefresh: (self) => render(self.progress * travel),
                });
            }

            // Card sizes change with breakpoints and font loading.
            const observer = new ResizeObserver(() => (css ? layout() : ScrollTrigger.refresh()));
            observer.observe(stage);
            return () => observer.disconnect();
        },
        { scope: rootRef },
    );
}
