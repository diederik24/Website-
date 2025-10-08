-- Eenvoudige Storage Setup voor Manege Duikse Hoef
-- Voer dit uit in de Supabase SQL Editor

-- 1. Maak storage bucket voor foto's (als deze nog niet bestaat)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('photos', 'photos', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Schakel RLS uit voor storage.objects (tijdelijk voor testing)
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- 3. Test of de bucket bestaat
SELECT 'Storage bucket created successfully' as status;
SELECT name, public FROM storage.buckets WHERE id = 'photos';





