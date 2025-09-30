import { Camera, Heart, Users, Sparkles, CheckCircle2, QrCode } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';

const JoinUs = () => {
  const steps = [
    {
      number: "01",
      title: "提交申请",
      description: "扫描二维码，填写您的基本信息和作品集"
    },
    {
      number: "02",
      title: "作品审核",
      description: "我们的团队将仔细评估您的摄影作品"
    },
    {
      number: "03",
      title: "面谈交流",
      description: "通过审核后，我们将与您进行深入沟通"
    },
    {
      number: "04",
      title: "正式入驻",
      description: "签约成功，开启您的专业摄影师之旅"
    }
  ];

  const benefits = [
    "专业的平台曝光，触达更多客户",
    "灵活的工作时间和地点安排",
    "完善的订单管理系统支持",
    "持续的摄影技能培训与提升",
    "公平透明的收益分成机制",
    "专业团队的运营和技术支持"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-8">
            <Camera className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            加入我们
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            如果您热爱摄影，拥有专业技能和独特视角，欢迎加入我们的平台。
            让我们一起用镜头记录美好，创造价值。
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow border-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-3">热爱驱动</h3>
              <p className="text-muted-foreground">
                我们相信真正的艺术源于内心的热爱与执着追求
              </p>
            </Card>
            <Card className="p-8 text-center hover:shadow-lg transition-shadow border-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-3">共创价值</h3>
              <p className="text-muted-foreground">
                携手优秀摄影师，为客户提供卓越的视觉体验
              </p>
            </Card>
            <Card className="p-8 text-center hover:shadow-lg transition-shadow border-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-3">专业成长</h3>
              <p className="text-muted-foreground">
                持续学习与进步，让每位摄影师都能发挥所长
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gradient-soft">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl font-bold text-center mb-12">
            为什么选择我们
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 bg-background/80 backdrop-blur-sm p-6 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-lg">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl font-bold text-center mb-16">
            合作流程
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6 relative">
                    <span className="font-bold text-3xl text-primary">{step.number}</span>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute left-full top-1/2 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                    )}
                  </div>
                  <h3 className="font-semibold text-xl mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QR Code CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-bold mb-6">
            准备好开始了吗？
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            扫描下方二维码，立即联系我们开始申请流程
          </p>
          
          <Card className="inline-block p-12 bg-background shadow-2xl">
            <div className="flex flex-col items-center">
              <div className="w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <QrCode className="w-32 h-32 text-primary/40" />
              </div>
              <p className="text-sm text-muted-foreground">
                使用微信扫描二维码
              </p>
              <p className="text-lg font-semibold mt-2">
                咨询加入详情
              </p>
            </div>
          </Card>

          <p className="text-sm text-muted-foreground mt-8 max-w-md mx-auto">
            我们期待与有才华、有热情的摄影师合作。
            如有任何疑问，欢迎随时联系我们的团队。
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JoinUs;