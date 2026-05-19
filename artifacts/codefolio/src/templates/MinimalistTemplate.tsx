import React from 'react';
import { PublicPortfolio } from '@workspace/api-client-react';
import { ContactForm } from './ContactForm';

export default function MinimalistTemplate({ data }: { data: PublicPortfolio }) {
  const { profile, projects, skills, username } = data;
  const allSkills = [
    ...(skills?.frontend || []),
    ...(skills?.backend || []),
    ...(skills?.devops || []),
    ...(skills?.other || []),
  ];
  const skillColors = ['#6366f1','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ec4899'];

  return (
    <div style={{ minHeight: '100vh', background: '#030712', color: '#e2e8f0', fontFamily: "'Inter', system-ui, sans-serif", overflowX: 'hidden', position: 'relative' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes orb { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-60px) scale(1.15)} 66%{transform:translate(-30px,30px) scale(0.9)} }
        @keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes borderGlow { 0%,100%{opacity:0.5} 50%{opacity:1} }
        .hero-name { background: linear-gradient(135deg, #fff 0%, #a78bfa 40%, #60a5fa 70%, #34d399 100%); background-size: 200% 200%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: gradientShift 4s ease infinite; }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .orb1 { animation: orb 8s ease-in-out infinite; }
        .orb2 { animation: orb 10s ease-in-out infinite reverse; animation-delay: -3s; }
        .orb3 { animation: orb 12s ease-in-out infinite; animation-delay: -6s; }
        .proj-card:hover { transform: translateY(-4px); box-shadow: 0 0 0 1px rgba(139,92,246,0.5), 0 20px 40px rgba(139,92,246,0.15); }
        .proj-card { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
        .skill-tag:hover { transform: scale(1.05); }
        .skill-tag { transition: transform 0.2s; }
        .link-hover:hover { opacity: 1; text-decoration: underline; text-underline-offset: 4px; }
      `}} />

      {/* Background orbs */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div className="orb1" style={{ position: 'absolute', top: '-10%', left: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)' }} />
        <div className="orb2" style={{ position: 'absolute', top: '20%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(96,165,250,0.1) 0%, transparent 70%)' }} />
        <div className="orb3" style={{ position: 'absolute', bottom: '10%', left: '30%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)' }} />
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Hero */}
        <header className="fade-up" style={{ paddingTop: 100, paddingBottom: 80, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: 999, padding: '6px 16px', marginBottom: 32, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a78bfa' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#a78bfa', display: 'inline-block' }} />
            {profile?.domain || 'Software Engineer'}
          </div>

          <h1 className="hero-name" style={{ fontSize: 'clamp(48px, 8vw, 80px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 28 }}>
            {profile?.name || username}
          </h1>

          <p style={{ fontSize: 18, lineHeight: 1.8, color: '#94a3b8', maxWidth: 560, marginBottom: 40 }}>
            {profile?.bio || 'Building things for the web.'}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {profile?.socialLinks?.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s' }}>GitHub</a>
            )}
            {profile?.socialLinks?.linkedin && (
              <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s' }}>LinkedIn</a>
            )}
            {profile?.socialLinks?.twitter && (
              <a href={profile.socialLinks.twitter} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s' }}>Twitter</a>
            )}
            {profile?.resumeUrl && (
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', fontSize: 14, fontWeight: 600, textDecoration: 'none', boxShadow: '0 4px 20px rgba(139,92,246,0.35)', transition: 'all 0.2s' }}>View Resume</a>
            )}
          </div>
        </header>

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section style={{ paddingTop: 80, paddingBottom: 80, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6366f1' }}>Selected Work</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {projects.map((p, i) => (
                <div key={p.id} className="proj-card" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '28px 32px', cursor: 'default' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <span style={{ fontSize: 11, color: '#475569', fontWeight: 600 }}>{String(i + 1).padStart(2, '0')}</span>
                      <h3 style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9' }}>{p.title}</h3>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      {p.repoLink && (
                        <a href={p.repoLink} target="_blank" rel="noreferrer" style={{ fontSize: 13, fontWeight: 500, color: '#64748b', textDecoration: 'none', padding: '6px 14px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, transition: 'all 0.2s' }}>
                          Source
                        </a>
                      )}
                      {p.liveLink && (
                        <a href={p.liveLink} target="_blank" rel="noreferrer" style={{ fontSize: 13, fontWeight: 500, color: '#a78bfa', textDecoration: 'none', padding: '6px 14px', border: '1px solid rgba(139,92,246,0.3)', borderRadius: 8, background: 'rgba(139,92,246,0.08)', transition: 'all 0.2s' }}>
                          Live ↗
                        </a>
                      )}
                    </div>
                  </div>
                  <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7, marginBottom: 18 }}>{p.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {p.techStack?.map((t, ti) => (
                      <span key={t} className="skill-tag" style={{ fontSize: 12, fontWeight: 500, padding: '4px 12px', borderRadius: 999, background: `${skillColors[ti % skillColors.length]}18`, color: skillColors[ti % skillColors.length], border: `1px solid ${skillColors[ti % skillColors.length]}30` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {allSkills.length > 0 && (
          <section style={{ paddingTop: 80, paddingBottom: 80, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6366f1' }}>Skills & Tools</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {Object.entries(skills || {}).map(([cat, items]) => {
                if (!items || items.length === 0) return null;
                return (
                  <div key={cat} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '20px 22px' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6366f1', marginBottom: 14 }}>{cat}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {items.map((s: string) => (
                        <span key={s} className="skill-tag" style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.06)' }}>{s}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Contact */}
        <section style={{ paddingTop: 80, paddingBottom: 100 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6366f1' }}>Get In Touch</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          </div>
          <div style={{ maxWidth: 520 }}>
            <ContactForm username={username} template="minimalist" />
          </div>
        </section>
      </div>
    </div>
  );
}
