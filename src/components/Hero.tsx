import { MapPin, Sparkles, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useLanguageStore } from "../hooks/languageContext";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { lang } = useLanguageStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.7;

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.fillStyle = `rgba(46, 125, 50, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.7;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 🌍 Translations
  const t = {
    subtitle: {
      en: "AI-Powered Travel Intelligence",
      fr: "Intelligence de voyage alimentée par l’IA",
      ar: "ذكاء السفر المدعوم بالذكاء الاصطناعي",
    },
    headline1: {
      en: "Discover Algeria",
      fr: "Découvrez l’Algérie",
      ar: "اكتشف الجزائر",
    },
    headline2: {
      en: "Like Never Before",
      fr: "Comme jamais auparavant",
      ar: "كما لم تفعل من قبل",
    },
    description: {
      en: "Your intelligent travel companion powered by AI. Plan perfect trips, discover hidden gems, and experience Algeria with personalized guidance.",
      fr: "Votre compagnon de voyage intelligent alimenté par l’IA. Planifiez des voyages parfaits, découvrez des trésors cachés et vivez l’Algérie avec un accompagnement personnalisé.",
      ar: "رفيق سفرك الذكي المدعوم بالذكاء الاصطناعي. خطط لرحلات مثالية، واكتشف الجواهر الخفية، واختبر الجزائر بتوجيهات شخصية.",
    },
    download: {
      en: "Download App",
      fr: "Télécharger l’application",
      ar: "تحميل التطبيق",
    },
    learnMore: {
      en: "Learn More",
      fr: "En savoir plus",
      ar: "اعرف المزيد",
    },
    features: [
      {
        icon: MapPin,
        label: {
          en: "Attractions",
          fr: "Attractions",
          ar: "المعالم السياحية",
        },
      },
      {
        icon: Sparkles,
        label: {
          en: "AI Planning",
          fr: "Planification IA",
          ar: "التخطيط بالذكاء الاصطناعي",
        },
      },
      {
        icon: MapPin,
        label: {
          en: "Offline Mode",
          fr: "Mode hors ligne",
          ar: "الوضع دون اتصال",
        },
      },
    ],
  };

  return (
    <div
      className={`relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 ${
        lang === "ar" ? "text-right" : "text-center"
      }`}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-50" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtitle */}
        <div className="mb-6 animate-fade-in flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 backdrop-blur-xs">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-300">
              {t.subtitle[lang]}
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          {t.headline1[lang]}
          <span className="block bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
            {t.headline2[lang]}
          </span>
        </h1>

        {/* Description */}
        <p
          className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          {t.description[lang]}
        </p>

        {/* Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up ${
            lang === "ar" ? "sm:flex-row-reverse" : ""
          }`}
          style={{ animationDelay: "0.3s" }}
        >
          <a href="/apk/contouria.apk">
            <button className="group px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-primary-500/50">
              {t.download[lang]}
              <ArrowRight
                className={`w-5 h-5 transition-transform ${
                  lang === "ar"
                    ? "group-hover:-translate-x-1 rotate-180"
                    : "group-hover:translate-x-1"
                }`}
              />
            </button>
          </a>

          <a href="#features">
            <button className="px-8 py-4 bg-slate-700/50 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all duration-300 border border-slate-600/50 hover:border-slate-500">
              {t.learnMore[lang]}
            </button>
          </a>
        </div>

        {/* Features */}
        <div
          className="grid grid-cols-3 gap-4 max-w-md mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          {t.features.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-primary-500/50 transition-all duration-300 hover:bg-slate-800/70"
            >
              <item.icon className="w-5 h-5 text-primary-400" />
              <span className="text-xs font-medium text-slate-300">
                {item.label[lang]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" /> */}
    </div>
  );
}
