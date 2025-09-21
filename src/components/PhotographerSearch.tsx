import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Camera, X } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const genders = [
    { value: 'female', label: '女摄影师' },
    { value: 'male', label: '男摄影师' }
  ];
  const internalCategories = ['人像', '街拍', '建筑', '风光', '家庭', '儿童', '婚纱', '时尚', '商业', '艺术'];

  const handleSearch = () => {
    onSearch({
      searchTerm,
      gender: selectedGender === 'all' ? '' : selectedGender,
      category: selectedCategory === 'all' ? '' : selectedCategory
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGender('all');
    setSelectedCategory('all');
    onSearch({
      searchTerm: '',
      gender: '',
      category: ''
    });
  };

  const hasFilters = searchTerm || (selectedGender && selectedGender !== 'all') || (selectedCategory && selectedCategory !== 'all');

  return (
    <div className="space-y-6 mb-8">
      {/* Category Tags - Main Filter */}
      {categories.length > 0 && (
        <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={activeCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange?.(category.value)}
                className={`transition-all duration-300 ${
                  activeCategory === category.value 
                    ? "bg-gradient-primary hover:opacity-90 shadow-md scale-105" 
                    : "hover:border-primary hover:text-primary hover:scale-105"
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters - Compact Row */}
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="搜索摄影师姓名、拍摄风格..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 h-10 text-sm"
            />
          </div>

          {/* Filters and Actions */}
          <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
            <Select value={selectedGender} onValueChange={setSelectedGender}>
              <SelectTrigger className="w-full sm:w-36">
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1 text-muted-foreground" />
                  <SelectValue placeholder="性别" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                {genders.map(gender => (
                  <SelectItem key={gender.value} value={gender.value}>{gender.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-36">
                <div className="flex items-center">
                  <Camera className="w-3 h-3 mr-1 text-muted-foreground" />
                  <SelectValue placeholder="类型" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                {internalCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex space-x-2">
              <Button onClick={handleSearch} size="sm" className="bg-gradient-primary hover:opacity-90">
                <Search className="w-3 h-3 mr-1" />
                搜索
              </Button>
              {hasFilters && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  <X className="w-3 h-3 mr-1" />
                  清除
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {hasFilters && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border">
            {searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                搜索: {searchTerm}
                <X className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() => setSearchTerm('')} />
              </Badge>
            )}
            {selectedGender && selectedGender !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                {genders.find(g => g.value === selectedGender)?.label}
                <X className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() => setSelectedGender('all')} />
              </Badge>
            )}
            {selectedCategory && selectedCategory !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                {selectedCategory}
                <X className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() => setSelectedCategory('all')} />
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotographerSearch;