import { motion } from "motion/react";
import { useState } from "react";
import { culture } from "./data";
import { Reveal, SectionHeading } from "./atoms";
import { Sparkles, ArrowRight } from "lucide-react";

export function CultureSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Folk Dance",
    "Handicrafts",
    "Festivals",
    "Architecture",
    "Traditions",
  ];

  // Extended culture items or filtered view
  const filteredCulture = activeCategory === "All"
    ? culture
    : culture.filter((item) => item.title.toLowerCase().includes(activeCategory.toLowerCase()) || activeCategory.toLowerCase().includes("tradition"));

  return (
    <section id="culture" className="relative border-t border-border/40 py-32 bg-background overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading
          kicker="Digital Museum Gallery"
          title="Cultural Heritage"
          subtitle="Arts, dance, music, crafts, festivals, and architecture — gathered into an immersive digital vault."
        />

        {/* Category Pills Bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((c) => {
            const isActive = activeCategory === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setActiveCategory(c)}
                className={`rounded-full border px-5 py-2 font-sans text-[0.6rem] tracking-widest uppercase transition-all duration-300 ${
                  isActive
                    ? "border-primary bg-primary/20 text-primary glow-gold shadow-md font-medium"
                    : "border-border/60 bg-card/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Cinematic Gallery Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredCulture.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="group relative rounded-xl border border-border/70 bg-card/60 backdrop-blur-md overflow-hidden shadow-2xl flex flex-col h-full"
              >
                <div className="relative aspect-square overflow-hidden bg-navy-deep">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="h-full w-full object-cover filter brightness-85 contrast-125 transition-transform duration-1000 group-hover:scale-115"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  
                  <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-md border border-border/50 px-3 py-1 rounded text-[0.55rem] font-sans tracking-widest text-primary uppercase">
                    Museum Vault
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-display text-2xl text-gold-gradient tracking-wide">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground font-sans">
                      {item.body}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-between">
                    <span className="font-sans text-[0.6rem] tracking-monument uppercase text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Explore Exhibit →
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-primary/60" />
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
