import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowDown, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import heroImage from '@/assets/hero-landscape.jpg';
import architectureImg from '@/assets/portfolio-architecture.jpg';
import portraitImg from '@/assets/portfolio-portrait.jpg';
import streetImg from '@/assets/portfolio-street.jpg';

interface HeroProps {
  backgroundSrc?: string;
  isVideo?: boolean;
}

const featuredCards = [
  {
    id: 1,
    title: '建筑摄影',
    location: '北京 CBD',
    image: architectureImg,
    photographerId: 'zhang-wei',
    photographerName: '张伟',
    photographerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  },
  {
    id: 2,
    title: '人像摄影',
    location: '故宫',
    image: portraitImg,
    photographerId: 'li-ming',
    photographerName: '李明',
    photographerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
  },
  {
    id: 3,
    title: '街头摄影',
    location: '南锣鼓巷',
    image: streetImg,
    photographerId: 'wang-fang',
    photographerName: '王芳',
    photographerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  },
  {
    id: 4,
    title: '风景摄影',
    location: '长城',
    image: heroImage,
    photographerId: 'liu-yang',
    photographerName: '刘洋',
    photographerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  },
];

const Hero = ({ backgroundSrc = heroImage, isVideo = false }: HeroProps) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate cards
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % featuredCards.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const scrollToGallery = () => {
    const element = document.getElementById('featured-work');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const nextCard = () => {
    setActiveCard((prev) => (prev + 1) % featuredCards.length);
  };

  const prevCard = () => {
    setActiveCard((prev) => (prev - 1 + featuredCards.length) % featuredCards.length);
  };

  const handleCardClick = (photographerId: string) => {
    navigate(`/photographers/${photographerId}`);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-[120px] md:pt-[120px] pb-[15vh]">
      {/* Hero Background Media */}
      <div className="absolute inset-0">
        {isVideo ? (
          <video
            src={backgroundSrc}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={backgroundSrc}
            alt="Stunning landscape photography"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div
            className={`text-white transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="flex items-center mb-6">
              <Camera className="w-10 h-10 text-white/80 mr-3" />
              <span className="text-base font-light tracking-wider text-white/90">
                Visual Storytelling
              </span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Capturing Moments,
              <br />
              <span className="text-white/90">Creating Art</span>
            </h1>
            
            <p className="text-lg md:text-xl font-light mb-8 text-white/80 max-w-lg leading-relaxed">
              通过镜头，平凡的瞬间转化为非凡的故事。欢迎来到光影与情感交织的世界。
            </p>
            
            <Button
              size="lg"
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-6 text-lg font-medium shadow-2xl transition-all duration-300"
              onClick={scrollToGallery}
            >
              发现摄影师
            </Button>
          </div>

          {/* Right Side - Timed Cards */}
          <div 
            className={`relative transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
          >
            <div className="relative h-[500px] w-full perspective-1000">
              {/* Card Stack */}
              <div className="relative w-full h-full">
                {featuredCards.map((card, index) => {
                  const offset = (index - activeCard + featuredCards.length) % featuredCards.length;
                  const isActive = offset === 0;
                  
                  return (
                    <div
                      key={card.id}
                      className={`absolute inset-0 transition-all duration-700 ease-out ${
                        offset === 0 ? 'z-40' :
                        offset === 1 ? 'z-30' :
                        offset === 2 ? 'z-20' : 'z-10'
                      }`}
                      style={{
                        transform: `
                          translateX(${offset * 20}px) 
                          translateY(${offset * 15}px) 
                          scale(${1 - offset * 0.05})
                          rotateY(${offset * -5}deg)
                        `,
                        opacity: offset > 2 ? 0 : 1 - offset * 0.2,
                      }}
                    >
                      <div 
                        className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-card cursor-pointer group"
                        onClick={() => handleCardClick(card.photographerId)}
                      >
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Glass morphism info panel at bottom */}
                        {isActive && (
                          <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-white/10 border-t border-white/20 p-6 text-white transform transition-all duration-500">
                            {/* Photographer info */}
                            <div className="flex items-center gap-3 mb-4">
                              <Avatar className="w-12 h-12 border-2 border-white/50 shadow-lg">
                                <AvatarImage src={card.photographerAvatar} alt={card.photographerName} />
                                <AvatarFallback className="bg-white/20 text-white">{card.photographerName[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-base">{card.photographerName}</p>
                                <p className="text-xs text-white/80">专业摄影师</p>
                              </div>
                            </div>
                            
                            {/* Title and location */}
                            <div>
                              <h3 className="text-2xl font-bold mb-1">{card.title}</h3>
                              <p className="text-white/90 text-sm">{card.location}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
                <button
                  onClick={prevCard}
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 shadow-lg"
                  aria-label="Previous card"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <div className="flex items-center gap-2">
                  {featuredCards.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveCard(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === activeCard 
                          ? 'w-8 bg-white' 
                          : 'w-2 bg-white/40 hover:bg-white/60'
                      }`}
                      aria-label={`Go to card ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextCard}
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 shadow-lg"
                  aria-label="Next card"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
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