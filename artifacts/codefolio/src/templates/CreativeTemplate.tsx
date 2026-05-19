import React from 'react';
import { PublicPortfolio } from '@workspace/api-client-react';
import { ContactForm } from './ContactForm';

export default function CreativeTemplate({ data }: { data: PublicPortfolio }) {
  const { profile, projects, skills, username } = data;
  const initial = (profile?.name || username || 'U').charAt(0).toUpperCase();
  const cardColors = [
    { bg: 'linear-gradient(135deg, #fdf2f8, #fce7f3)', border: '#f9a8d4', accent: '#ec4899' },
    { bg: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '#86efac', accent: '#22c55e' },
    { bg: 'linear-gradient(135deg, #eff6ff, #dbeafe)', border: '#93c5fd', accent: '#3b82f6' },
    { bg: 'linear-gradient(135deg, #fefce8, #fef9c3)', border: '#fde047', accent: '#eab308' },
    { bg: 'linear-gradient(135deg, #f5f3ff, #ede9fe)', border: '#c4b5fd', accent: '#8b5cf6' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif", color: '#111827' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        @keyframes blob { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-50px) scale(1.1)} 66%{transform:translate(-20px,20px) scale(0.9)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .cr-card:hover { transform: translateY(-4px) rotate(0deg) !important; box-shadow: 0 20px 50px rgba(0,0,0,0.1) !important; }
        .cr-card { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
        .cr-skill:hover { transform: scale(1.06) rotate(0deg) !important; }
        .cr-skill { transition: all 0.2s; cursor: default; }
        .blob1 { animation: blob 8s ease-in-out infinite; }
        .blob2 { animation: blob 10s ease-in-out infinite reverse; animation-delay: -3s; }
        .blob3 { animation: blob 12s ease-in-out infinite; animation-delay: -5s; }
      `}} />

      {/* Blob background */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        <div className="blob1" style={{ position: 'absolute', top: '-15%', left: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,114,182,0.15) 0%, transparent 70%)' }} />
        <div className="blob2" style={{ position: 'absolute', top: '20%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)' }} />
        <div className="blob3" style={{ position: 'absolute', bottom: '5%', left: '20%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)' }} />
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Hero */}
        <header style={{ paddingTop: 80, paddingBottom: 80, textAlign: 'center' }}>
          {profile?.avatarUrl ? (
            <img src={profile.avatarUrl} alt={profile.name || username} style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 24px', border: '4px solid white', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }} />
          ) : (
            <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, #f472b6, #a78bfa, #60a5fa)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 36, fontWeight: 800, margin: '0 auto 24px', boxShadow: '0 8px 32px rgba(167,139,250,0.3)' }}>
              {initial}
            </div>
          )}

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'white', border: '1px solid #e5e7eb', borderRadius: 999, padding: '6px 18px', marginBottom: 20, fontSize: 13, fontWeight: 600, color: '#6b7280', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            ✦ {profile?.domain || 'Creative Designer'}
          </div>

          <h1 style={{ fontSize: 'clamp(48px, 8vw, 76px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.02, marginBottom: 24, background: 'linear-gradient(135deg, #111827 0%, #7c3aed 50%, #db2777 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {profile?.name || username}
          </h1>

          <p style={{ fontSize: 18, color: '#6b7280', lineHeight: 1.75, maxWidth: 520, margin: '0 auto 36px' }}>
            {profile?.bio}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            {profile?.socialLinks?.github && <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" style={{ padding: '10px 22px', borderRadius: 999, background: 'white', border: '1px solid #e5e7eb', color: '#374151', fontSize: 14, fontWeight: 600, textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>GitHub</a>}
            {profile?.socialLinks?.linkedin && <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" style={{ padding: '10px 22px', borderRadius: 999, background: 'white', border: '1px solid #e5e7eb', color: '#374151', fontSize: 14, fontWeight: 600, textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>LinkedIn</a>}
            {profile?.resumeUrl && <a href={profile.resumeUrl} target="_blank" rel="noreferrer" style={{ padding: '10px 28px', borderRadius: 999, background: 'linear-gradient(135deg, #7c3aed, #db2777)', color: 'white', fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 20px rgba(124,58,237,0.35)' }}>Download Resume</a>}
          </div>
        </header>

        {/* Projects — bento grid */}
        {projects && projects.length > 0 && (
          <section style={{ paddingBottom: 80 }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>Selected Work</h2>
              <p style={{ color: '#9ca3af', fontSize: 15 }}>Things I've built and shipped</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {projects.map((p, i) => {
                const c = cardColors[i % cardColors.length];
                const isWide = i === 0;
                return (
                  <div key={p.id} className="cr-card" style={{ background: c.bg, border: `1.5px solid ${c.border}`, borderRadius: 20, padding: '28px', gridColumn: isWide ? 'span 2' : undefined, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: `radial-gradient(circle, ${c.accent}20 0%, transparent 70%)` }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>{p.title}</h3>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {p.repoLink && <a href={p.repoLink} target="_blank" rel="noreferrer" style={{ fontSize: 12, fontWeight: 600, color: c.accent, textDecoration: 'none', background: `${c.accent}15`, padding: '4px 10px', borderRadius: 999 }}>Code</a>}
                        {p.liveLink && <a href={p.liveLink} target="_blank" rel="noreferrer" style={{ fontSize: 12, fontWeight: 600, color: 'white', textDecoration: 'none', background: c.accent, padding: '4px 10px', borderRadius: 999 }}>Live ↗</a>}
                      </div>
                    </div>
                    <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.65, marginBottom: 16 }}>{p.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {p.techStack?.map(t => (
                        <span key={t} style={{ fontSize: 12, fontWeight: 500, padding: '4px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.7)', color: '#374151' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Skills */}
        {Object.values(skills || {}).flat().length > 0 && (
          <section style={{ paddingBottom: 80, textAlign: 'center' }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>Capabilities</h2>
            <p style={{ color: '#9ca3af', fontSize: 15, marginBottom: 40 }}>Tools and technologies I love working with</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
              {Object.entries(skills || {}).flatMap(([, items], ci) =>
                (items || []).map((s: string, si: number) => {
                  const c = cardColors[(ci * 3 + si) % cardColors.length];
                  const angle = (si % 2 === 0 ? -1 : 1) * (si % 3 + 1);
                  return (
                    <span key={`${ci}-${s}`} className="cr-skill" style={{ padding: '10px 20px', borderRadius: 999, background: c.bg, border: `1.5px solid ${c.border}`, color: '#111827', fontSize: 15, fontWeight: 600, transform: `rotate(${angle}deg)` }}>
                      {s}
                    </span>
                  );
                })
              )}
            </div>
          </section>
        )}

        {/* Contact */}
        <section style={{ paddingBottom: 80 }}>
          <div style={{ background: 'white', borderRadius: 24, padding: '40px', border: '1.5px solid #e5e7eb', boxShadow: '0 4px 32px rgba(0,0,0,0.06)', maxWidth: 580, margin: '0 auto' }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 6, textAlign: 'center' }}>Let's create together ✦</h2>
            <p style={{ color: '#9ca3af', textAlign: 'center', marginBottom: 28, fontSize: 15 }}>Have a project in mind? I'd love to hear about it.</p>
            <ContactForm username={username} template="creative" />
          </div>
        </section>
      </div>
    </div>
  );
}
