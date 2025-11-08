import Features from "./components/Features";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Statistics from "./components/Statistics";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      {/* <Destinations /> */}
      <Statistics />
      {/* <CTA /> */}
      <Footer />
    </div>
  );
}

export default App;
