import { useEffect, useRef } from 'react'
import type { Listing } from '@/data/listings'

interface MapViewProps {
  listings: Listing[]
  hoveredId?: string | null
  onMarkerHover?: (id: string | null) => void
  onMarkerClick?: (id: string) => void
}

export function MapView({ listings, hoveredId, onMarkerHover, onMarkerClick }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<Record<string, any>>({})

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    let cancelled = false

    const init = async () => {
      // Load Leaflet from CDN if not already loaded
      if (!(window as any).L) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
          script.onload = () => resolve()
          script.onerror = reject
          document.head.appendChild(script)
        })
      }
      const L = (window as any).L
      if (cancelled || !containerRef.current) return

      const map = L.map(containerRef.current, {
        center: [40.7128, -73.9760],
        zoom: 12,
        zoomControl: false,
        scrollWheelZoom: true,
        attributionControl: false,
      })

      L.control.zoom({ position: 'bottomright' }).addTo(map)
      L.control.attribution({ position: 'bottomleft', prefix: '' }).addTo(map)

      // Dark Carto tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
      }).addTo(map)

      mapRef.current = map

      // Add markers
      listings.forEach(listing => {
        const priceLabel = listing.priceGross >= 1000
          ? `$${(listing.priceGross / 1000).toFixed(1)}k`
          : `$${listing.priceGross}`

        const icon = L.divIcon({
          className: '',
          html: `<div class="price-marker" data-id="${listing.id}">${priceLabel}</div>`,
          iconSize: [64, 28],
          iconAnchor: [32, 14],
        })

        const marker = L.marker([listing.latitude, listing.longitude], { icon })
        marker.addTo(map)

        const popupContent = `
          <div class="popup-card">
            <img src="${listing.media.photos[0]}" alt="${listing.title}" loading="lazy" />
            <div class="popup-info">
              <p class="popup-title">${listing.title}</p>
              <p class="popup-price">$${listing.priceGross.toLocaleString()}/mo</p>
              <p class="popup-details">${listing.beds === 0 ? 'Studio' : listing.beds + 'bd'} · ${listing.baths}ba · ${listing.sqft.toLocaleString()} sqft</p>
            </div>
          </div>
        `

        marker.bindPopup(L.popup({
          closeButton: false,
          className: 'listing-popup',
          offset: [0, -4],
          autoPan: false,
        }).setContent(popupContent))

        marker.on('mouseover', () => {
          onMarkerHover?.(listing.id)
          marker.openPopup()
          document.querySelectorAll(`.price-marker[data-id="${listing.id}"]`).forEach(el => {
            el.classList.add('active')
          })
        })

        marker.on('mouseout', () => {
          onMarkerHover?.(null)
          marker.closePopup()
          document.querySelectorAll(`.price-marker[data-id="${listing.id}"]`).forEach(el => {
            el.classList.remove('active')
          })
        })

        marker.on('click', () => {
          onMarkerClick?.(listing.id)
        })

        markersRef.current[listing.id] = marker
      })
    }

    init()

    return () => {
      cancelled = true
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        markersRef.current = {}
      }
    }
  // Only run once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sync hovered marker style
  useEffect(() => {
    Object.keys(markersRef.current).forEach(id => {
      document.querySelectorAll(`.price-marker[data-id="${id}"]`).forEach(el => {
        if (id === hoveredId) {
          el.classList.add('active')
        } else {
          el.classList.remove('active')
        }
      })
    })
  }, [hoveredId])

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%', background: '#0A0A0B' }}
      />
    </div>
  )
}
