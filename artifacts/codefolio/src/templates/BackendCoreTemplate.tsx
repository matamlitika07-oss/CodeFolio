import { PublicPortfolio } from '@workspace/api-client-react';
import { ContactForm } from './ContactForm';
import { Github, ExternalLink, Linkedin, Server, Database, Terminal, Code } from 'lucide-react';

export default function BackendCoreTemplate({ data }: { data: PublicPortfolio }) {
  const { profile, projects, skills, username } = data;
  const allSkills = [
    ...(skills?.frontend || []),
    ...(skills?.backend || []),
    ...(skills?.devops || []),
    ...(skills?.other || []),
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#03070f', color: '#cbd5e1', fontFamily: "'Inter', system-ui, sans-serif", overflowX: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes slide-in { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
        .cursor { display:inline-block; width:2px; height:1em; background:#22d3ee; animation:blink 1s step-end infinite; vertical-align:text-bottom; margin-left:2px; }
        .bc-card { background: rgba(10,20,40,0.8); border: 1px solid rgba(34,211,238,0.12); border-radius: 12px; transition: all 0.25s; }
        .bc-card:hover { border-color: rgba(34,211,238,0.35); box-shadow: 0 0 25px rgba(34,211,238,0.08); }
        .section-label { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #22d3ee; margin-bottom: 32px; display: flex; align-items: center; gap: 12px; }
        .section-label::after { content: ''; flex: 1; height: 1px; background: rgba(34,211,238,0.15); }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .tech-tag { font-size: 11px; padding: 3px 10px; border-radius: 4px; background: rgba(34,211,238,0.08); border: 1px solid rgba(34,211,238,0.2); color: #22d3ee; font-family: 'JetBrains Mono', monospace; }
        .endpoint-card { background: rgba(34,211,238,0.04); border-left: 3px solid #22d3ee; padding: 14px 18px; border-radius: 0 8px 8px 0; }
      `}} />

      {/* Top accent bar */}
      <div style={{ height: 3, background: 'linear-gradient(90deg, #22d3ee, #3b82f6, #8b5cf6)' }} />

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        {/* Hero */}
        <header style={{ paddingTop: 72, paddingBottom: 80, borderBottom: '1px solid rgba(34,211,238,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22d3ee', boxShadow: '0 0 8px rgba(34,211,238,0.8)' }} />
            <span className="mono" style={{ fontSize: 12, color: '#22d3ee', letterSpacing: '0.1em' }}>BACKEND_ENGINEER</span>
          </div>

          <div className="mono" style={{ fontSize: 14, color: '#64748b', marginBottom: 12 }}>
            <span style={{ color: '#7dd3fc' }}>const</span> <span style={{ color: '#22d3ee' }}>engineer</span> <span style={{ color: '#94a3b8' }}>= {'{'}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 12, marginLeft: 24 }}>
            {profile?.name || username}<span className="cursor" />
          </h1>
          <div className="mono" style={{ fontSize: 14, color: '#94a3b8', marginBottom: 24, marginLeft: 24 }}>
            <span style={{ color: '#7dd3fc' }}>role</span>: <span style={{ color: '#86efac' }}>"{profile?.domain || 'Backend Engineer'}"</span><span style={{ color: '#64748b' }}>,</span>
          </div>
          <div className="mono" style={{ fontSize: 14, color: '#94a3b8', marginBottom: 4, marginLeft: 24 }}>
            <span style={{ color: '#7dd3fc' }}>bio</span>: <span style={{ color: '#86efac' }}>"{(profile?.bio || 'Building scalable backend systems.').slice(0, 60)}..."</span>
          </div>
          <div className="mono" style={{ fontSize: 14, color: '#94a3b8', marginBottom: 32 }}>
            <span style={{ color: '#94a3b8' }}>{'}'}</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {profile?.resumeUrl && (
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" style={{ padding: '10px 24px', borderRadius: 8, background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.4)', color: '#22d3ee', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>View Resume</a>
            )}
            {profile?.socialLinks?.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" style={{ padding: '10px 18px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Github size={16} /> GitHub
              </a>
            )}
            {profile?.socialLinks?.linkedin && (
              <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" style={{ padding: '10px 18px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Linkedin size={16} /> LinkedIn
              </a>
            )}
          </div>
        </header>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 1, marginBottom: 0, borderBottom: '1px solid rgba(34,211,238,0.1)' }}>
          {[
            { icon: <Server size={18} />, label: 'Projects', val: projects?.length || 0 },
            { icon: <Code size={18} />, label: 'Skills', val: allSkills.length },
            { icon: <Database size={18} />, label: 'Tech Stack', val: [...new Set(projects?.flatMap(p => p.techStack || []))].length },
          ].map((s) => (
            <div key={s.label} style={{ padding: '28px 24px', borderRight: '1px solid rgba(34,211,238,0.1)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ color: '#22d3ee' }}>{s.icon}</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#f1f5f9', lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section style={{ paddingTop: 64, paddingBottom: 64, borderBottom: '1px solid rgba(34,211,238,0.1)' }}>
            <div className="section-label">
              <Terminal size={14} /> System Projects
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {projects.map((p, i) => (
                <div key={p.id} className="bc-card" style={{ padding: '28px 32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
                    <div>
                      <span className="mono" style={{ fontSize: 11, color: '#22d3ee', fontWeight: 700 }}>/{String(i + 1).padStart(2, '0')}</span>
                      <h3 style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9', marginTop: 6 }}>{p.title}</h3>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {p.repoLink && (
                        <a href={p.repoLink} target="_blank" rel="noreferrer" style={{ padding: '7px 14px', borderRadius: 6, background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.25)', color: '#22d3ee', fontSize: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Github size={13} /> Source
                        </a>
                      )}
                      {p.liveLink && (
                        <a href={p.liveLink} target="_blank" rel="noreferrer" style={{ padding: '7px 14px', borderRadius: 6, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.25)', color: '#60a5fa', fontSize: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <ExternalLink size={13} /> Live
                        </a>
                      )}
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, marginBottom: 18 }}>{p.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {p.techStack?.map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {allSkills.length > 0 && (
          <section style={{ paddingTop: 64, paddingBottom: 64, borderBottom: '1px solid rgba(34,211,238,0.1)' }}>
            <div className="section-label">
              <Database size={14} /> Technical Stack
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
              {Object.entries(skills || {}).map(([cat, items]) => {
                if (!items || (items as string[]).length === 0) return null;
                const icons: Record<string, JSX.Element> = {
                  frontend: <Code size={14} />,
                  backend: <Server size={14} />,
                  devops: <Terminal size={14} />,
                  other: <Database size={14} />,
                };
                return (
                  <div key={cat} className="bc-card" style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                      <span style={{ color: '#22d3ee' }}>{icons[cat] || <Code size={14} />}</span>
                      <p className="mono" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#22d3ee' }}>{cat}</p>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {(items as string[]).map((s) => (
                        <span key={s} className="tech-tag">{s}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Contact */}
        <section style={{ paddingTop: 64, paddingBottom: 100 }}>
          <div className="section-label">
            <Terminal size={14} /> Initialize Contact
          </div>
          <div style={{ maxWidth: 520 }}>
            <ContactForm username={username} template="backend-core" />
          </div>
        </section>
      </div>
    </div>
  );
}
