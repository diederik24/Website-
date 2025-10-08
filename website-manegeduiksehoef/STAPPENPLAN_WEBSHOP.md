# 📋 STAPPENPLAN - Mee Hestar Webshop Live

## 🎯 DOEL: Webshop live in 3 uur

| Stap | Taak | Status | Tijd | Prioriteit | Notities |
|------|------|--------|------|------------|----------|
| **1** | **Database opzetten** | ⏳ NOG TE DOEN | 45 min | 🔴 Kritiek | Supabase database |
| **1.1** | Supabase account aanmaken | ⏳ NOG TE DOEN | 5 min | 🔴 Kritiek | https://supabase.com |
| **1.2** | Nieuwe project aanmaken | ⏳ NOG TE DOEN | 5 min | 🔴 Kritiek | Project naam: mee-hestar-webshop |
| **1.3** | Database tabellen maken | ⏳ NOG TE DOEN | 15 min | 🔴 Kritiek | Products, Orders, Customers |
| **1.4** | Product data migreren | ⏳ NOG TE DOEN | 15 min | 🔴 Kritiek | Van mock data naar database |
| **1.5** | Database connectie testen | ⏳ NOG TE DOEN | 5 min | 🔴 Kritiek | Verificatie |
| **2** | **Stripe betaling** | ⏳ NOG TE DOEN | 60 min | 🔴 Kritiek | Betalingsintegratie |
| **2.1** | Stripe account aanmaken | ⏳ NOG TE DOEN | 10 min | 🔴 Kritiek | https://stripe.com |
| **2.2** | Stripe keys ophalen | ⏳ NOG TE DOEN | 5 min | 🔴 Kritiek | Publishable & Secret key |
| **2.3** | Stripe package installeren | ⏳ NOG TE DOEN | 5 min | 🔴 Kritiek | `npm install stripe` |
| **2.4** | Checkout integratie | ⏳ NOG TE DOEN | 30 min | 🔴 Kritiek | API routes maken |
| **2.5** | Test betalingen | ⏳ NOG TE DOEN | 10 min | 🔴 Kritiek | Verificatie |
| **3** | **Vercel deployment** | ⏳ NOG TE DOEN | 30 min | 🔴 Kritiek | Live hosting |
| **3.1** | Vercel account aanmaken | ⏳ NOG TE DOEN | 5 min | 🔴 Kritiek | https://vercel.com |
| **3.2** | GitHub repository koppelen | ⏳ NOG TE DOEN | 5 min | 🔴 Kritiek | Code uploaden |
| **3.3** | Environment variables instellen | ⏳ NOG TE DOEN | 10 min | 🔴 Kritiek | Database & Stripe keys |
| **3.4** | Eerste deployment | ⏳ NOG TE DOEN | 10 min | 🔴 Kritiek | Live zetten |
| **4** | **Email notificaties** | ⏳ NOG TE DOEN | 30 min | 🟡 Hoog | Order bevestigingen |
| **4.1** | Resend account aanmaken | ⏳ NOG TE DOEN | 5 min | 🟡 Hoog | https://resend.com |
| **4.2** | Email templates maken | ⏳ NOG TE DOEN | 15 min | 🟡 Hoog | Order bevestiging |
| **4.3** | Email integratie | ⏳ NOG TE DOEN | 10 min | 🟡 Hoog | API routes |
| **5** | **SEO & Analytics** | ⏳ NOG TE DOEN | 35 min | 🟢 Gemiddeld | Optimalisatie |
| **5.1** | Meta tags toevoegen | ⏳ NOG TE DOEN | 15 min | 🟢 Gemiddeld | SEO optimalisatie |
| **5.2** | Google Analytics | ⏳ NOG TE DOEN | 10 min | 🟢 Gemiddeld | Tracking |
| **5.3** | Sitemap genereren | ⏳ NOG TE DOEN | 10 min | 🟢 Gemiddeld | SEO |

## 📊 VOORTGANG

### ⏳ NOG TE DOEN: 18 taken
### ✅ AFGEVINKT: 0 taken
### **TOTAAL: 18 taken**

## 🎯 TIJDSPLAN

| Fase | Tijd | Status |
|------|------|--------|
| **Database** | 45 min | ⏳ |
| **Betaling** | 60 min | ⏳ |
| **Deployment** | 30 min | ⏳ |
| **Email** | 30 min | ⏳ |
| **SEO** | 35 min | ⏳ |
| **TOTAAL** | **3 uur 20 min** | ⏳ |

## 🔗 HANDIGE LINKS

### 📊 **Database**
- [Supabase](https://supabase.com) - Gratis database
- [Supabase Docs](https://supabase.com/docs) - Documentatie

### 💳 **Betaling**
- [Stripe](https://stripe.com) - Betalingsverwerker
- [Stripe Docs](https://stripe.com/docs) - Integratie guide

### 🚀 **Hosting**
- [Vercel](https://vercel.com) - Gratis hosting
- [Vercel Docs](https://vercel.com/docs) - Deployment guide

### 📧 **Email**
- [Resend](https://resend.com) - Email service
- [Resend Docs](https://resend.com/docs) - Email API

### 📱 **Analytics**
- [Google Analytics](https://analytics.google.com) - Website tracking

## 💡 TIPS PER STAP

### **Stap 1: Database**
- Gebruik Supabase gratis tier (500MB)
- Maak tabellen: `products`, `orders`, `customers`
- Test connectie met Postman/Thunder Client

### **Stap 2: Stripe**
- Start met test mode
- Gebruik test credit card: 4242 4242 4242 4242
- Implementeer eerst checkout, dan webhook

### **Stap 3: Vercel**
- Koppel GitHub repository
- Zet environment variables
- Test deployment op preview URL

### **Stap 4: Email**
- Gebruik Resend gratis tier (100 emails/dag)
- Maak mooie HTML templates
- Test met eigen email

### **Stap 5: SEO**
- Voeg meta tags toe aan alle pagina's
- Maak Google Analytics account
- Test met Google PageSpeed Insights

## 🎉 SUCCES CRITERIA

### ✅ **Webshop is live als:**
- [ ] Database werkt (producten laden)
- [ ] Betalingen werken (test betaling)
- [ ] Website is online (vercel.app URL)
- [ ] Emails worden verzonden
- [ ] Admin werkt (login mogelijk)

### 🚀 **Bonus (optioneel):**
- [ ] Custom domain gekoppeld
- [ ] SSL certificaat actief
- [ ] Google Analytics tracking
- [ ] SEO optimalisatie
- [ ] Mobile app installatie

## 📝 NOTITIES

**Belangrijke bestanden om aan te passen:**
- `lib/database.ts` - Database connectie
- `app/api/checkout/route.ts` - Stripe integratie
- `app/api/orders/route.ts` - Order verwerking
- `app/api/email/route.ts` - Email verzending
- `app/layout.tsx` - Meta tags

**Environment variables nodig:**
```
DATABASE_URL=supabase://...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
RESEND_API_KEY=re_...
NEXT_PUBLIC_GA_ID=G-...
```

---

**📁 Bestandspad:** `STAPPENPLAN_WEBSHOP.md`
**📅 Laatste update:** Vandaag
**⏱️ Geschatte tijd:** 3 uur 20 minuten
