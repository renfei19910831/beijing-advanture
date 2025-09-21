import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star, MapPin, ArrowLeft, Heart, Users } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuthContext } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabase';
import { Photographer } from '@/types/photographer';

// Import images
import testimonialSarah from '@/assets/testimonial-sarah.jpg';
import testimonialMichael from '@/assets/testimonial-michael.jpg';
import testimonialLisa from '@/assets/testimonial-lisa.jpg';

// Mock photographer data (in a real app, this would come from Supabase)
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
    gender: 'female',
    portfolio: [],
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
    portfolio: [],
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
    portfolio: [],
    featured: false
  }
];

interface FollowedPhotographer {
  id: string;
  photographer_id: string;
  followed_at: string;
}

const MyFollows = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [followedPhotographers, setFollowedPhotographers] = useState<FollowedPhotographer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFollowedPhotographers();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchFollowedPhotographers = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('photographer_follows')
        .select('*')
        .eq('user_id', user.id)
        .order('followed_at', { ascending: false });

      if (error) {
        console.error('Error fetching follows:', error);
        return;
      }

      setFollowedPhotographers(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-md mx-auto">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-foreground mb-4">登录查看关注</h1>
              <p className="text-muted-foreground mb-8">
                登录后可以查看您关注的所有摄影师
              </p>
              <Button onClick={() => navigate('/login')} className="bg-gradient-primary hover:opacity-90">
                立即登录
              </Button>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  // 获取关注的摄影师详情（在真实应用中，这些数据应该从数据库联合查询获得）
  const followedPhotographerDetails = followedPhotographers
    .map(follow => mockPhotographers.find(p => p.id === follow.photographer_id))
    .filter(Boolean) as Photographer[];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">加载中...</p>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Header */}
        <div className="container mx-auto px-4 py-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回</span>
          </Button>
          
          <div className="flex items-center space-x-3 mb-8">
            <Heart className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">我的关注</h1>
              <p className="text-muted-foreground">
                共关注了 {followedPhotographerDetails.length} 位摄影师
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 pb-12">
          {followedPhotographerDetails.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {followedPhotographerDetails.map((photographer) => (
                <Card 
                  key={photographer.id} 
                  className="group overflow-hidden hover:shadow-elegant transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/photographer/${photographer.id}`)}
                >
                  <CardContent className="p-6">
                    {/* Avatar and basic info */}
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={photographer.avatar} alt={photographer.name} />
                        <AvatarFallback className="text-lg">{photographer.name[0]}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground mb-1">
                          {photographer.name}
                        </h3>
                        
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-primary text-primary" />
                            <span className="font-semibold">{photographer.rating}</span>
                            <span className="text-sm text-muted-foreground">
                              ({photographer.reviewCount})
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span className="text-sm">{photographer.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {photographer.specialties.slice(0, 3).map((specialty) => (
                        <Badge 
                          key={specialty} 
                          variant="secondary" 
                          className="bg-primary/10 text-primary text-xs"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {photographer.bio}
                    </p>

                    {/* Price and action */}
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-primary">
                        {photographer.priceRange}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/photographer/${photographer.id}`);
                        }}
                      >
                        查看详情
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-xl font-semibold text-foreground mb-4">暂无关注的摄影师</h2>
              <p className="text-muted-foreground mb-8">
                浏览摄影师页面并点击关注按钮，来关注您喜欢的摄影师
              </p>
              <Button 
                onClick={() => navigate('/photographers')} 
                className="bg-gradient-primary hover:opacity-90"
              >
                浏览摄影师
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyFollows;