import { useState } from 'react';
import { ContactForm } from './ContactForm';
import { ExternalLink, Linkedin, ZoomIn, X, Instagram } from 'lucide-react';

export default function DesignCanvasTemplate({ data }: { data: any }) {
  const { profile, projects, skills, username } = data;
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const allSkills = [
    ...(skills?.frontend || []),
    ...(skills?.backend || []),
    ...(skills?.devops || []),
    ...(skills?.other || []),
  ];

  // Support gallery images from profile (Graphic Designer stream)
  const galleryImages: any[] = profile?.galleryImages || [];
  const services: any[] = profile?.services || [];
  const testimonials: any[] = profile?.testimonials || [];

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: '#e8e8e8', fontFamily: "'Inter', system-ui, sans-serif", overflowX: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .dc-gallery-item { overflow:hidden; border-radius:12px; cursor:pointer; position:relative; break-inside:avoid; margin-bottom:16px; }
        .dc-gallery-item img { transition:transform 0.5s cubic-bezier(0.4,0,0.2,1); width:100%; display:block; }
        .dc-gallery-item:hover img { transform:scale(1.05); }
        .dc-overlay { position:absolute; inset:0; background:rgba(0,0,0,0); transition:background 0.3s; display:flex; align-items:center; justify-content:center; }
        .dc-gallery-item:hover .dc-overlay { background:rgba(0,0,0,0.55); }
        .dc-overlay-icon { opacity:0; transform:scale(0.8); transition:all 0.3s; }
        .dc-gallery-item:hover .dc-overlay-icon { opacity:1; transform:scale(1); }
        .dc-section-label { font-size:11px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:#555; margin-bottom:32px; }
        .dc-service-card { padding:28px; border:1px solid rgba(255,255,255,0.07); border-radius:14px; background:rgba(255,255,255,0.02); transition:border-color 0.2s; }
        .dc-service-card:hover { border-color:rgba(255,255,255,0.15); }
        .dc-testimonial { padding:28px; border-radius:14px; background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.05); }
        .dc-lightbox { position:fixed; inset:0; z-index:9999; background:rgba(0,0,0,0.96); display:flex; align-items:center; justify-content:center; padding:24px; }
        .dc-lightbox img { max-width:90vw; max-height:90vh; object-fit:contain; border-radius:8px; }
      `}} />

      {/* Lightbox */}
      {lightboxImg && (
        <div className="dc-lightbox" onClick={() => setLightboxImg(null)}>
          <button onClick={() => setLightboxImg(null)} style={{ position: 'absolute', top: 24, right: 24, background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={20} />
          </button>
          <img src={lightboxImg} alt="" onClick={e => e.stopPropagation()} />
        </div>
      )}

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', position: 'relative' }}>
        {/* Hero */}
        <header style={{ paddingTop: 80, paddingBottom: 80, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: profile?.avatarUrl ? '1fr auto' : '1fr', gap: 40, alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 12, color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16, fontWeight: 600 }}>
                {profile?.domain || 'Graphic Designer'}
              </p>
              <h1 style={{ fontSize: 'clamp(48px, 8vw, 88px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, color: '#f5f5f5', marginBottom: 28 }}>
                {profile?.name || username}
              </h1>
              <p style={{ fontSize: 16, lineHeight: 1.85, color: '#666', maxWidth: 500, marginBottom: 36 }}>
                {profile?.bio || 'Visual storyteller. Crafting identities, illustrations, and work that endures.'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {profile?.socialLinks?.behance && (
                  <a href={profile.socialLinks.behance} target="_blank" rel="noreferrer" style={{ padding: '11px 24px', borderRadius: 8, background: '#f5f5f5', color: '#080808', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>Behance</a>
                )}
                {profile?.socialLinks?.dribbble && (
                  <a href={profile.socialLinks.dribbble} target="_blank" rel="noreferrer" style={{ padding: '11px 24px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', color: '#999', fontSize: 14, textDecoration: 'none' }}>Dribbble</a>
                )}
                {profile?.socialLinks?.instagram && (
                  <a href={profile.socialLinks.instagram} target="_blank" rel="noreferrer" style={{ padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', color: '#999', fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Instagram size={16} />
                  </a>
                )}
                {profile?.socialLinks?.linkedin && (
                  <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" style={{ padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', color: '#999', fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
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

        {/* Gallery — from profile.galleryImages (designer stream) */}
        {galleryImages.length > 0 && (
          <section style={{ paddingTop: 80, paddingBottom: 80, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="dc-section-label">Portfolio Gallery</div>
            <div style={{ columns: 2, columnGap: 16 }}>
              {galleryImages.map((img: any, i: number) => (
                <div key={img.id || i} className="dc-gallery-item" onClick={() => setLightboxImg(img.url)}>
                  <img src={img.url} alt={img.title || ''} loading="lazy" />
                  <div className="dc-overlay">
                    <div className="dc-overlay-icon" style={{ textAlign: 'center' }}>
                      <ZoomIn size={28} color="white" />
                      {img.title && <p style={{ color: 'white', fontSize: 13, fontWeight: 600, marginTop: 8, maxWidth: 160 }}>{img.title}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Fallback: Projects (for non-designer stream users or old data) */}
        {galleryImages.length === 0 && projects && projects.length > 0 && (
          <section style={{ paddingTop: 80, paddingBottom: 80, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="dc-section-label">Selected Works</div>
            <div style={{ columns: 2, columnGap: 16 }}>
              {projects.map((p: any, i: number) => (
                <div key={p.id} className="dc-gallery-item"
                  onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)}>
                  {p.screenshotUrl ? (
                    <img src={p.screenshotUrl} alt={p.title} style={{ width: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: i % 3 === 0 ? 260 : 200, background: `hsl(${(i * 47) % 360}, 12%, 12%)`, border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 48, fontWeight: 900, color: 'rgba(255,255,255,0.08)' }}>{p.title.charAt(0)}</span>
                    </div>
                  )}
                  <div className="dc-overlay">
                    <div className="dc-overlay-icon" style={{ textAlign: 'center' }}>
                      <ZoomIn size={28} color="white" />
                      <p style={{ color: 'white', fontSize: 13, fontWeight: 600, marginTop: 8, maxWidth: 160 }}>{p.title}</p>
                    </div>
                  </div>
                  <div style={{ padding: '12px 4px 4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: 14, fontWeight: 600, color: '#e8e8e8' }}>{p.title}</h3>
                      {p.liveLink && <a href={p.liveLink} target="_blank" rel="noreferrer" style={{ color: '#555' }}><ExternalLink size={13} /></a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Services */}
        {services.length > 0 && (
          <section style={{ paddingTop: 80, paddingBottom: 80, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="dc-section-label">Services</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
              {services.map((s: any, i: number) => (
                <div key={s.id || i} className="dc-service-card">
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f0', marginBottom: 10 }}>{s.title}</h3>
                  {s.description && <p style={{ fontSize: 14, lineHeight: 1.8, color: '#666' }}>{s.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills (tools) */}
        {allSkills.length > 0 && (
          <section style={{ paddingTop: 72, paddingBottom: 72, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="dc-section-label">Tools & Software</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {allSkills.map((s) => (
                <span key={s} style={{ fontSize: 13, fontWeight: 500, padding: '8px 18px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', color: '#aaa' }}>
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <section style={{ paddingTop: 72, paddingBottom: 72, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="dc-section-label">Client Feedback</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {testimonials.map((t: any, i: number) => (
                <div key={t.id || i} className="dc-testimonial">
                  <p style={{ fontSize: 15, lineHeight: 1.8, color: '#777', fontStyle: 'italic', marginBottom: 20 }}>"{t.text}"</p>
                  <p style={{ fontWeight: 600, fontSize: 14, color: '#e0e0e0' }}>{t.name}</p>
                  {(t.role || t.company) && <p style={{ fontSize: 12, color: '#555', marginTop: 4 }}>{t.role}{t.role && t.company ? ' · ' : ''}{t.company}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section style={{ paddingTop: 72, paddingBottom: 100 }}>
          <div className="dc-section-label">Start a Project</div>
          <ContactForm username={username} template="design-canvas" />
        </section>
      </div>
    </div>
  );
}
