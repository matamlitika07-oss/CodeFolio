import React from 'react';
import { PublicPortfolio } from '@workspace/api-client-react';
import { ContactForm } from './ContactForm';

export default function CreativeTemplate({ data }: { data: PublicPortfolio }) {
  const { profile, projects, skills, username } = data;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffb3c1] via-[#c8b6ff] to-[#b5ead7] p-6 md:p-12 text-gray-800 font-['Nunito'] overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-50">
        <div className="absolute w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob top-0 left-0"></div>
        <div className="absolute w-96 h-96 bg-pink-300 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob animation-delay-2000 top-0 right-0"></div>
        <div className="absolute w-96 h-96 bg-purple-300 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob animation-delay-4000 bottom-0 left-20"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex flex-col items-center text-center mb-24 pt-10">
          {profile?.avatarUrl ? (
            <img src={profile.avatarUrl} alt={profile.name || username} className="w-40 h-40 rounded-full object-cover shadow-[0_20px_50px_rgba(8,_112,_184,_0.3)] mb-8 border-4 border-white/50 animate-bounce-slow" style={{ animationDuration: '6s' }} />
          ) : (
            <div className="w-40 h-40 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center text-6xl font-['Pacifico'] text-purple-600 shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] mb-8 border-4 border-white/50 animate-bounce-slow" style={{ animationDuration: '6s' }}>
              {(profile?.name || username).charAt(0).toUpperCase()}
            </div>
          )}
          
          <h1 className="text-5xl md:text-7xl font-['Pacifico'] text-gray-900 mb-4 drop-shadow-sm">{profile?.name || username}</h1>
          <div className="bg-white/30 backdrop-blur-sm px-6 py-2 rounded-full font-bold tracking-widest uppercase text-sm mb-8 text-gray-800 border border-white/40 shadow-sm">
            {profile?.domain || 'Creative Technologist'}
          </div>
          
          <p className="max-w-2xl text-xl leading-relaxed text-gray-800/90 font-medium">
            {profile?.bio}
          </p>

          <div className="mt-10 flex gap-6">
            {profile?.socialLinks?.github && <a href={profile.socialLinks.github} className="w-12 h-12 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-sm border border-white/50">GH</a>}
            {profile?.socialLinks?.linkedin && <a href={profile.socialLinks.linkedin} className="w-12 h-12 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-sm border border-white/50">IN</a>}
            {profile?.resumeUrl && <a href={profile.resumeUrl} className="px-6 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 hover:scale-105 transition-all shadow-lg font-bold">Resume</a>}
          </div>
        </header>

        <section className="mb-24">
          <h2 className="text-4xl font-['Pacifico'] text-center mb-12 text-gray-900 drop-shadow-sm">Selected Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((p, i) => (
              <div key={p.id} className={`bg-white/40 backdrop-blur-lg rounded-[24px] p-8 border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] hover:-translate-y-2 transition-transform duration-300 ${i % 3 === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">{p.title}</h3>
                  <div className="flex gap-2">
                    {p.repoLink && <a href={p.repoLink} className="text-xs font-bold uppercase tracking-wider bg-white/60 px-3 py-1 rounded-full hover:bg-white transition-colors">Code</a>}
                    {p.liveLink && <a href={p.liveLink} className="text-xs font-bold uppercase tracking-wider bg-gray-900 text-white px-3 py-1 rounded-full hover:bg-gray-800 transition-colors">Live</a>}
                  </div>
                </div>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.techStack?.map(t => (
                    <span key={t} className="bg-white/50 text-gray-800 text-sm px-4 py-1 rounded-full font-semibold border border-white/30">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-4xl font-['Pacifico'] text-center mb-12 text-gray-900 drop-shadow-sm">Capabilities</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {Object.entries(skills || {}).map(([category, items]) => {
              if (!items || items.length === 0) return null;
              return items.map((skill: string, i: number) => {
                const rotation = i % 2 === 0 ? 'rotate-[-2deg]' : 'rotate-[2deg]';
                const bg = ['bg-[#ffb3c1]', 'bg-[#c8b6ff]', 'bg-[#b5ead7]'][i % 3];
                return (
                  <div key={`${category}-${skill}`} className={`${bg} ${rotation} px-6 py-3 rounded-full text-gray-900 font-bold text-lg shadow-sm border border-white/40 hover:rotate-0 transition-transform cursor-default backdrop-blur-sm bg-opacity-80`}>
                    {skill}
                  </div>
                )
              });
            })}
          </div>
        </section>
        
        <section className="mb-24">
          <h2 className="text-4xl font-['Pacifico'] text-center mb-12 text-gray-900 drop-shadow-sm">Let's Talk</h2>
          <div className="flex justify-center">
            <ContactForm username={username} template="creative" />
          </div>
        </section>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}} />
    </div>
  );
}