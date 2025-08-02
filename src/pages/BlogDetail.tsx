import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Share2, Bookmark, ArrowLeft, ChevronRight, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import portraitImage from '@/assets/portfolio-portrait.jpg';

const BlogDetail = () => {
  const { id } = useParams();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mock blog post data - in real app, fetch by id
  const blogPost = {
    id: 1,
    title: 'The Art of Golden Hour Photography',
    excerpt: 'Discover the secrets behind capturing that perfect golden light and how it transforms ordinary scenes into magical moments.',
    content: `
      <h2>Understanding Golden Hour</h2>
      <p>Golden hour, also known as the magic hour, occurs twice daily - shortly after sunrise and just before sunset. During this time, the sun sits low on the horizon, creating warm, soft light that photographers dream about.</p>
      
      <h3>Why Golden Hour is Special</h3>
      <p>The low angle of the sun during golden hour creates several unique lighting conditions:</p>
      <ul>
        <li>Warm color temperature (2500K-3500K)</li>
        <li>Softer shadows due to diffused light</li>
        <li>Even lighting across subjects</li>
        <li>Natural rim lighting and backlighting opportunities</li>
      </ul>

      <h3>Camera Settings for Golden Hour</h3>
      <p>To make the most of golden hour lighting, consider these camera settings:</p>
      <ul>
        <li><strong>ISO:</strong> Keep it low (100-400) for clean images</li>
        <li><strong>Aperture:</strong> f/5.6 to f/8 for sharp landscape shots</li>
        <li><strong>White Balance:</strong> Daylight or slightly warm</li>
        <li><strong>Metering:</strong> Spot or center-weighted for precise exposure</li>
      </ul>

      <h3>Planning Your Golden Hour Shoot</h3>
      <p>Successful golden hour photography requires careful planning. Use apps like PhotoPills or Sun Surveyor to predict the sun's position and plan your compositions accordingly.</p>
    `,
    category: 'Techniques',
    publishDate: '2024-01-15',
    readTime: '5 min read',
    author: 'Alex Chen',
    featured: true,
    tags: ['Golden Hour', 'Lighting', 'Landscape', 'Portrait'],
    estimatedReadTime: 5,
    wordCount: 850
  };

  const relatedPosts = [
    {
      id: 2,
      title: 'Understanding Natural Light',
      category: 'Techniques',
      image: portraitImage,
      readTime: '4 min read'
    },
    {
      id: 3,
      title: 'Landscape Photography Tips',
      category: 'Techniques',
      image: portraitImage,
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Portrait Lighting Mastery',
      category: 'Techniques',
      image: portraitImage,
      readTime: '7 min read'
    }
  ];

  const tableOfContents = [
    { id: 'understanding-golden-hour', title: 'Understanding Golden Hour' },
    { id: 'why-golden-hour-is-special', title: 'Why Golden Hour is Special' },
    { id: 'camera-settings', title: 'Camera Settings for Golden Hour' },
    { id: 'planning-your-shoot', title: 'Planning Your Golden Hour Shoot' }
  ];

  return (
    <div className={cn("min-h-screen transition-colors duration-300", isDarkMode ? "dark" : "")}>
      <Navigation />
      
      {/* Header with Featured Image */}
      <section className="pt-20 relative">
        {/* Featured Image */}
        <div className="w-full h-[60vh] relative overflow-hidden">
          <img
            src={portraitImage}
            alt={blogPost.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/30" />
          
          {/* Back Button */}
          <Link
            to="/blog"
            className="absolute top-8 left-8 flex items-center text-white hover:text-primary transition-colors bg-background/20 backdrop-blur-sm rounded-full px-4 py-2"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Blog
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="absolute top-8 right-8 p-3 bg-background/20 backdrop-blur-sm rounded-full text-white hover:bg-background/30 transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Table of Contents - Sidebar */}
            {blogPost.wordCount > 800 && (
              <div className="lg:col-span-1">
                <div className="sticky top-32">
                  <Card className="p-6">
                    <h3 className="font-serif text-lg font-semibold mb-4 text-foreground">
                      Table of Contents
                    </h3>
                    <nav className="space-y-2">
                      {tableOfContents.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  </Card>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className={cn("lg:col-span-3", blogPost.wordCount <= 800 && "lg:col-span-4")}>
              {/* Article Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                  <Badge variant="secondary">{blogPost.category}</Badge>
                  {blogPost.featured && (
                    <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                  )}
                </div>
                
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {blogPost.title}
                </h1>
                
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-2" />
                    <span>{new Date(blogPost.publishDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-2" />
                    <span>{blogPost.estimatedReadTime} min read</span>
                  </div>
                  <span>By {blogPost.author}</span>
                </div>

                {/* Social Sharing */}
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    <Share2 size={16} className="mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark size={16} className="mr-2" />
                    Save
                  </Button>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-foreground leading-relaxed space-y-6"
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="font-semibold text-foreground mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blogPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
            Related Articles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-hover transition-all duration-300 group-hover:scale-[1.02]">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-3 text-xs">
                      {post.category}
                    </Badge>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                      <ChevronRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetail;