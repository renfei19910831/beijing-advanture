import { Camera, Heart } from 'lucide-react';
import xiaohongshuQR from '@/assets/xiaohongshu-qr.jpg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Camera className="w-8 h-8 mr-3" />
              <h3 className="font-serif text-2xl font-semibold">Atelier Capture</h3>
            </div>
            <p className="text-background/70 leading-relaxed max-w-md">
              Transforming fleeting moments into timeless visual stories through 
              passionate photography and thoughtful composition.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><a href="/gallery" className="text-background/70 hover:text-background transition-colors">Portfolio</a></li>
              <li><a href="/blog" className="text-background/70 hover:text-background transition-colors">Blog</a></li>
              <li><a href="/about" className="text-background/70 hover:text-background transition-colors">About</a></li>
              <li><a href="/join-us" className="text-background/70 hover:text-background transition-colors">Join us</a></li>
            </ul>
          </div>

          {/* Xiaohongshu QR Code */}
          <div className="flex flex-col items-start">
            <h4 className="font-semibold text-lg mb-4">关注我们</h4>
            <div className="bg-background/10 p-3 rounded-lg backdrop-blur-sm">
              <img src={xiaohongshuQR} alt="小红书官方账号" className="w-24 h-24" />
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-background/70 text-sm">
              © {currentYear} Atelier Capture. All rights reserved.
            </p>
            <p className="text-background/70 text-sm flex items-center mt-2 md:mt-0">
              Crafted with <Heart size={14} className="mx-1 text-red-400" /> for visual storytelling
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;