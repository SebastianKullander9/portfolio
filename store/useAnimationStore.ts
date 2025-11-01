import { create } from "zustand";

interface AnimationState {
    scroll: number;
    progress: number;
    pathname: string;
    setScroll: (s: number, max: number) => void;
    setPathname: (path: string) => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
    scroll: 0,
    progress: 0,
    pathname: "/",
    setScroll: (s, max) =>  
        set({ scroll: s, progress: s / max }),
    setPathname: (path) => 
        set({ pathname: path }),
}));