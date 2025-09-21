import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Photo } from '../types/photographer';

interface PhotoModalProps {
  photos: Photo[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
  const [imageLoaded, setImageLoaded] = useState(false);

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

    document.addEventListener('keydown', handleKeyDown);
    
    // 防止背景滚动
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentImageIndex]);

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
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 md:p-8 text-white animate-fade-in">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 font-serif">
                {currentPhoto.title}
              </h2>
              <p className="text-lg mb-4 text-white/90 leading-relaxed">
                {currentPhoto.description}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-white/80">
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
            </div>
          </div>

          {/* 计数器 */}
          {photos.length > 1 && (
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
              {currentImageIndex + 1} / {photos.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};