"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import HeroSection from "./components/heros";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/navbar";
import PaintCanvas from "./components/PaintCanvas";
import PageBackground from "./components/PageBackground";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


const PROJECTS = [
  {
    num: "01",
    name: "Daily Guardian",
    type: "News & Media Platform",
    url: "https://dailyguardian.com.ph",
    img: "/dg.png",
    desc: "Headless CMS news platform powering one of the Philippines' leading broadsheets — WordPress backend serving content to a Next.js frontend, deployed on Cloudflare for edge performance.",
    tags: ["Next.js", "WordPress", "Headless CMS", "Cloudflare", "TypeScript", "Tailwind CSS"],
    color: "#2d6e75",
  },
  {
    num: "02",
    name: "JCI Regatta Iloilo",
    type: "Event Website",
    url: "https://jciregattailoilo.org",
    img: "/jci.png",
    desc: "Official event site for the JCI Regatta Iloilo sailing competition — featuring event schedules, registration, interactive brochures, and GSAP-driven animations.",
    tags: ["Astro 4", "Tailwind CSS", "GSAP", "page-flip", "MDX", "RSS"],
    color: "#d4623a",
  },
];

const EXPERIENCE = [
  {
    period: "June 2025 — Present",
    company: "Prometheus PH",
    role: "Software Engineer — Full Stack Developer",
    tags: ["React", "Next.js", "TypeScript", "Node.js", "Firebase", "AWS"],
    desc: "Spearheading multiple full-stack projects from conception to deployment. Led solo projects with full ownership of architecture and delivery. Modernized legacy HTML/JS systems into secure, modern frameworks.",
  },
  {
    period: "Oct 2024 — Mar 2025",
    company: "Trajector",
    role: "Software Engineer Intern",
    tags: ["React", "Node.js", "MERN Stack", "AWS", "Azure AI", "Bash"],
    desc: "Automated ticket creation from ConnectWise to AHA! on AWS. Built AI-powered applicant management system with resume parsing. Developed Azure AI test cases and Bash onboarding scripts for macOS & Windows.",
  },
  {
    period: "Feb 2024 — Jun 2024",
    company: "Kachick",
    role: "Frontend Developer",
    tags: ["Next.js", "Firebase", "JavaScript"],
    desc: "Spearheaded development of a fully functional website from scratch using Next.js. Deployed and maintained via Firebase hosting. Collaborated with the tech lead on a mobile-first web platform.",
  },
  {
    period: "2024 — Present",
    company: "Self-Employed",
    role: "Freelance Web Developer",
    tags: ["React", "Astro", "Next.js", "Firebase"],
    desc: "Designed and developed the Meisner Institute website — a modern, responsive site delivering polished UX aligned with the organization's brand identity.",
  },
  {
    period: "2023",
    company: "Central Philippine University",
    role: "Full Stack Developer — Play Robos",
    tags: ["React", "Node.js", "Block-based Programming"],
    desc: "Built a robotic & programming learning platform with a drag-and-drop block-building system. Gamified to motivate learners and reinforce computational thinking through robotic simulations.",
  },
];

// Skill definitions grouped by category
const SKILLS: { name: string; color: string; category: string }[] = [
  // Languages
  { name: "JavaScript",     color: "#c69633", category: "Languages" },
  { name: "TypeScript",     color: "#3a8a8f", category: "Languages" },
  { name: "Python",         color: "#2d6e75", category: "Languages" },
  { name: "Dart",           color: "#d4623a", category: "Languages" },
  { name: "C#",             color: "#5a2a3a", category: "Languages" },
  { name: "Bash",           color: "#a8333a", category: "Languages" },
  // Frontend
  { name: "React",          color: "#d4623a", category: "Frontend" },
  { name: "Next.js",        color: "#a8333a", category: "Frontend" },
  { name: "Astro",          color: "#2d6e75", category: "Frontend" },
  { name: "Vue",            color: "#2d6e75", category: "Frontend" },
  { name: "Quasar",         color: "#3a8a8f", category: "Frontend" },
  { name: "Tailwind CSS",   color: "#c69633", category: "Frontend" },
  { name: "GSAP",           color: "#2d6e75", category: "Frontend" },
  { name: "Framer Motion",  color: "#5a2a3a", category: "Frontend" },
  { name: "Three.js",       color: "#e8825a", category: "Frontend" },
  // Backend
  { name: "Node.js",        color: "#2d6e75", category: "Backend" },
  { name: "Express.js",     color: "#d4623a", category: "Backend" },
  { name: "NestJS",         color: "#a8333a", category: "Backend" },
  { name: "MERN Stack",     color: "#c69633", category: "Backend" },
  { name: "REST API",       color: "#3a8a8f", category: "Backend" },
  { name: "PostgreSQL",     color: "#2d6e75", category: "Backend" },
  { name: "Prisma",         color: "#3a8a8f", category: "Backend" },
  { name: "Redis",          color: "#a8333a", category: "Backend" },
  // Cloud & DevOps
  { name: "AWS",            color: "#c69633", category: "Cloud & DevOps" },
  { name: "Firebase",       color: "#d4623a", category: "Cloud & DevOps" },
  { name: "Vercel",         color: "#5a2a3a", category: "Cloud & DevOps" },
  { name: "Render",         color: "#2d6e75", category: "Cloud & DevOps" },
  { name: "Git",            color: "#a8333a", category: "Cloud & DevOps" },
  // AI & Integrations
  { name: "Azure AI",       color: "#3a8a8f", category: "AI & Integrations" },
  { name: "Claude AI",      color: "#2d6e75", category: "AI & Integrations" },
  { name: "Google APIs",    color: "#c69633", category: "AI & Integrations" },
  { name: "Twilio",         color: "#d4623a", category: "AI & Integrations" },
  // Tools & Methodology
  { name: "Scrum / Agile",  color: "#5a2a3a", category: "Tools & Methods" },
  { name: "SDLC",           color: "#3a8a8f", category: "Tools & Methods" },
  { name: "Zustand",        color: "#e8825a", category: "Tools & Methods" },
  { name: "Zod",            color: "#3a8a8f", category: "Tools & Methods" },
  { name: "React Hook Form",color: "#a8333a", category: "Tools & Methods" },
  { name: "TanStack Query", color: "#2d6e75", category: "Tools & Methods" },
];

const SKILL_CATEGORIES = [...new Set(SKILLS.map(s => s.category))];

export default function Portfolio() {
  const [loadingDone, setLoadingDone] = useState(false);

  const heroRef       = useRef<HTMLDivElement>(null);
  const aboutRef      = useRef<HTMLElement>(null);
  const aboutLeftRef  = useRef<HTMLDivElement>(null);
  const aboutCardRef  = useRef<HTMLDivElement>(null);
  const skillsRef     = useRef<HTMLElement>(null);
  const expRef        = useRef<HTMLElement>(null);
  const eduRef        = useRef<HTMLElement>(null);
  const contentRef    = useRef<HTMLDivElement>(null);


  // Smooth scroll for all anchor links
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href")?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 72 },
        duration: 1.1,
        ease: "power3.inOut",
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

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

      // Chips: stagger fade up — immediateRender:false prevents opacity:0 flash
      const skillItems = skillsRef.current.querySelectorAll(".skill");
      if (skillItems.length) {
        gsap.from(skillItems, {
          immediateRender: false,
          y: 20, opacity: 0,
          duration: 0.45, stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: { trigger: skillsRef.current, start: "top 85%" },
        });
      }
    }

    // ── Experience entries: left slides from left, right from right ───
    if (expRef.current) {
      expRef.current.querySelectorAll<HTMLElement>(".exp-entry").forEach(entry => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: entry, start: "top 88%", toggleActions: "play none none none" } });
        const left  = entry.querySelector<HTMLElement>(".exp-left");
        const right = entry.querySelector<HTMLElement>(".exp-right");
        if (left)  tl.from(left,  { x: -50, opacity: 0, duration: 0.75, ease: "power3.out" }, 0);
        if (right) tl.from(right, { y:  24, opacity: 0, duration: 0.75, ease: "power3.out" }, 0.12);
      });
    }

    // ── Education: fade up ────────────────────────────────────────────
    if (eduRef.current) {
      const inner = eduRef.current.querySelector(".edu-inner");
      if (inner) gsap.from(inner, { y: 30, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: eduRef.current, start: "top 88%" } });
    }
  }, [loadingDone]);

  return (
    <>
      {!loadingDone && <LoadingScreen onComplete={() => setLoadingDone(true)} />}

      {/* Outer wrapper gives PageBackground an absolute anchor */}
      <div style={{ position: "relative" }}>
      <PageBackground />

      {/* All content sits at z-index 1, above the background */}
      <div style={{ position: "relative", zIndex: 1 }}>
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
          style={{ background: "transparent" }}
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
                I&apos;m a full-stack developer building production systems at an agency —
                owning the stack from frontend to backend, database, auth, and deployment.
                I ship real enterprise software, care deeply about how things look and feel,
                and bring 3D, animation, and AI into production. I move fast, iterate often,
                and never stop at good enough.
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

            {/* Right column — interactive paint canvas */}
            <div ref={aboutCardRef}>
              <PaintCanvas />
            </div>
          </div>
        </section>

        {/* ── SKILLS ── light canvas, top border separator */}
        <section
          id="skills"
          ref={skillsRef}
          style={{
            background: "transparent",
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

            {/* Skills grouped by category */}
            <div className="flex flex-col" style={{ gap: "clamp(2rem, 4vw, 3.5rem)" }}>
              {SKILL_CATEGORIES.map(cat => (
                <div key={cat}>
                  {/* Category heading */}
                  <div className="flex items-center gap-4 mb-5">
                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "clamp(18px, 1.8vw, 24px)",
                      fontWeight: 500,
                      color: "#1c1a17",
                      fontStyle: "italic",
                    }}>
                      {cat}
                    </h3>
                    <div style={{ flex: 1, height: 1, background: "rgba(28,26,23,0.08)" }} />
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:".22em", textTransform:"uppercase", color:"rgba(28,26,23,0.3)" }}>
                      {SKILLS.filter(s => s.category === cat).length}
                    </span>
                  </div>

                  {/* Pill chips — flex wrap */}
                  <ul className="flex flex-wrap gap-2">
                    {SKILLS.filter(s => s.category === cat).map(({ name, color }) => (
                      <li
                        key={name}
                        className="skill group flex items-center gap-2 transition-all duration-200"
                        style={{
                          padding: "8px 16px",
                          borderRadius: 999,
                          background: "rgba(255,255,255,0.82)",
                          border: "1px solid rgba(28,26,23,0.18)",
                          cursor: "default",
                          boxShadow: "0 1px 3px rgba(28,26,23,0.06)",
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.background = color + "22";
                          (e.currentTarget as HTMLElement).style.borderColor = color;
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.82)";
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(28,26,23,0.18)";
                        }}
                      >
                        {/* Colour dot */}
                        <span style={{
                          display: "inline-block",
                          width: 7, height: 7,
                          borderRadius: "50%",
                          background: color,
                          flexShrink: 0,
                          opacity: 0.75,
                        }} />
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10,
                          letterSpacing: ".14em",
                          textTransform: "uppercase",
                          color: "#1c1a17",
                          whiteSpace: "nowrap",
                        }}>
                          {name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ────────────────────────────────────────────────── */}
        <section
          id="projects"
          style={{ background: "transparent", borderTop: "1px solid rgba(28,26,23,0.08)" }}
          className="py-24 lg:py-32"
        >
          <div
            className="container mx-auto"
            style={{ paddingLeft: "clamp(1.5rem, 8vw, 7rem)", paddingRight: "clamp(1.5rem, 8vw, 7rem)" }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <span style={{ display:"inline-block", width:32, height:1, background:"#c69633", flexShrink:0 }} />
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:".30em", textTransform:"uppercase", color:"#c69633" }}>
                Projects
              </span>
            </div>

            <h2
              className="font-medium tracking-tight mb-16"
              style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(32px,4vw,52px)", color:"#1c1a17", lineHeight:1.1 }}
            >
              Things I&apos;ve shipped.
            </h2>

            <div className="flex flex-col gap-20">
              {PROJECTS.map((p, i) => (
                <div
                  key={p.num}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
                >
                  {/* Info */}
                  <div style={{ direction: "ltr" }}>
                    <div className="flex items-baseline gap-4 mb-4">
                      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:".22em", color:p.color, opacity:0.7 }}>
                        {p.num}
                      </span>
                      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:".28em", textTransform:"uppercase", color:"rgba(28,26,23,0.4)" }}>
                        {p.type}
                      </span>
                    </div>

                    <h3
                      className="font-medium tracking-tight mb-4"
                      style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(28px,3.5vw,48px)", color:"#1c1a17", lineHeight:1.05 }}
                    >
                      {p.name}
                    </h3>

                    <p
                      className="leading-relaxed mb-6"
                      style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(16px,1.3vw,19px)", color:"#5a4f43", maxWidth:"44ch" }}
                    >
                      {p.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {p.tags.map(tag => (
                        <span
                          key={tag}
                          style={{
                            fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:".16em", textTransform:"uppercase",
                            padding:"5px 12px", borderRadius:999,
                            background: p.color + "12", border:`1px solid ${p.color}50`, color:"#1c1a17",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Link */}
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 transition-opacity duration-200 hover:opacity-70"
                      style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:".22em", textTransform:"uppercase", color:p.color, textDecoration:"none" }}
                    >
                      Visit Site ↗
                    </a>
                  </div>

                  {/* Screenshot */}
                  <div
                    className="relative rounded-2xl overflow-hidden"
                    style={{ border:"1px solid rgba(28,26,23,0.1)", boxShadow:"0 8px 40px rgba(28,26,23,0.1)", direction:"ltr" }}
                  >
                    {/* Colour accent bar */}
                    <div style={{ height:3, background: p.color, position:"absolute", top:0, left:0, right:0, zIndex:1 }} />
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full block"
                      style={{ display:"block", aspectRatio:"16/9", objectFit:"cover", maxHeight:300 }}
                    />
                    {/* Subtle overlay with URL */}
                    <div
                      className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-3"
                      style={{ background:"rgba(28,26,23,0.65)", backdropFilter:"blur(8px)" }}
                    >
                      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:".18em", color:"rgba(243,236,225,0.7)" }}>
                        {p.url.replace("https://","")}
                      </span>
                      <span style={{ width:6, height:6, borderRadius:"50%", background:p.color, display:"inline-block" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ─────────────────────────────────────────────── */}
        <section
          id="experience"
          ref={expRef}
          style={{
            background: "transparent",
            borderTop: "1px solid rgba(28,26,23,0.08)",
          }}
          className="pt-24 pb-10 lg:pt-32 lg:pb-12"
        >
          <div
            className="container mx-auto"
            style={{ paddingLeft: "clamp(1.5rem, 8vw, 7rem)", paddingRight: "clamp(1.5rem, 8vw, 7rem)" }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <span style={{ display:"inline-block", width:32, height:1, background:"#c69633", flexShrink:0 }} />
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:".30em", textTransform:"uppercase", color:"#c69633" }}>
                Experience
              </span>
            </div>

            <h2
              className="font-medium tracking-tight mb-16"
              style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(32px,4vw,52px)", color:"#1c1a17", lineHeight:1.1 }}
            >
              Where I&apos;ve been<br />
              <em style={{ color:"#d4623a" }}>building things.</em>
            </h2>

            {/* Timeline — two-column: date/company left, content right */}
            <div className="flex flex-col gap-0">
              {EXPERIENCE.map((exp, i) => (
                <div
                  key={i}
                  className="exp-entry grid sm:grid-cols-[200px_1fr] gap-6 sm:gap-12 py-10"
                  style={{ borderTop: i === 0 ? "none" : "1px solid rgba(28,26,23,0.07)" }}
                >
                  {/* Left: period + company + dot */}
                  <div className="exp-left flex sm:flex-col gap-2 sm:gap-1 items-start sm:pt-1">
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ display:"inline-block", width:8, height:8, borderRadius:"50%", background:"#f3ece1", border:"2px solid #a8333a", flexShrink:0 }} />
                      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:".22em", textTransform:"uppercase", color:"rgba(28,26,23,0.45)", lineHeight:1.4 }}>
                        {exp.period}
                      </span>
                    </div>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:".18em", textTransform:"uppercase", color:"#a8333a", paddingLeft:"16px" }}>
                      {exp.company}
                    </span>
                  </div>

                  {/* Right: role + desc + tags */}
                  <div className="exp-right">
                    <h3 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(20px,2vw,28px)", fontWeight:500, color:"#1c1a17", marginBottom:10, lineHeight:1.2 }}>
                      {exp.role}
                    </h3>
                    <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(15px,1.2vw,18px)", color:"#5a4f43", lineHeight:1.8, marginBottom:14 }}>
                      {exp.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map(tag => (
                        <span key={tag} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:".18em", textTransform:"uppercase", padding:"4px 10px", background:"rgba(28,26,23,0.05)", border:"1px solid rgba(28,26,23,0.1)", borderRadius:99, color:"#3a342c" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EDUCATION ───────────────────────────────────────────────── */}
        <section
          ref={eduRef}
          style={{ background:"transparent", borderTop:"1px solid rgba(28,26,23,0.08)" }}
          className="py-10 lg:py-14"
        >
          <div className="container mx-auto" style={{ paddingLeft:"clamp(1.5rem,8vw,7rem)", paddingRight:"clamp(1.5rem,8vw,7rem)" }}>
            <div className="flex items-center gap-3 mb-10">
              <span style={{ display:"inline-block", width:32, height:1, background:"#c69633", flexShrink:0 }} />
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:".30em", textTransform:"uppercase", color:"#c69633" }}>Education</span>
            </div>
            <div className="edu-inner flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(22px,2.5vw,32px)", fontWeight:500, color:"#1c1a17", marginBottom:6 }}>
                  Bachelor of Science in Software Engineering
                </h3>
                <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:".18em", textTransform:"uppercase", color:"#5a4f43" }}>
                  Central Philippine University
                </p>
              </div>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:".22em", textTransform:"uppercase", color:"rgba(28,26,23,0.4)", whiteSpace:"nowrap" }}>
                2019 — 2025
              </span>
            </div>
          </div>
        </section>

        {/* ── CONTACT ─────────────────────────────────────────────────── */}
        <section
          id="contact"
          style={{
            background: "transparent",
            borderTop: "1px solid rgba(28,26,23,0.08)",
          }}
          className="py-24 lg:py-40"
        >
          <div
            className="container mx-auto text-center"
            style={{ paddingLeft: "clamp(1.5rem, 8vw, 7rem)", paddingRight: "clamp(1.5rem, 8vw, 7rem)" }}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <span style={{ display:"inline-block", width:32, height:1, background:"#c69633", flexShrink:0 }} />
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:".30em", textTransform:"uppercase", color:"#c69633" }}>
                Contact
              </span>
              <span style={{ display:"inline-block", width:32, height:1, background:"#c69633", flexShrink:0 }} />
            </div>

            <h2
              className="font-medium tracking-tight mb-6"
              style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(40px,7vw,96px)", color:"#1c1a17", lineHeight:0.9 }}
            >
              Let&apos;s build<br />
              <em style={{ color:"#d4623a" }}>something.</em>
            </h2>

            <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(17px,1.5vw,20px)", color:"#5a4f43", marginBottom:48, fontStyle:"italic" }}>
              Open for freelance, collaborations &amp; full-time roles.
            </p>

            <a
              href="mailto:renbriel44@gmail.com"
              style={{
                fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:".22em", textTransform:"uppercase",
                padding:"16px 36px", background:"#1c1a17", color:"#f3ece1", borderRadius:4, textDecoration:"none",
                display:"inline-block", transition:"opacity 0.2s",
              }}
            >
              Send a Message ↗
            </a>

            {/* Social links */}
            <div className="flex items-center justify-center gap-8 mt-12">
              {[
                { label: "GitHub",   href: "https://github.com/renzoLaporno" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/renzo-gabriel-laporno-029aa8277" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:".22em", textTransform:"uppercase", color:"#5a4f43", textDecoration:"none", opacity:0.7, transition:"opacity 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity="1")}
                  onMouseLeave={e => (e.currentTarget.style.opacity="0.7")}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer
        style={{
          background: "#1c1a17",
          borderTop: "1px solid rgba(243,236,225,0.08)",
          padding: "32px clamp(1.5rem, 5vw, 4rem)",
        }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        {/* Logo */}
        <div className="flex items-center gap-2" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:".22em", textTransform:"uppercase", color:"rgba(243,236,225,0.7)" }}>
          <span style={{ display:"inline-block", width:8, height:8, background:"#a8333a", borderRadius:2, transform:"rotate(45deg)", flexShrink:0 }} />
          Perfolio
        </div>

        {/* Centre: copyright */}
        <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:".22em", textTransform:"uppercase", color:"rgba(243,236,225,0.35)" }}>
          © 2024 Renzo G. · Hand-painted with care
        </p>

        {/* Right: links */}
        <div className="flex gap-6">
          {[
            { label: "GitHub",   href: "https://github.com/renzoLaporno" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/renzo-gabriel-laporno-029aa8277" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:".22em", textTransform:"uppercase", color:"rgba(243,236,225,0.45)", textDecoration:"none", transition:"color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color="rgba(243,236,225,0.9)")}
              onMouseLeave={e => (e.currentTarget.style.color="rgba(243,236,225,0.45)")}
            >
              {label}
            </a>
          ))}
        </div>
      </footer>
      </div> {/* end z-index:1 wrapper */}
      </div> {/* end position:relative outer wrapper */}
    </>
  );
}
