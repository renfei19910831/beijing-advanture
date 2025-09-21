import { Button } from '@/components/ui/button';

interface PhotographerSearchProps {
  onSearch: (filters: {
    searchTerm: string;
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
    </div>
  );
};

export default PhotographerSearch;