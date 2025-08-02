import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Search, ArrowRight, ChevronRight, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const blogPosts = [
    {
      id: 1,
      title: 'The Art of Golden Hour Photography',
      excerpt: 'Discover the secrets behind capturing that perfect golden light and how it transforms ordinary scenes into magical moments. Learn about timing, positioning, and camera settings.',
      category: 'Techniques',
      publishDate: '2024-01-15',
      readTime: '5 min read',
      featured: true,
    },
    {
      id: 2,
      title: 'Street Photography Ethics: A Thoughtful Approach',
      excerpt: 'A comprehensive exploration of the responsibilities and considerations when documenting human stories in public spaces, respecting privacy while creating meaningful art.',
      category: 'Philosophy',
      publishDate: '2024-01-08',
      readTime: '7 min read',
      featured: false,
    },
    {
      id: 3,
      title: 'Minimalism in Urban Landscapes',
      excerpt: 'How to find simplicity and elegance in the complexity of modern cityscapes through careful composition, negative space, and intentional framing.',
      category: 'Inspiration',
      publishDate: '2024-01-01',
      readTime: '4 min read',
      featured: false,
    },
    {
      id: 4,
      title: 'Understanding Light and Shadow',
      excerpt: 'Master the fundamental relationship between light and shadow to create dramatic, compelling photographs that tell powerful visual stories.',
      category: 'Techniques',
      publishDate: '2023-12-28',
      readTime: '6 min read',
      featured: false,
    },
    {
      id: 5,
      title: 'The Journey of a Portrait Session',
      excerpt: 'Behind-the-scenes look at my portrait photography process, from initial consultation to final delivery, including client interaction and creative decisions.',
      category: 'Process',
      publishDate: '2023-12-20',
      readTime: '8 min read',
      featured: true,
    },
    {
      id: 6,
      title: 'Color Theory in Photography',
      excerpt: 'Explore how color relationships, temperature, and saturation can evoke emotions and create visual harmony in your photographic compositions.',
      category: 'Theory',
      publishDate: '2023-12-15',
      readTime: '5 min read',
      featured: false,
    },
  ];

  const categories = ['All', 'Techniques', 'Philosophy', 'Inspiration', 'Process', 'Theory'];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-28 pb-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
              Photography Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Insights, techniques, and stories from behind the lens. Exploring the art, 
              craft, and philosophy of contemporary photography.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <section className="sticky top-20 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-10 h-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-4 flex-1">
              <Filter size={20} className="text-muted-foreground flex-shrink-0" />
              <div className="overflow-x-auto">
                <div className="flex gap-2 pb-1" style={{ minWidth: 'max-content' }}>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
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
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
            {blogPosts
              .filter(post => selectedCategory === 'All' || post.category === selectedCategory)
              .map((post, index) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className={`block ${index === 0 ? 'lg:col-span-2' : ''}`}
              >
                <Card className="group relative overflow-hidden bg-card border-border shadow-elegant hover:shadow-hover transition-all duration-500 cursor-pointer hover:scale-[1.02]">
                  <div className="p-8 h-full flex flex-col">
                    {/* Meta Information */}
                    <div className="flex items-center justify-between mb-4">
                      <Badge 
                        variant="secondary" 
                        className="text-xs font-medium"
                      >
                        {post.category}
                      </Badge>
                      {post.featured && (
                        <Badge 
                          className="bg-primary text-primary-foreground text-xs"
                        >
                          Featured
                        </Badge>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className={`font-serif font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300 ${
                      index === 0 ? 'text-3xl md:text-4xl' : 'text-2xl'
                    }`}>
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className={`text-muted-foreground leading-relaxed mb-6 flex-grow ${
                      index === 0 ? 'text-lg' : 'text-base'
                    }`}>
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          <span>{new Date(post.publishDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform duration-300">
                        <span className="mr-2">Read More</span>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-16">
            <div className="flex space-x-2">
              <button className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
                1
              </button>
              <button className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
                2
              </button>
              <button className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
                3
              </button>
              <button className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;