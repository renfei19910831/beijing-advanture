import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Phone, Mail, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AvailabilitySlot {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  price: number;
  service_type: string;
  is_booked: boolean;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  slot: AvailabilitySlot | null;
  photographerName: string;
  onBookingSuccess: () => void;
}

export const BookingModal = ({ 
  isOpen, 
  onClose, 
  slot, 
  photographerName,
  onBookingSuccess 
}: BookingModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    specialRequirements: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', { 
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    });
  };

  const formatTime = (time: string) => {
    return time.substring(0, 5);
  };

  const formatPrice = (price: number) => {
    return `¥${(price / 100).toFixed(0)}`;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slot) return;

    // Basic validation
    if (!formData.name || !formData.phone) {
      toast({
        title: "请填写必要信息",
        description: "姓名和手机号码为必填项",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      // Check if user is authenticated (for future auth integration)
      // For now, we'll create a booking without auth
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          availability_id: slot.id,
          user_id: '00000000-0000-0000-0000-000000000000', // Placeholder for guest bookings
          photographer_id: slot.id.split('-')[0] || '1', // Extract photographer ID
          contact_info: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email
          },
          special_requirements: formData.specialRequirements,
          total_price: slot.price,
          status: 'pending'
        });

      if (bookingError) throw bookingError;

      // Update availability to mark as booked
      const { error: updateError } = await supabase
        .from('photographer_availability')
        .update({ is_booked: true })
        .eq('id', slot.id);

      if (updateError) throw updateError;

      toast({
        title: "预约成功！",
        description: "您的预约申请已提交，摄影师将尽快与您联系确认详情。",
      });

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        specialRequirements: ''
      });

      onBookingSuccess();
      onClose();
    } catch (error: any) {
      console.error('Booking error:', error);
      toast({
        title: "预约失败",
        description: error.message || "预约过程中出现错误，请稍后重试。",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!slot) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            预约确认
          </DialogTitle>
          <DialogDescription>
            请填写您的联系信息，摄影师将与您联系确认具体拍摄安排。
          </DialogDescription>
        </DialogHeader>

        {/* Booking Details */}
        <div className="bg-muted/30 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">摄影师</span>
            <span className="font-medium">{photographerName}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              日期
            </span>
            <span className="font-medium">{formatDate(slot.date)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="w-4 h-4" />
              时间
            </span>
            <span className="font-medium">
              {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">服务类型</span>
            <Badge variant="secondary">{slot.service_type}</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">价格</span>
            <span className="font-bold text-lg text-primary">{formatPrice(slot.price)}</span>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-1">
                <User className="w-4 h-4" />
                姓名 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="请输入您的姓名"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                手机号码 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="请输入手机号码"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              邮箱地址
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="请输入邮箱地址（可选）"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="requirements" className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              特殊要求
            </Label>
            <Textarea
              id="requirements"
              placeholder="请描述您的特殊要求或补充说明（可选）"
              value={formData.specialRequirements}
              onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-primary hover:opacity-90"
              disabled={submitting}
            >
              {submitting ? '预约中...' : `确认预约 ${formatPrice(slot.price)}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};