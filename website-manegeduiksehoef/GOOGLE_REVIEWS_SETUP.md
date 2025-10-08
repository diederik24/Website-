# Google Reviews Setup voor Manege Duikse Hoef

## Overzicht
Deze handleiding legt uit hoe je echte Google Reviews kunt integreren in de website van Manege Duikse Hoef.

## Stappen om Google Reviews te implementeren

### 1. Google Cloud Console Setup

1. Ga naar [Google Cloud Console](https://console.cloud.google.com/)
2. Maak een nieuw project aan of selecteer een bestaand project
3. Schakel de **Places API** in:
   - Ga naar "APIs & Services" > "Library"
   - Zoek naar "Places API"
   - Klik op "Enable"

### 2. API Key aanmaken

1. Ga naar "APIs & Services" > "Credentials"
2. Klik op "Create Credentials" > "API Key"
3. Kopieer de API key
4. **BELANGRIJK**: Beperk de API key voor veiligheid:
   - Klik op de API key om deze te bewerken
   - Onder "Application restrictions" selecteer "HTTP referrers"
   - Voeg je website domein toe (bijv. `https://manegeduiksehoef.nl/*`)
   - Onder "API restrictions" selecteer "Restrict key" en kies "Places API"

### 3. Google Place ID vinden

1. Ga naar [Google Maps](https://maps.google.com)
2. Zoek naar "Manege Duikse Hoef" op je locatie
3. Klik op de locatie in de zoekresultaten
4. In de URL vind je de Place ID, of:
   - Klik op "Share" > "Embed a map"
   - In de embed code vind je de Place ID (begint meestal met "ChIJ")

**Alternatief**: Gebruik de [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)

### 4. Environment Variabelen instellen

Voeg de volgende variabelen toe aan je `.env.local` bestand:

```env
# Google Reviews Integration
NEXT_PUBLIC_GOOGLE_PLACE_ID=ChIJ... (jouw Place ID hier)
NEXT_PUBLIC_GOOGLE_API_KEY=AIza... (jouw API key hier)
```

### 5. Testen

1. Start de development server: `npm run dev`
2. Ga naar de home pagina
3. Scroll naar de "Wat Onze Ruiters Zeggen" sectie
4. Je zou nu echte Google Reviews moeten zien scrollen

## Troubleshooting

### Reviews worden niet geladen
- Controleer of de API key correct is ingesteld
- Controleer of de Places API is ingeschakeld
- Controleer of de Place ID correct is
- Kijk in de browser console voor error berichten

### CORS Errors
- Zorg ervoor dat je website domein is toegevoegd aan de HTTP referrers restrictie
- De API key moet beperkt zijn tot je eigen domein

### Rate Limits
- Google Places API heeft rate limits
- Voor productie gebruik overweeg een caching mechanisme

## Kosten

- Google Places API heeft een gratis tier met 1000 requests per maand
- Daarna betaal je per request
- Voor een kleine manege is de gratis tier meestal voldoende

## Fallback Systeem

Als de Google API niet beschikbaar is of faalt, zal de website automatisch terugvallen op mock reviews. Dit zorgt ervoor dat de website altijd goed functioneert, ook zonder API configuratie.

## Ondersteuning

Voor vragen over de implementatie, neem contact op met de ontwikkelaar.


