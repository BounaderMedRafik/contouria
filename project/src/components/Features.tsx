import { useEffect, useRef, useState } from 'react';
import { Zap, MessageSquare, Compass, Globe, Wifi, Sparkles } from 'lucide-react';

const featuresList = [
  {
    icon: Zap,
    title: 'AI Journey Planner',
    description: 'Generate personalized day-by-day itineraries in minutes with intelligent recommendations.',
    color: 'from-primary-400 to-primary-500',
  },
  {
    icon: MessageSquare,
    title: 'AI Chat Assistant',
    description: 'Get instant answers to any travel questions with a 24/7 intelligent travel companion.',
    color: 'from-accent-400 to-accent-500',
  },
  {
    icon: Compass,
    title: 'Discovery Engine',
    description: 'Browse hundreds of curated attractions with detailed info, photos, and verified reviews.',
    color: 'from-primary-300 to-primary-400',
  },
  {
    icon: Globe,
    title: 'Multi-Language Support',
    description: 'Experience the app seamlessly in English, French, and Arabic with AI responses.',
    color: 'from-accent-300 to-accent-400',
  },
  {
    icon: Wifi,
    title: 'Offline-First Design',
    description: 'Access saved itineraries and favorites even without internet connection.',
    color: 'from-primary-500 to-primary-400',
  },
  {
    icon: Sparkles,
    title: 'Personalized Experience',
    description: 'AI learns from your preferences to provide increasingly tailored recommendations.',
    color: 'from-accent-500 to-accent-400',
  },
];

function FeatureCard({
  feature,
  index,
  isVisible,
}: {
  feature: typeof featuresList[0];
  index: number;
  isVisible: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 transition-all duration-500 hover:shadow-xl hover:shadow-primary-500/10 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

      <div className={`mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.color} text-white transition-transform duration-300 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
        <feature.icon className="w-6 h-6" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-slate-900">{feature.title}</h3>
      <p className="text-slate-600 leading-relaxed">{feature.description}</p>

      <div className="mt-4 inline-block text-sm font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Learn more →
      </div>
    </div>
  );
}

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(featuresList.length).fill(false));

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('[data-feature-index]');
          const newVisibleItems = [...visibleItems];

          cards.forEach((card) => {
            const index = parseInt(card.getAttribute('data-feature-index') || '0');
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

  return (
    <section className="relative py-20 sm:py-28 bg-white overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Powerful Features for <span className="text-primary-600">Unforgettable Journeys</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need to plan, discover, and experience Algeria with confidence and ease.
          </p>
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
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
