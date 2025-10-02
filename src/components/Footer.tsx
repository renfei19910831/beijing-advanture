import { Camera, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import xiaohongshuQR from '@/assets/xiaohongshu-qr.jpg';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Camera className="w-8 h-8 mr-3" />
              <h3 className="font-serif text-2xl font-semibold">找拍</h3>
            </div>
            <p className="text-background/70 leading-relaxed max-w-md">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer.explore')}</h4>
            <ul className="space-y-2">
              <li><a href="/gallery" className="text-background/70 hover:text-background transition-colors">{t('footer.portfolio')}</a></li>
              <li><a href="/blog" className="text-background/70 hover:text-background transition-colors">{t('footer.blog')}</a></li>
              <li><a href="/about" className="text-background/70 hover:text-background transition-colors">{t('footer.about')}</a></li>
              <li><a href="/join-us" className="text-background/70 hover:text-background transition-colors">{t('footer.joinUs')}</a></li>
            </ul>
          </div>

          {/* Xiaohongshu QR Code */}
          <div className="flex flex-col items-start">
            <h4 className="font-semibold text-lg mb-4">{t('footer.followUs')}</h4>
            <div className="bg-background/10 p-3 rounded-lg backdrop-blur-sm">
              <img src={xiaohongshuQR} alt="小红书官方账号" className="w-24 h-24" />
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-background/70 text-sm">
              {t('footer.copyright')}
            </p>
            <p className="text-background/70 text-sm flex items-center mt-2 md:mt-0">
              {t('footer.crafted')} <Heart size={14} className="mx-1 text-red-400" /> {t('footer.forVisualStorytelling')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;