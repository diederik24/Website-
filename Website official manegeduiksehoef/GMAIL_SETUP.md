# Gmail Setup voor Contactformulier

## Stappen om Gmail te configureren voor het contactformulier:

### 1. Gmail Account voorbereiden
- Zorg dat je een Gmail account hebt (bijv. info@manegeduiksehoef.nl)
- Schakel 2-factor authenticatie in op je Google account

### 2. App-specifiek wachtwoord genereren
1. Ga naar [Google Account Security](https://myaccount.google.com/security)
2. Klik op "App passwords" (App-wachtwoorden)
3. Selecteer "Mail" als app
4. Kopieer het gegenereerde 16-karakter wachtwoord

### 3. Environment variabelen instellen
Maak een `.env.local` bestand in de root van je project met:

```env
# Gmail Configuration
GMAIL_USER=info@manegeduiksehoef.nl
GMAIL_APP_PASSWORD=your-16-character-app-password
```

### 4. Testen
- Start de development server: `npm run dev`
- Ga naar `/contact` en test het formulier
- Controleer of je een e-mail ontvangt

## Belangrijke opmerkingen:
- Gebruik NOOIT je gewone Gmail wachtwoord
- Het app-wachtwoord is 16 karakters zonder spaties
- Zorg dat `.env.local` in je `.gitignore` staat
- Voor productie, stel deze variabelen in op je hosting platform

## Troubleshooting:
- **"Invalid login"**: Controleer je app-wachtwoord
- **"Less secure app access"**: Gebruik app-wachtwoorden in plaats van minder veilige apps
- **"Connection timeout"**: Controleer je internetverbinding




