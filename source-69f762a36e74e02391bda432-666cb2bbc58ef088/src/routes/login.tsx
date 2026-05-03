import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, MapPin, Lock, ArrowRight } from 'lucide-react'
import { useApp } from '@/context/AppContext'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const { login, currentUser } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (currentUser) {
    navigate({ to: '/' })
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 400))
    const result = login(form.email, form.password)
    setLoading(false)
    if (result.success) {
      navigate({ to: '/' })
    } else {
      setError(result.error || 'Login failed.')
    }
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px',
      background: 'var(--bg)',
      position: 'relative',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'brightness(0.08)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%', maxWidth: '420px',
          background: 'var(--card)',
          border: '1px solid var(--border-light)',
          borderRadius: '20px',
          padding: '40px',
          position: 'relative', zIndex: 1,
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', justifyContent: 'center' }}>
          <div style={{ width: '36px', height: '36px', background: 'var(--gold)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MapPin size={18} color="#050505" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '20px', fontWeight: 700, color: 'var(--text)' }}>Rentopia</div>
            <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)' }}>Duy Legacy Ventures</div>
          </div>
        </div>

        <h1 style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: '28px', fontWeight: 700,
          color: 'var(--text)', margin: '0 0 8px',
          textAlign: 'center', letterSpacing: '-0.02em',
        }}>
          Welcome Back
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', margin: '0 0 28px' }}>
          Sign in to your Rentopia account
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px', letterSpacing: '0.04em' }}>
              EMAIL ADDRESS
            </label>
            <input
              className="input-dark"
              type="email"
              placeholder="you@example.com"
              required
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px', letterSpacing: '0.04em' }}>
              PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <input
                className="input-dark"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                required
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                style={{ paddingRight: '44px' }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text-muted)', display: 'flex', alignItems: 'center',
                }}
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
              style={{
                padding: '10px 14px', background: 'rgba(224,82,82,0.1)',
                border: '1px solid rgba(224,82,82,0.25)', borderRadius: '8px',
                fontSize: '13px', color: 'var(--red)',
              }}
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            className="btn-gold"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', marginTop: '4px', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Signing In...' : (<>Sign In <ArrowRight size={15} /></>)}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Don't have an account?{' '}
          </span>
          <Link to="/signup" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gold)', textDecoration: 'none' }}>
            Sign up
          </Link>
        </div>

        {/* Admin hint */}
        <div style={{
          marginTop: '24px', padding: '12px 16px',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>
            <Lock size={11} />
            Admin Access
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
            Use admin@duylegacyventures.com to access the admin vault.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
