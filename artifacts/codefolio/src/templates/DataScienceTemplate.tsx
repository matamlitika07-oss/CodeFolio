import React from 'react';
import { PublicPortfolio } from '@workspace/api-client-react';
import { ContactForm } from './ContactForm';

export default function DataScienceTemplate({ data }: { data: PublicPortfolio }) {
  const { profile, projects, skills, username } = data;
  
  const projectsCount = projects?.length || 0;
  const skillsCount = Object.values(skills || {}).reduce((acc, curr) => acc + (curr?.length || 0), 0);

  return (
    <div className="min-h-screen bg-[#1e1e2e] text-gray-300 font-['IBM_Plex_Mono'] p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-dashed border-[#f97316] pb-8 mb-8 gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{profile?.name || username}</h1>
              <div className="text-[#38bdf8] text-xl">{profile?.domain || 'Data Scientist'}</div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-[#2a2a3e] border-l-2 border-[#f97316] p-4 min-w-[120px]">
                <div className="text-3xl font-bold text-white">{projectsCount}</div>
                <div className="text-sm text-gray-400">Models / Projects</div>
              </div>
              <div className="bg-[#2a2a3e] border-l-2 border-[#38bdf8] p-4 min-w-[120px]">
                <div className="text-3xl font-bold text-white">{skillsCount}</div>
                <div className="text-sm text-gray-400">Core Skills</div>
              </div>
            </div>
          </div>

          <div className="bg-[#2a2a3e] p-6 rounded-md border border-gray-700 relative mb-8">
            <div className="absolute top-0 left-0 w-full h-8 bg-black/20 rounded-t-md flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-500 ml-2">bio.py</span>
            </div>
            <div className="pt-6">
              <div className="text-[#f97316] mb-2">"""</div>
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed pl-4 border-l-2 border-gray-700">
                {profile?.bio || 'Initialize professional summary...'}
              </p>
              <div className="text-[#f97316] mt-2">"""</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            {profile?.socialLinks?.github && (
              <a href={profile.socialLinks.github} className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="text-[#38bdf8]">import</span> github
              </a>
            )}
            {profile?.socialLinks?.linkedin && (
              <a href={profile.socialLinks.linkedin} className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="text-[#38bdf8]">import</span> linkedin
              </a>
            )}
            {profile?.resumeUrl && (
              <a href={profile.resumeUrl} className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="text-[#f97316]">download</span> cv.pdf
              </a>
            )}
          </div>
        </header>

        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-8 border-b border-gray-700 pb-2 flex items-center gap-4">
            <span className="text-[#f97316]">#</span> Projects Database
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects?.map(p => (
              <div key={p.id} className="bg-[#2a2a3e] border-l-4 border-[#f97316] p-6 hover:bg-[#32324a] transition-colors">
                <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                <p className="text-sm text-gray-400 mb-6 min-h-[60px]">{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.techStack?.map(t => (
                    <span key={t} className="bg-[#38bdf8]/10 text-[#38bdf8] text-xs px-2 py-1 rounded">{t}</span>
                  ))}
                </div>
                <div className="flex gap-4 text-sm mt-auto">
                  {p.repoLink && <a href={p.repoLink} className="underline hover:text-white decoration-gray-600 underline-offset-4">Notebook / Repo</a>}
                  {p.liveLink && <a href={p.liveLink} className="underline hover:text-[#f97316] decoration-gray-600 underline-offset-4">Deployment</a>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-8 border-b border-gray-700 pb-2 flex items-center gap-4">
            <span className="text-[#38bdf8]">def</span> get_skills():
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills || {}).map(([category, items]) => {
              if (!items || items.length === 0) return null;
              return (
                <div key={category} className="border border-dashed border-gray-700 p-4">
                  <h3 className="text-[#f97316] uppercase mb-4 text-sm font-bold tracking-wider">{category}</h3>
                  <ul className="space-y-2">
                    {items.map((skill: string) => (
                      <li key={skill} className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">-</span> {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>
        
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-8 border-b border-gray-700 pb-2 flex items-center gap-4">
            <span className="text-[#f97316]">def</span> contact(request):
          </h2>
          <ContactForm username={username} template="data-science" />
        </section>
      </div>
    </div>
  );
}