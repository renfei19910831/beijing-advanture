import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Star, Trash2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Photographer } from '@/types/photographer';

// Mock data for demonstration - in real app, this would come from local storage or database
const mockFavoritePhotographers: Photographer[] = [
  {
    id: '1',
    name: '张雅婷',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 127,
    specialties: ['婚纱摄影', '情侣写真', '旅拍'],
    location: '北京',
    priceRange: '¥800-1500/小时',
    bio: '专业婚纱摄影师，8年从业经验，擅长捕捉最自然的情感瞬间。',
    portfolio: [],
    featured: true,
    gender: 'female',
  },
  {
    id: '2',
    name: '李明轩',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    reviewCount: 89,
    specialties: ['人像摄影', '商业摄影', '艺术写真'],
    location: '上海',
    priceRange: '¥600-1200/小时',
    bio: '创意人像摄影师，注重光影与构图的完美结合。',
    portfolio: [],
    featured: true,
    gender: 'male',
  },
];

const Favorites = () => {
  const [favorites, setFavorites] = useState<Photographer[]>([]);

  useEffect(() => {
    // In real app, load from localStorage or database
    setFavorites(mockFavoritePhotographers);
  }, []);

  const removeFavorite = (photographerId: string) => {
    setFavorites(prev => prev.filter(p => p.id !== photographerId));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Header Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-full mb-6">
                <Heart size={32} className="text-pink-500" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                我的收藏
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                管理您收藏的摄影师，随时查看他们的作品和联系方式
              </p>
            </div>

            {/* Statistics */}
            <div className="flex justify-center mb-12">
              <div className="bg-card border border-border rounded-xl px-6 py-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{favorites.length}</div>
                  <div className="text-sm text-muted-foreground">位收藏的摄影师</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Favorites Grid */}
        <section className="pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            {favorites.length === 0 ? (
              <div className="text-center py-20">
                <Heart size={64} className="text-gray-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  还没有收藏的摄影师
                </h3>
                <p className="text-muted-foreground mb-6">
                  浏览摄影师作品，收藏您喜欢的摄影师
                </p>
                <Button asChild>
                  <Link to="/photographers">
                    浏览摄影师
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {favorites.map((photographer) => (
                  <Card key={photographer.id} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-border">
                    <CardContent className="p-6">
                      {/* Remove Button */}
                      <div className="flex justify-end mb-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFavorite(photographer.id)}
                          className="text-gray-400 hover:text-red-500 p-2"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>

                      {/* Photographer Info */}
                      <div className="text-center mb-6">
                        <div className="relative inline-block mb-4">
                          <img
                            src={photographer.avatar}
                            alt={photographer.name}
                            className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-background shadow-lg"
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-1">
                          {photographer.name}
                        </h3>
                        <div className="flex items-center justify-center text-muted-foreground text-sm mb-2">
                          <MapPin size={14} className="mr-1" />
                          {photographer.location}
                        </div>
                        <div className="flex items-center justify-center mb-3">
                          <div className="flex items-center mr-2">
                            {renderStars(photographer.rating)}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {photographer.rating} ({photographer.reviewCount}评价)
                          </span>
                        </div>
                      </div>

                      {/* Specialties */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2 justify-center">
                          {photographer.specialties.slice(0, 3).map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Price Range */}
                      <div className="text-center mb-4">
                        <div className="text-lg font-semibold text-primary">
                          {photographer.priceRange}
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-muted-foreground text-center line-clamp-2">
                        {photographer.bio}
                      </p>
                    </CardContent>

                    <CardFooter className="px-6 pb-6 pt-0">
                      <div className="flex space-x-3 w-full">
                        <Button variant="outline" size="sm" className="flex-1">
                          立即联系
                        </Button>
                        <Button asChild size="sm" className="flex-1">
                          <Link to={`/photographer/${photographer.id}`}>
                            查看详情
                          </Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;