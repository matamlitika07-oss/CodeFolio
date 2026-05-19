import { PublicPortfolio } from '@workspace/api-client-react';
import { ContactForm } from './ContactForm';
import { Github, ExternalLink, Linkedin, Twitter, Figma } from 'lucide-react';

export default function CreativeStudioTemplate({ data }: { data: PublicPortfolio }) {
  const { profile, projects, skills, username } = data;
  const allSkills = [
    ...(skills?.frontend || []),
    ...(skills?.backend || []),
    ...(skills?.devops || []),
    ...(skills?.other || []),
  ];

  const pastelColors = [
    { bg: 'rgba(251,207,232,0.15)', border: 'rgba(251,207,232,0.4)', text: '#f9a8d4', accent: '#ec4899' },
    { bg: 'rgba(196,181,253,0.15)', border: 'rgba(196,181,253,0.4)', text: '#c4b5fd', accent: '#8b5cf6' },
    { bg: 'rgba(147,197,253,0.15)', border: 'rgba(147,197,253,0.4)', text: '#93c5fd', accent: '#3b82f6' },
    { bg: 'rgba(110,231,183,0.15)', border: 'rgba(110,231,183,0.4)', text: '#6ee7b7', accent: '#10b981' },
    { bg: 'rgba(253,230,138,0.15)', border: 'rgba(253,230,138,0.4)', text: '#fde68a', accent: '#f59e0b' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d14', color: '#e2e8f0', fontFamily: "'Inter', system-ui, sans-serif", overflowX: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        @keyframes float { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-16px) rotate(2deg)} }
        @keyframes float2 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(-1deg)} }
        @keyframes fade-up { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .cs-card { transition: all 0.35s cubic-bezier(0.4,0,0.2,1); }
        .cs-card:hover { transform: translateY(-6px) scale(1.01); }
        .section-dot { width: 6px; height: 6px; border-radius: 50%; background: #ec4899; display: inline-block; margin-right: 10px; }
        .skill-pill { border-radius: 999px; padding: 4px 14px; font-size: 12px; font-weight: 500; }
        .bento-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
        .project-img { width: 100%; height: 180px; object-fit: cover; border-radius: 12px; margin-bottom: 16px; }
        .no-img-placeholder { width: 100%; height: 140px; border-radius: 12px; margin-bottom: 16px; display: flex; align-items: center; justify-content: center; }
      `}} />

      {/* Floating orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '5%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)', animation: 'float 8s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '15%', left: '5%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', animation: 'float2 10s ease-in-out infinite' }} />
      </div>

      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        {/* Hero */}
        <header style={{ paddingTop: 80, paddingBottom: 80, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {profile?.avatarUrl ? (
            <img src={profile.avatarUrl} alt={profile.name || username} style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', marginBottom: 24, border: '2px solid rgba(236,72,153,0.5)' }} />
          ) : (
            <div style={{ width: 72, height: 72, borderRadius: '50%', marginBottom: 24, background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800, color: 'white' }}>
              {(profile?.name || username || 'U').charAt(0).toUpperCase()}
            </div>
          )}

          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', borderRadius: 999, border: '1px solid rgba(236,72,153,0.3)', background: 'rgba(236,72,153,0.08)', marginBottom: 20 }}>
            <span style={{ fontSize: 12, color: '#f9a8d4', fontWeight: 500 }}>{profile?.domain || 'UI/UX Designer'}</span>
          </div>

          <h1 style={{ fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 900, color: '#f8fafc', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 20 }}>
            {profile?.name || username}
          </h1>

          <p style={{ fontSize: 18, lineHeight: 1.8, color: '#94a3b8', maxWidth: 560, marginBottom: 40 }}>
            {profile?.bio || 'Designing experiences that delight and inspire. Blending aesthetics with function.'}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {profile?.resumeUrl && (
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" style={{ padding: '11px 28px', borderRadius: 999, background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', color: 'white', fontWeight: 700, fontSize: 14, textDecoration: 'none', boxShadow: '0 4px 20px rgba(236,72,153,0.3)' }}>View Portfolio</a>
            )}
            {profile?.socialLinks?.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" style={{ padding: '11px 20px', borderRadius: 999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: '#e2e8f0', fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Github size={16} />
              </a>
            )}
            {profile?.socialLinks?.linkedin && (
              <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" style={{ padding: '11px 20px', borderRadius: 999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: '#e2e8f0', fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Linkedin size={16} />
              </a>
            )}
          </div>
        </header>

        {/* Projects — Bento Grid */}
        {projects && projects.length > 0 && (
          <section style={{ paddingBottom: 80 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
              <span className="section-dot" />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#ec4899' }}>Selected Work</span>
            </div>
            <div className="bento-grid">
              {projects.map((p, i) => {
                const color = pastelColors[i % pastelColors.length];
                return (
                  <div key={p.id} className="cs-card" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: `1px solid rgba(255,255,255,0.08)`, borderRadius: 20, padding: '24px', overflow: 'hidden', cursor: 'default' }}>
                    {p.screenshotUrl ? (
                      <img src={p.screenshotUrl} alt={p.title} className="project-img" />
                    ) : (
                      <div className="no-img-placeholder" style={{ background: `linear-gradient(135deg, ${color.bg}, rgba(255,255,255,0.02))`, border: `1px solid ${color.border}` }}>
                        <span style={{ fontSize: 32, color: color.text, opacity: 0.4, fontWeight: 800 }}>{p.title.charAt(0)}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f1f5f9' }}>{p.title}</h3>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {p.liveLink && (
                          <a href={p.liveLink} target="_blank" rel="noreferrer" style={{ color: color.accent, display: 'flex' }}>
                            <ExternalLink size={16} />
                          </a>
                        )}
                        {p.repoLink && (
                          <a href={p.repoLink} target="_blank" rel="noreferrer" style={{ color: '#64748b', display: 'flex' }}>
                            <Github size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, marginBottom: 16 }}>{p.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {p.techStack?.map((t) => (
                        <span key={t} className="skill-pill" style={{ background: color.bg, border: `1px solid ${color.border}`, color: color.text }}>{t}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Skills */}
        {allSkills.length > 0 && (
          <section style={{ paddingBottom: 80 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
              <span className="section-dot" />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#ec4899' }}>Skills & Tools</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {allSkills.map((s, i) => {
                const color = pastelColors[i % pastelColors.length];
                return (
                  <span key={s} className="skill-pill" style={{ background: color.bg, border: `1px solid ${color.border}`, color: color.text, padding: '8px 18px', fontSize: 13 }}>{s}</span>
                );
              })}
            </div>
          </section>
        )}

        {/* Contact */}
        <section style={{ paddingBottom: 100 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
            <span className="section-dot" />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#ec4899' }}>Get In Touch</span>
          </div>
          <div style={{ maxWidth: 520 }}>
            <ContactForm username={username} template="creative-studio" />
          </div>
        </section>
      </div>
    </div>
  );
}
