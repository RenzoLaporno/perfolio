"use client";
import { useEffect, useRef, useState } from "react";

const COLORS = ["#2d6e75","#d4623a","#a8333a","#c69633","#5a2a3a","#3a8a8f","#e8825a"];

const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.12  0 0 0 0 0.10  0 0 0 0 0.08  0 0 0 0.18 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`;

interface Drop {
  x: number; y: number;
  r: number; color: string;
  alpha: number; decay: number;
  permanent: boolean;
}

export default function PaintCanvas() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const dropsRef    = useRef<Drop[]>([]);
  const rafRef      = useRef<number>(0);
  const lastPos     = useRef({ x: 0, y: 0 });
  const isDrawing   = useRef(false);
  const strokeColor = useRef(COLORS[0]);

  const [hovered,  setHovered]  = useState(false);
  const [painting, setPainting] = useState(false); // has any hover paint
  const [hasLine,  setHasLine]  = useState(false); // has any permanent line

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      // Preserve permanent drops by saving canvas image before resize
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Remove faded transient drops; keep permanent ones forever
      dropsRef.current = dropsRef.current.filter(
        d => d.permanent || d.alpha > 0.008
      );

      for (const d of dropsRef.current) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.globalAlpha = d.alpha;
        ctx.fill();
        if (!d.permanent) d.alpha -= d.decay;
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const addTransient = (x: number, y: number, speed: number) => {
    const color  = COLORS[Math.floor(Math.random() * COLORS.length)];
    const count  = Math.max(2, Math.floor(speed * 0.25));
    const spread = 6 + speed * 0.5;
    for (let i = 0; i < count; i++) {
      dropsRef.current.push({
        x: x + (Math.random() - 0.5) * spread,
        y: y + (Math.random() - 0.5) * spread,
        r: 3 + Math.random() * (6 + speed * 0.4),
        color,
        alpha: 0.25 + Math.random() * 0.35,
        decay: 0.0025 + Math.random() * 0.003,
        permanent: false,
      });
    }
  };

  const addPermanent = (x: number, y: number, speed: number) => {
    const r = 3 + Math.random() * (5 + speed * 0.3);
    // Fill closely so strokes look like a connected line
    const steps = Math.max(1, Math.floor(speed / (r * 0.8)));
    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    for (let s = 0; s <= steps; s++) {
      const t = steps === 0 ? 1 : s / steps;
      dropsRef.current.push({
        x: lastPos.current.x + dx * t + (Math.random() - 0.5) * 2,
        y: lastPos.current.y + dy * t + (Math.random() - 0.5) * 2,
        r,
        color: strokeColor.current,
        alpha: 0.7 + Math.random() * 0.25,
        decay: 0,       // never fades
        permanent: true,
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    strokeColor.current = COLORS[Math.floor(Math.random() * COLORS.length)];
    if (!hasLine) setHasLine(true);
    const { x, y } = getPos(e);
    lastPos.current = { x, y };
    // Single click dot
    dropsRef.current.push({
      x, y, r: 5 + Math.random() * 4,
      color: strokeColor.current,
      alpha: 0.8, decay: 0, permanent: true,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!painting) setPainting(true);
    const { x, y } = getPos(e);
    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);

    if (isDrawing.current) {
      addPermanent(x, y, speed);
    } else {
      addTransient(x, y, speed);
    }
    lastPos.current = { x, y };
  };

  const handleMouseUp   = () => { isDrawing.current = false; };
  const handleMouseLeave = () => {
    isDrawing.current = false;
    setHovered(false);
  };

  const clearAll = () => {
    dropsRef.current = [];
    setHasLine(false);
    setPainting(false);
  };

  return (
    <div
      style={{
        position: "relative", height: "clamp(220px, 40vw, 380px)", borderRadius: 16, overflow: "hidden",
        background: "radial-gradient(120% 80% at 50% 0%, #ffffff 0%, #faf5ef 55%, #f2e9e0 100%)",
        border: "1px solid rgba(28,26,23,0.08)",
        cursor: isDrawing.current ? "cell" : "crosshair",
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", userSelect: "none" }}
      />

      {/* Grain */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", opacity:0.28, mixBlendMode:"multiply", backgroundImage:GRAIN }} />

      {/* Palette dots */}
      <div className="absolute top-5 left-5 flex gap-1.5" style={{ pointerEvents:"none" }}>
        {COLORS.slice(0, 5).map(c => (
          <span key={c} style={{ display:"inline-block", width:7, height:7, borderRadius:"50%", background:c, opacity:0.55 }} />
        ))}
      </div>

      {/* Hint */}
      <div style={{ position:"absolute", bottom:20, left:0, right:0, textAlign:"center", pointerEvents:"none", opacity: painting ? 0 : hovered ? 0.7 : 0.4, transition:"opacity 0.5s" }}>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:".28em", textTransform:"uppercase", color:"#5a4f43" }}>
          Hover · fade &nbsp;·&nbsp; Click &amp; drag · permanent
        </span>
      </div>

      {/* Clear button */}
      {(painting || hasLine) && (
        <button
          onMouseDown={e => e.stopPropagation()}
          onClick={clearAll}
          style={{
            position:"absolute", bottom:16, right:16,
            fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:".22em", textTransform:"uppercase",
            color:"rgba(28,26,23,0.4)", background:"transparent", border:"none", cursor:"pointer", padding:"4px 8px", transition:"color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color="#1c1a17")}
          onMouseLeave={e => (e.currentTarget.style.color="rgba(28,26,23,0.4)")}
        >
          Clear ↺
        </button>
      )}
    </div>
  );
}
