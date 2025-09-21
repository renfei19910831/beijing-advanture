import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Camera, X, Filter } from 'lucide-react';

interface PhotographerSearchProps {
  onSearch: (filters: {
    searchTerm: string;
    gender: string;
    category: string;
  }) => void;
  categories?: Array<{ value: string; label: string }>;
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const PhotographerSearch = ({ 
  onSearch, 
  categories = [], 
  activeCategory = 'all',
  onCategoryChange 
}: PhotographerSearchProps) => {
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const genders = [
    { value: 'female', label: '女摄影师' },
    { value: 'male', label: '男摄影师' }
  ];

  const handleFiltersChange = (gender: string, category: string) => {
    onSearch({
      searchTerm: '',
      gender: gender === 'all' ? '' : gender,
      category: category === 'all' ? '' : category
    });
  };

  const handleGenderChange = (value: string) => {
    setSelectedGender(value);
    handleFiltersChange(value, selectedCategory);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    handleFiltersChange(selectedGender, value);
  };

  const clearFilters = () => {
    setSelectedGender('all');
    setSelectedCategory('all');
    onCategoryChange?.('all');
    handleFiltersChange('all', 'all');
  };

  const hasFilters = (selectedGender && selectedGender !== 'all') || 
                    (selectedCategory && selectedCategory !== 'all') ||
                    (activeCategory && activeCategory !== 'all');

  return (
    <div className="space-y-8 mb-12">
      {/* 主分类 - 大标签设计 */}
      {categories.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
            <h3 className="text-sm font-medium text-muted-foreground px-4 bg-background">选择你喜欢的摄影风格</h3>
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={activeCategory === category.value ? "default" : "ghost"}
                size="lg"
                onClick={() => onCategoryChange?.(category.value)}
                className={`
                  relative px-6 py-3 rounded-full transition-all duration-300 font-medium
                  ${activeCategory === category.value 
                    ? "bg-gradient-primary text-white shadow-xl shadow-primary/25 scale-105" 
                    : "hover:bg-muted hover:text-foreground hover:scale-105 text-muted-foreground border border-muted"
                  }
                `}
              >
                {category.label}
                {activeCategory === category.value && (
                  <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 animate-pulse"></div>
                )}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* 次级筛选 - 紧凑设计 */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <Select value={selectedGender} onValueChange={handleGenderChange}>
              <SelectTrigger className="w-32 h-9 border-muted">
                <SelectValue placeholder="性别" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                {genders.map(gender => (
                  <SelectItem key={gender.value} value={gender.value}>{gender.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Camera className="w-4 h-4 text-muted-foreground" />
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-32 h-9 border-muted">
                <SelectValue placeholder="类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                <SelectItem value="人像">人像</SelectItem>
                <SelectItem value="街拍">街拍</SelectItem>
                <SelectItem value="建筑">建筑</SelectItem>
                <SelectItem value="风光">风光</SelectItem>
                <SelectItem value="家庭">家庭</SelectItem>
                <SelectItem value="儿童">儿童</SelectItem>
                <SelectItem value="婚纱">婚纱</SelectItem>
                <SelectItem value="时尚">时尚</SelectItem>
                <SelectItem value="商业">商业</SelectItem>
                <SelectItem value="艺术">艺术</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {hasFilters && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground border-muted"
          >
            <X className="w-3 h-3 mr-1" />
            清除筛选
          </Button>
        )}
      </div>

      {/* 活跃筛选标签 */}
      {hasFilters && (
        <div className="flex flex-wrap justify-center gap-2">
          {selectedGender && selectedGender !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
              <Users className="w-3 h-3" />
              {genders.find(g => g.value === selectedGender)?.label}
              <X 
                className="w-3 h-3 cursor-pointer hover:text-destructive ml-1" 
                onClick={() => handleGenderChange('all')} 
              />
            </Badge>
          )}
          {selectedCategory && selectedCategory !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
              <Camera className="w-3 h-3" />
              {selectedCategory}
              <X 
                className="w-3 h-3 cursor-pointer hover:text-destructive ml-1" 
                onClick={() => handleCategoryChange('all')} 
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default PhotographerSearch;