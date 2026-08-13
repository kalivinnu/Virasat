import { useState } from "react";
import { motion } from "motion/react";
import { fighters } from "./data";
import { SectionHeading, Reveal } from "./atoms";
import { IndependenceAtmosphere, AshokaChakra } from "./IndependenceAtmosphere";
import { Shield, X, Award } from "lucide-react";

export function FightersSection() {
  const [activeFighter, setActiveFighter] = useState<(typeof fighters)[0] | null>(null);

  const extendedBios: Record<string, { fullBio: string; achievements: string[]; primaryQuote: string }> = {
    "Birsa Munda": {
      fullBio: "Birsa Munda rallied the indigenous Adivasi communities of the Chota Nagpur plateau against oppressive British land revenue systems and feudal landlords. He founded the 'Birsait' faith and led the Ulgulan (Great Tumult) uprising, challenging imperial authority before his martyrdom at age 25.",
      achievements: [
        "Mobilized thousands of Munda tribals for forest rights",
        "Challenged the oppressive 'Bethbegari' forced labor system",
        "Remembered as 'Dharti Abba' (Father of the Earth)"
      ],
      primaryQuote: "Let the kingdom of the queen end and our kingdom begin."
    },
    "Matangini Hazra": {
      fullBio: "A courageous Gandhian leader from Tamluk, West Bengal, 73-year-old Matangini Hazra led a procession of 6,000 supporters to take over a local police station. Even after being repeatedly shot by crown forces, she marched forward holding the tricolor flag aloft, chanting 'Vande Mataram' until her final breath.",
      achievements: [
        "Led massive salt satyagraha protests in Midnapore",
        "Known affectionately as 'Gandhi Buri' (Old Gandhi Lady)",
        "Sacrificed her life for the national tricolor at age 73"
      ],
      primaryQuote: "Vande Mataram! Even in death, the flag shall not touch the ground."
    },
    "Chandra Shekhar Azad": {
      fullBio: "A fierce revolutionary mentor of the Hindustan Socialist Republican Association (HSRA), Azad vowed never to be captured alive by British police. True to his name ('Azad' meaning free), he fought single-handedly in Alfred Park, Allahabad, covering his comrades' retreat until his final bullet.",
      achievements: [
        "Reorganized the HSRA alongside Bhagat Singh",
        "Key architect of the Kakori train action and assembly retaliation",
        "Kept his vow of absolute freedom: 'Azad was, Azad is, Azad will be.'"
      ],
      primaryQuote: "If your blood does not rage, then it is water that flows in your veins."
    },
    "Kalpana Datta": {
      fullBio: "A brilliant revolutionary from Chittagong who played a pivotal role in the 1930 Chittagong Armoury Raid under Masterda Surya Sen. Following underground warfare and arrest, she endured long years of imprisonment before dedicating her later life to scientific education and women's welfare.",
      achievements: [
        "Masterminded logistical support for the Chittagong Armoury raid",
        "Operated as an underground guerrilla commander",
        "Authored vital historical memoirs of the Bengal resistance"
      ],
      primaryQuote: "Freedom is won not by petition, but by unwavering resolve."
    }
  };

  return (
    <section id="fighters" className="relative overflow-hidden border-t border-border/30 bg-background py-28">
      <IndependenceAtmosphere />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <SectionHeading
          kicker="1857 – 1947 · Pantheon of unsung bravery"
          title="Guardians of Freedom"
          subtitle="Profiles of revolutionaries, tribal leaders and defiant souls whose sacrifices broke the chains of empire."
        />
        <div className="mt-8 flex items-center justify-center gap-3 font-sans text-[0.55rem] tracking-monument uppercase text-muted-foreground">
          <AshokaChakra className="h-4 w-4 text-primary/70" />
          Freedom Movement Archive
          <AshokaChakra className="h-4 w-4 text-primary/70" />
        </div>


        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {fighters.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.1}>
              <div
                onClick={() => setActiveFighter(f)}
                className="group relative rounded-xl border border-border/60 bg-card/80 backdrop-blur-md overflow-hidden shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/80 hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] cursor-pointer flex flex-col h-full"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy-deep">
                  <img
                    src={f.image}
                    alt={f.name}
                    className="w-full h-full object-cover filter brightness-90 contrast-110 transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  
                  <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-md border border-border/50 px-2.5 py-1 rounded text-[0.6rem] font-sans tracking-widest text-primary uppercase">
                    {f.region}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="font-sans text-[0.6rem] tracking-monument text-primary uppercase block">
                      {f.years}
                    </span>
                    <h3 className="font-display text-2xl text-gold-gradient mt-1 tracking-wide">
                      {f.name}
                    </h3>
                    <p className="font-sans text-xs text-muted-foreground uppercase tracking-widest mt-0.5">
                      {f.role}
                    </p>
                    <p className="mt-4 text-sm text-foreground/80 leading-relaxed font-sans line-clamp-3">
                      {f.note}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-between">
                    <span className="font-sans text-[0.65rem] tracking-monument uppercase text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Dossier →
                    </span>
                    <Shield className="w-4 h-4 text-primary/60" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom Stat Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Documented Heroes", value: "650+" },
            { label: "Archived Trials", value: "1,420" },
            { label: "Verified Letters", value: "850+" },
            { label: "Regions Covered", value: "28 States" },
          ].map((stat, idx) => (
            <Reveal key={stat.label} delay={idx * 0.08}>
              <div className="rounded-lg border border-border/50 bg-card/40 p-6 text-center backdrop-blur-sm">
                <span className="font-display text-3xl sm:text-4xl text-gold-gradient font-semibold block">
                  {stat.value}
                </span>
                <span className="font-sans text-[0.6rem] tracking-monument uppercase text-muted-foreground mt-2 block">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Fighter Detail Modal */}
      {activeFighter && (
        <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl flex items-center justify-center p-6 overflow-y-auto">
          <motion.div
            className="relative w-full max-w-3xl rounded-2xl border border-border bg-gradient-to-br from-card via-card/95 to-navy-deep p-8 shadow-2xl overflow-hidden my-auto"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
          >
            <button
              type="button"
              onClick={() => setActiveFighter(null)}
              className="absolute top-6 right-6 text-foreground hover:text-primary p-2 bg-background/50 rounded-full border border-border"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 relative aspect-[3/4] rounded-lg overflow-hidden border border-border">
                <img
                  src={activeFighter.image}
                  alt={activeFighter.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="font-sans text-[0.6rem] tracking-monument uppercase text-primary block">
                    {activeFighter.region}
                  </span>
                  <span className="font-sans text-xs text-foreground/80">{activeFighter.years}</span>
                </div>
              </div>

              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-primary font-sans text-xs tracking-widest uppercase">
                    <Award className="w-4 h-4" />
                    <span>{activeFighter.role}</span>
                  </div>
                  <h2 className="font-display text-4xl text-gold-gradient mt-2">
                    {activeFighter.name}
                  </h2>

                  <p className="mt-4 font-sans text-sm text-foreground/90 leading-relaxed">
                    {extendedBios[activeFighter.name]?.fullBio || activeFighter.note}
                  </p>

                  {extendedBios[activeFighter.name]?.primaryQuote && (
                    <blockquote className="mt-4 border-l-2 border-primary pl-4 font-display text-base italic text-primary/90">
                      "{extendedBios[activeFighter.name]?.primaryQuote}"
                    </blockquote>
                  )}

                  <div className="mt-6 space-y-2">
                    <span className="font-sans text-[0.6rem] tracking-monument uppercase text-muted-foreground block">
                      Key Historical Milestones
                    </span>
                    <ul className="space-y-1.5">
                      {extendedBios[activeFighter.name]?.achievements.map((ach, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-foreground/80 font-sans">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border/30 flex items-center justify-between">
                  <span className="font-sans text-[0.6rem] tracking-widest text-muted-foreground uppercase">
                    Source: National Archives & Trial Records
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveFighter(null)}
                    className="rounded-sm bg-gold-gradient px-6 py-2.5 font-sans text-[0.65rem] tracking-monument uppercase text-primary-foreground font-semibold"
                  >
                    Close Dossier
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
