-- Werkende Storage Setup voor Manege Duikse Hoef
-- Voer dit uit in de Supabase SQL Editor

-- 1. Maak storage bucket voor foto's (als deze nog niet bestaat)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('photos', 'photos', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Maak eenvoudige policies voor de photos bucket
-- Iedereen kan foto's bekijken
CREATE POLICY "Public photos are viewable by everyone" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'photos');

-- Iedereen kan foto's uploaden
CREATE POLICY "Public photos are uploadable by everyone" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'photos');

-- Iedereen kan foto's updaten
CREATE POLICY "Public photos are updatable by everyone" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'photos');

-- Iedereen kan foto's verwijderen
CREATE POLICY "Public photos are deletable by everyone" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'photos');

-- 3. Test de setup
SELECT 'Storage bucket created successfully' as status;
SELECT name, public FROM storage.buckets WHERE id = 'photos';





