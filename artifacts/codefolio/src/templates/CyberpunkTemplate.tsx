import React from 'react';
import { PublicPortfolio } from '@workspace/api-client-react';
import { ContactForm } from './ContactForm';

export default function CyberpunkTemplate({ data }: { data: PublicPortfolio }) {
  const { profile, projects, skills, username } = data;
  
  return (
    <div 
      className="min-h-screen bg-[#0a0a0a] text-[#00ff41] font-['Share_Tech_Mono'] p-6 md:p-12 relative overflow-x-hidden"
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.05) 2px, rgba(0, 255, 65, 0.05) 4px)'
      }}
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <header className="mb-20 border-b border-[#00ff41]/30 pb-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 uppercase tracking-tighter animate-pulse drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]">
            {profile?.name || username}
          </h1>
          <div className="text-xl text-[#ff0080] mb-6 drop-shadow-[0_0_5px_rgba(255,0,128,0.8)]">
            {">"} {profile?.domain || 'SYS_ADMIN'}
          </div>
          <p className="text-lg opacity-90 max-w-2xl border-l-2 border-[#ff0080] pl-4 whitespace-pre-wrap">
            {profile?.bio || 'NO DATA FOUND.'}
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4">
            {profile?.socialLinks?.github && <a href={profile.socialLinks.github} className="px-4 py-2 border border-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors">GITHUB</a>}
            {profile?.socialLinks?.linkedin && <a href={profile.socialLinks.linkedin} className="px-4 py-2 border border-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors">LINKEDIN</a>}
            {profile?.socialLinks?.twitter && <a href={profile.socialLinks.twitter} className="px-4 py-2 border border-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors">TWITTER</a>}
            {profile?.resumeUrl && <a href={profile.resumeUrl} className="px-4 py-2 border border-[#ff0080] text-[#ff0080] hover:bg-[#ff0080] hover:text-black transition-colors shadow-[0_0_10px_rgba(255,0,128,0.5)]">DECRYPT_RESUME</a>}
          </div>
        </header>

        <section className="mb-20">
          <h2 className="text-3xl mb-10">{">"} EXECUTABLE_PROJECTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects?.map((p) => (
              <div key={p.id} className="border border-[#00ff41] p-6 bg-black/50 hover:shadow-[0_0_15px_rgba(255,0,128,0.5)] hover:border-[#ff0080] transition-all group">
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#ff0080] transition-colors">{p.title}</h3>
                <p className="mb-6 opacity-80 h-20 overflow-y-auto">{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.techStack?.map(t => (
                    <span key={t} className="text-xs px-2 py-1 bg-[#00ff41]/20 border border-[#00ff41]/50">{t}</span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {p.repoLink && <a href={p.repoLink} className="text-sm underline hover:text-white">[SRC]</a>}
                  {p.liveLink && <a href={p.liveLink} className="text-sm underline hover:text-white">[RUN]</a>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl mb-10">{">"} LOADED_MODULES (SKILLS)</h2>
          <div className="space-y-6">
            {Object.entries(skills || {}).map(([category, items]) => {
              if (!items || items.length === 0) return null;
              return (
                <div key={category} className="border border-[#00ff41]/30 p-4">
                  <div className="uppercase text-[#ff0080] mb-3">[{category}]</div>
                  <div className="flex flex-wrap gap-3">
                    {items.map((skill: string) => (
                      <span key={skill} className="px-3 py-1 rounded-full border border-[#00ff41] shadow-[0_0_5px_rgba(0,255,65,0.5)] bg-black">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
        
        <section className="mb-20">
          <h2 className="text-3xl mb-10">{">"} INIT_CONTACT</h2>
          <ContactForm username={username} template="cyberpunk" />
        </section>
      </div>
    </div>
  );
}