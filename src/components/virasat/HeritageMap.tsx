import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { states } from "./data";
import { SectionHeading } from "./atoms";
import { stateHero } from "./stateImages";
import { STATE_HERITAGE_MAP } from "./stateHeritageData";
import mapImage from "@/assets/map.jpg";
import { MapPin } from "lucide-react";

const STATE_ID: Record<string, string> = {
  Karnataka: "karnataka",
  Rajasthan: "rajasthan",
  "Uttar Pradesh": "uttar-pradesh",
  "West Bengal": "west-bengal",
  Maharashtra: "maharashtra",
  Gujarat: "gujarat",
  "Jammu & Kashmir": "jammu-and-kashmir",
  Punjab: "punjab",
  "Madhya Pradesh": "madhya-pradesh",
  Assam: "assam",
  Telangana: "telangana",
  Kerala: "kerala",
  "Tamil Nadu": "tamil-nadu",
};

type Departure = { id: string; name: string; x: number; y: number };

// Access-gating only: preserve the existing map artwork, marker styling, and dive transition.
export function HeritageMap() {
  const navigate = useNavigate();
  const [departing, setDeparting] = useState<Departure | null>(null);

  const enterState = (name: string, x: number, y: number) => {
    const id = STATE_ID[name] ?? "karnataka";
    if (!STATE_HERITAGE_MAP[id]) return;
    const isLoggedIn = Boolean(localStorage.getItem("virasat_user"));
    setDeparting({ id, name, x, y });
    window.setTimeout(() => {
      navigate({
        to: "/state/$stateId",
        params: { stateId: id },
        search: isLoggedIn ? {} : { preview: "true" },
      });
    }, 900);
  };

  return (
    <section
      id="map"
      className="relative overflow-hidden border-t border-border/40 bg-background py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.79_0.13_84_/_0.07),transparent_65%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <SectionHeading
          kicker="Interactive geographic archive"
          title="The Heritage Map of India"
          subtitle="Select any marker — the camera dives into the region and opens its own full-screen archive."
        />

        <div className="mx-auto mt-16 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 shadow-deep backdrop-blur-md sm:p-8"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border/60">
              <img
                src={mapImage}
                alt="Stylised map of India with heritage regions"
                loading="lazy"
                className="h-full w-full object-cover brightness-[0.62] contrast-125 sepia-[0.35]"
              />
              <div className="absolute inset-0 bg-navy/45" />

              {/* golden routes between regions */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
                aria-hidden
              >
                <polyline
                  points={states.map(s => `${s.x},${s.y}`).join(" ")}
                  fill="none"
                  stroke="var(--gold)"
                  strokeWidth="0.25"
                  strokeDasharray="1.4 1.6"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {states.map(st => (
                <button
                  key={st.name}
                  type="button"
                  onClick={() => enterState(st.name, st.x, st.y)}
                  className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                  style={{ left: `${st.x}%`, top: `${st.y}%` }}
                  aria-label={`Open the ${st.name} heritage archive`}
                >
                  <span className="relative flex items-center justify-center">
                    <span className="absolute h-8 w-8 rounded-full bg-primary/25 [animation:marker-pulse_2.6s_ease-out_infinite]" />
                    <span className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-ivory bg-primary shadow-[0_0_16px_oklch(0.79_0.13_84_/_0.85)] transition-transform duration-300 group-hover:scale-150">
                      <span className="h-1.5 w-1.5 rounded-full bg-background" />
                    </span>
                  </span>

                  <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 flex-col items-center group-hover:flex">
                    <span className="whitespace-nowrap rounded border border-border bg-background/95 px-3 py-1 font-sans text-[0.6rem] tracking-widest text-primary">
                      {st.name} · {st.stories} stories
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-2 px-1 font-sans text-[0.62rem] tracking-widest text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" /> 13 heritage
                regions catalogued
              </span>
              <span className="text-primary">
                Click a marker to enter its full-screen archive
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ---------- cinematic dive into the state ---------- */}
      <AnimatePresence>
        {departing ? (
          <motion.div
            className="fixed inset-0 z-[60] overflow-hidden bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <motion.img
              src={stateHero(departing.id)}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ scale: 2.4, opacity: 0, filter: "blur(26px)" }}
              animate={{ scale: 1.05, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="absolute inset-0 bg-hero-veil" />
            <motion.div
              className="absolute inset-0"
              initial={{ clipPath: "circle(0% at 50% 50%)" }}
              animate={{ clipPath: "circle(140% at 50% 50%)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, oklch(0.79 0.13 84 / 0.22), transparent 60%)",
              }}
            />
            <div className="relative z-10 flex h-full flex-col items-center justify-center">
              <motion.span
                className="font-sans text-[0.6rem] tracking-monument uppercase text-primary/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                Entering
              </motion.span>
              <motion.span
                className="mt-3 text-5xl sm:text-7xl"
                initial={{ opacity: 0, y: 20, letterSpacing: "0.5em" }}
                animate={{ opacity: 1, y: 0, letterSpacing: "0.12em" }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-gold-gradient">{departing.name}</span>
              </motion.span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
