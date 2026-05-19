import React from 'react';
import { PublicPortfolio } from '@workspace/api-client-react';
import { ContactForm } from './ContactForm';
import { Github, Linkedin, Twitter, ExternalLink, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MinimalUniversalTemplate({ data }: { data: PublicPortfolio }) {
  const { profile, projects, skills, username } = data;
  const allSkills = [
    ...(skills?.frontend || []),
    ...(skills?.backend || []),
    ...(skills?.devops || []),
    ...(skills?.other || []),
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-[#ededed] font-sans antialiased selection:bg-white/20">
      <div className="max-w-[700px] mx-auto px-6 py-24 md:py-32">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          {profile?.domain && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-xs font-medium text-gray-400 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              {profile.domain}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            {profile?.name || username}
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-xl mb-8 font-light">
            {profile?.bio || 'Software engineer based on the internet.'}
          </p>

          <div className="flex flex-wrap gap-4 items-center text-sm font-medium">
            {profile?.resumeUrl && (
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="bg-white text-black px-6 py-2.5 rounded-full hover:bg-gray-200 transition-colors">
                View Resume
              </a>
            )}
            {profile?.socialLinks?.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                <Github size={20} />
              </a>
            )}
            {profile?.socialLinks?.linkedin && (
              <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                <Linkedin size={20} />
              </a>
            )}
            {profile?.socialLinks?.twitter && (
              <a href={profile.socialLinks.twitter} target="_blank" rel="noreferrer" className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                <Twitter size={20} />
              </a>
            )}
            {profile?.socialLinks?.website && (
              <a href={profile.socialLinks.website} target="_blank" rel="noreferrer" className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </motion.header>

        {/* Projects */}
        {projects && projects.length > 0 && (
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-24"
          >
            <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-8 border-b border-white/10 pb-4">Selected Work</h2>
            <div className="flex flex-col gap-12">
              {projects.map((p) => (
                <div key={p.id} className="group">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:underline decoration-white/30 underline-offset-4 transition-all">
                      {p.liveLink ? <a href={p.liveLink} target="_blank" rel="noreferrer">{p.title}</a> : p.title}
                    </h3>
                    <div className="flex gap-3 text-sm">
                      {p.repoLink && <a href={p.repoLink} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">Source</a>}
                      {p.liveLink && <a href={p.liveLink} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors flex items-center gap-1">Live <ExternalLink size={12} /></a>}
                    </div>
                  </div>
                  <p className="text-gray-400 mb-4 leading-relaxed font-light">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.techStack?.map(t => (
                      <span key={t} className="text-xs px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-gray-400 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Skills */}
        {allSkills.length > 0 && (
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-24"
          >
            <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-8 border-b border-white/10 pb-4">Toolkit</h2>
            <div className="flex flex-wrap gap-2">
              {allSkills.map(s => (
                <span key={s} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 font-medium">
                  {s}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {/* Contact */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-8 border-b border-white/10 pb-4">Contact</h2>
          <ContactForm username={username} template="minimal-universal" />
        </motion.section>

      </div>
    </div>
  );
}
