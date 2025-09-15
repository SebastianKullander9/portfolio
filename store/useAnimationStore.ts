import { create } from "zustand";

interface AnimationState {
    scroll: number;
    progress: number;
    setScroll: (s: number, max: number) => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
    scroll: 0,
    progress: 0,
    setScroll: (s, max) =>  
        set({ scroll: s, progress: s / max }),
}));