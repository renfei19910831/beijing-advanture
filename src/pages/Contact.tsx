import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { QrCode, Camera, Sparkles, Zap, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [showGlow, setShowGlow] = useState(false);

  useEffect(() => {
    const glowInterval = setInterval(() => {
      setShowGlow(prev => !prev);
    }, 3000);

    return () => clearInterval(glowInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      <Navigation />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-accent/10 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-secondary/5 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Camera className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">专业摄影咨询</span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              扫码添加
              <span className="block text-primary">摄影师微信</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              一对一专业拍照咨询服务，让每一刻都成为永恒艺术
            </p>
          </div>
        </div>
      </section>

      {/* QR Code Section */}
      <section className="pb-20">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <Card className={`relative p-12 bg-card/80 backdrop-blur-sm border-border shadow-2xl transition-all duration-700 ${showGlow ? 'shadow-primary/20' : ''}`}>
            
            {/* Scanning Animation Overlay */}
            {isScanning && (
              <div className="absolute inset-0 bg-primary/5 rounded-lg animate-pulse"></div>
            )}
            
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/40"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/40"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/40"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/40"></div>

            <div className="text-center relative">
              {/* QR Code Container */}
              <div 
                className={`relative mx-auto mb-8 p-6 bg-white rounded-2xl shadow-lg transition-all duration-500 transform hover:scale-105 cursor-pointer ${showGlow ? 'ring-4 ring-primary/20 shadow-primary/30' : ''}`}
                onMouseEnter={() => setIsScanning(true)}
                onMouseLeave={() => setIsScanning(false)}
                style={{ width: 'fit-content' }}
              >
                {/* Scanning Line Animation */}
                {isScanning && (
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-ping"></div>
                )}
                
                {/* QR Code Placeholder - Replace with actual QR code */}
                <div className="w-64 h-64 bg-foreground rounded-lg flex items-center justify-center relative overflow-hidden">
                  <QrCode className="w-48 h-48 text-background" />
                  
                  {/* Dynamic overlay pattern */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-primary/10 transition-opacity duration-300 ${isScanning ? 'opacity-100' : 'opacity-0'}`}></div>
                </div>

                {/* Floating particles effect */}
                <div className="absolute -inset-4 pointer-events-none">
                  <Sparkles className={`absolute top-2 right-2 w-4 h-4 text-primary/60 transition-all duration-300 ${showGlow ? 'animate-spin' : ''}`} />
                  <Zap className={`absolute bottom-2 left-2 w-4 h-4 text-accent/60 transition-all duration-300 ${showGlow ? 'animate-bounce' : ''}`} />
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-4">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                  微信扫码咨询
                </h2>
                
                <div className="flex items-center justify-center gap-3 text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>在线咨询</span>
                  </div>
                  <div className="w-1 h-4 bg-border"></div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>即时回复</span>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-muted-foreground">
                  <p className="flex items-center justify-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-primary/10 text-primary rounded-full text-xs font-bold">1</span>
                    打开微信扫一扫功能
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-primary/10 text-primary rounded-full text-xs font-bold">2</span>
                    扫描上方二维码
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-primary/10 text-primary rounded-full text-xs font-bold">3</span>
                    开始专业拍照咨询
                  </p>
                </div>
              </div>
            </div>

            {/* Pulse animation ring */}
            <div className={`absolute inset-0 rounded-lg border-2 border-primary/20 transition-all duration-1000 ${showGlow ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}></div>
          </Card>
          
          {/* Service highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
              <Camera className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">专业拍摄</h3>
              <p className="text-sm text-muted-foreground">人像、商业、活动摄影</p>
            </div>
            <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
              <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">在线咨询</h3>
              <p className="text-sm text-muted-foreground">24小时内快速响应</p>
            </div>
            <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">创意服务</h3>
              <p className="text-sm text-muted-foreground">个性化拍摄方案</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;