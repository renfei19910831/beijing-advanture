import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, MessageCircle, Clock } from 'lucide-react';

const BookingCTA = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-r from-primary/10 via-background to-accent/10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
            Ready to Capture Your Beijing Story?
          </h2>
          <p className="text-lg text-muted-foreground mb-2">
            Limited availability - Only 3 sessions available this month
          </p>
          <p className="text-sm text-accent font-medium">
            ⏰ Book within 48 hours and save 15% on your session
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 bg-glass-bg backdrop-blur-sm border-border/50">
            <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-medium mb-2">Quick Booking</h3>
            <p className="text-sm text-muted-foreground">Schedule your session in minutes</p>
          </Card>
          
          <Card className="p-6 bg-glass-bg backdrop-blur-sm border-border/50">
            <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-medium mb-2">Free Consultation</h3>
            <p className="text-sm text-muted-foreground">Discuss your vision before booking</p>
          </Card>
          
          <Card className="p-6 bg-glass-bg backdrop-blur-sm border-border/50">
            <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-medium mb-2">Fast Delivery</h3>
            <p className="text-sm text-muted-foreground">Get your photos within 7 days</p>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="px-8 py-4 text-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-luxury"
          >
            Book Your Session Now
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="px-8 py-4 text-lg font-medium bg-glass-bg backdrop-blur-sm border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50"
          >
            Get Free Quote
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-6">
          * Promotion valid until end of month. Terms and conditions apply.
        </p>
      </div>
    </section>
  );
};

export default BookingCTA;