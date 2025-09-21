import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star, MapPin, ArrowLeft, Calendar, MessageCircle, Camera } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { PhotoModal } from '@/components/PhotoModal';
import { FollowButton } from '@/components/FollowButton';
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

                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="text-2xl font-bold text-primary">{photographer.priceRange}</div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <FollowButton 
                      photographerId={photographer.id} 
                      photographerName={photographer.name}
                      className="min-w-[100px]"
                    />
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