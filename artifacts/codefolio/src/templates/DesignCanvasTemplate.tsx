import { useState } from 'react';
import { PublicPortfolio } from '@workspace/api-client-react';
import { ContactForm } from './ContactForm';
import { Github, ExternalLink, Linkedin, Twitter, ZoomIn } from 'lucide-react';

export default function DesignCanvasTemplate({ data }: { data: PublicPortfolio }) {
  const { profile, projects, skills, username } = data;
  const [hovered, setHovered] = useState<string | null>(null);
  const allSkills = [
    ...(skills?.frontend || []),
    ...(skills?.backend || []),
    ...(skills?.devops || []),
    ...(skills?.other || []),
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: '#e8e8e8', fontFamily: "'Inter', system-ui, sans-serif", overflowX: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        @keyframes fade-in { from{opacity:0} to{opacity:1} }
        @keyframes scale-up { from{transform:scale(0.95);opacity:0} to{transform:scale(1);opacity:1} }
        .gallery-item { overflow:hidden; border-radius:16px; cursor:pointer; position:relative; }
        .gallery-item img, .gallery-item .placeholder { transition:transform 0.5s cubic-bezier(0.4,0,0.2,1); }
        .gallery-item:hover img, .gallery-item:hover .placeholder { transform:scale(1.05); }
        .overlay { position:absolute; inset:0; background:rgba(0,0,0,0); transition:background 0.3s; display:flex; align-items:center; justify-content:center; }
        .gallery-item:hover .overlay { background:rgba(0,0,0,0.5); }
        .overlay-icon { opacity:0; transform:scale(0.8); transition:all 0.3s; }
        .gallery-item:hover .overlay-icon { opacity:1; transform:scale(1); }
        .section-title { font-size:11px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:#666; margin-bottom:32px; }
        .skill-dot { width:6px; height:6px; border-radius:50%; background:#666; display:inline-block; }
      `}} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', position: 'relative' }}>
        {/* Hero */}
        <header style={{ paddingTop: 80, paddingBottom: 80, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 13, color: '#555', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16, fontWeight: 500 }}>
                {profile?.domain || 'Graphic Designer'}
              </p>
              <h1 style={{ fontSize: 'clamp(48px, 8vw, 88px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, color: '#f5f5f5', marginBottom: 28 }}>
                {profile?.name || username}
              </h1>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: '#666', maxWidth: 500, marginBottom: 36 }}>
                {profile?.bio || 'Visual storyteller. Crafting identities, illustrations, and print work that endures.'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {profile?.resumeUrl && (
                  <a href={profile.resumeUrl} target="_blank" rel="noreferrer" style={{ padding: '11px 28px', borderRadius: 8, background: '#f5f5f5', color: '#080808', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>View CV</a>
                )}
                {profile?.socialLinks?.github && (
                  <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" style={{ padding: '11px 18px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', color: '#999', fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Github size={16} />
                  </a>
                )}
                {profile?.socialLinks?.linkedin && (
                  <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" style={{ padding: '11px 18px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', color: '#999', fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Linkedin size={16} />
                  </a>
                )}
              </div>
            </div>
            {profile?.avatarUrl && (
              <img src={profile.avatarUrl} alt={profile.name || username} style={{ width: 180, height: 180, borderRadius: 12, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} />
            )}
          </div>
        </header>

        {/* Gallery / Projects */}
        {projects && projects.length > 0 && (
          <section style={{ paddingTop: 72, paddingBottom: 72, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="section-title">Selected Works</div>
            <div style={{ columns: 2, columnGap: 16, breakInside: 'avoid' }}>
              {projects.map((p, i) => (
                <div key={p.id} className="gallery-item" style={{ marginBottom: 16, breakInside: 'avoid', display: 'block' }}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}>
                  {p.screenshotUrl ? (
                    <img src={p.screenshotUrl} alt={p.title} style={{ width: '100%', display: 'block', borderRadius: 16, minHeight: 200, objectFit: 'cover' }} />
                  ) : (
                    <div className="placeholder" style={{ width: '100%', height: i % 3 === 0 ? 260 : 200, borderRadius: 16, background: `hsl(${(i * 47) % 360}, 15%, 12%)`, border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 48, fontWeight: 900, color: 'rgba(255,255,255,0.08)' }}>{p.title.charAt(0)}</span>
                    </div>
                  )}
                  <div className="overlay">
                    <div className="overlay-icon" style={{ textAlign: 'center' }}>
                      <ZoomIn size={32} color="white" />
                      <p style={{ color: 'white', fontSize: 13, fontWeight: 600, marginTop: 8, maxWidth: 160 }}>{p.title}</p>
                    </div>
                  </div>
                  <div style={{ padding: '14px 4px 4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: 15, fontWeight: 600, color: '#e8e8e8' }}>{p.title}</h3>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {p.liveLink && <a href={p.liveLink} target="_blank" rel="noreferrer" style={{ color: '#666' }}><ExternalLink size={14} /></a>}
                        {p.repoLink && <a href={p.repoLink} target="_blank" rel="noreferrer" style={{ color: '#666' }}><Github size={14} /></a>}
                      </div>
                    </div>
                    {p.techStack && p.techStack.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                        {p.techStack.map((t) => (
                          <span key={t} style={{ fontSize: 11, color: '#555', padding: '2px 8px', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 4 }}>{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {allSkills.length > 0 && (
          <section style={{ paddingTop: 72, paddingBottom: 72, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="section-title">Tools & Media</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {allSkills.map((s) => (
                <span key={s} style={{ fontSize: 13, fontWeight: 500, padding: '8px 18px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', color: '#aaa', transition: 'all 0.2s' }}>
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section style={{ paddingTop: 72, paddingBottom: 100 }}>
          <div className="section-title">Start a Project</div>
          <ContactForm username={username} template="design-canvas" />
        </section>
      </div>
    </div>
  );
}
