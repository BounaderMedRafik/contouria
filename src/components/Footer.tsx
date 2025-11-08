import { useEffect, useRef, useState } from "react";
import { ArrowUp, MapPin, Mail, Phone } from "lucide-react";
import { useLanguageStore } from "../hooks/languageContext";

export default function Footer() {
  const { lang } = useLanguageStore();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Multilingual content
  const content = {
    headings: {
      company: { en: "Company", fr: "Entreprise", ar: "الشركة" },
      product: { en: "Product", fr: "Produit", ar: "المنتج" },
      contact: { en: "Contact", fr: "Contact", ar: "تواصل" },
    },
    links: {
      product: {
        en: ["Features", "Pricing", "Download", "Security"],
        fr: ["Fonctionnalités", "Tarifs", "Télécharger", "Sécurité"],
        ar: ["الميزات", "الأسعار", "تحميل", "الأمان"],
      },
      company: {
        en: ["About", "Blog", "Careers", "Press"],
        fr: ["À propos", "Blog", "Carrières", "Presse"],
        ar: ["حول", "مدونة", "وظائف", "الصحافة"],
      },
      policies: {
        en: ["Privacy Policy", "Terms of Service", "Cookie Settings"],
        fr: [
          "Politique de confidentialité",
          "Conditions d'utilisation",
          "Paramètres des cookies",
        ],
        ar: ["سياسة الخصوصية", "شروط الخدمة", "إعدادات الكوكيز"],
      },
    },
    copyright: {
      en: "© 2024 Contouria. All rights reserved. Made with passion for Algeria.",
      fr: "© 2024 Contouria. Tous droits réservés. Fait avec passion pour l'Algérie.",
      ar: "© 2024 كونتوريا. جميع الحقوق محفوظة. مصنوع بشغف من أجل الجزائر.",
    },
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-slate-900 text-slate-300 overflow-hidden"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-0 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-400 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="animate-fade-in-up">
              <h3 className="text-lg font-bold text-white mb-4">Contouria</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {lang === "en"
                  ? "Your intelligent travel companion for discovering and experiencing Algeria like never before."
                  : lang === "fr"
                  ? "Votre compagnon de voyage intelligent pour découvrir et vivre l'Algérie comme jamais auparavant."
                  : "رفيقك الذكي للسفر لاكتشاف الجزائر وتجربتها كما لم يحدث من قبل."}
              </p>
              <div className="flex gap-3">
                {[
                  { icon: "f", label: "Facebook" },
                  { icon: "t", label: "Twitter" },
                  { icon: "i", label: "Instagram" },
                ].map((social) => (
                  <button
                    key={social.icon}
                    className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-primary-600 text-slate-300 hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-110"
                    title={social.label}
                  >
                    {social.icon.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                {content.headings.product[lang]}
              </h4>
              <ul className="space-y-3 text-sm">
                {content.links.product[lang].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-primary-400 transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                {content.headings.company[lang]}
              </h4>
              <ul className="space-y-3 text-sm">
                {content.links.company[lang].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-primary-400 transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                {content.headings.contact[lang]}
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                  <a
                    href="mailto:info@contouria.app"
                    className="text-slate-400 hover:text-primary-400 transition-colors duration-300"
                  >
                    info@contouria.app
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-400">
                    {lang === "en"
                      ? "Algiers, Algeria"
                      : lang === "fr"
                      ? "Alger, Algérie"
                      : "الجزائر العاصمة، الجزائر"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                  <a
                    href="tel:+213123456789"
                    className="text-slate-400 hover:text-primary-400 transition-colors duration-300"
                  >
                    +213 (0) 123 456 789
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-slate-500 text-sm text-center sm:text-left">
                {content.copyright[lang]}
              </p>
              <div className="flex gap-4 text-sm">
                {content.links.policies[lang].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-slate-400 hover:text-primary-400 transition-colors duration-300"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-primary-500 hover:bg-primary-600 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary-500/50 animate-fade-in-up"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}
