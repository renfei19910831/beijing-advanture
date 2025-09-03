import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const BeijingShowcase = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-muted/20 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6 leading-tight">
              Discover Beijing Through
              <span className="block text-accent">Professional Photography</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              From the majestic Forbidden City to the serene Temple of Heaven, 
              I specialize in creating stunning portraits and memorable experiences 
              for travelers seeking to capture their Beijing journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button className="bg-gradient-gold text-primary-foreground hover:shadow-gold transition-luxury">
                Book Your Session
              </Button>
              <Button 
                variant="outline" 
                className="border-primary/30 text-foreground hover:bg-primary/5 transition-luxury"
              >
                View Portfolio
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Professional Equipment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Local Expertise</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Same-Day Previews</span>
              </div>
            </div>
          </div>

          {/* Elegant Visual */}
          <div className="order-1 lg:order-2">
            <Card className="relative p-8 bg-gradient-platinum border-border/30 shadow-luxury overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-gold opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <div className="text-4xl font-light text-foreground mb-2">Beijing</div>
                  <div className="text-xl text-accent">Photography Services</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="text-muted-foreground">Portrait Sessions</span>
                    <span className="text-foreground font-medium">Available</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="text-muted-foreground">Landmark Tours</span>
                    <span className="text-foreground font-medium">Daily</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Premium Packages</span>
                    <span className="text-accent font-medium">Book Now</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeijingShowcase;