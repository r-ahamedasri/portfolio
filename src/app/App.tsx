import { useEffect } from "react";
import { HeroSection } from "./components/HeroSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { CertificationSection } from "./components/CertificationSection";
import { EducationSection } from "./components/EducationSection";
import { ContactSection } from "./components/ContactSection";
import { NavBar } from "./components/NavBar";
import { CustomCursor } from "./components/CustomCursor";
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
