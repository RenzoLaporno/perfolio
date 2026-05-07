"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "./components/heros";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/navbar";

gsap.registerPlugin(ScrollTrigger);

// Skill definitions: name + 3px top-stripe brand color
const SKILLS: { name: string; color: string }[] = [
  { name: "GSAP",          color: "#2d6e75" },
  { name: "React",         color: "#d4623a" },
  { name: "Next.js",       color: "#a8333a" },
  { name: "Tailwind",      color: "#c69633" },
  { name: "Framer Motion", color: "#5a2a3a" },
  { name: "TypeScript",    color: "#3a8a8f" },
];

export default function Portfolio() {
  const [loadingDone, setLoadingDone] = useState(false);

  const heroRef       = useRef<HTMLDivElement>(null);
  const aboutRef      = useRef<HTMLElement>(null);
  const aboutLeftRef  = useRef<HTMLDivElement>(null);
  const aboutCardRef  = useRef<HTMLDivElement>(null);
  const skillsRef     = useRef<HTMLElement>(null);
  const contentRef    = useRef<HTMLDivElement>(null);

  // Lock body scroll during loading
  useEffect(() => {
    if (!loadingDone) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [loadingDone]);

  // Entrance animations after loading — all existing logic preserved
  useEffect(() => {
    if (!loadingDone) return;

    // ── About section ────────────────────────────────────────────────────
    if (aboutRef.current) {
      const heading = aboutRef.current.querySelector<HTMLElement>("h2");

      // Heading: brush-stroke wipe left → right
      if (heading) {
        gsap.set(heading, { clipPath: "inset(0 100% 0 0)" });
        gsap.to(heading, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: heading, start: "top 82%" },
        });
      }

      // Left column: fade up
      gsap.from(aboutLeftRef.current, {
        y: 50, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: aboutLeftRef.current, start: "top 82%" },
      });

      // Right card: slide in from right
      gsap.from(aboutCardRef.current, {
        x: 60, opacity: 0, scale: 0.96, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: aboutCardRef.current, start: "top 82%" },
        delay: 0.15,
      });
    }

    // ── Skills section ────────────────────────────────────────────────────
    if (skillsRef.current) {
      const heading = skillsRef.current.querySelector<HTMLElement>("h2");

      // Heading: same brush-stroke wipe
      if (heading) {
        gsap.set(heading, { clipPath: "inset(0 100% 0 0)" });
        gsap.to(heading, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: heading, start: "top 82%" },
        });
      }

      // Cards: stagger scale + fade up
      const skillItems = skillsRef.current.querySelectorAll(".skill");
      if (skillItems.length) {
        gsap.from(skillItems, {
          y: 36, opacity: 0, scale: 0.94,
          duration: 0.55, stagger: 0.07,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: skillsRef.current, start: "top 78%" },
          delay: 0.2,
        });
      }
    }
  }, [loadingDone]);

  return (
    <>
      {!loadingDone && <LoadingScreen onComplete={() => setLoadingDone(true)} />}

      <Navbar loadingDone={loadingDone} />

      <div ref={contentRef}>

        {/* ── HERO ── canvas world (matches loading screen aesthetic) */}
        <div ref={heroRef}>
          <HeroSection loadingDone={loadingDone} />
        </div>

        {/* ── ABOUT ── light canvas background */}
        <section
          id="about"
          ref={aboutRef}
          style={{ background: "radial-gradient(120% 80% at 50% 0%, #ffffff 0%, #faf5ef 45%, #f2e9e0 100%)" }}
          className="relative py-24 lg:py-32"
        >
          <div
            className="container mx-auto grid lg:grid-cols-2 gap-16 items-center"
            style={{ paddingLeft: "clamp(1.5rem, 8vw, 7rem)", paddingRight: "clamp(1.5rem, 8vw, 7rem)" }}
          >
            {/* Left column — text */}
            <div ref={aboutLeftRef}>
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-8">
                <span
                  style={{
                    display: "inline-block",
                    width: 32,
                    height: 1,
                    background: "#c69633",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    letterSpacing: ".30em",
                    textTransform: "uppercase",
                    color: "#c69633",
                  }}
                >
                  About Me
                </span>
              </div>

              {/* Heading */}
              <h2
                className="font-medium leading-[1.05] tracking-tight mb-6"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(36px, 4.5vw, 60px)",
                  color: "#1c1a17",
                }}
              >
                Crafting digital experiences
                <br />
                <em style={{ color: "#d4623a", fontStyle: "italic" }}>
                  with care &amp; precision.
                </em>
              </h2>

              {/* Body */}
              <p
                className="leading-relaxed mb-10"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(17px, 1.5vw, 20px)",
                  color: "#5a4f43",
                  maxWidth: "46ch",
                }}
              >
                I&apos;ve been building for the web for a few years, with a passion
                for interactive design. I love using libraries like GSAP to make
                the web feel alive — turning ideas into moments worth experiencing.
              </p>

              {/* Stats */}
              <div className="flex gap-8">
                <div>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "clamp(40px, 5vw, 64px)",
                      fontWeight: 500,
                      lineHeight: 1,
                      color: "#2d6e75",
                    }}
                  >
                    3+
                  </span>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      letterSpacing: ".20em",
                      textTransform: "uppercase",
                      color: "#5a4f43",
                      marginTop: 4,
                    }}
                  >
                    Years experience
                  </p>
                </div>
                <div
                  style={{
                    width: 1,
                    background: "rgba(28,26,23,0.12)",
                    alignSelf: "stretch",
                  }}
                />
                <div>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "clamp(40px, 5vw, 64px)",
                      fontWeight: 500,
                      lineHeight: 1,
                      color: "#d4623a",
                    }}
                  >
                    10+
                  </span>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      letterSpacing: ".20em",
                      textTransform: "uppercase",
                      color: "#5a4f43",
                      marginTop: 4,
                    }}
                  >
                    Projects shipped
                  </p>
                </div>
              </div>
            </div>

            {/* Right column — decorative monogram card */}
            <div
              ref={aboutCardRef}
              className="relative rounded-2xl overflow-hidden flex flex-col justify-between"
              style={{
                border: "1px solid rgba(28,26,23,0.10)",
                background:
                  "linear-gradient(135deg, rgba(45,110,117,0.06), rgba(212,98,58,0.04))",
                minHeight: 340,
                padding: "2.5rem",
              }}
            >
              {/* Large "RG" monogram watermark */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                aria-hidden="true"
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "clamp(140px, 18vw, 220px)",
                    fontWeight: 500,
                    color: "#1c1a17",
                    opacity: 0.07,
                    lineHeight: 1,
                    letterSpacing: "-.02em",
                    userSelect: "none",
                  }}
                >
                  RG
                </span>
              </div>

              {/* Top decorative dots */}
              <div className="flex gap-2 relative z-10">
                {["#2d6e75", "#d4623a", "#c69633"].map((c) => (
                  <span
                    key={c}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: c,
                      opacity: 0.6,
                      display: "inline-block",
                    }}
                  />
                ))}
              </div>

              {/* Bottom label */}
              <div className="relative z-10">
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    letterSpacing: ".22em",
                    textTransform: "uppercase",
                    color: "rgba(28,26,23,0.40)",
                  }}
                >
                  Lima, Peru → Worldwide
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS ── light canvas, top border separator */}
        <section
          id="skills"
          ref={skillsRef}
          style={{
            background: "#f3ece1",
            borderTop: "1px solid rgba(28,26,23,0.10)",
          }}
          className="py-24 lg:py-32"
        >
          <div
            className="container mx-auto"
            style={{ paddingLeft: "clamp(1.5rem, 8vw, 7rem)", paddingRight: "clamp(1.5rem, 8vw, 7rem)" }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <span
                style={{
                  display: "inline-block",
                  width: 32,
                  height: 1,
                  background: "#c69633",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: ".30em",
                  textTransform: "uppercase",
                  color: "#c69633",
                }}
              >
                Skills
              </span>
            </div>

            {/* Heading */}
            <h2
              className="font-medium leading-tight tracking-tight mb-12"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                color: "#1c1a17",
              }}
            >
              The palette I work with.
            </h2>

            {/* Skill cards grid */}
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {SKILLS.map(({ name, color }) => (
                <li
                  key={name}
                  className="skill rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(28,26,23,0.10)",
                  }}
                >
                  {/* Colored top stripe */}
                  <div style={{ height: 3, background: color }} />

                  <div className="px-5 py-4">
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        letterSpacing: ".18em",
                        textTransform: "uppercase",
                        color: "#1c1a17",
                      }}
                    >
                      {name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

      </div>
    </>
  );
}
