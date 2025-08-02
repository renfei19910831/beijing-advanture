import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Search, ArrowRight } from 'lucide-react';

const Blog = () => {
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
      <section className="pt-32 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
              Photography Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Insights, techniques, and stories from behind the lens. Exploring the art, 
              craft, and philosophy of contemporary photography.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 mb-12">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-10 h-12"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <Card
                key={post.id}
                className={`group relative overflow-hidden bg-card border-border shadow-elegant hover:shadow-hover transition-all duration-500 cursor-pointer ${
                  index === 0 ? 'lg:col-span-2' : ''
                }`}
              >
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
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Card>
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