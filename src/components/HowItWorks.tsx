import { useEffect, useRef, useState } from "react";
import { Download, Zap, MapPin, Smile } from "lucide-react";
import { useLanguageStore } from "../hooks/languageContext";

// 🌍 Multilingual steps
const steps = [
  {
    number: 1,
    icon: Download,
    title: {
      en: "Download Contouria",
      fr: "Téléchargez Contouria",
      ar: "حمّل كونتوريا",
    },
    description: {
      en: "Get the app from your device store and create your account in seconds.",
      fr: "Obtenez l'application depuis votre store et créez votre compte en quelques secondes.",
      ar: "احصل على التطبيق من متجر جهازك وأنشئ حسابك خلال ثوانٍ.",
    },
  },
  {
    number: 2,
    icon: Zap,
    title: {
      en: "Tell Your Preferences",
      fr: "Indiquez vos préférences",
      ar: "اخبرنا بتفضيلاتك",
    },
    description: {
      en: "Answer a few quick questions about your interests, budget, and travel style.",
      fr: "Répondez à quelques questions rapides sur vos intérêts, budget et style de voyage.",
      ar: "أجب عن بعض الأسئلة السريعة حول اهتماماتك وميزانيتك وأسلوب سفرك.",
    },
  },
  {
    number: 3,
    icon: MapPin,
    title: {
      en: "Get AI Recommendations",
      fr: "Recevez des recommandations IA",
      ar: "احصل على توصيات الذكاء الاصطناعي",
    },
    description: {
      en: "Our AI generates a personalized itinerary tailored just for you.",
      fr: "Notre IA génère un itinéraire personnalisé conçu pour vous.",
      ar: "يقوم الذكاء الاصطناعي بإنشاء جدول رحلة مخصص لك.",
    },
  },
  {
    number: 4,
    icon: Smile,
    title: {
      en: "Explore & Enjoy",
      fr: "Explorez et profitez",
      ar: "استكشف واستمتع",
    },
    description: {
      en: "Follow your plan or ask the AI chat for real-time guidance and local tips.",
      fr: "Suivez votre plan ou demandez à l'assistant IA des conseils et orientations en temps réel.",
      ar: "اتبع خطتك أو اسأل الدردشة الذكية للحصول على توجيهات ونصائح محلية مباشرة.",
    },
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { lang } = useLanguageStore();

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

  // Section translations
  const sectionTitle = {
    en: "How Contouria Works",
    fr: "Comment fonctionne Contouria",
    ar: "كيف يعمل كونتوريا",
  };

  const sectionDesc = {
    en: "Four simple steps to your perfect Algerian adventure.",
    fr: "Quatre étapes simples pour votre aventure algérienne parfaite.",
    ar: "أربع خطوات بسيطة لمغامرتك الجزائرية المثالية.",
  };

  return (
    <section
      id="how"
      ref={containerRef}
      className="relative py-20 sm:py-28 overflow-hidden"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {sectionTitle[lang]}
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-slate-600">
            {sectionDesc[lang]}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {steps.map((step, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`group cursor-pointer p-6 rounded-xl transition-all duration-300 ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-8"
                  } ${
                    activeStep === index
                      ? "bg-primary-50 border-2 border-primary-500 shadow-lg shadow-primary-500/10"
                      : "bg-white border-2 border-slate-200 hover:border-primary-300"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                        activeStep === index
                          ? "bg-primary-500 text-white scale-110"
                          : "bg-slate-100 text-slate-600 group-hover:bg-primary-100 group-hover:text-primary-600"
                      }`}
                    >
                      {step.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-semibold text-lg mb-2 transition-colors duration-300 ${
                          activeStep === index
                            ? "text-primary-600"
                            : "text-slate-900"
                        }`}
                      >
                        {step.title[lang]}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {step.description[lang]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400/0 to-primary-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 text-center px-6 animate-float">
              <div className={`mb-6 flex justify-center`}>
                {steps[activeStep] &&
                  (() => {
                    const Icon = steps[activeStep].icon;
                    return (
                      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-scale-in">
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                    );
                  })()}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {steps[activeStep].title[lang]}
              </h3>
              <p className="text-white/90">
                {steps[activeStep].description[lang]}
              </p>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeStep === index
                      ? "w-8 bg-white"
                      : "w-2 bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
