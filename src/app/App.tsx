import { useEffect } from "react";
import { HeroSection } from "./components/HeroSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { CertificationSection } from "./components/CertificationSection";
import { EducationSection } from "./components/EducationSection";
import { ContactSection } from "./components/ContactSection";
import { NavBar } from "./components/NavBar";
import { CustomCursor } from "./components/CustomCursor";
import { ParticleCanvas } from "./components/ParticleCanvas";
import { Analytics } from "@vercel/analytics/react";
import logoSrc from "../imports/Logo.png";

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
      <Analytics />
      <CustomCursor />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 opacity-80"
        style={{ top: "100vh" }}
        aria-hidden="true"
      >
        <ParticleCanvas
          count={50000}
          connectionDistance={145}
          repelRadius={90}
          colorShift
          sizeMultiplier={1.5}
          colorScheme="silver"
        />
      </div>
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
