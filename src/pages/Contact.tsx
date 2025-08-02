import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, Clock, Send, Instagram, Twitter } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'hello@ateliercapture.com',
      subtitle: 'Response within 24 hours'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      subtitle: 'Available Mon-Fri 9AM-6PM'
    },
    {
      icon: MapPin,
      title: 'Studio Location',
      content: 'Downtown Creative District',
      subtitle: 'By appointment only'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      content: 'Mon-Fri: 9AM-7PM',
      subtitle: 'Weekend: By appointment'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
              Get In Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ready to create something beautiful together? I'd love to hear about your 
              project and discuss how we can bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div>
              <Card className="p-8 bg-card border-border shadow-elegant">
                <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
                  Start a Conversation
                </h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium text-foreground mb-2 block">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Your first name"
                        className="h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium text-foreground mb-2 block">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Your last name"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="projectType" className="text-sm font-medium text-foreground mb-2 block">
                      Project Type
                    </Label>
                    <Select>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="portrait">Portrait Session</SelectItem>
                        <SelectItem value="event">Event Photography</SelectItem>
                        <SelectItem value="commercial">Commercial Work</SelectItem>
                        <SelectItem value="wedding">Wedding Photography</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="budget" className="text-sm font-medium text-foreground mb-2 block">
                      Budget Range
                    </Label>
                    <Select>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                        <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                        <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                        <SelectItem value="5000+">$5,000+</SelectItem>
                        <SelectItem value="discuss">Let's discuss</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-foreground mb-2 block">
                      Project Details
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project, vision, timeline, and any specific requirements..."
                      className="min-h-[120px] resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-12 text-lg font-medium"
                  >
                    <Send size={20} className="mr-2" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
                  Let's Connect
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Whether you're planning a special event, need professional headshots, 
                  or want to collaborate on a creative project, I'm here to help bring 
                  your vision to life.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="p-6 bg-card border-border shadow-elegant hover:shadow-hover transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full flex-shrink-0">
                        <info.icon size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {info.title}
                        </h3>
                        <p className="text-foreground mb-1">
                          {info.content}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {info.subtitle}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Social Links */}
              <Card className="p-6 bg-card border-border shadow-elegant">
                <h3 className="font-semibold text-foreground mb-4">Follow My Work</h3>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  >
                    <Instagram size={20} />
                  </a>
                  <a 
                    href="#" 
                    className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  >
                    <Twitter size={20} />
                  </a>
                  <a 
                    href="#" 
                    className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  >
                    <Mail size={20} />
                  </a>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  See my latest work and behind-the-scenes content on social media.
                </p>
              </Card>

              {/* FAQ */}
              <Card className="p-6 bg-card border-border shadow-elegant">
                <h3 className="font-semibold text-foreground mb-4">Quick FAQ</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-foreground">What's your typical response time?</p>
                    <p className="text-muted-foreground">I respond to all inquiries within 24 hours.</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Do you travel for shoots?</p>
                    <p className="text-muted-foreground">Yes, I'm available for local and destination projects.</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">What's included in a session?</p>
                    <p className="text-muted-foreground">Each package includes consultation, shoot, and edited photos.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;