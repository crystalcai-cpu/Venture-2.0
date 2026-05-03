import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, MapPin, ArrowRight, CheckCircle } from 'lucide-react'
import { useApp } from '@/context/AppContext'

export const Route = createFileRoute('/signup')({
  component: SignupPage,
})

function SignupPage() {
  const { signup, currentUser } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (currentUser) {
    navigate({ to: '/' })
    return null
  }

  const passwordStrength = (p: string): { label: string; color: string; width: string } => {
    if (p.length === 0) return { label: '', color: 'transparent', width: '0%' }
    if (p.length < 6) return { label: 'Weak', color: 'var(--red)', width: '25%' }
    if (p.length < 10) return { label: 'Fair', color: '#F59E0B', width: '55%' }
    if (/[A-Z]/.test(p) && /[0-9]/.test(p)) return { label: 'Strong', color: 'var(--green)', width: '100%' }
    return { label: 'Good', color: '#3B82F6', width: '75%' }
  }

  const strength = passwordStrength(form.password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 400))
    const result = signup(form.name, form.email, form.password)
    setLoading(false)
    if (result.success) {
      navigate({ to: '/' })
    } else {
      setError(result.error || 'Signup failed.')
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
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&q=80)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'brightness(0.08)', pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%', maxWidth: '440px',
          background: 'var(--card)', border: '1px solid var(--border-light)',
          borderRadius: '20px', padding: '40px',
          position: 'relative', zIndex: 1,
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px', justifyContent: 'center' }}>
          <div style={{ width: '36px', height: '36px', background: 'var(--gold)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MapPin size={18} color="#050505" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '20px', fontWeight: 700, color: 'var(--text)' }}>Rentopia</div>
            <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)' }}>Duy Legacy Ventures</div>
          </div>
        </div>

        <h1 style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '28px', fontWeight: 700,
          color: 'var(--text)', margin: '0 0 6px', textAlign: 'center', letterSpacing: '-0.02em',
        }}>
          Create Account
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', margin: '0 0 28px' }}>
          Save listings, track tours & earn rewards
        </p>

        {/* Perks */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Save Listings', 'Track Tours', 'Earn Rewards'].map(perk => (
            <div key={perk} style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              fontSize: '11px', color: 'var(--text-muted)',
            }}>
              <CheckCircle size={11} color="var(--green)" />
              {perk}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px', letterSpacing: '0.04em' }}>
              FULL NAME
            </label>
            <input className="input-dark" placeholder="Your full name" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px', letterSpacing: '0.04em' }}>
              EMAIL ADDRESS
            </label>
            <input className="input-dark" type="email" placeholder="you@example.com" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px', letterSpacing: '0.04em' }}>
              PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <input
                className="input-dark"
                type={showPass ? 'text' : 'password'}
                placeholder="Min. 6 characters"
                required
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                style={{ paddingRight: '44px' }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {form.password && (
              <div style={{ marginTop: '8px' }}>
                <div style={{ height: '3px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: strength.width, background: strength.color, transition: 'width 0.3s, background 0.3s', borderRadius: '2px' }} />
                </div>
                <div style={{ fontSize: '11px', color: strength.color, marginTop: '4px' }}>{strength.label}</div>
              </div>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px', letterSpacing: '0.04em' }}>
              CONFIRM PASSWORD
            </label>
            <input
              className="input-dark"
              type="password"
              placeholder="Repeat password"
              required
              value={form.confirm}
              onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))}
              style={{ borderColor: form.confirm && form.password !== form.confirm ? 'var(--red)' : undefined }}
            />
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '10px 14px', background: 'rgba(224,82,82,0.1)', border: '1px solid rgba(224,82,82,0.25)', borderRadius: '8px', fontSize: '13px', color: 'var(--red)' }}>
              {error}
            </motion.div>
          )}

          <button type="submit" className="btn-gold" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: '4px', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Creating Account...' : (<>Create Account <ArrowRight size={15} /></>)}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Already have an account?{' '}</span>
          <Link to="/login" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gold)', textDecoration: 'none' }}>Sign in</Link>
        </div>
      </motion.div>
    </div>
  )
}
