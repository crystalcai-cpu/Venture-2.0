import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Heart, DollarSign, Maximize2, BedDouble, Bath, CheckCircle, PawPrint } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import type { Listing } from '@/data/listings'

interface ListingCardProps {
  listing: Listing
  index?: number
  showCompare?: boolean
}

export function ListingCard({ listing, index = 0, showCompare = true }: ListingCardProps) {
  const { toggleFavorite, isFavorite, toggleCompare, inCompareQueue } = useApp()
  const isLiked = isFavorite(listing.id)
  const isComparing = inCompareQueue(listing.id)

  const priceDisplay = `$${listing.priceGross.toLocaleString()}`
  const bedsLabel = listing.beds === 0 ? 'Studio' : `${listing.beds} Bed`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="card-dark"
      style={{ cursor: 'pointer' }}
    >
      {/* Photo */}
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <Link to="/property/$id" params={{ id: listing.id }} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
          <img
            src={listing.media.photos[0]}
            alt={listing.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.5s ease',
              display: 'block',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
          />
        </Link>

        {/* Overlay badges */}
        <div style={{
          position: 'absolute', top: '10px', left: '10px',
          display: 'flex', gap: '6px', flexWrap: 'wrap',
        }}>
          {listing.isNoFee && (
            <span className="badge badge-gold">No Fee</span>
          )}
          {listing.petsAllowed && (
            <span className="badge" style={{
              background: 'rgba(5,5,5,0.75)', color: 'var(--text-secondary)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
            }}>
              <PawPrint size={9} style={{ marginRight: '3px' }} />Pets OK
            </span>
          )}
        </div>

        {/* Favorite */}
        <button
          onClick={(e) => { e.preventDefault(); toggleFavorite(listing.id) }}
          style={{
            position: 'absolute', top: '10px', right: '10px',
            width: '32px', height: '32px',
            background: 'rgba(5,5,5,0.7)',
            border: `1px solid ${isLiked ? 'rgba(224,82,82,0.5)' : 'rgba(255,255,255,0.15)'}`,
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'background 0.2s, border-color 0.2s',
          }}
        >
          <Heart
            size={14}
            fill={isLiked ? '#E05252' : 'none'}
            color={isLiked ? '#E05252' : 'rgba(255,255,255,0.8)'}
          />
        </button>

        {/* Available date */}
        <div style={{
          position: 'absolute', bottom: '10px', left: '10px',
          background: 'rgba(5,5,5,0.75)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '10px',
          color: 'var(--text-secondary)',
          fontWeight: 500,
        }}>
          Avail {new Date(listing.availableDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '14px 16px 16px' }}>
        {/* Price row */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '18px', fontWeight: 700,
            color: 'var(--gold)',
          }}>
            {priceDisplay}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>/mo</span>
          {listing.priceNet !== listing.priceGross && (
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: 'auto' }}>
              Net: ${listing.priceNet.toLocaleString()}
            </span>
          )}
        </div>

        {/* Title */}
        <Link to="/property/$id" params={{ id: listing.id }} style={{ textDecoration: 'none' }}>
          <h3 style={{
            margin: '0 0 8px',
            fontSize: '14px', fontWeight: 600,
            color: 'var(--text)',
            lineHeight: 1.4,
            fontFamily: 'Inter, sans-serif',
          }}>
            {listing.title}
          </h3>
        </Link>

        {/* Neighborhood */}
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
          {listing.neighborhood}, New York
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: '16px',
          paddingTop: '12px',
          borderTop: '1px solid var(--border)',
        }}>
          <Stat icon={<BedDouble size={12} />} label={bedsLabel} />
          <Stat icon={<Bath size={12} />} label={`${listing.baths} Bath`} />
          <Stat icon={<Maximize2 size={12} />} label={`${listing.sqft.toLocaleString()} ft²`} />
        </div>

        {/* Compare checkbox */}
        {showCompare && (
          <label style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            marginTop: '12px',
            cursor: 'pointer',
            fontSize: '12px',
            color: isComparing ? 'var(--gold)' : 'var(--text-muted)',
            userSelect: 'none',
            transition: 'color 0.2s',
          }}>
            <input
              type="checkbox"
              className="checkbox-gold"
              checked={isComparing}
              onChange={() => toggleCompare(listing.id)}
            />
            Compare
            {isComparing && <CheckCircle size={12} color="var(--gold)" />}
          </label>
        )}
      </div>
    </motion.div>
  )
}

function Stat({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      <span style={{ color: 'var(--text-muted)' }}>{icon}</span>
      <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
    </div>
  )
}
