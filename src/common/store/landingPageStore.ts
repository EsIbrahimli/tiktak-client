import { create } from "zustand";

interface Slide {
  id: number;
  name: string;
  img_url: string;
  description: string;
}

interface SlidesStore {
  slides: Slide[];
  setSlides: (slides: Slide[]) => void;
}

export const useLandingPageStore = create<SlidesStore>((set) => ({
  slides: [],
  setSlides: (slides) => set({ slides }),
}));