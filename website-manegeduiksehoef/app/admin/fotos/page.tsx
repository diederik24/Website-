'use client'

import { useState, useRef } from 'react'
import { 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  Download,
  Eye,
  Search,
  Filter,
  Plus,
  X,
  Check,
  AlertCircle
} from 'lucide-react'

interface Foto {
  id: number
  naam: string
  url: string
  categorie: string
  beschrijving: string
  uploadDatum: string
  grootte: string
  dimensies: string
}

export default function FotoBeheer() {
  const [fotos, setFotos] = useState<Foto[]>([
    {
      id: 1,
      naam: 'bella.jpg',
      url: '/paarden/bella.jpg',
      categorie: 'Paarden',
      beschrijving: 'Foto van Bella, onze Friese merrie',
      uploadDatum: '2024-01-15',
      grootte: '2.3 MB',
      dimensies: '1920x1080'
    },
    {
      id: 2,
      naam: 'storm.jpg',
      url: '/paarden/storm.jpg',
      categorie: 'Paarden',
      beschrijving: 'Foto van Storm, onze KWPN ruin',
      uploadDatum: '2024-01-14',
      grootte: '1.8 MB',
      dimensies: '1920x1080'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategorie, setSelectedCategorie] = useState('')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const categorieën = ['Paarden', 'Faciliteiten', 'Lessen', 'Team', 'Algemeen']

  const filteredFotos = fotos.filter(foto => {
    const matchesSearch = foto.naam.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         foto.beschrijving.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategorie = !selectedCategorie || foto.categorie === selectedCategorie
    return matchesSearch && matchesCategorie
  })

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadingFiles(files)
  }

  const handleUpload = async () => {
    for (const file of uploadingFiles) {
      // Simuleer upload progress
      setUploadProgress(prev => ({ ...prev, [file.name]: 0 }))
      
      // Simuleer upload proces
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100))
        setUploadProgress(prev => ({ ...prev, [file.name]: progress }))
      }

      // Voeg foto toe aan lijst
      const nieuweFoto: Foto = {
        id: Math.max(...fotos.map(f => f.id)) + 1,
        naam: file.name,
        url: `/uploads/${file.name}`,
        categorie: 'Algemeen',
        beschrijving: '',
        uploadDatum: new Date().toISOString().split('T')[0],
        grootte: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        dimensies: 'Onbekend'
      }
      
      setFotos(prev => [...prev, nieuweFoto])
    }

    setUploadingFiles([])
    setUploadProgress({})
    setShowUploadModal(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDeleteFoto = (id: number) => {
    if (confirm('Weet je zeker dat je deze foto wilt verwijderen?')) {
      setFotos(fotos.filter(f => f.id !== id))
    }
  }

  const handleDownload = (foto: Foto) => {
    // Simuleer download
    const link = document.createElement('a')
    link.href = foto.url
    link.download = foto.naam
    link.click()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Foto Beheer</h1>
          <p className="mt-2 text-gray-600">
            Upload en beheer alle foto's voor de website
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors flex items-center"
        >
          <Upload className="h-5 w-5 mr-2" />
          Foto's Uploaden
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Zoek foto's..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={selectedCategorie}
            onChange={(e) => setSelectedCategorie(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="">Alle categorieën</option>
            {categorieën.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowUploadModal(false)} />
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Foto's Uploaden</h3>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Klik om foto's te selecteren
                      </span>
                      <span className="mt-1 block text-sm text-gray-500">
                        of sleep foto's hierheen
                      </span>
                    </label>
                    <input
                      ref={fileInputRef}
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="sr-only"
                    />
                  </div>
                </div>

                {uploadingFiles.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Te uploaden bestanden:</h4>
                    <div className="space-y-2">
                      {uploadingFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center">
                            <ImageIcon className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">{file.name}</span>
                            <span className="text-xs text-gray-500 ml-2">
                              ({(file.size / 1024 / 1024).toFixed(1)} MB)
                            </span>
                          </div>
                          {uploadProgress[file.name] !== undefined && (
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-pink-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${uploadProgress[file.name]}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-500">
                                {uploadProgress[file.name]}%
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                    <div className="flex">
                      <AlertCircle className="h-5 w-5 text-blue-400" />
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          <strong>Tip:</strong> Upload foto's in hoge kwaliteit (minimaal 1920x1080) voor de beste resultaten.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleUpload}
                  disabled={uploadingFiles.length === 0}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-600 text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Uploaden
                </button>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Annuleren
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Foto Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredFotos.map((foto) => (
          <div key={foto.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              <img
                src={foto.url}
                alt={foto.naam}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzljYTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdlZW4gZm90bzwvdGV4dD48L3N2Zz4='
                }}
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {foto.naam}
                </h3>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                  {foto.categorie}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                {foto.beschrijving || 'Geen beschrijving'}
              </p>
              <div className="text-xs text-gray-400 mb-3">
                <div>{foto.grootte} • {foto.dimensies}</div>
                <div>Geüpload: {foto.uploadDatum}</div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDownload(foto)}
                  className="flex-1 bg-gray-100 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-200 flex items-center justify-center"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </button>
                <button
                  onClick={() => handleDeleteFoto(foto.id)}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded text-xs hover:bg-red-200 flex items-center justify-center"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFotos.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Geen foto's gevonden</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || selectedCategorie 
              ? 'Probeer andere zoektermen of filters.' 
              : 'Upload je eerste foto om te beginnen.'
            }
          </p>
        </div>
      )}
    </div>
  )
}

