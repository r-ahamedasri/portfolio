import { motion, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";
import { ArrowUpRight, X, Code2, ShieldCheck, ExternalLink } from "lucide-react";

interface Project {
  index: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  tech: string[];
  icon: typeof Code2;
  status: string;
  type: string;
  url: string;
}

const PROJECTS: Project[] = [
  {
    index: "01",
    title: "Hash Identifier",
    shortDesc: "A CLI tool for analyzing and identifying hash formats.",
    longDesc:
      "A Python-based security tool designed to identify unknown hash formats. Features include algorithm detection, prefix and pattern analysis, confidence scoring, ranked results, and non-hash detection. Built for fast and reliable hash analysis.",
    tech: ["Python", "CLI", "Hash Analysis"],
    icon: Code2,
    status: "COMPLETED",
    type: "Threat Analysis",
    url: "https://github.com/r-ahamedasri/hash-identifier",
  },
  {
    index: "02",
    title: "OriginAI",
    shortDesc: "AI-powered product sustainability analyzer.",
    longDesc:
      "An AI-powered Digital Product Passport platform that analyzes products and generates insights on materials, sustainability, supply chain, carbon footprint, repairability, and recycling using a multi-agent AI pipeline.",
    tech: ["Python", "Google ADK", "Gemini", "AI Agents", "APIs", "Pytest"],
    icon: Code2,
    status: "COMPLETED",
    type: "Multi-Agent AI",
    url: "https://github.com/r-ahamedasri/originai",
  },
];

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setTilt({ x, y });
  };

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={() => setHovered(true)}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: hovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        background: "var(--terminal-bg)",
        borderColor: "var(--terminal-border)",
      }}
      className="group relative border overflow-hidden cursor-pointer"
    >
      {/* Hover gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(135deg, rgba(234,179,8,0.08) 0%, transparent 50%, rgba(120,53,15,0.06) 100%)" }}
      />

      {/* Top border glow on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(to right, transparent, #EAB308, #FDE047, #EAB308, transparent)",
          boxShadow: "0 0 12px rgba(234,179,8,0.6)",
        }}
      />

      {/* Left border glow */}
      <div
        className="absolute top-0 left-0 bottom-0 w-[1px] opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{ background: "linear-gradient(to bottom, #EAB308, transparent)", boxShadow: "0 0 6px rgba(234,179,8,0.5)" }}
      />

      {/* Corner decoration */}
      <div
        className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        style={{ background: "linear-gradient(135deg, transparent 50%, rgba(234,179,8,0.3) 50%)" }}
      />

      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="font-mono-tech text-sm" style={{ color: "rgba(234,179,8,0.7)" }}>
              /{project.index}
            </span>
            <div className="h-px w-8 bg-yellow-900" />
            <span
              className="font-mono-tech text-xs uppercase tracking-widest px-2 py-0.5 border"
              style={{
                borderColor: "rgba(234,179,8,0.3)",
                color: "#EAB308",
                background: "rgba(234,179,8,0.06)",
              }}
            >
              {project.status}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-xs text-foreground/30 group-hover:text-foreground/60 transition-colors">
              {project.type}
            </span>
            <ArrowUpRight
              size={18}
              className="text-foreground/30 group-hover:text-yellow-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>

        <div
          className="w-12 h-12 rounded border flex items-center justify-center mb-5 group-hover:border-yellow-600/60 transition-all duration-300"
          style={{ borderColor: "rgba(234,179,8,0.2)", background: "rgba(234,179,8,0.04)" }}
        >
          <project.icon size={20} className="text-yellow-600 group-hover:text-yellow-400 transition-colors" />
        </div>

        <h3
          className="font-bebas text-3xl text-foreground mb-3 group-hover:text-yellow-300 transition-colors duration-300"
          style={{ letterSpacing: "0.02em" }}
        >
          {project.title}
        </h3>

        <p className="font-rajdhani text-foreground/50 text-base mb-6 group-hover:text-foreground/70 transition-colors leading-relaxed">
          {project.shortDesc}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="font-mono-tech text-xs px-3 py-1 border"
              style={{
                borderColor: "rgba(234,179,8,0.2)",
                color: "rgba(234,179,8,0.7)",
                background: "rgba(234,179,8,0.04)",
              }}
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="font-mono-tech text-xs px-3 py-1 text-foreground/30">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        <div className="mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="font-mono-tech text-xs text-yellow-700">
            {">"} click to expand_
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 10 }}
        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl border overflow-hidden"
        style={{
          background: "var(--terminal-bg)",
          borderColor: "rgba(234,179,8,0.4)",
          boxShadow: "0 0 60px rgba(234,179,8,0.15), 0 0 120px rgba(234,179,8,0.06)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "rgba(234,179,8,0.2)", background: "rgba(0,0,0,0.2)" }}
        >
          <div className="flex items-center gap-3">
            <span className="font-mono-tech text-yellow-500 text-sm">/{project.index}</span>
            <span className="font-mono-tech text-xs text-foreground/40 uppercase tracking-widest">
              {project.type}
            </span>
          </div>
          <button onClick={onClose} className="text-foreground/40 hover:text-yellow-400 transition-colors p-1">
            <X size={18} />
          </button>
        </div>

        <div className="p-8">
          <div
            className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
            style={{ background: "radial-gradient(circle at 100% 0%, rgba(234,179,8,0.06) 0%, transparent 70%)" }}
          />

          <div className="flex items-center gap-3 mb-2">
            <span
              className="font-mono-tech text-xs px-2 py-0.5 border"
              style={{
                borderColor: "rgba(234,179,8,0.4)",
                color: "#EAB308",
                background: "rgba(234,179,8,0.08)",
              }}
            >
              {project.status}
            </span>
          </div>

          <h2
            className="font-bebas text-5xl text-foreground mb-4"
            style={{ textShadow: "0 0 30px rgba(234,179,8,0.2)" }}
          >
            {project.title}
          </h2>

          <p className="font-rajdhani text-foreground/60 text-base leading-relaxed mb-8">
            {project.longDesc}
          </p>

          <div className="border-t border-foreground/10 pt-6">
            <p className="font-mono-tech text-yellow-600 text-xs uppercase tracking-widest mb-3">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="font-mono-tech text-xs px-3 py-1.5 border"
                  style={{
                    borderColor: "rgba(234,179,8,0.3)",
                    color: "#FDE047",
                    background: "rgba(234,179,8,0.06)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 font-rajdhani uppercase tracking-widest text-sm px-5 py-2.5 text-black clip-corner-tr"
              style={{ background: "linear-gradient(135deg, #CA8A04, #EAB308)" }}
            >
              <ExternalLink size={14} />
              View Project
            </a>
            <button
              onClick={onClose}
              className="font-rajdhani uppercase tracking-widest text-sm px-5 py-2.5 border border-foreground/20 text-foreground/50 hover:border-yellow-700 hover:text-foreground/80 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent opacity-60" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-6 bg-yellow-600" />
            <span className="font-mono-tech text-yellow-500 text-xs uppercase tracking-widest">// Selected Work</span>
          </div>
          <div className="flex items-end gap-6">
            <h2
              className="font-bebas text-[clamp(3rem,8vw,6rem)] leading-none text-foreground"
              style={{ textShadow: "0 0 40px rgba(234,179,8,0.15)" }}
            >
              PROJECTS
            </h2>
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck size={16} className="text-yellow-600" />
              <span className="font-mono-tech text-xs text-foreground/40">
                {PROJECTS.length} entries
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.index}
              project={project}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 border border-dashed border-foreground/10 p-6 flex items-center justify-center gap-3"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-800 cursor-blink" />
          <span className="font-mono-tech text-xs text-foreground/30 uppercase tracking-widest">
            More projects being compiled...
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-800 cursor-blink" style={{ animationDelay: "0.5s" }} />
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}