-- Manege Duikse Hoef Database Setup
-- Kopieer en plak deze code in de Supabase SQL Editor

-- Paarden tabel
CREATE TABLE IF NOT EXISTS paarden (
  id SERIAL PRIMARY KEY,
  naam VARCHAR(100) NOT NULL,
  ras VARCHAR(100) NOT NULL,
  leeftijd VARCHAR(50),
  geslacht VARCHAR(20) CHECK (geslacht IN ('Merrie', 'Ruin', 'Hengst')),
  kleur VARCHAR(50),
  beschrijving TEXT,
  foto VARCHAR(500),
  eigenschappen TEXT[], -- Array van eigenschappen
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Foto's tabel
CREATE TABLE IF NOT EXISTS fotos (
  id SERIAL PRIMARY KEY,
  naam VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  categorie VARCHAR(100) DEFAULT 'Algemeen',
  beschrijving TEXT,
  upload_datum DATE DEFAULT CURRENT_DATE,
  grootte VARCHAR(50),
  dimensies VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Page content tabel
CREATE TABLE IF NOT EXISTS page_content (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT,
  last_modified DATE DEFAULT CURRENT_DATE,
  status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('published', 'draft')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default paarden data
INSERT INTO paarden (naam, ras, leeftijd, geslacht, kleur, beschrijving, foto, eigenschappen) VALUES
('Bella', 'Fries', '8 jaar', 'Merrie', 'Zwart', 'Een lieve en betrouwbare merrie, perfect voor beginners en gevorderden.', '/paarden/bella.jpg', ARRAY['Rustig', 'Betrouwbaar', 'Beginnervriendelijk']),
('Storm', 'KWPN', '12 jaar', 'Ruin', 'Bruin', 'Een ervaren springpaard met veel talent en een geweldig karakter.', '/paarden/storm.jpg', ARRAY['Springtalent', 'Energiek', 'Gevorderden']),
('Luna', 'Haflinger', '6 jaar', 'Merrie', 'Vos', 'Een vriendelijke en sociale merrie die graag met kinderen werkt.', '/paarden/luna.jpg', ARRAY['Kindervriendelijk', 'Sociaal', 'Rustig']),
('Thunder', 'Arabier', '10 jaar', 'Hengst', 'Schimmel', 'Een elegante hengst met veel uitstraling en een edel karakter.', '/paarden/thunder.jpg', ARRAY['Elegant', 'Uitstraling', 'Gevorderden']),
('Rosie', 'Shetlander', '15 jaar', 'Merrie', 'Bruin', 'Een ervaren pony die perfect is voor kinderen en kleine ruiters.', '/paarden/rosie.jpg', ARRAY['Kinderpony', 'Ervaren', 'Betrouwbaar']),
('Maximus', 'Warmbloed', '9 jaar', 'Ruin', 'Zwart', 'Een veelzijdige ruin die zowel dressuur als springen beheerst.', '/paarden/maximus.jpg', ARRAY['Veelzijdig', 'Dressuur', 'Springen']),
('Sapphire', 'Fjord', '7 jaar', 'Merrie', 'Bruin', 'Een sterke en betrouwbare Fjord met een prachtige manen.', '/paarden/sapphire.jpg', ARRAY['Sterk', 'Betrouwbaar', 'Uniek']),
('Apollo', 'Andalusier', '11 jaar', 'Hengst', 'Wit', 'Een majestueuze Andalusier met veel temperament en elegantie.', '/paarden/apollo.jpg', ARRAY['Majestueus', 'Temperament', 'Elegant']),
('Willow', 'Connemara', '5 jaar', 'Merrie', 'Grijs', 'Een jonge en energieke Connemara pony met veel springtalent.', '/paarden/willow.jpg', ARRAY['Jong', 'Energiek', 'Springtalent']),
('Duke', 'Holsteiner', '13 jaar', 'Ruin', 'Bruin', 'Een ervaren Holsteiner met uitstekende springeigenschappen.', '/paarden/duke.jpg', ARRAY['Ervaren', 'Springen', 'Betrouwbaar']),
('Ruby', 'Ijslander', '9 jaar', 'Merrie', 'Vos', 'Een veelzijdige Ijslander met unieke gangen en een vriendelijk karakter.', '/paarden/ruby.jpg', ARRAY['Veelzijdig', 'Unieke gangen', 'Vriendelijk']),
('Phoenix', 'Trakehner', '14 jaar', 'Ruin', 'Zwart', 'Een edele Trakehner met veel ervaring in dressuur en springen.', '/paarden/phoenix.jpg', ARRAY['Edel', 'Ervaren', 'Dressuur']),
('Misty', 'Welsh Pony', '8 jaar', 'Merrie', 'Schimmel', 'Een lieve Welsh pony die perfect is voor kinderen en beginners.', '/paarden/misty.jpg', ARRAY['Lief', 'Kinderpony', 'Beginnervriendelijk']),
('Zeus', 'Lipizzaner', '16 jaar', 'Hengst', 'Wit', 'Een klassieke Lipizzaner met veel ervaring in dressuur en shows.', '/paarden/zeus.jpg', ARRAY['Klassiek', 'Ervaren', 'Dressuur']),
('Stella', 'Tinker', '10 jaar', 'Merrie', 'Bont', 'Een opvallende Tinker met een prachtig bont patroon en rustig karakter.', '/paarden/stella.jpg', ARRAY['Opvallend', 'Bont', 'Rustig']);

-- Insert default page content
INSERT INTO page_content (id, title, description, content, status) VALUES
('homepage', 'Homepage', 'Hoofdpagina van de website', 'Welkom bij Manege Duikse Hoef - uw partner voor professionele rijlessen en uitstekende pensionstalling.', 'published'),
('lessen', 'Lessen', 'Rijlessen en prijzen', 'Onze lessen zijn geschikt voor alle niveaus, van beginners tot gevorderden. We bieden dressuur, springen, basislessen en specialisatie in IJslandse paarden.', 'published'),
('over-ons', 'Over Ons', 'Informatie over de manege', 'Manege Duikse Hoef is een warme, professionele manege waar paard en ruiter centraal staan.', 'published'),
('contact', 'Contact', 'Contactgegevens en locatie', 'Neem contact met ons op voor meer informatie over onze lessen en pensionstalling.', 'published'),
('pensionstalling', 'Pensionstalling', 'Pensionstalling voor uw paard', 'Onze pensionstalling biedt uw paard een veilige en comfortabele omgeving.', 'published');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_paarden_naam ON paarden(naam);
CREATE INDEX IF NOT EXISTS idx_paarden_ras ON paarden(ras);
CREATE INDEX IF NOT EXISTS idx_fotos_categorie ON fotos(categorie);
CREATE INDEX IF NOT EXISTS idx_page_content_status ON page_content(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_paarden_updated_at BEFORE UPDATE ON paarden FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_page_content_updated_at BEFORE UPDATE ON page_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) for better security
ALTER TABLE paarden ENABLE ROW LEVEL SECURITY;
ALTER TABLE fotos ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Allow public read access to paarden" ON paarden FOR SELECT USING (true);
CREATE POLICY "Allow public read access to fotos" ON fotos FOR SELECT USING (true);
CREATE POLICY "Allow public read access to page_content" ON page_content FOR SELECT USING (true);

-- Create policies to allow authenticated users to modify data
CREATE POLICY "Allow authenticated users to modify paarden" ON paarden FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to modify fotos" ON fotos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to modify page_content" ON page_content FOR ALL USING (auth.role() = 'authenticated');





