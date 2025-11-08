"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useState } from "react";
import { useLanguageStore } from "../hooks/languageContext";

/**
 * Simple dropdown without depending on any DropdownMenu implementation.
 * That reduces risk of mismatched exports from shadcn.
 */

export const LangSelector = () => {
  const { lang, setLang } = useLanguageStore();
  const [open, setOpen] = useState(false);

  const languages = [
    { code: "ar", label: "العربية", flag: "🇩🇿" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
  ] as const;

  const current = languages.find((l) => l.code === lang) ?? languages[0];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white transition"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span className="text-lg">{current.flag}</span>
        <span className="hidden sm:inline text-sm">{current.label}</span>
        <Globe size={14} className="opacity-60" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 mt-2 w-40 bg-white border border-border rounded-md shadow-lg z-50 overflow-hidden"
          >
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-accent transition ${
                  l.code === lang ? "bg-accent/60 font-medium" : ""
                }`}
              >
                <span className="mr-2">{l.flag}</span>
                <span>{l.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
