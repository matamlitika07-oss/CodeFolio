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

  if (template === 'minimalist') {
    return (
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block text-sm mb-1 uppercase">Name</label>
          <input required name="senderName" className="w-full border border-black p-2 outline-none focus:ring-1 focus:ring-black" />
        </div>
        <div>
          <label className="block text-sm mb-1 uppercase">Email</label>
          <input required type="email" name="senderEmail" className="w-full border border-black p-2 outline-none focus:ring-1 focus:ring-black" />
        </div>
        <div>
          <label className="block text-sm mb-1 uppercase">Message</label>
          <textarea required name="message" rows={4} className="w-full border border-black p-2 outline-none focus:ring-1 focus:ring-black" />
        </div>
        <button disabled={status === 'sending'} className="bg-black text-white px-6 py-2 uppercase tracking-widest text-sm hover:bg-gray-800 disabled:opacity-50">
          {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent' : 'Send Message'}
        </button>
      </form>
    );
  }

  if (template === 'cyberpunk') {
    return (
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg bg-black/50 border border-[#00ff41] p-6 shadow-[0_0_15px_rgba(0,255,65,0.2)]">
        <div>
          <label className="block text-sm mb-1 text-[#ff0080]">NAME_INPUT</label>
          <input required name="senderName" className="w-full bg-black border border-[#00ff41]/50 text-[#00ff41] p-2 outline-none focus:border-[#ff0080] focus:shadow-[0_0_5px_rgba(255,0,128,0.5)]" />
        </div>
        <div>
          <label className="block text-sm mb-1 text-[#ff0080]">EMAIL_INPUT</label>
          <input required type="email" name="senderEmail" className="w-full bg-black border border-[#00ff41]/50 text-[#00ff41] p-2 outline-none focus:border-[#ff0080] focus:shadow-[0_0_5px_rgba(255,0,128,0.5)]" />
        </div>
        <div>
          <label className="block text-sm mb-1 text-[#ff0080]">MESSAGE_PAYLOAD</label>
          <textarea required name="message" rows={4} className="w-full bg-black border border-[#00ff41]/50 text-[#00ff41] p-2 outline-none focus:border-[#ff0080] focus:shadow-[0_0_5px_rgba(255,0,128,0.5)]" />
        </div>
        <button disabled={status === 'sending'} className="bg-transparent border border-[#00ff41] text-[#00ff41] px-6 py-2 hover:bg-[#00ff41] hover:text-black transition-colors disabled:opacity-50 uppercase shadow-[0_0_5px_rgba(0,255,65,0.5)]">
          {status === 'sending' ? 'UPLOADING...' : status === 'success' ? 'TRANSMITTED' : 'EXECUTE_SEND'}
        </button>
      </form>
    );
  }

  if (template === 'corporate') {
    return (
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block text-sm font-semibold mb-1 text-[#1a2744]">Full Name</label>
          <input required name="senderName" className="w-full border border-gray-300 rounded p-2 outline-none focus:border-[#1a2744] focus:ring-1 focus:ring-[#1a2744]" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-[#1a2744]">Email Address</label>
          <input required type="email" name="senderEmail" className="w-full border border-gray-300 rounded p-2 outline-none focus:border-[#1a2744] focus:ring-1 focus:ring-[#1a2744]" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-[#1a2744]">Inquiry</label>
          <textarea required name="message" rows={4} className="w-full border border-gray-300 rounded p-2 outline-none focus:border-[#1a2744] focus:ring-1 focus:ring-[#1a2744]" />
        </div>
        <button disabled={status === 'sending'} className="bg-[#1a2744] text-white px-6 py-2 rounded font-semibold hover:bg-[#253761] transition-colors disabled:opacity-50">
          {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent' : 'Submit Inquiry'}
        </button>
      </form>
    );
  }

  if (template === 'creative') {
    return (
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg bg-white/40 backdrop-blur-lg rounded-[24px] p-8 border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">Your Name</label>
          <input required name="senderName" className="w-full bg-white/50 border border-white/50 rounded-xl p-3 outline-none focus:bg-white transition-colors text-gray-800" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">Email</label>
          <input required type="email" name="senderEmail" className="w-full bg-white/50 border border-white/50 rounded-xl p-3 outline-none focus:bg-white transition-colors text-gray-800" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">Message</label>
          <textarea required name="message" rows={4} className="w-full bg-white/50 border border-white/50 rounded-xl p-3 outline-none focus:bg-white transition-colors text-gray-800" />
        </div>
        <button disabled={status === 'sending'} className="bg-gray-900 text-white rounded-full px-8 py-3 font-bold hover:scale-105 hover:bg-gray-800 transition-all shadow-md disabled:opacity-50 disabled:hover:scale-100">
          {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Say Hello'}
        </button>
      </form>
    );
  }

  if (template === 'data-science') {
    return (
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg bg-[#2a2a3e] p-6 border-l-4 border-[#38bdf8]">
        <div>
          <label className="block text-sm text-[#38bdf8] mb-1">sender_name =</label>
          <input required name="senderName" className="w-full bg-[#1e1e2e] border border-gray-700 text-gray-300 p-2 outline-none focus:border-[#38bdf8]" />
        </div>
        <div>
          <label className="block text-sm text-[#38bdf8] mb-1">sender_email =</label>
          <input required type="email" name="senderEmail" className="w-full bg-[#1e1e2e] border border-gray-700 text-gray-300 p-2 outline-none focus:border-[#38bdf8]" />
        </div>
        <div>
          <label className="block text-sm text-[#38bdf8] mb-1">message_body =</label>
          <textarea required name="message" rows={4} className="w-full bg-[#1e1e2e] border border-gray-700 text-gray-300 p-2 outline-none focus:border-[#38bdf8]" />
        </div>
        <button disabled={status === 'sending'} className="bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8] px-6 py-2 hover:bg-[#38bdf8]/20 transition-colors disabled:opacity-50">
          {status === 'sending' ? 'executing...' : status === 'success' ? 'success' : 'execute()'}
        </button>
      </form>
    );
  }

  if (template === 'game-dev') {
    return (
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg bg-black border-2 border-white p-6 relative">
        <div className="absolute top-0 left-0 w-2 h-2 bg-black -translate-x-0.5 -translate-y-0.5"></div>
        <div className="absolute top-0 right-0 w-2 h-2 bg-black translate-x-0.5 -translate-y-0.5"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-black -translate-x-0.5 translate-y-0.5"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-black translate-x-0.5 translate-y-0.5"></div>

        <div>
          <label className="block text-xs text-[#00ffff] mb-2 uppercase">PLAYER NAME</label>
          <input required name="senderName" className="w-full bg-black border border-gray-600 text-white p-2 outline-none focus:border-[#ffff00] text-xs" />
        </div>
        <div>
          <label className="block text-xs text-[#00ffff] mb-2 uppercase">CONTACT COMM</label>
          <input required type="email" name="senderEmail" className="w-full bg-black border border-gray-600 text-white p-2 outline-none focus:border-[#ffff00] text-xs" />
        </div>
        <div>
          <label className="block text-xs text-[#00ffff] mb-2 uppercase">MESSAGE LOG</label>
          <textarea required name="message" rows={4} className="w-full bg-black border border-gray-600 text-white p-2 outline-none focus:border-[#ffff00] text-xs" />
        </div>
        <button disabled={status === 'sending'} className="bg-[#ff00ff] text-white px-6 py-2 text-xs hover:bg-[#ffff00] hover:text-black transition-colors disabled:opacity-50 w-full mt-2">
          {status === 'sending' ? 'LOADING...' : status === 'success' ? 'TRANSMITTED' : 'SEND MESSAGE'}
        </button>
      </form>
    );
  }

  return null;
}
