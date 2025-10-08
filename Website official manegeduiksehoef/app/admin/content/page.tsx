'use client'

import { useState } from 'react'
import { 
  FileText, 
  Edit, 
  Save, 
  Eye,
  Settings,
  Image,
  Type,
  Link,
  Bold,
  Italic,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react'

interface PageContent {
  id: string
  title: string
  description: string
  content: string
  lastModified: string
  status: 'published' | 'draft'
}

export default function ContentBeheer() {
  const [pages, setPages] = useState<PageContent[]>([
    {
      id: 'homepage',
      title: 'Homepage',
      description: 'Hoofdpagina van de website',
      content: 'Welkom bij Manege Duikse Hoef...',
      lastModified: '2024-01-15',
      status: 'published'
    },
    {
      id: 'lessen',
      title: 'Lessen',
      description: 'Rijlessen en prijzen',
      content: 'Onze lessen zijn geschikt voor...',
      lastModified: '2024-01-14',
      status: 'published'
    },
    {
      id: 'over-ons',
      title: 'Over Ons',
      description: 'Informatie over de manege',
      content: 'Manege Duikse Hoef is...',
      lastModified: '2024-01-13',
      status: 'published'
    },
    {
      id: 'contact',
      title: 'Contact',
      description: 'Contactgegevens en locatie',
      content: 'Neem contact met ons op...',
      lastModified: '2024-01-12',
      status: 'published'
    },
    {
      id: 'pensionstalling',
      title: 'Pensionstalling',
      description: 'Pensionstalling voor uw paard',
      content: 'Onze pensionstalling biedt...',
      lastModified: '2024-01-11',
      status: 'published'
    }
  ])

  const [selectedPage, setSelectedPage] = useState<PageContent | null>(null)
  const [editingContent, setEditingContent] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const handleEditPage = (page: PageContent) => {
    setSelectedPage(page)
    setEditingContent(page.content)
    setIsEditing(true)
  }

  const handleSaveContent = () => {
    if (selectedPage) {
      setPages(pages.map(p => 
        p.id === selectedPage.id 
          ? { ...p, content: editingContent, lastModified: new Date().toISOString().split('T')[0] }
          : p
      ))
      setSelectedPage({ ...selectedPage, content: editingContent, lastModified: new Date().toISOString().split('T')[0] })
      setIsEditing(false)
    }
  }

  const handleCancelEdit = () => {
    setEditingContent(selectedPage?.content || '')
    setIsEditing(false)
  }

  const insertText = (text: string) => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newText = editingContent.substring(0, start) + text + editingContent.substring(end)
      setEditingContent(newText)
      
      // Focus terug naar textarea
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + text.length, start + text.length)
      }, 0)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Content Beheer</h1>
        <p className="mt-2 text-gray-600">
          Bewerk de inhoud van alle pagina's op de website
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pages List */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Pagina's</h2>
              <div className="space-y-2">
                {pages.map((page) => (
                  <div
                    key={page.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedPage?.id === page.id
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedPage(page)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {page.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {page.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          page.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {page.status === 'published' ? 'Live' : 'Draft'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-400">
                      Laatst gewijzigd: {page.lastModified}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-2">
          {selectedPage ? (
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      {selectedPage.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedPage.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <a
                      href={`/${selectedPage.id === 'homepage' ? '' : selectedPage.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-600"
                      title="Bekijken op website"
                    >
                      <Eye className="h-5 w-5" />
                    </a>
                    {!isEditing ? (
                      <button
                        onClick={() => handleEditPage(selectedPage)}
                        className="bg-pink-600 text-white px-3 py-1 rounded text-sm hover:bg-pink-700 flex items-center"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Bewerken
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleCancelEdit}
                          className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                        >
                          Annuleren
                        </button>
                        <button
                          onClick={handleSaveContent}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 flex items-center"
                        >
                          <Save className="h-4 w-4 mr-1" />
                          Opslaan
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {isEditing ? (
                  <div>
                    {/* Toolbar */}
                    <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex items-center space-x-2">
                      <button
                        onClick={() => insertText('**')}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Bold"
                      >
                        <Bold className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => insertText('*')}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Italic"
                      >
                        <Italic className="h-4 w-4" />
                      </button>
                      <div className="w-px h-4 bg-gray-300" />
                      <button
                        onClick={() => insertText('\n- ')}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="List"
                      >
                        <List className="h-4 w-4" />
                      </button>
                      <div className="w-px h-4 bg-gray-300" />
                      <button
                        onClick={() => insertText('[Link tekst](url)')}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Link"
                      >
                        <Link className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => insertText('![Alt tekst](afbeelding-url)')}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Afbeelding"
                      >
                        <Image className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Text Editor */}
                    <textarea
                      id="content-editor"
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      rows={20}
                      className="w-full px-3 py-2 border border-gray-300 border-t-0 rounded-b-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent font-mono text-sm"
                      placeholder="Begin met typen..."
                    />

                    {/* Preview */}
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Preview:</h3>
                      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-[200px]">
                        <div className="prose prose-sm max-w-none">
                          {editingContent.split('\n').map((line, index) => {
                            if (line.startsWith('# ')) {
                              return <h1 key={index} className="text-2xl font-bold">{line.substring(2)}</h1>
                            } else if (line.startsWith('## ')) {
                              return <h2 key={index} className="text-xl font-semibold">{line.substring(3)}</h2>
                            } else if (line.startsWith('### ')) {
                              return <h3 key={index} className="text-lg font-medium">{line.substring(4)}</h3>
                            } else if (line.startsWith('- ')) {
                              return <li key={index} className="ml-4">{line.substring(2)}</li>
                            } else if (line.trim() === '') {
                              return <br key={index} />
                            } else {
                              return <p key={index}>{line}</p>
                            }
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap">{selectedPage.content}</div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Selecteer een pagina</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Kies een pagina uit de lijst om de inhoud te bekijken en te bewerken.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Snelle Acties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <Eye className="h-6 w-6 text-pink-600 mb-2" />
              <h3 className="font-medium text-gray-900">Homepage Bekijken</h3>
              <p className="text-sm text-gray-500">Bekijk hoe de website eruit ziet</p>
            </a>
            
            <a
              href="/onze-paarden"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <Eye className="h-6 w-6 text-blue-600 mb-2" />
              <h3 className="font-medium text-gray-900">Paarden Pagina</h3>
              <p className="text-sm text-gray-500">Bekijk de paarden galerij</p>
            </a>
            
            <a
              href="/lessen"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <Eye className="h-6 w-6 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900">Lessen Pagina</h3>
              <p className="text-sm text-gray-500">Bekijk de lessen informatie</p>
            </a>
            
            <a
              href="/admin/paarden"
              className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <Settings className="h-6 w-6 text-purple-600 mb-2" />
              <h3 className="font-medium text-gray-900">Paarden Beheren</h3>
              <p className="text-sm text-gray-500">Beheer paarden informatie</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

