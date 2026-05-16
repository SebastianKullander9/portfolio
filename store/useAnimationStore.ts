import { create } from "zustand";

interface Section {
    id: string;
    top: number;
    height: number;
}

interface SectionScroll {
    global: number;
    section: string | null;
    local: number;
    sections: Section[];
}

interface AnimationState {
    scroll: number;
    progress: number;
    pathname: string;
    menuOpen: boolean;
    sectionScroll: SectionScroll;

    setScroll: (s: number, max: number) => void;
    setPathname: (path: string) => void;
    setMenuOpen: (open: boolean) => void;
    setSectionScroll: (data: SectionScroll) => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
    scroll: 0,
    progress: 0,
    pathname: "/",
    menuOpen: false,
    sectionScroll: { global: 0, section: null, local: 0, sections: [] },

    setScroll: (s, max) => set({ scroll: s, progress: s / max }),
    setPathname: (path) => set({ pathname: path }),
    setMenuOpen: (open) => set({ menuOpen: open }),
    setSectionScroll: (data) => set({ sectionScroll: data }),
}));
