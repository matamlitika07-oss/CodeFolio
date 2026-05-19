import React from 'react';
import { PublicPortfolio } from '@workspace/api-client-react';
import { ContactForm } from './ContactForm';

export default function GameDevTemplate({ data }: { data: PublicPortfolio }) {
  const { profile, projects, skills, username } = data;
  
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-['Press_Start_2P'] p-4 md:p-8 relative overflow-hidden"
         style={{ backgroundImage: 'radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 4px)', backgroundSize: '100px 100px', backgroundPosition: '0 0, 50px 50px' }}>
      
      <div className="max-w-4xl mx-auto relative z-10 bg-[#0d0d0d] p-8 border-4 border-[#00ffff] shadow-[8px_8px_0_0_#ff00ff]">
        <header className="text-center mb-16 pt-8">
          <h1 className="text-3xl md:text-5xl text-[#ffff00] mb-6 leading-tight drop-shadow-[4px_4px_0_#ff00ff]">
            {profile?.name || username}
          </h1>
          <div className="text-[#00ffff] mb-12 text-sm md:text-base">
            CLASS: {profile?.domain?.toUpperCase() || 'PLAYER_1'}
          </div>
          
          <div className="bg-black border-2 border-white p-6 mx-auto max-w-2xl text-left text-xs md:text-sm leading-loose">
            <span className="text-[#00ffff] mr-2">►</span>
            {profile?.bio || 'INSERT COIN TO CONTINUE...'}
            <span className="animate-pulse ml-2 text-white">_</span>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-xs">
            {profile?.socialLinks?.github && <a href={profile.socialLinks.github} className="hover:text-[#ffff00] hover:scale-110 transition-transform">GITHUB</a>}
            {profile?.socialLinks?.linkedin && <a href={profile.socialLinks.linkedin} className="hover:text-[#ffff00] hover:scale-110 transition-transform">LINKEDIN</a>}
            {profile?.resumeUrl && <a href={profile.resumeUrl} className="text-[#ff00ff] hover:text-[#ffff00] hover:scale-110 transition-transform">DOWNLOAD_SAVE_DATA</a>}
          </div>
        </header>

        <section className="mb-16">
          <h2 className="text-xl md:text-2xl text-center text-[#ff00ff] mb-12">[=== QUEST LOG ===]</h2>
          <div className="space-y-8">
            {projects?.map((p, i) => (
              <div key={p.id} className="border-2 border-white p-6 bg-black group hover:border-[#ffff00] transition-colors relative">
                {/* Pixel corners */}
                <div className="absolute top-0 left-0 w-2 h-2 bg-black -translate-x-0.5 -translate-y-0.5"></div>
                <div className="absolute top-0 right-0 w-2 h-2 bg-black translate-x-0.5 -translate-y-0.5"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-black -translate-x-0.5 translate-y-0.5"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-black translate-x-0.5 translate-y-0.5"></div>

                <div className="flex justify-between items-start mb-4 flex-col md:flex-row gap-4">
                  <h3 className="text-[#00ffff] text-lg">{i+1}. {p.title}</h3>
                  <div className="flex gap-4 text-xs">
                    {p.repoLink && <a href={p.repoLink} className="hover:text-[#ffff00]">SRC</a>}
                    {p.liveLink && <a href={p.liveLink} className="hover:text-[#ffff00]">PLAY</a>}
                  </div>
                </div>
                
                <p className="text-xs leading-relaxed mb-6 text-gray-300">{p.description}</p>
                
                <div className="flex flex-wrap gap-3">
                  {p.techStack?.map(t => (
                    <span key={t} className="text-[10px] text-[#ff00ff] bg-[#ff00ff]/20 px-2 py-1">#{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-xl md:text-2xl text-center text-[#ffff00] mb-12">[=== STATS ===]</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(skills || {}).map(([category, items]) => {
              if (!items || items.length === 0) return null;
              return (
                <div key={category}>
                  <h3 className="text-[#00ffff] text-xs mb-4 uppercase">{category}</h3>
                  <div className="space-y-4">
                    {items.map((skill: string) => (
                      <div key={skill} className="flex justify-between items-center text-[10px]">
                        <span className="w-1/3 truncate pr-2">{skill}</span>
                        <div className="w-2/3 h-3 border border-white bg-black p-0.5">
                          {/* Randomize the bar width for effect, seeded by string length to keep it stable */}
                          <div className="h-full bg-[#ff00ff]" style={{ width: `${Math.max(40, (skill.length * 7) % 100)}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
        
        <section>
          <h2 className="text-xl md:text-2xl text-center text-[#00ffff] mb-12">[=== MULTIPLAYER ===]</h2>
          <div className="max-w-md mx-auto">
            <ContactForm username={username} template="game-dev" />
          </div>
        </section>
        
        <div className="mt-16 text-center text-[10px] text-gray-500">
          PRESS START TO HIRE
        </div>
      </div>
    </div>
  );
}