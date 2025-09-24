import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import FeaturedPhotographersSection from '@/components/FeaturedPhotographersSection';
import BlogPreview from '@/components/BlogPreview';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      {/* 摄影作品展示区域 - 80%权重 */}
      <div className="py-24">
        <FeaturedPhotographersSection />
      </div>
      {/* 旅行攻略区域 - 20%权重 */}
      <div className="py-16 bg-gradient-soft">
        <BlogPreview />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
