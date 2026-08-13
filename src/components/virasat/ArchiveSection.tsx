import { motion } from "motion/react";
import { useState } from "react";
import { archiveItems } from "./data";
import { SectionHeading, Reveal } from "./atoms";
import archiveImage from "@/assets/archive.jpg";
import { FileText, Database, X, Download } from "lucide-react";

export function ArchiveSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const archiveDetails: Record<string, { description: string; sampleItems: string[]; dateRange: string }> = {
    Manuscripts: {
      description: "Over 4,100 palm-leaf, birch-bark and handmade paper folios covering mathematics, astronomy, philosophy, and classical drama.",
      sampleItems: ["Aryabhatiya Commentary (12th Century CE)", "Kashmiri Shaivism Palm Leafs", "Sanskrit Poetics Codex"],
      dateRange: "1000 BCE – 1850 CE",
    },
    "Historical Letters": {
      description: "Personal correspondence, royal farmans, and diplomatic dispatches exchanged between regional courts and freedom leaders.",
      sampleItems: ["Bhagat Singh Prison Letters", "Rani Lakshmibai Diplomatic Dispatches", "Tagore Correspondence"],
      dateRange: "1757 – 1947 CE",
    },
    Photographs: {
      description: "Rare gelatin silver prints and glass-plate negatives capturing pre-independence architecture, daily bazaars, and freedom rallies.",
      sampleItems: ["Delhi Durbar Archive Plates", "Bombay Port & Mill Worker Portraits", "Salt Satyagraha Field Shots"],
      dateRange: "1860 – 1948 CE",
    },
    Documents: {
      description: "Trial transcripts, land settlement grants, magistrate reports, and secret police surveillance files from crown archives.",
      sampleItems: ["Kakori Conspiracy Trial Proceedings", "Rowlatt Act Protest Police Logs", "Permanent Settlement Deeds"],
      dateRange: "1793 – 1947 CE",
    },
    Maps: {
      description: "Hand-drawn revenue surveys, pilgrimage route scrolls, and British military topographical reconnaissance maps.",
      sampleItems: ["Great Trigonometrical Survey Maps", "Varanasi Pilgrimage Scroll", "Maratha Fortifications Plan"],
      dateRange: "1780 – 1925 CE",
    },
    "Newspaper Clippings": {
      description: "Bound volumes and fragile broadsheets from vernacular publications that fueled national awakening across provinces.",
      sampleItems: ["Kesari Newspaper Editions (Tilak)", "Amrita Bazar Patrika Archives", "Jugantar Revolutionary Broadsheets"],
      dateRange: "1880 – 1947 CE",
    },
    Artifacts: {
      description: "Authenticated coins, ceremonial seals, brass measuring weights, copper plates, and handloom textile swatches.",
      sampleItems: ["Punch-Marked Silver Coins", "Chola Copper Plate Grant", "Swadeshi Movement Khadi Swatch"],
      dateRange: "300 BCE – 1950 CE",
    },
  };

  const currentDetail = selectedCategory ? archiveDetails[selectedCategory] : null;

  return (
    <section id="archive" className="relative py-28 bg-background border-t border-border/30 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading
          kicker="Digital Museum Repository"
          title="The Heritage Archive"
          subtitle="Explore thousands of catalogued manuscripts, trial documents, rare photographs, and historical maps preserved for posterity."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Atmospheric Archive Image */}
          <Reveal className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-border/75 shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-navy/40 to-transparent z-10" />
              <img
                src={archiveImage}
                alt="Ancient historical archive and manuscripts"
                className="w-full aspect-[4/3] object-cover filter brightness-80 contrast-125 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute bottom-8 left-8 right-8 z-20">
                <span className="font-sans text-[0.65rem] tracking-monument uppercase text-primary font-semibold block">
                  National Repository Vault
                </span>
                <h3 className="font-display text-3xl text-gold-gradient mt-1">
                  Living Memory of India
                </h3>
                <p className="mt-2 text-sm text-foreground/85 font-sans leading-relaxed">
                  Every folio, letter, and photograph is professionally digitized, metadata-tagged, and cross-referenced with primary historical authorities.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right: Interactive Archive Categories */}
          <Reveal className="lg:col-span-6" delay={0.2}>
            <div className="space-y-4">
              <span className="font-sans text-[0.65rem] tracking-monument uppercase text-primary block mb-2">
                Click any category to inspect collection details
              </span>

              {archiveItems.map((item, idx) => (
                <div
                  key={item.label}
                  onClick={() => setSelectedCategory(item.label)}
                  className="group rounded-xl border border-border/60 bg-card/60 backdrop-blur-md p-5 transition-all duration-300 hover:border-primary/80 hover:bg-card/90 hover:shadow-lg cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-display text-primary text-sm font-semibold">
                      0{idx + 1}
                    </span>
                    <div>
                      <h4 className="font-display text-xl text-foreground group-hover:text-gold-gradient transition-colors">
                        {item.label}
                      </h4>
                      <p className="font-sans text-xs text-muted-foreground">
                        {item.note}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-display text-2xl text-gold-gradient font-semibold block">
                      {item.count}
                    </span>
                    <span className="font-sans text-[0.55rem] tracking-monument uppercase text-primary/80 group-hover:translate-x-1 transition-transform inline-block">
                      Inspect →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Archive Category Modal */}
      {selectedCategory && currentDetail && (
        <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl flex items-center justify-center p-6 overflow-y-auto">
          <motion.div
            className="relative w-full max-w-2xl rounded-2xl border border-border bg-gradient-to-br from-card via-card/95 to-navy-deep p-8 shadow-2xl overflow-hidden my-auto"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
          >
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className="absolute top-6 right-6 text-foreground hover:text-primary p-2 bg-background/50 rounded-full border border-border"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-primary font-sans text-xs tracking-widest uppercase">
              <Database className="w-4 h-4" />
              <span>Collection Vault • {currentDetail.dateRange}</span>
            </div>

            <h2 className="font-display text-4xl text-gold-gradient mt-2">
              {selectedCategory} Collection
            </h2>

            <p className="mt-4 font-sans text-sm text-foreground/90 leading-relaxed">
              {currentDetail.description}
            </p>

            <div className="mt-6 space-y-3">
              <span className="font-sans text-[0.6rem] tracking-monument uppercase text-muted-foreground block">
                Highlighted Archival Holdings
              </span>
              <ul className="space-y-2">
                {currentDetail.sampleItems.map((sample, sIdx) => (
                  <li key={sIdx} className="flex items-center gap-2.5 rounded-lg border border-border/50 bg-background/40 p-3 text-xs text-foreground font-sans">
                    <FileText className="w-4 h-4 text-primary shrink-0" />
                    <span>{sample}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-border/30 flex items-center justify-between">
              <span className="font-sans text-[0.6rem] tracking-widest text-muted-foreground uppercase">
                Access: Fully Indexed & Verified
              </span>
              <button
                type="button"
                onClick={() => {
                  alert(`Accessing digital holdings for ${selectedCategory}...`);
                  setSelectedCategory(null);
                }}
                className="rounded-sm bg-gold-gradient px-6 py-2.5 font-sans text-[0.65rem] tracking-monument uppercase text-primary-foreground font-semibold flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Access Repository</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
