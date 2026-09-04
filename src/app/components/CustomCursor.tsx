import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest("a, button, [role='button'], label, input, textarea, select, [data-hover]"));
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const animate = () => {
      const ease = 0.12;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * ease;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  if (typeof window === "undefined") return null;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s",
          transform: "translate(-50%, -50%)",
          willChange: "left, top",
        }}
      >
        <div
          style={{
            width: isClicking ? "6px" : isHovering ? "4px" : "6px",
            height: isClicking ? "6px" : isHovering ? "4px" : "6px",
            borderRadius: "50%",
            background: "#EAB308",
            boxShadow: "0 0 10px #EAB308, 0 0 20px rgba(234,179,8,0.6)",
            transition: "width 0.15s, height 0.15s",
          }}
        />
      </div>

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998]"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s",
          transform: "translate(-50%, -50%)",
          willChange: "left, top",
        }}
      >
        <div
          style={{
            width: isClicking ? "20px" : isHovering ? "48px" : "32px",
            height: isClicking ? "20px" : isHovering ? "48px" : "32px",
            borderRadius: isHovering ? "4px" : "50%",
            border: `1px solid ${isHovering ? "rgba(253,224,71,0.9)" : "rgba(234,179,8,0.6)"}`,
            boxShadow: isHovering
              ? "0 0 15px rgba(234,179,8,0.4), inset 0 0 10px rgba(234,179,8,0.1)"
              : "0 0 8px rgba(234,179,8,0.3)",
            transition: "width 0.2s ease, height 0.2s ease, border-radius 0.2s ease, border-color 0.2s ease",
            transform: isHovering ? "rotate(45deg)" : "rotate(0deg)",
          }}
        />
      </div>
    </>
  );
}
