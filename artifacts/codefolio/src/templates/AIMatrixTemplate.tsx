import { PublicPortfolio } from '@workspace/api-client-react';
import { ContactForm } from './ContactForm';
import { Github, ExternalLink, Linkedin, Twitter } from 'lucide-react';

export default function AIMatrixTemplate({ data }: { data: PublicPortfolio }) {
  const { profile, projects, skills, username } = data;
  const allSkills = [
    ...(skills?.frontend || []),
    ...(skills?.backend || []),
    ...(skills?.devops || []),
    ...(skills?.other || []),
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a12', color: '#e2e8f0', fontFamily: "'Inter', system-ui, sans-serif", overflowX: 'hidden', position: 'relative' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes pulse-glow { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.02)} }
        @keyframes float-node { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes scan-line { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        @keyframes data-stream { 0%{opacity:0;transform:translateX(-20px)} 100%{opacity:1;transform:translateX(0)} }
        .ai-card { background: rgba(15,20,40,0.8); border: 1px solid rgba(100,149,237,0.2); transition: all 0.3s ease; }
        .ai-card:hover { border-color: rgba(100,149,237,0.5); box-shadow: 0 0 30px rgba(100,149,237,0.15); transform: translateY(-2px); }
        .metric-card { background: linear-gradient(135deg, rgba(100,149,237,0.1), rgba(147,51,234,0.05)); border: 1px solid rgba(100,149,237,0.25); border-radius: 12px; padding: 20px; }
        .glow-text { color: #6495ed; text-shadow: 0 0 20px rgba(100,149,237,0.5); }
        .node { width: 8px; height: 8px; background: #6495ed; border-radius: 50%; animation: pulse-glow 2s ease-in-out infinite; box-shadow: 0 0 10px rgba(100,149,237,0.8); }
        .node-orange { background: #f97316; box-shadow: 0 0 10px rgba(249,115,22,0.8); animation-delay: 0.5s; }
        .node-purple { background: #a855f7; box-shadow: 0 0 10px rgba(168,85,247,0.8); animation-delay: 1s; }
        .skill-bar { height: 4px; background: rgba(100,149,237,0.2); border-radius: 999px; overflow: hidden; }
        .skill-fill { height: 100%; background: linear-gradient(90deg, #6495ed, #a855f7); border-radius: 999px; transition: width 1s ease; }
        .section-label { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #6495ed; margin-bottom: 32px; }
        .mono { font-family: 'JetBrains Mono', monospace; }
      `}} />

      {/* Neural network background */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(100,149,237,0.06) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)' }} />
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }} viewBox="0 0 1200 800">
          <line x1="100" y1="200" x2="350" y2="400" stroke="#6495ed" strokeWidth="1" />
          <line x1="350" y1="400" x2="600" y2="250" stroke="#6495ed" strokeWidth="1" />
          <line x1="600" y1="250" x2="850" y2="500" stroke="#a855f7" strokeWidth="1" />
          <line x1="850" y1="500" x2="1100" y2="300" stroke="#a855f7" strokeWidth="1" />
          <line x1="200" y1="600" x2="500" y2="450" stroke="#f97316" strokeWidth="1" />
          <line x1="500" y1="450" x2="750" y2="650" stroke="#f97316" strokeWidth="1" />
          <circle cx="100" cy="200" r="5" fill="#6495ed" />
          <circle cx="350" cy="400" r="5" fill="#6495ed" />
          <circle cx="600" cy="250" r="5" fill="#a855f7" />
          <circle cx="850" cy="500" r="5" fill="#a855f7" />
          <circle cx="1100" cy="300" r="5" fill="#6495ed" />
          <circle cx="200" cy="600" r="5" fill="#f97316" />
          <circle cx="500" cy="450" r="5" fill="#f97316" />
          <circle cx="750" cy="650" r="5" fill="#a855f7" />
        </svg>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        {/* Hero */}
        <header style={{ paddingTop: 80, paddingBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div className="node" />
            <div className="node node-purple" />
            <div className="node node-orange" />
            <span className="mono" style={{ fontSize: 12, color: '#6495ed', letterSpacing: '0.1em' }}>AI_PORTFOLIO_v2.0</span>
          </div>

          <h1 style={{ fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 20 }}>
            <span style={{ color: '#f1f5f9' }}>{profile?.name || username}</span>
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <span className="glow-text" style={{ fontSize: 18, fontWeight: 600 }}>{profile?.domain || 'AI Engineer'}</span>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#6495ed' }} />
            <span style={{ fontSize: 14, color: '#64748b' }}>Machine Learning</span>
          </div>

          <p style={{ fontSize: 17, lineHeight: 1.8, color: '#94a3b8', maxWidth: 580, marginBottom: 40 }}>
            {profile?.bio || 'Building intelligent systems at the intersection of research and engineering.'}
          </p>

          {/* Metric cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 40 }}>
            {[
              { label: 'Models Deployed', val: projects?.length || 0, color: '#6495ed' },
              { label: 'Projects', val: projects?.length || 0, color: '#a855f7' },
              { label: 'Skills', val: allSkills.length || 0, color: '#f97316' },
            ].map((m) => (
              <div key={m.label} className="metric-card">
                <div style={{ fontSize: 32, fontWeight: 800, color: m.color, lineHeight: 1 }}>{m.val}</div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 6, fontWeight: 500 }}>{m.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {profile?.resumeUrl && (
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" style={{ padding: '10px 24px', borderRadius: 10, background: 'linear-gradient(135deg, #6495ed, #a855f7)', color: 'white', fontWeight: 700, fontSize: 14, textDecoration: 'none', boxShadow: '0 4px 20px rgba(100,149,237,0.3)' }}>View Resume</a>
            )}
            {profile?.socialLinks?.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" style={{ padding: '10px 20px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Github size={16} /> GitHub
              </a>
            )}
            {profile?.socialLinks?.linkedin && (
              <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" style={{ padding: '10px 20px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Linkedin size={16} /> LinkedIn
              </a>
            )}
          </div>
        </header>

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section style={{ paddingBottom: 80 }}>
            <div className="section-label">Models & Projects</div>
            <div style={{ display: 'grid', gap: 20 }}>
              {projects.map((p, i) => (
                <div key={p.id} className="ai-card" style={{ borderRadius: 16, padding: '28px 32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <span className="mono" style={{ fontSize: 11, color: '#6495ed', fontWeight: 700 }}>MODEL_{String(i + 1).padStart(2, '0')}</span>
                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#6495ed' }} />
                      </div>
                      <h3 style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9' }}>{p.title}</h3>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {p.repoLink && (
                        <a href={p.repoLink} target="_blank" rel="noreferrer" style={{ padding: '7px 14px', borderRadius: 8, background: 'rgba(100,149,237,0.1)', border: '1px solid rgba(100,149,237,0.3)', color: '#6495ed', fontSize: 13, textDecoration: 'none' }}>
                          <Github size={14} style={{ display: 'inline', marginRight: 4 }} /> Repo
                        </a>
                      )}
                      {p.liveLink && (
                        <a href={p.liveLink} target="_blank" rel="noreferrer" style={{ padding: '7px 14px', borderRadius: 8, background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', color: '#a855f7', fontSize: 13, textDecoration: 'none' }}>
                          <ExternalLink size={14} style={{ display: 'inline', marginRight: 4 }} /> Demo
                        </a>
                      )}
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, marginBottom: 18 }}>{p.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {p.techStack?.map((t) => (
                      <span key={t} style={{ fontSize: 12, padding: '4px 12px', borderRadius: 6, background: 'rgba(100,149,237,0.1)', border: '1px solid rgba(100,149,237,0.2)', color: '#6495ed', fontFamily: 'JetBrains Mono, monospace' }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {allSkills.length > 0 && (
          <section style={{ paddingBottom: 80 }}>
            <div className="section-label">Technical Arsenal</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
              {Object.entries(skills || {}).map(([cat, items]) => {
                if (!items || (items as string[]).length === 0) return null;
                return (
                  <div key={cat} className="ai-card" style={{ borderRadius: 12, padding: '20px 24px' }}>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6495ed', marginBottom: 14 }}>{cat}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {(items as string[]).map((s) => (
                        <div key={s} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className="mono" style={{ fontSize: 12, color: '#94a3b8' }}>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Contact */}
        <section style={{ paddingBottom: 100 }}>
          <div className="section-label">Collaboration Protocol</div>
          <div style={{ maxWidth: 520 }}>
            <ContactForm username={username} template="ai-matrix" />
          </div>
        </section>
      </div>
    </div>
  );
}
