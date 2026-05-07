"use client";
import { useState } from "react";

interface Props { loadingDone: boolean; }

const NAV = [
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Resume",     href: "/renzo_resume (1).pdf" },
];

export default function Navbar({ loadingDone }: Props) {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <>
      <style>{`
        @keyframes nb-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .nb-cursor { animation: nb-blink 1s step-end infinite; }
        @keyframes nb-slide { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        .nb-menu { animation: nb-slide 0.25s ease forwards; }
      `}</style>

      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        style={{
          padding: "20px clamp(1.2rem, 5vw, 3.5rem)",
          opacity: loadingDone ? 1 : 0,
          transform: loadingDone ? "translateY(0)" : "translateY(-28px)",
          transition: "opacity 0.6s ease 0.6s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.6s",
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-2"
          style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, letterSpacing:".2em", textTransform:"uppercase", color:"#3a342c", fontWeight:400 }}
        >
          <span style={{ display:"inline-block", width:10, height:10, background:"#a8333a", borderRadius:2, transform:"rotate(45deg)", flexShrink:0 }} />
          Perfolio
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.endsWith(".pdf") ? "_blank" : undefined}
              rel={href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
              style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:".22em", textTransform:"uppercase", color:"#3a342c", textDecoration:"none", opacity:0.65, transition:"opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity="1")}
              onMouseLeave={e => (e.currentTarget.style.opacity="0.65")}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] p-2"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
          style={{ background:"transparent", border:"none", cursor:"pointer" }}
        >
          {[0,1,2].map(i => (
            <span
              key={i}
              style={{
                display:"block", width:22, height:1.5, background:"#3a342c", borderRadius:2,
                transition:"all 0.25s ease",
                transform: open
                  ? i===0 ? "translateY(6.5px) rotate(45deg)" : i===2 ? "translateY(-6.5px) rotate(-45deg)" : "scaleX(0)"
                  : "none",
                opacity: open && i===1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="nb-menu fixed top-0 left-0 right-0 z-40 md:hidden flex flex-col"
          style={{
            paddingTop: 80,
            paddingBottom: 32,
            paddingLeft: "clamp(1.2rem,5vw,3.5rem)",
            paddingRight: "clamp(1.2rem,5vw,3.5rem)",
            background: "rgba(243,236,225,0.96)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(28,26,23,0.08)",
          }}
        >
          {NAV.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.endsWith(".pdf") ? "_blank" : undefined}
              rel={href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
              onClick={close}
              style={{
                fontFamily:"'JetBrains Mono',monospace", fontSize:13, letterSpacing:".22em",
                textTransform:"uppercase", color:"#1c1a17", textDecoration:"none",
                padding:"16px 0", borderBottom:"1px solid rgba(28,26,23,0.07)",
              }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
