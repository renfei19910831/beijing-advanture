import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Clock, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { BookingModal } from './BookingModal';

interface AvailabilitySlot {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  price: number;
  service_type: string;
  is_booked: boolean;
}

interface AvailabilityCalendarProps {
  photographerId: string;
  photographerName: string;
}

export const AvailabilityCalendar = ({ photographerId, photographerName }: AvailabilityCalendarProps) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Get start of current week (Monday)
  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(d.setDate(diff));
  };

  // Initialize current week to start of this week
  useEffect(() => {
    setCurrentWeekStart(getWeekStart(new Date()));
  }, []);

  // Generate week dates
  const getWeekDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // Fetch availability data
  const fetchAvailability = async () => {
    setLoading(true);
    try {
      const weekEnd = new Date(currentWeekStart);
      weekEnd.setDate(currentWeekStart.getDate() + 6);

      const { data, error } = await supabase
        .from('photographer_availability')
        .select('*')
        .eq('photographer_id', photographerId)
        .gte('date', currentWeekStart.toISOString().split('T')[0])
        .lte('date', weekEnd.toISOString().split('T')[0])
        .order('date')
        .order('start_time');

      if (error) throw error;
      setAvailability(data || []);
    } catch (error) {
      console.error('Error fetching availability:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, [currentWeekStart, photographerId]);

  // Navigate weeks
  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(newDate);
  };

  // Format functions
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  };

  const formatDay = (date: Date) => {
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return days[date.getDay()];
  };

  const formatTime = (time: string) => {
    return time.substring(0, 5); // Remove seconds
  };

  const formatPrice = (price: number) => {
    return `¥${(price / 100).toFixed(0)}`;
  };

  // Get slots for specific date
  const getSlotsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return availability.filter(slot => slot.date === dateStr);
  };

  const handleSlotClick = (slot: AvailabilitySlot) => {
    setSelectedSlot(slot);
    setBookingModalOpen(true);
  };

  const weekDates = getWeekDates();
  const isCurrentWeek = weekDates.some(date => 
    date.toDateString() === new Date().toDateString()
  );

  return (
    <>
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                可预约时间
              </h3>
              <p className="text-muted-foreground text-sm mt-1">选择适合您的时间段进行预约</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={goToPreviousWeek}
                disabled={loading}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium min-w-[100px] text-center">
                {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={goToNextWeek}
                disabled={loading}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-7 gap-4">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-12 bg-muted/50 rounded animate-pulse"></div>
                  <div className="space-y-1">
                    <div className="h-16 bg-muted/30 rounded animate-pulse"></div>
                    <div className="h-16 bg-muted/30 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-4">
              {weekDates.map((date, index) => {
                const slots = getSlotsForDate(date);
                const isToday = date.toDateString() === new Date().toDateString();
                const isPast = date < new Date() && !isToday;

                return (
                  <div key={index} className="space-y-2">
                    <div className={`text-center p-3 rounded-lg ${
                      isToday 
                        ? 'bg-primary text-primary-foreground' 
                        : isPast 
                          ? 'bg-muted/50 text-muted-foreground' 
                          : 'bg-muted/30'
                    }`}>
                      <div className="font-medium text-sm">
                        {formatDay(date)}
                      </div>
                      <div className="text-lg font-bold">
                        {date.getDate()}
                      </div>
                    </div>

                    <div className="space-y-1 min-h-[100px]">
                      {slots.length > 0 ? (
                        slots.map((slot) => (
                          <Button
                            key={slot.id}
                            variant="outline"
                            size="sm"
                            className={`w-full h-auto p-2 flex flex-col items-start ${
                              slot.is_booked || isPast
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-primary/5 hover:border-primary/20'
                            }`}
                            onClick={() => !slot.is_booked && !isPast && handleSlotClick(slot)}
                            disabled={slot.is_booked || isPast}
                          >
                            <div className="flex items-center gap-1 w-full">
                              <Clock className="w-3 h-3" />
                              <span className="text-xs font-medium">
                                {formatTime(slot.start_time)}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground truncate w-full text-left">
                              {slot.service_type}
                            </div>
                            <div className="text-xs font-bold text-primary">
                              {formatPrice(slot.price)}
                            </div>
                            {slot.is_booked && (
                              <Badge variant="secondary" className="text-xs mt-1">
                                已预约
                              </Badge>
                            )}
                          </Button>
                        ))
                      ) : (
                        <div className="text-xs text-muted-foreground text-center py-4">
                          {isPast ? '已过期' : '暂无时段'}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!isCurrentWeek && (
            <div className="text-center mt-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setCurrentWeekStart(getWeekStart(new Date()))}
              >
                返回本周
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => {
          setBookingModalOpen(false);
          setSelectedSlot(null);
        }}
        slot={selectedSlot}
        photographerName={photographerName}
        onBookingSuccess={fetchAvailability}
      />
    </>
  );
};