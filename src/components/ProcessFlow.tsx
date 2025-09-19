import { Card } from '@/components/ui/card';
import { Camera, User, Calendar, ImageIcon, Edit, CheckCircle, Download } from 'lucide-react';

const ProcessFlow = () => {
  const steps = [
    { icon: ImageIcon, title: '浏览照片', description: '查看作品集' },
    { icon: User, title: '选择摄影师', description: '找到心仪风格' },
    { icon: Calendar, title: '预约时间', description: '选择拍摄日期' },
    { icon: Camera, title: '拍摄照片', description: '专业现场拍摄' },
    { icon: Edit, title: '修改照片', description: '精细后期处理' },
    { icon: CheckCircle, title: '确认照片', description: '满意后确认' },
    { icon: Download, title: '交付照片', description: '获得高清作品' }
  ];

  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">简单7步，完成专业拍摄</h2>
          <p className="text-muted-foreground text-lg">从选择到交付，全程无忧体验</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="p-4 text-center hover:shadow-elegant transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="mb-3">
                <div className="w-12 h-12 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-2">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <div className="w-6 h-6 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
              </div>
              <h3 className="font-semibold text-sm text-foreground mb-1">{step.title}</h3>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;