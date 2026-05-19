import React from 'react';
import { PublicPortfolio } from '@workspace/api-client-react';
import { ContactForm } from './ContactForm';
import { Github, Linkedin, Twitter, ExternalLink, FolderGit2 } from 'lucide-react';

export default function FrontendProTemplate({ data }: { data: PublicPortfolio }) {
  const { profile, projects, skills, username } = data;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      {/* Background glow effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-600/20 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        
        {/* Header/Hero */}
        <header className="py-20 md:py-32 flex flex-col items-center text-center">
          {profile?.avatarUrl && (
            <img 
              src={profile.avatarUrl} 
              alt={profile.name || username} 
              className="w-24 h-24 rounded-full object-cover mb-8 ring-2 ring-white/10 ring-offset-4 ring-offset-black"
            />
          )}
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6 backdrop-blur-md">
            {profile?.domain || 'Frontend Engineer'}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            {profile?.name || username}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl font-light leading-relaxed mb-10">
            {profile?.bio || 'Building exceptional digital experiences with modern web technologies.'}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {profile?.resumeUrl && (
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                View Resume
              </a>
            )}
            <div className="flex gap-2">
              {profile?.socialLinks?.github && (
                <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="p-3 bg-white/5 border border-white/10 hover:border-white/30 rounded-full transition-all">
                  <Github size={20} />
                </a>
              )}
              {profile?.socialLinks?.linkedin && (
                <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-white/5 border border-white/10 hover:border-white/30 rounded-full transition-all">
                  <Linkedin size={20} />
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Skills Bento */}
        {skills && Object.values(skills).some(arr => arr && arr.length > 0) && (
          <section className="mb-32">
            <h2 className="text-2xl font-bold mb-8">Technical Arsenal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(skills).map(([category, items]) => {
                if (!items || items.length === 0) return null;
                return (
                  <div key={category} className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map(s => (
                        <span key={s} className="px-3 py-1 bg-white/10 rounded-lg text-sm text-gray-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="mb-32">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <FolderGit2 className="text-blue-500" /> Featured Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map(p => (
                <div key={p.id} className="group bg-white/5 border border-white/10 hover:border-blue-500/50 rounded-3xl p-8 backdrop-blur-md transition-all hover:-translate-y-1">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{p.title}</h3>
                  <p className="text-gray-400 mb-6 line-clamp-3">{p.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {p.techStack?.map(t => (
                      <span key={t} className="text-xs font-mono px-2 py-1 bg-blue-500/10 text-blue-300 rounded border border-blue-500/20">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-auto">
                    {p.liveLink && (
                      <a href={p.liveLink} target="_blank" rel="noreferrer" className="text-sm font-semibold flex items-center gap-1 hover:text-blue-400 transition-colors">
                        Live Preview <ExternalLink size={14} />
                      </a>
                    )}
                    {p.repoLink && (
                      <a href={p.repoLink} target="_blank" rel="noreferrer" className="text-sm font-semibold text-gray-500 hover:text-white transition-colors">
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Let's build together</h2>
            <p className="text-gray-400">Currently available for freelance opportunities and full-time roles.</p>
          </div>
          <ContactForm username={username} template="frontend-pro" />
        </section>

      </div>
    </div>
  );
}
