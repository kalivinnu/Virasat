import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteNav } from "../components/virasat/SiteNav";
import { ShieldCheck, User, BookOpen, Bookmark, FileText, Settings, LogOut, Award, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPageComponent,
});

function DashboardPageComponent() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{
    name: string;
    email: string;
    joined: string;
    role: string;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<"overview" | "bookmarks" | "submissions" | "profile">("overview");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("virasat_user");
    if (!stored) {
      navigate({ to: "/auth" });
      return;
    }
    const parsed = JSON.parse(stored);
    setUser(parsed);
    setEditedName(parsed.name);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("virasat_user");
    navigate({ to: "/" });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const updated = { ...user, name: editedName };
    setUser(updated);
    localStorage.setItem("virasat_user", JSON.stringify(updated));
    setIsEditingProfile(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30">
      <SiteNav />

      <main className="flex-grow max-w-7xl mx-auto px-6 md:px-12 py-28 w-full">
        {/* Welcome Header */}
        <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl p-8 shadow-2xl relative overflow-hidden mb-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-gold-gradient p-0.5 flex items-center justify-center shadow-lg">
                <div className="w-full h-full rounded-full bg-navy-deep flex items-center justify-center font-display text-2xl text-primary">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <div>
                <span className="font-sans text-[0.6rem] tracking-monument uppercase text-primary font-semibold">
                  Verified Researcher Dashboard
                </span>
                <h1 className="font-display text-3xl sm:text-4xl text-gold-gradient mt-1">
                  Welcome back, {user.name}
                </h1>
                <p className="font-sans text-xs text-muted-foreground mt-0.5">
                  {user.email} • Member since {new Date(user.joined).toLocaleDateString()}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-sm border border-border/80 bg-background/50 px-5 py-2.5 font-sans text-[0.65rem] tracking-monument uppercase text-foreground/80 hover:bg-destructive/20 hover:text-destructive hover:border-destructive/50 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-8 pt-6 border-t border-border/30 flex flex-wrap gap-3">
            {[
              { id: "overview", label: "Dashboard Overview", icon: ShieldCheck },
              { id: "bookmarks", label: "Saved Folios & Bookmarks", icon: Bookmark },
              { id: "submissions", label: "Archival Submissions", icon: FileText },
              { id: "profile", label: "Researcher Profile", icon: User },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`rounded-lg px-4 py-2.5 font-sans text-xs flex items-center gap-2 border transition-all ${
                    isActive
                      ? "bg-gold-gradient text-primary-foreground border-primary font-medium shadow-md"
                      : "bg-background/40 text-muted-foreground border-border/60 hover:text-foreground hover:border-primary/40"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Areas */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur-md">
              <span className="font-sans text-[0.6rem] tracking-monument uppercase text-primary block">
                Saved Archival Folios
              </span>
              <span className="font-display text-4xl text-gold-gradient mt-2 block font-semibold">
                12
              </span>
              <p className="font-sans text-xs text-muted-foreground mt-2">
                Manuscripts & trial transcripts bookmarked in your digital vault.
              </p>
            </div>

            <div className="rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur-md">
              <span className="font-sans text-[0.6rem] tracking-monument uppercase text-primary block">
                Claim Verifications Tested
              </span>
              <span className="font-display text-4xl text-gold-gradient mt-2 block font-semibold">
                28
              </span>
              <p className="font-sans text-xs text-muted-foreground mt-2">
                Historical claims cross-referenced with primary gazetteers.
              </p>
            </div>

            <div className="rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur-md">
              <span className="font-sans text-[0.6rem] tracking-monument uppercase text-primary block">
                Researcher Credential Status
              </span>
              <div className="flex items-center gap-2 mt-3 text-verified font-sans text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5" />
                <span>Level 2 Verified Scholar</span>
              </div>
              <p className="font-sans text-xs text-muted-foreground mt-1">
                Full access to unredacted crown archive records.
              </p>
            </div>
          </div>
        )}

        {activeTab === "bookmarks" && (
          <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl p-8">
            <h2 className="font-display text-2xl text-gold-gradient">Saved Folios & Manuscripts</h2>
            <p className="font-sans text-xs text-muted-foreground mt-1 mb-6">
              Your personal reading list of catalogued historical artifacts.
            </p>

            <div className="space-y-4">
              {[
                "Aryabhatiya Commentary (12th Century CE) — Astronomy Folio 42",
                "Bhagat Singh Lahore Conspiracy Case Trial Transcripts (1930)",
                "Great Trigonometrical Survey Map of the Himalayan Arc (1845)",
              ].map((item, idx) => (
                <div key={idx} className="rounded-lg border border-border/60 bg-background/50 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-sans text-sm text-foreground">{item}</span>
                  </div>
                  <span className="font-sans text-[0.6rem] tracking-widest uppercase text-primary">Saved</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "submissions" && (
          <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl p-8">
            <h2 className="font-display text-2xl text-gold-gradient">Archival Submissions</h2>
            <p className="font-sans text-xs text-muted-foreground mt-1 mb-6">
              Contribute local district records, photographs, or family letters for expert verification.
            </p>

            <div className="rounded-lg border border-dashed border-border/80 bg-background/30 p-8 text-center">
              <FileText className="w-10 h-10 text-primary mx-auto mb-3 opacity-80" />
              <h3 className="font-display text-xl text-foreground">Submit a New Historical Document</h3>
              <p className="font-sans text-xs text-muted-foreground mt-1 max-w-md mx-auto">
                Upload scans, manuscripts, or oral history transcripts. Our editorial board reviews all submissions against primary imperial records.
              </p>
              <button
                type="button"
                onClick={() => alert("Opening secure document submission uploader...")}
                className="mt-6 rounded-sm bg-gold-gradient px-6 py-2.5 font-sans text-[0.65rem] tracking-monument uppercase text-primary-foreground font-semibold"
              >
                Upload Document →
              </button>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl p-8 max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl text-gold-gradient">Researcher Profile Settings</h2>
                <p className="font-sans text-xs text-muted-foreground mt-0.5">
                  Manage your public scholar credentials and account details.
                </p>
              </div>
              {!isEditingProfile && (
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(true)}
                  className="rounded-sm border border-border bg-background/50 px-4 py-2 font-sans text-[0.6rem] tracking-monument uppercase text-primary hover:bg-primary/10 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {isEditingProfile ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block font-sans text-[0.6rem] tracking-monument uppercase text-muted-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background/80 px-4 py-3 font-sans text-sm text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[0.6rem] tracking-monument uppercase text-muted-foreground mb-2">
                    Email Address (Read-only)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full rounded-lg border border-border bg-background/40 px-4 py-3 font-sans text-sm text-muted-foreground cursor-not-allowed"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="rounded-sm bg-gold-gradient px-6 py-2.5 font-sans text-[0.65rem] tracking-monument uppercase text-primary-foreground font-semibold"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="rounded-sm border border-border px-6 py-2.5 font-sans text-[0.65rem] tracking-monument uppercase text-muted-foreground"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 font-sans text-sm">
                <div className="flex justify-between py-3 border-b border-border/30">
                  <span className="text-muted-foreground">Full Name</span>
                  <span className="text-foreground font-medium">{user.name}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border/30">
                  <span className="text-muted-foreground">Email Address</span>
                  <span className="text-foreground font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border/30">
                  <span className="text-muted-foreground">Role / Standing</span>
                  <span className="text-primary font-medium">{user.role}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-muted-foreground">Account Created</span>
                  <span className="text-foreground font-medium">{new Date(user.joined).toLocaleDateString()}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
