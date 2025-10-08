# 🚀 Deployment Guide - Manege Duiksehoef Webshop

## 📋 Pre-Deployment Checklist

### ✅ Code Ready
- [x] Next.js config geoptimaliseerd voor productie
- [x] Security headers toegevoegd
- [x] Minification ingeschakeld
- [x] Environment variables voorbereid

### ✅ Database Ready
- [x] Supabase project actief
- [x] Database schema geïmplementeerd
- [x] Producten geïmporteerd
- [x] RLS policies geconfigureerd

### ✅ Email Ready
- [x] Gmail SMTP geconfigureerd
- [x] Email templates getest
- [x] Test email functionaliteit werkend

## 🌐 Domain Setup (Strato)

### DNS Records toevoegen in Strato:
```
Type: A
Name: @
Value: 76.76.19.61
TTL: 3600

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

## 🔧 Vercel Environment Variables

Voeg deze toe in Vercel Dashboard → Settings → Environment Variables:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://hflvmzturkgaopxndxmc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=jouw_anon_key

# Gmail
GMAIL_USER=manegeduiksehoef.webshop@gmail.com
GMAIL_APP_PASSWORD=jouw_app_password

# Admin
ADMIN_EMAIL=shop@manegeduiksehoef.nl

# Mollie (optioneel)
MOLLIE_API_KEY=jouw_mollie_key

# Base URL (wordt automatisch ingesteld)
NEXT_PUBLIC_BASE_URL=https://jouw-domein.nl
```

## 📱 Post-Deployment Tests

### 1. Website Functionaliteit
- [ ] Homepage laadt correct
- [ ] Producten worden getoond
- [ ] Winkelwagen werkt
- [ ] Checkout proces werkt

### 2. Admin Panel
- [ ] Admin login werkt
- [ ] Dashboard toont statistieken
- [ ] Orders kunnen worden beheerd
- [ ] Producten kunnen worden beheerd
- [ ] Email functionaliteit werkt

### 3. Email Tests
- [ ] Test email verzenden
- [ ] Order confirmation emails
- [ ] Pickup ready emails

### 4. Performance
- [ ] Website laadt snel (< 3 seconden)
- [ ] Images worden geoptimaliseerd
- [ ] Mobile responsive

## 🔍 Troubleshooting

### DNS Issues
- Wacht 24-48 uur voor DNS propagatie
- Gebruik `nslookup jouw-domein.nl` om te controleren

### SSL Issues
- Vercel activeert automatisch SSL
- Controleer in Vercel dashboard → Domains

### Database Issues
- Controleer Supabase project status
- Verificeer environment variables

### Email Issues
- Controleer Gmail app password
- Test via admin panel → Test Email

## 📞 Support

- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Supabase**: [supabase.com/docs](https://supabase.com/docs)
- **Strato**: [strato.nl/support](https://strato.nl/support)

---

**🎯 Doel**: Live webshop met custom domain en volledige functionaliteit
**⏱️ Geschatte tijd**: 2-4 uur (inclusief DNS propagatie)
