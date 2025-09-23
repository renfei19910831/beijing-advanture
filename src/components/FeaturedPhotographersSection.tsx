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

// 精选摄影师数据（展示更多作品）
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
      { id: '1-1', url: portfolioPortrait, title: '夏日午后', category: '人像', description: '自然光人像摄影' },
      { id: '1-2', url: portfolioArchitecture, title: '城市建筑', category: '建筑', description: '现代建筑线条' }
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
      { id: '2-2', url: portfolioStreet, title: '街景瞬间', category: '街拍', description: '城市生活记录' }
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
      { id: '5-1', url: portfolioStreet, title: '时尚力量', category: '时尚', description: '现代时尚摄影' },
      { id: '5-2', url: portfolioPortrait, title: '优雅肖像', category: '人像', description: '精致人像摄影' }
    ],
    featured: true
  },
  {
    id: '6',
    name: '王浩天',
    avatar: testimonialMichael,
    rating: 4.7,
    reviewCount: 98,
    specialties: ['风光摄影', '旅拍', '自然摄影'],
    location: '成都',
    priceRange: '¥900-2200',
    bio: '热爱自然风光，擅长捕捉光影瞬间',
    gender: 'male',
    portfolio: [
      { id: '6-1', url: portfolioArchitecture, title: '山川壮美', category: '风光', description: '自然风光摄影' },
      { id: '6-2', url: portfolioStreet, title: '旅途记忆', category: '旅拍', description: '旅行摄影纪实' }
    ],
    featured: true
  },
  {
    id: '7',
    name: '陈小雅',
    avatar: testimonialSarah,
    rating: 4.9,
    reviewCount: 203,
    specialties: ['婚纱摄影', '情侣写真', '家庭摄影'],
    location: '广州',
    priceRange: '¥1100-2800',
    bio: '专业婚纱摄影师，记录最美好的时刻',
    gender: 'female',
    portfolio: [
      { id: '7-1', url: portfolioPortrait, title: '浪漫时刻', category: '婚纱', description: '唯美婚纱摄影' },
      { id: '7-2', url: portfolioArchitecture, title: '幸福时光', category: '情侣', description: '甜蜜情侣写真' }
    ],
    featured: true
  },
  {
    id: '8',
    name: '赵志强',
    avatar: testimonialMichael,
    rating: 4.6,
    reviewCount: 76,
    specialties: ['商业摄影', '产品摄影', '企业宣传'],
    location: '深圳',
    priceRange: '¥1500-3500',
    bio: '商业摄影专家，助力品牌形象提升',
    gender: 'male',
    portfolio: [
      { id: '8-1', url: portfolioStreet, title: '商业大片', category: '商业', description: '专业商业摄影' },
      { id: '8-2', url: portfolioArchitecture, title: '产品展示', category: '产品', description: '精美产品摄影' }
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
          <h2 className="text-3xl font-bold text-foreground mb-4">探索优秀摄影师作品</h2>
          <p className="text-muted-foreground text-lg">浏览精选摄影师的优质作品，找到最适合您需求的摄影风格</p>
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

        {/* 精选摄影师展示 - 瀑布流布局 */}
        <div className="relative">
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-0 mb-12">
            {featuredPhotographers.flatMap((photographer) => 
              photographer.portfolio.map((photo, index) => (
                <Card 
                  key={`${photographer.id}-${photo.id}`}
                  className="group cursor-pointer overflow-hidden transition-all duration-300 mb-12 break-inside-avoid animate-fade-in"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                  onMouseEnter={() => setHoveredPhoto(photo.id)}
                  onMouseLeave={() => setHoveredPhoto(null)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={photo.url} 
                      alt={photo.title}
                      className="w-full object-cover"
                      style={{
                        height: `${280 + (index % 4) * 60 + Math.floor(Math.random() * 80)}px`,
                        minHeight: '280px'
                      }}
                    />
                    
                    {/* 悬停时显示的操作按钮 */}
                    {hoveredPhoto === photo.id && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center space-x-3 transition-all duration-300 animate-fade-in">
                        <Button size="sm" variant="secondary" className="backdrop-blur-md bg-white/20 border-white/30 text-white hover:bg-white/30">
                          <Eye className="w-4 h-4 mr-1" />
                          查看
                        </Button>
                        <Button size="sm" variant="secondary" className="backdrop-blur-md bg-white/20 border-white/30 text-white hover:bg-white/30">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    )}

                    {/* 作品信息 */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                      <Badge variant="secondary" className="mb-2 bg-white/20 text-white border-white/30">{photo.category}</Badge>
                      <h3 className="text-white font-semibold mb-1 text-sm">{photo.title}</h3>
                      <p className="text-white/80 text-xs line-clamp-2">{photo.description}</p>
                    </div>
                  </div>

                  <CardContent className="p-3">
                    {/* 摄影师信息 */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={photographer.avatar} alt={photographer.name} />
                          <AvatarFallback>{photographer.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm">{photographer.name}</h4>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{photographer.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-primary text-primary" />
                          <span className="font-semibold text-foreground text-xs">{photographer.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* 专业标签 */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {photographer.specialties.slice(0, 2).map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs py-0 px-1">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    {/* 价格和查看按钮 */}
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-primary">{photographer.priceRange}</p>
                      <Button 
                        size="sm" 
                        onClick={() => handleViewPhotographer(photographer.id)}
                        className="bg-gradient-primary hover:opacity-90 text-xs py-1 px-2 h-6"
                      >
                        预约
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* 渐变遮罩效果 */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
        </div>

        {/* 查看更多摄影师 */}
        <div className="text-center relative z-10">
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