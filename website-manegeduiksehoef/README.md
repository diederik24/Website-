# Mee Hestar Webshop

Een moderne webshop voor truien gebouwd met Next.js, TypeScript, Tailwind CSS en Framer Motion.

## 🚀 Features

- **Responsive Design**: Volledig responsive layout voor alle apparaten
- **Product Catalogus**: Overzicht van alle truien met filters en zoekfunctie
- **Product Details**: Gedetailleerde productpagina's met maat- en kleurselectie
- **Winkelwagen**: Volledig functionele winkelwagen met state management
- **Checkout Proces**: Complete checkout flow met formulier validatie
- **Animaties**: Vloeiende animaties met Framer Motion
- **SEO Optimized**: Meta tags en structured data
- **TypeScript**: Volledig getypeerde codebase
- **Modern UI**: Gebouwd met Tailwind CSS voor een moderne uitstraling

## 🛠️ Technologieën

- **Next.js 14** - React framework met App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animatie library
- **Lucide React** - Icon library
- **Context API** - State management voor winkelwagen

## 📦 Installatie

1. **Clone de repository**
   ```bash
   git clone <repository-url>
   cd mee-hestar-webshop
   ```

2. **Installeer dependencies**
   ```bash
   npm install
   ```

3. **Start de development server**
   ```bash
   npm run dev
   ```

4. **Open je browser**
   Navigeer naar [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structuur

```
mee-hestar-webshop/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── shop/              # Shop pages
│   ├── product/           # Product pages
│   ├── cart/              # Cart page
│   ├── checkout/          # Checkout page
│   ├── about/             # About page
│   └── contact/           # Contact page
├── components/            # Reusable components
│   ├── Navbar.tsx         # Navigation component
│   ├── Footer.tsx         # Footer component
│   └── ProductCard.tsx    # Product card component
├── context/               # React Context
│   └── CartContext.tsx    # Shopping cart state
├── data/                  # Static data
│   └── products.ts        # Product data
└── public/                # Static assets
```

## 🎨 Design Systeem

### Kleuren
- **Primary**: `#2D6A4F` (Donkergroen)
- **Secondary**: `#1B4332` (Donkerder groen)
- **Accent**: `#40916C` (Lichtgroen)

### Typografie
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Componenten
- **Buttons**: `.btn-primary` en `.btn-secondary`
- **Cards**: `.card` class voor consistente styling
- **Forms**: Gestandaardiseerde form styling

## 📱 Pagina's

### Homepage (`/`)
- Hero banner met call-to-action
- Feature sectie
- Uitgelichte producten (producten sectie met #products anchor)
- Over ons sectie

### Product Detail (`/product/[id]`)
- Grote productafbeelding
- Product informatie
- Maat- en kleurselectie
- Add to cart functionaliteit

### Winkelwagen (`/cart`)
- Overzicht van producten
- Quantity controls
- Prijs berekening
- Checkout link

### Checkout (`/checkout`)
- Klantgegevens formulier
- Verzendadres
- Betalingsgegevens
- Order overzicht

### Over Ons (`/about`)
- Bedrijfsgeschiedenis
- Team informatie
- Waarden en missie

### Contact (`/contact`)
- Contact formulier
- Contactgegevens
- FAQ sectie

## 🛒 Winkelwagen Functionaliteit

De winkelwagen gebruikt React Context voor state management:

- **Toevoegen**: Producten toevoegen met maat en hoeveelheid
- **Bijwerken**: Quantity aanpassen
- **Verwijderen**: Producten uit winkelwagen halen
- **Persistentie**: Winkelwagen wordt opgeslagen in localStorage
- **Berekening**: Automatische prijsberekening met verzendkosten

## 🎭 Animaties

Framer Motion wordt gebruikt voor:
- Page transitions
- Component entrance animations
- Hover effects
- Loading states
- Cart interactions

## 📱 Responsive Design

De webshop is volledig responsive met breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Aanbevolen)
1. Push code naar GitHub
2. Verbind repository met Vercel
3. Deploy automatisch

### Andere platforms
```bash
npm run build
npm start
```

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build voor productie
- `npm start` - Start productie server
- `npm run lint` - Run ESLint

## 📝 Toekomstige Verbeteringen

- [ ] User authentication
- [ ] Wishlist functionaliteit
- [ ] Product reviews en ratings
- [ ] Advanced filtering
- [ ] Payment gateway integratie
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Analytics tracking

## 🤝 Bijdragen

1. Fork het project
2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je changes (`git commit -m 'Add some AmazingFeature'`)
4. Push naar de branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

## 📄 Licentie

Dit project is gelicenseerd onder de MIT License.

## 📞 Contact

Voor vragen of ondersteuning:
- Email: info@meehestar.nl
- Website: [meehestar.nl](https://meehestar.nl)

---

**Mee Hestar** - Premium truien voor elke gelegenheid
