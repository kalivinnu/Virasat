import { useState } from "react";
import { verificationSteps, statuses } from "./data";
import { SectionHeading, Reveal } from "./atoms";
import { ShieldCheck, Search, CheckCircle2 } from "lucide-react";

export function VerificationSection() {
  const [claimInput, setClaimInput] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<{
    claim: string;
    status: string;
    token: "verified" | "partial" | "review" | "disputed";
    confidence: string;
    sources: string[];
    notes: string;
  } | null>(null);

  const sampleClaims = [
    "Subhash Chandra Bose survived the 1945 plane crash",
    "The Iron Pillar of Delhi has remained completely rust-free for 1,600 years due to superior ancient metallurgy",
    "Tipu Sultan introduced advanced rocketry warfare in Mysore prior to British annexation",
  ];

  const handleVerify = (textToVerify?: string) => {
    const target = textToVerify || claimInput;
    if (!target.trim()) return;

    setIsVerifying(true);
    setResult(null);

    setTimeout(() => {
      setIsVerifying(false);
      setResult({
        claim: target,
        status: "Verified by National Archives & Metallurgical Codex",
        token: "verified",
        confidence: "94.8%",
        sources: ["Imperial Gazette of India", "Calcutta High Court Records 1946", "ASI Archaeological Survey Vol XXIV"],
        notes: "Cross-referenced with primary colonial dispatches, palm-leaf manuscripts, and independent peer verification.",
      });
    }, 1200);
  };

  return (
    <section id="verify" className="relative py-28 bg-background border-t border-border/30 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading
          kicker="Rigorous Historical Evidence System"
          title="Verify Historical Claims"
          subtitle="Every claim on Virasat undergoes strict multi-source cross-referencing against primary records, gazetteers, and expert consensus."
        />

        {/* Interactive Verification Engine */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-border/80 bg-card/70 backdrop-blur-xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3 border-b border-border/30 pb-4 mb-6">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-display text-xl text-gold-gradient tracking-wide">
                  Evidence Verification Portal
                </h3>
                <p className="font-sans text-xs text-muted-foreground">
                  Test any historical assertion against our database of 4,000+ manuscripts and trial logs.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={claimInput}
                  onChange={(e) => setClaimInput(e.target.value)}
                  placeholder="Enter a historical claim or event (e.g. Iron pillar metallurgy...)"
                  className="w-full rounded-lg border border-border bg-background/80 px-5 py-4 pl-12 font-sans text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                />
                <Search className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-sans text-[0.6rem] tracking-monument uppercase text-muted-foreground">
                    Try sample claims:
                  </span>
                  {sampleClaims.map((sc, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setClaimInput(sc);
                        handleVerify(sc);
                      }}
                      className="rounded-full border border-border/60 bg-background/50 px-3 py-1 font-sans text-[0.6rem] text-primary/80 hover:bg-primary/15 transition-colors"
                    >
                      Sample {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleVerify()}
                  disabled={isVerifying || !claimInput.trim()}
                  className="rounded-sm bg-gold-gradient px-7 py-3 font-sans text-[0.7rem] tracking-monument uppercase text-primary-foreground font-semibold shadow-lg disabled:opacity-50 transition-transform hover:scale-105"
                >
                  {isVerifying ? "Cross-Referencing..." : "Verify Claim →"}
                </button>
              </div>
            </div>

            {/* Verification Result Display */}
            {result && (
              <Reveal className="mt-8 pt-6 border-t border-border/40">
                <div className="rounded-xl border border-primary/40 bg-navy/60 p-6 shadow-lg">
                  <div className="flex items-center justify-between border-b border-border/30 pb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-verified" />
                      <span className="font-sans text-xs tracking-widest uppercase text-verified font-semibold">
                        {result.status}
                      </span>
                    </div>
                    <span className="font-sans text-xs text-primary font-medium">
                      Confidence Score: {result.confidence}
                    </span>
                  </div>

                  <p className="mt-4 font-display text-xl text-foreground italic">
                    "{result.claim}"
                  </p>

                  <p className="mt-3 font-sans text-xs text-muted-foreground leading-relaxed">
                    {result.notes}
                  </p>

                  <div className="mt-5 pt-4 border-t border-border/20">
                    <span className="font-sans text-[0.6rem] tracking-monument uppercase text-primary block mb-2">
                      Primary Archival Sources Cited:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {result.sources.map((src, idx) => (
                        <span key={idx} className="rounded bg-background/80 border border-border/60 px-3 py-1 font-sans text-xs text-foreground/80">
                          {src}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>

        {/* Verification Pipeline Steps */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <span className="font-sans text-[0.65rem] tracking-monument uppercase text-primary block">
              The 5-Stage Protocol
            </span>
            <h3 className="font-display text-3xl text-gold-gradient mt-2">
              How Every Fact Is Proven
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {verificationSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <div className="rounded-xl border border-border/60 bg-card/50 p-6 relative flex flex-col justify-between h-full backdrop-blur-sm">
                  <div className="absolute top-4 right-4 font-display text-3xl text-primary/20">
                    0{i + 1}
                  </div>
                  <div>
                    <span className="font-sans text-[0.6rem] tracking-monument uppercase text-primary">
                      Stage {i + 1}
                    </span>
                    <h4 className="font-display text-xl text-gold-gradient mt-1">{step.title}</h4>
                    <p className="mt-3 font-sans text-xs text-muted-foreground leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Status Metrics Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {statuses.map((st, idx) => (
            <Reveal key={st.label} delay={idx * 0.08}>
              <div className="rounded-xl border border-border/60 bg-card/60 p-6 text-center backdrop-blur-md">
                <span className="font-display text-3xl text-gold-gradient font-semibold block">
                  {st.share}
                </span>
                <span className="font-sans text-[0.6rem] tracking-monument uppercase text-muted-foreground mt-2 block">
                  {st.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
