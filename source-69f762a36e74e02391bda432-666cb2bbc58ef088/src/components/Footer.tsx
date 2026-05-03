import { Link } from '@tanstack/react-router'
import { MapPin, Mail, Phone, Instagram, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer style={{
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      marginTop: 'auto',
    }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '56px 24px 32px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '48px',
          marginBottom: '48px',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '32px', height: '32px',
                background: 'var(--gold)', borderRadius: '6px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <MapPin size={16} color="#050505" strokeWidth={2.5} />
              </div>
              <div>
                <div style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '18px', fontWeight: 700, color: 'var(--text)' }}>
                  Rentopia
                </div>
                <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                  Duy Legacy Ventures
                </div>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '280px' }}>
              Premium rental listings across New York City's most sought-after neighborhoods, with white-glove service from search to signing.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              {[Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: '34px', height: '34px',
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)', transition: 'border-color 0.2s, color 0.2s', textDecoration: 'none',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(212,175,55,0.3)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)' }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Browse */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Browse
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                ['Find a Home', '/search'],
                ['Manhattan', '/search'],
                ['Brooklyn', '/search'],
                ['Queens', '/search'],
              ].map(([label, to]) => (
                <Link key={label} to={to as any} style={{
                  fontSize: '13px', color: 'var(--text-secondary)',
                  textDecoration: 'none', transition: 'color 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)' }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Company
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['About', 'Press', 'Careers', 'Blog'].map(item => (
                <a key={item} href="#" style={{
                  fontSize: '13px', color: 'var(--text-secondary)',
                  textDecoration: 'none', transition: 'color 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)' }}>
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="mailto:duylegacyventure@gmail.com" style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                fontSize: '12px', color: 'var(--text-secondary)', textDecoration: 'none',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)' }}>
                <Mail size={13} />
                duylegacyventure@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
            Duy Legacy Ventures LLC | Rentopia Affiliate | NY Real Estate Salesperson License #10401397996
          </p>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
            © {new Date().getFullYear()} Duy Legacy Ventures LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
