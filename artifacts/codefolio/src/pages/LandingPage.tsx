import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, LayoutTemplate, Zap, Share2 } from "lucide-react";

export default function LandingPage() {
  const templates = [
    { name: "Minimalist", tag: "Frontend", desc: "Clean, distraction-free typography" },
    { name: "Cyberpunk", tag: "Web3/Hacker", desc: "Neon glows and terminal vibes" },
    { name: "Corporate", tag: "Enterprise", desc: "Professional and trustworthy" },
    { name: "Creative", tag: "UI/UX", desc: "Animated gradients and soft cards" },
    { name: "Data Science", tag: "ML/AI", desc: "Notebook-inspired aesthetics" },
    { name: "Game Dev", tag: "Indie", desc: "Retro 8-bit pixel art" }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="border-b border-white/10 p-6 flex justify-between items-center backdrop-blur-md sticky top-0 z-50 bg-black/80">
        <div className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          CodeFolio
        </div>
        <nav className="flex gap-4">
          <Link href="/login" className="text-gray-300 hover:text-white transition-colors px-4 py-2">
            Log in
          </Link>
          <Link href="/register" className="bg-white text-black hover:bg-gray-200 transition-colors px-4 py-2 rounded-md font-medium">
            Sign up
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full max-w-5xl mx-auto px-6 py-24 md:py-32 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Build your dev portfolio in <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">60 seconds.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-12">
            Linktree meets Squarespace, but built specifically for engineers. 
            Connect your code to a professional template instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full text-lg h-14 px-8 bg-white text-black hover:bg-gray-200">
                Get Started Free
              </Button>
            </Link>
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full text-lg h-14 px-8 border-gray-700 text-black hover:bg-gray-800">
                See an Example
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full border-y border-white/10 bg-[#0a0a0a] py-20">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">No Coding Required</h3>
              <p className="text-gray-400">Fill out a simple form and let us handle the design. Spend time coding your projects, not your portfolio.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mb-6">
                <LayoutTemplate size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">6 Professional Templates</h3>
              <p className="text-gray-400">Crafted designs tailored for different engineering domains. From minimal frontend to retro game dev.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-pink-500/20 text-pink-400 rounded-full flex items-center justify-center mb-6">
                <Share2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Public URL</h3>
              <p className="text-gray-400">Claim your username and share your codefolio.app/username link anywhere.</p>
            </div>
          </div>
        </section>

        {/* Templates Showcase */}
        <section className="w-full max-w-6xl mx-auto px-6 py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Choose your aesthetic</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-6 hover:border-white/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{t.name}</h3>
                  <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-gray-300">{t.tag}</span>
                </div>
                <p className="text-gray-400">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-12 text-center text-gray-500">
        <p>© {new Date().getFullYear()} CodeFolio. Built for developers.</p>
      </footer>
    </div>
  );
}