import { useState, useEffect, useCallback } from 'react';
import { ContactForm } from './ContactForm';
import { Instagram, MapPin, Mail, X, ChevronDown } from 'lucide-react';

export default function LensCraftTemplate({ data }: { data: any }) {
  const { profile, username } = data;
  const [lightboxImg, setLightboxImg] = useState<{ url: string; title?: string; index: number } | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [heroLoaded, setHeroLoaded] = useState(false);

  const gallery = profile?.galleryImages || [];
  const services = profile?.services || [];
  const testimonials = profile?.testimonials || [];
  const categories = ['All', ...Array.from(new Set(gallery.map((img: any) => img.category).filter(Boolean))) as string[]];
  const filtered = activeCategory === 'All' ? gallery : gallery.filter((img: any) => img.category === activeCategory);

  const heroImage = profile?.coverImageUrl || (gallery.length > 0 ? gallery[0].url : null);

  const openLightbox = (img: any, index: number) => setLightboxImg({ url: img.url, title: img.title, index });
  const closeLightbox = useCallback(() => setLightboxImg(null), []);
  const navigateLightbox = useCallback((dir: 'prev' | 'next') => {
    if (!lightboxImg) return;
    const newIndex = dir === 'prev'
      ? (lightboxImg.index - 1 + filtered.length) % filtered.length
      : (lightboxImg.index + 1) % filtered.length;
    const img = filtered[newIndex];
    setLightboxImg({ url: img.url, title: img.title, index: newIndex });
  }, [lightboxImg, filtered]);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightboxImg) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxImg, closeLightbox, navigateLightbox]);

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: '#d8d8d8', fontFamily: "'Inter', system-ui, sans-serif", overflowX: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .lc-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          background: rgba(8,8,8,0); backdrop-filter: blur(0px);
          border-bottom: 1px solid rgba(255,255,255,0);
          transition: background 0.5s, backdrop-filter 0.5s, border-color 0.5s;
          padding: 0 40px; height: 70px; display: flex; align-items: center; justify-content: space-between;
        }
        .lc-nav.scrolled {
          background: rgba(8,8,8,0.88); backdrop-filter: blur(24px);
          border-bottom-color: rgba(255,255,255,0.05);
        }
        .lc-nav-link {
          color: rgba(255,255,255,0.5); font-size: 13px; font-weight: 400;
          text-decoration: none; letter-spacing: 0.12em; text-transform: uppercase;
          transition: color 0.25s;
        }
        .lc-nav-link:hover { color: #fff; }

        .lc-hero {
          position: relative; height: 100vh; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .lc-hero-bg {
          position: absolute; inset: 0; z-index: 0;
          background-size: cover; background-position: center;
          transform: scale(1.05); transition: transform 8s ease;
        }
        .lc-hero-bg.loaded { transform: scale(1); }
        .lc-hero-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(180deg, rgba(8,8,8,0.35) 0%, rgba(8,8,8,0.15) 40%, rgba(8,8,8,0.75) 80%, rgba(8,8,8,1) 100%);
        }
        .lc-hero-content {
          position: relative; z-index: 2; text-align: center; padding: 0 32px;
          opacity: 0; transform: translateY(30px);
          transition: opacity 1.2s cubic-bezier(0.25,0.46,0.45,0.94), transform 1.2s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .lc-hero-content.loaded { opacity: 1; transform: translateY(0); }

        .lc-eyebrow {
          font-size: 11px; font-weight: 500; letter-spacing: 0.35em; text-transform: uppercase;
          color: rgba(255,255,255,0.45); margin-bottom: 24px;
        }
        .lc-hero-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(64px, 10vw, 128px); font-weight: 300; line-height: 0.9;
          color: #f8f5f0; letter-spacing: -0.02em; margin-bottom: 32px;
        }
        .lc-hero-bio {
          font-size: 16px; line-height: 1.9; color: rgba(255,255,255,0.5);
          max-width: 480px; margin: 0 auto 48px; font-weight: 300;
        }
        .lc-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 36px; background: #f8f5f0; color: #080808;
          font-size: 13px; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; text-decoration: none; border-radius: 2px;
          transition: background 0.2s, transform 0.2s;
        }
        .lc-btn-primary:hover { background: #fff; transform: translateY(-1px); }
        .lc-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 36px; background: transparent; color: rgba(255,255,255,0.8);
          font-size: 13px; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; text-decoration: none; border-radius: 2px;
          border: 1px solid rgba(255,255,255,0.2);
          transition: border-color 0.2s, color 0.2s, transform 0.2s;
        }
        .lc-btn-ghost:hover { border-color: rgba(255,255,255,0.6); color: #fff; transform: translateY(-1px); }

        .lc-scroll-indicator {
          position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); z-index: 2;
          display: flex; flex-direction: column; align-items: center; gap: 10px; opacity: 0;
          animation: fadeInScroll 1.5s ease 2s forwards;
        }
        @keyframes fadeInScroll { to { opacity: 0.35; } }
        .lc-scroll-line {
          width: 1px; height: 50px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.7), transparent);
          animation: scrollPulse 2s ease infinite;
        }
        @keyframes scrollPulse {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          50.01% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }

        .lc-section { padding: 130px 40px; }
        .lc-container { max-width: 1160px; margin: 0 auto; }
        .lc-section-label {
          font-size: 10px; font-weight: 600; letter-spacing: 0.4em; text-transform: uppercase;
          color: rgba(255,255,255,0.25); margin-bottom: 14px;
        }
        .lc-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(38px, 5vw, 58px); font-weight: 400;
          color: #f0ede8; letter-spacing: -0.01em; line-height: 1.05;
        }

        .lc-cat-strip { display: flex; gap: 6px; flex-wrap: wrap; }
        .lc-cat-btn {
          padding: 7px 18px; border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.1); background: transparent;
          color: rgba(255,255,255,0.4); font-size: 12px; letter-spacing: 0.08em;
          cursor: pointer; transition: all 0.2s; font-family: inherit;
        }
        .lc-cat-btn:hover { color: rgba(255,255,255,0.8); border-color: rgba(255,255,255,0.3); }
        .lc-cat-btn.active {
          background: rgba(255,255,255,0.1); color: #fff; border-color: rgba(255,255,255,0.35);
        }

        .lc-masonry { columns: 2; column-gap: 10px; }
        @media(min-width: 640px) { .lc-masonry { columns: 3; column-gap: 14px; } }
        .lc-masonry-item {
          break-inside: avoid; margin-bottom: 10px;
          position: relative; overflow: hidden; border-radius: 3px; cursor: pointer;
        }
        @media(min-width: 640px) { .lc-masonry-item { margin-bottom: 14px; } }
        .lc-masonry-item img {
          width: 100%; display: block;
          transition: transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .lc-masonry-item:hover img { transform: scale(1.06); }
        .lc-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%);
          opacity: 0; transition: opacity 0.4s; display: flex; align-items: flex-end; padding: 18px;
        }
        .lc-masonry-item:hover .lc-img-overlay { opacity: 1; }
        .lc-img-caption { transform: translateY(8px); transition: transform 0.4s; }
        .lc-masonry-item:hover .lc-img-caption { transform: translateY(0); }

        .lc-placeholder-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .lc-placeholder {
          background: linear-gradient(135deg, #141414, #1e1e1e);
          border-radius: 3px; display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.12); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
        }

        .lc-service-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.06); }
        .lc-service-item {
          padding: 44px 36px; background: #080808;
          transition: background 0.25s;
        }
        .lc-service-item:hover { background: #0f0f0f; }
        .lc-service-num { font-family: 'Cormorant Garamond', serif; font-size: 13px; color: rgba(255,255,255,0.2); margin-bottom: 20px; }
        .lc-service-title { font-size: 18px; font-weight: 500; color: #e8e5e0; margin-bottom: 14px; letter-spacing: -0.01em; }
        .lc-service-desc { font-size: 14px; line-height: 1.8; color: rgba(255,255,255,0.38); font-weight: 300; }

        .lc-testimonials { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px; }
        .lc-testimonial {
          padding: 40px; border: 1px solid rgba(255,255,255,0.06);
          border-radius: 3px; position: relative; overflow: hidden;
          transition: border-color 0.3s;
        }
        .lc-testimonial:hover { border-color: rgba(255,255,255,0.15); }
        .lc-testimonial-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: 72px; line-height: 1; color: rgba(255,255,255,0.06);
          position: absolute; top: 20px; left: 32px; user-select: none;
        }
        .lc-testimonial-text {
          font-size: 15px; line-height: 1.85; color: rgba(255,255,255,0.5);
          font-style: italic; margin-bottom: 28px; font-weight: 300; position: relative; z-index: 1;
        }
        .lc-testimonial-author { font-size: 13px; font-weight: 600; color: #c8c5c0; }
        .lc-testimonial-role { font-size: 12px; color: rgba(255,255,255,0.28); margin-top: 4px; }

        .lc-lightbox {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,0.97); backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
          animation: lbFadeIn 0.25s ease;
        }
        @keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .lc-lightbox-img {
          max-width: min(88vw, 1200px); max-height: 86vh; object-fit: contain;
          border-radius: 2px; animation: lbImgIn 0.3s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        @keyframes lbImgIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        .lc-lightbox-close {
          position: absolute; top: 28px; right: 32px;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.7); border-radius: 50%; width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          transition: background 0.2s, color 0.2s; font-size: 0;
        }
        .lc-lightbox-close:hover { background: rgba(255,255,255,0.15); color: #fff; }
        .lc-lightbox-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.5); width: 52px; height: 52px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          transition: background 0.2s, color 0.2s; font-size: 20px; font-weight: 300;
        }
        .lc-lightbox-nav:hover { background: rgba(255,255,255,0.14); color: #fff; }
        .lc-lightbox-caption {
          position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%);
          text-align: center; color: rgba(255,255,255,0.4); font-size: 13px; letter-spacing: 0.05em;
        }

        .lc-contact-info { display: flex; gap: 32px; flex-wrap: wrap; justify-content: center; margin-bottom: 48px; }
        .lc-contact-link {
          display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.35);
          font-size: 13px; text-decoration: none; letter-spacing: 0.06em; transition: color 0.2s;
        }
        .lc-contact-link:hover { color: rgba(255,255,255,0.8); }

        .lc-divider { height: 1px; background: rgba(255,255,255,0.05); margin: 0 40px; }
        .lc-footer { padding: 32px 40px; text-align: center; }
        .lc-footer-text { font-size: 12px; color: rgba(255,255,255,0.18); letter-spacing: 0.08em; }
      `}} />

      {/* Lightbox */}
      {lightboxImg && (
        <div className="lc-lightbox" onClick={closeLightbox}>
          <button className="lc-lightbox-close" onClick={closeLightbox}><X size={18} /></button>
          {filtered.length > 1 && (
            <>
              <button className="lc-lightbox-nav" style={{ left: 24 }} onClick={e => { e.stopPropagation(); navigateLightbox('prev'); }}>‹</button>
              <button className="lc-lightbox-nav" style={{ right: 24 }} onClick={e => { e.stopPropagation(); navigateLightbox('next'); }}>›</button>
            </>
          )}
          <img key={lightboxImg.url} className="lc-lightbox-img" src={lightboxImg.url} alt={lightboxImg.title || ''} onClick={e => e.stopPropagation()} />
          {(lightboxImg.title || filtered.length > 1) && (
            <div className="lc-lightbox-caption">
              {lightboxImg.title && <span>{lightboxImg.title}</span>}
              {filtered.length > 1 && <span style={{ marginLeft: 12, opacity: 0.5 }}>{lightboxImg.index + 1} / {filtered.length}</span>}
            </div>
          )}
        </div>
      )}

      {/* Nav */}
      <NavBar name={profile?.name || username} />

      {/* Hero */}
      <section className="lc-hero" id="about">
        {heroImage ? (
          <div className={`lc-hero-bg ${heroLoaded ? 'loaded' : ''}`} style={{ backgroundImage: `url(${heroImage})` }} />
        ) : (
          <div className="lc-hero-bg loaded" style={{ background: 'linear-gradient(135deg, #0d0d0d 0%, #181818 50%, #0a0a0a 100%)' }} />
        )}
        <div className="lc-hero-overlay" />
        <div className={`lc-hero-content ${heroLoaded ? 'loaded' : ''}`}>
          {profile?.avatarUrl && !heroImage && (
            <img src={profile.avatarUrl} alt={profile.name || username}
              style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 36px', display: 'block', border: '1px solid rgba(255,255,255,0.15)' }} />
          )}
          <div className="lc-eyebrow">
            {profile?.photographyStyle || 'Photographer'}{profile?.location ? ` · ${profile.location}` : ''}
          </div>
          <h1 className="lc-hero-name">{profile?.name || username}</h1>
          {profile?.bio && <p className="lc-hero-bio">{profile.bio}</p>}
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#work" className="lc-btn-primary">View Portfolio</a>
            <a href="#contact" className="lc-btn-ghost">Book a Session</a>
          </div>
          {profile?.socialLinks?.instagram && (
            <a href={profile.socialLinks.instagram} target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 36, color: 'rgba(255,255,255,0.3)', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}>
              <Instagram size={16} /> Follow on Instagram
            </a>
          )}
        </div>
        <div className="lc-scroll-indicator">
          <div className="lc-scroll-line" />
          <ChevronDown size={14} style={{ color: 'rgba(255,255,255,0.4)' }} />
        </div>
      </section>

      {/* Gallery */}
      <section id="work" className="lc-section">
        <div className="lc-container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 64, textAlign: 'center' }}>
            <div className="lc-section-label">Selected Work</div>
            <h2 className="lc-section-title">Portfolio</h2>
            {categories.length > 1 && (
              <div className="lc-cat-strip" style={{ marginTop: 20 }}>
                {categories.map(cat => (
                  <button key={cat} className={`lc-cat-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="lc-masonry">
              {filtered.map((img: any, i: number) => (
                <div key={img.id || i} className="lc-masonry-item" onClick={() => openLightbox(img, i)}>
                  <img src={img.url} alt={img.title || ''} loading="lazy" />
                  <div className="lc-img-overlay">
                    <div className="lc-img-caption">
                      {img.title && <p style={{ fontWeight: 500, fontSize: 14, color: '#fff', marginBottom: 3 }}>{img.title}</p>}
                      {img.category && <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{img.category}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="lc-placeholder-grid">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="lc-placeholder" style={{ aspectRatio: i % 3 === 1 ? '3/4' : '4/3' }}>
                  <span>Add Photos</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="lc-divider" />

      {/* Services */}
      {services.length > 0 && (
        <section id="services" className="lc-section">
          <div className="lc-container">
            <div style={{ marginBottom: 64, textAlign: 'center' }}>
              <div className="lc-section-label">What I Offer</div>
              <h2 className="lc-section-title" style={{ marginTop: 12 }}>Services</h2>
            </div>
            <div className="lc-service-grid">
              {services.map((s: any, i: number) => (
                <div key={s.id || i} className="lc-service-item">
                  <div className="lc-service-num">0{i + 1}</div>
                  <h3 className="lc-service-title">{s.title}</h3>
                  {s.description && <p className="lc-service-desc">{s.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <>
          <div className="lc-divider" />
          <section className="lc-section">
            <div className="lc-container">
              <div style={{ marginBottom: 64, textAlign: 'center' }}>
                <div className="lc-section-label">Client Stories</div>
                <h2 className="lc-section-title" style={{ marginTop: 12 }}>Testimonials</h2>
              </div>
              <div className="lc-testimonials">
                {testimonials.map((t: any, i: number) => (
                  <div key={t.id || i} className="lc-testimonial">
                    <div className="lc-testimonial-quote">"</div>
                    <p className="lc-testimonial-text">"{t.text}"</p>
                    <div>
                      <div className="lc-testimonial-author">{t.name}</div>
                      {(t.role || t.company) && (
                        <div className="lc-testimonial-role">
                          {t.role}{t.role && t.company ? ' · ' : ''}{t.company}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <div className="lc-divider" />

      {/* Contact */}
      <section id="contact" className="lc-section">
        <div className="lc-container" style={{ maxWidth: 680 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="lc-section-label">Get in Touch</div>
            <h2 className="lc-section-title" style={{ marginTop: 12, marginBottom: 20 }}>Let's Create Together</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.35)', lineHeight: 1.8, fontWeight: 300 }}>
              Available for editorial shoots, commercial work, and creative collaborations.
            </p>
          </div>
          <div className="lc-contact-info">
            {profile?.location && (
              <span className="lc-contact-link"><MapPin size={14} /> {profile.location}</span>
            )}
            {profile?.socialLinks?.instagram && (
              <a href={profile.socialLinks.instagram} target="_blank" rel="noreferrer" className="lc-contact-link"><Instagram size={14} /> Instagram</a>
            )}
            {profile?.socialLinks?.website && (
              <a href={profile.socialLinks.website} target="_blank" rel="noreferrer" className="lc-contact-link"><Mail size={14} /> Website</a>
            )}
          </div>
          <ContactForm username={data.username} />
        </div>
      </section>

      <div className="lc-divider" />
      <footer className="lc-footer">
        <p className="lc-footer-text">© {new Date().getFullYear()} {profile?.name || username} · Built with CodeFolio</p>
      </footer>
    </div>
  );
}

function NavBar({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const el = document.querySelector('.lc-scroll-parent') || window;
    const onScroll = () => setScrolled((el === window ? window.scrollY : (el as Element).scrollTop) > 60);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`lc-nav ${scrolled ? 'scrolled' : ''}`}>
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, letterSpacing: '0.04em', color: '#f0ede8' }}>{name}</span>
      <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
        {['Work', 'Services', 'Contact'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} className="lc-nav-link">{item}</a>
        ))}
      </div>
    </nav>
  );
}
