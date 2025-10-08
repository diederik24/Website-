# 🚀 Supabase Setup voor Mee Hestar Webshop

## 📋 Stap 1: Supabase Project Aanmaken

### 1.1 Ga naar Supabase
- Open [https://supabase.com](https://supabase.com)
- Klik op "Start your project" of "Sign In"

### 1.2 Nieuw Project Aanmaken
- Klik op "New Project"
- Kies je organisatie
- Project naam: `mee-hestar-webshop`
- Database wachtwoord: Kies een sterk wachtwoord (bewaar dit!)
- Region: Kies `West Europe (Amsterdam)` voor beste performance
- Klik "Create new project"

### 1.3 Wacht tot Project Klaar Is
- Dit duurt ongeveer 2-3 minuten
- Je krijgt een groene vinkje als het klaar is

## 🔑 Stap 2: API Keys Ophalen

### 2.1 Ga naar Project Settings
- In je project dashboard, klik op het tandwiel icoon (⚙️)
- Klik op "API"

### 2.2 Kopieer de Keys
- **Project URL**: Kopieer de `Project URL`
- **Anon Public Key**: Kopieer de `anon public` key

## 📁 Stap 3: Environment Variables Instellen

### 3.1 Maak .env.local Bestand
Maak een bestand aan genaamd `.env.local` in je project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=jouw_project_url_hier
NEXT_PUBLIC_SUPABASE_ANON_KEY=jouw_anon_key_hier
```

### 3.2 Vervang de Placeholders
- Vervang `jouw_project_url_hier` met je Project URL
- Vervang `jouw_anon_key_hier` met je Anon Public Key

## 🗄️ Stap 4: Database Tabellen Aanmaken

### 4.1 Ga naar SQL Editor
- In je Supabase dashboard, klik op "SQL Editor" in de linker sidebar

### 4.2 Voer Schema Uit
- Klik op "New Query"
- Kopieer de inhoud van `database/schema.sql`
- Plak het in de SQL editor
- Klik op "Run" (▶️)

### 4.3 Controleer Tabellen
- Ga naar "Table Editor" in de linker sidebar
- Je zou nu moeten zien: `products`, `orders`, `customers`

## 📊 Stap 5: Data Importeren

### 5.1 Run Database Setup Script
```bash
node scripts/setup-database.js
```

### 5.2 Controleer Resultaat
- Je zou moeten zien: "✅ Database setup voltooid!"
- Ga naar "Table Editor" → "products" om te zien of de data er is

## ✅ Stap 6: Test Database Connectie

### 6.1 Start Development Server
```bash
npm run dev
```

### 6.2 Test Webshop
- Ga naar [http://localhost:3000](http://localhost:3000)
- Controleer of producten laden
- Test admin login

## 🔧 Troubleshooting

### ❌ "Database connectie mislukt"
- Controleer of je `.env.local` bestand correct is
- Controleer of je Supabase project actief is
- Controleer of je API keys correct zijn gekopieerd

### ❌ "Table does not exist"
- Controleer of je `schema.sql` hebt uitgevoerd
- Ga naar "Table Editor" om te zien welke tabellen bestaan

### ❌ "Permission denied"
- Controleer of je RLS policies correct zijn ingesteld
- Controleer of je API key de juiste rechten heeft

## 🎯 Volgende Stap

Als alles werkt, ga je door naar **Stap 2: Stripe Betaling Integratie**!

## 📞 Hulp Nodig?

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [Supabase GitHub](https://github.com/supabase/supabase)

---

**⏱️ Geschatte tijd: 15-20 minuten**
**🎯 Doel: Werkende database met producten**
