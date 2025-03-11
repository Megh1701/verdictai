import { useRef } from 'react';
import Nav from './components/Nav';
import Scroll from './components/Scroll';
import Footer from './components/Footer';
import Features from './components/Features';
import Bento from './components/Bento';
import Faq from './components/Faq';
import Partical from './components/Partical';
import Pricing from './components/Pricing';
import './App.css';

function App() {
  // Refs for each section
  const homeRef = useRef(null);
  const featuresRef = useRef(null);
  const servicesRef = useRef(null);
  const pricingRef = useRef(null);
  const faqRef = useRef(null);

  return (
    <>
      <div className='bg-black text-white min-h-screen'>
        <Nav 
          homeRef={homeRef} 
          featuresRef={featuresRef} 
          servicesRef={servicesRef} 
          pricingRef={pricingRef} 
          faqRef={faqRef} 
        />
        
        <div ref={homeRef}>
          <Scroll />
        </div>
        <Partical />
        
        <div ref={featuresRef}>
          <Features />
        </div>

        <div ref={servicesRef}>
          <Bento />
        </div>

        <div ref={pricingRef}>
          <Pricing />
        </div>

        <div ref={faqRef}>
          <Faq />
        </div>

        <div className="flex-grow"></div> {/* Pushes footer to the bottom */}
        <Footer />
      </div>
    </>
  );
}

export default App;
