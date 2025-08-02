import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Camera, Award, Users, MapPin, Mail, Download } from 'lucide-react';

const About = () => {
  const skills = [
    'Portrait Photography',
    'Street Photography',
    'Architecture',
    'Event Documentation',
    'Studio Lighting',
    'Post-Processing',
    'Color Grading',
    'Digital Workflow'
  ];

  const achievements = [
    {
      icon: Award,
      title: 'International Photography Awards',
      description: 'Winner of Multiple Categories',
      year: '2023'
    },
    {
      icon: Users,
      title: 'Client Projects',
      description: '500+ Successful Collaborations',
      year: '2020-2024'
    },
    {
      icon: Camera,
      title: 'Years of Experience',
      description: 'Professional Photography',
      year: '8+'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
                Behind the Lens
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                I'm a passionate photographer dedicated to capturing the extraordinary 
                in everyday moments. My work spans across various genres, from intimate 
                portraits to dynamic street photography, always seeking to tell 
                compelling visual stories.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Based in the heart of the city, I draw inspiration from urban life, 
                human connections, and the interplay of light and shadow that defines 
                our daily experiences. Each photograph is an opportunity to freeze 
                a moment in time and transform it into lasting art.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="px-8">
                  <Mail size={16} className="mr-2" />
                  Get In Touch
                </Button>
                <Button variant="outline" size="lg" className="px-8">
                  <Download size={16} className="mr-2" />
                  Download Portfolio
                </Button>
              </div>
            </div>

            {/* Profile Image Placeholder */}
            <div className="relative">
              <Card className="aspect-[4/5] bg-muted border-border shadow-elegant overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <Camera size={64} className="text-muted-foreground" />
                </div>
              </Card>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-hover">
                <div className="text-center">
                  <div className="text-2xl font-bold">8+</div>
                  <div className="text-sm">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Skills & Expertise
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive skill set developed through years of passionate practice 
              and professional experience.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="px-6 py-3 text-base font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-300 cursor-default"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Achievements
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Recognition and milestones that reflect my commitment to photographic excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="p-8 text-center bg-card border-border shadow-elegant hover:shadow-hover transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <achievement.icon size={32} className="text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {achievement.title}
                </h3>
                <p className="text-muted-foreground mb-2">
                  {achievement.description}
                </p>
                <Badge variant="outline" className="mt-2">
                  {achievement.year}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact Info */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
              <MapPin size={40} className="text-primary" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              Based in the Creative Heart
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Located in the vibrant downtown district, surrounded by the urban energy 
              that constantly inspires my work. Available for projects worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold text-lg text-foreground mb-4">Studio Location</h3>
              <p className="text-muted-foreground">
                Downtown Creative District<br />
                Available by Appointment<br />
                Natural Light & Professional Setup
              </p>
            </Card>
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold text-lg text-foreground mb-4">Working Hours</h3>
              <p className="text-muted-foreground">
                Monday - Friday: 9AM - 7PM<br />
                Weekend: By Appointment<br />
                Emergency Sessions Available
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;