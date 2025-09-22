import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Eye, Heart, Camera, User, Calendar, ImageIcon, Edit, CheckCircle, Download } from 'lucide-react';
import { Photographer } from '@/types/photographer';

// 导入图片资源
import portfolioPortrait from '@/assets/portfolio-portrait.jpg';
import portfolioArchitecture from '@/assets/portfolio-architecture.jpg';
import portfolioStreet from '@/assets/portfolio-street.jpg';
import testimonialSarah from '@/assets/testimonial-sarah.jpg';
import testimonialMichael from '@/assets/testimonial-michael.jpg';
import testimonialLisa from '@/assets/testimonial-lisa.jpg';

// 精选摄影师数据（只显示featured为true的）
const featuredPhotographers: Photographer[] = [
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
    gender: 'female',
    portfolio: [
      { id: '1-1', url: portfolioPortrait, title: '夏日午后', category: '人像', description: '自然光人像摄影' }
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
      { id: '2-1', url: portfolioArchitecture, title: '现代建筑', category: '建筑', description: '几何美学展现' }
    ],
    featured: true
  },
  {
    id: '5',
    name: '刘思雨',
    avatar: testimonialLisa,
    rating: 4.8,
    reviewCount: 132,
    specialties: ['时尚摄影', '艺术摄影', '人像摄影'],
    location: '上海',
    priceRange: '¥1000-2500',
    bio: '时尚摄影师，擅长创意人像和时尚大片',
    gender: 'female',
    portfolio: [
      { id: '5-1', url: portfolioStreet, title: '时尚力量', category: '时尚', description: '现代时尚摄影' }
    ],
    featured: true
  }
];

const FeaturedPhotographersSection = () => {
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);
  const navigate = useNavigate();

  const steps = [
    { icon: ImageIcon, title: '浏览照片', description: '查看作品集' },
    { icon: User, title: '选择摄影师', description: '找到心仪风格' },
    { icon: Calendar, title: '预约时间', description: '选择拍摄日期' },
    { icon: Camera, title: '拍摄照片', description: '专业现场拍摄' },
    { icon: Edit, title: '修改照片', description: '精细后期处理' },
    { icon: CheckCircle, title: '确认照片', description: '满意后确认' },
    { icon: Download, title: '交付照片', description: '获得高清作品' }
  ];

  const handleViewPhotographer = (photographerId: string) => {
    navigate(`/photographer/${photographerId}`);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">发现和选择你喜欢的摄影师</h2>
          <p className="text-muted-foreground text-lg">专业摄影师为您提供优质拍摄服务，从选择到交付全程无忧</p>
        </div>

        {/* 7步专业拍摄流程 */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <Card key={index} className="p-4 text-center hover:shadow-elegant transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="mb-3">
                  <div className="w-12 h-12 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-2">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-6 h-6 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* 精选摄影师展示 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredPhotographers.map((photographer) => 
            photographer.portfolio.slice(0, 1).map((photo) => (
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
                      选择摄影师
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* 查看更多摄影师 */}
        <div className="text-center">
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

export default FeaturedPhotographersSection;