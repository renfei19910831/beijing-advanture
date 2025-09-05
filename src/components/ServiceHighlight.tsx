import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Camera, Star } from 'lucide-react';
import testimonialSarah from '@/assets/testimonial-sarah.jpg';
import testimonialMichael from '@/assets/testimonial-michael.jpg';
import testimonialLisa from '@/assets/testimonial-lisa.jpg';

const ServiceHighlight = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Subtle Service Intro */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
            Beijing Photography Experiences
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Capturing your story against the timeless backdrop of Beijing's iconic landmarks
          </p>
        </div>

        {/* Elegant Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="group p-8 bg-glass-bg backdrop-blur-sm border-border/50 hover:shadow-luxury transition-all duration-700">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-gold flex items-center justify-center">
                <Camera className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-3">Portrait Sessions</h3>
              <p className="text-muted-foreground mb-4">
                Professional portraits in Beijing's most photogenic locations
              </p>
              <div className="text-sm text-accent font-medium">From ¥2,800</div>
            </div>
          </Card>

          <Card className="group p-8 bg-glass-bg backdrop-blur-sm border-border/50 hover:shadow-luxury transition-all duration-700">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-gold flex items-center justify-center">
                <MapPin className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-3">Landmark Tours</h3>
              <p className="text-muted-foreground mb-4">
                Guided photography experiences at Forbidden City, Great Wall, and more
              </p>
              <div className="text-sm text-accent font-medium">From ¥4,200</div>
            </div>
          </Card>

          <Card className="group p-8 bg-glass-bg backdrop-blur-sm border-border/50 hover:shadow-luxury transition-all duration-700">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-gold flex items-center justify-center">
                <Star className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-3">Premium Packages</h3>
              <p className="text-muted-foreground mb-4">
                Multi-day photography journeys with exclusive access and styling
              </p>
              <div className="text-sm text-accent font-medium">From ¥8,800</div>
            </div>
          </Card>
        </div>

        {/* Client Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">What Our Clients Say</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-glass-bg backdrop-blur-sm border-border/50">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "Amazing experience! The photos captured the essence of Beijing perfectly. Professional and creative."
              </p>
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={testimonialSarah} alt="Sarah Chen" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium text-foreground">Sarah Chen</div>
                  <div className="text-muted-foreground">Wedding Photography</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-glass-bg backdrop-blur-sm border-border/50">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "Exceptional quality and service. The photographer knew all the best spots in Beijing. Highly recommend!"
              </p>
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={testimonialMichael} alt="Michael Zhang" />
                  <AvatarFallback>MZ</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium text-foreground">Michael Zhang</div>
                  <div className="text-muted-foreground">Corporate Portraits</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-glass-bg backdrop-blur-sm border-border/50">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "Beautiful portfolio shots that exceeded expectations. Great attention to detail and lighting."
              </p>
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={testimonialLisa} alt="Lisa Wang" />
                  <AvatarFallback>LW</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium text-foreground">Lisa Wang</div>
                  <div className="text-muted-foreground">Fashion Portfolio</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Subtle CTA */}
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="bg-glass-bg backdrop-blur-sm border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 transition-luxury"
          >
            Explore Photography Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlight;