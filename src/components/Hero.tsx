import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Camera } from 'lucide-react';
import heroImage from '@/assets/hero-landscape.jpg';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToGallery = () => {
    const element = document.getElementById('featured-work');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-[120px] md:pt-[120px] pb-[15vh]">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Stunning landscape photography"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto transform translate-y-[25%]">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-center justify-center mb-6">
            <Camera className="w-12 h-12 text-white/80 mr-4" />
            <span className="text-lg font-light tracking-wider text-white/90">
              Visual Storytelling
            </span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Capturing Moments,
            <br />
            <span className="text-white/90">Creating Art</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-light mb-12 text-white/80 max-w-2xl mx-auto leading-relaxed">
            Through my lens, ordinary moments transform into extraordinary stories. 
            Welcome to a world where light, shadow, and emotion converge.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-medium shadow-hover transition-all duration-300"
              onClick={scrollToGallery}
            >
              Explore My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white px-8 py-4 text-lg font-medium transition-all duration-300"
            >
              Learn My Story
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          onClick={scrollToGallery}
          className="text-white/60 hover:text-white transition-colors duration-300 animate-bounce"
        >
          <ArrowDown size={24} />
        </button>
      </div>
    </section>
  );
};

export default Hero;