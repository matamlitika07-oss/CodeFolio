import { useState, useCallback } from 'react';
import { PublicPortfolio } from '@workspace/api-client-react';
import { ContactForm } from './ContactForm';
import { Github, ExternalLink, Linkedin } from 'lucide-react';

export default function CreativeMotionTemplate({ data }: { data: PublicPortfolio }) {
  const { profile, projects, skills, username } = data;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const allSkills = [
    ...(skills?.frontend || []),
    ...(skills?.backend || []),
    ...(skills?.devops || []),
    ...(skills?.other || []),
  ];

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 30,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 30,
    });
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#050308', color: '#e8e3f0', fontFamily: "'Inter', system-ui, sans-serif", overflowX: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        @keyframes drift1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(60px,-80px) scale(1.1)} 66%{transform:translate(-40px,40px) scale(0.95)} }
        @keyframes drift2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-50px,70px) scale(1.08)} 66%{transform:translate(40px,-50px) scale(0.92)} }
        @keyframes drift3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,60px) scale(1.05)} }
        @keyframes reveal { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        .cm-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; transition: all 0.4s cubic-bezier(0.4,0,0.2,1); }
        .cm-card:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.15); transform: translateY(-4px); box-shadow: 0 24px 60px rgba(0,0,0,0.5); }
        .section-label { font-size: 10px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 40px; }
        .skill-item { padding: 10px 20px; border-radius: 999px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); font-size: 13px; color: rgba(232,227,240,0.7); transition: all 0.2s; }
        .skill-item:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); color: #e8e3f0; }
      `}} />

      {/* Cinematic background */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-15%', left: '-5%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,60,220,0.12) 0%, transparent 65%)', animation: 'drift1 15s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '30%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(60,20,180,0.1) 0%, transparent 65%)', animation: 'drift2 18s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '30%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,60,120,0.08) 0%, transparent 65%)', animation: 'drift3 12s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(120,60,220,0.05) 0%, transparent 50%)' }} />
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        {/* Hero — mouse reactive */}
        <header
          onMouseMove={handleMouseMove}
          style={{ paddingTop: 100, paddingBottom: 100, cursor: 'default' }}>
          
          <div style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 24, fontWeight: 500 }}>
            {profile?.domain || 'Creative Developer'}
          </div>

          <h1 style={{
            fontSize: 'clamp(48px, 9vw, 96px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: '#f5f2ff',
            marginBottom: 32,
            transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.1}px)`,
            transition: 'transform 0.1s ease-out',
            userSelect: 'none',
          }}>
            {profile?.name || username}
          </h1>

          <p style={{ fontSize: 18, lineHeight: 1.8, color: 'rgba(232,227,240,0.55)', maxWidth: 520, marginBottom: 48 }}>
            {profile?.bio || 'Creating immersive digital experiences through code, motion, and interaction.'}
          </p>

          {/* Floating cards reactive to mouse */}
          <div style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.03}px)`,
            transition: 'transform 0.15s ease-out',
          }}>
            {profile?.resumeUrl && (
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" style={{ padding: '12px 28px', borderRadius: 12, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#e8e3f0', fontWeight: 600, fontSize: 14, textDecoration: 'none', backdropFilter: 'blur(10px)' }}>View Work</a>
            )}
            {profile?.socialLinks?.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" style={{ padding: '12px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(232,227,240,0.6)', fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Github size={16} />
              </a>
            )}
            {profile?.socialLinks?.linkedin && (
              <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" style={{ padding: '12px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(232,227,240,0.6)', fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Linkedin size={16} />
              </a>
            )}
          </div>
        </header>

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section style={{ paddingBottom: 80 }}>
            <div className="section-label">Selected Experiments</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {projects.map((p, i) => (
                <div key={p.id} className="cm-card" style={{ padding: '32px 36px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
                    <div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontWeight: 600, marginBottom: 10, letterSpacing: '0.12em' }}>
                        {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                      </div>
                      <h3 style={{ fontSize: 22, fontWeight: 700, color: '#f5f2ff' }}>{p.title}</h3>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      {p.liveLink && (
                        <a href={p.liveLink} target="_blank" rel="noreferrer" style={{ padding: '8px 18px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(232,227,240,0.7)', fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <ExternalLink size={13} /> View
                        </a>
                      )}
                      {p.repoLink && (
                        <a href={p.repoLink} target="_blank" rel="noreferrer" style={{ padding: '8px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(232,227,240,0.4)', fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Github size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p style={{ fontSize: 15, color: 'rgba(232,227,240,0.5)', lineHeight: 1.7, marginBottom: 20 }}>{p.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {p.techStack?.map((t) => (
                      <span key={t} style={{ fontSize: 12, padding: '4px 12px', borderRadius: 6, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(232,227,240,0.55)' }}>{t}</span>
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
            <div className="section-label">Toolkit</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {allSkills.map((s) => (
                <span key={s} className="skill-item">{s}</span>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section style={{ paddingBottom: 100 }}>
          <div className="section-label">Let's Collaborate</div>
          <div style={{ maxWidth: 520 }}>
            <ContactForm username={username} template="creative-motion" />
          </div>
        </section>
      </div>
    </div>
  );
}
