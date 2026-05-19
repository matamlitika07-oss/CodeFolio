import React from 'react';
import { PublicPortfolio } from '@workspace/api-client-react';
import { ContactForm } from './ContactForm';

export default function StudentTemplate({ data }: { data: PublicPortfolio }) {
  const { profile, projects, skills, username } = data;
  const initial = (profile?.name || username || 'U').charAt(0).toUpperCase();
  const totalSkills = Object.values(skills || {}).flat().length;
  const frontendSkills = skills?.frontend || [];
  const backendSkills = skills?.backend || [];
  const certifications = skills?.other || [];

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: "'Inter', system-ui, sans-serif", color: '#111827' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .st-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); transform: translateY(-2px); }
        .st-card { transition: all 0.2s; }
        .st-link:hover { color: #1d4ed8; text-decoration: underline; }
      `}} />

      {/* Top header strip */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)', padding: '56px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: '30%', width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '3px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 28, fontWeight: 800, flexShrink: 0 }}>
            {initial}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', marginBottom: 6 }}>
              {profile?.name || username}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 600, padding: '4px 14px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.2)' }}>
                {profile?.domain || 'Computer Science Student'}
              </span>
              {profile?.socialLinks?.github && <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, textDecoration: 'none' }}>GitHub ↗</a>}
              {profile?.socialLinks?.linkedin && <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, textDecoration: 'none' }}>LinkedIn ↗</a>}
            </div>
          </div>
          {profile?.resumeUrl && (
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" style={{ background: 'white', color: '#1d4ed8', fontSize: 14, fontWeight: 700, padding: '12px 24px', borderRadius: 10, textDecoration: 'none', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
              Download CV
            </a>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '-32px auto 0', padding: '0 24px 80px', position: 'relative' }}>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
          {[
            { label: 'Projects Built', value: projects?.length || 0, color: '#1d4ed8', bg: '#eff6ff' },
            { label: 'Skills & Tools', value: totalSkills, color: '#7c3aed', bg: '#f5f3ff' },
            { label: 'Frontend Stack', value: frontendSkills.length, color: '#059669', bg: '#ecfdf5' },
            { label: 'Backend Stack', value: backendSkills.length, color: '#d97706', bg: '#fffbeb' },
          ].map(s => (
            <div key={s.label} className="st-card" style={{ flex: '1 1 130px', background: s.bg, border: `1px solid ${s.color}20`, borderRadius: 14, padding: '18px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#6b7280', fontWeight: 500, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* About */}
        {profile?.bio && (
          <div className="st-card" style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 14, padding: '24px 28px', marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1d4ed8', marginBottom: 12 }}>About Me</h2>
            <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.75 }}>{profile.bio}</p>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div className="st-card" style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ padding: '18px 28px', borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
                <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1d4ed8' }}>Projects</h2>
              </div>
              <div>
                {projects.map((p, i) => (
                  <div key={p.id} style={{ padding: '22px 28px', borderBottom: i < projects.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 8 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>{p.title}</h3>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {p.repoLink && <a href={p.repoLink} target="_blank" rel="noreferrer" style={{ fontSize: 12, fontWeight: 600, color: '#1d4ed8', textDecoration: 'none', border: '1px solid #bfdbfe', borderRadius: 6, padding: '4px 10px' }}>GitHub</a>}
                        {p.liveLink && <a href={p.liveLink} target="_blank" rel="noreferrer" style={{ fontSize: 12, fontWeight: 600, color: 'white', textDecoration: 'none', background: '#1d4ed8', borderRadius: 6, padding: '4px 10px' }}>Live ↗</a>}
                      </div>
                    </div>
                    <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.65, marginBottom: 12 }}>{p.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {p.techStack?.map(t => (
                        <span key={t} style={{ fontSize: 12, fontWeight: 500, padding: '3px 10px', borderRadius: 6, background: '#eff6ff', color: '#1d4ed8' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 20 }}>
          {/* Tech skills */}
          {(frontendSkills.length > 0 || backendSkills.length > 0) && (
            <div className="st-card" style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
                <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1d4ed8' }}>Technical Skills</h2>
              </div>
              <div style={{ padding: '20px 24px' }}>
                {[
                  { label: 'Frontend', items: frontendSkills, color: '#3b82f6' },
                  { label: 'Backend', items: backendSkills, color: '#8b5cf6' },
                  { label: 'DevOps', items: skills?.devops || [], color: '#10b981' },
                ].filter(g => g.items.length > 0).map(g => (
                  <div key={g.label} style={{ marginBottom: 16 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: g.color, marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{g.label}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {g.items.map((s: string) => (
                        <span key={s} style={{ fontSize: 12, padding: '3px 10px', borderRadius: 6, background: `${g.color}12`, color: '#374151', fontWeight: 500 }}>{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="st-card" style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
                <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#059669' }}>Achievements & Certs</h2>
              </div>
              <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {certifications.map((cert: string) => (
                  <div key={cert} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 14 }}>🏆</div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contact */}
        <div className="st-card" style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ padding: '16px 28px', borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1d4ed8' }}>Contact Me</h2>
          </div>
          <div style={{ padding: '28px' }}>
            <ContactForm username={username} template="student" />
          </div>
        </div>
      </div>
    </div>
  );
}
