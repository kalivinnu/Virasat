import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useState } from "react";
import { SiteNav } from "../components/virasat/SiteNav";
import { ShieldCheck, Mail, Lock, User, ArrowRight } from "lucide-react";

// Access-gating only: keep the existing login page UI and behavior unchanged.
export const Route = createFileRoute("/auth")({
  validateSearch: z.object({
    returnState: z.string().optional(),
  }),
  component: AuthPageComponent,
});
function AuthPageComponent() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { returnState } = Route.useSearch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    // Simulate authentication session storage
    localStorage.setItem(
      "virasat_user",
      JSON.stringify({
        email,
        name: name || email.split("@")[0],
        joined: new Date().toISOString(),
        role: "Researcher & Contributor",
      })
    );

    const selectedState =
      returnState && /^[a-z0-9-]+$/.test(returnState) ? returnState : null;
    if (selectedState) {
      navigate({ to: "/state/$stateId", params: { stateId: selectedState } });
    } else {
      navigate({ to: "/dashboard" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30">
      <SiteNav />

      <main className="flex-grow flex items-center justify-center px-6 py-24 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-md rounded-2xl border border-border/80 bg-card/70 backdrop-blur-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <span className="font-sans text-[0.65rem] tracking-monument uppercase text-primary font-semibold block">
              Virasat Security & Access
            </span>
            <h1 className="font-display text-3xl text-gold-gradient mt-2">
              {isLogin ? "Researcher Login" : "Create Account"}
            </h1>
            <p className="font-sans text-xs text-muted-foreground mt-1">
              {isLogin
                ? "Access your saved archives, bookmarked folios, and contributions."
                : "Join the national digital archive initiative as a verified researcher."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block font-sans text-[0.6rem] tracking-monument uppercase text-muted-foreground mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Dr. A. P. J. Kalam"
                    className="w-full rounded-lg border border-border bg-background/80 px-4 py-3 pl-11 font-sans text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            )}

            <div>
              <label className="block font-sans text-[0.6rem] tracking-monument uppercase text-muted-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="researcher@virasat.org"
                  className="w-full rounded-lg border border-border bg-background/80 px-4 py-3 pl-11 font-sans text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            <div>
              <label className="block font-sans text-[0.6rem] tracking-monument uppercase text-muted-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-lg border border-border bg-background/80 px-4 py-3 pl-11 font-sans text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-sm bg-gold-gradient py-3.5 font-sans text-[0.7rem] tracking-monument uppercase text-primary-foreground font-semibold shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              <span>
                {isLogin
                  ? "Authenticate & Enter"
                  : "Register Researcher Account"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-sans text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin
                ? "Don't have an account? Register here"
                : "Already registered? Login here"}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-border/30 flex items-center justify-center gap-2 text-[0.6rem] text-muted-foreground font-sans">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span>256-Bit Encrypted National Archive Session</span>
          </div>
        </div>
      </main>
    </div>
  );
}
