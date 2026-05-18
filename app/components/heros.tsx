"use client";
import { useEffect, useRef, useState } from "react";
import "./LoadingScreen.css";

const ROLES = [
  "Software Developer",
  "Frontend Engineer",
  "React Developer",
  "Backend Developer",
  "DevOps Engineer",
];


interface Props { loadingDone: boolean; }

export default function HeroSection({ loadingDone }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [roleIdx, setRoleIdx] = useState(0);
  const [visible, setVisible] = useState(true);

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

  // Specks now live in PageBackground — nothing to generate here

  return (
    <section
      ref={sectionRef}
      style={{ position: "relative", minHeight: "100dvh" }}
    >

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
        <div className="ls-tag" style={{ textAlign: "center", opacity: 1, animation: "none", transform: "none" }}>
          A passionate{" "}
          <em style={{ color: "#a8333a", fontStyle: "italic", fontWeight: 600,
            opacity: visible ? 1 : 0, transition: "opacity 0.4s ease" }}>
            {ROLES[roleIdx]}
          </em>
          {" "}· building with care &amp; craft.
        </div>
      </div>

      {/* ── CTA buttons — where the progress bar lived ── */}
      <div className="hero-cta-wrap" style={{ opacity: loadingDone ? 1 : 0, transition: "opacity 0.7s 0.5s" }}>
        <a href="#about" className="hero-cta-primary">
          View My Work ↗
        </a>
        <a href="#contact" className="hero-cta-secondary">
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
