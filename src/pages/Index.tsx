import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ProcessFlow from '@/components/ProcessFlow';
import PhotographerFeed from '@/components/PhotographerFeed';
import Testimonials from '@/components/Testimonials';
import BlogPreview from '@/components/BlogPreview';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ProcessFlow />
      <PhotographerFeed />
      <Testimonials />
      <BlogPreview />
      <Footer />
    </div>
  );
};

export default Index;
