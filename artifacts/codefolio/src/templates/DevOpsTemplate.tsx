import React from 'react';
import { PublicPortfolio } from '@workspace/api-client-react';
import { ContactForm } from './ContactForm';

export default function DevOpsTemplate({ data }: { data: PublicPortfolio }) {
  const { profile, projects, skills, username } = data;
  const initial = (profile?.name || username || 'U').charAt(0).toUpperCase();
  const allTools = Object.values(skills || {}).flat();
  const devopsTools = skills?.devops || [];
  const backendTools = skills?.backend || [];

  const PIPELINE = ['Plan', 'Code', 'Build', 'Test', 'Deploy', 'Monitor'];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0e1a', color: '#e2e8f0', fontFamily: "'Inter', system-ui, sans-serif", overflowX: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes flow { 0%{transform:translateX(-100%)} 100%{transform:translateX(400%)} }
        .dv-card:hover { border-color: rgba(251,146,60,0.4) !important; transform: translateY(-2px); }
        .dv-card { transition: all 0.25s; }
        .badge:hover { transform: scale(1.05); }
        .badge { transition: transform 0.15s; }
        .pipeline-dot { animation: pulse 2s ease-in-out infinite; }
      `}} />

      {/* Top bar */}
      <nav style={{ background: '#060b16', borderBottom: '1px solid rgba(251,146,60,0.15)', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} className="pipeline-dot" />
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#94a3b8' }}>
            {profile?.name || username} <span style={{ color: '#fb923c' }}>~</span> infra
          </span>
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          {profile?.socialLinks?.github && <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>GitHub</a>}
          {profile?.socialLinks?.linkedin && <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>LinkedIn</a>}
          {profile?.resumeUrl && <a href={profile.resumeUrl} target="_blank" rel="noreferrer" style={{ fontSize: 12, fontWeight: 600, color: '#0a0e1a', background: '#fb923c', padding: '6px 16px', borderRadius: 6, textDecoration: 'none' }}>Resume</a>}
        </div>
      </nav>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px 80px' }}>

        {/* Hero */}
        <header style={{ paddingTop: 64, paddingBottom: 60, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28, flexWrap: 'wrap' }}>
            <div style={{ width: 64, height: 64, borderRadius: 14, background: 'linear-gradient(135deg, #f97316, #fb923c)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24, fontWeight: 800 }}>
              {initial}
            </div>
            <div>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', lineHeight: 1 }}>
                {profile?.name || username}
              </h1>
              <p style={{ fontSize: 15, color: '#fb923c', fontWeight: 600, marginTop: 6 }}>
                {profile?.domain || 'DevOps & Cloud Engineer'}
              </p>
            </div>
          </div>

          {profile?.bio && (
            <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.75, maxWidth: 580, marginBottom: 28 }}>
              {profile.bio}
            </p>
          )}

          {/* Stats */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              { label: 'Projects Deployed', value: projects?.length || 0, icon: '🚀' },
              { label: 'Cloud Tools', value: devopsTools.length || allTools.length, icon: '☁️' },
              { label: 'Backend Stack', value: backendTools.length, icon: '⚙️' },
            ].map(s => (
              <div key={s.label} style={{ flex: '1 1 130px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(251,146,60,0.15)', borderRadius: 12, padding: '16px 20px' }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#fb923c' }}>{s.value}</div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </header>

        {/* CI/CD Pipeline */}
        <section style={{ paddingTop: 52, paddingBottom: 52, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <SectionLabel label="CI/CD Pipeline" color="#fb923c" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto', paddingBottom: 8 }}>
            {PIPELINE.map((step, i) => (
              <React.Fragment key={step}>
                <div style={{ flexShrink: 0, textAlign: 'center', padding: '14px 16px', background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.2)', borderRadius: 10, minWidth: 90 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fb923c', marginBottom: 4 }}>{step}</div>
                  <div className="pipeline-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', margin: '0 auto' }} />
                </div>
                {i < PIPELINE.length - 1 && (
                  <div style={{ width: 24, height: 2, background: 'linear-gradient(90deg, rgba(251,146,60,0.4), rgba(251,146,60,0.1))', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                    <div className="flow" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.8), transparent)', width: '50%', animation: `flow ${1.5 + i * 0.2}s linear infinite` }} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Projects as Deployments */}
        {projects && projects.length > 0 && (
          <section style={{ paddingTop: 52, paddingBottom: 52, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <SectionLabel label="Deployments & Infrastructure" color="#fb923c" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
              {projects.map((p, i) => (
                <div key={p.id} className="dv-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '22px', position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} className="pipeline-dot" />
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9', flex: 1 }}>{p.title}</h3>
                    <span style={{ fontSize: 10, fontWeight: 600, color: '#22c55e', background: 'rgba(34,197,94,0.1)', padding: '3px 8px', borderRadius: 999 }}>LIVE</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65, marginBottom: 14 }}>{p.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                    {p.techStack?.map(t => (
                      <span key={t} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: 'rgba(251,146,60,0.1)', color: '#fb923c', border: '1px solid rgba(251,146,60,0.2)', fontFamily: 'JetBrains Mono, monospace' }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {p.repoLink && <a href={p.repoLink} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: '#64748b', textDecoration: 'none' }}>Repo ↗</a>}
                    {p.liveLink && <a href={p.liveLink} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: '#fb923c', textDecoration: 'none' }}>Live ↗</a>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills — cloud tool badges */}
        {allTools.length > 0 && (
          <section style={{ paddingTop: 52, paddingBottom: 52, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <SectionLabel label="Cloud & Infrastructure Stack" color="#fb923c" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
              {Object.entries(skills || {}).map(([cat, items]) => {
                if (!items || items.length === 0) return null;
                const icons: Record<string, string> = { frontend: '🎨', backend: '⚙️', devops: '☁️', other: '🔧' };
                const colors: Record<string, string> = { frontend: '#3b82f6', backend: '#8b5cf6', devops: '#fb923c', other: '#10b981' };
                const color = colors[cat] || '#fb923c';
                return (
                  <div key={cat} style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${color}25`, borderRadius: 12, padding: '16px 18px' }}>
                    <div style={{ fontSize: 16, marginBottom: 10 }}>{icons[cat]}</div>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color, marginBottom: 12 }}>{cat}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {items.map((s: string) => (
                        <span key={s} className="badge" style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: `${color}15`, color: '#cbd5e1', border: `1px solid ${color}25`, fontFamily: 'JetBrains Mono, monospace' }}>{s}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Contact */}
        <section style={{ paddingTop: 52 }}>
          <SectionLabel label="Contact" color="#fb923c" />
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '28px' }}>
            <ContactForm username={username} template="devops" />
          </div>
        </section>
      </div>
    </div>
  );
}

function SectionLabel({ label, color }: { label: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.05)' }} />
    </div>
  );
}
