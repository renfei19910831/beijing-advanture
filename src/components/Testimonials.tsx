import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import testimonialSarah from '@/assets/testimonial-sarah.jpg';
import testimonialMichael from '@/assets/testimonial-michael.jpg';
import testimonialLisa from '@/assets/testimonial-lisa.jpg';

const Testimonials = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">What Our Clients Say</p>
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
            Trusted by Amazing People
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 bg-glass-bg backdrop-blur-sm border-border/50 hover:shadow-luxury transition-all duration-700">
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

          <Card className="p-6 bg-glass-bg backdrop-blur-sm border-border/50 hover:shadow-luxury transition-all duration-700">
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

          <Card className="p-6 bg-glass-bg backdrop-blur-sm border-border/50 hover:shadow-luxury transition-all duration-700">
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
    </section>
  );
};

export default Testimonials;