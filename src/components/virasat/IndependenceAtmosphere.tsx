import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import archival from "@/assets/independence-archive.jpg";

export function AshokaChakra({ className = "" }: { className?: string }) {
  const spokes = Array.from({ length: 24 }, (_, i) => (i * 360) / 24);
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden fill="none">
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="50" r="6" fill="currentColor" />
      {spokes.map((a) => (
        <line
          key={a}
          x1="50"
          y1="50"
          x2={50 + 44 * Math.cos((a * Math.PI) / 180)}
          y2={50 + 44 * Math.sin((a * Math.PI) / 180)}
          stroke="currentColor"
          strokeWidth="1.1"
        />
      ))}
    </svg>
  );
}

/**
 * A restrained freedom-era atmosphere: an archival photographic band,
 * a slowly turning Ashoka Chakra and the faintest tricolour light.
 */
export function IndependenceAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const bandOpacity = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0, 0.55, 0.55, 0]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* archival photograph band */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[56vh] veil-bottom"
        style={{ y, opacity: bandOpacity }}
      >
        <img
          src={archival}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-40 grayscale-[0.35] sepia-[0.5] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
      </motion.div>

      {/* tricolour light — saffron above, ivory centre, green below */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,oklch(0.74_0.16_62_/_0.09)_0%,transparent_28%,oklch(0.96_0.014_85_/_0.05)_50%,transparent_72%,oklch(0.62_0.13_150_/_0.09)_100%)]" />

      {/* chakra watermark */}
      <motion.div
        className="absolute -right-24 top-1/3 h-[32rem] w-[32rem] text-primary/[0.07] sm:-right-16"
        style={{ rotate }}
      >
        <AshokaChakra className="h-full w-full" />
      </motion.div>

      {/* archival paper grain */}
      <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay [background-image:repeating-linear-gradient(115deg,transparent_0_3px,oklch(1_0_0_/_0.18)_3px_4px)]" />
    </div>
  );
}
