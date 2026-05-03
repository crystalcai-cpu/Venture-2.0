import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Shield, Sparkles, TrendingUp, Building2 } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const neighborhoods = [
  { name: 'Brooklyn Heights', count: 47, img: 'https://images.unsplash.com/photo-1499092346302-2a6f2be9b228?w=600&q=80' },
  { name: 'Williamsburg', count: 83, img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80' },
  { name: 'Upper West Side', count: 61, img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80' },
  { name: 'DUMBO', count: 28, img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80' },
]

function HomePage() {
  return (
    <div style={{ background: 'var(--bg)' }}>
      {/* Hero */}
      <section style={{
        position: 'relative', minHeight: '92vh',
        display: 'flex', alignItems: 'center', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1800&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.18)',
        }} />
        <div className="noise-overlay" />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(5,5,5,0.95) 40%, rgba(5,5,5,0.4) 100%)',
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1440px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
          <div style={{ maxWidth: '680px' }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '6px 14px',
                background: 'var(--gold-muted)', border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '100px', marginBottom: '28px',
              }}>
                <Sparkles size={12} color="var(--gold)" />
                <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                  Rentopia Affiliate · Duy Legacy Ventures
                </span>
              </div>

              <h1 style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 700,
                color: 'var(--text)', margin: '0 0 24px',
                lineHeight: 1.05, letterSpacing: '-0.03em',
              }}>
                New York's<br />
                <span className="text-gold-gradient">Finest Rentals</span><br />
                Curated for You
              </h1>

              <p style={{ fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 40px', maxWidth: '520px' }}>
                Premium listings across Brooklyn, Manhattan & Queens — from prewar brownstones to penthouse lofts. White-glove guidance from search to signing.
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/search" className="btn-gold" style={{ fontSize: '14px', padding: '14px 32px' }}>
                  Explore Listings <ArrowRight size={16} />
                </Link>
                <a href="mailto:duylegacyventure@gmail.com" className="btn-ghost" style={{ fontSize: '14px', padding: '14px 28px' }}>
                  Schedule a Tour
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              style={{
                display: 'flex', gap: '40px', marginTop: '56px',
                paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {[
                { value: '10+', label: 'Active Listings' },
                { value: 'No Fee', label: 'Options Available' },
                { value: 'NYC', label: 'All 5 Boroughs' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '26px', fontWeight: 700, color: 'var(--gold)', lineHeight: 1, marginBottom: '6px' }}>
                    {value}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section style={{ padding: '96px 24px', maxWidth: '1440px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{ marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>
              Where to Live
            </p>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700,
              color: 'var(--text)', margin: 0, letterSpacing: '-0.02em',
            }}>
              Browse by Neighborhood
            </h2>
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {neighborhoods.map((n, i) => (
            <motion.div key={n.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
              <Link to="/search" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                  position: 'relative', borderRadius: '12px', overflow: 'hidden',
                  aspectRatio: '4/3', cursor: 'pointer',
                }}>
                  <img src={n.img} alt={n.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(5,5,5,0.8) 0%, transparent 60%)',
                  }} />
                  <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                    <div style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '22px', fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>
                      {n.name}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--gold)', marginTop: '4px' }}>{n.count} listings</div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 24px', background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px' }}>
            {[
              { icon: Shield, title: 'No-Fee Options', desc: 'Browse our curated no-broker-fee listings — more money in your pocket from day one.' },
              { icon: MapPin, title: 'Interactive Map', desc: 'Explore the city visually with our real-time price-tag map across all neighborhoods.' },
              { icon: TrendingUp, title: 'Rent Rewards', desc: 'Earn points on every month of rent paid through our Rentopia affiliate program.' },
              { icon: Building2, title: 'Licensed Agent', desc: 'NY RE Salesperson License #10401397996 — professional guidance throughout your search.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '44px', height: '44px',
                  background: 'var(--gold-muted)', border: '1px solid rgba(212,175,55,0.2)',
                  borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon size={20} color="var(--gold)" />
                </div>
                <div>
                  <h3 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>{title}</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '96px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700,
              color: 'var(--text)', margin: '0 0 20px', letterSpacing: '-0.02em',
            }}>
              Ready to Find Your Place in New York?
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 36px' }}>
              Let our team guide you through NYC's rental market with precision, honesty, and access to listings before they go public.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/search" className="btn-gold" style={{ fontSize: '14px', padding: '14px 32px' }}>
                View All Listings <ArrowRight size={16} />
              </Link>
              <a href="mailto:duylegacyventure@gmail.com" className="btn-ghost" style={{ fontSize: '14px', padding: '14px 28px' }}>
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
