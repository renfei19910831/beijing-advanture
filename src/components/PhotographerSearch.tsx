import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Camera, X } from 'lucide-react';

interface PhotographerSearchProps {
  onSearch: (filters: {
    searchTerm: string;
    location: string;
    category: string;
  }) => void;
}

const PhotographerSearch = ({ onSearch }: PhotographerSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const locations = ['北京', '上海', '广州', '深圳', '杭州', '成都', '南京'];
  const categories = ['人像', '街拍', '建筑', '风光', '家庭', '儿童', '婚纱', '时尚', '商业', '艺术'];

  const handleSearch = () => {
    onSearch({
      searchTerm,
      location: selectedLocation,
      category: selectedCategory
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLocation('');
    setSelectedCategory('');
    onSearch({
      searchTerm: '',
      location: '',
      category: ''
    });
  };

  const hasFilters = searchTerm || selectedLocation || selectedCategory;

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
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="sm:w-48">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="选择城市" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">全部城市</SelectItem>
              {locations.map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
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
              <SelectItem value="">全部类型</SelectItem>
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
            {selectedLocation && (
              <Badge variant="secondary" className="flex items-center gap-1">
                城市: {selectedLocation}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedLocation('')} />
              </Badge>
            )}
            {selectedCategory && (
              <Badge variant="secondary" className="flex items-center gap-1">
                类型: {selectedCategory}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('')} />
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotographerSearch;