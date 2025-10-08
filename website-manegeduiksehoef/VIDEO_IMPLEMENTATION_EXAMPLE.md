# Correcte Video Implementatie voor Next.js + Vercel

## Bestandslocatie
```
project/
├── public/
│   ├── background-video.mp4          # ✅ Correct
│   └── background-video-compressed.mp4 # ✅ Correct (aanbevolen)
├── src/                              # ❌ Fout
└── assets/                           # ❌ Fout
```

## Correcte React Component

```tsx
'use client'

import { useState } from 'react'

export default function VideoBackground() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)

  return (
    <div className="relative h-screen">
      {/* Fallback gradient achtergrond */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
        }}
      />
      
      {/* Video overlay */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        onLoadedData={() => {
          setVideoLoaded(true)
          setVideoError(false)
        }}
        onError={() => {
          setVideoError(true)
          setVideoLoaded(false)
        }}
        style={{ 
          display: videoError ? 'none' : 'block'
        }}
      >
        <source src="/background-video-compressed.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1>Mijn Website</h1>
      </div>
    </div>
  )
}
```

## Belangrijke punten:

1. **Bestandslocatie**: Alleen in `/public` map
2. **Src pad**: Absoluut pad `/bestandsnaam.mp4`
3. **Video attributen**: `muted` + `playsInline` voor autoplay
4. **Fallback**: Gradient achtergrond voor als video faalt
5. **Bestandsgrootte**: Max 15MB voor Vercel gratis plan
6. **Gitignore**: Zorg dat `.mp4` bestanden NIET genegeerd worden

## Test URL's:
- Lokaal: `http://localhost:3000/background-video-compressed.mp4`
- Vercel: `https://jouw-app.vercel.app/background-video-compressed.mp4`
