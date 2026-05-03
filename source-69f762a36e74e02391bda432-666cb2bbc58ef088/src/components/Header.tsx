import { Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, GitCompare, User, LogOut, Shield, Menu, X, MapPin } from 'lucide-react'
import { useApp } from '@/context/AppContext'

export function Header() {
  const { currentUser, logout, favorites, compareQueue } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate({ to: '/' })
    setMenuOpen(false)
  }

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(5,5,5,0.9)',
      borderBottom: '1px solid var(--border)',
      backdropFilter: 'blur(16px)',
    }}>
      <div style={{
        maxWidth: '1440px', margin: '0 auto',
        padding: '0 24px',
        height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px',
            background: 'var(--gold)',
            borderRadius: '6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <MapPin size={16} color="#050505" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '18px', fontWeight: 700,
              color: 'var(--text)',
              lineHeight: 1,
            }}>
              Rentopia
            </div>
            <div style={{
              fontSize: '9px', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--gold)',
              lineHeight: 1,
              marginTop: '2px',
            }}>
              Duy Legacy Ventures
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <NavLink to="/search">Find a Home</NavLink>

          <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 4px' }} />

          {/* Favorites */}
          <Link to="/search" style={{ textDecoration: 'none' }}>
            <button style={{
              position: 'relative',
              width: '38px', height: '38px',
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-secondary)',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-light)'
              ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--red)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'
              ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'
            }}>
              <Heart size={15} />
              {favorites.length > 0 && (
                <span style={{
                  position: 'absolute', top: '-4px', right: '-4px',
                  width: '16px', height: '16px',
                  background: 'var(--red)', color: '#fff',
                  borderRadius: '50%', fontSize: '9px', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {favorites.length}
                </span>
              )}
            </button>
          </Link>

          {/* Compare */}
          {compareQueue.length > 0 && (
            <button style={{
              position: 'relative',
              height: '38px',
              padding: '0 14px',
              background: 'var(--gold-muted)',
              border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: '8px',
              display: 'flex', alignItems: 'center', gap: '6px',
              cursor: 'pointer', color: 'var(--gold)',
              fontSize: '12px', fontWeight: 600,
              transition: 'background 0.2s',
            }}>
              <GitCompare size={14} />
              Compare ({compareQueue.length})
            </button>
          )}

          {/* Auth */}
          {currentUser ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  height: '38px', padding: '0 14px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  cursor: 'pointer', color: 'var(--text)',
                  fontSize: '13px', fontWeight: 500,
                  transition: 'border-color 0.2s',
                }}
              >
                <div style={{
                  width: '22px', height: '22px',
                  background: 'var(--gold)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '10px', fontWeight: 700, color: '#050505',
                }}>
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                {currentUser.name.split(' ')[0]}
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                      width: '200px',
                      background: 'var(--card)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '10px',
                      padding: '8px',
                      boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                    }}>
                    <div style={{ padding: '10px 12px 12px', borderBottom: '1px solid var(--border)', marginBottom: '8px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>{currentUser.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{currentUser.email}</div>
                    </div>
                    {currentUser.isAdmin && (
                      <DropdownItem icon={<Shield size={14} />} label="Admin Vault" onClick={() => { navigate({ to: '/admin' }); setMenuOpen(false) }} gold />
                    )}
                    <DropdownItem icon={<LogOut size={14} />} label="Sign Out" onClick={handleLogout} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link to="/login" className="btn-ghost" style={{ height: '38px', padding: '0 16px', fontSize: '13px' }}>
                Log In
              </Link>
              <Link to="/signup" className="btn-gold" style={{ height: '38px', padding: '0 16px', fontSize: '13px' }}>
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      style={{ textDecoration: 'none' }}
      activeProps={{ style: { color: 'var(--gold)' } }}
    >
      <span style={{
        padding: '8px 14px',
        fontSize: '13px',
        fontWeight: 500,
        color: 'var(--text-secondary)',
        borderRadius: '6px',
        transition: 'color 0.15s, background 0.15s',
        display: 'block',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLSpanElement).style.color = 'var(--text)'
        ;(e.currentTarget as HTMLSpanElement).style.background = 'rgba(255,255,255,0.04)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLSpanElement).style.color = 'var(--text-secondary)'
        ;(e.currentTarget as HTMLSpanElement).style.background = 'transparent'
      }}>
        {children}
      </span>
    </Link>
  )
}

function DropdownItem({ icon, label, onClick, gold }: { icon: React.ReactNode; label: string; onClick: () => void; gold?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
        padding: '9px 12px',
        background: 'transparent',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        color: gold ? 'var(--gold)' : 'var(--text-secondary)',
        fontSize: '13px', fontWeight: 500,
        transition: 'background 0.15s, color 0.15s',
        textAlign: 'left',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
    >
      {icon}
      {label}
    </button>
  )
}
