import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.photographers': 'Discover Photographers',
    'nav.blog': 'Travel & Tips',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.favorites': 'My Favorites',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    
    // Hero Section
    'hero.title': 'Find Your Perfect Photographer',
    'hero.subtitle': 'Capture life\'s beautiful moments with professional photographers',
    'hero.cta': 'Discover More Photographers',
    
    // Featured Photographers
    'photographers.title': 'Discover Outstanding Photographers',
    'photographers.subtitle': 'Find professional photographers to capture your precious moments',
    'photographers.search': 'Search by name, location, specialty...',
    'photographers.all': 'All Categories',
    'photographers.viewAll': 'View All Photographers',
    'photographers.noResults': 'No photographers found',
    'photographers.clearFilters': 'Clear filters',
    
    // Process Steps
    'process.step1.title': 'Search & Discover',
    'process.step1.desc': 'Browse photographer portfolios',
    'process.step2.title': 'View Portfolio',
    'process.step2.desc': 'Explore their stunning works',
    'process.step3.title': 'Check Reviews',
    'process.step3.desc': 'Read client testimonials',
    'process.step4.title': 'Contact',
    'process.step4.desc': 'Discuss your vision',
    'process.step5.title': 'Book Session',
    'process.step5.desc': 'Schedule your shoot',
    'process.step6.title': 'Photo Shoot',
    'process.step6.desc': 'Professional photo session',
    'process.step7.title': 'Receive Photos',
    'process.step7.desc': 'Get your edited photos',
    
    // Featured Work
    'featured.title': 'Featured Photography',
    'featured.subtitle': 'Exceptional works from talented photographers',
    'featured.view': 'View Complete Gallery',
    'featured.portrait': 'Urban Portraits',
    'featured.portrait.desc': 'Intimate character studies capturing urban life essence',
    'featured.architecture': 'Architectural Lines',
    'featured.architecture.desc': 'Modern structures showcasing geometric beauty',
    'featured.street': 'City Stories',
    'featured.street.desc': 'Candid moments revealing everyday poetry',
    
    // Blog Preview
    'blog.title': 'Travel & Photography Guide',
    'blog.subtitle': 'Best photo spots, tips, and travel guides for memorable shoots',
    'blog.viewAll': 'View All Guides',
    
    // Testimonials
    'testimonials.title': 'What Our Clients Say',
    'testimonials.subtitle': 'Trusted by amazing people',
    'testimonials.description': 'Don\'t just take our word for it - hear from our satisfied clients',
    
    // Actions
    'action.share': 'Share',
    'action.view': 'View Details',
    'action.like': 'Like',
    'action.copied': 'Link copied to clipboard!',
    'action.shareError': 'Unable to share',
    
    // Footer
    'footer.tagline': 'Transforming fleeting moments into timeless visual stories through passionate photography.',
    'footer.explore': 'Explore',
    'footer.portfolio': 'Portfolio',
    'footer.blog': 'Blog',
    'footer.about': 'About',
    'footer.joinUs': 'Join Us',
    'footer.followUs': 'Follow Us',
    'footer.copyright': '© 2024 Atelier Capture. All rights reserved.',
    'footer.crafted': 'Crafted with',
    'footer.forVisualStorytelling': 'for visual storytelling'
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.photographers': '发现摄影师',
    'nav.blog': '旅行攻略',
    'nav.about': '关于我们',
    'nav.contact': '联系我们',
    'nav.favorites': '我的收藏',
    'nav.login': '登录',
    'nav.logout': '登出',
    
    // Hero Section
    'hero.title': '找到属于你的专业摄影师',
    'hero.subtitle': '用专业镜头，记录生活的美好瞬间',
    'hero.cta': '发现更多优秀摄影师',
    
    // Featured Photographers
    'photographers.title': '发现优秀摄影师',
    'photographers.subtitle': '精选专业摄影师，为你记录珍贵时刻',
    'photographers.search': '搜索摄影师、地点、专长...',
    'photographers.all': '全部分类',
    'photographers.viewAll': '查看所有摄影师',
    'photographers.noResults': '未找到相关摄影师',
    'photographers.clearFilters': '清除筛选',
    
    // Process Steps
    'process.step1.title': '搜索发现',
    'process.step1.desc': '浏览摄影师作品集',
    'process.step2.title': '查看作品',
    'process.step2.desc': '欣赏精美摄影作品',
    'process.step3.title': '查看评价',
    'process.step3.desc': '了解客户真实反馈',
    'process.step4.title': '沟通需求',
    'process.step4.desc': '与摄影师交流想法',
    'process.step5.title': '预约拍摄',
    'process.step5.desc': '确定拍摄时间地点',
    'process.step6.title': '专业拍摄',
    'process.step6.desc': '享受专业摄影服务',
    'process.step7.title': '获取照片',
    'process.step7.desc': '收到精修后的作品',
    
    // Featured Work
    'featured.title': '精选摄影作品',
    'featured.subtitle': '来自优秀摄影师的精彩作品展示',
    'featured.view': '查看完整作品集',
    'featured.portrait': '都市人像',
    'featured.portrait.desc': '捕捉都市生活中的真实情感与故事',
    'featured.architecture': '建筑线条',
    'featured.architecture.desc': '展现现代建筑的几何美学',
    'featured.street': '城市故事',
    'featured.street.desc': '记录日常生活中的诗意瞬间',
    
    // Blog Preview
    'blog.title': '旅行攻略 & 拍摄指南',
    'blog.subtitle': '最佳拍摄地点推荐、摄影技巧分享和旅行拍摄攻略，让你的每次拍摄都收获满满',
    'blog.viewAll': '查看所有攻略',
    
    // Testimonials
    'testimonials.title': '客户真实评价',
    'testimonials.subtitle': '值得信赖的专业服务',
    'testimonials.description': '听听我们客户的真实反馈，见证每一次完美的拍摄体验',
    
    // Actions
    'action.share': '分享',
    'action.view': '查看详情',
    'action.like': '喜欢',
    'action.copied': '链接已复制！',
    'action.shareError': '无法分享',
    
    // Footer
    'footer.tagline': '用镜头定格美好瞬间，用专业记录珍贵回忆',
    'footer.explore': '探索',
    'footer.portfolio': '作品集',
    'footer.blog': '旅行攻略',
    'footer.about': '关于我们',
    'footer.joinUs': '加入我们',
    'footer.followUs': '关注我们',
    'footer.copyright': '© 2024 找拍. 版权所有',
    'footer.crafted': '用',
    'footer.forVisualStorytelling': '打造视觉故事'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('preferred-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};