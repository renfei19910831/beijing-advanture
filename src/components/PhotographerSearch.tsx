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
}

const PhotographerSearch = ({ onSearch }: PhotographerSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const genders = [
    { value: 'female', label: '女摄影师' },
    { value: 'male', label: '男摄影师' }
  ];
  const categories = ['人像', '街拍', '建筑', '风光', '家庭', '儿童', '婚纱', '时尚', '商业', '艺术'];

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
    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 mb-8">
      <div className="flex flex-col space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="搜索摄影师姓名、拍摄风格..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-12 h-12 text-base"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={selectedGender} onValueChange={setSelectedGender}>
            <SelectTrigger className="sm:w-48">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="选择性别" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部摄影师</SelectItem>
              {genders.map(gender => (
                <SelectItem key={gender.value} value={gender.value}>{gender.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="sm:w-48">
              <div className="flex items-center">
                <Camera className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="拍摄类型" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部类型</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex space-x-2 sm:ml-auto">
            <Button onClick={handleSearch} className="bg-gradient-primary hover:opacity-90">
              <Search className="w-4 h-4 mr-2" />
              搜索
            </Button>
            {hasFilters && (
              <Button variant="outline" onClick={clearFilters}>
                <X className="w-4 h-4 mr-2" />
                清除
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters */}
        {hasFilters && (
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-1">
                搜索: {searchTerm}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchTerm('')} />
              </Badge>
            )}
            {selectedGender && selectedGender !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                性别: {genders.find(g => g.value === selectedGender)?.label}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedGender('all')} />
              </Badge>
            )}
            {selectedCategory && selectedCategory !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                类型: {selectedCategory}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotographerSearch;