import { useEffect, useRef, useState } from 'react';
import { MapPin, Star } from 'lucide-react';

const destinations = [
  {
    id: 1,
    name: 'Tassili n\'Ajjer',
    region: 'Sahara',
    color: 'from-amber-400 to-orange-500',
    image: 'https://images.pexels.com/photos/3714896/pexels-photo-3714896.jpeg?w=500&h=400&fit=crop',
    description: 'Ancient rock formations and prehistoric art',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Casbah of Algiers',
    region: 'Coast',
    color: 'from-blue-400 to-cyan-500',
    image: 'https://images.pexels.com/photos/3773367/pexels-photo-3773367.jpeg?w=500&h=400&fit=crop',
    description: 'Historic medina with vibrant culture',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Timgad',
    region: 'Mountains',
    color: 'from-green-400 to-emerald-500',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?w=500&h=400&fit=crop',
    description: 'Roman ruins in the Aurès mountains',
    rating: 4.8,
  },
  {
    id: 4,
    name: 'Erg Chech',
    region: 'Sahara',
    color: 'from-yellow-400 to-amber-500',
    image: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?w=500&h=400&fit=crop',
    description: 'Golden sand dunes and desert beauty',
    rating: 4.6,
  },
];

function DestinationCard({
  destination,
  index,
  isVisible,
}: {
  destination: typeof destinations[0];
  index: number;
  isVisible: boolean;
}) {
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(`dest-${destination.id}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        const offset = rect.top * 0.5;
        setParallaxOffset(offset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [destination.id]);

  return (
    <div
      id={`dest-${destination.id}`}
      className={`group relative h-80 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundImage: `url('${destination.image}')`,
          transform: `translateY(${parallaxOffset}px)`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 transition-all duration-300">
        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-2xl font-bold text-white mb-1">{destination.name}</h3>
          <p className="text-slate-200 text-sm mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {destination.region}
          </p>

          <p className="text-slate-100 text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {destination.description}
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-sm font-medium text-white">{destination.rating}</span>
            </div>
            <button className="ml-auto px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors duration-300">
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Destinations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(destinations.length).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            const cards = entry.target.querySelectorAll('[id^="dest-"]');
            const newVisibleCards = new Array(destinations.length).fill(false);
            newVisibleCards[0] = true;
            setVisibleCards(newVisibleCards);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="relative py-20 sm:py-28 bg-white overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Explore Featured <span className="text-primary-600">Destinations</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover some of Algeria\'s most captivating attractions, each with unique experiences and stories to tell.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              index={index}
              isVisible={visibleCards[index] || false}
            />
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in-up">
          <button className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary-500/50">
            Browse All Destinations
          </button>
        </div>
      </div>
    </section>
  );
}
