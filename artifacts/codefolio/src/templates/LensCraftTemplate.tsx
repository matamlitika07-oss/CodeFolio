import { useState } from 'react';
import { ContactForm } from './ContactForm';
import { Instagram, MapPin, Mail, ChevronRight, X } from 'lucide-react';

export default function LensCraftTemplate({ data }: { data: any }) {
  const { profile, username } = data;
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const gallery = profile?.galleryImages || [];
  const services = profile?.services || [];
  const testimonials = profile?.testimonials || [];
  const categories = ['All', ...Array.from(new Set(gallery.map((img: any) => img.category).filter(Boolean)))];
  const filtered = activeCategory === 'All' ? gallery : gallery.filter((img: any) => img.category === activeCategory);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#e8e8e8', fontFamily: "'Inter', system-ui, sans-serif", overflowX: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .lens-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(10,10,10,0.85); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .lens-hero { position: relative; height: 100vh; overflow: hidden; }
        .lens-hero-bg { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.6) 60%, rgba(10,10,10,1) 100%); z-index: 1; }
        .gallery-masonry { columns: 2; column-gap: 12px; }
        @media (min-width: 768px) { .gallery-masonry { columns: 3; column-gap: 16px; } }
        .gallery-item { break-inside: avoid; margin-bottom: 12px; position: relative; overflow: hidden; border-radius: 8px; cursor: pointer; }
        @media (min-width: 768px) { .gallery-item { margin-bottom: 16px; } }
        .gallery-item img { width: 100%; display: block; transition: transform 0.6s cubic-bezier(0.4,0,0.2,1); }
        .gallery-item:hover img { transform: scale(1.04); }
        .gallery-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0); transition: background 0.3s; display: flex; align-items: flex-end; padding: 16px; }
        .gallery-item:hover .gallery-overlay { background: rgba(0,0,0,0.5); }
        .gallery-caption { opacity: 0; transform: translateY(8px); transition: all 0.3s; color: white; }
        .gallery-item:hover .gallery-caption { opacity: 1; transform: translateY(0); }
        .cat-btn { padding: 8px 20px; border-radius: 40px; border: 1px solid rgba(255,255,255,0.15); background: transparent; color: #999; font-size: 13px; cursor: pointer; transition: all 0.2s; letter-spacing: 0.05em; }
        .cat-btn.active, .cat-btn:hover { background: rgba(255,255,255,0.1); color: #fff; border-color: rgba(255,255,255,0.3); }
        .service-card { padding: 32px; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; background: rgba(255,255,255,0.02); transition: border-color 0.2s; }
        .service-card:hover { border-color: rgba(255,255,255,0.18); }
        .testimonial-card { padding: 32px; border-radius: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); }
        .lightbox { position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,0.95); display: flex; align-items: center; justify-content: center; padding: 24px; }
        .lightbox img { max-width: 90vw; max-height: 90vh; object-fit: contain; border-radius: 8px; }
        .section-label { font-size: 11px; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase; color: #555; margin-bottom: 12px; }
        .placeholder-img { background: linear-gradient(135deg, #1a1a1a, #2a2a2a); display: flex; align-items: center; justify-content: center; color: #444; font-size: 12px; }
      `}} />

      {/* Lightbox */}
      {lightboxImg && (
        <div className="lightbox" onClick={() => setLightboxImg(null)}>
          <button onClick={() => setLightboxImg(null)} style={{ position: 'absolute', top: 24, right: 24, background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={20} />
          </button>
          <img src={lightboxImg} alt="" onClick={e => e.stopPropagation()} />
        </div>
      )}

      {/* Nav */}
      <nav className="lens-nav">
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em', color: '#f0f0f0' }}>
            {profile?.name || username}
          </span>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {['Work', 'About', 'Services', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{ color: '#888', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="lens-hero" id="about">
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)' }} />
        <div className="lens-hero-bg" />
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 32px', paddingTop: 64 }}>
          {profile?.avatarUrl && (
            <img src={profile.avatarUrl} alt={profile.name || username}
              style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', marginBottom: 32, border: '2px solid rgba(255,255,255,0.15)' }} />
          )}
          <div className="section-label" style={{ marginBottom: 20 }}>
            {profile?.photographyStyle || 'Photographer'}{profile?.location ? ` · ${profile.location}` : ''}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(56px, 10vw, 110px)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.02em', color: '#f5f5f5', marginBottom: 28 }}>
            {profile?.name || username}
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.85, color: '#666', maxWidth: 520, marginBottom: 44 }}>
            {profile?.bio || 'Capturing the world one frame at a time. Specializing in cinematic, evocative imagery.'}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#work" style={{ padding: '13px 32px', borderRadius: 8, background: '#f5f5f5', color: '#0a0a0a', fontWeight: 600, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              View Portfolio <ChevronRight size={16} />
            </a>
            <a href="#contact" style={{ padding: '13px 32px', borderRadius: 8, background: 'transparent', color: '#f5f5f5', fontWeight: 600, fontSize: 14, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>
              Book a Session
            </a>
          </div>
          {(profile?.socialLinks?.instagram) && (
            <div style={{ marginTop: 40, display: 'flex', gap: 16 }}>
              {profile.socialLinks.instagram && (
                <a href={profile.socialLinks.instagram} target="_blank" rel="noreferrer" style={{ color: '#666', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#666')}>
                  <Instagram size={20} />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.4 }}>
          <div style={{ width: 1, height: 60, background: 'linear-gradient(to bottom, transparent, #fff)' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>Scroll</span>
        </div>
      </section>

      {/* Gallery */}
      <section id="work" style={{ padding: '120px 32px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <div className="section-label">Portfolio</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 700, textAlign: 'center', color: '#f5f5f5' }}>
            Selected Work
          </h2>
          {categories.length > 1 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 12 }}>
              {categories.map(cat => (
                <button key={cat} className={`cat-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="gallery-masonry">
            {filtered.map((img: any, i: number) => (
              <div key={img.id || i} className="gallery-item" onClick={() => setLightboxImg(img.url)}>
                <img src={img.url} alt={img.title || ''} loading="lazy" />
                <div className="gallery-overlay">
                  <div className="gallery-caption">
                    {img.title && <p style={{ fontWeight: 600, fontSize: 15 }}>{img.title}</p>}
                    {img.category && <p style={{ fontSize: 12, color: '#aaa', marginTop: 4 }}>{img.category}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="placeholder-img" style={{ aspectRatio: i % 3 === 1 ? '3/4' : '4/3', borderRadius: 8 }}>
                <span>Add Photos</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Services */}
      {services.length > 0 && (
        <section id="services" style={{ padding: '100px 32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 60, textAlign: 'center' }}>
              <div className="section-label">What I Offer</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: '#f5f5f5', marginTop: 12 }}>
                Services
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              {services.map((s: any, i: number) => (
                <div key={s.id || i} className="service-card">
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: '#f0f0f0', marginBottom: 12 }}>{s.title}</h3>
                  {s.description && <p style={{ fontSize: 15, lineHeight: 1.75, color: '#666' }}>{s.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section style={{ padding: '100px 32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 60, textAlign: 'center' }}>
              <div className="section-label">Client Stories</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: '#f5f5f5', marginTop: 12 }}>
                Testimonials
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
              {testimonials.map((t: any, i: number) => (
                <div key={t.id || i} className="testimonial-card">
                  <p style={{ fontSize: 16, lineHeight: 1.8, color: '#888', fontStyle: 'italic', marginBottom: 24 }}>"{t.text}"</p>
                  <div>
                    <p style={{ fontWeight: 600, color: '#e0e0e0', fontSize: 15 }}>{t.name}</p>
                    {(t.role || t.company) && (
                      <p style={{ fontSize: 13, color: '#555', marginTop: 4 }}>
                        {t.role}{t.role && t.company ? ' · ' : ''}{t.company}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" style={{ padding: '120px 32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="section-label">Get in Touch</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: '#f5f5f5', marginTop: 12, marginBottom: 16 }}>
              Let's Create Together
            </h2>
            <p style={{ fontSize: 16, color: '#666', lineHeight: 1.75 }}>
              Available for shoots, collaborations, and creative projects.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 48, flexWrap: 'wrap' }}>
            {profile?.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#666', fontSize: 14 }}>
                <MapPin size={16} /> {profile.location}
              </div>
            )}
            {profile?.socialLinks?.instagram && (
              <a href={profile.socialLinks.instagram} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#666', fontSize: 14, textDecoration: 'none' }}>
                <Instagram size={16} /> Instagram
              </a>
            )}
            {profile?.socialLinks?.website && (
              <a href={profile.socialLinks.website} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#666', fontSize: 14, textDecoration: 'none' }}>
                <Mail size={16} /> Website
              </a>
            )}
          </div>
          <ContactForm username={data.username} />
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 32px', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: '#444' }}>
          © {new Date().getFullYear()} {profile?.name || username} · Built with CodeFolio
        </p>
      </footer>
    </div>
  );
}
