import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPreview = () => {
  const latestPosts = [
    {
      id: 1,
      title: 'The Art of Golden Hour Photography',
      excerpt: 'Discover the secrets behind capturing that perfect golden light and how it transforms ordinary scenes into magical moments.',
      category: 'Techniques',
      publishDate: '2024-01-15',
      readTime: '5 min read',
      featured: true,
    },
    {
      id: 2,
      title: 'Street Photography Ethics',
      excerpt: 'A thoughtful exploration of the responsibilities and considerations when documenting human stories in public spaces.',
      category: 'Philosophy',
      publishDate: '2024-01-08',
      readTime: '7 min read',
      featured: false,
    },
    {
      id: 3,
      title: 'Minimalism in Urban Landscapes',
      excerpt: 'How to find simplicity and elegance in the complexity of modern cityscapes through careful composition.',
      category: 'Inspiration',
      publishDate: '2024-01-01',
      readTime: '4 min read',
      featured: false,
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Latest Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Thoughts on photography, visual storytelling, and the creative process 
            behind capturing compelling images.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {latestPosts.map((post, index) => (
            <Card
              key={post.id}
              className={`group relative overflow-hidden bg-card border-border shadow-elegant hover:shadow-hover transition-all duration-500 cursor-pointer ${
                index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
            >
              <div className="p-6 h-full flex flex-col">
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
                <h3 className={`font-serif font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300 ${
                  index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'
                }`}>
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className={`text-muted-foreground leading-relaxed mb-6 flex-grow ${
                  index === 0 ? 'text-base' : 'text-sm'
                }`}>
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
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
                  <ArrowRight 
                    size={16} 
                    className="text-primary transition-transform duration-300 group-hover:translate-x-1" 
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            to="/blog" 
            className="inline-flex items-center px-8 py-3 text-primary hover:text-primary/80 font-medium transition-colors duration-300 group"
          >
            <span className="mr-2">Read All Posts</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;