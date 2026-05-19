import React from 'react';
import { PublicPortfolio } from '@workspace/api-client-react';
import { ContactForm } from './ContactForm';

export default function MinimalistTemplate({ data }: { data: PublicPortfolio }) {
  const { profile, projects, skills, username } = data;
  return (
    <div className="min-h-screen bg-white text-black font-['JetBrains_Mono'] p-8 md:p-16">
      <div className="max-w-[800px] mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl font-bold mb-2">{profile?.name || username}</h1>
          {profile?.domain && <p className="text-sm border border-black inline-block px-2 py-1 uppercase">{profile.domain}</p>}
          <p className="mt-6 text-lg leading-relaxed whitespace-pre-wrap">{profile?.bio}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm underline underline-offset-4">
            {profile?.socialLinks?.github && <a href={profile.socialLinks.github} target="_blank" rel="noreferrer">GitHub</a>}
            {profile?.socialLinks?.linkedin && <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
            {profile?.socialLinks?.twitter && <a href={profile.socialLinks.twitter} target="_blank" rel="noreferrer">Twitter</a>}
            {profile?.socialLinks?.website && <a href={profile.socialLinks.website} target="_blank" rel="noreferrer">Website</a>}
            {profile?.resumeUrl && <a href={profile.resumeUrl} target="_blank" rel="noreferrer">Resume</a>}
          </div>
        </header>

        <hr className="border-t border-[#e0e0e0] my-12" />

        <section className="mb-16">
          <h2 className="text-xl font-bold mb-8 uppercase tracking-widest">Projects</h2>
          <div className="space-y-8">
            {projects?.map(p => (
              <div key={p.id} className="border border-black p-6">
                <div className="flex justify-between items-baseline mb-4">
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <div className="flex gap-4 text-sm underline">
                    {p.repoLink && <a href={p.repoLink} target="_blank" rel="noreferrer">Repo</a>}
                    {p.liveLink && <a href={p.liveLink} target="_blank" rel="noreferrer">Live</a>}
                  </div>
                </div>
                <p className="mb-4 text-gray-800">{p.description}</p>
                {p.techStack && p.techStack.length > 0 && (
                  <p className="text-sm opacity-70">Tech: {p.techStack.join(', ')}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <hr className="border-t border-[#e0e0e0] my-12" />

        <section className="mb-16">
          <h2 className="text-xl font-bold mb-8 uppercase tracking-widest">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            {skills?.frontend && skills.frontend.length > 0 && (
              <div><strong className="block mb-2">Frontend</strong>{skills.frontend.join(', ')}</div>
            )}
            {skills?.backend && skills.backend.length > 0 && (
              <div><strong className="block mb-2">Backend</strong>{skills.backend.join(', ')}</div>
            )}
            {skills?.devops && skills.devops.length > 0 && (
              <div><strong className="block mb-2">DevOps</strong>{skills.devops.join(', ')}</div>
            )}
            {skills?.other && skills.other.length > 0 && (
              <div><strong className="block mb-2">Other</strong>{skills.other.join(', ')}</div>
            )}
          </div>
        </section>

        <hr className="border-t border-[#e0e0e0] my-12" />
        
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-8 uppercase tracking-widest">Contact</h2>
          <ContactForm username={username} template="minimalist" />
        </section>
      </div>
    </div>
  );
}
