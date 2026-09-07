-- ================================================================
-- Cafe Coffee Delite — All-in-One Supabase Setup Script
-- ================================================================
-- RUN THIS SCRIPT IN YOUR NEW SUPABASE PROJECT SQL EDITOR:
-- 1. Go to https://supabase.com/dashboard/project/luhwhzsyjsiwdmwrohwc
-- 2. Click on "SQL Editor" in the left menu.
-- 3. Click "+ New Query".
-- 4. Paste this entire script and click "Run" ▶.
-- ================================================================

-- 1. Create Tables
CREATE TABLE IF NOT EXISTS public.menu_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text UNIQUE NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  category text NOT NULL DEFAULT '',
  image text DEFAULT '',
  description text DEFAULT '',
  available boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.config (
  id integer PRIMARY KEY DEFAULT 1,
  data jsonb NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS public.category_overrides (
  cat_id text PRIMARY KEY,
  label text NOT NULL
);

CREATE TABLE IF NOT EXISTS public.orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  table_number text,
  customer_name text DEFAULT 'Guest',
  customer_phone text,
  items jsonb NOT NULL DEFAULT '[]',
  subtotal numeric DEFAULT 0,
  gst numeric DEFAULT 0,
  total numeric DEFAULT 0,
  notes text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies if any
DROP POLICY IF EXISTS "Public full access to menu_items" ON public.menu_items;
DROP POLICY IF EXISTS "Public full access to config" ON public.config;
DROP POLICY IF EXISTS "Public full access to category_overrides" ON public.category_overrides;
DROP POLICY IF EXISTS "Public full access to orders" ON public.orders;

-- 4. Create Open RLS Policies for Customer Ordering & Admin Updates
CREATE POLICY "Public full access to menu_items" ON public.menu_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access to config" ON public.config FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access to category_overrides" ON public.category_overrides FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access to orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);

-- 5. Grant API permissions to anon & authenticated roles
GRANT ALL ON public.menu_items TO anon, authenticated;
GRANT ALL ON public.config TO anon, authenticated;
GRANT ALL ON public.category_overrides TO anon, authenticated;
GRANT ALL ON public.orders TO anon, authenticated;

-- 6. Enable Realtime subscriptions for Live Kitchen & Menu updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.menu_items;
ALTER PUBLICATION supabase_realtime ADD TABLE public.config;
ALTER PUBLICATION supabase_realtime ADD TABLE public.category_overrides;

-- 7. Seed Initial Menu Items
INSERT INTO public.menu_items (name, price, category, available, sort_order) VALUES
  -- Non-Veg Starters
  ('Chicken 65',                      219, 'Starters',        true, 101),
  ('Chicken Manchurian',              219, 'Starters',        true, 102),
  ('Chilli Chicken',                  219, 'Starters',        true, 103),
  ('Chicken Lollipop (6 Pcs)',        289, 'Starters',        true, 104),
  ('Dragon Chicken',                  249, 'Starters',        true, 105),
  ('Chicken Majestic',                239, 'Starters',        true, 106),
  ('Chicken 555',                     239, 'Starters',        true, 107),
  ('Garlic Chicken',                  219, 'Starters',        true, 108),
  ('8 to 8 Chicken',                  239, 'Starters',        true, 109),
  ('Pepper Chicken',                  329, 'Starters',        true, 110),
  ('Sezwan Chicken',                  239, 'Starters',        true, 111),
  ('Highway Delite Spl (Chicken)',    389, 'Starters',        true, 112),
  -- Mutton Starters
  ('Mutton 65',                       319, 'Starters',        true, 201),
  ('Mutton Manchurian',               319, 'Starters',        true, 202),
  ('Chilli Mutton',                   329, 'Starters',        true, 203),
  ('Mutton Roast',                    359, 'Starters',        true, 204),
  ('Pepper Mutton',                   349, 'Starters',        true, 205),
  ('Sezwan Mutton',                   359, 'Starters',        true, 206),
  -- Veg Starters
  ('Gobi Manchurian',                 190, 'Veg Starters',    true, 301),
  ('Gobi Chilli',                     170, 'Veg Starters',    true, 302),
  ('Gobi 65',                         170, 'Veg Starters',    true, 303),
  ('Veg Manchurian',                  199, 'Veg Starters',    true, 304),
  ('Veg 65',                          199, 'Veg Starters',    true, 305),
  ('Veg Chilli',                      189, 'Veg Starters',    true, 306),
  ('Veg Sezwan',                      189, 'Veg Starters',    true, 307),
  ('Chilli Mushroom',                 189, 'Veg Starters',    true, 308),
  ('Mushroom 65',                     189, 'Veg Starters',    true, 309),
  ('Mushroom Manchurian',             189, 'Veg Starters',    true, 310),
  ('Pepper Mushroom',                 189, 'Veg Starters',    true, 311),
  ('Sezwan Mushroom',                 229, 'Veg Starters',    true, 312),
  ('Babycorn Majestic',               199, 'Veg Starters',    true, 313),
  ('Babycorn 555',                    199, 'Veg Starters',    true, 314),
  ('Babycorn Garlic',                 219, 'Veg Starters',    true, 315),
  ('Paneer 65',                       189, 'Veg Starters',    true, 316),
  ('Chilli Paneer',                   189, 'Veg Starters',    true, 317),
  ('Paneer Manchurian',               189, 'Veg Starters',    true, 318),
  ('Paneer Roast',                    199, 'Veg Starters',    true, 319),
  ('Paneer Majestic',                 199, 'Veg Starters',    true, 320),
  ('Highway Delite (Veg)',            229, 'Veg Starters',    true, 321),
  -- Soups
  ('Veg Manchow Soup',                 99, 'Soups',           true, 401),
  ('Chicken Manchow Soup',            129, 'Soups',           true, 402),
  ('Hot N Sour Soup',                 119, 'Soups',           true, 403),
  ('Chicken Hot N Sour Soup',         119, 'Soups',           true, 404),
  ('Sweet Corn Soup',                 129, 'Soups',           true, 405),
  -- Biryanis
  ('Mixed Biryani',                   299, 'Biryanis',        true, 501),
  ('Mixed Mughlai Biryani',           329, 'Biryanis',        true, 502),
  ('Pot Biryani',                     350, 'Biryanis',        true, 503),
  ('Kheema Biryani',                  369, 'Biryanis',        true, 504),
  ('Highway Delite Spl Biryani',      399, 'Biryanis',        true, 505),
  ('Baby Corn Biryani',               219, 'Biryanis',        true, 506),
  ('Veg Mixed Biryani',               249, 'Biryanis',        true, 507),
  -- Fried Rice
  ('Chicken Fried Rice',              179, 'Fried Rice',      true, 601),
  ('Spl Chicken Fried Rice',          199, 'Fried Rice',      true, 602),
  ('Egg Fried Rice',                  159, 'Fried Rice',      true, 603),
  ('Double Egg Fried Rice',           169, 'Fried Rice',      true, 604),
  ('Chicken Sezwan Fried Rice',       199, 'Fried Rice',      true, 605),
  ('Mutton Fried Rice',               289, 'Fried Rice',      true, 606),
  ('Spl Mutton Fried Rice',           319, 'Fried Rice',      true, 607),
  ('Spl Highway Delite Fried Rice',   259, 'Fried Rice',      true, 608),
  -- Veg Fried Rice
  ('Veg Fried Rice',                  139, 'Veg Fried Rice',  true, 701),
  ('Spl Veg Fried Rice',              169, 'Veg Fried Rice',  true, 702),
  ('Babycorn Fried Rice',             159, 'Veg Fried Rice',  true, 703),
  ('Spl Babycorn Fried Rice',         189, 'Veg Fried Rice',  true, 704),
  ('Mushroom Fried Rice',             189, 'Veg Fried Rice',  true, 705),
  ('Veg Mix Fried Rice',              169, 'Veg Fried Rice',  true, 706),
  ('Veg Manchurian Fried Rice',       169, 'Veg Fried Rice',  true, 707)
ON CONFLICT (name) DO UPDATE
  SET price = EXCLUDED.price,
      category = EXCLUDED.category,
      sort_order = EXCLUDED.sort_order;

INSERT INTO public.menu_items (name, price, category, description, available, sort_order) VALUES
  ('Curd Rice',                        89, 'Rice',  'Served with pickle',     true, 801),
  ('Sambar Rice',                     119, 'Rice',  'Served with papad',      true, 802),
  ('Sambar Rice with Omlette',        189, 'Rice',  '',                       true, 803),
  ('Sambar Rice with Chicken Fry',    219, 'Rice',  '',                       true, 804)
ON CONFLICT (name) DO UPDATE
  SET price = EXCLUDED.price,
      category = EXCLUDED.category,
      description = EXCLUDED.description,
      sort_order = EXCLUDED.sort_order;
