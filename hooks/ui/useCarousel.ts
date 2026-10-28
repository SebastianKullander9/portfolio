"use client";

import { RefObject, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Draggable, InertiaPlugin, useGSAP);

const RAD_TO_DEG = 180 / Math.PI;

function curveFor(width: number) {
    if (width > 1536) return 500;
    if (width > 1280) return 325;
    if (width > 1024) return 225;
    if (width > 768) return 100;
    if (width > 640) return 50;
    return 33;
}

export function useCarousel(
    rootRef: RefObject<HTMLElement | null>,
    onActiveChange: (index: number) => void,
) {
    const goToRef = useRef<(index: number) => void>(() => {});

    useGSAP(
        () => {
            const root = rootRef.current;
            const track = root?.querySelector<HTMLElement>("[data-carousel-track]");
            if (!root || !track) return;
            const slots = Array.from(track.querySelectorAll<HTMLElement>("[data-carousel-slot]"));
            const n = slots.length;
            if (n < 2) return;

            const proxy = document.createElement("div");
            let lefts: number[] = [];
            let w = 0;
            let total = 0;
            let viewW = 0;
            let curve = 0;
            let start = 0;
            let offset = 0;
            let active = -1;
            let wrapLeft = (x: number) => x;

            const render = () => {
                let closest = 0;
                let closestDistance = Infinity;
                slots.forEach((slot, i) => {
                    const left = wrapLeft(lefts[i] + offset);
                    const fromCentre = left + w / 2 - viewW / 2;
                    const t = fromCentre / viewW;
                    const y = t * t * curve;
                    const rotation = Math.atan((2 * t * curve) / viewW) * RAD_TO_DEG;
                    slot.style.transform = `translate3d(${left - lefts[i]}px, ${y}px, 0) rotate(${rotation}deg)`;
                    if (Math.abs(fromCentre) < closestDistance) {
                        closestDistance = Math.abs(fromCentre);
                        closest = i;
                    }
                });
                if (closest !== active) {
                    active = closest;
                    onActiveChange(closest);
                }
            };

            const follow = () => {
                offset = draggable.x;
                render();
            };

            const draggable = Draggable.create(proxy, {
                type: "x",
                trigger: track,
                inertia: true,
                snap: (x: number) => start + Math.round((x - start) / w) * w,
                onPress: () => {
                    gsap.killTweensOf(proxy);
                },
                onDrag: follow,
                onThrowUpdate: follow,
            })[0];

            const layout = () => {
                const nextLefts = slots.map((slot) => slot.offsetLeft);
                const nextW = nextLefts[1] - nextLefts[0];
                const nextViewW = root.clientWidth;
                if (nextW === w && nextViewW === viewW) return;
                const cardsMoved = w ? (start - offset) / w : 0;

                lefts = nextLefts;
                w = nextW;
                viewW = nextViewW;
                total = w * n;
                curve = curveFor(window.innerWidth);
                start = viewW / 2 - w / 2 - lefts[0];
                wrapLeft = gsap.utils.wrap(-w, total - w);
                if (total < viewW + w) {
                    console.warn("useCarousel: too few cards to fill the width, a gap will show");
                }

                gsap.killTweensOf(proxy);
                offset = start - cardsMoved * w;
                gsap.set(proxy, { x: offset });
                draggable.update();
                render();
            };

            goToRef.current = (index) => {
                const target = start - index * w;
                gsap.to(proxy, {
                    x: target + Math.round((offset - target) / total) * total,
                    duration: 0.6,
                    ease: "power3.out",
                    overwrite: true,
                    onUpdate: () => {
                        offset = gsap.getProperty(proxy, "x") as number;
                        render();
                    },
                    onComplete: () => {
                        draggable.update();
                    },
                });
            };

            const onScroll = () => {
                if (root.scrollLeft) root.scrollLeft = 0;
            };
            const onFocusIn = (event: FocusEvent) => {
                const target = event.target as HTMLElement;
                if (!target.matches(":focus-visible")) return;
                const index = slots.findIndex((slot) => slot.contains(target));
                if (index >= 0) goToRef.current(index);
            };
            const onDragStart = (event: DragEvent) => event.preventDefault();

            root.addEventListener("scroll", onScroll);
            root.addEventListener("focusin", onFocusIn);
            root.addEventListener("dragstart", onDragStart);

            layout();
            const observer = new ResizeObserver(layout);
            observer.observe(root);

            return () => {
                observer.disconnect();
                root.removeEventListener("scroll", onScroll);
                root.removeEventListener("focusin", onFocusIn);
                root.removeEventListener("dragstart", onDragStart);
                gsap.killTweensOf(proxy);
            };
        },
        { scope: rootRef },
    );

    return goToRef;
}
