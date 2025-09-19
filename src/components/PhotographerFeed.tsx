import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Eye, Heart } from 'lucide-react';
import { Photographer } from '@/types/photographer';

// 模拟摄影师数据
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
    bio: '专注人像摄影5年，擅长捕捉自然情感',
    portfolio: [
      { id: '1-1', url: portfolioPortrait, title: '夏日午后', category: '人像', description: '自然光人像摄影' },
      { id: '1-2', url: heroImage, title: '城市漫步', category: '街拍', description: '都市情侣写真' }
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
    portfolio: [
      { id: '3-1', url: heroImage, title: '温馨时光', category: '家庭', description: '家庭温馨瞬间' },
      { id: '3-2', url: portfolioPortrait, title: '纯真笑容', category: '儿童', description: '孩子天真时刻' }
    ],
    featured: false
  }
];

const PhotographerFeed = () => {
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleViewPhotographer = (photographerId: string) => {
    navigate(`/photographer/${photographerId}`);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">精选摄影师作品</h2>
          <p className="text-muted-foreground text-lg">发现你喜欢的拍摄风格，找到最适合的摄影师</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPhotographers.map((photographer) => 
            photographer.portfolio.map((photo) => (
              <Card 
                key={`${photographer.id}-${photo.id}`}
                className="group cursor-pointer overflow-hidden hover:shadow-elegant transition-all duration-300"
                onMouseEnter={() => setHoveredPhoto(photo.id)}
                onMouseLeave={() => setHoveredPhoto(null)}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={photo.url} 
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* 悬停时显示的操作按钮 */}
                  {hoveredPhoto === photo.id && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center space-x-3 transition-opacity duration-300">
                      <Button size="sm" variant="secondary" className="backdrop-blur-sm">
                        <Eye className="w-4 h-4 mr-1" />
                        查看
                      </Button>
                      <Button size="sm" variant="secondary" className="backdrop-blur-sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  {/* 作品信息 */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <Badge variant="secondary" className="mb-2">{photo.category}</Badge>
                    <h3 className="text-white font-semibold mb-1">{photo.title}</h3>
                    <p className="text-white/80 text-sm">{photo.description}</p>
                  </div>
                </div>

                <CardContent className="p-4">
                  {/* 摄影师信息 */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={photographer.avatar} alt={photographer.name} />
                        <AvatarFallback>{photographer.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-foreground">{photographer.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{photographer.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="font-semibold text-foreground">{photographer.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">({photographer.reviewCount}评价)</p>
                    </div>
                  </div>

                  {/* 专业标签 */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {photographer.specialties.slice(0, 2).map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* 价格和查看按钮 */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-primary">{photographer.priceRange}</p>
                    <Button 
                      size="sm" 
                      onClick={() => handleViewPhotographer(photographer.id)}
                      className="bg-gradient-primary hover:opacity-90"
                    >
                      查看摄影师
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* 查看更多摄影师 */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/photographers')}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            查看所有摄影师
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PhotographerFeed;