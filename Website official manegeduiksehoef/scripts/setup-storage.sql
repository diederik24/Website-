-- Setup script voor Supabase Storage
-- Voer dit script uit in je Supabase SQL editor

-- Maak de storage bucket aan voor product afbeeldingen
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Policy voor het uploaden van afbeeldingen (anoniem toegestaan voor demo)
CREATE POLICY "Allow public uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'product-images');

-- Policy voor het lezen van afbeeldingen (publiek toegankelijk)
CREATE POLICY "Allow public reads" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

-- Policy voor het verwijderen van afbeeldingen (anoniem toegestaan voor demo)
CREATE POLICY "Allow public deletes" ON storage.objects
FOR DELETE USING (bucket_id = 'product-images');

-- Controleer of de bucket is aangemaakt
SELECT * FROM storage.buckets WHERE id = 'product-images';
