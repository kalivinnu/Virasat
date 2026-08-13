import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { STATE_HERITAGE_MAP, type StateHeritage } from "./stateHeritageData";
import { stateHero, stateGallery } from "./stateImages";
import { Reveal, Ornament, Lotus, DustField } from "./atoms";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Landmark,
  Sparkles,
  MapPin,
  Award,
  Utensils,
  CalendarDays,
} from "lucide-react";

export const FALLBACK_STATE = "karnataka";

export function getStateData(stateId: string): StateHeritage {
  return (
    STATE_HERITAGE_MAP[stateId] ??
    (STATE_HERITAGE_MAP[FALLBACK_STATE] as StateHeritage)
  );
}

// Access-gating only: the archive composition, imagery, and typography remain unchanged for logged-in visitors.
export function StateHeritagePage({
  stateId,
  onBackToMap,
  onSelectState,
  isAccessGated = false,
  onLogin = () => {},
}: {
  stateId: string;
  onBackToMap: () => void;
  onSelectState: (id: string) => void;
  isAccessGated?: boolean;
  onLogin?: () => void;
}) {
  const data = getStateData(stateId);
  const gallery = stateGallery(data.id);
  const hero = stateHero(data.id);

  const keys = Object.keys(STATE_HERITAGE_MAP);
  const idx = Math.max(0, keys.indexOf(data.id));
  const prevKey = keys[(idx - 1 + keys.length) % keys.length] ?? FALLBACK_STATE;
  const nextKey = keys[(idx + 1) % keys.length] ?? FALLBACK_STATE;
  const prevState = getStateData(prevKey);
  const nextState = getStateData(nextKey);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroFade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [stateId]);

  return (
    <motion.div
      key={data.id}
      className="min-h-screen bg-background text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={
          isAccessGated
            ? "pointer-events-none select-none blur-[7px]"
            : undefined
        }
        aria-hidden={isAccessGated}
      >
        {/* Sticky archive bar */}
        <div className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-background/85 px-5 py-3 backdrop-blur-xl">
          <button
            type="button"
            onClick={onBackToMap}
            className="group flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 font-sans text-[0.6rem] tracking-monument uppercase text-primary transition-colors hover:bg-primary/20"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to India Map
          </button>

          <span className="hidden items-center gap-3 font-sans text-[0.6rem] tracking-monument uppercase text-muted-foreground sm:flex">
            <Lotus className="h-4 w-6 text-primary" />
            Virasat Regional Archive
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelectState(prevKey)}
              className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 font-sans text-[0.58rem] uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-3 w-3" /> {prevState.name}
            </button>
            <button
              type="button"
              onClick={() => onSelectState(nextKey)}
              className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 font-sans text-[0.58rem] uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              {nextState.name} <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* ---------- HERO: everything essential visible on the first screen ---------- */}
        <section
          ref={heroRef}
          className="relative min-h-[calc(100svh-3.5rem)] overflow-hidden"
        >
          <motion.div
            className="absolute inset-0"
            style={{ scale: heroScale, y: heroY }}
          >
            <motion.img
              src={hero}
              alt={`${data.name} heritage landscape`}
              width={1536}
              height={864}
              className="h-full w-full object-cover"
              initial={{ scale: 1.35, filter: "blur(18px)" }}
              animate={{ scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-hero-veil" />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,oklch(0.16_0.032_260_/_0.94)_0%,oklch(0.16_0.032_260_/_0.72)_42%,oklch(0.16_0.032_260_/_0.42)_70%,oklch(0.16_0.032_260_/_0.7)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,oklch(0.79_0.13_84_/_0.16),transparent_65%)]" />

          <DustField />

          <motion.div
            className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-14 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:pt-24"
            style={{ opacity: heroFade }}
          >
            <div>
              <motion.span
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 font-sans text-[0.58rem] tracking-monument uppercase text-primary"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <MapPin className="h-3.5 w-3.5" /> Regional Heritage Dossier
              </motion.span>

              <motion.h1
                className="mt-5 text-5xl leading-none sm:text-7xl md:text-8xl"
                initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 1.1,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span className="text-gold-gradient">{data.name}</span>
              </motion.h1>

              <motion.p
                className="mt-4 max-w-2xl font-display text-xl italic text-foreground/90 sm:text-2xl"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.45 }}
              >
                {data.tagline}
              </motion.p>

              <motion.p
                className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6 }}
              >
                {data.description}
              </motion.p>

              <motion.div
                className="mt-7 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.75 }}
              >
                {[
                  {
                    label: "Historical chapters",
                    value: data.historicalHighlights.length,
                  },
                  {
                    label: "Monuments catalogued",
                    value: data.architecture.length,
                  },
                  {
                    label: "Living art forms",
                    value: data.cultureAndArts.length + data.festivals.length,
                  },
                  { label: "Timeline entries", value: data.timeline.length },
                ].map(s => (
                  <div
                    key={s.label}
                    className="rounded-lg border border-border bg-card/70 px-4 py-2.5 backdrop-blur-md"
                  >
                    <p className="font-display text-2xl text-primary">
                      {s.value}
                    </p>
                    <p className="font-sans text-[0.55rem] tracking-monument uppercase text-muted-foreground">
                      {s.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* First-screen dossier: earliest era + first monument, no scroll needed */}
            <motion.aside
              className="rounded-2xl border border-border bg-card/75 p-6 backdrop-blur-xl shadow-deep"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="flex items-center gap-2 font-sans text-[0.6rem] tracking-monument uppercase text-primary">
                <Sparkles className="h-3.5 w-3.5" /> At a glance
              </h2>

              {data.historicalHighlights[0] ? (
                <div className="mt-5">
                  <p className="font-sans text-[0.55rem] uppercase tracking-widest text-muted-foreground">
                    {data.historicalHighlights[0].period}
                  </p>
                  <p className="mt-1 font-display text-xl text-foreground">
                    {data.historicalHighlights[0].title}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {data.historicalHighlights[0].text}
                  </p>
                </div>
              ) : null}

              <div className="mt-5 border-t border-border/60 pt-5">
                <p className="font-sans text-[0.55rem] uppercase tracking-widest text-muted-foreground">
                  Signature monument
                </p>
                <p className="mt-1 font-display text-lg text-primary">
                  {data.architecture[0]?.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {data.architecture[0]?.desc}
                </p>
              </div>

              <div className="mt-5 border-t border-border/60 pt-5">
                <p className="font-sans text-[0.55rem] uppercase tracking-widest text-muted-foreground">
                  First recorded milestone
                </p>
                <p className="mt-1 text-xs leading-relaxed text-foreground/85">
                  <span className="text-primary">{data.timeline[0]?.year}</span>{" "}
                  — {data.timeline[0]?.event}
                </p>
              </div>
            </motion.aside>
          </motion.div>

          <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-center">
            <span className="font-sans text-[0.55rem] tracking-monument uppercase text-primary/70">
              Scroll to explore {data.name}
            </span>
          </div>
        </section>

        {/* ---------- HISTORICAL CHAPTERS ---------- */}
        <section className="border-t border-border/50 bg-background py-24">
          <div className="mx-auto max-w-6xl px-6">
            <SubHeading
              kicker="Chronicles of power & culture"
              title="Historical Chapters"
            />
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {data.historicalHighlights.map((h, i) => (
                <Reveal
                  key={h.title}
                  delay={i * 0.08}
                  className="rounded-2xl border border-border bg-card/70 p-7 transition-colors hover:border-primary/60"
                >
                  <span className="font-sans text-[0.55rem] uppercase tracking-widest text-primary/80">
                    {h.period}
                  </span>
                  <h3 className="mt-3 font-display text-xl text-foreground">
                    {h.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {h.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- MONUMENTS ---------- */}
        <section className="border-y border-border/50 bg-card/25 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <SubHeading
              kicker="Masterpieces in stone"
              title="Monuments & Architecture"
            />
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {data.architecture.map((a, i) => (
                <Reveal
                  key={a.title}
                  delay={i * 0.08}
                  className="group overflow-hidden rounded-2xl border border-border bg-card/70"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={gallery[i % gallery.length]}
                      alt={a.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="flex items-center gap-2 font-display text-lg text-foreground">
                      <Landmark className="h-4 w-4 text-primary" /> {a.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {a.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CULTURE / FESTIVALS ---------- */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-6xl px-6">
            <SubHeading
              kicker="Living traditions"
              title="Culture, Arts & Festivals"
            />
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {[...data.cultureAndArts, ...data.festivals].map((c, i) => (
                <Reveal
                  key={c.title}
                  delay={i * 0.06}
                  className="flex gap-5 rounded-2xl border border-border bg-card/60 p-6"
                >
                  <div className="mt-1 h-10 w-10 shrink-0 rounded-full border border-primary/40 bg-primary/10 text-primary">
                    <Lotus className="h-full w-full p-1.5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-foreground">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {c.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- IMAGE STRIP ---------- */}
        <section className="border-y border-border/50 bg-card/25 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <SubHeading
              kicker="Visual archive"
              title={`Frames from ${data.name}`}
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {gallery.map((img, i) => (
                <Reveal
                  key={i}
                  delay={i * 0.07}
                  className="overflow-hidden rounded-xl border border-border"
                >
                  <img
                    src={img}
                    alt={`${data.name} heritage frame ${i + 1}`}
                    loading="lazy"
                    className="h-48 w-full object-cover transition-transform duration-[1.4s] hover:scale-110"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- PEOPLE ---------- */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-6xl px-6">
            <SubHeading
              kicker="Voices of the region"
              title="Figures Who Shaped It"
            />
            <div className="mt-14 grid gap-8 md:grid-cols-2">
              {data.famousPersonalities.map((p, i) => (
                <Reveal
                  key={p.name}
                  delay={i * 0.08}
                  className="rounded-2xl border border-border bg-card/70 p-7"
                >
                  <h3 className="flex items-center gap-2 font-display text-xl text-primary">
                    <Award className="h-4 w-4" /> {p.name}
                  </h3>
                  <p className="mt-1 font-sans text-[0.55rem] uppercase tracking-widest text-muted-foreground">
                    {p.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.desc}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CUISINE & CRAFTS ---------- */}
        <section className="border-y border-border/50 bg-card/25 py-20">
          <div className="mx-auto max-w-5xl px-6">
            <SubHeading kicker="Hands & hearths" title="Cuisine & Crafts" />
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {data.cuisineAndCrafts.map((c, i) => (
                <Reveal
                  key={c.title}
                  delay={i * 0.07}
                  className="rounded-2xl border border-border bg-background/60 p-6"
                >
                  <h3 className="flex items-center gap-2 font-display text-lg text-foreground">
                    <Utensils className="h-4 w-4 text-primary" /> {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {c.desc}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- TIMELINE ---------- */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-4xl px-6">
            <SubHeading
              kicker="Chronology"
              title={`The ${data.name} Timeline`}
            />
            <div className="relative mt-14 pl-8">
              <span className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-gold-gradient opacity-60" />
              {data.timeline.map((t, i) => (
                <Reveal
                  key={t.year + i}
                  delay={i * 0.07}
                  className="relative pb-10 last:pb-0"
                >
                  <span className="absolute -left-8 top-1.5 h-3.5 w-3.5 rotate-45 border border-primary bg-background shadow-[0_0_14px_oklch(0.79_0.13_84_/_0.7)]" />
                  <p className="flex items-center gap-2 font-sans text-[0.6rem] tracking-monument uppercase text-primary">
                    <CalendarDays className="h-3.5 w-3.5" /> {t.year}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                    {t.event}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- FOOTER NAV ---------- */}
        <section className="border-t border-border/60 bg-card/30 py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <Ornament label="Continue the journey" />
            <h2 className="mt-8 text-3xl sm:text-4xl">
              <span className="text-gold-gradient">
                Travel to another region
              </span>
            </h2>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={onBackToMap}
                className="rounded-sm bg-gold-gradient px-7 py-3 font-sans text-[0.62rem] tracking-monument uppercase text-primary-foreground transition-transform hover:-translate-y-1"
              >
                Back to India Map
              </button>
              <button
                type="button"
                onClick={() => onSelectState(nextKey)}
                className="rounded-sm border border-primary/50 px-7 py-3 font-sans text-[0.62rem] tracking-monument uppercase text-primary transition-colors hover:bg-primary/15"
              >
                Next: {nextState.name}
              </button>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {keys.map(k => {
                const s = getStateData(k);
                const active = k === data.id;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => onSelectState(k)}
                    className={`rounded-full border px-3.5 py-1.5 font-sans text-[0.55rem] uppercase tracking-widest transition-colors ${
                      active
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-border text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {s.name}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {isAccessGated ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/30 px-6 py-10 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-to-explore-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-primary/40 bg-background/95 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-10">
            <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-monument text-primary">
              Virasat Regional Archive
            </p>
            <h2
              id="login-to-explore-title"
              className="mt-3 text-4xl text-gold-gradient sm:text-5xl"
            >
              Login to Explore
            </h2>
            <p className="mx-auto mt-4 max-w-sm font-sans text-sm leading-relaxed text-muted-foreground">
              Sign in to uncover this region&apos;s full heritage archive,
              stories, and verified records.
            </p>
            <button
              type="button"
              onClick={onLogin}
              className="mt-7 inline-flex items-center justify-center rounded-sm bg-gold-gradient px-7 py-3 font-sans text-[0.65rem] font-semibold uppercase tracking-monument text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Login
            </button>
          </div>
        </div>
      ) : null}
    </motion.div>
  );
}

function SubHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <motion.header
      className="text-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="flex items-center justify-center gap-2 font-sans text-[0.58rem] tracking-monument uppercase text-primary/80">
        <BookOpen className="h-3.5 w-3.5" /> {kicker}
      </p>
      <h2 className="mt-3 text-3xl sm:text-5xl">
        <span className="text-gold-gradient">{title}</span>
      </h2>
    </motion.header>
  );
}
