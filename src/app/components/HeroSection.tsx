import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ChevronDown,
} from "lucide-react";
import { ParticleCanvas } from "./ParticleCanvas";
import dedSecArt from "../../imports/image-1.png";

const TITLE = "RILA AHAMED ASRI";
const GLITCH_CHARS = "!@#$%^&*01アイウ▓░█DEDSEC";
const ROLES = [
  "Information Security Engineer",
  "Penetration Tester",
  "Cloud Security Engineer",
  "Network Security Engineer",
];


function useTypewriter(
  words: string[],
  typingSpeed = 80,
  pause = 1800,
) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(current.slice(0, charIndex + 1));
          if (charIndex + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause);
          } else {
            setCharIndex((c) => c + 1);
          }
        } else {
          setText(current.slice(0, charIndex - 1));
          if (charIndex - 1 === 0) {
            setDeleting(false);
            setWordIndex((w) => (w + 1) % words.length);
            setCharIndex(0);
          } else {
            setCharIndex((c) => c - 1);
          }
        }
      },
      deleting ? 40 : typingSpeed,
    );
    return () => clearTimeout(timeout);
  }, [
    text,
    charIndex,
    deleting,
    wordIndex,
    words,
    typingSpeed,
    pause,
  ]);

  return text;
}

function GlitchedTitle({ title }: { title: string }) {
  const [display, setDisplay] = useState(title);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const trigger = () => {
      setGlitching(true);
      let iter = 0;
      const max = title.length * 2.5;
      const iv = setInterval(() => {
        setDisplay(
          title
            .split("")
            .map((ch, i) => {
              if (ch === " ") return " ";
              if (iter > i * 2.2) return ch;
              return GLITCH_CHARS[
                Math.floor(Math.random() * GLITCH_CHARS.length)
              ];
            })
            .join(""),
        );
        iter++;
        if (iter >= max) {
          clearInterval(iv);
          setDisplay(title);
          setGlitching(false);
        }
      }, 35);
    };

    const t = setTimeout(trigger, 400);
    const iv = setInterval(trigger, 5000);
    return () => {
      clearTimeout(t);
      clearInterval(iv);
    };
  }, [title]);

  return (
    <span
      className={`glitch-hero font-bebas tracking-wider ${glitching ? "text-yellow-300" : "text-foreground"}`}
      data-text={display}
      style={{
        transition: "color 0.05s",
        textShadow: glitching
          ? "3px 0 rgba(253,224,71,0.7), -3px 0 rgba(120,53,15,0.7)"
          : "0 0 30px rgba(234,179,8,0.2)",
      }}
    >
      {display}
    </span>
  );
}

export function HeroSection() {
  const role = useTypewriter(ROLES);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const chars = "01アイウエオDEDSEC#@!%^*▓░█";
    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(
      Math.random() * -50,
    );

    let rafId: number;
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.055)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const ch =
          chars[Math.floor(Math.random() * chars.length)];
        const bright = Math.random() > 0.97;
        ctx.fillStyle = bright
          ? "rgba(253,224,71,0.9)"
          : i % 4 === 0
            ? "rgba(234,179,8,0.5)"
            : "rgba(120,53,15,0.3)";
        ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        if (
          drops[i] * fontSize > canvas.height &&
          Math.random() > 0.975
        ) {
          drops[i] = 0;
        }
        drops[i] += 0.5;
      }
      rafId = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-background scanlines scan-beam dedsec-slashes"
    >
      {/* Matrix rain */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-25"
        style={{ zIndex: 0 }}
      />

      {/* Particle network */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <ParticleCanvas
          count={65}
          connectionDistance={140}
          repelRadius={110}
        />
      </div>

      {/* DedSec art background right */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[55%] md:w-[48%] overflow-hidden"
        style={{ zIndex: 1 }}
      >
        <img
          src={dedSecArt}
          alt=""
          className="w-full h-full object-cover object-left"
          style={{
            opacity: 0.08,
            filter: "grayscale(100%) contrast(1.4)",
            mixBlendMode: "screen",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, #000 0%, transparent 30%, transparent 70%, #000 100%), linear-gradient(to bottom, #000 0%, transparent 15%, transparent 85%, #000 100%)",
          }}
        />
      </div>

      {/* Diagonal accent slashes */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {[15, 30, 50, 68, 82].map((left, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-[2px]"
            style={{
              left: `${left}%`,
              background: `linear-gradient(to bottom, transparent, rgba(234,179,8,${0.03 + i * 0.01}), transparent)`,
              transform: "skewX(-15deg)",
            }}
          />
        ))}
      </div>

      {/* Hex rings bg decoration */}
      <div
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] spin-slow"
        style={{ zIndex: 1, opacity: 0.1 }}
      >
        {[1, 2, 3].map((r) => (
          <div
            key={r}
            className="absolute inset-0 rounded-full border border-yellow-600"
            style={{
              inset: `${r * 30}px`,
              borderStyle: r % 2 === 0 ? "dashed" : "solid",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 px-6 md:px-16 max-w-7xl mx-auto w-full pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Tag line */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-3 mb-5"
          >
            <div
              className="h-px w-8 bg-yellow-500"
              style={{
                boxShadow: "0 0 6px rgba(234,179,8,0.8)",
              }}
            />
            <span className="font-mono-tech text-yellow-500 text-sm uppercase tracking-widest">
              // IDENTITY_VERIFIED :: USER_ACTIVE
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mb-2"
          >
            <h1
              className="text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] mb-1"
              style={{ letterSpacing: "-0.02em" }}
            >
              <GlitchedTitle title={TITLE} />
            </h1>
          </motion.div>

          {/* Accent bar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="flex items-center gap-4 mb-4"
          >
            <div
              className="h-[3px] w-16"
              style={{
                background:
                  "linear-gradient(to right, #CA8A04, #EAB308)",
                boxShadow: "0 0 10px rgba(234,179,8,0.7)",
              }}
            />
            <div className="h-4 w-px bg-yellow-800" />
            <div
              className="h-[3px] w-6"
              style={{ background: "rgba(234,179,8,0.4)" }}
            />
          </motion.div>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <p className="font-rajdhani text-xl md:text-2xl tracking-wide text-gray-300">
              <span className="text-yellow-500 font-mono-tech">
                ${" "}
              </span>
              <span>Aspiring </span>
              {role}
              <span className="inline-block w-[2px] h-5 bg-yellow-400 ml-1 cursor-blink align-middle" />
            </p>
          </motion.div>

          {/* Desc */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="font-rajdhani text-base max-w-xl mb-10 leading-relaxed text-gray-500"
          >
            <span className="text-yellow-600">
              {" "}
              BSc (Hons) Computer Science undergraduate at the
              University of Westminster, associated with the
              Institute of Information Technology (IIT).
            </span>
            <br />I build. I break. I learn. With a growing
            focus on cybersecurity, I explore development,
            networking, and security to understand how
            technology works, where it breaks, and how to make
            it better.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a
              href="/Asri_Resume.pdf"
              download="Asri_Resume.pdf"
              className="group relative font-rajdhani uppercase tracking-widest text-sm font-semibold px-8 py-3 text-black overflow-hidden clip-corner-tr"
              style={{
                background:
                  "linear-gradient(135deg, #CA8A04, #EAB308)",
              }}
            >
              <span className="relative z-10">
                Download Resume
              </span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #EAB308, #FDE047)",
                }}
              />
            </a>

            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group font-rajdhani uppercase tracking-widest text-sm font-semibold px-8 py-3 border border-yellow-700 text-yellow-400 hover:border-yellow-400 hover:text-yellow-300 transition-all duration-300 clip-corner-tl relative"
              style={{ background: "rgba(234,179,8,0.05)" }}
            >
              <span className="relative z-10">View Projects</span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "rgba(234,179,8,0.1)" }}
              />
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15 }}
            className="flex items-center gap-6"
          >
            {[
              {
                icon: Github,
                href: "https://github.com/r-ahamedasri",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/ahamedasri",
                label: "LinkedIn",
              },
              {
                icon: Mail,
                href: "mailto:r.ahamedasri@gmail.com",
                label: "Email",
              },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 transition-all duration-300 text-gray-600 hover:text-yellow-400"
              >
                <Icon
                  size={18}
                  className="group-hover:drop-shadow-[0_0_8px_rgba(234,179,8,0.9)] transition-all"
                />
                <span className="hidden md:inline font-mono-tech text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {label}
                </span>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 cursor-pointer"
        onClick={() =>
          document
            .getElementById("skills")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <span className="font-mono-tech text-yellow-600 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown size={20} className="text-yellow-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}