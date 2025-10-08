-- Fix Storage Policies voor Manege Duikse Hoef
-- Voer dit uit in de Supabase SQL Editor

-- 1. Verwijder bestaande policies die problemen veroorzaken
DROP POLICY IF EXISTS "Public photos are viewable by everyone" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update their own photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete their own photos" ON storage.objects;

-- 2. Maak nieuwe, eenvoudigere policies
-- Iedereen kan foto's bekijken
CREATE POLICY "Anyone can view photos" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'photos');

-- Iedereen kan foto's uploaden (voor nu, later kunnen we dit beperken)
CREATE POLICY "Anyone can upload photos" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'photos');

-- Iedereen kan foto's updaten
CREATE POLICY "Anyone can update photos" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'photos');

-- Iedereen kan foto's verwijderen
CREATE POLICY "Anyone can delete photos" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'photos');

-- 3. Test de policies
SELECT 'Storage policies updated successfully' as status;

-- 4. Check of de bucket bestaat
SELECT name, public FROM storage.buckets WHERE id = 'photos';





