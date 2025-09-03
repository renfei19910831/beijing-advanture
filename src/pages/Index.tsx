import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import FeaturedWork from '@/components/FeaturedWork';
import ServiceHighlight from '@/components/ServiceHighlight';
import BlogPreview from '@/components/BlogPreview';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <FeaturedWork />
      <ServiceHighlight />
      <BlogPreview />
      <Footer />
    </div>
  );
};

export default Index;
