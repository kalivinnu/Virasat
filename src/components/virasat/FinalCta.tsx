import { motion } from "motion/react";
import heroImage from "@/assets/hero.jpg";
import { DustField, Lotus, Ornament, Reveal } from "./atoms";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-border/60 bg-background">
      <motion.img
        src={heroImage}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
        initial={{ scale: 1.14 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 3, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-hero-veil" />
      <DustField />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Problem & Mission */}
          <Reveal className="space-y-6">
            <div>
              <span className="font-sans text-[0.65rem] tracking-monument uppercase text-primary font-semibold block mb-2">
                The Problem We Address
              </span>
              <h3 className="font-display text-3xl text-gold-gradient leading-tight">
                History is fading from the margins.
              </h3>
              <p className="mt-4 font-sans text-sm text-muted-foreground leading-relaxed">
                Thousands of regional manuscripts, oral folk traditions, and the names of local freedom fighters are lost every year to neglect and lack of verification. Without a central, verified digital repository, India's diverse heritage risks becoming a single, narrow narrative.
              </p>
            </div>

            <div>
              <span className="font-sans text-[0.65rem] tracking-monument uppercase text-primary font-semibold block mb-2">
                Our Solution
              </span>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                Virasat provides an immersive digital museum and archive that leverages multi-source cross-referencing and interactive storytelling to ensure every story is preserved, every claim is verified, and every hero is remembered.
              </p>
            </div>
          </Reveal>

          {/* Right: Team & Project Info */}
          <Reveal delay={0.2} className="space-y-6 lg:border-l lg:border-border/30 lg:pl-16">
            <div>
              <span className="font-sans text-[0.65rem] tracking-monument uppercase text-primary font-semibold block mb-2">
                The Development Team
              </span>
              <h3 className="font-display text-3xl text-gold-gradient leading-tight">
                Team Virasat
              </h3>
              <div className="mt-6 space-y-4">
                {[
                  { name: "Historical Curation", role: "Primary Archive Research" },
                  { name: "Cinematic Experience", role: "Interactive Design & Motion" },
                  { name: "Verification Logic", role: "Evidence Protocol Development" },
                ].map((member, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-display text-primary">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-sans text-xs text-foreground font-semibold uppercase tracking-widest">
                        {member.name}
                      </p>
                      <p className="font-sans text-[0.6rem] text-muted-foreground uppercase">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Final CTA Action */}
        <div className="mt-24 text-center">
          <motion.div
            className="flex justify-center text-primary mb-6"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <Lotus className="h-10 w-14" />
          </motion.div>
          
          <h2 className="font-display text-3xl sm:text-5xl leading-tight">
            <span className="text-gold-gradient">Preserve the past. Verify the truth.</span>
            <br />
            <span className="text-foreground/90">Inspire the future.</span>
          </h2>
          
          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <a
              href="/auth"
              className="rounded-sm bg-gold-gradient px-10 py-4 font-sans text-[0.7rem] tracking-monument uppercase text-primary-foreground font-bold shadow-2xl transition-transform duration-300 hover:-translate-y-1"
            >
              Researcher Portal Login
            </a>
            <a
              href="#archive"
              className="rounded-sm border border-border px-10 py-4 font-sans text-[0.7rem] tracking-monument uppercase text-primary/90 transition-colors duration-300 hover:bg-primary/10"
            >
              Contribute a Story
            </a>
          </div>
        </div>
      </div>

      <footer className="relative z-10 border-t border-border/60 py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-6 text-center">
          <Ornament label="Virasat Digital Museum" />
          <p className="font-sans text-[0.58rem] tracking-widest uppercase text-muted-foreground max-w-md">
            A comprehensive, verified digital archive of India's forgotten history, unsung heroes, and living heritage.
          </p>
          <div className="flex gap-6 text-[0.6rem] font-sans tracking-widest uppercase text-primary/60">
            <span>© 2026 Team Virasat</span>
            <span>•</span>
            <span>All Historical Records Verified</span>
          </div>
        </div>
      </footer>
    </section>
  );
}
