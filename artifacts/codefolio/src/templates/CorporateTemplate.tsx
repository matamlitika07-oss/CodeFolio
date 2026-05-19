import React from 'react';
import { PublicPortfolio } from '@workspace/api-client-react';
import { ContactForm } from './ContactForm';

export default function CorporateTemplate({ data }: { data: PublicPortfolio }) {
  const { profile, projects, skills, username } = data;
  const initials = (profile?.name || username || 'U').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Inter', system-ui, sans-serif", display: 'flex', flexDirection: 'column' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .corp-card:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(15,23,42,0.1); }
        .corp-card { transition: all 0.25s; }
        .corp-link:hover { color: #0f172a; }
        .corp-btn:hover { background: #1e3a8a; transform: scale(1.02); }
        .corp-btn { transition: all 0.2s; }
      `}} />

      {/* Top nav bar */}
      <nav style={{ background: '#0f172a', padding: '0 40px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg, #3b82f6, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14, fontWeight: 700 }}>
            {initials}
          </div>
          <span style={{ color: 'white', fontWeight: 600, fontSize: 15 }}>{profile?.name || username}</span>
          {profile?.domain && (
            <span style={{ background: 'rgba(59,130,246,0.2)', color: '#60a5fa', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {profile.domain}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          {profile?.socialLinks?.github && <a href={profile.socialLinks.github} className="corp-link" style={{ color: '#94a3b8', fontSize: 13, fontWeight: 500, textDecoration: 'none', transition: 'color 0.15s' }}>GitHub</a>}
          {profile?.socialLinks?.linkedin && <a href={profile.socialLinks.linkedin} className="corp-link" style={{ color: '#94a3b8', fontSize: 13, fontWeight: 500, textDecoration: 'none', transition: 'color 0.15s' }}>LinkedIn</a>}
          {profile?.resumeUrl && (
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="corp-btn" style={{ background: '#2563eb', color: 'white', fontSize: 13, fontWeight: 600, padding: '8px 18px', borderRadius: 8, textDecoration: 'none' }}>
              Resume ↓
            </a>
          )}
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', padding: '72px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: 'linear-gradient(135deg, transparent 30%, rgba(59,130,246,0.06))', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, right: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3b82f6', marginBottom: 16 }}>
                {'{'} Backend · Systems · Architecture {'}'}
              </div>
              <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, color: 'white', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 20 }}>
                {profile?.name || username}
              </h1>
              <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.75, maxWidth: 480 }}>
                {profile?.bio || 'Experienced engineer specializing in scalable backend systems and distributed architecture.'}
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {[
                { label: 'Projects', value: projects?.length || 0, color: '#3b82f6' },
                { label: 'Skills', value: Object.values(skills || {}).flat().length, color: '#6366f1' },
              ].map(stat => (
                <div key={stat.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '24px 28px', textAlign: 'center', minWidth: 110 }}>
                  <div style={{ fontSize: 40, fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 6, fontWeight: 500 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 40px', width: '100%' }}>

        {/* Skills */}
        {Object.values(skills || {}).flat().length > 0 && (
          <section style={{ marginBottom: 60 }}>
            <SectionLabel label="Core Competencies" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
              {Object.entries(skills || {}).map(([cat, items]) => {
                if (!items || items.length === 0) return null;
                const colors: Record<string, string> = { frontend: '#3b82f6', backend: '#6366f1', devops: '#10b981', other: '#f59e0b' };
                const color = colors[cat] || '#6366f1';
                return (
                  <div key={cat} className="corp-card" style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: '18px 20px', borderTop: `3px solid ${color}` }}>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color, marginBottom: 12 }}>{cat}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {items.map((s: string) => (
                        <span key={s} style={{ fontSize: 12, padding: '3px 9px', borderRadius: 6, background: `${color}12`, color: '#374151', fontWeight: 500 }}>{s}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section style={{ marginBottom: 60 }}>
            <SectionLabel label="Selected Projects" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {projects.map((p, i) => (
                <div key={p.id} className="corp-card" style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 14, padding: '28px 32px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #3b82f6, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 700 }}>
                        {i + 1}
                      </div>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>{p.title}</h3>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      {p.repoLink && <a href={p.repoLink} target="_blank" rel="noreferrer" style={{ fontSize: 13, fontWeight: 500, color: '#3b82f6', textDecoration: 'none', padding: '6px 14px', border: '1px solid #bfdbfe', borderRadius: 8 }}>Source Code</a>}
                      {p.liveLink && <a href={p.liveLink} target="_blank" rel="noreferrer" style={{ fontSize: 13, fontWeight: 600, color: 'white', textDecoration: 'none', padding: '6px 14px', background: 'linear-gradient(135deg, #2563eb, #4f46e5)', borderRadius: 8 }}>View Live ↗</a>}
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, marginBottom: 16 }}>{p.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {p.techStack?.map(t => (
                      <span key={t} style={{ fontSize: 12, fontWeight: 500, padding: '4px 10px', borderRadius: 6, background: '#f1f5f9', color: '#374151' }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section>
          <SectionLabel label="Get In Touch" />
          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 14, padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <ContactForm username={username} template="corporate" />
          </div>
        </section>
      </div>
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
      <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2563eb' }}>{label}</h2>
      <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
    </div>
  );
}
