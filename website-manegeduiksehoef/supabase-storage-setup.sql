-- Supabase Storage Setup voor Manege Duikse Hoef
-- Voer dit uit in de Supabase SQL Editor

-- 1. Maak een storage bucket voor foto's
INSERT INTO storage.buckets (id, name, public) 
VALUES ('photos', 'photos', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Maak policies voor de photos bucket
-- Iedereen kan foto's bekijken (public bucket)
CREATE POLICY "Public photos are viewable by everyone" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'photos');

-- Authenticated users kunnen foto's uploaden
CREATE POLICY "Authenticated users can upload photos" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'photos' 
  AND auth.role() = 'authenticated'
);

-- Authenticated users kunnen hun eigen foto's updaten
CREATE POLICY "Authenticated users can update their own photos" 
ON storage.objects FOR UPDATE 
USING (
  bucket_id = 'photos' 
  AND auth.role() = 'authenticated'
);

-- Authenticated users kunnen hun eigen foto's verwijderen
CREATE POLICY "Authenticated users can delete their own photos" 
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'photos' 
  AND auth.role() = 'authenticated'
);

-- 3. Update de paarden tabel om de nieuwe kolommen te hebben
-- (Dit wordt automatisch gedaan door de schema.sql, maar voor de zekerheid)
ALTER TABLE paarden 
ADD COLUMN IF NOT EXISTS hoofdfoto VARCHAR(500),
ADD COLUMN IF NOT EXISTS foto_urls TEXT[];

-- 4. Update bestaande records om de oude 'foto' kolom naar 'hoofdfoto' te kopiëren
UPDATE paarden 
SET hoofdfoto = foto, foto_urls = ARRAY[foto] 
WHERE hoofdfoto IS NULL AND foto IS NOT NULL;

-- 5. Maak een functie om de hoofdfoto automatisch in te stellen
CREATE OR REPLACE FUNCTION set_hoofdfoto()
RETURNS TRIGGER AS $$
BEGIN
  -- Als er foto's zijn en geen hoofdfoto, zet de eerste foto als hoofdfoto
  IF NEW.foto_urls IS NOT NULL AND array_length(NEW.foto_urls, 1) > 0 AND NEW.hoofdfoto IS NULL THEN
    NEW.hoofdfoto := NEW.foto_urls[1];
  END IF;
  
  -- Als er geen foto's zijn, zet hoofdfoto op NULL
  IF NEW.foto_urls IS NULL OR array_length(NEW.foto_urls, 1) = 0 THEN
    NEW.hoofdfoto := NULL;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Maak een trigger om automatisch de hoofdfoto in te stellen
DROP TRIGGER IF EXISTS trigger_set_hoofdfoto ON paarden;
CREATE TRIGGER trigger_set_hoofdfoto
  BEFORE INSERT OR UPDATE ON paarden
  FOR EACH ROW
  EXECUTE FUNCTION set_hoofdfoto();

-- 7. Test de setup
SELECT 'Storage bucket created successfully' as status;
SELECT 'Policies created successfully' as status;
SELECT 'Database schema updated successfully' as status;





