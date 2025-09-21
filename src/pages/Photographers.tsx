import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Star, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Photographer } from '@/types/photographer';

// Import images
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
    gender: 'female',
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

const Photographers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const genders = [
    { value: 'female', label: '女摄影师' },
    { value: 'male', label: '男摄影师' }
  ];
  const categories = ['人像', '街拍', '建筑', '风光', '家庭', '儿童', '婚纱'];

  // Separate exact matches and recommendations
  const hasActiveFilters = searchTerm || selectedGender !== 'all' || selectedCategory !== 'all';
  
  const exactMatches = mockPhotographers.filter(photographer => {
    const matchesSearch = photographer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photographer.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photographer.specialties.some(specialty => 
                           specialty.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    
    const matchesGender = !selectedGender || selectedGender === 'all' || photographer.gender === selectedGender;
    
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || 
                           photographer.portfolio.some(photo => 
                             photo.category.includes(selectedCategory)
                           ) ||
                           photographer.specialties.some(specialty => 
                             specialty.includes(selectedCategory)
                           );

    return matchesSearch && matchesGender && matchesCategory;
  });

  // Get recommendations when there are few exact matches
  const recommendations = exactMatches.length < 3 && hasActiveFilters ? 
    mockPhotographers.filter(photographer => {
      // Don't include photographers already in exact matches
      if (exactMatches.find(p => p.id === photographer.id)) return false;
      
      // Recommend based on category similarity
      if (selectedCategory !== 'all') {
        return photographer.specialties.some(specialty => 
          specialty.includes(selectedCategory)
        ) || photographer.portfolio.some(photo => 
          photo.category.includes(selectedCategory)
        );
      }
      
      // Recommend based on gender if only gender filter is active
      if (selectedGender !== 'all' && !searchTerm) {
        return photographer.gender === selectedGender;
      }
      
      return false;
    }).slice(0, 6) : [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Header */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">发现优秀摄影师</h1>
              <p className="text-muted-foreground text-lg">找到最适合你的拍摄风格</p>
            </div>

            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="搜索摄影师或拍摄风格..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedGender} onValueChange={setSelectedGender}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="选择性别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部摄影师</SelectItem>
                    {genders.map(gender => (
                      <SelectItem key={gender.value} value={gender.value}>{gender.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="拍摄类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部类型</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span>找到 {exactMatches.length} 位摄影师</span>
                {recommendations.length > 0 && (
                  <span>，推荐 {recommendations.length} 位相似摄影师</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Photographers Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Exact Matches */}
            {exactMatches.length > 0 && (
              <div className="mb-12">
                {hasActiveFilters && (
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-foreground mb-2">精确匹配的摄影师</h2>
                    <p className="text-muted-foreground">根据您的搜索条件找到的摄影师</p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {exactMatches.map((photographer) => (
                    <Card key={photographer.id} className="group hover:shadow-elegant transition-all duration-300">
                      <CardContent className="p-6">
                        {/* Photographer Info */}
                        <div className="flex items-center space-x-4 mb-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={photographer.avatar} alt={photographer.name} />
                            <AvatarFallback>{photographer.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-foreground">{photographer.name}</h3>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                              <MapPin className="w-3 h-3" />
                              <span>{photographer.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-primary text-primary" />
                              <span className="font-semibold text-foreground">{photographer.rating}</span>
                              <span className="text-xs text-muted-foreground">({photographer.reviewCount}评价)</span>
                            </div>
                          </div>
                        </div>

                        {/* Bio */}
                        <p className="text-muted-foreground text-sm mb-4">{photographer.bio}</p>

                        {/* Specialties */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {photographer.specialties.map((specialty) => (
                            <Badge key={specialty} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>

                        {/* Portfolio Preview */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {photographer.portfolio.slice(0, 2).map((photo) => (
                            <div key={photo.id} className="aspect-square rounded-lg overflow-hidden">
                              <img 
                                src={photo.url} 
                                alt={photo.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          ))}
                        </div>

                        {/* Price and Action */}
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-primary">{photographer.priceRange}</p>
                          <Button 
                            size="sm"
                            onClick={() => navigate(`/photographer/${photographer.id}`)}
                            className="bg-gradient-primary hover:opacity-90"
                          >
                            查看详情
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="mb-12">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-foreground mb-2">推荐相似摄影师</h2>
                  <p className="text-muted-foreground">您可能也会喜欢这些摄影师</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.map((photographer) => (
                    <Card key={`rec-${photographer.id}`} className="group hover:shadow-elegant transition-all duration-300 border-dashed">
                      <CardContent className="p-6">
                        {/* Photographer Info */}
                        <div className="flex items-center space-x-4 mb-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={photographer.avatar} alt={photographer.name} />
                            <AvatarFallback>{photographer.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-foreground">{photographer.name}</h3>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                              <MapPin className="w-3 h-3" />
                              <span>{photographer.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-primary text-primary" />
                              <span className="font-semibold text-foreground">{photographer.rating}</span>
                              <span className="text-xs text-muted-foreground">({photographer.reviewCount}评价)</span>
                            </div>
                          </div>
                        </div>

                        {/* Bio */}
                        <p className="text-muted-foreground text-sm mb-4">{photographer.bio}</p>

                        {/* Specialties */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {photographer.specialties.map((specialty) => (
                            <Badge key={specialty} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>

                        {/* Portfolio Preview */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {photographer.portfolio.slice(0, 2).map((photo) => (
                            <div key={photo.id} className="aspect-square rounded-lg overflow-hidden">
                              <img 
                                src={photo.url} 
                                alt={photo.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          ))}
                        </div>

                        {/* Price and Action */}
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-primary">{photographer.priceRange}</p>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => navigate(`/photographer/${photographer.id}`)}
                          >
                            查看详情
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {exactMatches.length === 0 && recommendations.length === 0 && hasActiveFilters && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-foreground mb-2">未找到匹配的摄影师</h3>
                <p className="text-muted-foreground mb-4">尝试调整搜索条件或浏览所有摄影师</p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setSelectedGender('all');
                  setSelectedCategory('all');
                }}>
                  清除筛选条件
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Photographers;