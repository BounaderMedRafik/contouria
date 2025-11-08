import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Destinations from './components/Destinations';
import Statistics from './components/Statistics';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Destinations />
      <Statistics />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
