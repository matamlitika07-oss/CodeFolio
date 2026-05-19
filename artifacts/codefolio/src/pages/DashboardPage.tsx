import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetMe,
  useUpdateProfile,
  useUpdateProjects,
  useUpdateSkills,
  useUpdateTemplate,
} from "@workspace/api-client-react";
import { useAuth } from "@/lib/auth-context";
import { templateMap } from "@/templates/templateMap";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, ExternalLink, LogOut, Plus, Trash2, Edit2, Code2, MonitorSmartphone, LayoutTemplate, Network, Database, Cpu, PenTool, Palette, Sparkles, Terminal, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const STREAM_OPTIONS = [
  { value: "Frontend", label: "Frontend", icon: <LayoutTemplate size={16} /> },
  { value: "Backend", label: "Backend", icon: <Database size={16} /> },
  { value: "Fullstack", label: "Fullstack", icon: <Network size={16} /> },
  { value: "DevOps", label: "DevOps", icon: <Terminal size={16} /> },
  { value: "Data Science", label: "Data Science / AI", icon: <Cpu size={16} /> },
  { value: "Game Dev", label: "Game Dev", icon: <Code2 size={16} /> },
  { value: "Mobile", label: "Mobile Dev", icon: <MonitorSmartphone size={16} /> },
  { value: "UI/UX", label: "UI/UX Design", icon: <PenTool size={16} /> },
  { value: "Creative", label: "Creative Dev", icon: <Sparkles size={16} /> },
];

const TEMPLATE_OPTIONS = [
  { id: "minimal-universal", name: "Minimal Universal", category: "Any", previewColor: "from-gray-700 to-gray-900" },
  { id: "frontend-pro", name: "Frontend Pro", category: "Frontend", previewColor: "from-blue-600 to-cyan-600" },
  { id: "fullstack-nexus", name: "FullStack Nexus", category: "Fullstack", previewColor: "from-indigo-600 to-purple-600" },
  { id: "backend-core", name: "Backend Core", category: "Backend/DevOps", previewColor: "from-emerald-600 to-teal-600" },
  { id: "ai-matrix", name: "AI Matrix", category: "Data Science", previewColor: "from-purple-600 to-pink-600" },
  { id: "creative-studio", name: "Creative Studio", category: "UI/UX", previewColor: "from-pink-500 to-orange-400" },
  { id: "design-canvas", name: "Design Canvas", category: "Design", previewColor: "from-orange-500 to-yellow-500" },
  { id: "creative-motion", name: "Creative Motion", category: "Creative", previewColor: "from-yellow-400 to-red-500" },
  { id: "pixel-forge", name: "Pixel Forge", category: "Game Dev", previewColor: "from-green-500 to-emerald-700" }
];

function calculateCompletion(userData: any): number {
  const checks = [
    userData?.profile?.name,
    userData?.profile?.bio,
    userData?.profile?.domain,
    userData?.profile?.socialLinks?.github || userData?.profile?.socialLinks?.linkedin,
    userData?.projects?.length > 0,
    userData?.skills && Object.values(userData.skills).some((arr: any) => arr?.length > 0),
    userData?.templateId,
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100) || 0;
}

type SaveStatus = "idle" | "saving" | "saved" | "error";

function SaveButton({ status, onClick, label = "Save Changes" }: { status: SaveStatus; onClick: () => void; label?: string; }) {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={status === "saving"}
      className={`w-full h-12 rounded-xl font-bold transition-all relative overflow-hidden ${
        status === "saved" 
          ? "bg-emerald-500 hover:bg-emerald-600 text-white" 
          : status === "error"
          ? "bg-red-500 hover:bg-red-600 text-white"
          : "bg-white text-black hover:bg-gray-200"
      }`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {status === "saving" && <span className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent" />}
        {status === "saving" ? "Saving..." : status === "saved" ? <><CheckCircle2 className="w-4 h-4" /> Saved</> : status === "error" ? "Failed. Retry?" : label}
      </span>
    </Button>
  );
}

export default function DashboardPage() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (!isAuthenticated) setLocation("/login");
  }, [isAuthenticated, setLocation]);

  const { data: user, isLoading } = useGetMe({
    query: { enabled: isAuthenticated, queryKey: ["/api/portfolio/me"] },
  });

  const updateProfile = useUpdateProfile();
  const updateProjects = useUpdateProjects();
  const updateSkills = useUpdateSkills();
  const updateTemplate = useUpdateTemplate();

  const [localData, setLocalData] = useState<any>(null);

  useEffect(() => {
    if (user && !localData) setLocalData(user);
  }, [user]);

  if (isLoading || !localData) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white" />
      </div>
    );
  }

  const completion = calculateCompletion(localData);
  const initials = (localData.profile?.name || localData.username || "U").charAt(0).toUpperCase();
  const TemplatePreview = templateMap[localData.templateId] || templateMap.minimalist || templateMap['minimal-universal'];

  return (
    <div className="h-screen flex bg-[#030303] text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[280px] shrink-0 border-r border-white/10 flex flex-col bg-[#0a0a0a]">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8 text-white/90">
            <Code2 className="w-5 h-5 text-purple-500" />
            <span className="font-bold tracking-tight">CodeFolio</span>
          </div>

          <div className="bg-[#111] border border-white/5 rounded-2xl p-4 mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-50" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-lg shadow-inner">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate text-sm">{localData.profile?.name || localData.username}</div>
                <div className="text-xs text-gray-400 truncate">@{localData.username}</div>
              </div>
            </div>
            <div className="relative z-10 mt-4">
              <div className="flex justify-between text-[10px] text-gray-400 mb-1 uppercase tracking-wider font-semibold">
                <span>Profile</span>
                <span>{completion}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-500" style={{ width: `${completion}%` }} />
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {[
              { id: "profile", label: "Identity", icon: <MonitorSmartphone size={18} /> },
              { id: "projects", label: "Projects", icon: <LayoutTemplate size={18} /> },
              { id: "skills", label: "Skills", icon: <Terminal size={18} /> },
              { id: "theme", label: "Aesthetic", icon: <Palette size={18} /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === item.id 
                    ? "bg-white/10 text-white" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-white/5 flex flex-col gap-1">
          <Link href={`/${user?.username}`}>
            <button className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
              <ExternalLink size={16} /> View Live
            </button>
          </Link>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(`${window.location.origin}/${user?.username}`);
              toast({ title: "URL copied to clipboard" });
            }}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Copy size={16} /> Copy URL
          </button>
          <button 
            onClick={() => { logout(); setLocation("/"); }}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-red-400 hover:bg-white/5 transition-colors mt-2"
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#030303] relative scroll-smooth">
        <div className="max-w-3xl mx-auto p-8 lg:p-12 pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "profile" && <ProfileForm user={user} setLocalData={setLocalData} updateProfile={updateProfile} />}
              {activeTab === "projects" && <ProjectsForm user={user} setLocalData={setLocalData} updateProjects={updateProjects} />}
              {activeTab === "skills" && <SkillsForm user={user} setLocalData={setLocalData} updateSkills={updateSkills} />}
              {activeTab === "theme" && <ThemeSelector currentTemplate={localData.templateId} setLocalData={setLocalData} updateTemplate={updateTemplate} toast={toast} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Live Preview Pane */}
      <aside className="hidden xl:flex flex-col w-[450px] border-l border-white/10 bg-[#000]">
        <div className="p-4 border-b border-white/5 flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Live Preview</span>
        </div>
        <div className="flex-1 overflow-hidden relative p-4 flex items-start justify-center bg-[#050505]">
          <div 
            className="w-full aspect-[9/16] max-h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black"
            style={{ zoom: 0.6, transformOrigin: 'top center', width: '100%', minWidth: 375, height: 812 }}
          >
            {TemplatePreview ? <TemplatePreview data={localData} /> : null}
          </div>
        </div>
      </aside>
    </div>
  );
}

// ─── Forms ──────────────────────────────────────────────────────────────────

function ProfileForm({ user, setLocalData, updateProfile }: any) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [domain, setDomain] = useState<string>(user.profile?.domain || "");
  const formRef = useRef<HTMLFormElement>(null);

  const readData = useCallback(() => {
    const fd = new FormData(formRef.current!);
    return {
      profile: {
        name: fd.get("name") as string,
        bio: fd.get("bio") as string,
        avatarUrl: fd.get("avatarUrl") as string,
        resumeUrl: fd.get("resumeUrl") as string,
        domain,
        socialLinks: {
          github: fd.get("github") as string,
          linkedin: fd.get("linkedin") as string,
          twitter: fd.get("twitter") as string,
          website: fd.get("website") as string,
        },
      },
      contactEmail: fd.get("contactEmail") as string,
    };
  }, [domain]);

  const handleChange = () => {
    const data = readData();
    setLocalData((prev: any) => ({ ...prev, profile: data.profile }));
  };

  const handleSave = () => {
    setSaveStatus("saving");
    updateProfile.mutate(
      { data: readData() },
      {
        onSuccess: () => { setSaveStatus("saved"); setTimeout(() => setSaveStatus("idle"), 2000); },
        onError: () => setSaveStatus("error"),
      }
    );
  };

  return (
    <form ref={formRef} onChange={handleChange} className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold mb-6 tracking-tight">Identity</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Full Name</label>
              <Input name="name" defaultValue={user.profile?.name || ""} className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Primary Stream</label>
              <Select value={domain} onValueChange={(v) => { setDomain(v); handleChange(); }}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-purple-500">
                  <SelectValue placeholder="Select your stream" />
                </SelectTrigger>
                <SelectContent className="bg-[#111] border-white/10 text-white">
                  {STREAM_OPTIONS.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>
                      <div className="flex items-center gap-2">{opt.icon} {opt.label}</div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Short Bio</label>
            <Textarea name="bio" defaultValue={user.profile?.bio || ""} className="bg-white/5 border-white/10 text-white h-24 rounded-xl focus:border-purple-500 resize-none" placeholder="Craft your narrative..." />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-white/10">
        <h2 className="text-2xl font-bold mb-6 tracking-tight">Links & Presence</h2>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">GitHub</label>
            <Input name="github" defaultValue={user.profile?.socialLinks?.github || ""} className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" placeholder="https://github.com/..." />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">LinkedIn</label>
            <Input name="linkedin" defaultValue={user.profile?.socialLinks?.linkedin || ""} className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" placeholder="https://linkedin.com/in/..." />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Twitter / X</label>
            <Input name="twitter" defaultValue={user.profile?.socialLinks?.twitter || ""} className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Personal Website</label>
            <Input name="website" defaultValue={user.profile?.socialLinks?.website || ""} className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Resume URL</label>
            <Input name="resumeUrl" defaultValue={user.profile?.resumeUrl || ""} className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" placeholder="Link to PDF" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Public Contact Email</label>
            <Input name="contactEmail" defaultValue={user.email || ""} className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" />
          </div>
        </div>
      </div>

      <div className="pt-4 sticky bottom-8 z-20">
        <SaveButton status={saveStatus} onClick={handleSave} />
      </div>
    </form>
  );
}

function ProjectsForm({ user, setLocalData, updateProjects }: any) {
  const [projects, setProjects] = useState<any[]>(user.projects || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const applyProjects = (updated: any[]) => {
    setProjects(updated);
    setLocalData((prev: any) => ({ ...prev, projects: updated }));
  };

  const handleSaveAll = () => {
    setSaveStatus("saving");
    updateProjects.mutate(
      { data: { projects } },
      {
        onSuccess: () => { setSaveStatus("saved"); setTimeout(() => setSaveStatus("idle"), 2000); },
        onError: () => setSaveStatus("error"),
      }
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const tsStr = fd.get("techStack") as string;
    const project = {
      id: editingId === "new" ? Math.random().toString(36).substring(7) : editingId,
      title: fd.get("title") as string,
      description: fd.get("description") as string,
      techStack: tsStr.split(",").map(s => s.trim()).filter(Boolean),
      repoLink: fd.get("repoLink") as string,
      liveLink: fd.get("liveLink") as string,
      screenshotUrl: fd.get("screenshotUrl") as string,
    };

    const updated = editingId === "new" 
      ? [...projects, project]
      : projects.map(p => p.id === editingId ? project : p);
    
    applyProjects(updated);
    setEditingId(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
        {!editingId && (
          <Button onClick={() => setEditingId("new")} className="bg-white/10 hover:bg-white/20 text-white rounded-xl">
            <Plus size={16} className="mr-2" /> Add Project
          </Button>
        )}
      </div>

      {editingId && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="font-semibold text-lg">{editingId === "new" ? "New Project" : "Edit Project"}</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Title</label>
                <Input name="title" defaultValue={projects.find(p => p.id === editingId)?.title || ""} required className="bg-black/50 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</label>
                <Textarea name="description" defaultValue={projects.find(p => p.id === editingId)?.description || ""} className="bg-black/50 border-white/10 text-white h-24 rounded-xl focus:border-purple-500 resize-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tech Stack (comma separated)</label>
                <Input name="techStack" defaultValue={projects.find(p => p.id === editingId)?.techStack?.join(", ") || ""} className="bg-black/50 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" placeholder="React, TypeScript, Tailwind" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Repo Link</label>
                  <Input name="repoLink" defaultValue={projects.find(p => p.id === editingId)?.repoLink || ""} className="bg-black/50 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Live Link</label>
                  <Input name="liveLink" defaultValue={projects.find(p => p.id === editingId)?.liveLink || ""} className="bg-black/50 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <Button type="button" variant="ghost" onClick={() => setEditingId(null)} className="text-gray-400 hover:text-white rounded-xl">Cancel</Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl">Save Project</Button>
            </div>
          </form>
        </div>
      )}

      {!editingId && projects.length > 0 && (
        <div className="grid gap-4">
          {projects.map((p) => (
            <div key={p.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex justify-between group hover:border-white/20 transition-colors">
              <div>
                <h4 className="font-bold text-lg mb-1">{p.title}</h4>
                <p className="text-sm text-gray-400 mb-3 line-clamp-2 max-w-xl">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.techStack?.map((t: string) => (
                    <span key={t} className="px-2.5 py-1 rounded-md bg-white/5 text-xs font-medium text-gray-300">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="ghost" onClick={() => setEditingId(p.id)} className="h-8 w-8 text-gray-400 hover:text-white"><Edit2 size={14} /></Button>
                <Button size="icon" variant="ghost" onClick={() => applyProjects(projects.filter(pr => pr.id !== p.id))} className="h-8 w-8 text-gray-400 hover:text-red-400"><Trash2 size={14} /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!editingId && projects.length === 0 && (
        <div className="text-center py-12 border border-white/10 border-dashed rounded-2xl text-gray-500">
          No projects added yet.
        </div>
      )}

      {!editingId && (
        <div className="pt-8 sticky bottom-8 z-20">
          <SaveButton status={saveStatus} onClick={handleSaveAll} label="Commit Project Changes" />
        </div>
      )}
    </div>
  );
}

function SkillsForm({ user, setLocalData, updateSkills }: any) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const getSkills = useCallback(() => {
    const fd = new FormData(formRef.current!);
    return {
      frontend: (fd.get("frontend") as string).split(",").map(s => s.trim()).filter(Boolean),
      backend: (fd.get("backend") as string).split(",").map(s => s.trim()).filter(Boolean),
      devops: (fd.get("devops") as string).split(",").map(s => s.trim()).filter(Boolean),
      other: (fd.get("other") as string).split(",").map(s => s.trim()).filter(Boolean),
    };
  }, []);

  const handleChange = () => {
    setLocalData((prev: any) => ({ ...prev, skills: getSkills() }));
  };

  const handleSave = () => {
    setSaveStatus("saving");
    updateSkills.mutate(
      { data: { skills: getSkills() } },
      {
        onSuccess: () => { setSaveStatus("saved"); setTimeout(() => setSaveStatus("idle"), 2000); },
        onError: () => setSaveStatus("error"),
      }
    );
  };

  return (
    <form ref={formRef} onChange={handleChange} className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Technical Skills</h2>
        <p className="text-gray-400 mb-8">Comma separated values (e.g. React, Vue, Svelte)</p>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Frontend / Client</label>
            <Textarea name="frontend" defaultValue={user.skills?.frontend?.join(", ") || ""} className="bg-white/5 border-white/10 text-white h-20 rounded-xl focus:border-purple-500 resize-none" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Backend / Core</label>
            <Textarea name="backend" defaultValue={user.skills?.backend?.join(", ") || ""} className="bg-white/5 border-white/10 text-white h-20 rounded-xl focus:border-purple-500 resize-none" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Infrastructure / Data</label>
            <Textarea name="devops" defaultValue={user.skills?.devops?.join(", ") || ""} className="bg-white/5 border-white/10 text-white h-20 rounded-xl focus:border-purple-500 resize-none" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tools / Other</label>
            <Textarea name="other" defaultValue={user.skills?.other?.join(", ") || ""} className="bg-white/5 border-white/10 text-white h-20 rounded-xl focus:border-purple-500 resize-none" />
          </div>
        </div>
      </div>

      <div className="pt-4 sticky bottom-8 z-20">
        <SaveButton status={saveStatus} onClick={handleSave} label="Update Skillset" />
      </div>
    </form>
  );
}

function ThemeSelector({ currentTemplate, setLocalData, updateTemplate, toast }: any) {
  const [active, setActive] = useState(currentTemplate || "minimal-universal");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const handleSelect = (id: string) => {
    setActive(id);
    setLocalData((prev: any) => ({ ...prev, templateId: id }));
  };

  const handleSave = () => {
    setSaveStatus("saving");
    updateTemplate.mutate(
      { data: { templateId: active } },
      {
        onSuccess: () => { setSaveStatus("saved"); setTimeout(() => setSaveStatus("idle"), 2000); },
        onError: () => setSaveStatus("error"),
      }
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Aesthetic Configuration</h2>
        <p className="text-gray-400 mb-8">Select a stream-specific template to completely transform your portfolio's appearance.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TEMPLATE_OPTIONS.map((t) => {
            const isSelected = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSelect(t.id)}
                className={`relative flex flex-col items-start p-6 rounded-2xl border text-left transition-all overflow-hidden group ${
                  isSelected 
                    ? "border-purple-500 bg-purple-500/10" 
                    : "border-white/10 bg-white/5 hover:border-white/30"
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${t.previewColor} opacity-0 group-hover:opacity-10 transition-opacity`} />
                {isSelected && (
                  <div className="absolute top-4 right-4 text-purple-400">
                    <CheckCircle2 size={20} />
                  </div>
                )}
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{t.category}</span>
                <span className="text-lg font-bold text-white relative z-10">{t.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-4 sticky bottom-8 z-20">
        <SaveButton status={saveStatus} onClick={handleSave} label="Apply Aesthetic" />
      </div>
    </div>
  );
}
