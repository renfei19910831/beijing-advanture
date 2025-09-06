import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Camera, Star } from 'lucide-react';

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

        {/* Strong CTA */}
        <div className="text-center">
          <div className="mb-6">
            <p className="text-sm text-accent font-medium mb-2">
              🎯 Most Popular: Portrait + Landmark Package
            </p>
            <p className="text-muted-foreground">
              Perfect for couples, families, and solo travelers
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="px-8 py-4 text-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-luxury"
            >
              Book Popular Package
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg font-medium bg-glass-bg backdrop-blur-sm border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50"
            >
              View All Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlight;