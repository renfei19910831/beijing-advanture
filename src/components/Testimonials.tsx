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
            align: "center",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <Card className="p-6 bg-card/80 backdrop-blur-sm border hover:shadow-lg transition-all duration-300 h-full">
                  <div className="flex flex-col items-center text-center space-y-6">
                    {/* 用户头像 - 在上 */}
                    <Avatar className="w-20 h-20 border-2 border-primary/20">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    {/* 用户反馈打分 - 中间 */}
                    <div className="flex items-center justify-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    {/* 用户反馈内容 - 在下 */}
                    <blockquote className="text-muted-foreground italic leading-relaxed text-sm">
                      "{testimonial.comment}"
                    </blockquote>
                    
                    {/* 用户名 - 最后 */}
                    <div className="text-center">
                      <div className="font-semibold text-foreground text-base">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{testimonial.service}</div>
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