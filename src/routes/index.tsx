import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/virasat/SiteNav";
import { CinematicIntro } from "@/components/virasat/CinematicIntro";
import { Hero } from "@/components/virasat/Hero";
import { CinematicJourney } from "@/components/virasat/CinematicJourney";
import { TimelineSection } from "@/components/virasat/TimelineSection";
import { HeritageMap } from "@/components/virasat/HeritageMap";
import { FightersSection } from "@/components/virasat/FightersSection";
import { CultureSection } from "@/components/virasat/CultureSection";
import { ArchiveSection } from "@/components/virasat/ArchiveSection";
import { VerificationSection } from "@/components/virasat/VerificationSection";
import { FinalCta } from "@/components/virasat/FinalCta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Virasat — India's Forgotten History, Preserved & Verified" },
      {
        name: "description",
        content:
          "Virasat is an immersive digital archive of India's forgotten stories, unsung freedom fighters, heritage sites and cultural treasures — researched, verified and preserved.",
      },
      { property: "og:title", content: "Virasat — India's Forgotten History" },
      {
        property: "og:description",
        content:
          "Explore hidden stories, an interactive heritage map, historical timeline and a verified digital archive of India's heritage.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <CinematicIntro onDone={() => setReady(true)} />
      <SiteNav />
      <main>
        <h1 className="sr-only">
          Virasat — preserving, verifying and sharing India's forgotten history
        </h1>
        <Hero ready={ready} />
        <CinematicJourney />
        <TimelineSection />
        <HeritageMap />
        <FightersSection />
        <CultureSection />
        <ArchiveSection />
        <VerificationSection />
        <FinalCta />
      </main>
    </>
  );
}
