import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Filter, Eye, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import portraitImage from '@/assets/portfolio-portrait.jpg';
import architectureImage from '@/assets/portfolio-architecture.jpg';
import streetImage from '@/assets/portfolio-street.jpg';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = ['All', 'Portrait', 'Architecture', 'Street', 'Landscape'];

  const galleryItems = [
    {
      id: 1,
      title: 'Urban Solitude',
      category: 'Portrait',
      image: portraitImage,
      date: '2024-01-15',
      location: 'Downtown District',
    },
    {
      id: 2,
      title: 'Geometric Harmony',
      category: 'Architecture',
      image: architectureImage,
      date: '2024-01-12',
      location: 'Modern Quarter',
    },
    {
      id: 3,
      title: 'City Rhythms',
      category: 'Street',
      image: streetImage,
      date: '2024-01-10',
      location: 'Market Street',
    },
    // Additional items for demonstration
    {
      id: 4,
      title: 'Evening Grace',
      category: 'Portrait',
      image: portraitImage,
      date: '2024-01-08',
      location: 'Studio Session',
    },
    {
      id: 5,
      title: 'Steel and Glass',
      category: 'Architecture',
      image: architectureImage,
      date: '2024-01-05',
      location: 'Business District',
    },
    {
      id: 6,
      title: 'Human Stories',
      category: 'Street',
      image: streetImage,
      date: '2024-01-03',
      location: 'Old Town',
    },
    {
      id: 7,
      title: 'Midnight Reflection',
      category: 'Portrait',
      image: portraitImage,
      date: '2024-01-01',
      location: 'Urban Rooftop',
    },
    {
      id: 8,
      title: 'Concrete Dreams',
      category: 'Architecture',
      image: architectureImage,
      date: '2023-12-28',
      location: 'Downtown Core',
    },
    {
      id: 9,
      title: 'Life in Motion',
      category: 'Street',
      image: streetImage,
      date: '2023-12-25',
      location: 'Central Plaza',
    },
    {
      id: 10,
      title: 'Silent Moments',
      category: 'Portrait',
      image: portraitImage,
      date: '2023-12-22',
      location: 'Gallery Space',
    },
    {
      id: 11,
      title: 'Modern Lines',
      category: 'Architecture',
      image: architectureImage,
      date: '2023-12-20',
      location: 'Tech District',
    },
    {
      id: 12,
      title: 'Urban Poetry',
      category: 'Street',
      image: streetImage,
      date: '2023-12-18',
      location: 'Arts Quarter',
    },
  ];

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMoreItems = visibleCount < filteredItems.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  // Reset visible count when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(6);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-28 pb-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
              Photography Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A comprehensive collection of visual narratives spanning various genres 
              and moments captured through my lens.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <section className="sticky top-20 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Filter size={20} className="text-muted-foreground flex-shrink-0" />
            <div className="overflow-x-auto scrollbar-hide w-80 md:w-96">
              <div className="flex gap-2 pb-1" style={{ minWidth: 'max-content' }}>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 relative whitespace-nowrap flex-shrink-0',
                      'after:content-[""] after:absolute after:w-full after:h-[2px] after:bottom-0 after:left-0',
                      'after:bg-primary after:transition-transform after:duration-300',
                      selectedCategory === category
                        ? 'text-primary after:scale-x-100 font-semibold'
                        : 'text-muted-foreground hover:text-foreground after:scale-x-0 hover:after:scale-x-100'
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid gap-6 pt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((item) => (
              <Card
                key={item.id}
                className="group relative overflow-hidden bg-card border-border shadow-elegant hover:shadow-hover transition-all duration-500 cursor-pointer"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex space-x-3">
                        <Button
                          size="sm"
                          onClick={() => navigate(`/photo/${item.id}`)}
                          className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                        >
                          <Eye size={16} className="mr-2" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          onClick={async () => {
                            const url = `${window.location.origin}/photo/${item.id}`;
                            if (navigator.share) {
                              try {
                                await navigator.share({
                                  title: item.title,
                                  text: `Check out this photo: ${item.title}`,
                                  url: url,
                                });
                              } catch (error) {
                                await navigator.clipboard.writeText(url);
                                toast({
                                  title: "Link copied!",
                                  description: "Photo URL has been copied to your clipboard.",
                                });
                              }
                            } else {
                              await navigator.clipboard.writeText(url);
                              toast({
                                title: "Link copied!",
                                description: "Photo URL has been copied to your clipboard.",
                              });
                            }
                          }}
                          className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                        >
                          <Share2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/90 text-foreground">
                      {item.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{item.location}</span>
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          {hasMoreItems && (
            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8"
                onClick={handleLoadMore}
              >
                Load More Images
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;