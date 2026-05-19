import React from 'react';
import { PublicPortfolio } from '@workspace/api-client-react';
import { ContactForm } from './ContactForm';
import { Github, Linkedin, ExternalLink, Terminal, Server, Layout, Database } from 'lucide-react';

export default function FullStackNexusTemplate({ data }: { data: PublicPortfolio }) {
  const { profile, projects, skills, username } = data;

  return (
    <div className="min-h-screen bg-[#0b0f19] text-[#e2e8f0] font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Top Nav/Header */}
        <nav className="flex justify-between items-center mb-24 border-b border-indigo-500/20 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              {(profile?.name || username).charAt(0).toUpperCase()}
            </div>
            <span className="font-bold text-lg">{profile?.name || username}</span>
          </div>
          <div className="flex gap-4">
            {profile?.socialLinks?.github && <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white"><Github size={20} /></a>}
            {profile?.socialLinks?.linkedin && <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white"><Linkedin size={20} /></a>}
          </div>
        </nav>

        {/* Hero Dashboard Style */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {/* Main Hero Card */}
          <div className="lg:col-span-2 bg-[#131b2f] border border-indigo-500/20 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="inline-block px-3 py-1 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6">
              {profile?.domain || 'Full Stack Engineer'}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">
              Architecting scalable <br/><span className="text-indigo-400">systems & interfaces.</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-lg mb-8">
              {profile?.bio || 'Bridging the gap between robust backend infrastructure and seamless user experiences.'}
            </p>
            {profile?.resumeUrl && (
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-colors">
                Download Resume
              </a>
            )}
          </div>

          {/* Quick Stats/Skills Card */}
          <div className="bg-[#131b2f] border border-indigo-500/20 rounded-2xl p-6 flex flex-col justify-between">
            <h3 className="font-semibold text-gray-400 uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
              <Terminal size={14} /> Core Stack
            </h3>
            <div className="space-y-4 flex-1">
              <div>
                <div className="flex justify-between text-sm mb-1"><span className="text-gray-300">Frontend</span><Layout size={14} className="text-indigo-400"/></div>
                <div className="flex flex-wrap gap-1">
                  {skills?.frontend?.slice(0,4).map(s => <span key={s} className="text-xs bg-[#0b0f19] px-2 py-1 rounded text-indigo-200">{s}</span>)}
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1"><span className="text-gray-300">Backend</span><Server size={14} className="text-purple-400"/></div>
                <div className="flex flex-wrap gap-1">
                  {skills?.backend?.slice(0,4).map(s => <span key={s} className="text-xs bg-[#0b0f19] px-2 py-1 rounded text-purple-200">{s}</span>)}
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1"><span className="text-gray-300">Database/DevOps</span><Database size={14} className="text-emerald-400"/></div>
                <div className="flex flex-wrap gap-1">
                  {skills?.devops?.slice(0,4).map(s => <span key={s} className="text-xs bg-[#0b0f19] px-2 py-1 rounded text-emerald-200">{s}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <h3 className="font-semibold text-gray-400 uppercase tracking-widest text-sm mb-6 border-b border-white/5 pb-2">Shipped Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {projects?.map(p => (
            <div key={p.id} className="bg-[#131b2f] border border-indigo-500/10 hover:border-indigo-500/40 transition-colors rounded-xl p-6 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-bold text-white">{p.title}</h4>
                <div className="flex gap-2">
                  {p.repoLink && <a href={p.repoLink} target="_blank" rel="noreferrer" className="p-1.5 bg-[#0b0f19] rounded text-gray-400 hover:text-white"><Github size={16} /></a>}
                  {p.liveLink && <a href={p.liveLink} target="_blank" rel="noreferrer" className="p-1.5 bg-indigo-500/20 rounded text-indigo-400 hover:bg-indigo-500 hover:text-white"><ExternalLink size={16} /></a>}
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-6 flex-1">{p.description}</p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {p.techStack?.map(t => (
                  <span key={t} className="text-xs px-2 py-1 bg-[#0b0f19] rounded-md text-gray-300 font-mono border border-white/5">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-[#131b2f] border border-indigo-500/20 rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-white mb-4">Open for collaboration.</h3>
            <p className="text-gray-400 mb-8">Looking for a full-stack engineer to build your next product? Drop a message and let's discuss architecture and timelines.</p>
          </div>
          <div className="flex-1 w-full">
            <ContactForm username={username} template="fullstack-nexus" />
          </div>
        </div>

      </div>
    </div>
  );
}
