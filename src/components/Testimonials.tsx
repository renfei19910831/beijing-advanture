import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import testimonialSarah from '@/assets/testimonial-sarah.jpg';
import testimonialMichael from '@/assets/testimonial-michael.jpg';
import testimonialLisa from '@/assets/testimonial-lisa.jpg';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: testimonialSarah,
      rating: 5,
      comment: "Amazing experience! The photos captured the essence of Beijing perfectly. Professional and creative.",
      service: "Wedding Photography"
    },
    {
      id: 2, 
      name: "Michael Zhang",
      avatar: testimonialMichael,
      rating: 5,
      comment: "Exceptional quality and service. The photographer knew all the best spots in Beijing. Highly recommend!",
      service: "Corporate Portraits"
    },
    {
      id: 3,
      name: "Lisa Wang", 
      avatar: testimonialLisa,
      rating: 5,
      comment: "Beautiful portfolio shots that exceeded expectations. Great attention to detail and lighting.",
      service: "Fashion Portfolio"
    }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">What Our Clients Say</p>
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
            Trusted by Amazing People
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="p-8 bg-glass-bg backdrop-blur-sm border-border/50 hover:shadow-luxury transition-all duration-700 h-full">
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* User Avatar */}
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    {/* Rating Stars */}
                    <div className="flex items-center justify-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    
                    {/* Comment */}
                    <p className="text-muted-foreground italic leading-relaxed">
                      "{testimonial.comment}"
                    </p>
                    
                    {/* User Name */}
                    <div className="text-center">
                      <div className="font-medium text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.service}</div>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;