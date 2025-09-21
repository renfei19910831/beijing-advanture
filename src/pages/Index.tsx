import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ProcessAndPhotographers from '@/components/ProcessAndPhotographers';
import Testimonials from '@/components/Testimonials';
import BlogPreview from '@/components/BlogPreview';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ProcessAndPhotographers />
      <Testimonials />
      <BlogPreview />
      <Footer />
    </div>
  );
};

export default Index;
