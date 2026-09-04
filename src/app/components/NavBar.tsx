import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import logoSrc from "../../imports/Logo.png";

const NAV_SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function NavBar() {
  const [active, setActive] = useState("hero");
  const [scrollPct, setScrollPct] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docH > 0 ? (scrollTop / docH) * 100 : 0);
      setScrolled(scrollTop > 60);

      for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_SECTIONS[i].id);
        if (el && el.offsetTop <= scrollTop + 150) {
          setActive(NAV_SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[200] h-[2px] bg-transparent">
        <motion.div
          className="h-full"
          style={{
            width: `${scrollPct}%`,
            background: "linear-gradient(to right, #CA8A04, #EAB308, #FDE047)",
            boxShadow: "0 0 8px rgba(234,179,8,0.9), 0 0 20px rgba(234,179,8,0.4)",
          }}
        />
      </div>

      <nav
        className={`fixed top-[2px] left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-black/95 backdrop-blur-xl border-b border-yellow-900/50"
            : "bg-black/70 backdrop-blur-md border-b border-yellow-900/30 md:bg-transparent md:backdrop-blur-0 md:border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between md:grid md:grid-cols-3 md:px-6 md:py-4">

          {/* Left: Logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="group flex items-center gap-2 justify-self-start"
          >
            <img
              src={logoSrc}
              alt="RAA Logo"
              className="h-9 w-9 object-contain rounded-sm transition-all duration-300 group-hover:brightness-110"
              style={{
                filter: scrolled ? "drop-shadow(0 0 6px rgba(234,179,8,0.6))" : "none",
              }}
            />
          </button>

          {/* Center: nav links */}
          <div className="hidden md:flex items-center justify-center gap-1">
            {NAV_SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`relative px-4 py-2 font-rajdhani uppercase tracking-widest text-sm transition-all duration-300 ${
                  active === s.id ? "text-yellow-400" : "text-gray-500 hover:text-gray-200"
                }`}
              >
                {active === s.id && (
                  <motion.div
                    layoutId="nav-bg"
                    className="absolute inset-0"
                    style={{
                      background: "rgba(234,179,8,0.08)",
                      border: "1px solid rgba(234,179,8,0.3)",
                    }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{s.label}</span>
                {active === s.id && (
                  <motion.div
                    layoutId="nav-line"
                    className="absolute bottom-0 left-0 right-0 h-[1px]"
                    style={{
                      background: "rgba(234,179,8,0.9)",
                      boxShadow: "0 0 6px rgba(234,179,8,0.8)",
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right: Contact button + mobile toggle */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => scrollTo("contact")}
              className="hidden md:flex items-center gap-2 px-4 py-2 font-rajdhani uppercase tracking-widest text-sm font-semibold rounded-none border border-yellow-400/40 bg-white/10 text-yellow-300 backdrop-blur-md hover:bg-white/20 hover:border-yellow-300 transition-all duration-300"
              style={{ boxShadow: "0 0 16px rgba(234,179,8,0.18)" }}
            >
              Contact
            </button>

            <button
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="md:hidden flex h-10 w-10 items-center justify-center border border-yellow-700/40 bg-black/40 text-gray-300 transition-colors hover:border-yellow-400 hover:text-yellow-400"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/98 backdrop-blur-xl border-b border-yellow-900/50 overflow-hidden"
            >
              {NAV_SECTIONS.map((s, i) => (
                <motion.button
                  key={s.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(s.id)}
                  className={`flex items-center gap-3 w-full text-left px-6 py-4 border-b border-gray-900 last:border-0 font-rajdhani uppercase tracking-widest text-sm transition-colors ${
                    active === s.id ? "text-yellow-400 bg-yellow-950/30" : "text-gray-400"
                  }`}
                >
                  <span className="font-mono-tech text-xs text-yellow-700">0{i + 1}</span>
                  {s.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: NAV_SECTIONS.length * 0.05 }}
                onClick={() => scrollTo("contact")}
                className="flex items-center gap-3 w-full text-left px-6 py-4 font-rajdhani uppercase tracking-widest text-sm font-semibold text-black bg-yellow-500 hover:bg-yellow-400 transition-colors"
              >
                Contact — Let&apos;s Talk
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
