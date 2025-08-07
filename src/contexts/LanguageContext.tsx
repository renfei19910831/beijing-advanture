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
    'nav.gallery': 'Gallery',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Capturing Moments, Creating Memories',
    'hero.subtitle': 'Professional photography services with an artistic touch. Let me tell your story through the lens.',
    'hero.explore': 'Explore My Work',
    'hero.story': 'Learn My Story',
    'hero.scroll': 'Scroll to explore',
    
    // Featured Work
    'featured.title': 'Featured Work',
    'featured.subtitle': 'A selection of my finest photography',
    'featured.view': 'View Full Gallery',
    
    // Blog Preview
    'blog.title': 'Latest Stories',
    'blog.subtitle': 'Behind the lens insights and photography tips',
    'blog.read': 'Read Article',
    'blog.viewAll': 'View All Articles',
    
    // Gallery
    'gallery.title': 'Gallery',
    'gallery.subtitle': 'Explore my collection of photography',
    'gallery.all': 'All',
    'gallery.portrait': 'Portrait',
    'gallery.landscape': 'Landscape',
    'gallery.street': 'Street',
    'gallery.architecture': 'Architecture',
    'gallery.loadMore': 'Load More Images',
    
    // Actions
    'action.share': 'Share',
    'action.view': 'View Details',
    'action.copied': 'Link copied to clipboard!',
    'action.shareError': 'Unable to share',
    
    // Blog
    'blog.categories.all': 'All Posts',
    'blog.categories.tips': 'Photography Tips',
    'blog.categories.stories': 'Stories',
    'blog.categories.gear': 'Gear Reviews',
    'blog.pagination.previous': 'Previous',
    'blog.pagination.next': 'Next',
    
    // Footer
    'footer.tagline': 'Capturing life\'s precious moments with artistic vision and professional expertise.',
    'footer.explore': 'Explore',
    'footer.services': 'Services',
    'footer.copyright': '© 2024 Atelier Capture. All rights reserved.',
    'footer.crafted': 'Crafted with love and passion'
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.gallery': '作品集',
    'nav.blog': '博客',
    'nav.about': '关于我',
    'nav.contact': '联系我',
    
    // Hero Section
    'hero.title': '捕捉瞬间，创造回忆',
    'hero.subtitle': '以艺术视角提供专业摄影服务，让我用镜头讲述您的故事。',
    'hero.explore': '探索我的作品',
    'hero.story': '了解我的故事',
    'hero.scroll': '滚动探索',
    
    // Featured Work
    'featured.title': '精选作品',
    'featured.subtitle': '我最优秀的摄影作品精选',
    'featured.view': '查看完整作品集',
    
    // Blog Preview
    'blog.title': '最新故事',
    'blog.subtitle': '镜头背后的见解和摄影技巧',
    'blog.read': '阅读文章',
    'blog.viewAll': '查看所有文章',
    
    // Gallery
    'gallery.title': '作品集',
    'gallery.subtitle': '探索我的摄影作品集',
    'gallery.all': '全部',
    'gallery.portrait': '人像',
    'gallery.landscape': '风景',
    'gallery.street': '街拍',
    'gallery.architecture': '建筑',
    'gallery.loadMore': '加载更多图片',
    
    // Actions
    'action.share': '分享',
    'action.view': '查看详情',
    'action.copied': '链接已复制到剪贴板！',
    'action.shareError': '无法分享',
    
    // Blog
    'blog.categories.all': '所有文章',
    'blog.categories.tips': '摄影技巧',
    'blog.categories.stories': '故事',
    'blog.categories.gear': '器材评测',
    'blog.pagination.previous': '上一页',
    'blog.pagination.next': '下一页',
    
    // Footer
    'footer.tagline': '以艺术视野和专业技能捕捉生活中的珍贵瞬间。',
    'footer.explore': '探索',
    'footer.services': '服务',
    'footer.copyright': '© 2024 Atelier Capture. 版权所有。',
    'footer.crafted': '用爱与激情精心制作'
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