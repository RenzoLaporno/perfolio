"use client";

interface Props {
  loadingDone: boolean;
}

const NAV = [
  { label: "Experience", href: "#about" },
  { label: "Projects",   href: "#projects" },
  { label: "Resume",     href: "#resume" },
];

export default function Navbar({ loadingDone }: Props) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{
        padding: "26px clamp(28px, 5vw, 60px)",
        opacity: loadingDone ? 1 : 0,
        transform: loadingDone ? "translateY(0)" : "translateY(-28px)",
        transition: "opacity 0.6s ease 0.6s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.6s",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
          letterSpacing: ".2em",
          textTransform: "uppercase",
          color: "#3a342c",
          fontWeight: 400,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 10,
            height: 10,
            background: "#a8333a",
            borderRadius: 2,
            transform: "rotate(45deg)",
            flexShrink: 0,
          }}
        />
        Perfolio
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-10">
        {NAV.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "#3a342c",
              textDecoration: "none",
              opacity: 0.65,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.65")}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
