import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "wouter";
import { 
  useGetMe, 
  useUpdateProfile, 
  useUpdateProjects, 
  useUpdateSkills, 
  useUpdateTemplate 
} from "@workspace/api-client-react";
import { useAuth } from "@/lib/auth-context";
import { templateMap } from "@/templates/templateMap";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, ExternalLink, LogOut, Plus, Trash2, Edit2 } from "lucide-react";

export default function DashboardPage() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, setLocation]);

  const { data: user, isLoading } = useGetMe({
    query: {
      enabled: isAuthenticated,
      queryKey: ["/api/portfolio/me"]
    }
  });

  const updateProfile = useUpdateProfile();
  const updateProjects = useUpdateProjects();
  const updateSkills = useUpdateSkills();
  const updateTemplate = useUpdateTemplate();

  // Local state for live preview
  const [localData, setLocalData] = useState<any>(null);

  useEffect(() => {
    if (user && !localData) {
      setLocalData(user);
    }
  }, [user]);

  if (isLoading || !localData) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${user?.username}`);
    toast({ title: "URL Copied!" });
  };

  const TemplatePreview = templateMap[localData.templateId] || templateMap.minimalist;

  return (
    <div className="h-screen flex flex-col bg-gray-950 text-white overflow-hidden">
      {/* Topbar */}
      <header className="h-14 border-b border-white/10 bg-black flex items-center justify-between px-6 shrink-0">
        <div className="font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
          CodeFolio Dashboard
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white/5 rounded-md px-3 py-1.5 border border-white/10">
            <span className="text-gray-400 text-sm mr-2">{window.location.origin.replace(/^https?:\/\//, '')}/</span>
            <span className="font-medium text-white">{user?.username}</span>
            <button onClick={copyUrl} className="ml-3 text-gray-400 hover:text-white"><Copy size={14} /></button>
          </div>
          <Link href={`/${user?.username}`}>
            <Button variant="outline" size="sm" className="h-8 gap-2 bg-transparent border-white/20 text-white hover:bg-white/10">
              <ExternalLink size={14} /> View Live
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-400 hover:text-white">
            <LogOut size={16} />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - CMS */}
        <div className="w-1/2 min-w-[500px] flex flex-col border-r border-white/10 bg-[#0a0a0a] overflow-hidden">
          <Tabs defaultValue="profile" className="w-full h-full flex flex-col">
            <div className="px-6 pt-4 shrink-0">
              <TabsList className="bg-white/5 border border-white/10 w-full grid grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="theme">Theme</TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              <TabsContent value="profile" className="m-0 space-y-6">
                <ProfileForm user={user} setLocalData={setLocalData} updateProfile={updateProfile} />
              </TabsContent>

              <TabsContent value="projects" className="m-0 space-y-6">
                <ProjectsForm user={user} setLocalData={setLocalData} updateProjects={updateProjects} />
              </TabsContent>

              <TabsContent value="skills" className="m-0 space-y-6">
                <SkillsForm user={user} setLocalData={setLocalData} updateSkills={updateSkills} />
              </TabsContent>

              <TabsContent value="theme" className="m-0">
                <ThemeSelector currentTemplate={localData.templateId} setLocalData={setLocalData} updateTemplate={updateTemplate} />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Right Panel - Live Preview */}
        <div className="flex-1 bg-black/50 p-8 flex flex-col items-center justify-center overflow-hidden">
          <div className="mb-4 text-sm text-gray-500 font-medium tracking-widest uppercase">Live Preview</div>
          <div className="w-full max-w-[1200px] h-[800px] relative rounded-xl border border-white/10 shadow-2xl bg-white overflow-hidden pointer-events-none"
               style={{ transform: 'scale(0.85)', transformOrigin: 'top center' }}>
             <TemplatePreview data={localData} />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Subcomponents for Tabs ---

function ProfileForm({ user, setLocalData, updateProfile }: any) {
  const { toast } = useToast();
  const [status, setStatus] = useState("");
  
  // Use uncontrolled inputs with ref to avoid cursor jumping
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = () => {
    setStatus("Saving...");
    const formData = new FormData(formRef.current!);
    
    const profile = {
      name: formData.get("name") as string,
      bio: formData.get("bio") as string,
      avatarUrl: formData.get("avatarUrl") as string,
      resumeUrl: formData.get("resumeUrl") as string,
      domain: formData.get("domain") as string,
      socialLinks: {
        github: formData.get("github") as string,
        linkedin: formData.get("linkedin") as string,
        twitter: formData.get("twitter") as string,
        website: formData.get("website") as string,
      }
    };

    const contactEmail = formData.get("contactEmail") as string;

    // Update local preview immediately
    setLocalData((prev: any) => ({ ...prev, profile, email: contactEmail || prev.email }));

    // Debounce API call
    clearTimeout((window as any).profileSaveTimeout);
    (window as any).profileSaveTimeout = setTimeout(() => {
      updateProfile.mutate(
        { data: { profile, contactEmail } },
        {
          onSuccess: () => setStatus("Saved ✓"),
          onError: () => setStatus("Error saving")
        }
      );
    }, 1000);
  };

  return (
    <form ref={formRef} onChange={handleChange} className="space-y-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Basic Info</h2>
        <span className="text-sm text-gray-400">{status}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input name="name" defaultValue={user.profile?.name || ""} className="bg-black/40 border-white/10" />
        </div>
        <div className="space-y-2">
          <Label>Domain / Role</Label>
          <Select name="domain" defaultValue={user.profile?.domain || ""} onValueChange={handleChange}>
            <SelectTrigger className="bg-black/40 border-white/10">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Frontend">Frontend Developer</SelectItem>
              <SelectItem value="Backend">Backend Developer</SelectItem>
              <SelectItem value="Fullstack">Fullstack Developer</SelectItem>
              <SelectItem value="DevOps">DevOps Engineer</SelectItem>
              <SelectItem value="Data Science">Data Scientist</SelectItem>
              <SelectItem value="Game Dev">Game Developer</SelectItem>
              <SelectItem value="Mobile">Mobile Developer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Bio</Label>
        <Textarea name="bio" defaultValue={user.profile?.bio || ""} className="bg-black/40 border-white/10 h-24" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Avatar URL</Label>
          <Input name="avatarUrl" defaultValue={user.profile?.avatarUrl || ""} className="bg-black/40 border-white/10" />
        </div>
        <div className="space-y-2">
          <Label>Resume URL</Label>
          <Input name="resumeUrl" defaultValue={user.profile?.resumeUrl || ""} className="bg-black/40 border-white/10" />
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4 pt-4 border-t border-white/10">Links & Contact</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>GitHub URL</Label>
          <Input name="github" defaultValue={user.profile?.socialLinks?.github || ""} className="bg-black/40 border-white/10" />
        </div>
        <div className="space-y-2">
          <Label>LinkedIn URL</Label>
          <Input name="linkedin" defaultValue={user.profile?.socialLinks?.linkedin || ""} className="bg-black/40 border-white/10" />
        </div>
        <div className="space-y-2">
          <Label>Twitter URL</Label>
          <Input name="twitter" defaultValue={user.profile?.socialLinks?.twitter || ""} className="bg-black/40 border-white/10" />
        </div>
        <div className="space-y-2">
          <Label>Website URL</Label>
          <Input name="website" defaultValue={user.profile?.socialLinks?.website || ""} className="bg-black/40 border-white/10" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Public Contact Email (for forms)</Label>
        <Input name="contactEmail" defaultValue={user.email || ""} className="bg-black/40 border-white/10" />
      </div>
    </form>
  );
}

function ProjectsForm({ user, setLocalData, updateProjects }: any) {
  const [projects, setProjects] = useState<any[]>(user.projects || []);
  const [editingId, setEditingId] = useState<string | null>(null);

  const saveToApi = (newProjects: any[]) => {
    setLocalData((prev: any) => ({ ...prev, projects: newProjects }));
    updateProjects.mutate({ data: { projects: newProjects } });
  };

  const deleteProject = (id: string) => {
    const newProjects = projects.filter(p => p.id !== id);
    setProjects(newProjects);
    saveToApi(newProjects);
  };

  const handleProjectSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const techStackStr = formData.get("techStack") as string;
    
    const projectData = {
      id: editingId || Math.random().toString(36).substring(7),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      techStack: techStackStr.split(",").map(s => s.trim()).filter(Boolean),
      repoLink: formData.get("repoLink") as string,
      liveLink: formData.get("liveLink") as string,
      screenshotUrl: formData.get("screenshotUrl") as string,
    };

    let newProjects;
    if (editingId) {
      newProjects = projects.map(p => p.id === editingId ? projectData : p);
    } else {
      newProjects = [...projects, projectData];
    }

    setProjects(newProjects);
    saveToApi(newProjects);
    setEditingId(null);
    (e.target as HTMLFormElement).reset();
  };

  const editProject = (p: any) => {
    setEditingId(p.id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Projects</h2>
        {editingId === null && (
          <Button size="sm" onClick={() => setEditingId('new')} className="bg-white text-black hover:bg-gray-200">
            <Plus size={16} className="mr-2" /> Add Project
          </Button>
        )}
      </div>

      {editingId && (
        <Card className="bg-black/60 border-white/20 text-white mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input name="title" defaultValue={editingId !== 'new' ? projects.find(p=>p.id===editingId)?.title : ""} required className="bg-black/40 border-white/10" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea name="description" defaultValue={editingId !== 'new' ? projects.find(p=>p.id===editingId)?.description : ""} className="bg-black/40 border-white/10" />
              </div>
              <div className="space-y-2">
                <Label>Tech Stack (comma-separated)</Label>
                <Input name="techStack" defaultValue={editingId !== 'new' ? projects.find(p=>p.id===editingId)?.techStack?.join(", ") : ""} className="bg-black/40 border-white/10" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Repo Link</Label>
                  <Input name="repoLink" defaultValue={editingId !== 'new' ? projects.find(p=>p.id===editingId)?.repoLink : ""} className="bg-black/40 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Live Link</Label>
                  <Input name="liveLink" defaultValue={editingId !== 'new' ? projects.find(p=>p.id===editingId)?.liveLink : ""} className="bg-black/40 border-white/10" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-white/10 mt-4">
                <Button type="button" variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                <Button type="submit" className="bg-white text-black hover:bg-gray-200">Save Project</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {projects.map(p => (
          <div key={p.id} className="bg-white/5 border border-white/10 p-4 rounded-lg flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{p.description}</p>
              <div className="flex gap-2 mt-3">
                {p.techStack?.map((t: string) => (
                  <span key={t} className="text-xs bg-white/10 px-2 py-1 rounded">{t}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 shrink-0 ml-4">
              <Button size="icon" variant="ghost" onClick={() => editProject(p)} className="h-8 w-8 text-gray-400 hover:text-white">
                <Edit2 size={16} />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => deleteProject(p.id)} className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10">
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        ))}
        {projects.length === 0 && !editingId && (
          <div className="text-center py-12 text-gray-500 border border-dashed border-white/10 rounded-lg">
            No projects added yet.
          </div>
        )}
      </div>
    </div>
  );
}

function SkillsForm({ user, setLocalData, updateSkills }: any) {
  const [status, setStatus] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const parseSkills = (str: string) => str.split(",").map(s => s.trim()).filter(Boolean);

  const handleChange = () => {
    setStatus("Saving...");
    const formData = new FormData(formRef.current!);
    
    const skills = {
      frontend: parseSkills(formData.get("frontend") as string),
      backend: parseSkills(formData.get("backend") as string),
      devops: parseSkills(formData.get("devops") as string),
      other: parseSkills(formData.get("other") as string),
    };

    setLocalData((prev: any) => ({ ...prev, skills }));

    clearTimeout((window as any).skillsSaveTimeout);
    (window as any).skillsSaveTimeout = setTimeout(() => {
      updateSkills.mutate(
        { data: { skills } },
        {
          onSuccess: () => setStatus("Saved ✓"),
          onError: () => setStatus("Error saving")
        }
      );
    }, 1000);
  };

  return (
    <form ref={formRef} onChange={handleChange} className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Skills</h2>
        <span className="text-sm text-gray-400">{status}</span>
      </div>

      <div className="space-y-2">
        <Label>Frontend Skills (comma-separated)</Label>
        <Textarea name="frontend" defaultValue={user.skills?.frontend?.join(", ") || ""} className="bg-black/40 border-white/10 h-20" />
      </div>
      
      <div className="space-y-2">
        <Label>Backend Skills (comma-separated)</Label>
        <Textarea name="backend" defaultValue={user.skills?.backend?.join(", ") || ""} className="bg-black/40 border-white/10 h-20" />
      </div>

      <div className="space-y-2">
        <Label>DevOps Skills (comma-separated)</Label>
        <Textarea name="devops" defaultValue={user.skills?.devops?.join(", ") || ""} className="bg-black/40 border-white/10 h-20" />
      </div>

      <div className="space-y-2">
        <Label>Other Skills (comma-separated)</Label>
        <Textarea name="other" defaultValue={user.skills?.other?.join(", ") || ""} className="bg-black/40 border-white/10 h-20" />
      </div>
    </form>
  );
}

function ThemeSelector({ currentTemplate, setLocalData, updateTemplate }: any) {
  const themes = [
    { id: "minimalist", name: "Minimalist", domain: "Frontend", desc: "Clean typography" },
    { id: "cyberpunk", name: "Cyberpunk", domain: "Web3", desc: "Neon & scanlines" },
    { id: "corporate", name: "Corporate", domain: "Enterprise", desc: "Professional" },
    { id: "creative", name: "Creative", domain: "UI/UX", desc: "Animated gradients" },
    { id: "data-science", name: "Data Science", domain: "ML/AI", desc: "Notebook vibes" },
    { id: "game-dev", name: "Game Dev", domain: "Indie", desc: "8-bit retro" }
  ];

  const selectTheme = (id: string) => {
    setLocalData((prev: any) => ({ ...prev, templateId: id }));
    updateTemplate.mutate({ data: { templateId: id } });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Choose Theme</h2>
      <div className="grid grid-cols-2 gap-4">
        {themes.map(t => (
          <div 
            key={t.id} 
            onClick={() => selectTheme(t.id)}
            className={`p-4 rounded-xl cursor-pointer border-2 transition-all ${
              currentTemplate === t.id 
                ? 'border-indigo-500 bg-indigo-500/10' 
                : 'border-white/10 bg-white/5 hover:border-white/30'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">{t.name}</h3>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${currentTemplate === t.id ? 'border-indigo-500' : 'border-gray-500'}`}>
                {currentTemplate === t.id && <div className="w-2 h-2 bg-indigo-500 rounded-full" />}
              </div>
            </div>
            <div className="text-xs text-indigo-400 mb-1">{t.domain}</div>
            <p className="text-xs text-gray-400">{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}