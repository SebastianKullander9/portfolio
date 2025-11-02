import { create } from "zustand";

interface ScrollState {
    scrollToSection: string | null;
    setScrollToSection: (section: string | null) => void;
    pendingScroll: string | null;
    setPendingScroll: (id: string | null) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
    scrollToSection: null,
    setScrollToSection: (section) => set({ scrollToSection: section }),
    pendingScroll: null,
    setPendingScroll: (id) => set({ pendingScroll: id }),
}))