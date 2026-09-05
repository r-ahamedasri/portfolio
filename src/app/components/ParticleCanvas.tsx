import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
}

interface ParticleCanvasProps {
  className?: string;
  count?: number;
  connectionDistance?: number;
  repelRadius?: number;
  colorShift?: boolean;
  sizeMultiplier?: number;
  colorScheme?: "amber" | "silver";
}

export function ParticleCanvas({
  className = "",
  count = 70,
  connectionDistance = 130,
  repelRadius = 120,
  colorShift = false,
  sizeMultiplier = 1,
  colorScheme = "amber",
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | undefined>(undefined);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const actualCount = Math.min(count, Math.floor((canvas.width * canvas.height) / 12000));
      particlesRef.current = Array.from({ length: actualCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: (Math.random() * 1.5 + 0.5) * sizeMultiplier,
        opacity: Math.random() * 0.4 + 0.15,
        hue: 45 + Math.random() * 20 - 10,
      }));
    };

    const draw = () => {
      frameRef.current++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = particlesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < repelRadius && dist > 0) {
          const force = ((repelRadius - dist) / repelRadius) * 0.35;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx *= 0.97;
        p.vy *= 0.97;

        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 2.5) {
          p.vx = (p.vx / spd) * 2.5;
          p.vy = (p.vy / spd) * 2.5;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const hue = colorShift ? p.hue + frameRef.current * 0.02 : p.hue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = colorScheme === "silver"
          ? `rgba(203, 213, 225, ${p.opacity})`
          : `hsla(${hue}, 90%, 55%, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < pts.length; j++) {
          const p2 = pts[j];
          const ddx = p.x - p2.x;
          const ddy = p.y - p2.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < connectionDistance) {
            const alpha = (1 - d / connectionDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = colorScheme === "silver"
              ? `rgba(148, 163, 184, ${alpha})`
              : `hsla(${hue}, 80%, 55%, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    const onResize = () => init();

    init();
    draw();

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [count, connectionDistance, repelRadius, colorShift]);

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} />;
}
