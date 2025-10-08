'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  Upload,
  Eye,
  Save,
  X,
  Loader2,
  Users,
  Calendar
} from 'lucide-react'
// Supabase niet meer nodig - gebruik lokale data
import PhotoUpload from '@/components/PhotoUpload'

// Lokale Paard type
interface Paard {
  id: number
  naam: string
  ras: string
  leeftijd: string
  geslacht: 'Merrie' | 'Ruin' | 'Hengst'
  kleur: string
  beschrijving: string
  hoofdfoto: string
  foto_urls: string[]
  eigenschappen: string[]
  created_at: string
  updated_at: string
}

export default function PaardenBeheer() {
  const [paarden, setPaarden] = useState<Paard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingPaard, setEditingPaard] = useState<Paard | null>(null)
  const [newPaard, setNewPaard] = useState<Partial<Paard>>({
    naam: '',
    ras: '',
    leeftijd: '',
    geslacht: 'Merrie',
    kleur: '',
    beschrijving: '',
    hoofdfoto: '',
    foto_urls: [],
    eigenschappen: []
  })

  // Load paarden from Supabase
  useEffect(() => {
    loadPaarden()
  }, [])



  const loadPaarden = async () => {
    try {
      setLoading(true)
      
      // Laad paarden uit localStorage (lokaal beheer)
      const storedPaarden = localStorage.getItem('manege-paarden')
      const loadedPaarden = storedPaarden ? JSON.parse(storedPaarden) : []
      
      setPaarden(loadedPaarden)
      setError(null)
    } catch (err) {
      console.error('Error:', err)
      setError('Er is een fout opgetreden bij het laden van de data')
    } finally {
      setLoading(false)
    }
  }

  const filteredPaarden = paarden.filter(paard =>
    paard.naam.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paard.ras.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddPaard = async () => {
    if (newPaard.naam && newPaard.ras) {
      try {
        // Maak nieuw paard object
        const nieuwPaard: Paard = {
          id: Date.now(), // Gebruik timestamp als unieke ID
          naam: newPaard.naam,
          ras: newPaard.ras,
          leeftijd: newPaard.leeftijd || '',
          geslacht: newPaard.geslacht || 'Merrie',
          kleur: newPaard.kleur || '',
          beschrijving: newPaard.beschrijving || '',
          hoofdfoto: newPaard.hoofdfoto || (newPaard.foto_urls && newPaard.foto_urls[0]) || '/paarden/placeholder.jpg',
          foto_urls: newPaard.foto_urls || [],
          eigenschappen: newPaard.eigenschappen || [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }

        // Voeg toe aan lokale lijst
        const updatedPaarden = [...paarden, nieuwPaard]
        setPaarden(updatedPaarden)
        
        // Save to localStorage
        localStorage.setItem('manege-paarden', JSON.stringify(updatedPaarden))
        
        // Reset form
        setNewPaard({
          naam: '',
          ras: '',
          leeftijd: '',
          geslacht: 'Merrie',
          kleur: '',
          beschrijving: '',
          hoofdfoto: '',
          foto_urls: [],
          eigenschappen: []
        })
        setShowAddForm(false)
        setError(null)
      } catch (err) {
        console.error('Error:', err)
        setError('Er is een fout opgetreden bij het toevoegen van het paard')
      }
    }
  }

  const handleEditPaard = (paard: Paard) => {
    // Maak een diepe kopie van het paard object
    const paardCopy = {
      id: paard.id,
      naam: paard.naam,
      ras: paard.ras,
      leeftijd: paard.leeftijd,
      geslacht: paard.geslacht,
      kleur: paard.kleur,
      beschrijving: paard.beschrijving,
      hoofdfoto: paard.hoofdfoto,
      foto_urls: [...(paard.foto_urls || [])],
      eigenschappen: [...(paard.eigenschappen || [])],
      created_at: paard.created_at,
      updated_at: paard.updated_at
    }
    
    setEditingPaard(paardCopy)
  }

  const handleSaveEdit = async () => {
    if (!editingPaard) {
      setError('Geen paard geselecteerd om op te slaan')
      return
    }

    try {
      // Validate required fields
      if (!editingPaard.naam || editingPaard.naam.trim() === '') {
        setError('Naam is verplicht')
        return
      }
      
      setError(null)
      
      // Update local state
      const updateData = {
        ...editingPaard,
        naam: editingPaard.naam.trim(),
        updated_at: new Date().toISOString()
      }
      
      const updatedPaarden = paarden.map(p => p.id === editingPaard.id ? updateData : p)
      setPaarden(updatedPaarden)
      
      // Save to localStorage
      localStorage.setItem('manege-paarden', JSON.stringify(updatedPaarden))
      
      setEditingPaard(null)
      alert('Paard succesvol bijgewerkt!')
      
    } catch (err) {
      console.error('Error during save:', err)
      setError('Er is een fout opgetreden bij het bijwerken van het paard')
    }
  }

  const handleDeletePaard = async (id: number) => {
    if (confirm('Weet je zeker dat je dit paard wilt verwijderen?')) {
      try {
        // Verwijder uit lokale lijst
        const updatedPaarden = paarden.filter(p => p.id !== id)
        setPaarden(updatedPaarden)
        
        // Save to localStorage
        localStorage.setItem('manege-paarden', JSON.stringify(updatedPaarden))
        
        setError(null)
        alert('Paard succesvol verwijderd!')
      } catch (err) {
        console.error('Error:', err)
        setError('Er is een fout opgetreden bij het verwijderen van het paard')
      }
    }
  }

  const addEigenschap = (paard: Paard, eigenschap: string) => {
    if (eigenschap.trim() && !paard.eigenschappen.includes(eigenschap.trim())) {
      const newEigenschappen = [...paard.eigenschappen, eigenschap.trim()]
      if (editingPaard && editingPaard.id === paard.id) {
        setEditingPaard({ ...editingPaard, eigenschappen: newEigenschappen })
      }
    }
  }

  const removeEigenschap = (paard: Paard, eigenschap: string) => {
    const newEigenschappen = paard.eigenschappen.filter(e => e !== eigenschap)
    if (editingPaard && editingPaard.id === paard.id) {
      setEditingPaard({ ...editingPaard, eigenschappen: newEigenschappen })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-pink-600" />
          <p className="text-gray-600">Paarden laden...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
              Paarden Beheer
            </h1>
            <p className="mt-2 text-gray-600 text-lg">
              Beheer alle paarden en hun informatie
            </p>
            <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {paarden.length} paarden
              </span>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}
              </span>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-pink-600 to-pink-700 text-white px-6 py-3 rounded-xl hover:from-pink-700 hover:to-pink-800 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nieuw Paard
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-4 shadow-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Fout opgetreden</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
            <div className="ml-auto">
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Zoek paarden op naam of ras..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 flex items-center transition-all duration-200 hover:shadow-md">
              <Filter className="h-5 w-5 mr-2" />
              Filter
            </button>
            <button 
              onClick={() => setSearchTerm('')}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 flex items-center transition-all duration-200"
            >
              <X className="h-5 w-5 mr-2" />
              Wissen
            </button>
          </div>
        </div>
        {searchTerm && (
          <div className="mt-4 text-sm text-gray-600">
            {filteredPaarden.length} van {paarden.length} paarden gevonden voor "{searchTerm}"
          </div>
        )}
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingPaard) && (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {editingPaard ? 'Paard Bewerken' : 'Nieuw Paard Toevoegen'}
            </h2>
            <button
              onClick={() => {
                setShowAddForm(false)
                setEditingPaard(null)
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Naam
              </label>
              <input
                type="text"
                value={editingPaard?.naam || newPaard.naam || ''}
                onChange={(e) => {
                  const newValue = e.target.value
                  
                  if (editingPaard) {
                    setEditingPaard({ ...editingPaard, naam: newValue })
                  } else {
                    setNewPaard({ ...newPaard, naam: newValue })
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Voer paard naam in..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ras
              </label>
              <input
                type="text"
                value={editingPaard?.ras || newPaard.ras || ''}
                onChange={(e) => {
                  if (editingPaard) {
                    setEditingPaard({ ...editingPaard, ras: e.target.value })
                  } else {
                    setNewPaard({ ...newPaard, ras: e.target.value })
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Leeftijd
              </label>
              <input
                type="text"
                value={editingPaard?.leeftijd || newPaard.leeftijd || ''}
                onChange={(e) => {
                  if (editingPaard) {
                    setEditingPaard({ ...editingPaard, leeftijd: e.target.value })
                  } else {
                    setNewPaard({ ...newPaard, leeftijd: e.target.value })
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Geslacht
              </label>
              <select
                value={editingPaard?.geslacht || newPaard.geslacht || ''}
                onChange={(e) => {
                  if (editingPaard) {
                    setEditingPaard({ ...editingPaard, geslacht: e.target.value as 'Merrie' | 'Ruin' | 'Hengst' })
                  } else {
                    setNewPaard({ ...newPaard, geslacht: e.target.value as 'Merrie' | 'Ruin' | 'Hengst' })
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="">Selecteer geslacht</option>
                <option value="Merrie">Merrie</option>
                <option value="Ruin">Ruin</option>
                <option value="Hengst">Hengst</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kleur
              </label>
              <input
                type="text"
                value={editingPaard?.kleur || newPaard.kleur || ''}
                onChange={(e) => {
                  if (editingPaard) {
                    setEditingPaard({ ...editingPaard, kleur: e.target.value })
                  } else {
                    setNewPaard({ ...newPaard, kleur: e.target.value })
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foto's Uploaden
              </label>
              <PhotoUpload
                onUpload={(urls) => {
                  if (editingPaard) {
                    setEditingPaard({ 
                      ...editingPaard, 
                      foto_urls: urls,
                      hoofdfoto: urls[0] || editingPaard.hoofdfoto
                    })
                  } else {
                    setNewPaard({ 
                      ...newPaard, 
                      foto_urls: urls,
                      hoofdfoto: urls[0] || newPaard.hoofdfoto
                    })
                  }
                }}
                existingPhotos={editingPaard?.foto_urls || newPaard.foto_urls || []}
                maxPhotos={5}
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Beschrijving
            </label>
            <textarea
              value={editingPaard?.beschrijving || newPaard.beschrijving || ''}
              onChange={(e) => {
                if (editingPaard) {
                  setEditingPaard({ ...editingPaard, beschrijving: e.target.value })
                } else {
                  setNewPaard({ ...newPaard, beschrijving: e.target.value })
                }
              }}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Eigenschappen
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(editingPaard?.eigenschappen || newPaard.eigenschappen || []).map((eigenschap, index) => (
                <span
                  key={index}
                  className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {eigenschap}
                  <button
                    onClick={() => {
                      if (editingPaard) {
                        removeEigenschap(editingPaard, eigenschap)
                      } else {
                        setNewPaard({
                          ...newPaard,
                          eigenschappen: (newPaard.eigenschappen || []).filter(e => e !== eigenschap)
                        })
                      }
                    }}
                    className="ml-2 text-pink-600 hover:text-pink-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Nieuwe eigenschap..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const target = e.target as HTMLInputElement
                    if (editingPaard) {
                      addEigenschap(editingPaard, target.value)
                    } else {
                      setNewPaard({
                        ...newPaard,
                        eigenschappen: [...(newPaard.eigenschappen || []), target.value]
                      })
                    }
                    target.value = ''
                  }
                }}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowAddForm(false)
                setEditingPaard(null)
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Annuleren
            </button>
            <button
              onClick={async () => {
                if (editingPaard) {
                  await handleSaveEdit()
                } else {
                  await handleAddPaard()
                }
              }}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 flex items-center transition-colors"
              disabled={!!(editingPaard && (!editingPaard.naam || editingPaard.naam.trim() === ''))}
            >
              <Save className="h-5 w-5 mr-2" />
              {editingPaard ? 'Opslaan' : 'Toevoegen'}
            </button>
          </div>
        </div>
      )}

      {/* Paarden List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Paarden Overzicht</h2>
          <p className="text-sm text-gray-600 mt-1">
            {filteredPaarden.length} paarden gevonden
          </p>
        </div>
        
        {filteredPaarden.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Users className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Geen paarden gevonden</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? `Geen paarden gevonden voor "${searchTerm}"` : 'Er zijn nog geen paarden toegevoegd'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700 transition-colors flex items-center mx-auto"
              >
                <Plus className="h-5 w-5 mr-2" />
                Eerste paard toevoegen
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredPaarden.map((paard) => (
              <div key={paard.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <div className="h-20 w-20 bg-gradient-to-br from-pink-100 to-blue-100 rounded-2xl flex items-center justify-center overflow-hidden">
                        {paard.hoofdfoto ? (
                          <img
                            src={paard.hoofdfoto}
                            alt={paard.naam}
                            className="h-20 w-20 object-cover rounded-2xl"
                          />
                        ) : (
                          <div className="text-center text-gray-400">
                            <Users className="h-8 w-8 mx-auto mb-1" />
                            <span className="text-xs">Geen foto</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {paard.naam}
                        </h3>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-pink-100 to-blue-100 text-pink-800">
                          {paard.ras}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {paard.leeftijd}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {paard.geslacht}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span>{paard.kleur}</span>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {paard.beschrijving}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {paard.eigenschappen.map((eigenschap, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                          >
                            {eigenschap}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <a
                      href={`/onze-paarden`}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      title="Bekijken op website"
                    >
                      <Eye className="h-5 w-5" />
                    </a>
                    <button
                      onClick={() => handleEditPaard(paard)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      title="Bewerken"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeletePaard(paard.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Verwijderen"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
