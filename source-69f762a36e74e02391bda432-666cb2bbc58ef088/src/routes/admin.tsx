import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield, Plus, Edit2, Trash2, Search, ChevronDown, ChevronUp,
  X, Save, Building2, MapPin, DollarSign, Inbox, Eye, AlertTriangle
} from 'lucide-react'
import { useApp } from '@/context/AppContext'
import type { Listing } from '@/data/listings'

export const Route = createFileRoute('/admin')({
  component: AdminPage,
})

type Tab = 'listings' | 'leads'
type SortField = 'priceGross' | 'neighborhood' | 'beds' | 'availableDate'

const EMPTY_LISTING: Omit<Listing, 'id'> = {
  title: '',
  priceGross: 0,
  priceNet: 0,
  neighborhood: '',
  sqft: 0,
  beds: 1,
  baths: 1,
  latitude: 40.7128,
  longitude: -73.9760,
  isNoFee: false,
  petsAllowed: false,
  availableDate: '',
  amenities: [],
  description: '',
  media: { photos: [''], matterport: '', floorplan: '', povVideo: '' },
  transit: [],
}

function AdminPage() {
  const { currentUser, listings, setListings } = useApp()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('listings')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField>('availableDate')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [editingListing, setEditingListing] = useState<Listing | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [leads] = useState<any[]>([]) // Contact form submissions

  // Auth guard — client-side redirect
  useEffect(() => {
    if (currentUser === null) {
      navigate({ to: '/login' })
    } else if (currentUser && !currentUser.isAdmin) {
      navigate({ to: '/' })
    }
  }, [currentUser, navigate])

  if (!currentUser?.isAdmin) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 64px)', flexDirection: 'column', gap: '16px' }}>
        <Shield size={32} color="var(--gold)" />
        <p style={{ color: 'var(--text-muted)' }}>Verifying access...</p>
      </div>
    )
  }

  const filtered = listings.filter(l => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return l.title.toLowerCase().includes(q) || l.neighborhood.toLowerCase().includes(q)
  }).sort((a, b) => {
    const aVal = a[sortField]
    const bVal = b[sortField]
    if (typeof aVal === 'number' && typeof bVal === 'number') return sortDir === 'asc' ? aVal - bVal : bVal - aVal
    return sortDir === 'asc'
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal))
  })

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortField(field); setSortDir('asc') }
  }

  const handleDelete = (id: string) => {
    setListings(listings.filter(l => l.id !== id))
    setDeleteConfirm(null)
  }

  const handleSave = (data: Listing) => {
    if (listings.find(l => l.id === data.id)) {
      setListings(listings.map(l => l.id === data.id ? data : l))
    } else {
      setListings([...listings, data])
    }
    setEditingListing(null)
    setIsCreating(false)
  }

  const SortHeader = ({ field, label }: { field: SortField; label: string }) => (
    <th
      className="admin-table-th"
      onClick={() => toggleSort(field)}
      style={{ cursor: 'pointer', userSelect: 'none', textAlign: 'left', padding: '10px 16px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: sortField === field ? 'var(--gold)' : 'var(--text-muted)', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
        {label}
        {sortField === field
          ? (sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)
          : <ChevronDown size={12} style={{ opacity: 0.3 }} />
        }
      </span>
    </th>
  )

  return (
    <div style={{ background: 'var(--bg)', minHeight: 'calc(100vh - 64px)' }}>
      {/* Admin Header */}
      <div style={{
        background: 'var(--surface)', borderBottom: '1px solid var(--border)',
        padding: '24px',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px', height: '44px',
              background: 'var(--gold-muted)', border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Shield size={22} color="var(--gold)" />
            </div>
            <div>
              <h1 style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '26px', fontWeight: 700,
                color: 'var(--text)', margin: 0, letterSpacing: '-0.02em',
              }}>
                Admin Vault
              </h1>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>
                Duy Legacy Ventures — Management Portal
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{
              padding: '6px 12px', background: 'rgba(76,175,125,0.1)', border: '1px solid rgba(76,175,125,0.2)',
              borderRadius: '100px', fontSize: '12px', color: 'var(--green)', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)' }} />
              {listings.length} Active Listings
            </div>
            <button
              onClick={() => { setIsCreating(true); setEditingListing(null) }}
              className="btn-gold"
              style={{ fontSize: '13px', gap: '6px' }}
            >
              <Plus size={15} /> Add Listing
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
        {/* Tabs */}
        <div className="tab-bar" style={{ marginBottom: '24px', width: 'fit-content' }}>
          <button className={`tab-item ${activeTab === 'listings' ? 'active' : ''}`} onClick={() => setActiveTab('listings')}>
            <Building2 size={13} style={{ marginRight: '6px' }} />Listing Manager
          </button>
          <button className={`tab-item ${activeTab === 'leads' ? 'active' : ''}`} onClick={() => setActiveTab('leads')}>
            <Inbox size={13} style={{ marginRight: '6px' }} />Lead Manager
            {leads.length > 0 && (
              <span style={{ marginLeft: '6px', background: 'var(--gold)', color: '#050505', padding: '1px 6px', borderRadius: '100px', fontSize: '10px', fontWeight: 700 }}>
                {leads.length}
              </span>
            )}
          </button>
        </div>

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Search */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1, maxWidth: '360px' }}>
                <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input
                  className="input-dark"
                  style={{ paddingLeft: '36px', height: '40px' }}
                  placeholder="Filter listings..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                {filtered.length} of {listings.length} listings
              </span>
            </div>

            {/* Table */}
            <div style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: '12px', overflow: 'hidden',
            }}>
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '10px 16px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                        Property
                      </th>
                      <SortHeader field="neighborhood" label="Neighborhood" />
                      <SortHeader field="priceGross" label="Price/mo" />
                      <SortHeader field="beds" label="Beds" />
                      <SortHeader field="availableDate" label="Available" />
                      <th style={{ textAlign: 'left', padding: '10px 16px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                        Flags
                      </th>
                      <th style={{ textAlign: 'right', padding: '10px 16px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(listing => (
                      <tr key={listing.id}>
                        <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', verticalAlign: 'middle' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img src={listing.media.photos[0]} alt="" style={{ width: '44px', height: '36px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }} />
                            <div>
                              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {listing.title}
                              </div>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ID: {listing.id}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', fontSize: '13px', color: 'var(--text-secondary)', verticalAlign: 'middle' }}>
                          {listing.neighborhood}
                        </td>
                        <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', verticalAlign: 'middle' }}>
                          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', color: 'var(--gold)', fontWeight: 700 }}>
                            ${listing.priceGross.toLocaleString()}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', fontSize: '13px', color: 'var(--text-secondary)', verticalAlign: 'middle' }}>
                          {listing.beds === 0 ? 'Studio' : `${listing.beds}BR`}
                        </td>
                        <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', fontSize: '12px', color: 'var(--text-secondary)', verticalAlign: 'middle' }}>
                          {new Date(listing.availableDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}
                        </td>
                        <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', verticalAlign: 'middle' }}>
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            {listing.isNoFee && <span className="badge badge-gold" style={{ fontSize: '10px' }}>No Fee</span>}
                            {listing.petsAllowed && <span className="badge badge-muted" style={{ fontSize: '10px' }}>Pets</span>}
                          </div>
                        </td>
                        <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', verticalAlign: 'middle', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                            <Link
                              to="/property/$id"
                              params={{ id: listing.id }}
                              style={{
                                display: 'flex', alignItems: 'center', gap: '4px',
                                padding: '6px 10px', fontSize: '12px',
                                background: 'var(--surface)', border: '1px solid var(--border)',
                                color: 'var(--text-secondary)', borderRadius: '6px',
                                cursor: 'pointer', textDecoration: 'none',
                                transition: 'border-color 0.15s, color 0.15s',
                              }}
                            >
                              <Eye size={12} />
                            </Link>
                            <button
                              onClick={() => { setEditingListing(listing); setIsCreating(false) }}
                              style={{
                                display: 'flex', alignItems: 'center', gap: '4px',
                                padding: '6px 10px', fontSize: '12px',
                                background: 'var(--gold-muted)', border: '1px solid rgba(212,175,55,0.2)',
                                color: 'var(--gold)', borderRadius: '6px', cursor: 'pointer',
                                transition: 'background 0.15s',
                              }}
                            >
                              <Edit2 size={12} /> Edit
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(listing.id)}
                              className="btn-danger"
                              style={{ padding: '6px 10px', fontSize: '12px' }}
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filtered.length === 0 && (
                  <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <Building2 size={28} style={{ marginBottom: '12px', opacity: 0.3 }} />
                    <p style={{ fontSize: '14px' }}>No listings found.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: '12px', padding: '48px', textAlign: 'center',
            }}>
              <Inbox size={32} color="var(--gold)" style={{ marginBottom: '16px', opacity: 0.6 }} />
              <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '22px', fontWeight: 600, color: 'var(--text)', margin: '0 0 10px' }}>
                Lead Inbox
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '0 0 20px', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
                Tour requests submitted via property pages are routed directly to{' '}
                <strong style={{ color: 'var(--gold)' }}>duylegacyventure@gmail.com</strong>.
                Check your inbox for new inquiries.
              </p>
              <a
                href="https://mail.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{ display: 'inline-flex', fontSize: '13px', gap: '8px' }}
              >
                <Inbox size={14} /> Open Gmail Inbox
              </a>
            </div>
          </motion.div>
        )}
      </div>

      {/* Edit/Create Modal */}
      <AnimatePresence>
        {(editingListing || isCreating) && (
          <ListingFormModal
            listing={editingListing ?? { id: `listing_${Date.now()}`, ...EMPTY_LISTING }}
            isNew={isCreating}
            onSave={handleSave}
            onClose={() => { setEditingListing(null); setIsCreating(false) }}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'var(--card)', border: '1px solid var(--border-light)',
                borderRadius: '16px', padding: '32px', maxWidth: '420px', width: '100%',
                textAlign: 'center',
              }}
            >
              <AlertTriangle size={32} color="var(--red)" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '22px', fontWeight: 600, color: 'var(--text)', margin: '0 0 10px' }}>
                Delete Listing?
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '0 0 24px' }}>
                This action cannot be undone. The listing will be permanently removed.
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button onClick={() => setDeleteConfirm(null)} className="btn-ghost">Cancel</button>
                <button onClick={() => handleDelete(deleteConfirm)} className="btn-danger" style={{ fontSize: '14px', padding: '10px 24px' }}>
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ListingFormModal({ listing, isNew, onSave, onClose }: {
  listing: Listing
  isNew: boolean
  onSave: (l: Listing) => void
  onClose: () => void
}) {
  const [form, setForm] = useState<Listing>({ ...listing })
  const [amenityInput, setAmenityInput] = useState('')

  const update = (key: keyof Listing, value: any) => setForm(p => ({ ...p, [key]: value }))
  const updateMedia = (key: keyof Listing['media'], value: any) => setForm(p => ({ ...p, media: { ...p.media, [key]: value } }))

  const addAmenity = () => {
    if (!amenityInput.trim()) return
    setForm(p => ({ ...p, amenities: [...p.amenities, amenityInput.trim()] }))
    setAmenityInput('')
  }
  const removeAmenity = (a: string) => setForm(p => ({ ...p, amenities: p.amenities.filter(x => x !== a) }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="modal-overlay"
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 20 }}
        transition={{ duration: 0.25 }}
        className="modal-box"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '24px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
            {isNew ? 'Add New Listing' : 'Edit Listing'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Section: Basic Info */}
          <SectionHeader icon={<Building2 size={14} />} label="Basic Information" />
          <div className="form-grid" style={{ marginBottom: '20px' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <FieldLabel>Title</FieldLabel>
              <input className="input-dark" placeholder="e.g. Stunning Corner Unit — Park Slope" required value={form.title} onChange={e => update('title', e.target.value)} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <FieldLabel>Description</FieldLabel>
              <textarea className="input-dark" rows={3} placeholder="Describe the property..." value={form.description} onChange={e => update('description', e.target.value)} style={{ resize: 'vertical' }} />
            </div>
            <div>
              <FieldLabel>Neighborhood</FieldLabel>
              <input className="input-dark" placeholder="e.g. Park Slope" required value={form.neighborhood} onChange={e => update('neighborhood', e.target.value)} />
            </div>
            <div>
              <FieldLabel>Available Date</FieldLabel>
              <input className="input-dark" type="date" required value={form.availableDate} onChange={e => update('availableDate', e.target.value)} />
            </div>
          </div>

          {/* Section: Pricing & Size */}
          <SectionHeader icon={<DollarSign size={14} />} label="Pricing & Size" />
          <div className="form-grid" style={{ marginBottom: '20px' }}>
            <div>
              <FieldLabel>Gross Rent ($/mo)</FieldLabel>
              <input className="input-dark" type="number" min="0" required value={form.priceGross || ''} onChange={e => update('priceGross', Number(e.target.value))} />
            </div>
            <div>
              <FieldLabel>Net Rent ($/mo)</FieldLabel>
              <input className="input-dark" type="number" min="0" required value={form.priceNet || ''} onChange={e => update('priceNet', Number(e.target.value))} />
            </div>
            <div>
              <FieldLabel>Bedrooms</FieldLabel>
              <select className="input-dark" value={form.beds} onChange={e => update('beds', Number(e.target.value))}>
                <option value="0">Studio</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4+</option>
              </select>
            </div>
            <div>
              <FieldLabel>Bathrooms</FieldLabel>
              <select className="input-dark" value={form.baths} onChange={e => update('baths', Number(e.target.value))}>
                <option value="1">1</option>
                <option value="1.5">1.5</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div>
              <FieldLabel>Square Footage</FieldLabel>
              <input className="input-dark" type="number" min="0" value={form.sqft || ''} onChange={e => update('sqft', Number(e.target.value))} />
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', paddingTop: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-secondary)', userSelect: 'none' }}>
                <input type="checkbox" className="checkbox-gold" checked={form.isNoFee} onChange={e => update('isNoFee', e.target.checked)} />
                No Fee
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-secondary)', userSelect: 'none' }}>
                <input type="checkbox" className="checkbox-gold" checked={form.petsAllowed} onChange={e => update('petsAllowed', e.target.checked)} />
                Pets OK
              </label>
            </div>
          </div>

          {/* Section: Map Coordinates */}
          <SectionHeader icon={<MapPin size={14} />} label="Map Coordinates" />
          <div className="form-grid" style={{ marginBottom: '20px' }}>
            <div>
              <FieldLabel>Latitude</FieldLabel>
              <input className="input-dark" type="number" step="0.0001" value={form.latitude} onChange={e => update('latitude', Number(e.target.value))} />
            </div>
            <div>
              <FieldLabel>Longitude</FieldLabel>
              <input className="input-dark" type="number" step="0.0001" value={form.longitude} onChange={e => update('longitude', Number(e.target.value))} />
            </div>
          </div>

          {/* Section: Media */}
          <SectionHeader icon={<Eye size={14} />} label="Media" />
          <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <FieldLabel>Primary Photo URL</FieldLabel>
              <input className="input-dark" placeholder="https://..." value={form.media.photos[0] || ''} onChange={e => updateMedia('photos', [e.target.value, ...form.media.photos.slice(1)])} />
            </div>
            <div>
              <FieldLabel>Matterport URL</FieldLabel>
              <input className="input-dark" placeholder="https://my.matterport.com/..." value={form.media.matterport} onChange={e => updateMedia('matterport', e.target.value)} />
            </div>
            <div>
              <FieldLabel>POV Video URL (YouTube embed)</FieldLabel>
              <input className="input-dark" placeholder="https://www.youtube.com/embed/..." value={form.media.povVideo} onChange={e => updateMedia('povVideo', e.target.value)} />
            </div>
          </div>

          {/* Section: Amenities */}
          <SectionHeader icon={<Building2 size={14} />} label="Amenities" />
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <input
                className="input-dark"
                placeholder="Add amenity (e.g. Gym, Doorman)"
                value={amenityInput}
                onChange={e => setAmenityInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addAmenity() } }}
              />
              <button type="button" onClick={addAmenity} className="btn-ghost" style={{ flexShrink: 0, padding: '0 16px' }}>
                <Plus size={15} />
              </button>
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {form.amenities.map(a => (
                <div key={a} className="amenity-pill" style={{ cursor: 'pointer' }} onClick={() => removeAmenity(a)}>
                  {a} <X size={10} style={{ marginLeft: '4px' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
            <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
            <button type="submit" className="btn-gold" style={{ gap: '6px' }}>
              <Save size={15} /> {isNew ? 'Create Listing' : 'Save Changes'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

function SectionHeader({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '8px',
      marginBottom: '14px',
      paddingBottom: '8px',
      borderBottom: '1px solid var(--border)',
    }}>
      <span style={{ color: 'var(--gold)' }}>{icon}</span>
      <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</span>
    </div>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px', letterSpacing: '0.03em' }}>
      {children}
    </label>
  )
}
