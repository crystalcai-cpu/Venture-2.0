import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, X, ChevronDown } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { ListingCard } from '@/components/ListingCard'

export const Route = createFileRoute('/search')({
  component: SearchPage,
})

interface Filters {
  query: string
  minPrice: string
  maxPrice: string
  beds: string
  noFee: boolean
  pets: boolean
  neighborhood: string
}

function SearchPage() {
  const { listings } = useApp()
  const navigate = useNavigate()
  const [filters, setFilters] = useState<Filters>({
    query: '', minPrice: '', maxPrice: '', beds: '', noFee: false, pets: false, neighborhood: '',
  })
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [MapView, setMapView] = useState<React.ComponentType<any> | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Load MapView client-side only
  useEffect(() => {
    import('@/components/MapView').then(m => setMapView(() => m.MapView))
  }, [])

  const neighborhoods = useMemo(() => Array.from(new Set(listings.map(l => l.neighborhood))).sort(), [listings])

  const filtered = useMemo(() => {
    return listings.filter(l => {
      if (filters.query) {
        const q = filters.query.toLowerCase()
        if (!l.title.toLowerCase().includes(q) && !l.neighborhood.toLowerCase().includes(q)) return false
      }
      if (filters.minPrice && l.priceGross < Number(filters.minPrice)) return false
      if (filters.maxPrice && l.priceGross > Number(filters.maxPrice)) return false
      if (filters.beds !== '') {
        if (filters.beds === '3+') { if (l.beds < 3) return false }
        else if (l.beds !== Number(filters.beds)) return false
      }
      if (filters.noFee && !l.isNoFee) return false
      if (filters.pets && !l.petsAllowed) return false
      if (filters.neighborhood && l.neighborhood !== filters.neighborhood) return false
      return true
    })
  }, [listings, filters])

  const update = (key: keyof Filters, value: any) => setFilters(prev => ({ ...prev, [key]: value }))
  const resetFilters = () => setFilters({ query: '', minPrice: '', maxPrice: '', beds: '', noFee: false, pets: false, neighborhood: '' })
  const activeCount = [filters.minPrice, filters.maxPrice, filters.beds, filters.noFee, filters.pets, filters.neighborhood].filter(Boolean).length

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden', position: 'relative' }}>
      {/* Left Pane */}
      <div style={{
        width: '55%', display: 'flex', flexDirection: 'column',
        borderRight: '1px solid var(--border)',
        overflow: 'hidden',
      }}>
        {/* Search Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg)',
          flexShrink: 0,
        }}>
          {/* Search Bar */}
          <div style={{ position: 'relative', marginBottom: '12px' }}>
            <Search size={15} style={{
              position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)',
              color: 'var(--text-muted)', pointerEvents: 'none',
            }} />
            <input
              className="input-dark"
              style={{ paddingLeft: '38px' }}
              placeholder="Search by address, neighborhood..."
              value={filters.query}
              onChange={e => update('query', e.target.value)}
            />
          </div>

          {/* Filter Row */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Neighborhood */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <select
                className="input-dark"
                style={{ width: 'auto', paddingRight: '32px', fontSize: '13px', height: '36px' }}
                value={filters.neighborhood}
                onChange={e => update('neighborhood', e.target.value)}
              >
                <option value="">All Neighborhoods</option>
                {neighborhoods.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <ChevronDown size={12} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            </div>

            {/* Beds */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <select
                className="input-dark"
                style={{ width: 'auto', paddingRight: '32px', fontSize: '13px', height: '36px' }}
                value={filters.beds}
                onChange={e => update('beds', e.target.value)}
              >
                <option value="">Any Beds</option>
                <option value="0">Studio</option>
                <option value="1">1 Bed</option>
                <option value="2">2 Beds</option>
                <option value="3+">3+ Beds</option>
              </select>
              <ChevronDown size={12} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            </div>

            {/* Price Range */}
            <input
              className="input-dark"
              style={{ width: '110px', fontSize: '13px', height: '36px' }}
              placeholder="Min $"
              type="number"
              value={filters.minPrice}
              onChange={e => update('minPrice', e.target.value)}
            />
            <input
              className="input-dark"
              style={{ width: '110px', fontSize: '13px', height: '36px' }}
              placeholder="Max $"
              type="number"
              value={filters.maxPrice}
              onChange={e => update('maxPrice', e.target.value)}
            />

            {/* Toggle filters */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '12px', color: filters.noFee ? 'var(--gold)' : 'var(--text-secondary)', userSelect: 'none', whiteSpace: 'nowrap' }}>
              <input type="checkbox" className="checkbox-gold" checked={filters.noFee} onChange={e => update('noFee', e.target.checked)} />
              No Fee
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '12px', color: filters.pets ? 'var(--gold)' : 'var(--text-secondary)', userSelect: 'none', whiteSpace: 'nowrap' }}>
              <input type="checkbox" className="checkbox-gold" checked={filters.pets} onChange={e => update('pets', e.target.checked)} />
              Pets OK
            </label>

            {activeCount > 0 && (
              <button onClick={resetFilters} style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-muted)', fontSize: '12px',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--red)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)' }}>
                <X size={13} /> Clear
              </button>
            )}
          </div>

          {/* Result count */}
          <div style={{ marginTop: '10px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--gold)', fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>{filtered.length}</span>
            {' '}homes {filters.query || activeCount > 0 ? 'match your filters' : 'available'}
          </div>
        </div>

        {/* Listings Grid */}
        <div style={{
          flex: 1, overflowY: 'auto',
          padding: '20px',
        }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: '60px', color: 'var(--text-muted)' }}>
              <MapPin size={32} style={{ marginBottom: '12px', opacity: 0.3 }} />
              <p style={{ fontSize: '14px' }}>No listings match your filters.</p>
              <button onClick={resetFilters} className="btn-ghost" style={{ marginTop: '16px', fontSize: '13px' }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
            }}>
              {filtered.map((listing, i) => (
                <div
                  key={listing.id}
                  onMouseEnter={() => setHoveredId(listing.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    outline: hoveredId === listing.id ? '2px solid var(--gold)' : '2px solid transparent',
                    borderRadius: '12px',
                    transition: 'outline-color 0.2s',
                  }}
                >
                  <ListingCard listing={listing} index={i} showCompare />
                </div>
              ))}
            </div>
          )}
          {/* Bottom padding for compare bar */}
          <div style={{ height: '80px' }} />
        </div>
      </div>

      {/* Right Pane — Map */}
      <div style={{ flex: 1, position: 'sticky', top: 0, height: '100%' }}>
        {MapView ? (
          <MapView
            listings={filtered}
            hoveredId={hoveredId}
            onMarkerHover={setHoveredId}
            onMarkerClick={(id: string) => navigate({ to: '/property/$id', params: { id } })}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#0A0A0B', color: 'var(--text-muted)', fontSize: '13px',
          }}>
            <div style={{ textAlign: 'center' }}>
              <MapPin size={24} style={{ marginBottom: '8px', opacity: 0.4 }} />
              <p>Loading map...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
