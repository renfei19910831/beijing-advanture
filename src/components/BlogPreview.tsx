import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPreview = () => {
  const latestPosts = [
    {
      id: 1,
      title: '北京拍照圣地大盘点：10个绝美取景地',
      excerpt: '从故宫到798艺术区，从胡同到现代建筑，为你盘点北京最适合拍照的10个绝美取景地，让你的照片瞬间刷爆朋友圈。',
      category: '拍摄地点',
      publishDate: '2024-01-15',
      readTime: '5分钟阅读',
      featured: true,
    },
    {
      id: 2,
      title: '春季拍摄指南：如何拍出樱花季的浪漫感',
      excerpt: '春暖花开，樱花盛放。掌握这些拍摄技巧，让你在樱花季拍出电影般的浪漫大片，记录最美的春日时光。',
      category: '拍摄技巧',
      publishDate: '2024-01-12',
      readTime: '7分钟阅读',
      featured: false,
    },
    {
      id: 3,
      title: '情侣写真拍摄攻略：自然互动的秘诀',
      excerpt: '想要拍出自然甜蜜的情侣写真？这些实用技巧帮你营造轻松氛围，捕捉最真实的爱情瞬间。',
      category: '拍摄攻略',
      publishDate: '2024-01-10',
      readTime: '4分钟阅读',
      featured: false,
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            旅行攻略 & 拍摄指南
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            最佳拍摄地点推荐、摄影技巧分享和旅行拍摄攻略，让你的每次拍摄都收获满满
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
                      精选
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
            <span className="mr-2">查看所有攻略</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;