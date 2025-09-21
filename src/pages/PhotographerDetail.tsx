import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star, MapPin, ArrowLeft, Calendar, MessageCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Photographer } from '@/types/photographer';

// Import images (same as in other components)
import heroImage from '@/assets/hero-landscape.jpg';
import portfolioPortrait from '@/assets/portfolio-portrait.jpg';
import portfolioArchitecture from '@/assets/portfolio-architecture.jpg';
import portfolioStreet from '@/assets/portfolio-street.jpg';
import testimonialSarah from '@/assets/testimonial-sarah.jpg';
import testimonialMichael from '@/assets/testimonial-michael.jpg';
import testimonialLisa from '@/assets/testimonial-lisa.jpg';

const mockPhotographers: Photographer[] = [
  {
    id: '1',
    name: '张雨欣',
    avatar: testimonialSarah,
    rating: 4.9,
    reviewCount: 156,
    specialties: ['人像摄影', '情侣写真', '旅拍'],
    location: '北京',  
    priceRange: '¥800-2000',
    bio: '专注人像摄影5年，擅长捕捉自然情感。毕业于中央美术学院摄影系，曾为多位明星和模特拍摄过写真。善于运用自然光线，营造温暖而真实的画面氛围。',
    gender: 'female',
    portfolio: [
      { id: '1-1', url: portfolioPortrait, title: '夏日午后', category: '人像', description: '自然光人像摄影' },
      { id: '1-2', url: heroImage, title: '城市漫步', category: '街拍', description: '都市情侣写真' },
      { id: '1-3', url: portfolioStreet, title: '街角时光', category: '街拍', description: '日常生活记录' },
      { id: '1-4', url: portfolioArchitecture, title: '光影对话', category: '人像', description: '建筑背景人像' }
    ],
    featured: true
  },
  {
    id: '2',
    name: '李明轩',
    avatar: testimonialMichael,
    rating: 4.8,
    reviewCount: 89,
    specialties: ['建筑摄影', '风光摄影', '商业摄影'],
    location: '上海',
    priceRange: '¥1200-3000',
    bio: '建筑系出身，善于用镜头诠释空间之美',
    gender: 'male',
    portfolio: [
      { id: '2-1', url: portfolioArchitecture, title: '现代建筑', category: '建筑', description: '几何美学展现' },
      { id: '2-2', url: portfolioStreet, title: '街道印象', category: '街拍', description: '城市节奏感' }
    ],
    featured: true
  },
  {
    id: '3',
    name: '王小莉',
    avatar: testimonialLisa,
    rating: 4.7,
    reviewCount: 234,
    specialties: ['婚纱摄影', '家庭摄影', '儿童摄影'],
    location: '广州',
    priceRange: '¥600-1500',
    bio: '温暖的镜头语言，记录生活中的美好瞬间',
    gender: 'female',
    portfolio: [
      { id: '3-1', url: heroImage, title: '温馨时光', category: '家庭', description: '家庭温馨瞬间' },
      { id: '3-2', url: portfolioPortrait, title: '纯真笑容', category: '儿童', description: '孩子天真时刻' }
    ],
    featured: false
  }
];

const PhotographerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const photographer = mockPhotographers.find(p => p.id === id);

  if (!photographer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">摄影师未找到</h2>
          <Button onClick={() => navigate('/photographers')}>
            返回摄影师列表
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回</span>
          </Button>
        </div>

        {/* Photographer Header */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
              <Avatar className="w-32 h-32">
                <AvatarImage src={photographer.avatar} alt={photographer.name} />
                <AvatarFallback className="text-2xl">{photographer.name[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-2">{photographer.name}</h1>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 fill-primary text-primary" />
                    <span className="font-semibold text-lg">{photographer.rating}</span>
                    <span className="text-muted-foreground">({photographer.reviewCount}评价)</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{photographer.location}</span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {photographer.specialties.map((specialty) => (
                    <Badge key={specialty} className="bg-primary/10 text-primary">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <p className="text-muted-foreground mb-6">{photographer.bio}</p>

                <div className="flex items-center space-x-4">
                  <div className="text-2xl font-bold text-primary">{photographer.priceRange}</div>
                  <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                    <Calendar className="w-4 h-4 mr-2" />
                    立即预约
                  </Button>
                  <Button variant="outline" size="lg">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    咨询详情
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8">作品集</h2>
            
            {/* Artistic Masonry-like Layout */}
            <div className="relative">
              {photographer.portfolio.map((photo, index) => {
                // Define different layouts for each position
                const layouts = [
                  { size: 'large', position: 'col-span-2 row-span-2', aspect: 'aspect-square' },
                  { size: 'medium', position: 'col-span-1 row-span-1', aspect: 'aspect-[4/5]' },
                  { size: 'wide', position: 'col-span-2 row-span-1', aspect: 'aspect-[2/1]' },
                  { size: 'tall', position: 'col-span-1 row-span-2', aspect: 'aspect-[3/5]' }
                ];
                
                const layout = layouts[index % layouts.length];
                
                return (
                  <div 
                    key={photo.id}
                    className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 ${
                      index === 0 ? 'mb-6' : ''
                    } ${
                      index % 2 === 0 ? 'animate-fade-in' : 'animate-fade-in'
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      marginBottom: index < photographer.portfolio.length - 1 ? '1.5rem' : '0',
                      float: index % 2 === 0 ? 'left' : 'right',
                      width: layout.size === 'large' ? '60%' : layout.size === 'wide' ? '70%' : '45%',
                      clear: index % 3 === 0 ? 'both' : 'none',
                      marginLeft: index % 2 === 0 ? '0' : '1rem',
                      marginRight: index % 2 === 0 ? '1rem' : '0'
                    }}
                  >
                    <div className={`relative ${layout.aspect} overflow-hidden`}>
                      <img 
                        src={photo.url} 
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <Badge 
                            variant="secondary" 
                            className="mb-3 bg-white/20 backdrop-blur-sm border-white/30 text-white"
                          >
                            {photo.category}
                          </Badge>
                          <h3 className="text-white font-bold text-xl mb-2">{photo.title}</h3>
                          <p className="text-white/90 text-sm leading-relaxed">{photo.description}</p>
                        </div>
                      </div>
                      
                      {/* Corner Accent */}
                      <div className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg shadow-primary/50" />
                      
                      {/* Artistic Border Effect */}
                      <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-2xl transition-all duration-500" />
                    </div>
                  </div>
                );
              })}
              
              {/* Clear float */}
              <div className="clear-both" />
            </div>
            
            {/* Alternative Grid Layout for smaller screens */}
            <div className="md:hidden space-y-4">
              {photographer.portfolio.map((photo, index) => (
                <Card 
                  key={`mobile-${photo.id}`} 
                  className="group overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={photo.url} 
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge variant="secondary" className="mb-2 bg-white/20 backdrop-blur-sm border-white/30 text-white">
                          {photo.category}
                        </Badge>
                        <h3 className="text-white font-semibold mb-1">{photo.title}</h3>
                        <p className="text-white/80 text-sm">{photo.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8">客户评价</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample reviews */}
              {[1, 2, 3].map((review) => (
                <Card key={review}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">
                      "拍摄效果非常好，摄影师很专业，能够很好地捕捉自然的表情和动作。整个拍摄过程很愉快！"
                    </p>
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>客</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">匿名客户</p>
                        <p className="text-xs text-muted-foreground">2024年8月</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PhotographerDetail;