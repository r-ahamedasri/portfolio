import { useEffect, useState } from "react";
import { HeroSection } from "./components/HeroSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { CertificationSection } from "./components/CertificationSection";
import { EducationSection } from "./components/EducationSection";
import { ContactSection } from "./components/ContactSection";
import { NavBar } from "./components/NavBar";
import { CustomCursor } from "./components/CustomCursor";
import { ParticleCanvas } from "./components/ParticleCanvas";
import logoSrc from "../imports/Logo.png";

const BACKGROUND_CIRCLES = {
  skills: [
    { size: 240, left: "-7%", top: "10%", opacity: 0.09 },
    { size: 360, left: "78%", top: "55%", opacity: 0.1 },
  ],
  projects: [
    { size: 400, left: "-12%", top: "48%", opacity: 0.1 },
    { size: 210, left: "68%", top: "4%", opacity: 0.08 },
    { size: 290, left: "88%", top: "72%", opacity: 0.12 },
  ],
  certifications: [
    { size: 320, left: "6%", top: "-18%", opacity: 0.1 },
    { size: 190, left: "76%", top: "35%", opacity: 0.08 },
    { size: 370, left: "-14%", top: "72%", opacity: 0.09 },
  ],
  education: [
    { size: 280, left: "-9%", top: "28%", opacity: 0.1 },
    { size: 410, left: "72%", top: "-12%", opacity: 0.08 },
    { size: 220, left: "54%", top: "76%", opacity: 0.12 },
  ],
  contact: [
    { size: 350, left: "76%", top: "18%", opacity: 0.1 },
    { size: 240, left: "-8%", top: "62%", opacity: 0.08 },
  ],
} as const;

type AtmosphereSection = keyof typeof BACKGROUND_CIRCLES;

function PageAtmosphere() {
  const sections = Object.keys(BACKGROUND_CIRCLES) as AtmosphereSection[];
  const [sectionBounds, setSectionBounds] = useState<Record<string, { top: number; height: number }>>({});

  useEffect(() => {
    const updateBounds = () => {
      const bounds: Record<string, { top: number; height: number }> = {};
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (!element) return;
        const rect = element.getBoundingClientRect();
        bounds[section] = { top: rect.top + window.scrollY, height: rect.height };
      });
      setSectionBounds(bounds);
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
      <div
        className="absolute left-0 right-0 opacity-30"
        style={{ top: sectionBounds.skills?.top, height: sectionBounds.skills ? `calc(100% - ${sectionBounds.skills.top}px)` : undefined }}
      >
        <ParticleCanvas count={90} connectionDistance={150} repelRadius={100} colorShift />
      </div>
      {sections.map((section) => (
        <div key={section} className="absolute left-0 right-0" style={{ top: sectionBounds[section]?.top, height: sectionBounds[section]?.height }}>
          {BACKGROUND_CIRCLES[section].map((circle, index) => (
            <div
              key={`${section}-${index}`}
              className="absolute rounded-full border border-amber-400"
              style={{
                width: circle.size,
                height: circle.size,
                left: circle.left,
                top: circle.top,
                opacity: circle.opacity,
                animation: `background-circle-drift ${28 + index * 3}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");

    // Set favicon
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.type = "image/png";
    link.href = logoSrc;
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <CustomCursor />
      <PageAtmosphere />
      <NavBar />
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificationSection />
      <EducationSection />
      <ContactSection />
    </div>
  );
}
