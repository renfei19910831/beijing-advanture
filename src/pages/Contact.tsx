import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { QrCode, Camera, MessageCircle, Aperture, Focus, Image, Video, Settings } from 'lucide-react';

const Contact = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 relative">
      <Navigation />
      
      {/* Photography-themed background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-20 left-10 transform rotate-12">
          <Aperture className="w-16 h-16 text-primary" />
        </div>
        <div className="absolute top-40 right-20 transform -rotate-45">
          <Focus className="w-12 h-12 text-primary" />
        </div>
        <div className="absolute bottom-40 left-20 transform rotate-45">
          <Video className="w-20 h-20 text-primary" />
        </div>
        <div className="absolute bottom-20 right-10 transform -rotate-12">
          <Settings className="w-14 h-14 text-primary" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="mb-12">
            {/* Camera viewfinder design */}
            <div className="inline-flex items-center gap-3 bg-card/80 backdrop-blur-sm px-6 py-3 rounded-full border border-border mb-6 shadow-sm">
              <div className="relative">
                <Camera className="w-6 h-6 text-primary" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-sm font-medium text-foreground">专业摄影师 · 在线咨询</span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              微信扫码
              <span className="block text-primary relative">
                咨询拍照
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              专业摄影师一对一咨询，定制您的专属拍摄方案
            </p>
          </div>
        </div>
      </section>

      {/* QR Code Section */}
      <section className="pb-20">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          {/* Main QR Card */}
          <Card className="relative p-8 md:p-12 bg-card/95 backdrop-blur-sm border-border shadow-xl">
            
            {/* Viewfinder corners */}
            <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-primary/60"></div>
            <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-primary/60"></div>
            <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-primary/60"></div>
            <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-primary/60"></div>

            <div className="text-center relative">
              {/* QR Code Container */}
              <div 
                className={`relative mx-auto mb-8 p-8 bg-white rounded-3xl shadow-lg transition-all duration-300 transform cursor-pointer ${isHovering ? 'scale-105 shadow-xl' : 'scale-100'}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={{ width: 'fit-content' }}
              >
                {/* QR Code */}
                <div className="w-64 h-64 bg-foreground rounded-2xl flex items-center justify-center relative">
                  <QrCode className="w-48 h-48 text-background" />
                  
                  {/* Subtle scanning line effect */}
                  {isHovering && (
                    <div className="absolute inset-x-8 top-8 h-0.5 bg-primary/60 animate-pulse"></div>
                  )}
                </div>

                {/* Camera icon overlay */}
                <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-3 rounded-full shadow-lg">
                  <Camera className="w-6 h-6" />
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-6">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  添加摄影师微信
                </h2>
                
                <div className="flex items-center justify-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">在线服务</span>
                  </div>
                  <div className="w-1 h-4 bg-border"></div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">快速响应</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground max-w-md mx-auto">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-2">1</div>
                    <p>打开微信扫一扫</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-2">2</div>
                    <p>扫描二维码</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-2">3</div>
                    <p>开始咨询</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Photography services */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="text-center p-6 bg-card/70 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/20 transition-colors duration-300">
              <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-3">
                <Image className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">人像摄影</h3>
              <p className="text-xs text-muted-foreground">个人写真</p>
            </div>
            
            <div className="text-center p-6 bg-card/70 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/20 transition-colors duration-300">
              <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-3">
                <Camera className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">活动拍摄</h3>
              <p className="text-xs text-muted-foreground">活动记录</p>
            </div>
            
            <div className="text-center p-6 bg-card/70 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/20 transition-colors duration-300">
              <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-3">
                <Aperture className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">商业摄影</h3>
              <p className="text-xs text-muted-foreground">产品宣传</p>
            </div>
            
            <div className="text-center p-6 bg-card/70 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/20 transition-colors duration-300">
              <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-3">
                <Focus className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">定制服务</h3>
              <p className="text-xs text-muted-foreground">私人订制</p>
            </div>
          </div>

          {/* Contact highlight */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
              <MessageCircle className="w-4 h-4" />
              <span>专业摄影师将在24小时内回复您的咨询</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;