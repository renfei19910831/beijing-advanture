import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { format, addDays, startOfWeek, isSameDay, parseISO } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';

interface AvailabilitySlot {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  price: number;
  service_type: string;
  is_booked: boolean;
}

interface PhotographerAvailabilityProps {
  photographerId: string;
  photographerName: string;
  onBookSlot?: (slot: AvailabilitySlot) => void;
}

export function PhotographerAvailability({ 
  photographerId, 
  photographerName,
  onBookSlot 
}: PhotographerAvailabilityProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Generate week dates
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 }); // Monday start
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const fetchAvailability = async () => {
    setLoading(true);
    try {
      const weekEnd = addDays(weekStart, 6);
      
      const { data, error } = await supabase
        .from('photographer_availability')
        .select('*')
        .eq('photographer_id', photographerId)
        .gte('date', format(weekStart, 'yyyy-MM-dd'))
        .lte('date', format(weekEnd, 'yyyy-MM-dd'))
        .order('date', { ascending: true })
        .order('start_time', { ascending: true });

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
  }, [photographerId, currentWeek]);

  const goToNextWeek = () => {
    setCurrentWeek(prev => addDays(prev, 7));
  };

  const goToPrevWeek = () => {
    const prevWeek = addDays(currentWeek, -7);
    const today = new Date();
    // Don't allow going to previous weeks
    if (prevWeek >= today) {
      setCurrentWeek(prevWeek);
    }
  };

  const getAvailabilityForDate = (date: Date) => {
    return availability.filter(slot => 
      isSameDay(parseISO(slot.date), date) && !slot.is_booked
    );
  };

  const formatPrice = (priceInCents: number) => {
    return `¥${(priceInCents / 100).toFixed(0)}`;
  };

  const formatTime = (time: string) => {
    return time.substring(0, 5); // Remove seconds
  };

  const getDayLabel = (date: Date) => {
    const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    return days[date.getDay() === 0 ? 6 : date.getDay() - 1]; // Adjust for Monday start
  };

  const isToday = (date: Date) => {
    return isSameDay(date, new Date());
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    return date < today && !isSameDay(date, today);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">可预约时间</h3>
          </div>
          
          {/* Week Navigation */}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevWeek}
              disabled={addDays(currentWeek, -7) < new Date()}
              className="p-2"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <span className="text-sm font-medium text-muted-foreground min-w-[140px] text-center">
              {format(weekStart, 'MM月dd日')} - {format(addDays(weekStart, 6), 'MM月dd日')}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextWeek}
              className="p-2"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Timezone */}
        <div className="flex items-center space-x-2 mb-4 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>北京时间 (UTC+8)</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {weekDays.map((date) => {
              const daySlots = getAvailabilityForDate(date);
              const hasSlots = daySlots.length > 0;
              const past = isPastDate(date);
              
              return (
                <div key={date.toISOString()} className="space-y-2">
                  {/* Date Header */}
                  <div className="text-center pb-2 border-b border-border/20">
                    <div className={`text-sm font-medium ${isToday(date) ? 'text-primary' : 'text-foreground'}`}>
                      {getDayLabel(date)}
                    </div>
                    <div className={`text-lg font-semibold ${isToday(date) ? 'text-primary' : 'text-muted-foreground'}`}>
                      {format(date, 'dd')}
                    </div>
                    {isToday(date) && (
                      <Badge variant="secondary" className="mt-1 text-xs">今天</Badge>
                    )}
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-2 min-h-[120px]">
                    {past ? (
                      <div className="text-xs text-muted-foreground text-center py-4">
                        已过期
                      </div>
                    ) : hasSlots ? (
                      daySlots.map((slot) => (
                        <Button
                          key={slot.id}
                          variant="outline"
                          size="sm"
                          className="w-full p-2 h-auto flex flex-col items-start space-y-1 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                          onClick={() => onBookSlot?.(slot)}
                        >
                          <div className="flex items-center space-x-1 text-xs font-medium">
                            <Clock className="w-3 h-3" />
                            <span>
                              {formatTime(slot.start_time)}-{formatTime(slot.end_time)}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground truncate w-full text-left">
                            {slot.service_type}
                          </div>
                          <div className="text-xs font-semibold text-primary">
                            {formatPrice(slot.price)}
                          </div>
                        </Button>
                      ))
                    ) : (
                      <div className="text-xs text-muted-foreground text-center py-4">
                        无可预约时间
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Note */}
        <div className="mt-6 p-3 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground">
            点击时间段即可预约。价格可能因服务类型和时长而有所不同。如需特殊安排，请联系摄影师。
          </p>
        </div>
      </CardContent>
    </Card>
  );
}