import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Photo, Photographer } from '../types/photographer';

interface PhotoModalProps {
  photos: Photo[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  photographer: Photographer;
  onBooking: () => void;
  onToggleFavorite: () => void;
  isFavorited: boolean;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  photographer,
  onBooking,
  onToggleFavorite,
  isFavorited
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showPhotographerInfo, setShowPhotographerInfo] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentImageIndex(currentIndex);
    setImageLoaded(false);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    const handleMouseMove = () => {
      if (!isOpen) return;
      
      // 显示摄影师信息
      setShowPhotographerInfo(true);
      
      // 清除之前的定时器
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
      
      // 设置新的定时器，2秒后隐藏
      const timeout = setTimeout(() => {
        setShowPhotographerInfo(false);
      }, 2000);
      
      setHideTimeout(timeout);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousemove', handleMouseMove);
    
    // 防止背景滚动
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.style.overflow = 'unset';
      
      // 清理定时器
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [isOpen, currentImageIndex, hideTimeout]);

  const goToNext = () => {
    setImageLoaded(false);
    setCurrentImageIndex((prev) => (prev + 1) % photos.length);
  };

  const goToPrevious = () => {
    setImageLoaded(false);
    setCurrentImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const currentPhoto = photos[currentImageIndex];

  if (!isOpen || !currentPhoto) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      {/* 关闭按钮 */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 text-white hover:bg-white/10 hover:text-white"
        onClick={onClose}
      >
        <X size={24} />
      </Button>

      {/* 导航按钮 */}
      {photos.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
          >
            <ChevronLeft size={32} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            <ChevronRight size={32} />
          </Button>
        </>
      )}

      {/* 主要内容区域 */}
      <div 
        className="flex items-center justify-center min-h-screen p-4 md:p-8"
      >
        <div className="relative max-w-7xl max-h-full w-full">
          {/* 照片 */}
          <div className="relative flex items-center justify-center">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}
            
            <img
              src={currentPhoto.url}
              alt={currentPhoto.title}
              className={`max-w-full max-h-[80vh] object-contain transition-all duration-500 ${
                imageLoaded ? 'opacity-100 animate-scale-in' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />
          </div>

          {/* 照片信息 */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-6 md:p-8 text-white animate-fade-in">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 font-serif">
                {currentPhoto.title}
              </h2>
              <p className="text-lg mb-4 text-white/90 leading-relaxed">
                {currentPhoto.description}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-white/80 mb-6">
                {currentPhoto.location && (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    {currentPhoto.location}
                  </span>
                )}
                {currentPhoto.date && <span>{currentPhoto.date}</span>}
                {currentPhoto.camera && <span>{currentPhoto.camera}</span>}
                {currentPhoto.lens && <span>{currentPhoto.lens}</span>}
                {currentPhoto.settings && <span>{currentPhoto.settings}</span>}
              </div>

              {/* 摄影师信息栏 */}
              <div className={`bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 transition-all duration-500 mx-auto max-w-md ${
                showPhotographerInfo 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}>
                <div className="flex items-center justify-center gap-4">
                  <Avatar className="h-12 w-12 ring-2 ring-white/30">
                    <AvatarImage src={photographer.avatar} alt={photographer.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {photographer.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg text-white">{photographer.name}</h3>
                    <p className="text-white/80 text-sm">专业摄影师</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onBooking();
                      }}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 py-2 shadow-lg text-sm"
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      预约
                    </Button>
                    <Button
                      variant={isFavorited ? "default" : "secondary"}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite();
                      }}
                      className={`h-10 w-10 rounded-full shadow-lg transition-all duration-200 ${
                        isFavorited 
                          ? 'bg-red-500 hover:bg-red-600 text-white' 
                          : 'bg-white/20 hover:bg-white/30 text-white'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 计数器 */}
          {photos.length > 1 && (
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
              {currentImageIndex + 1} / {photos.length}
            </div>
          )}

          {/* 摄影师信息和操作按钮 - 移除这部分，已合并到底部 */}
        </div>
      </div>
    </div>
  );
};