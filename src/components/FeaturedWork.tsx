import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Eye, Share2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import portraitImage from '@/assets/portfolio-portrait.jpg';
import architectureImage from '@/assets/portfolio-architecture.jpg';
import streetImage from '@/assets/portfolio-street.jpg';

const FeaturedWork = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  return (
    <section id="featured-work" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('featured.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('featured.subtitle')}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { id: 1, titleKey: 'featured.portrait', descKey: 'featured.portrait.desc', category: '人像', image: portraitImage, tags: ['人像', '都市', '情感'] },
            { id: 2, titleKey: 'featured.architecture', descKey: 'featured.architecture.desc', category: '建筑', image: architectureImage, tags: ['建筑', '现代', '几何'] },
            { id: 3, titleKey: 'featured.street', descKey: 'featured.street.desc', category: '街拍', image: streetImage, tags: ['街拍', '纪实', '生活'] },
          ].map((work, index) => (
            <Card
              key={work.id}
              className="group relative overflow-hidden bg-card border-border shadow-elegant hover:shadow-hover transition-all duration-500 cursor-pointer"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={work.image}
                  alt={t(work.titleKey)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-foreground/40 transition-opacity duration-300 ${
                  hoveredItem === index ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex space-x-4">
                      <button 
                        onClick={() => navigate(`/photo/${work.id}`)}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                      >
                        <Eye size={20} />
                      </button>
                      <button 
                        onClick={async () => {
                          const url = `${window.location.origin}/photo/${work.id}`;
                          if (navigator.share) {
                            try {
                              await navigator.share({
                                title: t(work.titleKey),
                                text: t(work.descKey),
                                url: url,
                              });
                            } catch (error) {
                              await navigator.clipboard.writeText(url);
                              toast({
                                title: t('action.copied'),
                                description: "照片链接已复制到剪贴板",
                              });
                            }
                          } else {
                            await navigator.clipboard.writeText(url);
                            toast({
                              title: t('action.copied'),
                              description: "照片链接已复制到剪贴板",
                            });
                          }
                        }}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                      >
                        <Share2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    {t(work.titleKey)}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {work.category}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {t(work.descKey)}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            to="/gallery" 
            className="inline-flex items-center px-8 py-3 text-primary hover:text-primary/80 font-medium transition-colors duration-300 group"
          >
            <span className="mr-2">{t('featured.view')}</span>
            <ExternalLink size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;