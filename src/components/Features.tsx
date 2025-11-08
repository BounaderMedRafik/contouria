import { useEffect, useRef, useState } from "react";
import {
  Zap,
  MessageSquare,
  Compass,
  Globe,
  Wifi,
  Sparkles,
} from "lucide-react";
import { useLanguageStore } from "../hooks/languageContext";

// 🌍 Multilingual feature data
const featuresList = [
  {
    icon: Zap,
    title: {
      en: "AI Journey Planner",
      fr: "Planificateur de voyage IA",
      ar: "مخطط الرحلة بالذكاء الاصطناعي",
    },
    description: {
      en: "Generate personalized day-by-day itineraries in minutes with intelligent recommendations.",
      fr: "Générez des itinéraires personnalisés jour par jour en quelques minutes avec des recommandations intelligentes.",
      ar: "قم بإنشاء خطط يومية مخصصة خلال دقائق مع توصيات ذكية.",
    },
    color: "from-primary-400 to-primary-500",
  },
  {
    icon: MessageSquare,
    title: {
      en: "AI Chat Assistant",
      fr: "Assistant de chat IA",
      ar: "مساعد الدردشة بالذكاء الاصطناعي",
    },
    description: {
      en: "Get instant answers to any travel questions with a 24/7 intelligent travel companion.",
      fr: "Obtenez des réponses instantanées à toutes vos questions de voyage avec un compagnon de voyage intelligent 24h/24 et 7j/7.",
      ar: "احصل على إجابات فورية لأي استفسارات سفر مع رفيق سفر ذكي 24/7.",
    },
    color: "from-accent-400 to-accent-500",
  },
  {
    icon: Compass,
    title: {
      en: "Discovery Engine",
      fr: "Moteur de découverte",
      ar: "محرك الاكتشاف",
    },
    description: {
      en: "Browse hundreds of curated attractions with detailed info, photos, and verified reviews.",
      fr: "Parcourez des centaines d'attractions sélectionnées avec des informations détaillées, photos et avis vérifiés.",
      ar: "تصفح مئات المعالم المختارة مع معلومات مفصلة وصور وتقييمات موثوقة.",
    },
    color: "from-primary-300 to-primary-400",
  },
  {
    icon: Globe,
    title: {
      en: "Multi-Language Support",
      fr: "Support multilingue",
      ar: "دعم متعدد اللغات",
    },
    description: {
      en: "Experience the app seamlessly in English, French, and Arabic with AI responses.",
      fr: "Profitez de l'application en anglais, français et arabe avec des réponses intelligentes.",
      ar: "استخدم التطبيق بسهولة بالإنجليزية والفرنسية والعربية مع ردود ذكية.",
    },
    color: "from-accent-300 to-accent-400",
  },
  {
    icon: Wifi,
    title: {
      en: "Offline-First Design",
      fr: "Conception hors ligne",
      ar: "تصميم دون اتصال",
    },
    description: {
      en: "Access saved itineraries and favorites even without internet connection.",
      fr: "Accédez aux itinéraires enregistrés et favoris même sans connexion Internet.",
      ar: "الوصول إلى خطط الرحلات المفضلة والمحفوظة حتى بدون اتصال بالإنترنت.",
    },
    color: "from-primary-500 to-primary-400",
  },
  {
    icon: Sparkles,
    title: {
      en: "Personalized Experience",
      fr: "Expérience personnalisée",
      ar: "تجربة مخصصة",
    },
    description: {
      en: "AI learns from your preferences to provide increasingly tailored recommendations.",
      fr: "L'IA apprend de vos préférences pour fournir des recommandations de plus en plus personnalisées.",
      ar: "يتعلم الذكاء الاصطناعي من تفضيلاتك لتقديم توصيات أكثر تخصيصًا.",
    },
    color: "from-accent-500 to-accent-400",
  },
];

function FeatureCard({
  feature,
  index,
  isVisible,
  lang,
}: {
  feature: (typeof featuresList)[0];
  index: number;
  isVisible: boolean;
  lang: "en" | "fr" | "ar";
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 transition-all duration-500 hover:shadow-xl hover:shadow-primary-500/10 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

      <div
        className={`mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br ${
          feature.color
        } text-white transition-transform duration-300 ${
          isHovered ? "scale-110 rotate-6" : ""
        }`}
      >
        <feature.icon className="w-6 h-6" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-slate-900">
        {feature.title[lang]}
      </h3>
      <p className="text-slate-600 leading-relaxed">
        {feature.description[lang]}
      </p>

      <div className="mt-4 inline-block text-sm font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {lang === "fr"
          ? "En savoir plus →"
          : lang === "ar"
          ? "اعرف المزيد →"
          : "Learn more →"}
      </div>
    </div>
  );
}

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(featuresList.length).fill(false)
  );
  const { lang } = useLanguageStore();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll("[data-feature-index]");
          const newVisibleItems = [...visibleItems];

          cards.forEach((card) => {
            const index = parseInt(
              card.getAttribute("data-feature-index") || "0"
            );
            newVisibleItems[index] = true;
          });

          setVisibleItems(newVisibleItems);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Section translations
  const sectionTitle = {
    en: "Powerful Features for Unforgettable Journeys",
    fr: "Fonctionnalités puissantes pour des voyages inoubliables",
    ar: "ميزات قوية لرحلات لا تُنسى",
  };

  const sectionDesc = {
    en: "Everything you need to plan, discover, and experience Algeria with confidence and ease.",
    fr: "Tout ce dont vous avez besoin pour planifier, découvrir et vivre l'Algérie en toute confiance et simplicité.",
    ar: "كل ما تحتاجه لتخطيط واكتشاف وتجربة الجزائر بثقة وسهولة.",
  };

  return (
    <section
      id="features"
      className={`relative py-20 sm:py-28 overflow-hidden ${
        lang === "ar" ? "text-right" : "text-left text-slate-900"
      }`}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {sectionTitle[lang]}
          </h2>
          <p className="text-lg max-w-2xl mx-auto">{sectionDesc[lang]}</p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuresList.map((feature, index) => (
            <div key={index} data-feature-index={index}>
              <FeatureCard
                feature={feature}
                index={index}
                isVisible={visibleItems[index] || false}
                lang={lang}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
