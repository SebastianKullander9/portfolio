import { useAnimationStore } from "@/store/useAnimationStore";

export function useRangeProgress(fromId: string, toId: string): number {
    const { global, sections } = useAnimationStore((s) => s.sectionScroll);

    if (!sections.length) return 0;

    const from = sections.find((s) => s.id === fromId);
    const to = sections.find((s) => s.id === toId);
    if (!from || !to) return 0;

    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const start = from.top / totalHeight;
    const end = (to.top + to.height) / totalHeight;

    return Math.min(Math.max((global - start) / (end - start), 0), 1);
}
