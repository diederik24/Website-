'use client'

import { useState } from 'react'
import { 
  Users, 
  Image, 
  FileText, 
  BarChart3, 
  TrendingUp,
  Eye,
  Plus,
  Edit,
  Trash2
} from 'lucide-react'

export default function AdminDashboard() {
  const [stats] = useState({
    totalPaarden: 15,
    totalFotos: 0,
    totalPages: 6,
    totalViews: 1247
  })

  const recentActivity = [
    { id: 1, action: 'Paard toegevoegd', item: 'Bella', time: '2 uur geleden', type: 'paard' },
    { id: 2, action: 'Foto geüpload', item: 'Storm.jpg', time: '4 uur geleden', type: 'foto' },
    { id: 3, action: 'Content bijgewerkt', item: 'Lessen pagina', time: '1 dag geleden', type: 'content' },
    { id: 4, action: 'Paard bewerkt', item: 'Luna', time: '2 dagen geleden', type: 'paard' },
  ]

  const quickActions = [
    { name: 'Nieuw Paard Toevoegen', href: '/admin/paarden/new', icon: Plus, color: 'bg-pink-500' },
    { name: 'Foto\'s Uploaden', href: '/admin/fotos', icon: Image, color: 'bg-blue-500' },
    { name: 'Content Bewerken', href: '/admin/content', icon: Edit, color: 'bg-green-500' },
    { name: 'Website Bekijken', href: '/', icon: Eye, color: 'bg-purple-500' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welkom bij het admin panel van Manege Duikse Hoef
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-pink-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Totaal Paarden
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalPaarden}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Image className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Totaal Foto's
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalFotos}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pagina's
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalPages}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pagina Weergaven
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalViews.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Snelle Acties</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <a
              key={action.name}
              href={action.href}
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div>
                <span className={`rounded-lg inline-flex p-3 ${action.color} text-white`}>
                  <action.icon className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {action.name}
                </h3>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recente Activiteit</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {recentActivity.map((activity) => (
              <li key={activity.id}>
                <div className="px-4 py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {activity.type === 'paard' && <Users className="h-5 w-5 text-pink-500" />}
                      {activity.type === 'foto' && <Image className="h-5 w-5 text-blue-500" />}
                      {activity.type === 'content' && <FileText className="h-5 w-5 text-green-500" />}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.item}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {activity.time}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Website Preview */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Website Overzicht</h2>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium text-gray-900 mb-2">Homepage</h3>
              <p className="text-sm text-gray-600 mb-3">Hoofdpagina van de website</p>
              <div className="flex space-x-2">
                <a href="/" className="text-pink-600 hover:text-pink-700 text-sm">Bekijken</a>
                <a href="/admin/content/homepage" className="text-gray-600 hover:text-gray-700 text-sm">Bewerken</a>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium text-gray-900 mb-2">Onze Paarden</h3>
              <p className="text-sm text-gray-600 mb-3">15 paarden met foto's en informatie</p>
              <div className="flex space-x-2">
                <a href="/onze-paarden" className="text-pink-600 hover:text-pink-700 text-sm">Bekijken</a>
                <a href="/admin/paarden" className="text-gray-600 hover:text-gray-700 text-sm">Beheren</a>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium text-gray-900 mb-2">Lessen</h3>
              <p className="text-sm text-gray-600 mb-3">Rijlessen en prijzen</p>
              <div className="flex space-x-2">
                <a href="/lessen" className="text-pink-600 hover:text-pink-700 text-sm">Bekijken</a>
                <a href="/admin/content/lessen" className="text-gray-600 hover:text-gray-700 text-sm">Bewerken</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

