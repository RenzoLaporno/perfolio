"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./LoadingScreen.css";

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  "Software Developer",
  "Frontend Engineer",
  "React Developer",
  "Backend Developer",
  "DevOps Engineer",
];

const GRAIN_URI =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.12  0 0 0 0 0.10  0 0 0 0 0.08  0 0 0 0.18 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

const MONO: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  textTransform: "uppercase" as const,
};


interface Props { loadingDone: boolean; }

export default function HeroSection({ loadingDone }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const specksRef  = useRef<HTMLDivElement>(null);
  const [roleIdx, setRoleIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  // Paint trail — dots stretch into vertical trails on scroll down, retract on scroll up
  useEffect(() => {
    if (!loadingDone) return;
    const section = sectionRef.current;
    const root    = specksRef.current;
    if (!section || !root) return;

    const items = Array.from(root.children) as HTMLElement[];
    const triggers: ScrollTrigger[] = [];

    items.forEach(item => {
      // Only full colored dots get the trail — skip outline rings
      if (!item.classList.contains('ls-speck')) return;

      const size = parseFloat(item.style.width || "0");
      if (size < 6) return; // skip microscopic dots

      const depth = 0.2 + Math.random() * 0.8;

      // Anchor at top so the trail grows downward from the circle's position
      gsap.set(item, { transformOrigin: "50% 0%" });

      const tween = gsap.to(item, {
        scaleY: 1 + depth * 7,        // circle → paint trail
        opacity: `-=${0.25 * depth}`, // trail thins like real paint
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => triggers.forEach(t => t.kill());
  }, [loadingDone]);

  // Cycle roles: fade out → swap text → fade in
  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setRoleIdx(i => (i + 1) % ROLES.length);
        setVisible(true);
      }, 450);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const root = specksRef.current;
    if (!root) return;
    const colors = ['#2d6e75','#d4623a','#a8333a','#c69633','#5a2a3a','#3a8a8f','#e8825a'];

    // Filled specks — lighter opacity for hint-of-color feel
    for (let i = 0; i < 65; i++) {
      const s = document.createElement('span');
      s.className = 'ls-speck';
      const size = 2 + Math.pow(Math.random(), 2.4) * 22;
      const c = colors[Math.floor(Math.random() * colors.length)];
      Object.assign(s.style, {
        width: size + 'px', height: size + 'px',
        left: Math.random() * 100 + '%', top: Math.random() * 100 + '%',
        background: c,
        opacity: String(0.12 + Math.random() * 0.30),
        filter: `blur(${Math.random() < 0.25 ? 1 : 0}px)`,
        mixBlendMode: 'multiply',
      });
      s.style.setProperty('--d', (0.3 + Math.random() * 2.5).toFixed(2) + 's');
      s.style.setProperty('--fx', ((Math.random() * 2 - 1) * 24).toFixed(1) + 'px');
      s.style.setProperty('--fy', ((Math.random() * 2 - 1) * 24).toFixed(1) + 'px');
      s.style.setProperty('--fdur', (5 + Math.random() * 7).toFixed(1) + 's');
      root.appendChild(s);
    }

    // Outline rings — the hollow circles visible in the screenshot
    for (let i = 0; i < 10; i++) {
      const r = document.createElement('span');
      const size = 28 + Math.random() * 60;
      const c = colors[Math.floor(Math.random() * colors.length)];
      Object.assign(r.style, {
        position: 'absolute',
        width: size + 'px', height: size + 'px',
        left: Math.random() * 96 + '%', top: Math.random() * 90 + '%',
        borderRadius: '50%',
        border: `1px solid ${c}`,
        background: 'transparent',
        opacity: String(0.18 + Math.random() * 0.22),
        mixBlendMode: 'multiply',
      });
      root.appendChild(r);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        /* no overflow:hidden — specks need to drift past the edge */
        background: "radial-gradient(120% 80% at 50% 0%, #ffffff 0%, #faf5ef 45%, #f2e9e0 100%)",
      }}
    >
      {/* Blooms + grain clipped independently so they don't bleed */}
      <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
        <div className="ls-blooms" style={{ opacity: 0.18 }}>
          <div className="ls-bloom ls-b1" />
          <div className="ls-bloom ls-b2" />
          <div className="ls-bloom ls-b3" />
          <div className="ls-bloom ls-b4" />
        </div>
        <div style={{ position:"absolute", inset:"-2%", opacity:0.35, mixBlendMode:"multiply", backgroundImage:GRAIN_URI }} />
      </div>

      {/* Specks — overflow visible so parallax drift shows */}
      <div ref={specksRef} style={{ position:"absolute", inset:0, overflow:"visible" }} />

      {/* ── Center ── */}
      <div className="ls-center">

        {/* Software Engineer label — uses ls-eyebrow class so height exactly
            matches the loading screen, keeping Renzo pixel-locked */}
        <div
          className="ls-eyebrow"
          style={{ animation: "none", opacity: 1, transform: "none", fontSize: 13 }}
        >
          <span className="ls-dot" />Software Engineer<span className="ls-dot" />
        </div>

        <div className="ls-wordmark" aria-label="Renzo">
          <span className="ls-ghost">Renzo</span>
          <span className="ls-wordmark-fill" style={{ ["--reveal" as string]: "100%" }}>
            Renzo
          </span>
        </div>

        {/* Tagline — cycling role is pure inline so it never changes line height */}
        <div className="ls-tag">
          A passionate{" "}
          <em style={{ color: "#a8333a", fontStyle: "italic", fontWeight: 600,
            opacity: visible ? 1 : 0, transition: "opacity 0.4s ease" }}>
            {ROLES[roleIdx]}
          </em>
          {" "}· building with care &amp; craft.
        </div>
      </div>

      {/* ── CTA buttons — where the progress bar lived ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "9vh",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 14,
          whiteSpace: "nowrap",
          opacity: loadingDone ? 1 : 0,
          transition: "opacity 0.7s 0.5s",
        }}
      >
        <a href="#about" style={{ ...MONO, fontSize:10, letterSpacing:".22em", padding:"13px 26px", background:"#2d6e75", color:"#f3ece1", borderRadius:4, textDecoration:"none" }}>
          View My Work ↗
        </a>
        <a href="#contact" style={{ ...MONO, fontSize:10, letterSpacing:".22em", padding:"13px 26px", border:"1px solid rgba(28,26,23,0.22)", color:"#3a342c", borderRadius:4, textDecoration:"none" }}>
          Get in Touch
        </a>
      </div>

      {/* ── Footer labels ── */}
      <div className="ls-footer-l" style={{ opacity: 1, animation: "none" }}>
        EST · 2024 — Lima → Worldwide
      </div>
      <div className="ls-footer-r" style={{ opacity: 1, animation: "none" }}>
        Hand-painted with HTML &amp; CSS
      </div>
    </section>
  );
}
