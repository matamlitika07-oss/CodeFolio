import { PublicPortfolio } from '@workspace/api-client-react';
import { ContactForm } from './ContactForm';
import { Github, ExternalLink, Linkedin } from 'lucide-react';

export default function PixelForgeTemplate({ data }: { data: PublicPortfolio }) {
  const { profile, projects, skills, username } = data;
  const allSkills = [
    ...(skills?.frontend || []),
    ...(skills?.backend || []),
    ...(skills?.devops || []),
    ...(skills?.other || []),
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#010105', color: '#e0e0ff', fontFamily: "'Courier New', Courier, monospace", overflowX: 'hidden', imageRendering: 'pixelated' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        @keyframes scanline { 0%{top:0%} 100%{top:100%} }
        @keyframes glitch { 0%,100%{clip-path:polygon(0 0,100% 0,100% 45%,0 45%)} 10%{clip-path:polygon(0 20%,100% 20%,100% 60%,0 60%)} 20%{clip-path:polygon(0 40%,100% 40%,100% 80%,0 80%)} 30%{clip-path:polygon(0 5%,100% 5%,100% 30%,0 30%)} }
        @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes xp-fill { from{width:0%} to{width:var(--xp)} }
        @keyframes float-star { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes neon-pulse { 0%,100%{text-shadow:0 0 10px #00ffff,0 0 20px #00ffff} 50%{text-shadow:0 0 20px #00ffff,0 0 40px #00ffff,0 0 60px #00ffff} }
        .pixel-card { background:#000814; border:2px solid #00ffff; position:relative; transition:all 0.15s steps(1); image-rendering:pixelated; }
        .pixel-card::before { content:''; position:absolute; top:4px; left:4px; right:-4px; bottom:-4px; background:#00ffff; z-index:-1; }
        .pixel-card:hover { transform:translate(-2px,-2px); }
        .pixel-card:hover::before { background:#ff00ff; }
        .neon-title { color:#00ffff; animation:neon-pulse 2s ease-in-out infinite; font-family:'Press Start 2P',monospace; }
        .cursor-blink { animation:blink 1s step-end infinite; }
        .xp-bar-container { height:16px; background:#001; border:2px solid #00ffff; overflow:hidden; position:relative; }
        .xp-bar-fill { height:100%; background:linear-gradient(90deg,#00ffff,#ff00ff); animation:xp-fill 1.5s ease forwards; }
        .star { display:inline-block; color:#ffff00; font-size:14px; animation:float-star 2s ease-in-out infinite; }
        .pixel-btn { background:#000; border:2px solid #ff00ff; color:#ff00ff; padding:10px 20px; font-family:'Press Start 2P',monospace; font-size:9px; cursor:pointer; transition:all 0.15s steps(1); text-decoration:none; display:inline-flex; align-items:center; gap:8px; }
        .pixel-btn:hover { background:#ff00ff; color:#000; }
        .pixel-btn-cyan { border-color:#00ffff; color:#00ffff; }
        .pixel-btn-cyan:hover { background:#00ffff; color:#000; }
        .pixel-section-title { font-family:'Press Start 2P',monospace; font-size:10px; color:#ff00ff; margin-bottom:32px; letter-spacing:0.1em; }
        .achievement-card { background:#000814; border:2px solid rgba(0,255,255,0.3); padding:20px 24px; position:relative; transition:all 0.15s steps(1); }
        .achievement-card:hover { border-color:#00ffff; }
        .achievement-badge { width:40px; height:40px; border:2px solid #ffff00; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
      `}} />

      {/* Scanline overlay */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1000, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)', opacity: 0.15 }} />

      {/* Background grid */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, backgroundImage: 'linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Top header bar */}
      <div style={{ background: '#000', borderBottom: '2px solid #00ffff', padding: '10px 24px', position: 'sticky', top: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "'Press Start 2P'", fontSize: 10, color: '#00ffff' }}>PIXEL_FORGE</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ width: 12, height: 12, background: '#ff0080', border: '1px solid #ff0080' }} />
          <div style={{ width: 12, height: 12, background: '#ffff00', border: '1px solid #ffff00' }} />
          <div style={{ width: 12, height: 12, background: '#00ff00', border: '1px solid #00ff00' }} />
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        {/* Hero */}
        <header style={{ paddingTop: 72, paddingBottom: 80 }}>
          <div style={{ fontFamily: "'Press Start 2P'", fontSize: 9, color: '#ff00ff', letterSpacing: '0.15em', marginBottom: 24 }}>
            PLAYER_PROFILE LOADED<span className="cursor-blink">_</span>
          </div>

          <h1 className="neon-title" style={{ fontSize: 'clamp(24px, 5vw, 48px)', lineHeight: 1.3, marginBottom: 20 }}>
            {profile?.name || username}
          </h1>

          <div style={{ fontFamily: "'Press Start 2P'", fontSize: 9, color: '#ffff00', marginBottom: 24, letterSpacing: '0.1em' }}>
            CLASS: {(profile?.domain || 'Game Developer').toUpperCase()}
          </div>

          <p style={{ fontSize: 14, lineHeight: 1.9, color: '#8080c0', maxWidth: 560, marginBottom: 32 }}>
            {profile?.bio || 'Building worlds, one commit at a time. Indie dev. Pixel art enthusiast. Level grinding since day one.'}
          </p>

          {/* Stars rating */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 32 }}>
            {[1,2,3,4,5].map((s) => (
              <span key={s} className="star" style={{ animationDelay: `${s * 0.15}s` }}>★</span>
            ))}
            <span style={{ fontSize: 12, color: '#8080c0', marginLeft: 8, lineHeight: '20px' }}>MAX LEVEL</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {profile?.resumeUrl && (
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="pixel-btn">► VIEW RESUME</a>
            )}
            {profile?.socialLinks?.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="pixel-btn pixel-btn-cyan">
                <Github size={14} /> GITHUB
              </a>
            )}
            {profile?.socialLinks?.linkedin && (
              <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="pixel-btn pixel-btn-cyan">
                <Linkedin size={14} /> LINKEDIN
              </a>
            )}
          </div>
        </header>

        {/* Projects as achievement cards */}
        {projects && projects.length > 0 && (
          <section style={{ paddingBottom: 72 }}>
            <div className="pixel-section-title">// ACHIEVEMENTS UNLOCKED</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {projects.map((p, i) => (
                <div key={p.id} className="achievement-card" style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div className="achievement-badge">
                    <span style={{ color: '#ffff00', fontFamily: "'Press Start 2P'", fontSize: 14 }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#00ffff' }}>{p.title}</h3>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {p.liveLink && (
                          <a href={p.liveLink} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: '#ff00ff', textDecoration: 'none', border: '1px solid #ff00ff', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <ExternalLink size={12} /> PLAY
                          </a>
                        )}
                        {p.repoLink && (
                          <a href={p.repoLink} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: '#00ffff', textDecoration: 'none', border: '1px solid rgba(0,255,255,0.4)', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Github size={12} /> SRC
                          </a>
                        )}
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: '#6060a0', lineHeight: 1.7, marginBottom: 14 }}>{p.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {p.techStack?.map((t) => (
                        <span key={t} style={{ fontSize: 11, padding: '3px 10px', border: '1px solid rgba(0,255,255,0.25)', color: '#00cccc', background: 'rgba(0,255,255,0.05)', fontFamily: 'monospace' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills as XP bars */}
        {allSkills.length > 0 && (
          <section style={{ paddingBottom: 72 }}>
            <div className="pixel-section-title">// SKILL TREE</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
              {Object.entries(skills || {}).map(([cat, items]) => {
                if (!items || (items as string[]).length === 0) return null;
                return (
                  <div key={cat}>
                    <div style={{ fontFamily: "'Press Start 2P'", fontSize: 8, color: '#ff00ff', marginBottom: 16, letterSpacing: '0.1em' }}>{cat.toUpperCase()}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {(items as string[]).map((s, si) => (
                        <div key={s}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span style={{ fontSize: 12, color: '#a0a0e0' }}>{s}</span>
                            <span style={{ fontSize: 11, color: '#ffff00' }}>LVL {5 + (si % 5)}</span>
                          </div>
                          <div className="xp-bar-container">
                            <div className="xp-bar-fill" style={{ '--xp': `${60 + ((si * 17) % 40)}%` } as React.CSSProperties} />
                          </div>
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
          <div className="pixel-section-title">// SEND MESSAGE</div>
          <div style={{ maxWidth: 520 }}>
            <ContactForm username={username} template="pixel-forge" />
          </div>
        </section>
      </div>
    </div>
  );
}
