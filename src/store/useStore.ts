import { create } from "zustand";

type State = {
  started: boolean;
  progress: number;
  /** 0..1 overall scroll progress */
  scroll: number;
  /** projects[] index whose palette is currently driving the shader */
  active: number;
  /** index of the panel currently in view (for nav highlighting) */
  panel: number;
  /** smoothed audio amplitude 0..1 fed into shaders */
  audioLevel: number;
  audioOn: boolean;
  /** smooth-scrolls to a section id; wired to Lenis by <Experience> */
  scrollToId: (id: string) => void;
  setScrollToId: (fn: (id: string) => void) => void;
  setStarted: (v: boolean) => void;
  setProgress: (v: number) => void;
  setScroll: (v: number) => void;
  setActive: (v: number) => void;
  setPanel: (v: number) => void;
  setAudioLevel: (v: number) => void;
  setAudioOn: (v: boolean) => void;
};

export const useStore = create<State>((set) => ({
  started: false,
  progress: 0,
  scroll: 0,
  active: 0,
  panel: 0,
  audioLevel: 0,
  audioOn: false,
  scrollToId: (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
  setScrollToId: (fn) => set({ scrollToId: fn }),
  setStarted: (v) => set({ started: v }),
  setProgress: (v) => set({ progress: v }),
  setScroll: (v) => set({ scroll: v }),
  setActive: (v) => set((s) => (s.active === v ? s : { active: v })),
  setPanel: (v) => set((s) => (s.panel === v ? s : { panel: v })),
  setAudioLevel: (v) => set({ audioLevel: v }),
  setAudioOn: (v) => set({ audioOn: v }),
}));
