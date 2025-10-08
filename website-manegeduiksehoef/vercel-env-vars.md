# 🔧 Vercel Environment Variables

Voeg deze environment variables toe in Vercel Dashboard → Settings → Environment Variables:

## 📊 Supabase
```
NEXT_PUBLIC_SUPABASE_URL=https://hflvmzturkgaopxndxmc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmbHZtenR1cmtnYW9weG5keG1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3NDM0MjksImV4cCI6MjA3MjMxOTQyOX0.tm7EAtABjRY26yF8OD4bKZgAfNfQTzm3RZ-75stZVfY
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmbHZtenR1cmtnYW9weG5keG1jIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Njc0MzQyOSwiZXhwIjoyMDcyMzE5NDI5fQ.kXbtt033-wa56vvYTr2t-drlv72tiaT2vmi8oeK8WCE
```

## 📧 Email Services
```
# Resend (backup)
RESEND_API_KEY=re_A66ZAyq1_DX87bBH61ouhMN9Xft7TdpNs

# Gmail (primary)
GMAIL_USER=manegeduiksehoef.webshop@gmail.com
GMAIL_APP_PASSWORD=nwit wqfy bnyt opgs
ADMIN_EMAIL=shop@manegeduiksehoef.nl
```

## 💳 Mollie Payments
```
MOLLIE_API_KEY=test_MgJhBknaqhhEFqGyQAn6WUmaTGs8uc
MOLLIE_PROFILE_ID=pfl_Mw2MYs7qeb
MOLLIE_WEBHOOK_URL=https://jouw-domein.nl/api/webhooks/mollie
MOLLIE_WEBHOOK_SECRET=vuk2UK44cHeAHVzDFsvNCfuBjmKPf4Rj
```

## 🌐 Base URL
```
NEXT_PUBLIC_BASE_URL=https://jouw-domein.nl
```

## ⚠️ Belangrijke Opmerkingen:

1. **MOLLIE_WEBHOOK_URL**: Verander `https://1a4343953e81.ngrok-free.app` naar je echte domein
2. **NEXT_PUBLIC_BASE_URL**: Verander naar je echte domein
3. **MOLLIE_API_KEY**: Je gebruikt nu de test key - voor productie moet je de live key gebruiken
4. **Environment**: Zet alle variabelen op "Production" in Vercel

## 🔄 Na Domain Setup:
Wanneer je je custom domain hebt ingesteld, update dan:
- `MOLLIE_WEBHOOK_URL=https://jouw-domein.nl/api/webhooks/mollie`
- `NEXT_PUBLIC_BASE_URL=https://jouw-domein.nl`
