import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
  GraduationCap,
  Users,
  BookOpen,
  Network,
  Shield,
  Clock,
  Brain,
} from "lucide-react";

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

const EDUCATION = [
  {
    period: "Jan 2026 — Present",
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Westminster",
    description:
      "Pursuing a well-rounded Computer Science degree while focusing on AI & machine learning, cybersecurity, and networking. Active in research and collaborative development projects.",
    highlights: [
      "Software Engineering",
      "AI & Machine Learning",
      "Cybersecurity",
      "Networking",
      "Databases",
    ],
    icon: GraduationCap,
    status: "ENROLLED",
    color: "#EAB308",
  },
  {
    period: "Feb 2025 — Jun 2025",
    degree: "Certificate in Information Technology and English",
    institution: "BCAS Campus",
    description: "Developed a strong foundation in information technology and English, building practical skills in computing, communication, and problem-solving.",
    highlights: [
      "Information Technology",
      "Computer Fundamentals",
      "English Language",
      "Communication Skills"
    ],
    icon: GraduationCap,
    status: "Completed",
    color: "#EAB308",
  },
  {
    period: "Current",
    degree: "Member — IEEE",
    institution: "IEEE Student Branch of IIT",
    description:
      "Engaging with a global community of technology and engineering professionals while exploring new developments and technical resources.",
    highlights: [
      "IEEE",
      "IEEE Computer Society",
      "IEEE Robotics & Automation Society",
    ],
    icon: Users,
    status: "ACTIVE",
    color: "#FDE047",
  },
];

const COURSES = [
  { icon: BookOpen, label: "Software Engineering", level: 71 },
  {
    icon: Shield,
    label: "Cybersecurity Fundamentals",
    level: 85,
  },
  { icon: Network, label: "Network Infrastructure", level: 63 },
  { icon: Brain, label: "AI & Machine Learning", level: 36 },
];

function CircuitNode({
  active,
  pulse,
}: {
  active: boolean;
  pulse?: boolean;
}) {
  return (
    <div className="relative flex-shrink-0">
      <div
        className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
          active
            ? "border-yellow-400 bg-yellow-900/60"
            : "border-foreground/10 bg-background"
        } ${pulse ? "neon-pulse" : ""}`}
      />
      {active && (
        <motion.div
          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full border border-yellow-500"
        />
      )}
    </div>
  );
}

export function EducationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(sectionRef, "-80px");
  const [hoveredIndex, setHoveredIndex] = useState<
    number | null
  >(null);

  return (
    <section
      id="education"
      className="py-32 px-6 bg-background relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent opacity-60" />

      <div className="absolute inset-0 pointer-events-none dedsec-slashes opacity-50" />
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
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
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-6 bg-yellow-600" />
            <span className="font-mono-tech text-yellow-500 text-xs uppercase tracking-widest">
              // Background
            </span>
          </div>
          <h2
            className="font-bebas text-[clamp(3rem,8vw,6rem)] leading-none text-foreground"
            style={{
              textShadow: "0 0 40px rgba(234,179,8,0.15)",
            }}
          >
            EDUCATION
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Circuit line */}
              <div className="absolute left-2 top-4 bottom-4 w-px">
                <div className="absolute inset-0 bg-foreground/10" />
                <motion.div
                  initial={{ scaleY: 0, originY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{
                    duration: 1.2,
                    delay: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, #EAB308, #CA8A04, #78350F)",
                    boxShadow: "0 0 8px rgba(234,179,8,0.4)",
                  }}
                />
              </div>

              <div className="space-y-12 pl-10">
                {EDUCATION.map((item, i) => (
                  <motion.div
                    key={item.degree}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.4 + i * 0.25,
                    }}
                    className="relative"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="absolute -left-[42px] top-1">
                      <CircuitNode
                        active={inView}
                        pulse={i === 0}
                      />
                    </div>

                    <div
                      className={`border p-6 transition-all duration-400 overflow-hidden relative`}
                      style={{
                        background: "var(--terminal-bg)",
                        borderColor:
                          hoveredIndex === i
                            ? "rgba(234,179,8,0.5)"
                            : "var(--terminal-border)",
                        boxShadow:
                          hoveredIndex === i
                            ? "0 0 20px rgba(234,179,8,0.1)"
                            : "none",
                      }}
                    >
                      {/* Top accent */}
                      <div
                        className={`absolute top-0 left-0 right-0 h-[1px] transition-all duration-500 ${
                          hoveredIndex === i
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                        style={{
                          background: `linear-gradient(to right, transparent, ${item.color}, transparent)`,
                          boxShadow: `0 0 8px ${item.color}`,
                        }}
                      />

                      {/* Left accent bar */}
                      <div
                        className="absolute top-0 left-0 bottom-0 w-[2px]"
                        style={{
                          background: `linear-gradient(to bottom, ${item.color}, transparent)`,
                          boxShadow: `0 0 6px ${item.color}60`,
                        }}
                      />

                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="w-10 h-10 rounded border flex items-center justify-center flex-shrink-0"
                          style={{
                            borderColor: `${item.color}40`,
                            background: `${item.color}10`,
                          }}
                        >
                          <item.icon
                            size={18}
                            style={{ color: item.color }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <div className="flex items-center gap-1">
                              <Clock
                                size={10}
                                className="text-foreground/40"
                              />
                              <span className="font-mono-tech text-foreground/40 text-xs">
                                {item.period}
                              </span>
                            </div>
                            <span
                              className="font-mono-tech text-xs px-2 py-0.5 border"
                              style={{
                                borderColor: `${item.color}40`,
                                color: item.color,
                                background: `${item.color}10`,
                              }}
                            >
                              {item.status}
                            </span>
                          </div>
                          <h3 className="font-bebas text-xl text-foreground leading-tight">
                            {item.degree}
                          </h3>
                          <p className="font-rajdhani text-sm text-foreground/50 mt-0.5">
                            {item.institution}
                          </p>
                        </div>
                      </div>

                      <p className="font-rajdhani text-sm text-foreground/50 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {item.highlights.map((h) => (
                          <span
                            key={h}
                            className="font-mono-tech text-xs px-2 py-0.5 border"
                            style={{
                              borderColor: `${item.color}25`,
                              color: `${item.color}cc`,
                              background: `${item.color}06`,
                            }}
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <div className="font-mono-tech text-yellow-600 text-xs uppercase tracking-widest mb-4">
                {">"} Core Competencies
              </div>

              <div className="space-y-5">
                {COURSES.map((course, i) => (
                  <motion.div
                    key={course.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7 + i * 0.15 }}
                    className="group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <course.icon
                        size={14}
                        className="text-yellow-600 group-hover:text-yellow-400 transition-colors"
                      />
                      <span className="font-rajdhani text-sm text-foreground/60 group-hover:text-foreground/80 transition-colors">
                        {course.label}
                      </span>
                      <span className="font-mono-tech text-xs text-yellow-700 ml-auto">
                        {course.level}%
                      </span>
                    </div>
                    <div className="h-1 bg-foreground/10 rounded overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={
                          inView
                            ? { width: `${course.level}%` }
                            : {}
                        }
                        transition={{
                          duration: 1,
                          delay: 0.9 + i * 0.15,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="h-full rounded"
                        style={{
                          background:
                            "linear-gradient(to right, #78350F, #EAB308)",
                          boxShadow:
                            "0 0 6px rgba(234,179,8,0.5)",
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Status card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.1 }}
              className="border p-5"
              style={{
                background: "var(--terminal-bg)",
                borderColor: "rgba(234,179,8,0.2)",
                boxShadow:
                  "inset 0 0 20px rgba(234,179,8,0.02)",
              }}
            >
              <p className="font-mono-tech text-xs text-yellow-600 uppercase tracking-widest mb-3">
                {">"} User Status
              </p>
              {[
                { label: "Academic Standing", val: "Good" },
                { label: "Expected Graduation", val: "2028" },
                {
                  label: "Specialization",
                  val: "Cybersecurity + AI/ML",
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between py-1.5 border-b border-foreground/5 last:border-0"
                >
                  <span className="font-rajdhani text-sm text-foreground/50">
                    {row.label}
                  </span>
                  <span className="font-mono-tech text-xs text-yellow-400">
                    {row.val}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}