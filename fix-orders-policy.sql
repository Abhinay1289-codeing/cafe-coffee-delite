-- ========================================================
-- Cafe Coffee Delite — Live Orders Table RLS Policy Update
-- Run this script in Supabase SQL Editor if order updates fail
-- ========================================================

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Drop existing order policies
DROP POLICY IF EXISTS "Public can manage orders" ON public.orders;
DROP POLICY IF EXISTS "Anyone can insert orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can read orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can manage orders" ON public.orders;
DROP POLICY IF EXISTS "allow_all" ON public.orders;

-- Create policy allowing anonymous & authenticated users to INSERT, SELECT, UPDATE orders
CREATE POLICY "Public can manage orders"
  ON public.orders FOR ALL
  USING (true)
  WITH CHECK (true);

-- Grant full table permissions to anon and authenticated roles
GRANT ALL ON public.orders TO anon;
GRANT ALL ON public.orders TO authenticated;
