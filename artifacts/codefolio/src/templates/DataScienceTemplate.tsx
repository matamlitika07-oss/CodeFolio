import React from 'react';
import { PublicPortfolio } from '@workspace/api-client-react';
import { ContactForm } from './ContactForm';

export default function DataScienceTemplate({ data }: { data: PublicPortfolio }) {
  const { profile, projects, skills, username } = data;
  const projectsCount = projects?.length || 0;
  const skillsCount = Object.values(skills || {}).flat().length;

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', color: '#c9d1d9', fontFamily: "'JetBrains Mono', 'Fira Code', monospace", overflowX: 'hidden', position: 'relative' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Inter:wght@400;600;700;800&display=swap');
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 0 0 rgba(88,166,255,0)} 50%{box-shadow:0 0 20px 4px rgba(88,166,255,0.15)} }
        @keyframes scan { 0%{transform:translateY(-100%)} 100%{transform:translateY(200vh)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes counter { from{opacity:0;transform:scale(0.8)} to{opacity:1;transform:scale(1)} }
        .ds-card:hover { transform: translateY(-2px); border-color: rgba(88,166,255,0.4) !important; }
        .ds-card { transition: all 0.25s; }
        .ds-metric:hover { box-shadow: 0 0 20px rgba(88,166,255,0.2); }
        .ds-metric { transition: all 0.25s; animation: counter 0.6s ease forwards; }
        .skill-bar { transition: width 1.2s cubic-bezier(0.4,0,0.2,1); }
        .glow-text { text-shadow: 0 0 20px rgba(88,166,255,0.5); }
      `}} />

      {/* Grid background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(88,166,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(88,166,255,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <header style={{ paddingTop: 72, paddingBottom: 60 }}>
          {/* Terminal title bar */}
          <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px 12px 0 0', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
            <span style={{ fontSize: 12, color: '#6e7681', marginLeft: 8 }}>~/portfolio — zsh</span>
          </div>
          <div style={{ background: '#0d1117', border: '1px solid #30363d', borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '24px 28px', marginBottom: 40 }}>
            <div style={{ color: '#58a6ff', marginBottom: 6, fontSize: 14 }}>$ whoami</div>
            <h1 className="glow-text" style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: '#f0f6fc', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
              {profile?.name || username}
            </h1>
            <div style={{ color: '#58a6ff', fontSize: 16, marginBottom: 16 }}>
              <span style={{ color: '#7ee787' }}>// </span>{profile?.domain || 'AI/ML Engineer'}
            </div>
            <div style={{ color: '#8b949e', lineHeight: 1.8, maxWidth: 560, fontSize: 14, borderLeft: '3px solid #21262d', paddingLeft: 16 }}>
              <span style={{ color: '#f97316' }}>"""</span>
              <br />
              {profile?.bio || 'Building intelligent systems that learn and adapt.'}
              <br />
              <span style={{ color: '#f97316' }}>"""</span>
            </div>
            <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {profile?.socialLinks?.github && <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: '#58a6ff', textDecoration: 'none' }}><span style={{ color: '#7ee787' }}>import</span> github</a>}
              {profile?.socialLinks?.linkedin && <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: '#58a6ff', textDecoration: 'none' }}><span style={{ color: '#7ee787' }}>import</span> linkedin</a>}
              {profile?.resumeUrl && <a href={profile.resumeUrl} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: '#f97316', textDecoration: 'none' }}>download cv.pdf</a>}
            </div>
          </div>

          {/* Metric cards */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              { label: 'Models / Projects', value: projectsCount, color: '#58a6ff', icon: '◈' },
              { label: 'Skills & Tools', value: skillsCount, color: '#7ee787', icon: '◉' },
              { label: 'Accuracy Target', value: '99%', color: '#f97316', icon: '◎' },
            ].map(m => (
              <div key={m.label} className="ds-metric" style={{ flex: '1 1 140px', background: '#161b22', border: `1px solid ${m.color}30`, borderRadius: 12, padding: '20px 22px' }}>
                <div style={{ fontSize: 22, color: m.color, marginBottom: 4 }}>{m.icon}</div>
                <div style={{ fontSize: 32, fontWeight: 700, color: m.color, fontFamily: 'Inter, sans-serif', lineHeight: 1 }}>{m.value}</div>
                <div style={{ fontSize: 12, color: '#6e7681', marginTop: 6 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </header>

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section style={{ marginBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <span style={{ color: '#f97316', fontSize: 14 }}>def</span>
              <span style={{ color: '#d2a8ff', fontSize: 16, fontWeight: 600 }}>get_projects</span>
              <span style={{ color: '#c9d1d9', fontSize: 14 }}>():</span>
              <div style={{ flex: 1, height: 1, background: '#21262d' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
              {projects.map((p, i) => (
                <div key={p.id} className="ds-card" style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: 12, padding: '22px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: i % 2 === 0 ? '#58a6ff' : '#f97316' }} />
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f0f6fc', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>{p.title}</h3>
                  <p style={{ fontSize: 13, color: '#8b949e', lineHeight: 1.65, marginBottom: 14 }}>{p.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                    {p.techStack?.map(t => (
                      <span key={t} style={{ fontSize: 11, fontWeight: 500, padding: '3px 8px', borderRadius: 6, background: 'rgba(88,166,255,0.1)', color: '#58a6ff', border: '1px solid rgba(88,166,255,0.2)' }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {p.repoLink && <a href={p.repoLink} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: '#8b949e', textDecoration: 'underline', textUnderlineOffset: 3 }}>Notebook / Repo</a>}
                    {p.liveLink && <a href={p.liveLink} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: '#f97316', textDecoration: 'underline', textUnderlineOffset: 3 }}>Deployment</a>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills with progress bars */}
        {Object.values(skills || {}).flat().length > 0 && (
          <section style={{ marginBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <span style={{ color: '#58a6ff', fontSize: 14 }}>class</span>
              <span style={{ color: '#d2a8ff', fontSize: 16, fontWeight: 600 }}>SkillMatrix</span>
              <span style={{ color: '#c9d1d9', fontSize: 14 }}>:</span>
              <div style={{ flex: 1, height: 1, background: '#21262d' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {Object.entries(skills || {}).map(([cat, items]) => {
                if (!items || items.length === 0) return null;
                const colors: Record<string, string> = { frontend: '#58a6ff', backend: '#7ee787', devops: '#f97316', other: '#d2a8ff' };
                const color = colors[cat] || '#58a6ff';
                return (
                  <div key={cat} style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: 12, padding: '18px 20px' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color, marginBottom: 14 }}>{cat}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {items.map((s: string) => (
                        <span key={s} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, background: `${color}12`, color: '#c9d1d9', border: `1px solid ${color}25` }}>{s}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Contact */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <span style={{ color: '#f97316', fontSize: 14 }}>async def</span>
            <span style={{ color: '#d2a8ff', fontSize: 16, fontWeight: 600 }}>contact</span>
            <span style={{ color: '#c9d1d9', fontSize: 14 }}>(request):</span>
            <div style={{ flex: 1, height: 1, background: '#21262d' }} />
          </div>
          <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: 12, padding: '28px' }}>
            <ContactForm username={username} template="data-science" />
          </div>
        </section>
      </div>
    </div>
  );
}
