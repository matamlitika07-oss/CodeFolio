import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, LayoutTemplate, Zap, Share2, Code2, Sparkles, Palette, MonitorSmartphone, Terminal, Network, PenTool, Database, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const templates = [
    { id: "minimal-universal", name: "Minimal Universal", icon: <MonitorSmartphone className="text-gray-400" />, desc: "Linear-inspired precision and monochrome elegance." },
    { id: "frontend-pro", name: "Frontend Pro", icon: <LayoutTemplate className="text-blue-400" />, desc: "Framer-like glassmorphism and electric gradients." },
    { id: "fullstack-nexus", name: "FullStack Nexus", icon: <Network className="text-indigo-400" />, desc: "SaaS dashboard vibe for end-to-end engineers." },
    { id: "backend-core", name: "Backend Core", icon: <Database className="text-emerald-400" />, desc: "Terminal-style code snippets and enterprise depth." },
    { id: "ai-matrix", name: "AI Matrix", icon: <Cpu className="text-purple-400" />, desc: "Futuristic models, data visualizers, and glowing nodes." },
    { id: "creative-studio", name: "Creative Studio", icon: <PenTool className="text-pink-400" />, desc: "Soft pastels and bento grids for UI/UX pros." },
    { id: "design-canvas", name: "Design Canvas", icon: <Palette className="text-orange-400" />, desc: "Masonry gallery for pure visual artists." },
    { id: "creative-motion", name: "Creative Motion", icon: <Sparkles className="text-yellow-400" />, desc: "Cinematic parallax for WebGL and 3D creators." },
    { id: "pixel-forge", name: "Pixel Forge", icon: <Terminal className="text-green-400" />, desc: "Retro-futuristic gaming UI with neon borders." }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col font-sans overflow-hidden selection:bg-purple-500/30">
      {/* Subtle background glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-600/10 blur-[120px]" />
      </div>

      <header className="border-b border-white/5 p-6 flex justify-between items-center backdrop-blur-xl sticky top-0 z-50 bg-[#030303]/80">
        <div className="flex items-center gap-2">
          <Code2 className="w-6 h-6 text-purple-500" />
          <span className="text-xl font-bold tracking-tight text-white">
            CodeFolio
          </span>
        </div>
        <nav className="flex gap-6 items-center text-sm font-medium">
          <Link href="/login" className="text-gray-400 hover:text-white transition-colors">
            Log in
          </Link>
          <Link href="/register" className="bg-white text-black hover:bg-gray-200 transition-colors px-4 py-2 rounded-full">
            Start Building
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center z-10 relative">
        {/* Hero Section */}
        <section className="w-full max-w-6xl mx-auto px-6 py-32 md:py-48 text-center flex flex-col items-center relative">
          <motion.div initial="hidden" animate="show" variants={containerVariants} className="max-w-4xl flex flex-col items-center">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>The portfolio standard for serious technologists</span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]">
              Build your stream-specific <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400">
                portfolio in seconds.
              </span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-12 font-light leading-relaxed">
              Stop fighting with CSS. Connect your GitHub, choose your domain, and instantly generate a world-class portfolio designed for your exact discipline.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full text-lg h-14 px-8 rounded-full bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all">
                  Get Started Free
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Feature Grid */}
        <section className="w-full border-y border-white/5 bg-white/[0.02] py-32 relative backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Engineered for perfection</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">Every template is meticulously crafted to highlight the specific metrics, visuals, and tools that matter in your domain.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col p-8 rounded-3xl bg-[#111] border border-white/5 hover:border-purple-500/30 transition-colors group">
                <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Zero Configuration</h3>
                <p className="text-gray-400 leading-relaxed">Focus on your code. We handle the responsive design, dark mode, typography, and precise spacing.</p>
              </div>
              <div className="flex flex-col p-8 rounded-3xl bg-[#111] border border-white/5 hover:border-cyan-500/30 transition-colors group">
                <div className="w-12 h-12 bg-cyan-500/10 text-cyan-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <LayoutTemplate className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Domain-Specific</h3>
                <p className="text-gray-400 leading-relaxed">Whether you're training LLMs, designing interfaces, or writing smart contracts, we have a layout that speaks your language.</p>
              </div>
              <div className="flex flex-col p-8 rounded-3xl bg-[#111] border border-white/5 hover:border-emerald-500/30 transition-colors group">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Share2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Instant Deployment</h3>
                <p className="text-gray-400 leading-relaxed">Hit save and your portfolio is live immediately. Share your custom codefolio.app/username URL everywhere.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Showcase */}
        <section className="w-full max-w-6xl mx-auto px-6 py-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Choose your stream</h2>
              <p className="text-gray-400 text-lg">9 distinct aesthetics. Infinite possibilities.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((t, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={t.id} 
                className="group relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                    {t.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 tracking-tight">{t.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-purple-900/20 blur-[100px] pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">Ready to ship your best work?</h2>
            <p className="text-xl text-gray-400 mb-12">Join the thousands of developers who have upgraded their online presence.</p>
            <Link href="/register">
              <Button size="lg" className="text-lg h-14 px-10 rounded-full bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all">
                Create Your Portfolio
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 bg-[#030303]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-gray-500" />
            <span className="font-semibold text-gray-400">CodeFolio</span>
          </div>
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} CodeFolio. Built for serious makers.</p>
        </div>
      </footer>
    </div>
  );
}
