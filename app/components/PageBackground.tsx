"use client";
import { useEffect, useRef } from "react";
import "./LoadingScreen.css";

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.12  0 0 0 0 0.10  0 0 0 0 0.08  0 0 0 0.18 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

const COLORS = ["#2d6e75","#d4623a","#a8333a","#c69633","#5a2a3a","#3a8a8f","#e8825a"];

export default function PageBackground() {
  const specksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = specksRef.current;
    if (!root) return;

    // ── Filled specks — styled manually (no ls-speck class) so CSS
    //    animations don't conflict with GSAP scroll transforms ──────────
    for (let i = 0; i < 160; i++) {
      const s = document.createElement("span");
      const size = 2 + Math.pow(Math.random(), 2.4) * 22;
      const c    = COLORS[Math.floor(Math.random() * COLORS.length)];
      Object.assign(s.style, {
        position:     "absolute",
        borderRadius: "50%",
        width:  size + "px",
        height: size + "px",
        left: Math.random() * 100 + "%",
        top:  Math.random() * 100 + "%",
        background:   c,
        opacity:      String(0.12 + Math.random() * 0.28),
        filter:       `blur(${Math.random() < 0.25 ? 1 : 0}px)`,
        mixBlendMode: "multiply",
        pointerEvents:"none",
      });
      s.dataset.type = "speck";
      root.appendChild(s);
    }

    // ── Outline rings ────────────────────────────────────────────────────
    for (let i = 0; i < 60; i++) {
      const r    = document.createElement("span");
      const size = 28 + Math.random() * 64;
      const c    = COLORS[Math.floor(Math.random() * COLORS.length)];
      Object.assign(r.style, {
        position:     "absolute",
        borderRadius: "50%",
        width:  size + "px",
        height: size + "px",
        left: Math.random() * 96 + "%",
        top:  Math.random() * 96 + "%",
        border:      `1px solid ${c}`,
        background:   "transparent",
        opacity:      String(0.15 + Math.random() * 0.2),
        mixBlendMode: "multiply",
        pointerEvents:"none",
      });
      root.appendChild(r);
    }

  }, []);

  return (
    <>
      {/* Fixed layer: gradient + blooms + grain stay anchored to the viewport */}
      <div
        style={{
          position:     "fixed",
          inset:        0,
          zIndex:       0,
          pointerEvents:"none",
          overflow:     "hidden",
          background:
            "radial-gradient(120% 80% at 50% 0%, #ffffff 0%, #faf5ef 45%, #f2e9e0 100%)",
        }}
      >
        <div className="ls-blooms" style={{ opacity: 0.18 }}>
          <div className="ls-bloom ls-b1" />
          <div className="ls-bloom ls-b2" />
          <div className="ls-bloom ls-b3" />
          <div className="ls-bloom ls-b4" />
        </div>
        <div
          style={{
            position: "absolute", inset: "-2%",
            opacity: 0.32, mixBlendMode: "multiply",
            backgroundImage: GRAIN,
          }}
        />
      </div>

      {/* Absolute layer: specks scroll with the page so each section has its own dots */}
      <div
        ref={specksRef}
        style={{
          position:     "absolute",
          inset:        0,
          zIndex:       0,
          pointerEvents:"none",
        }}
      />
    </>
  );
}
