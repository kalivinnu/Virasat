import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  motionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import collageMaster from "@/assets/collage-master.png";

/**
 * A scroll-driven cinematic camera that travels *through* the VIRASAT master
 * artwork: layered parallax depth, curved arch masks, and a
 * glowing golden path that stitches the scenes together cleanly without
 * any accidental dark circular iris shutters or double zooms.
 */

type Scene = {
  id: string;
  act: string;
  title: string;
  body: string;
  /** focal point inside the artwork, in % of the artwork box */
  fx: number;
  fy: number;
  zoom: number;
  /** how strongly the arch mask closes around this scene (0 = open frame) */
  arch: number;
};

const SCENES: Scene[] = [
  {
    id: "tapestry",
    act: "Act I",
    title: "The Eternal Tapestry",
    body: "One frame holds five thousand years — stone, script, sovereignty and struggle. The camera is about to enter it.",
    fx: 50,
    fy: 50,
    zoom: 1,
    arch: 0,
  },
  {
    id: "pillar",
    act: "Act II",
    title: "Stone That Remembers",
    body: "A temple pillar carved with a guardian deity. Every fold of stone was a mason's signature, unsigned and unrecorded.",
    fx: 9,
    fy: 42,
    zoom: 2.7,
    arch: 0.35,
  },
  {
    id: "arch",
    act: "Act III",
    title: "Through the Imperial Arch",
    body: "Beyond the cusped archway, the Taj rises out of a burning dusk — symmetry as statecraft, marble as memory.",
    fx: 38,
    fy: 22,
    zoom: 2.3,
    arch: 1,
  },
  {
    id: "manuscript",
    act: "Act IV",
    title: "The Unread Folio",
    body: "Palm-leaf and paper still lie uncatalogued in trunks and temple lofts — an entire library of unfinished sentences.",
    fx: 19,
    fy: 84,
    zoom: 2.5,
    arch: 0.2,
  },
  {
    id: "temples",
    act: "Act V",
    title: "Cities of Gopurams",
    body: "Temple towns rose as observatories, treasuries and schools of geometry, their shikharas mapped to the sky.",
    fx: 41,
    fy: 70,
    zoom: 2.2,
    arch: 0.45,
  },
  {
    id: "map",
    act: "Act VI",
    title: "Bharat, Drawn by Hand",
    body: "Survey maps and pilgrimage charts — the subcontinent recorded in ink long before it was recorded in law.",
    fx: 74,
    fy: 18,
    zoom: 2.2,
    arch: 0.15,
  },
  {
    id: "freedom",
    act: "Act VII",
    title: "The Faces of Freedom",
    body: "Behind the remembered few stood printers, couriers, students and villagers whose names were never collected.",
    fx: 72,
    fy: 46,
    zoom: 2.1,
    arch: 0.3,
  },
  {
    id: "chakra",
    act: "Act VIII",
    title: "Twenty-Four Spokes",
    body: "The Ashoka Chakra — dharma set in motion, carried from a Mauryan capital to the centre of a new republic's flag.",
    fx: 92,
    fy: 34,
    zoom: 2.9,
    arch: 0.6,
  },
  {
    id: "ghats",
    act: "Act IX",
    title: "Forts, Ghats & Chariots",
    body: "River citadels and processional chariots — the everyday theatre of power that textbooks reduce to dates.",
    fx: 83,
    fy: 80,
    zoom: 2.2,
    arch: 0.25,
  },
  {
    id: "eternal",
    act: "Finale",
    title: "Virasat, Preserved",
    body: "The camera pulls back. Nothing here is decoration — each fragment is a record waiting to be verified.",
    fx: 50,
    fy: 50,
    zoom: 1.06,
    arch: 0,
  },
];

const stopAt = (i: number) => i / (SCENES.length - 1);
const STOPS = SCENES.map((_, i) => stopAt(i));

/**
 * A single source of truth for the golden path. Every rider (letters, arrows,
 * milestones, comet) is positioned and rotated from THIS geometry, so nothing
 * can drift, jump or travel against the curve.
 */
const PATH_D =
  "M -4 66 C 18 44, 30 78, 46 58 S 68 26, 84 40 S 104 62, 112 48";

const RIDER_WORD = "VIRASAT".split("");
/** constant arc-length gap between letters -> they can never overlap */
const LETTER_GAP = 0.052;
/** the travelling head sits slightly ahead of the caravan of letters */
const HEAD_LEAD = 0.03;

type Rider = {
  key: string;
  kind: "letter" | "arrow" | "milestone";
  /** fixed position along the path (arrow / milestone), 0..1 */
  at?: number;
  /** offset behind the travelling head (letters), in path fraction */
  trail?: number;
  label?: string;
};

const RIDERS: Rider[] = [
  ...RIDER_WORD.map((label, i) => ({
    key: `letter-${i}`,
    kind: "letter" as const,
    label,
    trail: HEAD_LEAD + (RIDER_WORD.length - 1 - i) * LETTER_GAP,
  })),
  ...STOPS.map((at, i) => ({
    key: `milestone-${i}`,
    kind: "milestone" as const,
    at,
  })),
  ...STOPS.slice(0, -1).map((at, i) => ({
    key: `arrow-${i}`,
    kind: "arrow" as const,
    at: (at + (STOPS[i + 1] ?? at)) / 2,
  })),
];

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
/** smooth 0..1 ramp — prevents popping / sudden jumps */
const ramp = (v: number, a: number, b: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

type RiderMotion = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotate: MotionValue<number>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
};

/**
 * Samples the shared path each frame and writes position + tangent rotation
 * for every rider. One subscription, one geometry source => perfect sync.
 */
function usePathRiders(p: MotionValue<number>) {
  const pathRef = useRef<SVGPathElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const motions = useMemo<Record<string, RiderMotion>>(() => {
    const map: Record<string, RiderMotion> = {};
    for (const r of RIDERS) {
      map[r.key] = {
        x: motionValue(0),
        y: motionValue(0),
        rotate: motionValue(0),
        opacity: motionValue(0),
        scale: motionValue(1),
      };
    }
    return map;
  }, []);

  useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const rect = entries[0]?.contentRect;
      if (rect) setSize({ w: rect.width, h: rect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || !size.w || !size.h) return;
    const total = path.getTotalLength();

    // path units are a 0..100 viewBox stretched over the box (preserveAspectRatio="none")
    const toPx = (t: number) => {
      const pt = path.getPointAtLength(clamp01(t) * total);
      return { x: (pt.x / 100) * size.w, y: (pt.y / 100) * size.h };
    };

    const write = (progress: number) => {
      for (const r of RIDERS) {
        const m = motions[r.key];
        if (!m) continue;
        const t = r.at !== undefined ? r.at : progress + HEAD_LEAD - (r.trail ?? 0);
        const inRange = t >= -0.02 && t <= 1.02;

        const a = toPx(t - 0.004);
        const b = toPx(t + 0.004);
        const here = toPx(t);
        // tangent measured in *screen* pixels, so the stretched viewBox can't
        // produce a rotation that disagrees with the visible curve
        const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;

        m.x.set(here.x);
        m.y.set(here.y);
        if (inRange) m.rotate.set(angle);

        if (r.kind === "letter") {
          // letters ride with the head, fading only at the very ends of the path
          m.opacity.set(
            inRange ? ramp(t, -0.02, 0.06) * (1 - ramp(t, 0.92, 1.02)) : 0
          );
          m.scale.set(0.9 + 0.1 * ramp(t, 0, 0.12));
        } else {
          // arrows + milestones light up exactly as the head passes over them
          const passed = ramp(progress, (r.at ?? 0) - 0.06, (r.at ?? 0) + 0.01);
          const fade = 1 - ramp(progress, (r.at ?? 0) + 0.14, (r.at ?? 0) + 0.3) * 0.55;
          m.opacity.set(inRange ? passed * fade : 0);
          m.scale.set(0.7 + 0.3 * passed);
        }
      }
    };

    write(p.get());
    const unsub = p.on("change", write);
    return () => unsub();
  }, [motions, p, size.h, size.w]);

  return { pathRef, boxRef, motions };
}

function PathRider({ rider, m }: { rider: Rider; m: RiderMotion }) {
  return (
    <motion.div
      className="absolute left-0 top-0 will-change-transform"
      style={{ x: m.x, y: m.y, opacity: m.opacity }}
    >
      <div className="absolute -translate-x-1/2 -translate-y-1/2">
        <motion.div style={{ rotate: m.rotate, scale: m.scale }}>
          {rider.kind === "letter" ? (
            <span className="block font-display text-2xl leading-none tracking-[0.12em] text-gold-gradient drop-shadow-[0_2px_14px_oklch(0.16_0.032_260_/_0.95)] sm:text-4xl">
              {rider.label}
            </span>
          ) : rider.kind === "arrow" ? (
            <svg
              viewBox="0 0 24 24"
              className="block h-4 w-4 text-primary drop-shadow-[0_0_10px_oklch(0.79_0.13_84_/_0.7)] sm:h-5 sm:w-5"
              aria-hidden
            >
              <path
                d="M4 4 L18 12 L4 20 Z"
                fill="currentColor"
                opacity="0.9"
              />
            </svg>
          ) : (
            <span className="block h-2.5 w-2.5 rotate-45 border border-primary bg-background/70 shadow-[0_0_12px_oklch(0.79_0.13_84_/_0.75)]" />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

function useCamera(p: MotionValue<number>, depth: number) {
  const zoom = useTransform(
    p,
    STOPS,
    SCENES.map(s => 1 + (s.zoom - 1) * depth)
  );
  const x = useTransform(
    p,
    STOPS,
    SCENES.map(s => `${-(s.fx - 50) * s.zoom * depth}%`)
  );
  const y = useTransform(
    p,
    STOPS,
    SCENES.map(s => `${-(s.fy - 50) * s.zoom * depth}%`)
  );
  return { zoom, x, y };
}

export function CinematicJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Smooth, critically damped camera movement with zero overshoot to prevent double zooming / jumping.
  const p = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 38,
    mass: 0.5,
  });

  const near = useCamera(p, 1);
  const far = useCamera(p, 0.62);
  const fore = useCamera(p, 1.22);

  // Curved arch mask that closes around architectural acts.
  const archAmt = useTransform(
    p,
    STOPS,
    SCENES.map(s => s.arch)
  );
  const archRadius = useTransform(
    archAmt,
    a =>
      `${46 * a}% ${46 * a}% ${4 + 2 * a}% ${4 + 2 * a}% / ${58 * a}% ${58 * a}% ${3 + 2 * a}% ${3 + 2 * a}%`
  );

  // Golden path draw + travelling comet — both driven by the SAME progress so
  // the drawn front, the comet head and every rider share one position.
  const dash = useTransform(p, v => 1 - v);
  const cometOffset = useTransform(p, v => 1 - v);
  const pathGlow = useTransform(p, [0, 0.08, 0.9, 1], [0, 1, 1, 0.35]);

  // Letters, arrows and milestones anchored to the exact path geometry.
  const { pathRef, boxRef, motions } = usePathRiders(p);

  // Colour grade shifts as we travel from antiquity to the republic.
  const grade = useTransform(
    p,
    [0, 0.4, 0.68, 1],
    [
      "sepia(0.18) contrast(1.08) saturate(0.95)",
      "sepia(0.28) contrast(1.14) saturate(1.05)",
      "sepia(0.1) contrast(1.2) saturate(1.15)",
      "sepia(0.16) contrast(1.1) saturate(1)",
    ]
  );

  const progressScale = useTransform(p, [0, 1], [0, 1]);

  if (reduced) {
    return (
      <section id="story" className="relative bg-background py-24">
        <div className="mx-auto max-w-5xl px-6">
          <img
            src={collageMaster}
            alt="VIRASAT heritage composition"
            className="w-full rounded-xl border border-border"
            loading="lazy"
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {SCENES.map(s => (
              <div key={s.id}>
                <p className="font-sans text-[0.62rem] tracking-monument uppercase text-primary/80">
                  {s.act}
                </p>
                <h3 className="mt-2 text-2xl text-gold-gradient">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id="story"
      className="relative bg-background"
      style={{ height: `${SCENES.length * 110}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden">
        {/* ---- the travelling camera (unclippped, clean full view) ---- */}
        <motion.div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 overflow-hidden will-change-transform"
            style={{ borderRadius: archRadius }}
          >
            {/* far layer — slow, soft, out of focus */}
            <motion.img
              src={collageMaster}
              alt=""
              aria-hidden
              className="absolute inset-0 h-[112%] w-[112%] -translate-x-[6%] -translate-y-[6%] object-cover opacity-70 blur-[7px] will-change-transform"
              style={{ scale: far.zoom, x: far.x, y: far.y }}
            />
            {/* hero layer — the subject */}
            <motion.img
              src={collageMaster}
              alt="A journey through India's heritage: temples, manuscripts, maps and the freedom movement"
              className="absolute inset-0 h-full w-full object-cover will-change-transform"
              style={{ scale: near.zoom, x: near.x, y: near.y, filter: grade }}
            />
            {/* foreground layer — clean parallax depth without circular masks */}
            <motion.img
              src={collageMaster}
              alt=""
              aria-hidden
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-soft-light will-change-transform"
              style={{
                scale: fore.zoom,
                x: fore.x,
                y: fore.y,
              }}
            />

            {/* golden path stitching the acts together */}
            <motion.svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
              style={{ opacity: pathGlow }}
              aria-hidden
            >
              <defs>
                <linearGradient id="vj-gold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--gold-deep)" />
                  <stop offset="50%" stopColor="var(--gold-soft)" />
                  <stop offset="100%" stopColor="var(--gold)" />
                </linearGradient>
                <filter id="vj-blur">
                  <feGaussianBlur stdDeviation="1.2" />
                </filter>
              </defs>
              <path
                ref={pathRef}
                d={PATH_D}
                fill="none"
                stroke="url(#vj-gold)"
                strokeWidth="1.6"
                filter="url(#vj-blur)"
                opacity="0.55"
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                d={PATH_D}
                fill="none"
                stroke="url(#vj-gold)"
                strokeWidth="0.5"
                pathLength={1}
                strokeDasharray="1 1"
                style={{ strokeDashoffset: dash }}
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                d={PATH_D}
                fill="none"
                stroke="var(--ivory)"
                strokeWidth="0.9"
                pathLength={1}
                strokeDasharray="0.035 0.965"
                style={{ strokeDashoffset: cometOffset }}
                filter="url(#vj-blur)"
                vectorEffect="non-scaling-stroke"
              />
            </motion.svg>
          </motion.div>
        </motion.div>

        {/* ---- everything that rides the golden path ---- */}
        <div
          ref={boxRef}
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
          aria-hidden
        >
          {RIDERS.map(r => {
            const m = motions[r.key];
            if (!m) return null;
            return <PathRider key={r.key} rider={r} m={m} />;
          })}
        </div>

        {/* ---- atmosphere ---- */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_32%,oklch(0.16_0.032_260_/_0.92)_92%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay [background-image:repeating-linear-gradient(0deg,transparent_0_2px,oklch(1_0_0_/_0.25)_2px_3px)]" />

        {/* ---- act captions ---- */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[62vh] bg-[linear-gradient(to_top,oklch(0.16_0.032_260_/_0.97)_18%,oklch(0.16_0.032_260_/_0.72)_46%,transparent_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-6 pb-16 sm:pb-20">
          <div className="relative mx-auto h-40 max-w-2xl text-center">
            {SCENES.map((s, i) => {
              const stop = stopAt(i);
              const halfGap = 1 / (SCENES.length - 1) / 2;
              return (
                <Caption
                  key={s.id}
                  scene={s}
                  index={i}
                  p={p}
                  range={[
                    stop - halfGap * 0.75,
                    stop - halfGap * 0.2,
                    stop + halfGap * 0.2,
                    stop + halfGap * 0.75,
                  ]}
                />
              );
            })}
          </div>
        </div>

        {/* ---- film progress rail ---- */}
        <div className="absolute right-5 top-1/2 z-20 hidden h-52 w-px -translate-y-1/2 bg-border md:block">
          <motion.div
            className="h-full w-full origin-top bg-gold-gradient shadow-[0_0_14px_oklch(0.79_0.13_84_/_0.9)]"
            style={{ scaleY: progressScale }}
          />
          {STOPS.map((s, i) => (
            <span
              key={i}
              className="absolute -left-[3px] h-[7px] w-[7px] -translate-y-1/2 rotate-45 border border-primary/60 bg-background"
              style={{ top: `${s * 100}%` }}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-6 z-20 flex justify-center">
          <span className="font-sans text-[0.6rem] tracking-monument uppercase text-primary/70">
            Scroll to travel through the artwork
          </span>
        </div>
      </div>
    </section>
  );
}

function Caption({
  scene,
  index,
  p,
  range,
}: {
  scene: Scene;
  index: number;
  p: MotionValue<number>;
  range: number[];
}) {
  const opacity = useTransform(p, range, [0, 1, 1, 0]);
  const y = useTransform(p, range, [26, 0, 0, -26]);
  const blur = useTransform(p, range, [
    "blur(10px)",
    "blur(0px)",
    "blur(0px)",
    "blur(10px)",
  ]);

  return (
    <motion.div
      className="absolute inset-x-0 top-0"
      style={{ opacity, y, filter: blur }}
    >
      <p className="font-sans text-[0.6rem] tracking-monument uppercase text-primary/85">
        {scene.act} — {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="mt-3 text-3xl sm:text-5xl">
        <span className="text-gold-gradient drop-shadow-[0_6px_30px_oklch(0.16_0.032_260_/_1)]">
          {scene.title}
        </span>
      </h3>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-foreground/90 [text-shadow:0_2px_18px_oklch(0.16_0.032_260_/_0.95)] sm:text-base">
        {scene.body}
      </p>
    </motion.div>
  );
}
