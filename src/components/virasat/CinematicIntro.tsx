import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import heroImage from "@/assets/hero.jpg";
import { DustField, Lotus } from "./atoms";

const WORD = "VIRASAT".split("");

export function CinematicIntro({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);

  const finish = () => {
    setVisible(false);
    onDone();
  };

  useEffect(() => {
    if (reduced) {
      finish();
      return;
    }
    const t = setTimeout(finish, 5200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-background"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.img
            src={heroImage}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.18 }}
            animate={{ opacity: 0.4, scale: 1.06 }}
            transition={{ duration: 4.6, delay: 2.4, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-hero-veil" />
          <DustField />

          <div className="relative z-10 px-6 text-center">
            <motion.div
              className="mx-auto h-px bg-gold-gradient"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "min(34rem, 78vw)", opacity: 1 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="mt-8 flex justify-center text-primary"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.3, delay: 1.1 }}
            >
              <Lotus className="h-12 w-16 drop-shadow-[0_0_22px_oklch(0.79_0.13_84_/_0.55)]" />
            </motion.div>

            <h1 className="mt-6 flex justify-center text-5xl tracking-[0.22em] sm:text-7xl md:text-8xl">
              {WORD.map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-gold-gradient"
                  initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, delay: 1.7 + i * 0.13 }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="mt-6 font-display text-lg text-foreground/85 sm:text-2xl"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 3.1 }}
            >
              Preserve the Past. Verify the Truth. Inspire the Future.
            </motion.p>
          </div>

          <motion.button
            type="button"
            onClick={finish}
            className="absolute bottom-10 right-6 z-10 rounded-full border border-border px-5 py-2 font-sans text-[0.62rem] tracking-monument uppercase text-primary/80 transition-colors hover:bg-primary/10 sm:right-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Skip intro
          </motion.button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
