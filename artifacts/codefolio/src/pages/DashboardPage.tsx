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
import { templateMap, STREAM_TEMPLATE_MAP } from "@/templates/templateMap";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Copy, ExternalLink, LogOut, Plus, Trash2, Edit2,
  Code2, Camera, Palette, Layers, CheckCircle2,
  MonitorSmartphone, LayoutTemplate, Terminal, Image, Star, Briefcase,
  Award, ChevronRight, ArrowLeft, Users, Maximize2, Minimize2, Eye
} from "lucide-react";

// ─── Stream Config ──────────────────────────────────────────────────────────

const STREAMS = [
  {
    id: "Developer",
    label: "Developer",
    subtitle: "Showcase code, projects & skills",
    icon: <Code2 size={28} />,
    gradient: "from-blue-600/20 to-cyan-600/20",
    border: "border-blue-500/40",
    accent: "#3b82f6",
    templateId: "developer-pro",
  },
  {
    id: "Graphic Designer",
    label: "Graphic Designer",
    subtitle: "Gallery-first design portfolio",
    icon: <Palette size={28} />,
    gradient: "from-orange-500/20 to-yellow-500/20",
    border: "border-orange-500/40",
    accent: "#f97316",
    templateId: "design-canvas",
  },
  {
    id: "Photographer",
    label: "Photographer",
    subtitle: "Cinematic photo portfolio",
    icon: <Camera size={28} />,
    gradient: "from-purple-600/20 to-pink-500/20",
    border: "border-purple-500/40",
    accent: "#a855f7",
    templateId: "lens-craft",
  },
];

type SaveStatus = "idle" | "saving" | "saved" | "error";

function calculateCompletion(userData: any): number {
  const stream = userData?.profile?.domain;
  const base = [
    userData?.profile?.name,
    userData?.profile?.bio,
    userData?.templateId,
  ];
  if (stream === "Developer") {
    return Math.round(([
      ...base,
      userData?.profile?.socialLinks?.github,
      userData?.projects?.length > 0,
      userData?.skills && Object.values(userData.skills).some((a: any) => a?.length > 0),
    ].filter(Boolean).length / 6) * 100) || 0;
  }
  if (stream === "Graphic Designer" || stream === "Photographer") {
    return Math.round(([
      ...base,
      userData?.profile?.galleryImages?.length > 0,
      userData?.profile?.services?.length > 0,
    ].filter(Boolean).length / 5) * 100) || 0;
  }
  return Math.round((base.filter(Boolean).length / base.length) * 100) || 0;
}

function SaveButton({ status, onClick, label = "Save Changes" }: { status: SaveStatus; onClick: () => void; label?: string }) {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={status === "saving"}
      className={`w-full h-12 rounded-xl font-bold transition-all ${
        status === "saved" ? "bg-emerald-500 hover:bg-emerald-600 text-white"
        : status === "error" ? "bg-red-500 hover:bg-red-600 text-white"
        : "bg-white text-black hover:bg-gray-200"
      }`}
    >
      <span className="flex items-center justify-center gap-2">
        {status === "saving" && <span className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent" />}
        {status === "saving" ? "Saving..." : status === "saved" ? <><CheckCircle2 className="w-4 h-4" /> Saved</> : status === "error" ? "Failed — Retry?" : label}
      </span>
    </Button>
  );
}

// ─── Stream Nav Config ──────────────────────────────────────────────────────

function getNavItems(stream: string) {
  if (stream === "Developer") {
    return [
      { id: "profile", label: "Identity", icon: <MonitorSmartphone size={17} /> },
      { id: "projects", label: "Projects", icon: <LayoutTemplate size={17} /> },
      { id: "experience", label: "Experience", icon: <Briefcase size={17} /> },
      { id: "skills", label: "Skills", icon: <Terminal size={17} /> },
    ];
  }
  if (stream === "Graphic Designer") {
    return [
      { id: "profile", label: "Identity", icon: <MonitorSmartphone size={17} /> },
      { id: "gallery", label: "Portfolio Gallery", icon: <Image size={17} /> },
      { id: "services", label: "Services", icon: <Layers size={17} /> },
      { id: "testimonials", label: "Testimonials", icon: <Star size={17} /> },
    ];
  }
  if (stream === "Photographer") {
    return [
      { id: "profile", label: "Identity", icon: <MonitorSmartphone size={17} /> },
      { id: "gallery", label: "Photo Gallery", icon: <Camera size={17} /> },
      { id: "services", label: "Services", icon: <Layers size={17} /> },
      { id: "testimonials", label: "Testimonials", icon: <Star size={17} /> },
    ];
  }
  return [
    { id: "stream", label: "Choose Stream", icon: <Layers size={17} /> },
  ];
}

// ─── Main Dashboard ─────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("stream");

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
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);

  useEffect(() => {
    if (user && !localData) {
      setLocalData(user);
      const stream = user?.profile?.domain;
      if (stream && (stream === "Developer" || stream === "Graphic Designer" || stream === "Photographer")) {
        setActiveTab("profile");
      } else {
        setActiveTab("stream");
      }
    }
  }, [user]);

  if (isLoading || !localData) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white" />
      </div>
    );
  }

  const currentStream = localData.profile?.domain || "";
  const isStreamSelected = currentStream === "Developer" || currentStream === "Graphic Designer" || currentStream === "Photographer";
  const completion = calculateCompletion(localData);
  const initials = (localData.profile?.name || localData.username || "U").charAt(0).toUpperCase();
  const TemplatePreview = templateMap[localData.templateId] || templateMap["minimal-universal"];
  const navItems = isStreamSelected ? getNavItems(currentStream) : [];
  const streamConfig = STREAMS.find(s => s.id === currentStream);

  const handleStreamSelect = (stream: typeof STREAMS[0]) => {
    const templateId = stream.templateId;
    const updatedData = {
      ...localData,
      templateId,
      profile: { ...localData.profile, domain: stream.id },
    };
    setLocalData(updatedData);
    updateProfile.mutate(
      { data: { profile: updatedData.profile, templateId } },
      {
        onSuccess: () => {
          updateTemplate.mutate({ data: { templateId } });
          toast({ title: `Stream set: ${stream.label}` });
          setActiveTab("profile");
        },
      }
    );
  };

  const isPhotographerStream = currentStream === "Photographer";

  return (
    <div className="h-screen flex bg-[#030303] text-white font-sans overflow-hidden">
      {/* Fullscreen Preview Overlay (Photographer only) */}
      {isFullscreenPreview && isPhotographerStream && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/8 bg-[#080808]">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
              <Eye size={13} /> Full Preview — LensCraft
            </span>
            <button onClick={() => setIsFullscreenPreview(false)} className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">
              <Minimize2 size={14} /> Exit Preview
            </button>
          </div>
          <div className="flex-1 overflow-auto">
            {TemplatePreview ? <TemplatePreview data={localData} /> : null}
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-[265px] shrink-0 border-r border-white/10 flex flex-col bg-[#080808]">
        <div className="p-5 flex-1 overflow-y-auto">
          <div className="flex items-center gap-2 mb-7 text-white/90">
            <Code2 className="w-5 h-5 text-purple-500" />
            <span className="font-bold tracking-tight">CodeFolio</span>
          </div>

          {/* User Card */}
          <div className="bg-[#111] border border-white/5 rounded-2xl p-4 mb-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 to-transparent" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-base shadow-inner shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate text-sm">{localData.profile?.name || localData.username}</div>
                <div className="text-xs text-gray-500 truncate">@{localData.username}</div>
              </div>
            </div>
            {isStreamSelected && (
              <div className="relative z-10 mt-3">
                <div className="flex justify-between text-[10px] text-gray-500 mb-1 uppercase tracking-wider font-semibold">
                  <span>Profile</span><span>{completion}%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-500" style={{ width: `${completion}%` }} />
                </div>
              </div>
            )}
          </div>

          {/* Stream Badge */}
          {isStreamSelected && streamConfig && (
            <button
              onClick={() => setActiveTab("stream")}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl border border-white/8 bg-white/3 hover:bg-white/6 transition-all mb-4 text-left"
            >
              <div style={{ color: streamConfig.accent }}>{streamConfig.icon && <span className="scale-75 inline-block">{streamConfig.icon}</span>}</div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white truncate">{currentStream}</div>
                <div className="text-[10px] text-gray-500">Change stream</div>
              </div>
              <ChevronRight size={14} className="text-gray-600 shrink-0" />
            </button>
          )}

          {/* Nav */}
          {isStreamSelected && (
            <nav className="flex flex-col gap-0.5">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === item.id
                      ? "bg-white/10 text-white"
                      : "text-gray-500 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          )}
        </div>

        <div className="p-4 border-t border-white/5 flex flex-col gap-0.5">
          <Link href={`/${user?.username}`}>
            <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
              <ExternalLink size={15} /> View Live
            </button>
          </Link>
          <button
            onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/${user?.username}`); toast({ title: "URL copied!" }); }}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Copy size={15} /> Copy URL
          </button>
          <button
            onClick={() => { logout(); setLocation("/"); }}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-red-400 hover:bg-white/5 transition-colors"
          >
            <LogOut size={15} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#030303]">
        <div className={`mx-auto p-8 lg:p-10 pb-32 ${isPhotographerStream ? "max-w-4xl" : "max-w-3xl"}`}>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>

              {activeTab === "stream" && (
                <StreamSelector
                  currentStream={currentStream}
                  onSelect={handleStreamSelect}
                  isStreamSelected={isStreamSelected}
                />
              )}

              {/* Developer tabs */}
              {activeTab === "profile" && currentStream === "Developer" && (
                <DeveloperProfileForm user={user} localData={localData} setLocalData={setLocalData} updateProfile={updateProfile} />
              )}
              {activeTab === "projects" && currentStream === "Developer" && (
                <ProjectsForm user={user} localData={localData} setLocalData={setLocalData} updateProjects={updateProjects} />
              )}
              {activeTab === "experience" && currentStream === "Developer" && (
                <ExperienceForm user={user} localData={localData} setLocalData={setLocalData} updateProfile={updateProfile} />
              )}
              {activeTab === "skills" && currentStream === "Developer" && (
                <SkillsForm user={user} localData={localData} setLocalData={setLocalData} updateSkills={updateSkills} />
              )}

              {/* Graphic Designer tabs */}
              {activeTab === "profile" && currentStream === "Graphic Designer" && (
                <DesignerProfileForm user={user} localData={localData} setLocalData={setLocalData} updateProfile={updateProfile} />
              )}
              {activeTab === "gallery" && currentStream === "Graphic Designer" && (
                <GalleryForm user={user} localData={localData} setLocalData={setLocalData} updateProfile={updateProfile} streamLabel="Design Portfolio" />
              )}
              {activeTab === "services" && currentStream === "Graphic Designer" && (
                <ServicesForm user={user} localData={localData} setLocalData={setLocalData} updateProfile={updateProfile} />
              )}
              {activeTab === "testimonials" && (currentStream === "Graphic Designer") && (
                <TestimonialsForm user={user} localData={localData} setLocalData={setLocalData} updateProfile={updateProfile} />
              )}

              {/* Photographer tabs */}
              {activeTab === "profile" && currentStream === "Photographer" && (
                <PhotographerProfileForm user={user} localData={localData} setLocalData={setLocalData} updateProfile={updateProfile} />
              )}
              {activeTab === "gallery" && currentStream === "Photographer" && (
                <GalleryForm user={user} localData={localData} setLocalData={setLocalData} updateProfile={updateProfile} streamLabel="Photo Gallery" isPhotographer />
              )}
              {activeTab === "services" && currentStream === "Photographer" && (
                <ServicesForm user={user} localData={localData} setLocalData={setLocalData} updateProfile={updateProfile} />
              )}
              {activeTab === "testimonials" && currentStream === "Photographer" && (
                <TestimonialsForm user={user} localData={localData} setLocalData={setLocalData} updateProfile={updateProfile} />
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Live Preview */}
      <aside className={`hidden xl:flex flex-col border-l border-white/10 bg-[#000] ${isPhotographerStream ? "w-[480px]" : "w-[430px]"}`}>
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Live Preview</span>
            {isPhotographerStream && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-purple-500/15 text-purple-400 font-semibold uppercase tracking-wider">LensCraft</span>
            )}
          </div>
          {isPhotographerStream && (
            <button
              onClick={() => setIsFullscreenPreview(true)}
              className="flex items-center gap-1.5 text-[10px] text-gray-600 hover:text-purple-400 transition-colors px-2 py-1 rounded-lg hover:bg-white/4"
            >
              <Maximize2 size={12} /> Fullscreen
            </button>
          )}
        </div>
        <div className="flex-1 overflow-hidden relative flex items-start justify-center bg-[#040404] p-4">
          <div
            className="w-full rounded-2xl overflow-hidden border border-white/8 shadow-2xl bg-black"
            style={{ zoom: isPhotographerStream ? 0.48 : 0.55, transformOrigin: "top center", width: "100%", minWidth: 390, height: 844 }}
          >
            {TemplatePreview ? <TemplatePreview data={localData} /> : null}
          </div>
        </div>
        {isPhotographerStream && (
          <div className="p-3 border-t border-white/5 text-center">
            <p className="text-[9px] text-gray-700 uppercase tracking-widest">Cinematic · Luxury · Immersive</p>
          </div>
        )}
      </aside>
    </div>
  );
}

// ─── Stream Selector ─────────────────────────────────────────────────────────

function StreamSelector({ currentStream, onSelect, isStreamSelected }: any) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Choose Your Stream</h2>
        <p className="text-gray-500 text-base">Select your profession — each stream gives you a specialized portfolio layout, form set, and template.</p>
      </div>

      <div className="grid gap-4">
        {STREAMS.map(stream => {
          const isActive = currentStream === stream.id;
          return (
            <button
              key={stream.id}
              onClick={() => onSelect(stream)}
              className={`relative flex items-center gap-5 p-6 rounded-2xl border text-left transition-all group overflow-hidden ${
                isActive
                  ? `border-white/30 bg-gradient-to-br ${stream.gradient}`
                  : "border-white/8 bg-white/3 hover:border-white/20 hover:bg-white/5"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stream.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div
                className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: `${stream.accent}20`, color: stream.accent }}
              >
                {stream.icon}
              </div>
              <div className="relative z-10 flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-white">{stream.label}</h3>
                  {isActive && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ background: `${stream.accent}30`, color: stream.accent }}>Active</span>}
                </div>
                <p className="text-sm text-gray-500">{stream.subtitle}</p>
              </div>
              {isActive ? (
                <CheckCircle2 size={20} className="relative z-10 shrink-0" style={{ color: stream.accent }} />
              ) : (
                <ChevronRight size={20} className="relative z-10 shrink-0 text-gray-600 group-hover:text-white transition-colors" />
              )}
            </button>
          );
        })}
      </div>

      {isStreamSelected && (
        <div className="p-4 rounded-2xl bg-white/3 border border-white/8 text-center">
          <p className="text-sm text-gray-500 mb-3">Your stream is set to <span className="text-white font-semibold">{currentStream}</span>.</p>
          <p className="text-xs text-gray-600">Switching streams will change your template. Your data is preserved.</p>
        </div>
      )}
    </div>
  );
}

// ─── Shared Field Components ─────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{children}</label>;
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <FieldLabel>{label}</FieldLabel>
      {children}
    </div>
  );
}

const inputCls = "bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-purple-500 placeholder:text-gray-700";
const textareaCls = "bg-white/5 border-white/10 text-white rounded-xl focus:border-purple-500 resize-none placeholder:text-gray-700";
const sectionCls = "pt-8 border-t border-white/8";

// ─── Developer Profile Form ──────────────────────────────────────────────────

function DeveloperProfileForm({ user, localData, setLocalData, updateProfile }: any) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const readData = useCallback(() => {
    const fd = new FormData(formRef.current!);
    return {
      profile: {
        ...localData.profile,
        name: fd.get("name") as string,
        role: fd.get("role") as string,
        bio: fd.get("bio") as string,
        avatarUrl: fd.get("avatarUrl") as string,
        resumeUrl: fd.get("resumeUrl") as string,
        domain: "Developer",
        socialLinks: {
          github: fd.get("github") as string,
          linkedin: fd.get("linkedin") as string,
          twitter: fd.get("twitter") as string,
          website: fd.get("website") as string,
        },
        codingProfiles: {
          leetcode: fd.get("leetcode") as string,
          hackerrank: fd.get("hackerrank") as string,
          codeforces: fd.get("codeforces") as string,
          kaggle: fd.get("kaggle") as string,
        },
      },
      contactEmail: fd.get("contactEmail") as string,
    };
  }, [localData.profile]);

  const handleChange = () => {
    const d = readData();
    setLocalData((prev: any) => ({ ...prev, profile: d.profile }));
  };

  const handleSave = () => {
    setSaveStatus("saving");
    updateProfile.mutate({ data: readData() }, {
      onSuccess: () => { setSaveStatus("saved"); setTimeout(() => setSaveStatus("idle"), 2000); },
      onError: () => setSaveStatus("error"),
    });
  };

  return (
    <form ref={formRef} onChange={handleChange} className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold mb-1 tracking-tight">Developer Identity</h2>
        <p className="text-gray-500 text-sm mb-8">Your profile info — shown in the hero and about sections.</p>
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <FormField label="Full Name">
              <Input name="name" defaultValue={localData.profile?.name || ""} className={inputCls} placeholder="John Doe" />
            </FormField>
            <FormField label="Role / Title">
              <Input name="role" defaultValue={localData.profile?.role || ""} className={inputCls} placeholder="Full Stack Developer" />
            </FormField>
          </div>
          <FormField label="Bio">
            <Textarea name="bio" defaultValue={localData.profile?.bio || ""} className={`${textareaCls} h-24`} placeholder="I build scalable web apps..." />
          </FormField>
          <div className="grid grid-cols-2 gap-5">
            <FormField label="Avatar URL">
              <Input name="avatarUrl" defaultValue={localData.profile?.avatarUrl || ""} className={inputCls} placeholder="https://..." />
            </FormField>
            <FormField label="Resume Link">
              <Input name="resumeUrl" defaultValue={localData.profile?.resumeUrl || ""} className={inputCls} placeholder="Link to PDF" />
            </FormField>
          </div>
        </div>
      </div>

      <div className={sectionCls}>
        <h3 className="text-lg font-bold mb-5">Social Links</h3>
        <div className="grid grid-cols-2 gap-5">
          <FormField label="GitHub">
            <Input name="github" defaultValue={localData.profile?.socialLinks?.github || ""} className={inputCls} placeholder="https://github.com/..." />
          </FormField>
          <FormField label="LinkedIn">
            <Input name="linkedin" defaultValue={localData.profile?.socialLinks?.linkedin || ""} className={inputCls} placeholder="https://linkedin.com/in/..." />
          </FormField>
          <FormField label="Twitter / X">
            <Input name="twitter" defaultValue={localData.profile?.socialLinks?.twitter || ""} className={inputCls} placeholder="https://x.com/..." />
          </FormField>
          <FormField label="Website">
            <Input name="website" defaultValue={localData.profile?.socialLinks?.website || ""} className={inputCls} placeholder="https://..." />
          </FormField>
        </div>
      </div>

      <div className={sectionCls}>
        <h3 className="text-lg font-bold mb-5">Coding Profiles</h3>
        <div className="grid grid-cols-2 gap-5">
          <FormField label="LeetCode">
            <Input name="leetcode" defaultValue={localData.profile?.codingProfiles?.leetcode || ""} className={inputCls} placeholder="https://leetcode.com/..." />
          </FormField>
          <FormField label="HackerRank">
            <Input name="hackerrank" defaultValue={localData.profile?.codingProfiles?.hackerrank || ""} className={inputCls} placeholder="https://hackerrank.com/..." />
          </FormField>
          <FormField label="Codeforces">
            <Input name="codeforces" defaultValue={localData.profile?.codingProfiles?.codeforces || ""} className={inputCls} placeholder="https://codeforces.com/..." />
          </FormField>
          <FormField label="Kaggle">
            <Input name="kaggle" defaultValue={localData.profile?.codingProfiles?.kaggle || ""} className={inputCls} placeholder="https://kaggle.com/..." />
          </FormField>
        </div>
      </div>

      <div className={sectionCls}>
        <div className="grid grid-cols-2 gap-5">
          <FormField label="Public Contact Email">
            <Input name="contactEmail" defaultValue={user?.email || ""} className={inputCls} />
          </FormField>
        </div>
      </div>

      <div className="sticky bottom-8 z-20 pt-4">
        <SaveButton status={saveStatus} onClick={handleSave} />
      </div>
    </form>
  );
}

// ─── Graphic Designer Profile Form ──────────────────────────────────────────

function DesignerProfileForm({ user, localData, setLocalData, updateProfile }: any) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const readData = useCallback(() => {
    const fd = new FormData(formRef.current!);
    return {
      profile: {
        ...localData.profile,
        name: fd.get("name") as string,
        bio: fd.get("bio") as string,
        avatarUrl: fd.get("avatarUrl") as string,
        domain: "Graphic Designer",
        socialLinks: {
          linkedin: fd.get("linkedin") as string,
          instagram: fd.get("instagram") as string,
          behance: fd.get("behance") as string,
          dribbble: fd.get("dribbble") as string,
          website: fd.get("website") as string,
        },
      },
      contactEmail: fd.get("contactEmail") as string,
    };
  }, [localData.profile]);

  const handleChange = () => {
    setLocalData((prev: any) => ({ ...prev, profile: readData().profile }));
  };

  const handleSave = () => {
    setSaveStatus("saving");
    updateProfile.mutate({ data: readData() }, {
      onSuccess: () => { setSaveStatus("saved"); setTimeout(() => setSaveStatus("idle"), 2000); },
      onError: () => setSaveStatus("error"),
    });
  };

  return (
    <form ref={formRef} onChange={handleChange} className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold mb-1 tracking-tight">Designer Identity</h2>
        <p className="text-gray-500 text-sm mb-8">Your profile shown in the hero and about sections.</p>
        <div className="space-y-5">
          <FormField label="Designer Name">
            <Input name="name" defaultValue={localData.profile?.name || ""} className={inputCls} placeholder="Jane Smith" />
          </FormField>
          <FormField label="Bio">
            <Textarea name="bio" defaultValue={localData.profile?.bio || ""} className={`${textareaCls} h-24`} placeholder="Visual storyteller crafting beautiful identities..." />
          </FormField>
          <FormField label="Avatar URL">
            <Input name="avatarUrl" defaultValue={localData.profile?.avatarUrl || ""} className={inputCls} placeholder="https://..." />
          </FormField>
        </div>
      </div>

      <div className={sectionCls}>
        <h3 className="text-lg font-bold mb-5">Designer Social Links</h3>
        <div className="grid grid-cols-2 gap-5">
          <FormField label="Behance">
            <Input name="behance" defaultValue={localData.profile?.socialLinks?.behance || ""} className={inputCls} placeholder="https://behance.net/..." />
          </FormField>
          <FormField label="Dribbble">
            <Input name="dribbble" defaultValue={localData.profile?.socialLinks?.dribbble || ""} className={inputCls} placeholder="https://dribbble.com/..." />
          </FormField>
          <FormField label="Instagram">
            <Input name="instagram" defaultValue={localData.profile?.socialLinks?.instagram || ""} className={inputCls} placeholder="https://instagram.com/..." />
          </FormField>
          <FormField label="LinkedIn">
            <Input name="linkedin" defaultValue={localData.profile?.socialLinks?.linkedin || ""} className={inputCls} placeholder="https://linkedin.com/in/..." />
          </FormField>
          <FormField label="Website">
            <Input name="website" defaultValue={localData.profile?.socialLinks?.website || ""} className={inputCls} placeholder="https://..." />
          </FormField>
          <FormField label="Contact Email">
            <Input name="contactEmail" defaultValue={user?.email || ""} className={inputCls} />
          </FormField>
        </div>
      </div>

      <div className="sticky bottom-8 z-20 pt-4">
        <SaveButton status={saveStatus} onClick={handleSave} />
      </div>
    </form>
  );
}

// ─── Photographer Profile Form ───────────────────────────────────────────────

function PhotographerProfileForm({ user, localData, setLocalData, updateProfile }: any) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [coverPreview, setCoverPreview] = useState<string>(localData.profile?.coverImageUrl || "");
  const [avatarPreview, setAvatarPreview] = useState<string>(localData.profile?.avatarUrl || "");
  const formRef = useRef<HTMLFormElement>(null);

  const readData = useCallback(() => {
    const fd = new FormData(formRef.current!);
    return {
      profile: {
        ...localData.profile,
        name: fd.get("name") as string,
        bio: fd.get("bio") as string,
        avatarUrl: fd.get("avatarUrl") as string,
        coverImageUrl: fd.get("coverImageUrl") as string,
        photographyStyle: fd.get("photographyStyle") as string,
        location: fd.get("location") as string,
        domain: "Photographer",
        socialLinks: {
          instagram: fd.get("instagram") as string,
          website: fd.get("website") as string,
          linkedin: fd.get("linkedin") as string,
        },
      },
      contactEmail: fd.get("contactEmail") as string,
    };
  }, [localData.profile]);

  const handleChange = () => {
    const d = readData();
    setLocalData((prev: any) => ({ ...prev, profile: d.profile }));
    const fd = new FormData(formRef.current!);
    setCoverPreview(fd.get("coverImageUrl") as string || "");
    setAvatarPreview(fd.get("avatarUrl") as string || "");
  };

  const handleSave = () => {
    setSaveStatus("saving");
    updateProfile.mutate({ data: readData() }, {
      onSuccess: () => { setSaveStatus("saved"); setTimeout(() => setSaveStatus("idle"), 2000); },
      onError: () => setSaveStatus("error"),
    });
  };

  return (
    <form ref={formRef} onChange={handleChange} className="space-y-0">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <Camera size={18} className="text-purple-400" />
          <h2 className="text-2xl font-bold tracking-tight">Photographer Identity</h2>
        </div>
        <p className="text-gray-500 text-sm">Your profile shown in the cinematic hero section of your portfolio.</p>
      </div>

      {/* Hero / Cover Image — most prominent */}
      <div className="mb-8">
        <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d0d]"
          style={{ height: coverPreview ? 200 : 130 }}>
          {coverPreview ? (
            <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-700">
              <Camera size={28} strokeWidth={1} />
              <span className="text-xs tracking-wider uppercase">Hero Background Image</span>
            </div>
          )}
          {coverPreview && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <FieldLabel>Hero Background Image URL</FieldLabel>
            <Input
              name="coverImageUrl"
              defaultValue={localData.profile?.coverImageUrl || ""}
              className="mt-1.5 bg-black/60 backdrop-blur border-white/15 text-white h-10 rounded-xl focus:border-purple-500 placeholder:text-gray-600 text-sm"
              placeholder="https://... (appears behind your name in the hero)"
            />
          </div>
        </div>
      </div>

      {/* Name + Style row */}
      <div className="grid grid-cols-2 gap-5 mb-6">
        <FormField label="Full Name">
          <Input name="name" defaultValue={localData.profile?.name || ""} className={inputCls} placeholder="Alex Rivera" />
        </FormField>
        <FormField label="Photography Style">
          <Input name="photographyStyle" defaultValue={localData.profile?.photographyStyle || ""} className={inputCls} placeholder="Portrait · Editorial · Wedding" />
        </FormField>
      </div>

      {/* Bio */}
      <div className="mb-6">
        <FormField label="Bio">
          <Textarea name="bio" defaultValue={localData.profile?.bio || ""} className={`${textareaCls} h-28`}
            placeholder="Capturing raw emotion and cinematic moments. Based in New York, available worldwide." />
        </FormField>
      </div>

      {/* Avatar + Location */}
      <div className="grid grid-cols-2 gap-5 mb-2">
        <div className="space-y-2">
          <FieldLabel>Avatar / Profile Photo URL</FieldLabel>
          <div className="flex gap-2 items-center">
            {avatarPreview && (
              <img src={avatarPreview} alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-white/15 shrink-0" />
            )}
            <Input name="avatarUrl" defaultValue={localData.profile?.avatarUrl || ""} className={inputCls} placeholder="https://..." />
          </div>
        </div>
        <FormField label="Location">
          <Input name="location" defaultValue={localData.profile?.location || ""} className={inputCls} placeholder="New York, USA" />
        </FormField>
      </div>

      {/* Social & Contact */}
      <div className="pt-8 mt-8 border-t border-white/8 space-y-5">
        <div>
          <h3 className="text-sm font-bold text-white mb-1">Social & Contact</h3>
          <p className="text-xs text-gray-600">Links shown in your hero and contact sections.</p>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <FormField label="Instagram URL">
            <Input name="instagram" defaultValue={localData.profile?.socialLinks?.instagram || ""} className={inputCls} placeholder="https://instagram.com/..." />
          </FormField>
          <FormField label="Website">
            <Input name="website" defaultValue={localData.profile?.socialLinks?.website || ""} className={inputCls} placeholder="https://..." />
          </FormField>
          <FormField label="LinkedIn">
            <Input name="linkedin" defaultValue={localData.profile?.socialLinks?.linkedin || ""} className={inputCls} placeholder="https://linkedin.com/in/..." />
          </FormField>
          <FormField label="Contact Email">
            <Input name="contactEmail" defaultValue={user?.email || ""} className={inputCls} />
          </FormField>
        </div>
      </div>

      <div className="sticky bottom-8 z-20 pt-8">
        <SaveButton status={saveStatus} onClick={handleSave} />
      </div>
    </form>
  );
}

// ─── Projects Form (Developer) ───────────────────────────────────────────────

function ProjectsForm({ user, localData, setLocalData, updateProjects }: any) {
  const [projects, setProjects] = useState<any[]>(localData.projects || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const applyProjects = (updated: any[]) => {
    setProjects(updated);
    setLocalData((prev: any) => ({ ...prev, projects: updated }));
  };

  const handleSaveAll = () => {
    setSaveStatus("saving");
    updateProjects.mutate({ data: { projects } }, {
      onSuccess: () => { setSaveStatus("saved"); setTimeout(() => setSaveStatus("idle"), 2000); },
      onError: () => setSaveStatus("error"),
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const project = {
      id: editingId === "new" ? Math.random().toString(36).substring(7) : editingId,
      title: fd.get("title") as string,
      description: fd.get("description") as string,
      techStack: (fd.get("techStack") as string).split(",").map(s => s.trim()).filter(Boolean),
      repoLink: fd.get("repoLink") as string,
      liveLink: fd.get("liveLink") as string,
      screenshotUrl: fd.get("screenshotUrl") as string,
    };
    const updated = editingId === "new" ? [...projects, project] : projects.map(p => p.id === editingId ? project : p);
    applyProjects(updated);
    setEditingId(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          <p className="text-gray-500 text-sm mt-1">Showcase your best work with live demos and GitHub links.</p>
        </div>
        {!editingId && (
          <Button onClick={() => setEditingId("new")} className="bg-white/10 hover:bg-white/20 text-white rounded-xl">
            <Plus size={15} className="mr-2" /> Add Project
          </Button>
        )}
      </div>

      {editingId && (
        <div className="bg-white/4 border border-white/10 rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">{editingId === "new" ? "New Project" : "Edit Project"}</h3>
              <button type="button" onClick={() => setEditingId(null)} className="text-gray-500 hover:text-white"><ArrowLeft size={16} /></button>
            </div>
            <FormField label="Title">
              <Input name="title" defaultValue={projects.find(p => p.id === editingId)?.title || ""} required className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" />
            </FormField>
            <FormField label="Description">
              <Textarea name="description" defaultValue={projects.find(p => p.id === editingId)?.description || ""} className="bg-black/40 border-white/10 text-white h-24 rounded-xl focus:border-purple-500 resize-none" />
            </FormField>
            <FormField label="Tech Stack (comma separated)">
              <Input name="techStack" defaultValue={projects.find(p => p.id === editingId)?.techStack?.join(", ") || ""} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" placeholder="React, TypeScript, Node.js" />
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="GitHub Repo">
                <Input name="repoLink" defaultValue={projects.find(p => p.id === editingId)?.repoLink || ""} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" placeholder="https://github.com/..." />
              </FormField>
              <FormField label="Live Demo">
                <Input name="liveLink" defaultValue={projects.find(p => p.id === editingId)?.liveLink || ""} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" placeholder="https://..." />
              </FormField>
            </div>
            <FormField label="Screenshot URL">
              <Input name="screenshotUrl" defaultValue={projects.find(p => p.id === editingId)?.screenshotUrl || ""} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" placeholder="https://..." />
            </FormField>
            <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
              <Button type="button" variant="ghost" onClick={() => setEditingId(null)} className="text-gray-400 hover:text-white rounded-xl">Cancel</Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl">Save Project</Button>
            </div>
          </form>
        </div>
      )}

      {!editingId && projects.length > 0 && (
        <div className="grid gap-3">
          {projects.map(p => (
            <div key={p.id} className="bg-white/4 border border-white/8 rounded-2xl p-5 flex justify-between group hover:border-white/18 transition-colors">
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-base mb-1">{p.title}</h4>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.techStack?.map((t: string) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] font-medium text-gray-400">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4 shrink-0">
                <Button size="icon" variant="ghost" onClick={() => setEditingId(p.id)} className="h-8 w-8 text-gray-400 hover:text-white"><Edit2 size={13} /></Button>
                <Button size="icon" variant="ghost" onClick={() => applyProjects(projects.filter(pr => pr.id !== p.id))} className="h-8 w-8 text-gray-400 hover:text-red-400"><Trash2 size={13} /></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!editingId && projects.length === 0 && (
        <div className="text-center py-12 border border-white/8 border-dashed rounded-2xl text-gray-600 text-sm">
          No projects yet — add your first project.
        </div>
      )}

      {!editingId && (
        <div className="sticky bottom-8 z-20 pt-6">
          <SaveButton status={saveStatus} onClick={handleSaveAll} label="Save Projects" />
        </div>
      )}
    </div>
  );
}

// ─── Experience Form (Developer) ─────────────────────────────────────────────

function ExperienceForm({ user, localData, setLocalData, updateProfile }: any) {
  const [items, setItems] = useState<any[]>(localData.profile?.experience || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const applyItems = (updated: any[]) => {
    setItems(updated);
    setLocalData((prev: any) => ({ ...prev, profile: { ...prev.profile, experience: updated } }));
  };

  const handleSave = () => {
    setSaveStatus("saving");
    updateProfile.mutate({ data: { profile: { ...localData.profile, experience: items } } }, {
      onSuccess: () => { setSaveStatus("saved"); setTimeout(() => setSaveStatus("idle"), 2000); },
      onError: () => setSaveStatus("error"),
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const item = {
      id: editingId === "new" ? Math.random().toString(36).substring(7) : editingId,
      company: fd.get("company") as string,
      role: fd.get("role") as string,
      duration: fd.get("duration") as string,
      description: fd.get("description") as string,
    };
    const updated = editingId === "new" ? [...items, item] : items.map(i => i.id === editingId ? item : i);
    applyItems(updated);
    setEditingId(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
          <p className="text-gray-500 text-sm mt-1">Your work history — displayed as a timeline.</p>
        </div>
        {!editingId && (
          <Button onClick={() => setEditingId("new")} className="bg-white/10 hover:bg-white/20 text-white rounded-xl">
            <Plus size={15} className="mr-2" /> Add Role
          </Button>
        )}
      </div>

      {editingId && (
        <div className="bg-white/4 border border-white/10 rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">{editingId === "new" ? "New Role" : "Edit Role"}</h3>
              <button type="button" onClick={() => setEditingId(null)} className="text-gray-500 hover:text-white"><ArrowLeft size={16} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Company">
                <Input name="company" defaultValue={items.find(i => i.id === editingId)?.company || ""} required className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" placeholder="Acme Corp" />
              </FormField>
              <FormField label="Role">
                <Input name="role" defaultValue={items.find(i => i.id === editingId)?.role || ""} required className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" placeholder="Senior Developer" />
              </FormField>
            </div>
            <FormField label="Duration">
              <Input name="duration" defaultValue={items.find(i => i.id === editingId)?.duration || ""} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" placeholder="Jan 2022 – Present" />
            </FormField>
            <FormField label="Description">
              <Textarea name="description" defaultValue={items.find(i => i.id === editingId)?.description || ""} className="bg-black/40 border-white/10 text-white h-20 rounded-xl focus:border-purple-500 resize-none" placeholder="Key achievements and responsibilities..." />
            </FormField>
            <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
              <Button type="button" variant="ghost" onClick={() => setEditingId(null)} className="text-gray-400 hover:text-white rounded-xl">Cancel</Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl">Save</Button>
            </div>
          </form>
        </div>
      )}

      {!editingId && items.length > 0 && (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-white/4 border border-white/8 rounded-2xl p-5 flex justify-between group hover:border-white/18 transition-colors">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-bold text-base">{item.role}</h4>
                  <span className="text-sm text-gray-500">@ {item.company}</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{item.duration}</p>
                {item.description && <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>}
              </div>
              <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4 shrink-0">
                <Button size="icon" variant="ghost" onClick={() => setEditingId(item.id)} className="h-8 w-8 text-gray-400 hover:text-white"><Edit2 size={13} /></Button>
                <Button size="icon" variant="ghost" onClick={() => applyItems(items.filter(i => i.id !== item.id))} className="h-8 w-8 text-gray-400 hover:text-red-400"><Trash2 size={13} /></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!editingId && items.length === 0 && (
        <div className="text-center py-12 border border-white/8 border-dashed rounded-2xl text-gray-600 text-sm">
          No experience added yet.
        </div>
      )}

      {!editingId && (
        <div className="sticky bottom-8 z-20 pt-6">
          <SaveButton status={saveStatus} onClick={handleSave} label="Save Experience" />
        </div>
      )}
    </div>
  );
}

// ─── Skills Form (Developer) ─────────────────────────────────────────────────

function SkillsForm({ user, localData, setLocalData, updateSkills }: any) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const getSkills = useCallback(() => ({
    frontend: (new FormData(formRef.current!).get("frontend") as string).split(",").map(s => s.trim()).filter(Boolean),
    backend: (new FormData(formRef.current!).get("backend") as string).split(",").map(s => s.trim()).filter(Boolean),
    devops: (new FormData(formRef.current!).get("devops") as string).split(",").map(s => s.trim()).filter(Boolean),
    other: (new FormData(formRef.current!).get("other") as string).split(",").map(s => s.trim()).filter(Boolean),
    tools: (new FormData(formRef.current!).get("tools") as string).split(",").map(s => s.trim()).filter(Boolean),
  }), []);

  const handleChange = () => {
    setLocalData((prev: any) => ({ ...prev, skills: getSkills() }));
  };

  const handleSave = () => {
    setSaveStatus("saving");
    updateSkills.mutate({ data: { skills: getSkills() } }, {
      onSuccess: () => { setSaveStatus("saved"); setTimeout(() => setSaveStatus("idle"), 2000); },
      onError: () => setSaveStatus("error"),
    });
  };

  return (
    <form ref={formRef} onChange={handleChange} className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-1">Technical Skills</h2>
        <p className="text-gray-500 text-sm mb-8">Enter comma-separated values (e.g. React, TypeScript, Tailwind)</p>
        <div className="space-y-5">
          {[
            { name: "frontend", label: "Frontend / Client" },
            { name: "backend", label: "Backend / Server" },
            { name: "devops", label: "DevOps / Infrastructure" },
            { name: "tools", label: "Tools & Platforms" },
            { name: "other", label: "Other" },
          ].map(f => (
            <FormField key={f.name} label={f.label}>
              <Textarea name={f.name} defaultValue={(localData.skills as any)?.[f.name]?.join(", ") || ""} className={`${textareaCls} h-16`} placeholder="e.g. React, Next.js, Tailwind CSS" />
            </FormField>
          ))}
        </div>
      </div>
      <div className="sticky bottom-8 z-20 pt-4">
        <SaveButton status={saveStatus} onClick={handleSave} label="Update Skills" />
      </div>
    </form>
  );
}

// ─── Gallery Form (Designer + Photographer) ──────────────────────────────────

function GalleryForm({ user, localData, setLocalData, updateProfile, streamLabel, isPhotographer }: any) {
  const [images, setImages] = useState<any[]>(localData.profile?.galleryImages || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [categories, setCategories] = useState<string>(
    (localData.profile?.shootCategories || []).join(", ")
  );

  const applyImages = (updated: any[]) => {
    setImages(updated);
    setLocalData((prev: any) => ({ ...prev, profile: { ...prev.profile, galleryImages: updated } }));
  };

  const handleSave = () => {
    setSaveStatus("saving");
    const updatedProfile = {
      ...localData.profile,
      galleryImages: images,
      ...(isPhotographer ? { shootCategories: categories.split(",").map((s: string) => s.trim()).filter(Boolean) } : {}),
    };
    updateProfile.mutate({ data: { profile: updatedProfile } }, {
      onSuccess: () => { setSaveStatus("saved"); setTimeout(() => setSaveStatus("idle"), 2000); },
      onError: () => setSaveStatus("error"),
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const image = {
      id: editingId === "new" ? Math.random().toString(36).substring(7) : editingId,
      url: fd.get("url") as string,
      title: fd.get("title") as string,
      description: fd.get("description") as string,
      category: fd.get("category") as string,
      clientName: fd.get("clientName") as string,
    };
    const updated = editingId === "new" ? [...images, image] : images.map(img => img.id === editingId ? image : img);
    applyImages(updated);
    setEditingId(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{streamLabel}</h2>
          <p className="text-gray-500 text-sm mt-1">Add image URLs to build your gallery. Supports masonry layout with fullscreen preview.</p>
        </div>
        {!editingId && (
          <Button onClick={() => setEditingId("new")} className="bg-white/10 hover:bg-white/20 text-white rounded-xl">
            <Plus size={15} className="mr-2" /> Add Image
          </Button>
        )}
      </div>

      {isPhotographer && !editingId && (
        <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
          <FormField label="Gallery Categories (comma separated)">
            <Input
              value={categories}
              onChange={e => {
                setCategories(e.target.value);
                setLocalData((prev: any) => ({
                  ...prev,
                  profile: {
                    ...prev.profile,
                    shootCategories: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean)
                  }
                }));
              }}
              className={inputCls}
              placeholder="Portrait, Wedding, Landscape, Street"
            />
          </FormField>
        </div>
      )}

      {editingId && (
        <div className="bg-white/4 border border-white/10 rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">{editingId === "new" ? "Add Image" : "Edit Image"}</h3>
              <button type="button" onClick={() => setEditingId(null)} className="text-gray-500 hover:text-white"><ArrowLeft size={16} /></button>
            </div>
            <FormField label="Image URL *">
              <Input name="url" defaultValue={images.find(i => i.id === editingId)?.url || ""} required className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" placeholder="https://..." />
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Title">
                <Input name="title" defaultValue={images.find(i => i.id === editingId)?.title || ""} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" placeholder="Project / Shoot Title" />
              </FormField>
              <FormField label="Category">
                <Input name="category" defaultValue={images.find(i => i.id === editingId)?.category || ""} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" placeholder="Portrait, Wedding..." />
              </FormField>
            </div>
            <FormField label={isPhotographer ? "Client / Brand" : "Client / Brand Name"}>
              <Input name="clientName" defaultValue={images.find(i => i.id === editingId)?.clientName || ""} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" placeholder="Client name (optional)" />
            </FormField>
            <FormField label="Description">
              <Textarea name="description" defaultValue={images.find(i => i.id === editingId)?.description || ""} className="bg-black/40 border-white/10 text-white h-20 rounded-xl focus:border-purple-500 resize-none" placeholder="Brief description..." />
            </FormField>
            <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
              <Button type="button" variant="ghost" onClick={() => setEditingId(null)} className="text-gray-400 hover:text-white rounded-xl">Cancel</Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl">Save Image</Button>
            </div>
          </form>
        </div>
      )}

      {!editingId && images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {images.map((img, i) => (
            <div key={img.id || i} className="relative group rounded-xl overflow-hidden border border-white/8 aspect-square bg-white/3">
              <img src={img.url} alt={img.title || ""} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                {img.title && <p className="text-white text-xs font-semibold px-2 text-center">{img.title}</p>}
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => setEditingId(img.id)} className="h-8 w-8 bg-white/10 text-white hover:bg-white/20"><Edit2 size={13} /></Button>
                  <Button size="icon" variant="ghost" onClick={() => applyImages(images.filter((_, idx) => idx !== i))} className="h-8 w-8 bg-white/10 text-white hover:bg-red-500/40"><Trash2 size={13} /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!editingId && images.length === 0 && (
        <div className="text-center py-16 border border-white/8 border-dashed rounded-2xl text-gray-600 text-sm">
          <Image size={32} className="mx-auto mb-3 opacity-30" />
          <p>No images yet — add your first image above.</p>
          <p className="text-xs mt-1 text-gray-700">Tip: Use direct image URLs for best results.</p>
        </div>
      )}

      {!editingId && (
        <div className="sticky bottom-8 z-20 pt-6">
          <SaveButton status={saveStatus} onClick={handleSave} label="Save Gallery" />
        </div>
      )}
    </div>
  );
}

// ─── Services Form (Designer + Photographer) ─────────────────────────────────

function ServicesForm({ user, localData, setLocalData, updateProfile }: any) {
  const [items, setItems] = useState<any[]>(localData.profile?.services || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const applyItems = (updated: any[]) => {
    setItems(updated);
    setLocalData((prev: any) => ({ ...prev, profile: { ...prev.profile, services: updated } }));
  };

  const handleSave = () => {
    setSaveStatus("saving");
    updateProfile.mutate({ data: { profile: { ...localData.profile, services: items } } }, {
      onSuccess: () => { setSaveStatus("saved"); setTimeout(() => setSaveStatus("idle"), 2000); },
      onError: () => setSaveStatus("error"),
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const item = {
      id: editingId === "new" ? Math.random().toString(36).substring(7) : editingId,
      title: fd.get("title") as string,
      description: fd.get("description") as string,
    };
    const updated = editingId === "new" ? [...items, item] : items.map(i => i.id === editingId ? item : i);
    applyItems(updated);
    setEditingId(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Services</h2>
          <p className="text-gray-500 text-sm mt-1">What you offer — displayed as service cards.</p>
        </div>
        {!editingId && (
          <Button onClick={() => setEditingId("new")} className="bg-white/10 hover:bg-white/20 text-white rounded-xl">
            <Plus size={15} className="mr-2" /> Add Service
          </Button>
        )}
      </div>

      {editingId && (
        <div className="bg-white/4 border border-white/10 rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">{editingId === "new" ? "New Service" : "Edit Service"}</h3>
              <button type="button" onClick={() => setEditingId(null)} className="text-gray-500 hover:text-white"><ArrowLeft size={16} /></button>
            </div>
            <FormField label="Service Title">
              <Input name="title" defaultValue={items.find(i => i.id === editingId)?.title || ""} required className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" placeholder="Brand Identity Design" />
            </FormField>
            <FormField label="Description">
              <Textarea name="description" defaultValue={items.find(i => i.id === editingId)?.description || ""} className="bg-black/40 border-white/10 text-white h-24 rounded-xl focus:border-purple-500 resize-none" placeholder="What's included, your approach..." />
            </FormField>
            <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
              <Button type="button" variant="ghost" onClick={() => setEditingId(null)} className="text-gray-400 hover:text-white rounded-xl">Cancel</Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl">Save</Button>
            </div>
          </form>
        </div>
      )}

      {!editingId && items.length > 0 && (
        <div className="grid gap-3">
          {items.map(item => (
            <div key={item.id} className="bg-white/4 border border-white/8 rounded-2xl p-5 flex justify-between group hover:border-white/18 transition-colors">
              <div>
                <h4 className="font-bold text-base mb-1">{item.title}</h4>
                {item.description && <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>}
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4 shrink-0">
                <Button size="icon" variant="ghost" onClick={() => setEditingId(item.id)} className="h-8 w-8 text-gray-400 hover:text-white"><Edit2 size={13} /></Button>
                <Button size="icon" variant="ghost" onClick={() => applyItems(items.filter(i => i.id !== item.id))} className="h-8 w-8 text-gray-400 hover:text-red-400"><Trash2 size={13} /></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!editingId && items.length === 0 && (
        <div className="text-center py-12 border border-white/8 border-dashed rounded-2xl text-gray-600 text-sm">
          No services added yet.
        </div>
      )}

      {!editingId && (
        <div className="sticky bottom-8 z-20 pt-6">
          <SaveButton status={saveStatus} onClick={handleSave} label="Save Services" />
        </div>
      )}
    </div>
  );
}

// ─── Testimonials Form ───────────────────────────────────────────────────────

function TestimonialsForm({ user, localData, setLocalData, updateProfile }: any) {
  const [items, setItems] = useState<any[]>(localData.profile?.testimonials || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const applyItems = (updated: any[]) => {
    setItems(updated);
    setLocalData((prev: any) => ({ ...prev, profile: { ...prev.profile, testimonials: updated } }));
  };

  const handleSave = () => {
    setSaveStatus("saving");
    updateProfile.mutate({ data: { profile: { ...localData.profile, testimonials: items } } }, {
      onSuccess: () => { setSaveStatus("saved"); setTimeout(() => setSaveStatus("idle"), 2000); },
      onError: () => setSaveStatus("error"),
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const item = {
      id: editingId === "new" ? Math.random().toString(36).substring(7) : editingId,
      name: fd.get("name") as string,
      text: fd.get("text") as string,
      role: fd.get("role") as string,
      company: fd.get("company") as string,
    };
    const updated = editingId === "new" ? [...items, item] : items.map(i => i.id === editingId ? item : i);
    applyItems(updated);
    setEditingId(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Testimonials</h2>
          <p className="text-gray-500 text-sm mt-1">Social proof from satisfied clients — displayed as quotes.</p>
        </div>
        {!editingId && (
          <Button onClick={() => setEditingId("new")} className="bg-white/10 hover:bg-white/20 text-white rounded-xl">
            <Plus size={15} className="mr-2" /> Add Testimonial
          </Button>
        )}
      </div>

      {editingId && (
        <div className="bg-white/4 border border-white/10 rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">{editingId === "new" ? "New Testimonial" : "Edit Testimonial"}</h3>
              <button type="button" onClick={() => setEditingId(null)} className="text-gray-500 hover:text-white"><ArrowLeft size={16} /></button>
            </div>
            <FormField label="Client Name">
              <Input name="name" defaultValue={items.find(i => i.id === editingId)?.name || ""} required className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" placeholder="Sarah Johnson" />
            </FormField>
            <FormField label="Quote">
              <Textarea name="text" defaultValue={items.find(i => i.id === editingId)?.text || ""} required className="bg-black/40 border-white/10 text-white h-28 rounded-xl focus:border-purple-500 resize-none" placeholder="Working with them was incredible..." />
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Role">
                <Input name="role" defaultValue={items.find(i => i.id === editingId)?.role || ""} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" placeholder="Marketing Director" />
              </FormField>
              <FormField label="Company">
                <Input name="company" defaultValue={items.find(i => i.id === editingId)?.company || ""} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-purple-500" placeholder="Acme Inc." />
              </FormField>
            </div>
            <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
              <Button type="button" variant="ghost" onClick={() => setEditingId(null)} className="text-gray-400 hover:text-white rounded-xl">Cancel</Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl">Save</Button>
            </div>
          </form>
        </div>
      )}

      {!editingId && items.length > 0 && (
        <div className="grid gap-3">
          {items.map(item => (
            <div key={item.id} className="bg-white/4 border border-white/8 rounded-2xl p-5 flex justify-between group hover:border-white/18 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-400 italic mb-3 line-clamp-2">"{item.text}"</p>
                <div className="flex items-center gap-2">
                  <Users size={13} className="text-gray-600" />
                  <span className="font-semibold text-sm">{item.name}</span>
                  {(item.role || item.company) && <span className="text-xs text-gray-600">· {item.role}{item.role && item.company ? ', ' : ''}{item.company}</span>}
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4 shrink-0">
                <Button size="icon" variant="ghost" onClick={() => setEditingId(item.id)} className="h-8 w-8 text-gray-400 hover:text-white"><Edit2 size={13} /></Button>
                <Button size="icon" variant="ghost" onClick={() => applyItems(items.filter(i => i.id !== item.id))} className="h-8 w-8 text-gray-400 hover:text-red-400"><Trash2 size={13} /></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!editingId && items.length === 0 && (
        <div className="text-center py-12 border border-white/8 border-dashed rounded-2xl text-gray-600 text-sm">
          No testimonials added yet.
        </div>
      )}

      {!editingId && (
        <div className="sticky bottom-8 z-20 pt-6">
          <SaveButton status={saveStatus} onClick={handleSave} label="Save Testimonials" />
        </div>
      )}
    </div>
  );
}
