import React, { useState } from 'react';
import { useSendContact } from '@workspace/api-client-react';

export function ContactForm({ username, template }: { username: string, template: string }) {
  const sendContact = useSendContact();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      senderName: formData.get('senderName') as string,
      senderEmail: formData.get('senderEmail') as string,
      message: formData.get('message') as string,
    };
    
    setStatus('sending');
    sendContact.mutate({ username, data }, {
      onSuccess: () => {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus('idle'), 3000);
      },
      onError: () => {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    });
  };

  const getButtonText = (idle: string, sending: string, success: string, error: string = "Failed") => {
    if (status === 'sending') return sending;
    if (status === 'success') return success;
    if (status === 'error') return error;
    return idle;
  };

  // 1. minimal-universal
  if (template === 'minimal-universal' || template === 'minimalist' || template === 'student') {
    return (
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        <div className="space-y-4">
          <input required name="senderName" placeholder="Name" className="w-full bg-transparent border-b border-white/20 pb-2 outline-none focus:border-white transition-colors text-white placeholder:text-gray-600" />
          <input required type="email" name="senderEmail" placeholder="Email" className="w-full bg-transparent border-b border-white/20 pb-2 outline-none focus:border-white transition-colors text-white placeholder:text-gray-600" />
          <textarea required name="message" rows={4} placeholder="Message" className="w-full bg-transparent border-b border-white/20 pb-2 outline-none focus:border-white transition-colors text-white placeholder:text-gray-600 resize-none mt-4" />
        </div>
        <button disabled={status === 'sending'} className="w-full bg-white text-black py-3 rounded-full font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 mt-4">
          {getButtonText('Send Message', 'Sending...', 'Sent')}
        </button>
      </form>
    );
  }

  // 2. frontend-pro / creative
  if (template === 'frontend-pro' || template === 'creative') {
    return (
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
        <div className="space-y-4">
          <input required name="senderName" placeholder="Your Name" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder:text-gray-500" />
          <input required type="email" name="senderEmail" placeholder="Your Email" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder:text-gray-500" />
          <textarea required name="message" rows={4} placeholder="How can I help?" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder:text-gray-500 resize-none" />
        </div>
        <button disabled={status === 'sending'} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all disabled:opacity-50">
          {getButtonText('Shoot me a message', 'Sending...', 'Delivered!')}
        </button>
      </form>
    );
  }

  // 5. ai-matrix / data-science
  if (template === 'ai-matrix' || template === 'data-science') {
    return (
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg font-mono">
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-purple-400 mb-1">payload.sender</label>
            <input required name="senderName" className="w-full bg-black/80 border border-purple-500/30 text-purple-100 p-3 outline-none focus:border-purple-500 focus:bg-purple-900/10 transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-purple-400 mb-1">payload.replyTo</label>
            <input required type="email" name="senderEmail" className="w-full bg-black/80 border border-purple-500/30 text-purple-100 p-3 outline-none focus:border-purple-500 focus:bg-purple-900/10 transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-purple-400 mb-1">payload.body</label>
            <textarea required name="message" rows={3} className="w-full bg-black/80 border border-purple-500/30 text-purple-100 p-3 outline-none focus:border-purple-500 focus:bg-purple-900/10 transition-colors resize-none" />
          </div>
        </div>
        <button disabled={status === 'sending'} className="bg-purple-600/20 text-purple-400 border border-purple-500 px-6 py-2 hover:bg-purple-600 hover:text-white transition-all disabled:opacity-50 uppercase text-xs tracking-widest w-full">
          {getButtonText('Execute Post', 'Transmitting...', '200 OK')}
        </button>
      </form>
    );
  }

  // 6. creative-studio / corporate
  if (template === 'creative-studio' || template === 'corporate') {
    return (
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg bg-[#fdfbf7] p-8 rounded-3xl shadow-sm border border-[#e5e1d8]">
        <div className="space-y-5">
          <input required name="senderName" placeholder="Name" className="w-full bg-transparent border-b border-[#d1cdc2] pb-2 outline-none focus:border-[#ff8a65] transition-colors text-[#3d3935] placeholder:text-[#a39f96]" />
          <input required type="email" name="senderEmail" placeholder="Email" className="w-full bg-transparent border-b border-[#d1cdc2] pb-2 outline-none focus:border-[#ff8a65] transition-colors text-[#3d3935] placeholder:text-[#a39f96]" />
          <textarea required name="message" rows={4} placeholder="Tell me about your project" className="w-full bg-transparent border-b border-[#d1cdc2] pb-2 outline-none focus:border-[#ff8a65] transition-colors text-[#3d3935] placeholder:text-[#a39f96] resize-none mt-2" />
        </div>
        <button disabled={status === 'sending'} className="w-full bg-[#ff8a65] hover:bg-[#ff7a50] text-white py-4 rounded-2xl font-bold transition-colors disabled:opacity-50 mt-4 shadow-md shadow-[#ff8a65]/20">
          {getButtonText('Send Inquiry', 'Sending...', 'Thank you!')}
        </button>
      </form>
    );
  }

  // 9. pixel-forge / game-dev
  if (template === 'pixel-forge' || template === 'game-dev') {
    return (
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg bg-black border-4 border-green-500 p-6 shadow-[8px_8px_0px_0px_rgba(34,197,94,0.5)] font-mono">
        <div>
          <label className="block text-xs text-green-400 mb-2 uppercase tracking-widest">&gt; Player Name_</label>
          <input required name="senderName" className="w-full bg-black border-2 border-green-900 text-green-400 p-3 outline-none focus:border-green-500" />
        </div>
        <div>
          <label className="block text-xs text-green-400 mb-2 uppercase tracking-widest">&gt; Comms Link_</label>
          <input required type="email" name="senderEmail" className="w-full bg-black border-2 border-green-900 text-green-400 p-3 outline-none focus:border-green-500" />
        </div>
        <div>
          <label className="block text-xs text-green-400 mb-2 uppercase tracking-widest">&gt; Message Log_</label>
          <textarea required name="message" rows={4} className="w-full bg-black border-2 border-green-900 text-green-400 p-3 outline-none focus:border-green-500 resize-none" />
        </div>
        <button disabled={status === 'sending'} className="w-full bg-green-500 text-black font-bold uppercase tracking-widest py-3 hover:bg-green-400 transition-colors disabled:opacity-50 mt-2">
          {getButtonText('Press Start', 'Loading...', 'Level Cleared')}
        </button>
      </form>
    );
  }

  // Fallback / default (fullstack-nexus, backend-core, design-canvas, creative-motion)
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div className="space-y-4">
        <input required name="senderName" placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-white/30 transition-colors text-white" />
        <input required type="email" name="senderEmail" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-white/30 transition-colors text-white" />
        <textarea required name="message" rows={4} placeholder="Message" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-white/30 transition-colors text-white resize-none" />
      </div>
      <button disabled={status === 'sending'} className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50">
        {getButtonText('Send Message', 'Sending...', 'Sent')}
      </button>
    </form>
  );
}
