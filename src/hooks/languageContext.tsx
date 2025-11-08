// src/stores/useLanguageStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Lang = "en" | "ar" | "fr";

type LanguageState = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      lang: "en",
      setLang: (l: Lang) => set({ lang: l }),
    }),
    {
      name: "lang-storage", // optional: persists to localStorage
      partialize: (state) => ({ lang: state.lang }),
    }
  )
);
