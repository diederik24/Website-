'use client'

import { useEffect } from 'react'

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime)
        }
        if (entry.entryType === 'first-input') {
          const firstInputEntry = entry as any
          console.log('FID:', firstInputEntry.processingStart - entry.startTime)
        }
        if (entry.entryType === 'layout-shift') {
          const layoutShiftEntry = entry as any
          console.log('CLS:', layoutShiftEntry.value)
        }
      }
    })

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })

    // Monitor bundle size
    const scripts = document.querySelectorAll('script[src]')
    let totalSize = 0
    
    scripts.forEach(script => {
      const src = script.getAttribute('src')
      if (src && src.includes('_next/static')) {
        fetch(src, { method: 'HEAD' })
          .then(response => {
            const contentLength = response.headers.get('content-length')
            if (contentLength) {
              totalSize += parseInt(contentLength)
              console.log(`Script: ${src}, Size: ${(parseInt(contentLength) / 1024).toFixed(2)}KB`)
            }
          })
          .catch(() => {})
      }
    })

    setTimeout(() => {
      console.log(`Total JS bundle size: ${(totalSize / 1024).toFixed(2)}KB`)
    }, 2000)

    return () => observer.disconnect()
  }, [])

  return null
}





