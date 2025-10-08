# Google App Password Aanmaken - Stap voor Stap Gids

## Voor contact.manegeduiksehoef@gmail.com

### Stap 1: Inloggen op Google Account
1. Ga naar [accounts.google.com](https://accounts.google.com)
2. Log in met: `contact.manegeduiksehoef@gmail.com`
3. Voer het wachtwoord in

### Stap 2: 2-Factor Authenticatie Inschakelen (VERPLICHT)
**Dit is verplicht om App Passwords te kunnen gebruiken!**

1. Ga naar [Google Account Security](https://myaccount.google.com/security)
2. Klik op "2-Step Verification" (2-staps verificatie)
3. Volg de instructies om 2FA in te schakelen
4. Je kunt kiezen uit:
   - SMS naar telefoon
   - Google Authenticator app
   - Backup codes

### Stap 3: App Password Genereren
1. Ga terug naar [Google Account Security](https://myaccount.google.com/security)
2. Klik op "App passwords" (App-wachtwoorden)
   - Als je dit niet ziet, controleer of 2FA is ingeschakeld
3. Selecteer "Mail" als app type
4. Geef een naam op zoals "Manege Website Contactformulier"
5. Klik "Generate" (Genereren)
6. **KOPIEER HET 16-KARAKTER WACHTWOORD** (bijv: abcd efgh ijkl mnop)

### Stap 4: Environment Variabelen Instellen
Maak een `.env.local` bestand in je project root:

```env
GMAIL_USER=contact.manegeduiksehoef@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

**BELANGRIJK:** 
- Gebruik het wachtwoord ZONDER spaties
- Bewaar dit wachtwoord veilig
- Voeg `.env.local` toe aan `.gitignore`

### Stap 5: Testen
1. Start je development server: `npm run dev`
2. Ga naar `/contact`
3. Vul het formulier in en verstuur
4. Controleer of je een e-mail ontvangt op contact.manegeduiksehoef@gmail.com

## Troubleshooting

### "App passwords niet zichtbaar"
- Controleer of 2-Factor Authenticatie is ingeschakeld
- Wacht 24 uur na het inschakelen van 2FA

### "Invalid login"
- Controleer of je het juiste app-wachtwoord gebruikt
- Zorg dat er geen spaties in het wachtwoord staan
- Controleer of de e-mail correct is gespeld

### "Less secure app access"
- Gebruik App Passwords, niet "less secure apps"
- App Passwords zijn veiliger dan minder veilige apps

## Veiligheidstips
- Deel het app-wachtwoord nooit
- Gebruik het alleen voor deze website
- Je kunt het wachtwoord altijd intrekken in Google Account Security
- Maak een nieuw wachtwoord aan als je het verdenkt van misbruik




