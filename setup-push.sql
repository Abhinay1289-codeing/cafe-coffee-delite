-- Table to store FCM tokens for admin devices
CREATE TABLE IF NOT EXISTS public.admin_devices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    fcm_token TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.admin_devices ENABLE ROW LEVEL SECURITY;

-- Allow devices to register their tokens
CREATE POLICY "Allow public insert of admin devices"
    ON public.admin_devices
    FOR INSERT
    WITH CHECK (true);

-- Allow devices to update their tokens if needed
CREATE POLICY "Allow public update of admin devices"
    ON public.admin_devices
    FOR UPDATE
    USING (true)
    WITH CHECK (true);

-- Allow reading devices (mostly for edge functions, but edge functions bypass RLS anyway)
CREATE POLICY "Allow public select of admin devices"
    ON public.admin_devices
    FOR SELECT
    USING (true);
