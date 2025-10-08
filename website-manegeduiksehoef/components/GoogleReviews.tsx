'use client'

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'

interface GoogleReview {
  author_name: string
  author_url?: string
  language: string
  profile_photo_url?: string
  rating: number
  relative_time_description: string
  text: string
  time: number
}

interface GoogleReviewsProps {
  placeId: string
  apiKey: string
}

export default function GoogleReviews({ placeId, apiKey }: GoogleReviewsProps) {
  const [reviews, setReviews] = useState<GoogleReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // For now, always use mock reviews
    const mockReviews = [
      {
        author_name: "Silvia",
        rating: 4.5,
        relative_time_description: "",
        text: "Bij Manege Duikse Hoef is alles mogelijk: manegelessen met goede begeleiding, pensionstalling, revalidatie en het opleiden van paarden. Dankzij de persoonlijke inzet van Esmee en Francien voelt iedere eigenaar zich hier welkom en gehoord. Bovendien ligt de manege op een toplocatie, direct bij de prachtige Loonse en Drunense Duinen. Een fijne en vertrouwde plek voor zowel paard als ruiter.",
        time: Date.now(),
        language: "nl"
      },
      {
        author_name: "Corry Theunisse",
        rating: 5,
        relative_time_description: "",
        text: "Graaaaaaaag kom ik hier terug. Warm welkom, gezellige rit, fijne paarden, sfeer op de manege én tijdens het rijden is top.",
        time: Date.now(),
        language: "nl"
      },
      {
        author_name: "Edwin van Bladel",
        rating: 5,
        relative_time_description: "",
        text: "Gezellig manage waar het welzijn van het paard voorop staat",
        time: Date.now(),
        language: "nl"
      },
      {
        author_name: "Petra van Halder",
        rating: 5,
        relative_time_description: "",
        text: "Mijn dochter is dol enthousiast. Geweldige lessen.",
        time: Date.now(),
        language: "nl"
      },
      {
        author_name: "Nynke Beekman",
        rating: 5,
        relative_time_description: "",
        text: "Lekker buitenritjes maken. Geweldig🙌",
        time: Date.now(),
        language: "nl"
      },
      {
        author_name: "Dennis Peters",
        rating: 5,
        relative_time_description: "",
        text: "Ontzettend leuke rit gehad, fijne manege/pensionstal waar ze goed voor de paarden zorgen!",
        time: Date.now(),
        language: "nl"
      },
      {
        author_name: "Jane",
        rating: 0,
        relative_time_description: "",
        text: "Manege Duikse Hoef is echt een fantastische plek! Alles straalt hier liefde en zorg voor de paarden uit. De paarden worden met veel aandacht en respect verzorgd, wat meteen opvalt zodra je hier binnenkomt. Je ziet dat de paarden zich helemaal thuis voelen. Ook merk je dat ze hier over alles goed nadenken. De accommodatie is uitstekend: alles is netjes, ruim, goed onderhouden en voorzien van alles wat je nodig hebt om optimaal te kunnen genieten van je paard. Daarnaast is de ligging perfect – vlakbij de bossen. Dat maakt buitenritten niet alleen makkelijk bereikbaar, maar ook ontzettend mooi en rustgevend. Je kunt hier eindeloos genieten van de natuur samen met je paard. Kortom: een toplocatie waar welzijn van de paarden en plezier voor de ruiters hand in hand gaan. Een absolute aanrader!",
        time: Date.now(),
        language: "nl"
      }
    ]
    
    setReviews(mockReviews)
    setLoading(false)
  }, [])

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  const getRole = (name: string) => {
    // No role displayed for any reviews
    return ""
  }

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-gradient-to-br from-pink-500 to-rose-600",
      "bg-gradient-to-br from-purple-500 to-purple-600", 
      "bg-gradient-to-br from-green-500 to-green-600",
      "bg-gradient-to-br from-orange-500 to-orange-600",
      "bg-gradient-to-br from-teal-500 to-teal-600",
      "bg-gradient-to-br from-indigo-500 to-indigo-600",
      "bg-gradient-to-br from-red-500 to-red-600",
      "bg-gradient-to-br from-yellow-500 to-yellow-600",
      "bg-gradient-to-br from-cyan-500 to-cyan-600",
      "bg-gradient-to-br from-emerald-500 to-emerald-600"
    ]
    
    // Use name hash to get consistent color for each person
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      <div className="flex gap-6 animate-scroll">
        {/* First row of reviews */}
        {reviews.map((review, index) => (
          <div
            key={`first-${index}`}
            className="flex-shrink-0 w-72 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Google Reviews Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {review.profile_photo_url ? (
                  <img 
                    src={review.profile_photo_url} 
                    alt={review.author_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getAvatarColor(review.author_name)}`}>
                    <span className="text-white font-bold text-sm">{getInitial(review.author_name)}</span>
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{review.author_name}</h4>
                  <p className="text-gray-500 text-xs">{getRole(review.author_name)}</p>
                </div>
              </div>
              {/* Google Logo - only show for actual Google reviews */}
              {review.author_name !== "Silvia" && review.author_name !== "Jane" && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-xs text-gray-500 font-medium">Google</span>
                </div>
              )}
            </div>
            
            {/* Stars - only show for non-Silvia and non-Jane reviews */}
            {review.author_name !== "Silvia" && review.author_name !== "Jane" && (
              <div className="flex text-yellow-400 mb-3">
                {[...Array(Math.floor(review.rating))].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                {review.rating % 1 !== 0 && (
                  <div className="relative">
                    <Star className="w-4 h-4" />
                    <div className="absolute inset-0 overflow-hidden" style={{ width: `${(review.rating % 1) * 100}%` }}>
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Review Text */}
            <p className="text-gray-700 text-sm mb-4 leading-relaxed">
              "{review.text}"
            </p>
            
            {/* Date */}
            <p className="text-xs text-gray-400">{review.relative_time_description}</p>
          </div>
        ))}
        
        {/* Second identical row for seamless endless loop */}
        {reviews.map((review, index) => (
          <div
            key={`second-${index}`}
            className="flex-shrink-0 w-72 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Google Reviews Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {review.profile_photo_url ? (
                  <img 
                    src={review.profile_photo_url} 
                    alt={review.author_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getAvatarColor(review.author_name)}`}>
                    <span className="text-white font-bold text-sm">{getInitial(review.author_name)}</span>
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{review.author_name}</h4>
                  <p className="text-gray-500 text-xs">{getRole(review.author_name)}</p>
                </div>
              </div>
              {/* Google Logo - only show for actual Google reviews */}
              {review.author_name !== "Silvia" && review.author_name !== "Jane" && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-xs text-gray-500 font-medium">Google</span>
                </div>
              )}
            </div>
            
            {/* Stars - only show for non-Silvia and non-Jane reviews */}
            {review.author_name !== "Silvia" && review.author_name !== "Jane" && (
              <div className="flex text-yellow-400 mb-3">
                {[...Array(Math.floor(review.rating))].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                {review.rating % 1 !== 0 && (
                  <div className="relative">
                    <Star className="w-4 h-4" />
                    <div className="absolute inset-0 overflow-hidden" style={{ width: `${(review.rating % 1) * 100}%` }}>
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Review Text */}
            <p className="text-gray-700 text-sm mb-4 leading-relaxed">
              "{review.text}"
            </p>
            
            {/* Date */}
            <p className="text-xs text-gray-400">{review.relative_time_description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
