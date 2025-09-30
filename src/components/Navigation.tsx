import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // 检测导航栏下方的背景颜色
      const navHeight = 80; // 导航栏高度
      const elementBelowNav = document.elementFromPoint(window.innerWidth / 2, navHeight + 10);
      
      if (elementBelowNav) {
        const bgColor = window.getComputedStyle(elementBelowNav).backgroundColor;
        const rgb = bgColor.match(/\d+/g);
        
        if (rgb && rgb.length >= 3) {
          // 计算亮度 (使用相对亮度公式)
          const r = parseInt(rgb[0]);
          const g = parseInt(rgb[1]);
          const b = parseInt(rgb[2]);
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;
          
          // 如果亮度低于 128，认为是深色背景
          setIsDarkBackground(brightness < 128);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.photographers'), path: '/photographers' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[1000] backdrop-blur-xl border-b transition-all duration-500",
        isScrolled 
          ? "bg-white/98 border-border shadow-lg" 
          : "bg-white/90 border-border/50 shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className={cn(
              "font-serif text-2xl font-semibold transition-colors duration-300",
              isDarkBackground 
                ? "text-white hover:text-white/80" 
                : "text-foreground hover:text-primary"
            )}
            style={{ 
              textShadow: isDarkBackground 
                ? '0 2px 4px rgba(0, 0, 0, 0.3)' 
                : '0 1px 2px rgba(255, 255, 255, 0.8)' 
            }}
          >
            Atelier Capture
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'text-sm font-medium tracking-wide transition-all duration-300 relative',
                  'after:content-[""] after:absolute after:w-full after:h-[3px] after:bottom-[-4px] after:left-0',
                  'after:scale-x-0 after:transition-transform after:duration-300',
                  'hover:after:scale-x-100',
                  isDarkBackground 
                    ? 'after:bg-white hover:text-white/80' 
                    : 'after:bg-primary hover:text-primary',
                  location.pathname === item.path
                    ? isDarkBackground 
                      ? 'text-white after:scale-x-100' 
                      : 'text-primary after:scale-x-100'
                    : isDarkBackground 
                      ? 'text-white/90' 
                      : 'text-foreground'
                )}
                style={{ 
                  textShadow: isDarkBackground 
                    ? '0 2px 4px rgba(0, 0, 0, 0.3)' 
                    : '0 1px 2px rgba(255, 255, 255, 0.8)' 
                }}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/favorites"
              className={cn(
                'text-sm font-medium tracking-wide transition-all duration-300 relative',
                'after:content-[""] after:absolute after:w-full after:h-[3px] after:bottom-[-4px] after:left-0',
                'after:scale-x-0 after:transition-transform after:duration-300',
                'hover:after:scale-x-100',
                isDarkBackground 
                  ? 'after:bg-white hover:text-white/80' 
                  : 'after:bg-primary hover:text-primary',
                location.pathname === '/favorites'
                  ? isDarkBackground 
                    ? 'text-white after:scale-x-100' 
                    : 'text-primary after:scale-x-100'
                  : isDarkBackground 
                    ? 'text-white/90' 
                    : 'text-foreground'
              )}
              style={{ 
                textShadow: isDarkBackground 
                  ? '0 2px 4px rgba(0, 0, 0, 0.3)' 
                  : '0 1px 2px rgba(255, 255, 255, 0.8)' 
              }}
            >
              我的收藏
            </Link>
            
            {/* Auth Section */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => signOut()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    登出
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="outline" className="bg-background/80 backdrop-blur-sm">
                  登录
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button & Auth */}
          <div className="md:hidden flex items-center space-x-2">
            <Link
              to="/favorites"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              我的收藏
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-sm">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => signOut()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    登出
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button size="sm" variant="outline">
                  登录
                </Button>
              </Link>
            )}
            
            <button
              className="p-2 text-foreground hover:text-primary transition-colors drop-shadow-sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border">
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'block text-lg font-medium transition-colors duration-300',
                    location.pathname === item.path
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;