import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";
import { useLanguageStore } from "../hooks/languageContext";
import { LangSelector } from "./LangSelector";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang } = useLanguageStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Translation dictionary
  const t = {
    features: {
      en: "Features",
      fr: "Fonctionnalités",
      ar: "الميزات",
    },
    how: {
      en: "How It Works",
      fr: "Comment ça marche",
      ar: "كيف تعمل",
    },
    download: {
      en: "Download",
      fr: "Télécharger",
      ar: "تحميل",
    },
    downloadApp: {
      en: "Download App",
      fr: "Télécharger l’application",
      ar: "تحميل التطبيق",
    },
  };

  // ✅ Use translated labels dynamically
  const navItems = [
    { label: t.features[lang], href: "#features" },
    { label: t.how[lang], href: "#how" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white backdrop-blur-md shadow-lg"
          : "bg-gradient-to-b from-slate-900 to-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="size-10 rounded-lg overflow-hidden">
            <img src="/image.png" alt="Contouria logo" />
          </div>
          <span
            className={`text-xl font-bold transition-colors duration-300 ${
              isScrolled ? "text-slate-900" : "text-white"
            }`}
          >
            Contouria
          </span>
        </a>

        {/* ✅ Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`font-medium transition-colors duration-300 ${
                isScrolled
                  ? "text-slate-600 hover:text-primary-600"
                  : "text-slate-200 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a href="/apk/contouria.apk">
            <button className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary-500/50">
              {t.download[lang]}
            </button>
          </a>
        </div>

        {/* ✅ Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
            isScrolled
              ? "text-slate-900 hover:bg-slate-100"
              : "text-white hover:bg-white/10"
          }`}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <LangSelector />
      </nav>

      {/* ✅ Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-2 text-slate-200 hover:text-white hover:bg-slate-800 rounded-lg transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-all duration-300">
              {t.downloadApp[lang]}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
