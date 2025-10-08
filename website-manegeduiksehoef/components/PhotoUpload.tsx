'use client'

import { useState, useRef, useEffect } from 'react'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'

interface PhotoUploadProps {
  onUpload: (urls: string[]) => void
  existingPhotos?: string[]
  maxPhotos?: number
  className?: string
}

export default function PhotoUpload({ 
  onUpload, 
  existingPhotos = [], 
  maxPhotos = 5,
  className = '' 
}: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [previewUrls, setPreviewUrls] = useState<string[]>(existingPhotos)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Update previewUrls when existingPhotos change
  useEffect(() => {
    setPreviewUrls(existingPhotos)
  }, [existingPhotos])

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return

    const selectedFiles = Array.from(files)
    const totalPhotos = previewUrls.length + selectedFiles.length

    if (totalPhotos > maxPhotos) {
      alert(`Je kunt maximaal ${maxPhotos} foto's uploaden`)
      return
    }

    setUploading(true)

    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error(`${file.name} is geen geldige afbeelding`)
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`${file.name} is te groot (max 5MB)`)
        }

        // Convert to base64 data URL (zoals andere websites doen)
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            const dataUrl = e.target?.result as string
            if (dataUrl) {
              resolve(dataUrl)
            } else {
              reject(new Error('Kon bestand niet lezen'))
            }
          }
          reader.onerror = () => reject(new Error('Fout bij lezen van bestand'))
          reader.readAsDataURL(file)
        })
      })

      const uploadedUrls = await Promise.all(uploadPromises)
      const newPreviewUrls = [...previewUrls, ...uploadedUrls]
      
      setPreviewUrls(newPreviewUrls)
      onUpload(newPreviewUrls)

    } catch (error) {
      console.error('Upload error:', error)
      alert(error instanceof Error ? error.message : 'Er is een fout opgetreden bij het uploaden')
    } finally {
      setUploading(false)
    }
  }

  const removePhoto = (index: number) => {
    const newUrls = previewUrls.filter((_, i) => i !== index)
    setPreviewUrls(newUrls)
    onUpload(newUrls)
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Button */}
      <div className="flex items-center space-x-4">
        <button
          type="button"
          onClick={openFileDialog}
          disabled={uploading || previewUrls.length >= maxPhotos}
          className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {uploading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Upload className="h-5 w-5" />
          )}
          <span>
            {uploading ? 'Uploaden...' : 'Foto\'s Uploaden'}
          </span>
        </button>
        
        <span className="text-sm text-gray-500">
          {previewUrls.length}/{maxPhotos} foto's
        </span>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      {/* Photo Preview Grid */}
      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={url}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Instructions */}
      <div className="text-sm text-gray-500 space-y-1">
        <p>• Upload JPG, PNG of GIF bestanden</p>
        <p>• Maximaal 5MB per foto</p>
        <p>• Maximaal {maxPhotos} foto's per paard</p>
      </div>
    </div>
  )
}
