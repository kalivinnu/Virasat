import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Lotus } from "./atoms";
import { Menu, X, ShieldCheck, User } from "lucide-react";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Story", href: "#story" },
    { label: "Timeline", href: "#timeline" },
    { label: "Heritage Map", href: "#map" },
    { label: "Freedom Fighters", href: "#fighters" },
    { label: "Culture", href: "#culture" },
    { label: "Archive", href: "#archive" },
    { label: "Verify", href: "#verify" },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-45 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border/40 py-3 shadow-2xl shadow-black/50"
            : "bg-gradient-to-b from-background/90 via-background/40 to-transparent py-5"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="text-primary transition-transform duration-500 group-hover:scale-110">
              <Lotus className="w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl tracking-[0.25em] text-gold-gradient font-semibold">
                VIRASAT
              </span>
              <span className="font-sans text-[0.55rem] tracking-monument uppercase text-muted-foreground">
                Living Museum
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-sans text-[0.7rem] tracking-widest uppercase text-foreground/80 hover:text-primary transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-right hover:after:origin-left after:duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="/auth"
              className="flex items-center gap-2 rounded-sm border border-border/70 px-4 py-2 font-sans text-[0.65rem] tracking-monument uppercase text-primary bg-primary/5 hover:bg-primary/15 transition-all duration-300 shadow-sm"
            >
              <User className="w-3.5 h-3.5 text-primary" />
              <span>Researcher Login</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-foreground hover:text-primary transition-colors p-2"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Scroll Progress Indicator Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-deep via-gold to-gold-soft origin-left"
          style={{ scaleX }}
        />
      </motion.header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-background/98 backdrop-blur-xl flex flex-col justify-between px-8 py-12 lg:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="flex items-center justify-between border-b border-border/30 pb-6">
            <div className="flex items-center gap-3">
              <Lotus className="w-6 h-6 text-primary" />
              <span className="font-display text-2xl tracking-[0.25em] text-gold-gradient">
                VIRASAT
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="text-foreground hover:text-primary p-2"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          <div className="flex flex-col gap-6 my-auto py-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-display text-2xl tracking-wide text-foreground/90 hover:text-primary transition-colors flex items-center justify-between group"
              >
                <span>{item.label}</span>
                <span className="text-xs font-sans tracking-monument text-primary opacity-0 group-hover:opacity-100 transition-opacity uppercase">
                  Explore →
                </span>
              </a>
            ))}
          </div>

          <div className="border-t border-border/30 pt-6 flex flex-col gap-4">
            <a
              href="/auth"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-3 rounded-sm bg-gold-gradient font-sans text-xs tracking-monument uppercase text-primary-foreground font-semibold shadow-lg"
            >
              Researcher Login
            </a>
            <p className="text-center font-sans text-[0.6rem] text-muted-foreground tracking-widest uppercase">
              India's Living Heritage Museum
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
}
