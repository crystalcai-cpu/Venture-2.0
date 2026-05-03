import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { GitCompare, X, ArrowRight } from 'lucide-react'
import { useApp } from '@/context/AppContext'

export function CompareBar() {
  const { compareQueue, listings, clearCompare, toggleCompare } = useApp()

  if (compareQueue.length === 0) return null

  const compareListings = compareQueue.map(id => listings.find(l => l.id === id)).filter(Boolean) as typeof listings

  return (
    <AnimatePresence>
      <motion.div
        key="compare-bar"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        className="compare-bar"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            color: 'var(--gold)', fontSize: '13px', fontWeight: 600,
          }}>
            <GitCompare size={16} />
            Comparing {compareQueue.length} of 3
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {compareListings.map(l => (
              <div key={l.id} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'var(--card)',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                padding: '6px 10px',
              }}>
                <img
                  src={l.media.photos[0]}
                  alt={l.title}
                  style={{ width: '28px', height: '28px', borderRadius: '4px', objectFit: 'cover' }}
                />
                <span style={{ fontSize: '12px', color: 'var(--text)', fontWeight: 500, maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {l.neighborhood}
                </span>
                <button
                  onClick={() => toggleCompare(l.id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--text-muted)', padding: '2px',
                    display: 'flex', alignItems: 'center',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--red)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)' }}
                >
                  <X size={13} />
                </button>
              </div>
            ))}

            {/* Empty slots */}
            {Array.from({ length: 3 - compareListings.length }).map((_, i) => (
              <div key={`empty-${i}`} style={{
                width: '90px', height: '42px',
                border: '1px dashed var(--border)',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', color: 'var(--text-muted)',
              }}>
                + Add
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={clearCompare}
            className="btn-ghost"
            style={{ height: '38px', fontSize: '12px' }}
          >
            Clear
          </button>
          {compareQueue.length >= 2 && (
            <Link
              to="/search"
              className="btn-gold"
              style={{ height: '38px', fontSize: '12px', gap: '6px' }}
            >
              Compare Now <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
