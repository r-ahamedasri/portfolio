import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { Mail, Github, Linkedin, Terminal, Send, CheckCircle } from "lucide-react";

const CONTACTS = [
  {
    cmd: "connect --email",
    label: "Email",
    value: "r.ahamedasri@gmail.com",
    href: "mailto:r.ahamedasri@gmail.com",
    icon: Mail,
    color: "#EAB308",
  },
  {
    cmd: "connect --github",
    label: "GitHub",
    value: "github.com/r-ahamedasri",
    href: "https://github.com/r-ahamedasri",
    icon: Github,
    color: "#CA8A04",
  },
  {
    cmd: "connect --linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/ahamedasri",
    href: "https://www.linkedin.com/in/ahamedasri",
    icon: Linkedin,
    color: "#D97706",
  },
];

const BOOT_LINES = [
  { text: "Initializing secure channel...", delay: 0 },
  { text: "Encrypting connection...", delay: 0.4 },
  { text: "Bypassing firewall protocols...", delay: 0.8 },
  { text: "STATUS: SECURE CHANNEL ESTABLISHED ✓", delay: 1.2, accent: true },
];

function TypeLine({ text, delay, accent }: { text: string; delay: number; accent?: boolean }) {
  const [displayed, setDisplayed] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(iv);
      }, 28);
      return () => clearInterval(iv);
    }, delay * 1000 + 300);
    return () => clearTimeout(t);
  }, [started, text, delay]);

  return (
    <div ref={ref} className="font-mono-tech text-xs">
      <span className="text-foreground/30">{">"} </span>
      <span className={accent ? "text-yellow-400" : "text-foreground/40"}>{displayed}</span>
    </div>
  );
}

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1800));
    setSending(false);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  const inputStyle = (field: string) => ({
    background: "var(--input-field-bg)",
    border: `1px solid ${focused === field ? "rgba(234,179,8,0.7)" : "var(--input-field-border)"}`,
    boxShadow: focused === field ? "0 0 12px rgba(234,179,8,0.15), inset 0 0 8px rgba(0,0,0,0.1)" : "none",
    color: "var(--foreground)",
    outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
  });

  return (
    <section id="contact" className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent opacity-60" />
      <div className="absolute inset-0 pointer-events-none dedsec-slashes opacity-40" />

      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle at 100% 100%, rgba(234,179,8,0.04) 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-6 bg-yellow-600" />
            <span className="font-mono-tech text-yellow-500 text-xs uppercase tracking-widest">// Connect</span>
          </div>
          <h2
            className="font-bebas text-[clamp(3rem,8vw,6rem)] leading-none text-foreground"
            style={{ textShadow: "0 0 40px rgba(234,179,8,0.15)" }}
          >
            LET&apos;S TALK
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="border overflow-hidden h-full"
              style={{
                background: "var(--terminal-bg)",
                borderColor: "var(--terminal-border)",
                boxShadow: "0 0 30px rgba(234,179,8,0.04)",
              }}
            >
              {/* Title bar */}
              <div
                className="flex items-center gap-2 px-4 py-3 border-b"
                style={{ borderColor: "var(--terminal-border)", background: "rgba(0,0,0,0.1)" }}
              >
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-600 neon-pulse" />
                </div>
                <Terminal size={11} className="text-yellow-700 ml-2" />
                <span className="font-mono-tech text-yellow-700 text-xs">SECURE_CHANNEL</span>
              </div>

              <div className="p-5 space-y-3">
                {BOOT_LINES.map((line, i) => (
                  <TypeLine key={i} text={line.text} delay={line.delay} accent={line.accent} />
                ))}

                <div className="border-t border-foreground/5 pt-4 space-y-1" />

                {CONTACTS.map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <div className="font-mono-tech text-xs text-foreground/30 mb-1">
                      <span className="text-yellow-600">ops@terminal</span>:~$ {c.cmd}
                    </div>
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 border hover:border-yellow-700 bg-foreground/[0.02] hover:bg-yellow-950/20 p-3 transition-all duration-300 mb-3"
                      style={{ borderColor: "var(--terminal-border)" }}
                    >
                      <div
                        className="w-8 h-8 rounded border flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{
                          borderColor: `${c.color}30`,
                          background: `${c.color}08`,
                        }}
                      >
                        <c.icon size={15} style={{ color: c.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-mono-tech text-xs text-foreground/40 uppercase tracking-widest">{c.label}</p>
                        <p
                          className="font-mono-tech text-sm truncate group-hover:brightness-125 transition-all"
                          style={{ color: c.color }}
                        >
                          {c.value}
                        </p>
                      </div>
                      <div className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: c.color }}>
                        →
                      </div>
                    </a>
                  </motion.div>
                ))}

                <div className="flex items-center gap-2 pt-2 font-mono-tech text-xs">
                  <span className="text-yellow-600">ops@terminal</span>
                  <span className="text-foreground/30">:~$</span>
                  <span className="inline-block w-[6px] h-[12px] bg-yellow-500 cursor-blink" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="border p-8 h-full relative overflow-hidden"
              style={{
                background: "var(--terminal-bg)",
                borderColor: "var(--terminal-border)",
                boxShadow: "0 0 30px rgba(234,179,8,0.04)",
              }}
            >
              <div
                className="absolute -top-24 -right-24 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(234,179,8,0.05) 0%, transparent 70%)" }}
              />

              <div className="font-mono-tech text-yellow-600 text-xs uppercase tracking-widest mb-2">
                {">"} Transmit Message
              </div>
              <p className="font-rajdhani text-sm text-foreground/50 mb-6">
                Available for development projects, security consulting, and collaborations.
              </p>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-16 gap-4"
                  >
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.4 }}>
                      <CheckCircle
                        size={48}
                        className="text-yellow-400"
                        style={{ filter: "drop-shadow(0 0 12px rgba(234,179,8,0.7))" }}
                      />
                    </motion.div>
                    <p className="font-bebas text-2xl text-foreground">MESSAGE TRANSMITTED</p>
                    <p className="font-mono-tech text-xs text-yellow-600">Encryption: AES-256 ✓</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="font-mono-tech text-xs text-foreground/40 uppercase tracking-widest block mb-1.5">
                        Identifier (Name)
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        placeholder="Your name..."
                        className="w-full px-4 py-3 font-mono-tech text-sm"
                        style={inputStyle("name")}
                      />
                    </div>

                    <div>
                      <label className="font-mono-tech text-xs text-foreground/40 uppercase tracking-widest block mb-1.5">
                        Return Channel (Email)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 font-mono-tech text-sm"
                        style={inputStyle("email")}
                      />
                    </div>

                    <div>
                      <label className="font-mono-tech text-xs text-foreground/40 uppercase tracking-widest block mb-1.5">
                        Payload (Message)
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        placeholder="What's on your mind..."
                        rows={4}
                        className="w-full px-4 py-3 font-mono-tech text-sm resize-none"
                        style={inputStyle("message")}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full py-3 font-rajdhani uppercase tracking-widest text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 clip-corner-tr relative overflow-hidden group"
                      style={{
                        background: sending
                          ? "rgba(234,179,8,0.3)"
                          : "linear-gradient(135deg, #CA8A04, #EAB308)",
                        color: sending ? "#EAB308" : "#000",
                        boxShadow: sending ? "none" : "0 0 20px rgba(234,179,8,0.3)",
                      }}
                    >
                      <AnimatePresence mode="wait">
                        {sending ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border border-yellow-400 border-t-transparent rounded-full"
                            />
                            <span>Encrypting...</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="send"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <Send size={14} />
                            <span>Transmit</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 pt-8 border-t border-foreground/5"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-mono-tech text-xs text-foreground/30">
                © 2026 Tristan James Sintos
              </span>
              <span className="font-mono-tech text-xs text-yellow-900">•</span>
              <span className="font-mono-tech text-xs text-yellow-800">DedSec Operative</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-700 cursor-blink" />
              <span className="font-mono-tech text-xs text-foreground/30">
                Built with React + TypeScript
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
