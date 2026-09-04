import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Terminal, ChevronRight } from "lucide-react";

function useInViewOnce(
  ref: React.RefObject<HTMLElement | null>,
  margin = "0px",
) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: margin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [margin]);
  return inView;
}

const SKILL_CATEGORIES = [
  {
    id: "dev",
    label: "Development",
    cmd: "ls ./dev --verbose",
    color: "#EAB308",
    categories: [
      { name: "Web Development", level: 68 },
      { name: "AI & Machine Learning", level: 42 },
      { name: "Databases", level: 60 },
      { name: "Version Control", level: 95 },
    ],
    tools: [
      "HTML",
      "CSS",
      "JavaScript",
      "Java",
      "Python",
      "PyTorch",
      "SQL",
      "Git",
      "GitHub",
    ],
  },
  {
    id: "pentest",
    label: "Penetration Testing",
    cmd: "ls ./pentest --verbose",
    color: "#FDE047",
    categories: [
      { name: "Web Application Testing", level: 30 },
      { name: "Network Penetration", level: 51 },
      { name: "Mobile App Security", level: 28 },
      { name: "Source Code Security", level: 60 },
    ],
    tools: [
      "Burp Suite",
      "Nmap",
      "Metasploit",
      "OWASP ZAP",
      "SQLMap",
      "MobSF",
      "Semgrep",
      "Nikto",
    ],
  },
  {
    id: "network",
    label: "Network Security",
    cmd: "ls ./network --verbose",
    color: "#CA8A04",
    categories: [
      { name: "Firewall Configuration", level: 84 },
      { name: "VPN & Encryption", level: 79 },
      { name: "Network Monitoring", level: 66 },
      { name: "DDoS Mitigation", level: 51 },
    ],
    tools: [
      "Wireshark",
      "Snort",
      "Suricata",
      "Zeek",
      "pfSense",
      "OpenVPN",
      "iptables",
      "Cloudflare",
    ],
  },
  {
    id: "cloud",
    label: "Cloud Security",
    cmd: "ls ./cloud --verbose",
    color: "#EAB308",
    categories: [
      { name: "AWS Security", level: 72 },
      { name: "Azure Security", level: 57 },
      { name: "Container Security", level: 30 },
      { name: "IAM & Access Control", level: 60 },
    ],
    tools: [
      "AWS IAM",
      "CloudTrail",
      "Microsoft Defender for Cloud",
      "Docker",
      "Kubernetes",
      "Trivy",
      "Terraform",
      "Azure Entra ID",
    ],
  },
  {
    id: "incident",
    label: "Incident Response",
    cmd: "ls ./incident --verbose",
    color: "#FDE047",
    categories: [
      { name: "Threat Hunting", level: 70 },
      { name: "Digital Forensics", level: 64 },
      { name: "Malware Analysis", level: 60 },
      { name: "SOC Operations", level: 48 },
    ],
    tools: [
      "Splunk",
      "Wazuh",
      "Autopsy",
      "Volatility",
      "Ghidra",
      "YARA",
      "Velociraptor",
      "TheHive",
    ],
  },
];

function SkillBar({
  name,
  level,
  color,
  delay,
}: {
  name: string;
  level: number;
  color: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(ref, "-50px");

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <ChevronRight size={12} className="text-yellow-500" />
          <span className="font-mono-tech text-sm text-foreground/70 group-hover:text-foreground transition-colors">
            {name}
          </span>
        </div>
        <span
          className="font-mono-tech text-xs"
          style={{ color }}
        >
          {inView ? `${level}%` : "---"}
        </span>
      </div>
      <div className="h-[3px] bg-foreground/10 rounded relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={
            inView ? { width: `${level}%` } : { width: 0 }
          }
          transition={{
            duration: 0.9,
            delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="h-full rounded"
          style={{
            background: `linear-gradient(to right, #78350F, ${color})`,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
        {inView && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              duration: 0.9,
              delay,
              ease: "easeOut",
            }}
            className="absolute top-0 bottom-0 w-12"
            style={{
              background: `linear-gradient(to right, transparent, ${color}90, transparent)`,
            }}
          />
        )}
      </div>
    </div>
  );
}

function TerminalPrompt({
  text,
  delay,
}: {
  text: string;
  delay: number;
}) {
  const [displayed, setDisplayed] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(ref, "-50px");

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(iv);
      }, 35);
      return () => clearInterval(iv);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [inView, text, delay]);

  return (
    <div
      ref={ref}
      className="flex items-center gap-2 font-mono-tech text-sm"
    >
      <span className="text-yellow-500">dedsec@localhost</span>
      <span className="text-foreground/30">:</span>
      <span className="text-yellow-300">~</span>
      <span className="text-foreground/30">$</span>
      <span className="text-foreground/70 ml-1">
        {displayed}
      </span>
      {displayed.length < text.length && (
        <span className="inline-block w-[7px] h-[14px] bg-yellow-500 cursor-blink" />
      )}
    </div>
  );
}

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState("dev");
  const activeCat = SKILL_CATEGORIES.find(
    (c) => c.id === activeTab,
  )!;
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(sectionRef, "-100px");

  return (
    <section
      id="skills"
      className="py-32 px-6 bg-background relative overflow-hidden dedsec-slashes"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent opacity-60" />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(234,179,8,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-6 bg-yellow-600" />
            <span className="font-mono-tech text-yellow-500 text-xs uppercase tracking-widest">
              // Expertise
            </span>
          </div>
          <h2
            className="font-bebas text-[clamp(3rem,8vw,6rem)] leading-none text-foreground"
            style={{
              textShadow: "0 0 40px rgba(234,179,8,0.15)",
            }}
          >
            SKILLS
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border overflow-hidden"
          style={{
            borderColor: "var(--terminal-border)",
            background: "var(--terminal-bg)",
            boxShadow:
              "0 0 30px rgba(234,179,8,0.06), inset 0 0 30px rgba(0,0,0,0.1)",
          }}
        >
          {/* Terminal title bar */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{
              borderColor: "var(--terminal-border)",
              background: "rgba(0,0,0,0.1)",
            }}
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/40" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                <div className="w-3 h-3 rounded-full bg-yellow-600/80 neon-pulse" />
              </div>
              <Terminal
                size={12}
                className="text-yellow-600 ml-2"
              />
              <span className="font-mono-tech text-yellow-600 text-xs">
                TERMINAL v2.0.26
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 cursor-blink" />
              <span className="font-mono-tech text-yellow-700 text-xs">
                CONNECTED
              </span>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {inView && (
              <>
                <TerminalPrompt
                  text="whoami --skills"
                  delay={0}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="font-mono-tech text-xs text-foreground/40 pl-4 space-y-0.5"
                >
                  <p>{">"} Loading skill matrix...</p>
                  <p>{">"} Decrypting expertise data...</p>
                  <p style={{ color: "#EAB308" }}>
                    {">"} ACCESS GRANTED
                  </p>
                </motion.div>
              </>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.4 }}
              className="flex flex-wrap gap-2 pt-2"
            >
              {SKILL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`font-mono-tech text-xs px-4 py-2 border transition-all duration-300 uppercase tracking-widest ${
                    activeTab === cat.id
                      ? "border-yellow-500 text-yellow-400 bg-yellow-950/30"
                      : "border-foreground/10 text-foreground/40 hover:border-yellow-800 hover:text-foreground/60"
                  }`}
                  style={
                    activeTab === cat.id
                      ? {
                          boxShadow:
                            "0 0 12px rgba(234,179,8,0.3)",
                        }
                      : {}
                  }
                >
                  [{cat.label}]
                </button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.6 }}
            >
              <TerminalPrompt
                text={activeCat.cmd}
                delay={1.6}
              />
            </motion.div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 pl-4 pt-2"
            >
              {activeCat.categories.map((cat, i) => (
                <SkillBar
                  key={cat.name}
                  name={cat.name}
                  level={cat.level}
                  color={activeCat.color}
                  delay={i * 0.1}
                />
              ))}
            </motion.div>

            <motion.div
              key={`tools-${activeTab}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="pl-4 pt-2"
            >
              <div className="flex flex-wrap gap-3">
                {activeCat.tools.map((tool) => (
                  <div
                    key={tool}
                    className="border rounded px-4 py-2 font-mono-tech text-sm transition-all duration-300"
                    style={{
                      borderColor: "rgba(234,179,8,0.3)",
                      color: activeCat.color,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        activeCat.color;
                      e.currentTarget.style.background =
                        "rgba(234,179,8,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(234,179,8,0.3)";
                      e.currentTarget.style.background =
                        "transparent";
                    }}
                  >
                    {tool}
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="flex items-center gap-2 font-mono-tech text-sm pt-2">
              <span className="text-yellow-500">
                dedsec@localhost
              </span>
              <span className="text-foreground/30">:</span>
              <span className="text-yellow-300">~</span>
              <span className="text-foreground/30">$</span>
              <span className="inline-block w-[7px] h-[14px] bg-yellow-500 cursor-blink ml-1" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}