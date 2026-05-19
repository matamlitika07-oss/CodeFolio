import React from 'react';
import { PublicPortfolio } from '@workspace/api-client-react';
import { ContactForm } from './ContactForm';

export default function CorporateTemplate({ data }: { data: PublicPortfolio }) {
  const { profile, projects, skills, username } = data;
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-gray-900 font-['Lato']">
      <aside className="w-full md:w-80 bg-[#1a2744] text-white p-10 flex flex-col">
        <div className="text-center mb-10">
          {profile?.avatarUrl ? (
            <img src={profile.avatarUrl} alt={profile.name || username} className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-[#f0b429]" />
          ) : (
            <div className="w-32 h-32 rounded-full mx-auto mb-6 bg-[#f0b429] text-[#1a2744] flex items-center justify-center text-4xl font-bold font-['Playfair_Display']">
              {(profile?.name || username).charAt(0).toUpperCase()}
            </div>
          )}
          <h1 className="text-2xl font-bold font-['Playfair_Display'] mb-2">{profile?.name || username}</h1>
          <p className="text-[#f0b429] uppercase tracking-wider text-sm font-semibold">{profile?.domain}</p>
        </div>
        
        <div className="space-y-4 text-sm mb-10 opacity-90">
          {profile?.socialLinks?.linkedin && <a href={profile.socialLinks.linkedin} className="block hover:text-[#f0b429]">LinkedIn Profile</a>}
          {profile?.socialLinks?.github && <a href={profile.socialLinks.github} className="block hover:text-[#f0b429]">GitHub Repository</a>}
          {profile?.socialLinks?.website && <a href={profile.socialLinks.website} className="block hover:text-[#f0b429]">Personal Website</a>}
          {profile?.resumeUrl && <a href={profile.resumeUrl} className="block text-[#f0b429] font-bold mt-6 underline underline-offset-4">Download Resume</a>}
        </div>

        <div className="mt-auto">
          <h3 className="font-['Playfair_Display'] text-xl mb-4 border-b border-white/20 pb-2">Core Competencies</h3>
          <div className="flex flex-wrap gap-2">
            {[...(skills?.frontend || []), ...(skills?.backend || []), ...(skills?.devops || [])].slice(0, 10).map(s => (
              <span key={s} className="bg-white/10 px-2 py-1 text-xs rounded">{s}</span>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 p-10 md:p-20 max-w-4xl">
        <section className="mb-16">
          <h2 className="text-3xl font-bold font-['Playfair_Display'] text-[#1a2744] mb-6">Professional Summary</h2>
          <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-wrap">{profile?.bio}</p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold font-['Playfair_Display'] text-[#1a2744] mb-8">Selected Projects</h2>
          <div className="space-y-8">
            {projects?.map(p => (
              <div key={p.id} className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-[#f0b429]">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-[#1a2744]">{p.title}</h3>
                  <div className="flex gap-3">
                    {p.repoLink && <a href={p.repoLink} className="text-sm font-semibold text-gray-500 hover:text-[#1a2744]">Source Code</a>}
                    {p.liveLink && <a href={p.liveLink} className="text-sm font-semibold text-[#f0b429] hover:text-[#1a2744]">View Live →</a>}
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.techStack?.map(t => (
                    <span key={t} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-3xl font-bold font-['Playfair_Display'] text-[#1a2744] mb-6">Contact</h2>
          <ContactForm username={username} template="corporate" />
        </section>
      </main>
    </div>
  );
}