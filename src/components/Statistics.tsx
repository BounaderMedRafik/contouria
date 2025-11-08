import { useEffect, useRef, useState } from "react";
import { Users, MapPin, Globe, Award } from "lucide-react";
import { useLanguageStore } from "../hooks/languageContext";

// 🌍 Multilingual stats
const stats = [
  {
    icon: Users,
    label: {
      en: "Active Travelers",
      fr: "Voyageurs Actifs",
      ar: "المسافرون النشطون",
    },
    value: 50000,
    suffix: "+",
    color: "text-primary-600",
  },
  {
    icon: MapPin,
    label: {
      en: "Attractions Listed",
      fr: "Attractions Listées",
      ar: "المعالم المدرجة",
    },
    value: 500,
    suffix: "+",
    color: "text-accent-600",
  },
  {
    icon: Globe,
    label: {
      en: "Languages Supported",
      fr: "Langues Supportées",
      ar: "اللغات المدعومة",
    },
    value: 3,
    suffix: "",
    color: "text-primary-600",
  },
  {
    icon: Award,
    label: {
      en: "User Satisfaction",
      fr: "Satisfaction des Utilisateurs",
      ar: "رضا المستخدمين",
    },
    value: 98,
    suffix: "%",
    color: "text-accent-600",
  },
];

function StatCard({
  stat,
  isVisible,
  lang,
}: {
  stat: (typeof stats)[0];
  isVisible: boolean;
  lang: "en" | "fr" | "ar";
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const Icon = stat.icon;

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = stat.value / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setDisplayValue(Math.floor(increment * currentStep));

      if (currentStep >= steps) {
        setDisplayValue(stat.value);
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isVisible, stat.value]);

  return (
    <div
      className={`relative group rounded-2xl border border-slate-200 bg-white p-8 text-center transition-all duration-500 hover:shadow-xl hover:shadow-primary-500/10 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      <div className="mb-4 inline-flex p-3 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 text-slate-600 group-hover:text-primary-600 transition-colors duration-300">
        <Icon className="w-6 h-6" />
      </div>

      <div
        className={`text-4xl sm:text-5xl font-bold mb-2 ${stat.color} transition-all duration-300`}
      >
        {displayValue.toLocaleString()}
        <span className="text-3xl">{stat.suffix}</span>
      </div>

      <p className="text-slate-600 font-medium">{stat.label[lang]}</p>

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
    </div>
  );
}

export default function Statistics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { lang } = useLanguageStore();

  const sectionTitle = {
    en: "By The Numbers",
    fr: "En Chiffres",
    ar: "بالأرقام",
  };

  const sectionDesc = {
    en: "Join thousands of travelers revolutionizing how they explore Algeria.",
    fr: "Rejoignez des milliers de voyageurs révolutionnant la manière dont ils explorent l'Algérie.",
    ar: "انضم إلى آلاف المسافرين الذين يغيرون طريقة استكشافهم للجزائر.",
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-20 sm:py-28 bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {sectionTitle[lang]}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {sectionDesc[lang]}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              <StatCard stat={stat} isVisible={isVisible} lang={lang} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
