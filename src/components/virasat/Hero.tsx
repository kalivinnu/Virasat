import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import heroImage from "@/assets/hero.jpg";
import { DustField, Lotus } from "./atoms";
import { User } from "lucide-react";

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.6], ["blur(0px)", "blur(12px)"]);

  const show = ready ? "visible" : "hidden";

  return (
    <section ref={ref} id="hero" className="relative h-[100svh] w-full overflow-hidden">
      <motion.div className="absolute inset-0 will-change-transform" style={{ y, scale, filter: blur }}>
        <img
          src={heroImage}
          alt="Golden dusk over ancient Indian temple ghats"
          width={1920}
          height={1088}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-hero-veil" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,oklch(0.79_0.13_84_/_0.15)_0%,transparent_70%)] pointer-events-none" />
      <DustField />

      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center will-change-transform"
        style={{ y: textY, opacity: fade }}
      >
        <motion.div
          className="text-primary"
          initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
          animate={show === "visible" ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.2, delay: 0.1 }}
        >
          <Lotus className="h-12 w-16 drop-shadow-[0_0_25px_oklch(0.79_0.13_84_/_0.6)]" />
        </motion.div>

        <motion.h1
          className="mt-6 text-5xl tracking-[0.25em] sm:text-7xl md:text-8xl"
          initial={{ opacity: 0, y: 35, filter: "blur(16px)" }}
          animate={show === "visible" ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-gold-gradient drop-shadow-lg">VIRASAT</span>
        </motion.h1>

        <motion.p
          className="mt-5 font-display text-xl text-foreground/90 sm:text-3xl tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={show === "visible" ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.65 }}
        >
          Preserve the Past. Verify the Truth. Inspire the Future.
        </motion.p>

        <motion.p
          className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base font-sans"
          initial={{ opacity: 0, y: 16 }}
          animate={show === "visible" ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.85 }}
        >
          An immersive cinematic museum of India’s forgotten histories, uncatalogued manuscripts,
          and defiant freedom struggles waiting to be brought into the light.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={show === "visible" ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <a
            href="#story"
            className="group relative rounded-sm bg-gold-gradient px-8 py-3.5 font-sans text-[0.7rem] tracking-monument uppercase text-primary-foreground shadow-2xl transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="relative z-10">Enter Cinematic Journey</span>
          </a>
          <a
            href="/auth"
            className="rounded-sm border border-primary/60 px-8 py-3.5 font-sans text-[0.7rem] tracking-monument uppercase text-primary bg-primary/5 backdrop-blur-md transition-all duration-300 hover:bg-primary/20 hover:border-primary flex items-center gap-2"
          >
            <User className="w-3.5 h-3.5" />
            <span>Researcher Portal</span>
          </a>
        </motion.div>

        <motion.div
          className="absolute bottom-10 flex flex-col items-center gap-3 text-primary/70"
          initial={{ opacity: 0 }}
          animate={show === "visible" ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 1.5 }}
        >
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-border/60 pt-1 bg-background/20 backdrop-blur-sm">
            <motion.span
              className="h-2 w-1 rounded-full bg-primary"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          <span className="font-sans text-[0.58rem] tracking-monument uppercase">
            Scroll to experience history
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
