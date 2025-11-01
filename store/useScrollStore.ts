import { create } from "zustand";

interface ScrollState {
    scrollToSection: string | null;
    setScrollToSection: (section: string | null) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
    scrollToSection: null,
    setScrollToSection: (section) => set({ scrollToSection: section }),
}))