import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { eras } from "./data";
import { SectionHeading, Ornament, DustField } from "./atoms";

/* ------------------------------------------------------------------
 * Camera / perspective model
 * A milestone at relative depth d (0 = at the camera, larger = further
 * down the path) is projected onto the screen with a single vanishing
 * point, so scale, vertical position and horizontal drift all fall off
 * together — the depth cue that makes the path read as 3D.
 * ---------------------------------------------------------------- */
const VANISH_Y = 9; // % from top — where the path disappears
const NEAR_Y = 74; // % from top — where the current milestone sits
const CURVE = 1.35; // winding frequency of the golden path
const AMPLITUDE = 36; // world-space horizontal swing of the path

const depthZ = (d: number) => 1 + Math.max(d, -0.72) * 1.05;
const worldX = (u: number) => Math.sin(u * CURVE) * AMPLITUDE;
const projectY = (d: number) => VANISH_Y + (NEAR_Y - VANISH_Y) / depthZ(d);
const projectX = (u: number, d: number) => 50 + worldX(u) / depthZ(d);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

type Era = (typeof eras)[number];

function Milestone({
  era,
  index,
  camera,
  onSelect,
}: {
  era: Era;
  index: number;
  camera: MotionValue<number>;
  onSelect: (i: number) => void;
}) {
  const depth = useTransform(camera, (c) => index - c);

  const left = useTransform(depth, (d) => `${projectX(index, d)}%`);
  const top = useTransform(depth, (d) => `${projectY(d)}%`);
  const scale = useTransform(depth, (d) => clamp(1.02 / depthZ(d), 0.14, 1.12));
  const opacity = useTransform(depth, (d) =>
    d < -0.6 ? clamp(1 + (d + 0.6) / 0.55, 0, 1) : clamp(1.35 - d * 0.19, 0, 1),
  );
  const filter = useTransform(depth, (d) => {
    const far = clamp((d - 1.1) * 1.35, 0, 6);
    const past = clamp(-(d + 0.15) * 7, 0, 8);
    const dim = clamp(1 - Math.abs(Math.min(d, 0)) * 0.25 - clamp(d * 0.08, 0, 0.45), 0.45, 1);
    return `blur(${(far + past).toFixed(2)}px) brightness(${dim.toFixed(2)})`;
  });
  const zIndex = useTransform(depth, (d) => Math.round(600 - d * 40));
  const cardShift = useTransform(depth, (d) => clamp(18 - d * 4, 0, 18));

  const isFreedom = era.id === "freedom";
  // Anchor the lantern node — not the card — on the projected path point.
  const onRight = worldX(index) > 0;

  return (
    <motion.div
      className="absolute h-0 w-0"
      style={{
        left,
        top,
        scale,
        opacity,
        filter,
        zIndex,
        x: "-50%",
        y: "-50%",
        willChange: "transform, opacity, filter",
      }}
    >
      <button
        type="button"
        onClick={() => onSelect(index)}
        className={`absolute top-0 flex w-[30rem] -translate-y-1/2 items-center gap-4 text-left ${
          onRight ? "right-[-1.5rem] flex-row-reverse" : "left-[-1.5rem]"
        }`}
      >
        {/* lantern node on the path */}
        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-gold-gradient opacity-25 blur-md" />
          <span className="absolute inset-[3px] rounded-full border border-primary/70 bg-navy-deep/90" />
          <span className="relative font-display text-lg text-gold-gradient">{index + 1}</span>
        </span>

        <motion.div
          style={{ y: cardShift }}

          className={`relative flex-1 rounded-xl border bg-gradient-to-br from-card/95 via-card/80 to-navy-deep/95 px-5 py-4 shadow-deep backdrop-blur-md ${
            isFreedom ? "border-primary/70 glow-gold" : "border-primary/25"
          }`}
        >
          {isFreedom ? (
            <span
              aria-hidden
              className="absolute -top-3 right-4 flex h-3 w-16 overflow-hidden rounded-sm shadow-deep"
            >
              <span className="flex-1 bg-saffron" />
              <span className="flex-1 bg-ivory" />
              <span className="flex-1 bg-verified" />
            </span>
          ) : null}

          <p className="font-sans text-[0.58rem] tracking-monument uppercase text-primary/85">
            {era.range}
          </p>
          <h3 className="mt-1.5 font-display text-2xl leading-tight text-gold-gradient">
            {era.label}
          </h3>
          <p className="mt-1 font-display text-base text-foreground/85">{era.headline}</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{era.body}</p>
          {isFreedom ? (
            <p className="mt-3 flex items-center gap-2 font-sans text-[0.55rem] tracking-monument uppercase text-primary/80">
              <span className="inline-block h-3 w-3 rounded-full border border-primary/80" />
              Freedom at midnight — 15 August 1947
            </p>
          ) : null}
        </motion.div>
      </button>
    </motion.div>

  );
}

export function TimelineSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const rawCamera = useTransform(scrollYProgress, [0, 1], [-0.35, eras.length - 0.7]);
  const smooth = useSpring(rawCamera, { stiffness: 90, damping: 26, mass: 0.7 });
  const camera = reduced ? rawCamera : smooth;

  // Parallax haze layers drift against the camera for depth.
  const hazeNear = useTransform(camera, (c) => `${-worldX(c) * 0.9}%`);
  const hazeFar = useTransform(camera, (c) => `${-worldX(c) * 0.32}%`);
  const horizonFade = useTransform(camera, [0, eras.length - 1], [0.25, 0.6]);

  const draw = (c: number) => {
    const next = clamp(Math.round(c), 0, eras.length - 1);
    setActive((prev) => (prev === next ? prev : next));

    // Redraw the golden path imperatively — no React re-render per frame.
    const pts: string[] = [];
    for (let t = -0.75; t <= eras.length + 1.2; t += 0.12) {
      const u = c + t;
      pts.push(`${projectX(u, t).toFixed(2)},${projectY(t).toFixed(2)}`);
    }
    const d = `M ${pts.join(" L ")}`;
    pathRef.current?.setAttribute("d", d);
    glowRef.current?.setAttribute("d", d);
  };

  useMotionValueEvent(camera, "change", draw);

  useEffect(() => {
    draw(camera.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = (i: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const span = el.offsetHeight - window.innerHeight;
    const p = (i + 0.35) / (eras.length - 0.35);
    window.scrollTo({ top: el.offsetTop + span * clamp(p, 0, 1), behavior: "smooth" });
  };

  return (
    <section id="timeline" className="relative border-t border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-6 pt-28 md:px-12">
        <SectionHeading
          kicker="A Chronological Odyssey"
          title="The Historical Journey"
          subtitle="Scroll to travel the golden road — each milestone rises out of the distance as the age before it recedes."
        />
      </div>

      <div ref={wrapRef} style={{ height: `${(eras.length + 1) * 100}vh` }} className="relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* depth atmosphere */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[62%] bg-gradient-to-b from-navy-deep via-navy/70 to-transparent"
            style={{ opacity: horizonFade }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[10%] h-72 w-[70rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
            style={{ x: hazeFar }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[52%] h-[34rem] w-[95rem] -translate-x-1/2 rounded-[50%] bg-navy/70 blur-[90px]"
            style={{ x: hazeNear }}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-deep to-transparent" />
          <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_180px_60px_var(--navy-deep)]" />
          <DustField className="opacity-60" />

          {/* winding golden path */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="virasat-path" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="var(--gold-soft)" stopOpacity="0.95" />
                <stop offset="45%" stopColor="var(--gold)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="var(--gold-deep)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              ref={glowRef}
              fill="none"
              stroke="url(#virasat-path)"
              strokeWidth="3.4"
              strokeLinecap="round"
              opacity="0.45"
              style={{ filter: "blur(1.6px)" }}
              vectorEffect="non-scaling-stroke"
            />
            <path
              ref={pathRef}
              fill="none"
              stroke="url(#virasat-path)"
              strokeWidth="0.9"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* milestones */}
          <div className="absolute inset-0">
            {eras.map((era, i) => (
              <Milestone key={era.id} era={era} index={i} camera={camera} onSelect={goTo} />
            ))}
          </div>

          {/* chapter readout */}
          <div className="pointer-events-none absolute inset-x-0 bottom-6 z-[900] flex flex-col items-center gap-3">
            <Ornament label={`Chapter ${active + 1} of ${eras.length}`} />
            <div className="flex items-center gap-2">
              {eras.map((era, i) => (
                <span
                  key={era.id}
                  className={`h-1 rounded-full transition-all duration-700 ${
                    i === active ? "w-10 bg-gold-gradient" : "w-4 bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
