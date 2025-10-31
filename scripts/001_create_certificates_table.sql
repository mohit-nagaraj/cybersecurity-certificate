-- Create certificates table for storing certificate codes and names
CREATE TABLE IF NOT EXISTS public.certificates (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on certificates table
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read certificates (for verification)
CREATE POLICY "Allow anyone to view certificates" ON public.certificates
  FOR SELECT
  USING (true);

-- Allow anonymous inserts (for generating certificates)
CREATE POLICY "Allow anonymous to insert certificates" ON public.certificates
  FOR INSERT
  WITH CHECK (true);
