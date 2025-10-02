-- Create photographers table to map photographer IDs to auth users
CREATE TABLE public.photographers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  photographer_id text NOT NULL UNIQUE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on photographers table
ALTER TABLE public.photographers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view photographer profiles (public directory)
CREATE POLICY "Photographer profiles are viewable by everyone"
ON public.photographers
FOR SELECT
USING (true);

-- Allow photographers to update their own profile
CREATE POLICY "Photographers can update their own profile"
ON public.photographers
FOR UPDATE
USING (auth.uid() = user_id);

-- Allow authenticated users to create their photographer profile
CREATE POLICY "Users can create their photographer profile"
ON public.photographers
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Add trigger for updating photographers updated_at
CREATE TRIGGER update_photographers_updated_at
BEFORE UPDATE ON public.photographers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update bookings RLS policies to allow photographer access
-- First, drop the existing SELECT policy
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;

-- Create new policies for customers and photographers
CREATE POLICY "Customers can view their own bookings"
ON public.bookings
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Photographers can view their assigned bookings"
ON public.bookings
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.photographers
    WHERE photographers.photographer_id = bookings.photographer_id
    AND photographers.user_id = auth.uid()
  )
);

-- Add policy to allow photographers to update booking status
CREATE POLICY "Photographers can update their booking status"
ON public.bookings
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.photographers
    WHERE photographers.photographer_id = bookings.photographer_id
    AND photographers.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.photographers
    WHERE photographers.photographer_id = bookings.photographer_id
    AND photographers.user_id = auth.uid()
  )
);

-- Add foreign key constraint from bookings to photographers table
-- Note: This will require existing photographer_ids in bookings to exist in photographers table
-- For now, we'll add this as a comment for manual execution after data migration
-- ALTER TABLE public.bookings 
-- ADD CONSTRAINT fk_bookings_photographer 
-- FOREIGN KEY (photographer_id) 
-- REFERENCES public.photographers(photographer_id) 
-- ON DELETE RESTRICT;