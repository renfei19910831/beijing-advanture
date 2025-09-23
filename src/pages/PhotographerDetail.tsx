import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Star, MapPin, ArrowLeft, Calendar, MessageCircle, Camera, Heart } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { PhotoModal } from '@/components/PhotoModal';
import { PhotographerAvailability } from '@/components/PhotographerAvailability';
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
      // 情侣写真
      { id: '1', url: portfolioPortrait, title: '夏日午后', category: '情侣写真', description: '自然光人像摄影，捕捉情侣间的甜蜜瞬间', date: '2024-08-15', location: '北京·朝阳公园', camera: 'Canon EOS R5', lens: '85mm f/1.4', settings: 'f/1.8, 1/200s, ISO 400' },
      { id: '2', url: heroImage, title: '城市漫步', category: '情侣写真', description: '都市背景下的浪漫情侣写真', date: '2024-08-12', location: '北京·三里屯', camera: 'Canon EOS R5', lens: '50mm f/1.2', settings: 'f/2.0, 1/125s, ISO 800' },
      { id: '3', url: portfolioStreet, title: '黄昏时光', category: '情侣写真', description: '夕阳下的温馨情侣照', date: '2024-08-10', location: '北京·什刹海', camera: 'Canon EOS R5', lens: '35mm f/1.4', settings: 'f/2.2, 1/60s, ISO 200' },
      
      // 家庭摄影
      { id: '4', url: portfolioArchitecture, title: '温暖的家', category: '全家福', description: '三代同堂的幸福时光', date: '2024-08-08', location: '北京·奥林匹克公园', camera: 'Canon EOS R5', lens: '24-70mm f/2.8', settings: 'f/4.0, 1/100s, ISO 320' },
      { id: '5', url: heroImage, title: '亲子时光', category: '家庭摄影', description: '父母与孩子的温馨互动', date: '2024-08-05', location: '北京·颐和园', camera: 'Canon EOS R5', lens: '85mm f/1.4', settings: 'f/2.8, 1/160s, ISO 250' },
      { id: '6', url: portfolioPortrait, title: '兄弟情深', category: '家庭摄影', description: '记录兄弟姐妹的珍贵情感', date: '2024-08-03', location: '北京·中山公园', camera: 'Canon EOS R5', lens: '50mm f/1.2', settings: 'f/2.5, 1/200s, ISO 160' },
      
      // 个人写真
      { id: '7', url: portfolioStreet, title: '职场精英', category: '个人写真', description: '专业商务形象照', date: '2024-07-30', location: '北京·CBD', camera: 'Canon EOS R5', lens: '85mm f/1.4', settings: 'f/2.0, 1/125s, ISO 400' },
      { id: '8', url: portfolioArchitecture, title: '艺术肖像', category: '个人写真', description: '创意艺术人像摄影', date: '2024-07-28', location: '北京·798艺术区', camera: 'Canon EOS R5', lens: '35mm f/1.4', settings: 'f/1.8, 1/80s, ISO 640' },
      
      // 周年纪念
      { id: '9', url: heroImage, title: '十年之约', category: '周年纪念', description: '结婚十周年纪念写真', date: '2024-07-25', location: '北京·故宫', camera: 'Canon EOS R5', lens: '24-70mm f/2.8', settings: 'f/3.2, 1/100s, ISO 200' },
      { id: '10', url: portfolioPortrait, title: '银婚纪念', category: '周年纪念', description: '25周年银婚纪念照', date: '2024-07-20', location: '北京·天坛', camera: 'Canon EOS R5', lens: '50mm f/1.2', settings: 'f/2.8, 1/160s, ISO 320' },
      
      // 宠物摄影
      { id: '11', url: portfolioStreet, title: '毛孩子', category: '宠物摄影', description: '可爱宠物与主人的温馨时刻', date: '2024-07-18', location: '北京·朝阳公园', camera: 'Canon EOS R5', lens: '70-200mm f/2.8', settings: 'f/3.5, 1/250s, ISO 500' },
      { id: '12', url: portfolioArchitecture, title: '萌宠日常', category: '宠物摄影', description: '记录宠物的日常生活', date: '2024-07-15', location: '北京·奥森公园', camera: 'Canon EOS R5', lens: '85mm f/1.4', settings: 'f/2.2, 1/200s, ISO 400' }
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
      { id: '21', url: portfolioArchitecture, title: '现代建筑', category: '建筑', description: '几何美学展现', date: '2024-08-01', location: '上海·陆家嘴', camera: 'Sony A7R V', lens: '16-35mm f/2.8', settings: 'f/8.0, 1/60s, ISO 100' },
      { id: '22', url: portfolioStreet, title: '街道印象', category: '街拍', description: '城市节奏感', date: '2024-07-28', location: '上海·南京路', camera: 'Sony A7R V', lens: '35mm f/1.4', settings: 'f/2.8, 1/125s, ISO 400' }
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
      { id: '31', url: heroImage, title: '温馨时光', category: '家庭', description: '家庭温馨瞬间', date: '2024-08-01', location: '广州·珠江新城', camera: 'Nikon Z9', lens: '24-70mm f/2.8', settings: 'f/4.0, 1/100s, ISO 200' },
      { id: '32', url: portfolioPortrait, title: '纯真笑容', category: '儿童', description: '孩子天真时刻', date: '2024-07-25', location: '广州·越秀公园', camera: 'Nikon Z9', lens: '85mm f/1.8', settings: 'f/2.5, 1/200s, ISO 320' }
    ],
    featured: false
  }
];

const PhotographerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isFollowed, setIsFollowed] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  // Booking handler
  const handleBooking = () => {
    // Navigate to contact page with photographer info
    navigate('/contact', { 
      state: { 
        photographerId: id,
        photographerName: photographer?.name,
        service: '预约拍摄'
      }
    });
  };

  // Handle availability slot booking
  const handleBookSlot = (slot: any) => {
    navigate('/contact', { 
      state: { 
        photographerId: id,
        photographerName: photographer?.name,
        service: slot.service_type,
        selectedSlot: {
          date: slot.date,
          time: `${slot.start_time.substring(0, 5)}-${slot.end_time.substring(0, 5)}`,
          price: slot.price
        }
      }
    });
  };

  // 从本地存储加载关注状态
  useEffect(() => {
    if (id) {
      const followedPhotographers = JSON.parse(localStorage.getItem('followedPhotographers') || '[]');
      setIsFollowed(followedPhotographers.includes(id));
    }
  }, [id]);

  // 监听滚动，控制吸顶显示
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // 当滚动超过400px时显示吸顶栏
      setShowStickyHeader(scrollTop > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 切换关注状态
  const toggleFollow = () => {
    if (!id) return;
    
    const followedPhotographers = JSON.parse(localStorage.getItem('followedPhotographers') || '[]');
    
    if (isFollowed) {
      // 取消关注
      const updatedFollowed = followedPhotographers.filter((photographerId: string) => photographerId !== id);
      localStorage.setItem('followedPhotographers', JSON.stringify(updatedFollowed));
      setIsFollowed(false);
    } else {
      // 添加关注
      const updatedFollowed = [...followedPhotographers, id];
      localStorage.setItem('followedPhotographers', JSON.stringify(updatedFollowed));
      setIsFollowed(true);
    }
  };
  
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

  // 获取所有分类
  const categories = ['全部', ...Array.from(new Set(photographer.portfolio.map(photo => photo.category)))];
  
  // 筛选作品
  const filteredPortfolio = selectedCategory === '全部' 
    ? photographer.portfolio 
    : photographer.portfolio.filter(photo => photo.category === selectedCategory);

  // 按分类统计作品数量
  const categoryStats = categories.reduce((stats, category) => {
    if (category === '全部') {
      stats[category] = photographer.portfolio.length;
    } else {
      stats[category] = photographer.portfolio.filter(photo => photo.category === category).length;
    }
    return stats;
  }, {} as Record<string, number>);

  // 处理照片点击
  const handlePhotoClick = (index: number) => {
    setSelectedPhotoIndex(index);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* 吸顶栏 */}
      <div className={`fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/20 transition-all duration-300 ${
        showStickyHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={photographer.avatar} alt={photographer.name} />
                <AvatarFallback className="text-lg">{photographer.name[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex flex-col">
                <h3 className="font-bold text-lg text-foreground">{photographer.name}</h3>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-semibold">{photographer.rating}</span>
                    <span className="text-muted-foreground text-sm">({photographer.reviewCount})</span>
                  </div>
                  <div className="text-lg font-bold text-primary">{photographer.priceRange}</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button size="sm" className="bg-gradient-primary hover:opacity-90" onClick={handleBooking}>
                <Calendar className="w-4 h-4 mr-1" />
                预约
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-1" />
                咨询
              </Button>
              <Button
                variant={isFollowed ? "default" : "outline"}
                size="sm"
                onClick={toggleFollow}
                className={`
                  transition-all duration-200
                  ${isFollowed 
                    ? 'bg-red-500 hover:bg-red-600 text-white border-red-500' 
                    : 'hover:bg-red-50 hover:border-red-200 hover:text-red-600'
                  }
                `}
              >
                <Heart 
                  className={`w-4 h-4 mr-1 ${
                    isFollowed ? 'fill-white' : ''
                  }`} 
                />
                {isFollowed ? '已关注' : '关注'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
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
                  <Button size="lg" className="bg-gradient-primary hover:opacity-90 relative overflow-hidden group" onClick={handleBooking}>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                    <Calendar className="w-4 h-4 mr-2 relative z-10" />
                    <span className="relative z-10">立即预约</span>
                  </Button>
                  <Button variant="outline" size="lg">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    咨询详情
                  </Button>
                  <Button
                    variant={isFollowed ? "default" : "outline"}
                    size="lg"
                    onClick={toggleFollow}
                    className={`
                      transition-all duration-200
                      ${isFollowed 
                        ? 'bg-red-500 hover:bg-red-600 text-white border-red-500' 
                        : 'hover:bg-red-50 hover:border-red-200 hover:text-red-600'
                      }
                    `}
                  >
                    <Heart 
                      className={`w-4 h-4 mr-2 ${
                        isFollowed ? 'fill-white' : ''
                      }`} 
                    />
                    {isFollowed ? '已关注' : '关注'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Availability Section */}
        <section className="py-8 bg-muted/20">
          <div className="container mx-auto px-4">
            <PhotographerAvailability 
              photographerId={photographer.id}
              photographerName={photographer.name}
              onBookSlot={handleBookSlot}
            />
          </div>
        </section>

        {/* Portfolio */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">作品集</h2>
              <span className="text-muted-foreground">共 {photographer.portfolio.length} 张作品</span>
            </div>
            
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 p-1 bg-muted/50 rounded-lg">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    transition-all duration-200 
                    ${selectedCategory === category 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'hover:bg-background/80'
                    }
                  `}
                >
                  {category}
                  <Badge 
                    variant="secondary" 
                    className={`ml-2 text-xs ${
                      selectedCategory === category 
                        ? 'bg-primary-foreground/20 text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {categoryStats[category]}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Portfolio Grid - 小红书风格竖版布局 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {filteredPortfolio.map((photo, index) => {
                return (
                  <Card 
                    key={photo.id} 
                    className="group overflow-hidden hover:shadow-elegant transition-all duration-500 animate-fade-in border-0 bg-card hover:shadow-button-hover"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div 
                      className="relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer"
                      onClick={() => handlePhotoClick(index)}
                    >
                      <img 
                        src={photo.url} 
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-smooth"
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <Badge 
                          variant="secondary" 
                          className="bg-black/70 backdrop-blur-md text-white border-0 text-xs px-3 py-1 rounded-full shadow-lg"
                        >
                          {photo.category}
                        </Badge>
                      </div>
                      
                      {/* Hover Overlay with Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end z-10">
                        <div className="p-4 text-white transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 ease-smooth">
                          <h3 className="font-bold text-base mb-1 font-serif">{photo.title}</h3>
                          <p className="text-sm text-white/90 line-clamp-2 leading-relaxed">{photo.description}</p>
                        </div>
                      </div>

                      {/* 光晕效果 */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      {/* 边框高光效果 */}
                      <div className="absolute inset-0 rounded-lg border-2 border-primary/0 group-hover:border-primary/20 transition-all duration-500" />
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredPortfolio.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>该分类下暂无作品</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCategory('全部')}
                >
                  查看全部作品
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Useful Information FAQ Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-8">实用信息</h2>
              
              <div className="bg-muted/30 rounded-lg p-6">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="reschedule" className="border border-border/20 rounded-lg px-6 bg-background">
                    <AccordionTrigger className="text-left font-medium">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-blue-600" />
                        </div>
                        <span>改期政策</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                      <p>如果您需要改期，请在原定拍摄日期前至少96小时（4天）提交改期申请，可享受免费改期服务。</p>
                      <p className="mt-2">超过时间限制的改期申请可能需要支付额外费用。建议您尽早确认拍摄时间安排。</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="cancellation" className="border border-border/20 rounded-lg px-6 bg-background">
                    <AccordionTrigger className="text-left font-medium">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                          <MessageCircle className="w-4 h-4 text-red-600" />
                        </div>
                        <span>取消政策</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                      <p>如果您需要取消预约，请在原定拍摄日期前至少96小时（4天）提交取消申请，可享受免费取消服务。</p>
                      <p className="mt-2">超过时间限制的取消申请，将根据具体情况收取一定的取消费用。</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="delivery" className="border border-border/20 rounded-lg px-6 bg-background">
                    <AccordionTrigger className="text-left font-medium">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <Camera className="w-4 h-4 text-green-600" />
                        </div>
                        <span>48小时内交付照片</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                      <p>所有拍摄完成后，修图师会在48小时内完成照片的后期处理和精修工作。</p>
                      <p className="mt-2">您可以通过我们的网站或移动应用下载高清版本的照片。紧急情况下，我们也提供加急服务。</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="transportation" className="border border-border/20 rounded-lg px-6 bg-background">
                    <AccordionTrigger className="text-left font-medium">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-purple-600" />
                        </div>
                        <span>摄影师交通和门票费用</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                      <p>我们的摄影师都是当地专业摄影师，市区内拍摄无需额外交通费用。</p>
                      <p className="mt-2">如果您选择的拍摄地点距离市中心超过1小时车程，或需要购买门票的特殊场所，可能会产生额外费用。具体费用会在预约时与您确认。</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="weather" className="border border-border/20 rounded-lg px-6 bg-background">
                    <AccordionTrigger className="text-left font-medium">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                          <Star className="w-4 h-4 text-orange-600" />
                        </div>
                        <span>恶劣天气处理</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                      <p>如遇雨雪等恶劣天气影响拍摄，我们会提前24小时与您沟通调整方案。</p>
                      <p className="mt-2">可以选择改期、更换室内拍摄地点，或使用专业设备在适宜条件下完成拍摄。天气原因的调整不收取额外费用。</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="equipment" className="border border-border/20 rounded-lg px-6 bg-background">
                    <AccordionTrigger className="text-left font-medium">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                          <Camera className="w-4 h-4 text-indigo-600" />
                        </div>
                        <span>拍摄设备和后期处理</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                      <p>所有摄影师都配备专业级相机设备，包括全画幅相机、多种焦段镜头、专业闪光灯等。</p>
                      <p className="mt-2">后期处理包括基础调色、人像美化、场景优化等。如需特殊效果或大幅修改，会根据工作量收取适当费用。</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="mt-8 text-center">
                  <Button variant="outline" size="lg">
                    查看更多常见问题
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">为什么选择我们？</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  专业的摄影服务，让每一个珍贵时刻都值得被完美记录
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* 专业摄影师 */}
                <Card className="group hover:shadow-elegant transition-all duration-300 border-0 bg-background animate-fade-in relative overflow-hidden">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-sweep"></div>
                  <CardContent className="p-8 text-center relative z-10">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">资深专业摄影师</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      所有摄影师均经过严格筛选，拥有丰富的拍摄经验和专业技能。
                      每位摄影师都有自己独特的拍摄风格，能够根据您的需求提供个性化服务。
                    </p>
                  </CardContent>
                </Card>

                {/* 快速交付 */}
                <Card className="group hover:shadow-elegant transition-all duration-300 border-0 bg-background animate-fade-in relative overflow-hidden" style={{ animationDelay: '100ms' }}>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-sweep"></div>
                  <CardContent className="p-8 text-center relative z-10">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">48小时快速交付</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      拍摄完成后48小时内即可收到精修后的高清照片。
                      我们的后期团队采用专业级调色和修图技术，确保每张照片都达到最佳效果。
                    </p>
                  </CardContent>
                </Card>

                {/* 本地化服务 */}
                <Card className="group hover:shadow-elegant transition-all duration-300 border-0 bg-background animate-fade-in relative overflow-hidden" style={{ animationDelay: '200ms' }}>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-sweep"></div>
                  <CardContent className="p-8 text-center relative z-10">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">本地专业团队</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      我们的摄影师都是当地专业人士，熟悉最佳拍摄地点和光线条件。
                      无需额外的差旅费用，为您提供更具性价比的服务体验。
                    </p>
                  </CardContent>
                </Card>

                {/* 满意保证 */}
                <Card className="group hover:shadow-elegant transition-all duration-300 border-0 bg-background animate-fade-in relative overflow-hidden" style={{ animationDelay: '300ms' }}>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-sweep"></div>
                  <CardContent className="p-8 text-center relative z-10">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">满意度保证</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      如果您对拍摄结果不满意，我们提供重拍或退款服务。
                      客户满意是我们的首要目标，我们会全力确保您获得满意的拍摄体验。
                    </p>
                  </CardContent>
                </Card>

                {/* 灵活服务 */}
                <Card className="group hover:shadow-elegant transition-all duration-300 border-0 bg-background animate-fade-in relative overflow-hidden" style={{ animationDelay: '400ms' }}>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-sweep"></div>
                  <CardContent className="p-8 text-center relative z-10">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">灵活预约服务</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      支持在线预约，时间灵活安排。提供免费改期和取消服务，
                      让您无后顾之忧。支持多种拍摄套餐，满足不同需求和预算。
                    </p>
                  </CardContent>
                </Card>

                {/* 全程支持 */}
                <Card className="group hover:shadow-elegant transition-all duration-300 border-0 bg-background animate-fade-in relative overflow-hidden" style={{ animationDelay: '500ms' }}>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-sweep"></div>
                  <CardContent className="p-8 text-center relative z-10">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">专业客服支持</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      从预约到拍摄完成，全程提供专业客服支持。
                      7×24小时在线客服，随时解答您的疑问，确保服务体验无忧。
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* CTA Section */}
              <div className="text-center mt-12">
                <div className="bg-gradient-primary rounded-lg p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">准备好开始您的拍摄之旅了吗？</h3>
                  <p className="text-lg mb-6 opacity-90">
                    立即预约，让专业摄影师为您记录珍贵时刻
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      variant="secondary"
                      className="bg-white text-primary hover:bg-white/90"
                      onClick={handleBooking}
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      立即预约拍摄
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-white text-white hover:bg-white/10"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      咨询拍摄详情
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8">客户评价</h2>
            
            <div className="space-y-8 max-w-5xl mx-auto">
              {/* Sample reviews with real data */}
              {[
                {
                  id: 1,
                  name: "张小雨",
                  avatar: testimonialSarah,
                  rating: 5,
                  comment: "拍摄效果非常好，摄影师很专业，能够很好地捕捉自然的表情和动作。整个拍摄过程很愉快！\n\n从前期沟通到现场拍摄，张老师都非常耐心和细心。特别是在选景和构图方面给了很多专业建议。\n\n最终的成片效果超出了我的预期，每一张都很有感觉，真的很感谢！",
                  date: "2024年8月20日投稿",
                  service: ["情侣写真", "户外拍摄", "自然光"],
                  photos: [portfolioPortrait, heroImage, portfolioStreet]
                },
                {
                  id: 2,
                  name: "李雅婷",
                  avatar: testimonialLisa,
                  rating: 5,
                  comment: "超级满意！张老师的拍摄技术一流，后期制作也很用心。照片质量远超预期，强烈推荐！\n\n这次是拍个人写真，张老师很会引导动作和表情，让我这个不太会拍照的人也能拍出很自然的效果。\n\n色调处理得特别好，很有质感。朋友们看了都说要找张老师拍照！",
                  date: "2024年8月15日投稿",
                  service: ["个人写真", "室内拍摄", "商务形象"],
                  photos: [portfolioArchitecture, portfolioPortrait]
                },
                {
                  id: 3,
                  name: "王明华",
                  avatar: testimonialMichael,
                  rating: 4,
                  comment: "第一次拍全家福，摄影师很有耐心，尤其是和小朋友的互动很棒。成片效果温馨自然。\n\n孩子一开始有点害羞，但张老师很会哄小朋友，慢慢就配合了。拍摄过程中还给了很多摆pose的建议。\n\n虽然天气有点热，但最终的照片都很满意，记录了一家人美好的时光。",
                  date: "2024年8月10日投稿",
                  service: ["全家福", "家庭摄影", "儿童摄影"],
                  photos: [heroImage, portfolioStreet, portfolioArchitecture]
                },
                {
                  id: 4,
                  name: "陈思思",
                  avatar: testimonialSarah,
                  rating: 5,
                  comment: "婚纱照拍得太美了，每一张都是艺术品。摄影师的创意和构图都很棒，值得信赖！\n\n选了几个不同的场景，每个场景都有不同的感觉。张老师很会抓拍，连我们没注意的瞬间都拍得很美。\n\n后期调色也很有感觉，整体风格很统一。这次拍摄体验真的很棒！",
                  date: "2024年8月5日投稿",
                  service: ["婚纱摄影", "外景拍摄", "情侣写真"],
                  photos: [portfolioPortrait, heroImage]
                }
              ].map((review) => (
                <div key={review.id} className="bg-background border border-border/20 rounded-lg p-6 shadow-sm">
                  <div className="flex space-x-4">
                    {/* 左侧头像 */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={review.avatar} alt={review.name} />
                          <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                            {review.name[0]}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                    
                    {/* 右侧内容 */}
                    <div className="flex-1">
                      {/* 用户名 */}
                      <div className="font-medium text-foreground mb-2">{review.name}</div>
                      
                      {/* 星级评分 */}
                      <div className="flex items-center space-x-1 mb-3">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        {[...Array(5 - review.rating)].map((_, i) => (
                          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
                        ))}
                      </div>
                      
                      {/* 投稿日期 */}
                      <div className="text-sm text-muted-foreground mb-4">{review.date}</div>
                      
                      {/* 服务类型标签 */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {review.service.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-blue-50 text-blue-700 text-xs px-2 py-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      {/* 评论内容 */}
                      <div className="text-muted-foreground leading-relaxed mb-4">
                        {review.comment.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="mb-3 last:mb-0">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      
                      {/* 相关照片 */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {review.photos.map((photo, index) => (
                          <div key={index} className="aspect-square overflow-hidden rounded-md">
                            <img 
                              src={photo} 
                              alt={`评价照片 ${index + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                            />
                          </div>
                        ))}
                      </div>
                      
                      {/* 查看更多链接 */}
                      <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">
                        查看更多
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* 查看所有评价按钮 */}
              <div className="text-center pt-8">
                <Button variant="outline" size="lg">
                  查看所有评价 (351件)
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 照片放大模态框 */}
      <PhotoModal
        photos={filteredPortfolio}
        currentIndex={selectedPhotoIndex}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default PhotographerDetail;