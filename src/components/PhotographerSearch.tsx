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
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
            <h3 className="text-base font-semibold text-foreground px-6 bg-background font-serif">选择你喜欢的摄影风格</h3>
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant="ghost"
                size="lg"
                onClick={() => onCategoryChange?.(category.value)}
                className={`
                  relative px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-300 ease-smooth min-w-[120px]
                  ${activeCategory === category.value 
                    ? "bg-gradient-primary text-primary-foreground shadow-button-hover scale-105 border-0" 
                    : "bg-gradient-soft text-foreground hover:bg-secondary hover:text-foreground hover:scale-102 hover:shadow-button border border-border/50"
                  }
                `}
              >
                <span className="relative z-10">{category.label}</span>
                {activeCategory === category.value && (
                  <div className="absolute inset-0 rounded-2xl bg-primary/10 animate-pulse"></div>
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