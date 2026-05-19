import React from 'react';
import { ContactForm } from './ContactForm';
import { Github, Linkedin, Twitter, ExternalLink, FolderGit2, Briefcase, Award, Code2, Terminal } from 'lucide-react';

export default function FrontendProTemplate({ data }: { data: any }) {
  const { profile, projects, skills, username } = data;
  const experience: any[] = profile?.experience || [];
  const certifications: any[] = profile?.certifications || [];
  const codingProfiles = profile?.codingProfiles;

  const hasCodingProfiles = codingProfiles && Object.values(codingProfiles).some(Boolean);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      {/* Background glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-600/20 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">

        {/* Hero */}
        <header className="py-20 md:py-32 flex flex-col items-center text-center">
          {profile?.avatarUrl && (
            <img src={profile.avatarUrl} alt={profile.name || username}
              className="w-24 h-24 rounded-full object-cover mb-8 ring-2 ring-white/10 ring-offset-4 ring-offset-black" />
          )}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6 backdrop-blur-md">
            {profile?.role || profile?.domain || 'Developer'}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            {profile?.name || username}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl font-light leading-relaxed mb-10">
            {profile?.bio || 'Building exceptional digital experiences with modern technologies.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {profile?.resumeUrl && (
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                View Resume
              </a>
            )}
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
            {profile?.socialLinks?.twitter && (
              <a href={profile.socialLinks.twitter} target="_blank" rel="noreferrer" className="p-3 bg-white/5 border border-white/10 hover:border-white/30 rounded-full transition-all">
                <Twitter size={20} />
              </a>
            )}
          </div>
        </header>

        {/* Skills */}
        {skills && Object.values(skills).some((arr: any) => arr?.length > 0) && (
          <section className="mb-32">
            <h2 className="text-2xl font-bold mb-8">Technical Arsenal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(skills).map(([category, items]: any) => {
                if (!items || items.length === 0) return null;
                return (
                  <div key={category} className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((s: string) => (
                        <span key={s} className="px-3 py-1 bg-white/10 rounded-lg text-sm text-gray-200">{s}</span>
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
              <FolderGit2 className="text-blue-500" /> Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((p: any) => (
                <div key={p.id} className="group bg-white/5 border border-white/10 hover:border-blue-500/50 rounded-3xl p-8 backdrop-blur-md transition-all hover:-translate-y-1">
                  {p.screenshotUrl && (
                    <img src={p.screenshotUrl} alt={p.title} className="w-full h-40 object-cover rounded-xl mb-6 opacity-80" />
                  )}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{p.title}</h3>
                  <p className="text-gray-400 mb-6 line-clamp-3 text-sm leading-relaxed">{p.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.techStack?.map((t: string) => (
                      <span key={t} className="text-xs font-mono px-2 py-1 bg-blue-500/10 text-blue-300 rounded border border-blue-500/20">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {p.liveLink && (
                      <a href={p.liveLink} target="_blank" rel="noreferrer" className="text-sm font-semibold flex items-center gap-1 hover:text-blue-400 transition-colors">
                        Live Demo <ExternalLink size={13} />
                      </a>
                    )}
                    {p.repoLink && (
                      <a href={p.repoLink} target="_blank" rel="noreferrer" className="text-sm font-semibold flex items-center gap-1 text-gray-500 hover:text-white transition-colors">
                        <Github size={13} /> Source
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Timeline */}
        {experience.length > 0 && (
          <section className="mb-32">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Briefcase className="text-blue-500" /> Experience
            </h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 to-transparent" />
              <div className="space-y-8">
                {experience.map((exp: any, i: number) => (
                  <div key={exp.id || i} className="pl-12 relative">
                    <div className="absolute left-[13px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-2 ring-blue-500/20" />
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <h3 className="font-bold text-lg">{exp.role}</h3>
                          <p className="text-blue-400 font-medium text-sm">{exp.company}</p>
                        </div>
                        {exp.duration && (
                          <span className="text-xs font-mono text-gray-500 bg-white/5 px-3 py-1 rounded-full shrink-0">{exp.duration}</span>
                        )}
                      </div>
                      {exp.description && (
                        <p className="text-gray-400 mt-4 text-sm leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="mb-32">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Award className="text-blue-500" /> Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert: any, i: number) => (
                <div key={cert.id || i} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center shrink-0">
                    <Award size={18} className="text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm mb-1">{cert.name}</h3>
                    {cert.issuer && <p className="text-xs text-gray-500">{cert.issuer}{cert.year ? ` · ${cert.year}` : ''}</p>}
                    {cert.link && (
                      <a href={cert.link} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:text-blue-300 mt-1 inline-flex items-center gap-1">
                        Verify <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Coding Profiles */}
        {hasCodingProfiles && (
          <section className="mb-32">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Terminal className="text-blue-500" /> Coding Profiles
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {codingProfiles?.leetcode && (
                <a href={codingProfiles.leetcode} target="_blank" rel="noreferrer" className="bg-white/5 border border-white/10 hover:border-yellow-500/40 rounded-2xl p-5 text-center group transition-all">
                  <div className="text-2xl mb-2">🧩</div>
                  <p className="font-semibold text-sm group-hover:text-yellow-400 transition-colors">LeetCode</p>
                </a>
              )}
              {codingProfiles?.hackerrank && (
                <a href={codingProfiles.hackerrank} target="_blank" rel="noreferrer" className="bg-white/5 border border-white/10 hover:border-green-500/40 rounded-2xl p-5 text-center group transition-all">
                  <div className="text-2xl mb-2">⚡</div>
                  <p className="font-semibold text-sm group-hover:text-green-400 transition-colors">HackerRank</p>
                </a>
              )}
              {codingProfiles?.codeforces && (
                <a href={codingProfiles.codeforces} target="_blank" rel="noreferrer" className="bg-white/5 border border-white/10 hover:border-blue-500/40 rounded-2xl p-5 text-center group transition-all">
                  <div className="text-2xl mb-2">🏆</div>
                  <p className="font-semibold text-sm group-hover:text-blue-400 transition-colors">Codeforces</p>
                </a>
              )}
              {codingProfiles?.kaggle && (
                <a href={codingProfiles.kaggle} target="_blank" rel="noreferrer" className="bg-white/5 border border-white/10 hover:border-cyan-500/40 rounded-2xl p-5 text-center group transition-all">
                  <div className="text-2xl mb-2">📊</div>
                  <p className="font-semibold text-sm group-hover:text-cyan-400 transition-colors">Kaggle</p>
                </a>
              )}
            </div>
          </section>
        )}

        {/* Contact */}
        <section className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Let's build together</h2>
            <p className="text-gray-400">Open to freelance, collaborations, and full-time roles.</p>
          </div>
          <ContactForm username={username} template="frontend-pro" />
        </section>
      </div>
    </div>
  );
}
