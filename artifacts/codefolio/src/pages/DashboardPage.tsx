import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, Link } from "wouter";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, ExternalLink, LogOut, Plus, Trash2, Edit2 } from "lucide-react";

// ─── Profile completion ───────────────────────────────────────────────────────

function calculateCompletion(userData: any): number {
  const checks = [
    userData?.profile?.name,
    userData?.profile?.bio,
    userData?.profile?.avatarUrl,
    userData?.profile?.socialLinks?.github,
    userData?.profile?.socialLinks?.linkedin,
    userData?.projects?.length > 0,
    userData?.skills?.frontend?.length > 0,
    userData?.templateId && userData?.templateId !== "minimalist",
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

// ─── Save button ──────────────────────────────────────────────────────────────

type SaveStatus = "idle" | "saving" | "saved" | "error";

function SaveButton({
  status,
  onClick,
  label = "Save",
}: {
  status: SaveStatus;
  onClick: () => void;
  label?: string;
}) {
  const bg =
    status === "saved"
      ? "linear-gradient(135deg, #065f46, #047857)"
      : status === "error"
        ? "linear-gradient(135deg, #7f1d1d, #991b1b)"
        : "linear-gradient(135deg, #7c3aed, #06b6d4)";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={status === "saving"}
      style={{
        width: "100%",
        borderRadius: 12,
        fontWeight: 700,
        color: "white",
        padding: "12px 0",
        fontSize: 14,
        background: bg,
        border: "none",
        cursor: status === "saving" ? "not-allowed" : "pointer",
        opacity: status === "saving" ? 0.75 : 1,
        transition: "all 0.2s",
      }}
    >
      {status === "saving"
        ? "Saving..."
        : status === "saved"
          ? "✓ Saved!"
          : status === "error"
            ? "Failed — Retry"
            : label}
    </button>
  );
}

// ─── Inline SVG nav icons ────────────────────────────────────────────────────

const IconProfile = () => (
  <svg style={{ width: 18, height: 18, flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconProjects = () => (
  <svg style={{ width: 18, height: 18, flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);
const IconSkills = () => (
  <svg style={{ width: 18, height: 18, flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);
const IconTemplate = () => (
  <svg style={{ width: 18, height: 18, flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const NAV_ITEMS = [
  { id: "profile", label: "Profile", Icon: IconProfile },
  { id: "projects", label: "Projects", Icon: IconProjects },
  { id: "skills", label: "Skills", Icon: IconSkills },
  { id: "theme", label: "Template", Icon: IconTemplate },
];

// ─── DashboardPage ────────────────────────────────────────────────────────────

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
      <div
        className="min-h-screen flex items-center justify-center text-white text-lg"
        style={{ background: "#0a0f1e" }}
      >
        Loading…
      </div>
    );
  }

  const completion = calculateCompletion(localData);
  const initials = (localData.profile?.name || localData.username || "U")
    .charAt(0)
    .toUpperCase();

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/${user?.username}`
    );
    toast({ title: "Portfolio URL copied!" });
  };

  const TemplatePreview =
    templateMap[localData.templateId] || templateMap.minimalist;

  return (
    <div className="h-screen flex overflow-hidden" style={{ background: "#0a0f1e" }}>
      {/* ── Sidebar ── */}
      <aside
        className="flex flex-col gap-3 overflow-y-auto shrink-0"
        style={{ width: 280, minWidth: 280, background: "#0f1629", padding: 16 }}
      >
        {/* User Card */}
        <div style={{ background: "#1a2340", borderRadius: 16, padding: 20 }}>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="flex items-center justify-center shrink-0 font-bold text-lg text-white"
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              }}
            >
              {initials}
            </div>
            <div className="min-w-0">
              <p
                className="font-semibold truncate m-0 leading-tight"
                style={{ color: "#f1f5f9", fontSize: 16 }}
              >
                {localData.profile?.name || localData.username}
              </p>
              <p
                className="m-0 truncate leading-tight mt-0.5"
                style={{ color: "#64748b", fontSize: 13 }}
              >
                @{localData.username}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: 12 }}>
            <div
              className="flex justify-between"
              style={{ fontSize: 12, color: "#94a3b8", marginBottom: 6 }}
            >
              <span>Profile completion</span>
              <span>{completion}%</span>
            </div>
            <div
              style={{
                height: 6,
                background: "#2d3748",
                borderRadius: 999,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: 999,
                  background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
                  width: `${completion}%`,
                  transition: "width 0.5s ease",
                }}
              />
            </div>
          </div>
        </div>

        {/* Nav Card */}
        <div
          style={{
            background: "#1a2340",
            borderRadius: 16,
            padding: 8,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {NAV_ITEMS.map(({ id, label, Icon }) => {
            const isActive = activeTab === id;
            return (
              <NavItem
                key={id}
                id={id}
                label={label}
                Icon={Icon}
                isActive={isActive}
                onClick={() => setActiveTab(id)}
              />
            );
          })}
        </div>

        {/* Bottom actions */}
        <div className="mt-auto flex flex-col gap-1 pt-2">
          <Link href={`/${user?.username}`}>
            <SidebarAction icon={<ExternalLink size={14} />} label="View Live" />
          </Link>
          <SidebarAction icon={<Copy size={14} />} label="Copy URL" onClick={copyUrl} />
          <SidebarAction
            icon={<LogOut size={14} />}
            label="Log out"
            onClick={handleLogout}
            muted
          />
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Content panel */}
        <div className="flex-1 overflow-y-auto" style={{ padding: 28 }}>
          {activeTab === "profile" && (
            <ProfileForm
              user={user}
              setLocalData={setLocalData}
              updateProfile={updateProfile}
            />
          )}
          {activeTab === "projects" && (
            <ProjectsForm
              user={user}
              setLocalData={setLocalData}
              updateProjects={updateProjects}
            />
          )}
          {activeTab === "skills" && (
            <SkillsForm
              user={user}
              setLocalData={setLocalData}
              updateSkills={updateSkills}
            />
          )}
          {activeTab === "theme" && (
            <ThemeSelector
              currentTemplate={localData.templateId}
              setLocalData={setLocalData}
              updateTemplate={updateTemplate}
              toast={toast}
            />
          )}
        </div>

        {/* Live preview */}
        <div
          className="hidden xl:flex flex-col items-center overflow-hidden border-l border-white/5"
          style={{ width: 420, padding: "24px 16px", background: "#080c18" }}
        >
          <p
            className="text-xs font-medium tracking-widest uppercase mb-4"
            style={{ color: "#4b5563" }}
          >
            Live Preview
          </p>
          <div
            className="w-full rounded-xl overflow-hidden border border-white/5 shadow-2xl pointer-events-none"
            style={{
              height: 700,
              transform: "scale(0.6)",
              transformOrigin: "top center",
              minWidth: 640,
            }}
          >
            <TemplatePreview data={localData} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar helpers ──────────────────────────────────────────────────────────

function NavItem({
  id,
  label,
  Icon,
  isActive,
  onClick,
}: {
  id: string;
  label: string;
  Icon: React.ComponentType;
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        padding: "10px 14px",
        borderRadius: 10,
        cursor: "pointer",
        color: isActive ? "#06b6d4" : "#94a3b8",
        background: isActive ? "#232d4a" : hovered ? "#1e2a42" : "transparent",
        fontSize: 14,
        fontWeight: 500,
        border: "none",
        outline: "none",
        textAlign: "left",
        transition: "all 0.15s",
      }}
    >
      <Icon />
      {label}
    </button>
  );
}

function SidebarAction({
  icon,
  label,
  onClick,
  muted,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  muted?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
        padding: "9px 14px",
        borderRadius: 10,
        cursor: "pointer",
        color: muted ? "#4b5563" : hovered ? "#e2e8f0" : "#64748b",
        background: hovered && !muted ? "#1e2a42" : "transparent",
        fontSize: 13,
        fontWeight: 500,
        border: "none",
        outline: "none",
        textAlign: "left",
        transition: "all 0.15s",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

// ─── ProfileForm ──────────────────────────────────────────────────────────────

function ProfileForm({ user, setLocalData, updateProfile }: any) {
  const formRef = useRef<HTMLFormElement>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [domain, setDomain] = useState<string>(user.profile?.domain || "");

  const readFormData = useCallback(() => {
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
    const data = readFormData();
    setLocalData((prev: any) => ({
      ...prev,
      profile: data.profile,
    }));
  };

  const handleDomainChange = (val: string) => {
    setDomain(val);
    setLocalData((prev: any) => ({
      ...prev,
      profile: { ...prev.profile, domain: val },
    }));
  };

  const handleSave = () => {
    const data = readFormData();
    setSaveStatus("saving");
    updateProfile.mutate(
      { data },
      {
        onSuccess: () => {
          setSaveStatus("saved");
          setTimeout(() => setSaveStatus("idle"), 2000);
        },
        onError: () => setSaveStatus("error"),
      }
    );
  };

  return (
    <form ref={formRef} onChange={handleChange} className="space-y-5 max-w-2xl">
      <SectionHeader title="Basic Info" />

      <div className="grid grid-cols-2 gap-4">
        <Field label="Full Name">
          <Input name="name" defaultValue={user.profile?.name || ""} className="bg-black/40 border-white/10 text-white" />
        </Field>
        <Field label="Domain / Role">
          <Select value={domain} onValueChange={handleDomainChange}>
            <SelectTrigger className="bg-black/40 border-white/10 text-white">
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
        </Field>
      </div>

      <Field label="Bio">
        <Textarea name="bio" defaultValue={user.profile?.bio || ""} className="bg-black/40 border-white/10 text-white h-24" />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Avatar URL">
          <Input name="avatarUrl" defaultValue={user.profile?.avatarUrl || ""} className="bg-black/40 border-white/10 text-white" />
        </Field>
        <Field label="Resume URL">
          <Input name="resumeUrl" defaultValue={user.profile?.resumeUrl || ""} className="bg-black/40 border-white/10 text-white" />
        </Field>
      </div>

      <SectionHeader title="Links & Contact" className="mt-8 pt-4 border-t border-white/10" />

      <div className="grid grid-cols-2 gap-4">
        <Field label="GitHub URL">
          <Input name="github" defaultValue={user.profile?.socialLinks?.github || ""} className="bg-black/40 border-white/10 text-white" />
        </Field>
        <Field label="LinkedIn URL">
          <Input name="linkedin" defaultValue={user.profile?.socialLinks?.linkedin || ""} className="bg-black/40 border-white/10 text-white" />
        </Field>
        <Field label="Twitter URL">
          <Input name="twitter" defaultValue={user.profile?.socialLinks?.twitter || ""} className="bg-black/40 border-white/10 text-white" />
        </Field>
        <Field label="Website URL">
          <Input name="website" defaultValue={user.profile?.socialLinks?.website || ""} className="bg-black/40 border-white/10 text-white" />
        </Field>
      </div>

      <Field label="Public Contact Email">
        <Input name="contactEmail" defaultValue={user.email || ""} className="bg-black/40 border-white/10 text-white" />
      </Field>

      <div className="pt-4">
        <SaveButton status={saveStatus} onClick={handleSave} label="Save Profile" />
      </div>
    </form>
  );
}

// ─── ProjectsForm ─────────────────────────────────────────────────────────────

function ProjectsForm({ user, setLocalData, updateProjects }: any) {
  const [projects, setProjects] = useState<any[]>(user.projects || []);
  const [isDirty, setIsDirty] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [editingId, setEditingId] = useState<string | undefined | null>(null);

  useEffect(() => {
    setProjects(user.projects || []);
  }, [user]);

  const applyProjects = (updated: any[]) => {
    setProjects(updated);
    setIsDirty(true);
    setSaveStatus("idle");
    setLocalData((prev: any) => ({ ...prev, projects: updated }));
  };

  const handleSaveAll = () => {
    setSaveStatus("saving");
    updateProjects.mutate(
      { data: { projects } },
      {
        onSuccess: () => {
          setIsDirty(false);
          setSaveStatus("saved");
          setTimeout(() => setSaveStatus("idle"), 2000);
        },
        onError: () => setSaveStatus("error"),
      }
    );
  };

  const deleteProject = (id: string) => {
    applyProjects(projects.filter((p) => p.id !== id));
  };

  const handleProjectSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const techStackStr = fd.get("techStack") as string;
    const projectData = {
      id: typeof editingId === "string" ? editingId : Math.random().toString(36).substring(7),
      title: fd.get("title") as string,
      description: fd.get("description") as string,
      techStack: techStackStr.split(",").map((s: string) => s.trim()).filter(Boolean),
      repoLink: fd.get("repoLink") as string,
      liveLink: fd.get("liveLink") as string,
      screenshotUrl: fd.get("screenshotUrl") as string,
    };

    const updated =
      typeof editingId === "string"
        ? projects.map((p) => (p.id === editingId ? projectData : p))
        : [...projects, projectData];

    applyProjects(updated);
    setEditingId(null);
  };

  const editingProject =
    typeof editingId === "string" ? projects.find((p) => p.id === editingId) : null;
  const showForm = editingId !== null;

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex justify-between items-center">
        <SectionHeader title="Projects" />
        {!showForm && (
          <button
            onClick={() => setEditingId(undefined)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 10,
              background: "#1a2340",
              color: "#06b6d4",
              border: "1px solid #232d4a",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <Plus size={15} /> Add Project
          </button>
        )}
      </div>

      {isDirty && (
        <div
          style={{
            background: "#fef3c7",
            color: "#92400e",
            padding: "8px 14px",
            borderRadius: 8,
            fontSize: 13,
          }}
        >
          ⚠ Unsaved changes — click Save to persist
        </div>
      )}

      {showForm && (
        <Card style={{ background: "#1a2340", border: "1px solid #232d4a" }}>
          <CardContent className="pt-5">
            <form key={String(editingId)} onSubmit={handleProjectSubmit} className="space-y-4">
              <p className="text-sm font-medium" style={{ color: "#94a3b8" }}>
                {editingProject ? `Editing: ${editingProject.title}` : "New Project"}
              </p>
              <Field label="Title *">
                <Input name="title" defaultValue={editingProject?.title ?? ""} required placeholder="My Awesome Project" className="bg-black/40 border-white/10 text-white" />
              </Field>
              <Field label="Description">
                <Textarea name="description" defaultValue={editingProject?.description ?? ""} placeholder="What does this project do?" className="bg-black/40 border-white/10 text-white" />
              </Field>
              <Field label="Tech Stack (comma-separated)">
                <Input name="techStack" defaultValue={editingProject?.techStack?.join(", ") ?? ""} placeholder="React, Node.js, PostgreSQL" className="bg-black/40 border-white/10 text-white" />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Repo Link">
                  <Input name="repoLink" defaultValue={editingProject?.repoLink ?? ""} placeholder="https://github.com/..." className="bg-black/40 border-white/10 text-white" />
                </Field>
                <Field label="Live Link">
                  <Input name="liveLink" defaultValue={editingProject?.liveLink ?? ""} placeholder="https://myapp.com" className="bg-black/40 border-white/10 text-white" />
                </Field>
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: 13, padding: "8px 12px" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ background: "#232d4a", border: "1px solid #06b6d4", color: "#06b6d4", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                >
                  {editingProject ? "Update Project" : "Add Project"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {projects.map((p) => (
          <div
            key={p.id}
            style={{ background: "#1a2340", border: "1px solid #232d4a", borderRadius: 12, padding: "14px 16px" }}
            className="flex justify-between items-start"
          >
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-base text-white">{p.title}</h3>
              <p style={{ color: "#64748b", fontSize: 13, marginTop: 2 }} className="line-clamp-1">{p.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {p.techStack?.map((t: string) => (
                  <span
                    key={t}
                    style={{ fontSize: 11, background: "#232d4a", color: "#06b6d4", padding: "2px 8px", borderRadius: 999 }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-1 shrink-0 ml-3">
              <button
                onClick={() => setEditingId(p.id)}
                style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer", padding: 6, borderRadius: 6 }}
              >
                <Edit2 size={15} />
              </button>
              <button
                onClick={() => deleteProject(p.id)}
                style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", padding: 6, borderRadius: 6 }}
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && !showForm && (
          <div
            style={{ border: "1px dashed #1e2a42", borderRadius: 12, padding: "40px 0", textAlign: "center", color: "#4b5563", fontSize: 14 }}
          >
            No projects yet — click "Add Project" to get started.
          </div>
        )}
      </div>

      <SaveButton status={saveStatus} onClick={handleSaveAll} label="Save All Projects" />
    </div>
  );
}

// ─── SkillsForm ───────────────────────────────────────────────────────────────

function SkillsForm({ user, setLocalData, updateSkills }: any) {
  const formRef = useRef<HTMLFormElement>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const parseSkills = (str: string) =>
    str.split(",").map((s) => s.trim()).filter(Boolean);

  const handleChange = () => {
    const fd = new FormData(formRef.current!);
    const skills = {
      frontend: parseSkills(fd.get("frontend") as string),
      backend: parseSkills(fd.get("backend") as string),
      devops: parseSkills(fd.get("devops") as string),
      other: parseSkills(fd.get("other") as string),
    };
    setLocalData((prev: any) => ({ ...prev, skills }));
  };

  const handleSave = () => {
    const fd = new FormData(formRef.current!);
    const skills = {
      frontend: parseSkills(fd.get("frontend") as string),
      backend: parseSkills(fd.get("backend") as string),
      devops: parseSkills(fd.get("devops") as string),
      other: parseSkills(fd.get("other") as string),
    };
    setSaveStatus("saving");
    updateSkills.mutate(
      { data: { skills } },
      {
        onSuccess: () => {
          setSaveStatus("saved");
          setTimeout(() => setSaveStatus("idle"), 2000);
        },
        onError: () => setSaveStatus("error"),
      }
    );
  };

  return (
    <form ref={formRef} onChange={handleChange} className="space-y-5 max-w-2xl">
      <SectionHeader title="Skills" />

      <Field label="Frontend (comma-separated)">
        <Textarea name="frontend" defaultValue={user.skills?.frontend?.join(", ") || ""} className="bg-black/40 border-white/10 text-white h-20" placeholder="React, TypeScript, Tailwind CSS" />
      </Field>
      <Field label="Backend (comma-separated)">
        <Textarea name="backend" defaultValue={user.skills?.backend?.join(", ") || ""} className="bg-black/40 border-white/10 text-white h-20" placeholder="Node.js, Express, PostgreSQL" />
      </Field>
      <Field label="DevOps (comma-separated)">
        <Textarea name="devops" defaultValue={user.skills?.devops?.join(", ") || ""} className="bg-black/40 border-white/10 text-white h-20" placeholder="Docker, AWS, CI/CD" />
      </Field>
      <Field label="Other (comma-separated)">
        <Textarea name="other" defaultValue={user.skills?.other?.join(", ") || ""} className="bg-black/40 border-white/10 text-white h-20" placeholder="Git, Figma, Agile" />
      </Field>

      <div className="pt-2">
        <SaveButton status={saveStatus} onClick={handleSave} label="Save Skills" />
      </div>
    </form>
  );
}

// ─── ThemeSelector ────────────────────────────────────────────────────────────

function ThemeSelector({ currentTemplate, setLocalData, updateTemplate, toast }: any) {
  const themes = [
    { id: "minimalist", name: "Minimalist", domain: "Frontend", desc: "Clean typography, lots of whitespace" },
    { id: "cyberpunk", name: "Cyberpunk", domain: "Web3 / Hacker", desc: "Neon green on black, scanlines" },
    { id: "corporate", name: "Corporate", domain: "Enterprise", desc: "Professional, trusted, bold" },
    { id: "creative", name: "Creative", domain: "UI / UX Design", desc: "Animated gradients, expressive" },
    { id: "data-science", name: "Data Science", domain: "ML / AI", desc: "Notebook vibes, data-dense" },
    { id: "game-dev", name: "Game Dev", domain: "Indie / GameDev", desc: "8-bit retro pixel style" },
  ];

  const selectTheme = (id: string) => {
    setLocalData((prev: any) => ({ ...prev, templateId: id }));
    updateTemplate.mutate(
      { data: { templateId: id } },
      {
        onSuccess: () => toast({ title: "Template updated ✓" }),
        onError: () => toast({ title: "Failed to update template", variant: "destructive" }),
      }
    );
  };

  return (
    <div className="max-w-2xl">
      <SectionHeader title="Choose Template" className="mb-6" />
      <div className="grid grid-cols-2 gap-4">
        {themes.map((t) => {
          const isActive = currentTemplate === t.id;
          return (
            <div
              key={t.id}
              onClick={() => selectTheme(t.id)}
              style={{
                padding: "16px 18px",
                borderRadius: 14,
                cursor: "pointer",
                border: isActive ? "2px solid #7c3aed" : "2px solid #1e2a42",
                background: isActive ? "rgba(124,58,237,0.1)" : "#1a2340",
                transition: "all 0.2s",
              }}
            >
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold text-white text-sm">{t.name}</h3>
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    border: isActive ? "2px solid #7c3aed" : "2px solid #4b5563",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isActive && (
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#7c3aed" }} />
                  )}
                </div>
              </div>
              <div style={{ fontSize: 11, color: "#06b6d4", marginBottom: 4 }}>{t.domain}</div>
              <p style={{ fontSize: 12, color: "#64748b" }}>{t.desc}</p>
            </div>
          );
        })}
      </div>
      <p className="text-xs mt-6" style={{ color: "#4b5563" }}>
        Template changes are saved automatically when you click a card.
      </p>
    </div>
  );
}

// ─── Shared UI helpers ────────────────────────────────────────────────────────

function SectionHeader({ title, className }: { title: string; className?: string }) {
  return (
    <h2 className={`text-lg font-semibold text-white ${className ?? ""}`}>{title}</h2>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-gray-400 text-xs font-medium uppercase tracking-wide">{label}</Label>
      {children}
    </div>
  );
}
