-- Create table for photographer availability
CREATE TABLE public.photographer_availability (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  photographer_id TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_booked BOOLEAN NOT NULL DEFAULT false,
  price INTEGER NOT NULL, -- Price in cents (yuan * 100)
  service_type TEXT NOT NULL DEFAULT '摄影服务',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(photographer_id, date, start_time)
);

-- Enable RLS
ALTER TABLE public.photographer_availability ENABLE ROW LEVEL SECURITY;

-- Create policies - availability should be viewable by everyone
CREATE POLICY "Availability is viewable by everyone" 
ON public.photographer_availability 
FOR SELECT 
USING (true);

-- Only authenticated users can book (we'll add booking table later)
CREATE POLICY "Only authenticated users can update availability for booking" 
ON public.photographer_availability 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

-- Create table for bookings
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  availability_id UUID NOT NULL REFERENCES public.photographer_availability(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  photographer_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  contact_info JSONB NOT NULL, -- Store user contact details
  special_requirements TEXT,
  total_price INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Bookings policies
CREATE POLICY "Users can view their own bookings" 
ON public.bookings 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" 
ON public.bookings 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_availability_updated_at
  BEFORE UPDATE ON public.photographer_availability
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample availability data for photographer 1
INSERT INTO public.photographer_availability (photographer_id, date, start_time, end_time, price, service_type) VALUES
  -- This week
  ('1', CURRENT_DATE + 1, '09:00', '11:00', 80000, '人像写真 (2小时)'),
  ('1', CURRENT_DATE + 1, '14:00', '16:00', 80000, '人像写真 (2小时)'),
  ('1', CURRENT_DATE + 2, '10:00', '12:00', 80000, '人像写真 (2小时)'),
  ('1', CURRENT_DATE + 2, '15:00', '17:00', 80000, '人像写真 (2小时)'),
  ('1', CURRENT_DATE + 3, '09:30', '11:30', 80000, '人像写真 (2小时)'),
  ('1', CURRENT_DATE + 3, '13:00', '16:00', 150000, '情侣写真 (3小时)'),
  ('1', CURRENT_DATE + 4, '08:00', '12:00', 200000, '全天外景拍摄'),
  ('1', CURRENT_DATE + 5, '10:00', '12:00', 80000, '人像写真 (2小时)'),
  ('1', CURRENT_DATE + 5, '14:30', '16:30', 80000, '人像写真 (2小时)'),
  
  -- Next week
  ('1', CURRENT_DATE + 8, '09:00', '11:00', 80000, '人像写真 (2小时)'),
  ('1', CURRENT_DATE + 8, '14:00', '16:00', 80000, '人像写真 (2小时)'),
  ('1', CURRENT_DATE + 9, '10:00', '13:00', 120000, '家庭摄影 (3小时)'),
  ('1', CURRENT_DATE + 9, '15:00', '17:00', 80000, '人像写真 (2小时)'),
  ('1', CURRENT_DATE + 10, '09:00', '12:00', 150000, '商业摄影 (3小时)'),
  ('1', CURRENT_DATE + 11, '13:00', '17:00', 200000, '婚纱摄影 (4小时)'),
  ('1', CURRENT_DATE + 12, '08:30', '10:30', 80000, '人像写真 (2小时)'),
  ('1', CURRENT_DATE + 12, '11:00', '13:00', 80000, '人像写真 (2小时)'),
  ('1', CURRENT_DATE + 12, '15:00', '17:00', 80000, '人像写真 (2小时)');