import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronLeft, Heart, Share2, BedDouble, Bath, Maximize2,
  PawPrint, CheckCircle, MapPin, Train, Calendar, DollarSign,
  Home, ExternalLink, Mail
} from 'lucide-react'
import { useApp } from '@/context/AppContext'

export const Route = createFileRoute('/property/$id')({
  component: PropertyDetail,
})

const TRANSIT_COLORS: Record<string, string> = {
  'A': '#0039A6', 'C': '#0039A6', 'E': '#0039A6',
  'B': '#FF6319', 'D': '#FF6319', 'F': '#FF6319', 'M': '#FF6319',
  'G': '#6CBE45',
  'J': '#996633', 'Z': '#996633',
  'L': '#A7A9AC',
  'N': '#FCCC0A', 'Q': '#FCCC0A', 'R': '#FCCC0A', 'W': '#FCCC0A',
  '1': '#EE352E', '2': '#EE352E', '3': '#EE352E',
  '4': '#00933C', '5': '#00933C', '6': '#00933C',
  '7': '#B933AD',
}

function getLineColor(line: string): string {
  const key = line.split('/')[0].trim()
  return TRANSIT_COLORS[key] || '#555'
}

function PropertyDetail() {
  const { id } = Route.useParams()
  const { listings, toggleFavorite, isFavorite } = useApp()
  const navigate = useNavigate()
  const listing = listings.find(l => l.id === id)

  const [activeTab, setActiveTab] = useState<'photos' | '3d' | 'floorplan' | 'video'>('photos')
  const [activePhoto, setActivePhoto] = useState(0)
  const [rewardRate, setRewardRate] = useState(2)

  if (!listing) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--text)', fontFamily: 'Cormorant Garamond, Georgia, serif' }}>Listing Not Found</h2>
        <Link to="/search" className="btn-gold" style={{ marginTop: '24px', display: 'inline-flex' }}>
          Back to Search
        </Link>
      </div>
    )
  }

  const isLiked = isFavorite(listing.id)
  const annualRent = listing.priceGross * 12
  const rewardsValue = Math.round((annualRent * rewardRate) / 100)

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Top Bar */}
      <div style={{
        padding: '12px 24px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--surface)',
      }}>
        <button
          onClick={() => navigate({ to: '/search' })}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 500,
            transition: 'color 0.15s', padding: '4px 0',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)' }}
        >
          <ChevronLeft size={16} /> Back to Search
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => toggleFavorite(listing.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 14px', fontSize: '13px', fontWeight: 500,
              background: isLiked ? 'rgba(224,82,82,0.1)' : 'var(--card)',
              border: `1px solid ${isLiked ? 'rgba(224,82,82,0.3)' : 'var(--border)'}`,
              color: isLiked ? 'var(--red)' : 'var(--text-secondary)',
              borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            <Heart size={14} fill={isLiked ? 'var(--red)' : 'none'} />
            {isLiked ? 'Saved' : 'Save'}
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '8px 14px', fontSize: '13px',
            background: 'var(--card)', border: '1px solid var(--border)',
            color: 'var(--text-secondary)', borderRadius: '8px', cursor: 'pointer',
          }}>
            <Share2 size={14} /> Share
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Title Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '24px' }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                {listing.isNoFee && <span className="badge badge-gold">No Fee</span>}
                {listing.petsAllowed && <span className="badge badge-muted"><PawPrint size={10} style={{ marginRight: '4px' }} />Pets OK</span>}
                <span className="badge badge-muted">
                  <Calendar size={10} style={{ marginRight: '4px' }} />
                  Avail {new Date(listing.availableDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <h1 style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 700,
                color: 'var(--text)', margin: '0 0 8px', letterSpacing: '-0.02em',
              }}>
                {listing.title}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--text-muted)' }}>
                <MapPin size={13} />
                {listing.neighborhood}, New York City
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '36px', fontWeight: 700, color: 'var(--gold)', lineHeight: 1 }}>
                ${listing.priceGross.toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>/month gross</div>
              {listing.priceNet !== listing.priceGross && (
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Net: ${listing.priceNet.toLocaleString()}/mo
                </div>
              )}
            </div>
          </div>

          {/* Quick stats */}
          <div style={{
            display: 'flex', gap: '24px', flexWrap: 'wrap',
            marginTop: '20px', paddingTop: '20px',
            borderTop: '1px solid var(--border)',
          }}>
            {[
              { icon: BedDouble, label: listing.beds === 0 ? 'Studio' : `${listing.beds} Bedroom${listing.beds > 1 ? 's' : ''}` },
              { icon: Bath, label: `${listing.baths} Bathroom${listing.baths > 1 ? 's' : ''}` },
              { icon: Maximize2, label: `${listing.sqft.toLocaleString()} sq ft` },
            ].map(({ icon: Icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon size={16} color="var(--gold)" />
                <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px', alignItems: 'start' }}>
          {/* Left Column */}
          <div>
            {/* Media Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{ marginBottom: '32px' }}
            >
              <div className="tab-bar" style={{ marginBottom: '16px' }}>
                {[
                  { key: 'photos', label: 'Photos' },
                  { key: '3d', label: '3D Tour' },
                  { key: 'floorplan', label: 'Floorplan' },
                  { key: 'video', label: 'POV Video' },
                ].map(tab => (
                  <button
                    key={tab.key}
                    className={`tab-item ${activeTab === tab.key ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.key as any)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div style={{ borderRadius: '12px', overflow: 'hidden', background: 'var(--card)', border: '1px solid var(--border)' }}>
                {activeTab === 'photos' && (
                  <div>
                    <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                      <img
                        src={listing.media.photos[activePhoto]}
                        alt={`Photo ${activePhoto + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '8px', padding: '12px', overflowX: 'auto' }}>
                      {listing.media.photos.map((photo, i) => (
                        <button
                          key={i}
                          onClick={() => setActivePhoto(i)}
                          style={{
                            flexShrink: 0, width: '80px', height: '56px',
                            borderRadius: '6px', overflow: 'hidden',
                            border: `2px solid ${activePhoto === i ? 'var(--gold)' : 'transparent'}`,
                            cursor: 'pointer', padding: 0, background: 'none',
                            transition: 'border-color 0.2s',
                          }}
                        >
                          <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === '3d' && (
                  <div style={{ aspectRatio: '16/9', background: '#0A0A0B', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                    <div style={{ width: '56px', height: '56px', background: 'var(--gold-muted)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Home size={24} color="var(--gold)" />
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>Matterport 3D Tour</p>
                    <a href={listing.media.matterport} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ fontSize: '13px' }}>
                      Open 3D Tour <ExternalLink size={14} />
                    </a>
                  </div>
                )}

                {activeTab === 'floorplan' && (
                  <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                    <img src={listing.media.floorplan} alt="Floorplan" style={{ width: '100%', height: '100%', objectFit: 'contain', background: 'var(--surface)', display: 'block' }} />
                  </div>
                )}

                {activeTab === 'video' && (
                  <div style={{ aspectRatio: '16/9' }}>
                    <iframe
                      src={listing.media.povVideo}
                      title="POV Video Tour"
                      style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                      allow="autoplay; fullscreen"
                    />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              style={{ marginBottom: '32px' }}
            >
              <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '22px', fontWeight: 600, color: 'var(--text)', marginBottom: '14px' }}>
                About This Home
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.75, margin: 0 }}>
                {listing.description}
              </p>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{ marginBottom: '32px' }}
            >
              <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '22px', fontWeight: 600, color: 'var(--text)', marginBottom: '16px' }}>
                Amenities
              </h2>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {listing.amenities.map(a => (
                  <div key={a} className="amenity-pill">
                    <CheckCircle size={11} color="var(--green)" />
                    {a}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Transit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              style={{ marginBottom: '32px' }}
            >
              <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '22px', fontWeight: 600, color: 'var(--text)', marginBottom: '16px' }}>
                Transit Access
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {listing.transit.map((t, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '14px 16px',
                    background: 'var(--card)', border: '1px solid var(--border)',
                    borderRadius: '10px',
                  }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {t.line.split('/').map(line => (
                        <div key={line} className="transit-line" style={{ background: getLineColor(line), color: '#fff' }}>
                          {line}
                        </div>
                      ))}
                    </div>
                    <Train size={14} color="var(--text-muted)" />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: '14px', color: 'var(--text)', fontWeight: 500 }}>{t.distance}</span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '8px' }}>· {t.time} walk</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div style={{ position: 'sticky', top: '88px' }}>
            {/* Rent Rewards Estimator */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="rewards-card"
              style={{ marginBottom: '16px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <DollarSign size={18} color="var(--gold)" />
                <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '20px', fontWeight: 600, color: 'var(--text)', margin: 0 }}>
                  Rent Rewards
                </h3>
              </div>

              <div style={{
                background: 'var(--bg)', borderRadius: '8px', padding: '16px',
                marginBottom: '16px', border: '1px solid var(--border)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Monthly Rent</span>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', color: 'var(--text)' }}>${listing.priceGross.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Annual Rent</span>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', color: 'var(--text)', fontWeight: 700 }}>
                    ${annualRent.toLocaleString()}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Est. Rewards ({rewardRate}%)</span>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '14px', color: 'var(--gold)', fontWeight: 700 }}>
                    ${rewardsValue.toLocaleString()}
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                  Reward Rate: <strong style={{ color: 'var(--gold)' }}>{rewardRate}%</strong>
                </label>
                <input
                  type="range" min="1" max="5" step="0.5"
                  value={rewardRate}
                  onChange={e => setRewardRate(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--gold)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  <span>1%</span><span>5%</span>
                </div>
              </div>

              <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '0 0 16px', lineHeight: 1.5 }}>
                Earn Rentopia reward points on each month of rent paid, redeemable toward future rent, gift cards & more.
              </p>
            </motion.div>

            {/* Request a Tour */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              style={{
                background: 'var(--card)', border: '1px solid var(--border-light)',
                borderRadius: '12px', padding: '24px',
              }}
            >
              <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '20px', fontWeight: 600, color: 'var(--text)', margin: '0 0 16px' }}>
                Request a Tour
              </h3>

              <TourForm listing={listing} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TourForm({ listing }: { listing: any }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Tour Request: ${listing.title}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nPreferred Date: ${form.date}\n\n${form.message}\n\nListing: ${listing.title} — $${listing.priceGross}/mo`
    )
    window.location.href = `mailto:duylegacyventure@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: '16px 0' }}>
        <CheckCircle size={32} color="var(--green)" style={{ marginBottom: '12px' }} />
        <p style={{ fontSize: '14px', color: 'var(--text)', fontWeight: 500 }}>Tour request sent!</p>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>We'll be in touch within 24 hours.</p>
        <button onClick={() => setSent(false)} className="btn-ghost" style={{ marginTop: '12px', fontSize: '12px' }}>
          Send Another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <input className="input-dark" placeholder="Your Name" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
      <input className="input-dark" type="email" placeholder="Email Address" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
      <input className="input-dark" placeholder="Phone Number" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
      <input className="input-dark" type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
      <textarea
        className="input-dark"
        placeholder="Any questions or notes..."
        rows={3}
        value={form.message}
        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
        style={{ resize: 'vertical' }}
      />
      <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
        <Mail size={15} /> Request Tour
      </button>
    </form>
  )
}
