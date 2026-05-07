"use client";
import { useEffect, useRef } from "react";
import "./LoadingScreen.css";

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const dripsRef = useRef<HTMLDivElement>(null);
  const fallingRef = useRef<HTMLDivElement>(null);
  const specksRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const barHeadRef = useRef<HTMLDivElement>(null);
  const barDropRef = useRef<HTMLDivElement>(null);
  const fillTxtRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLElement>(null);
  const phaseRef = useRef<HTMLSpanElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  // Build paint drips
  useEffect(() => {
    const root = dripsRef.current;
    if (!root) return;
    const colors = [
      {c:'#2d6e75',w:14},{c:'#d4623a',w:18},{c:'#a8333a',w:12},{c:'#c69633',w:10},
      {c:'#5a2a3a',w:9},{c:'#3a8a8f',w:11},{c:'#e8825a',w:8},{c:'#2d6e75',w:7},
      {c:'#a8333a',w:16},{c:'#d4623a',w:10},{c:'#5a2a3a',w:7},{c:'#c69633',w:6},
    ];
    const N = colors.length;
    const H = window.innerHeight;
    const positions: number[] = [];
    for (let i = 0; i < N; i++) positions.push((i + 0.5) / N * 100 + (Math.random() * 4 - 2));
    positions.sort(() => Math.random() - 0.5);

    positions.forEach((xPct, i) => {
      const { c, w } = colors[i];
      const len = 60 + Math.random() * Math.min(360, H * 0.55);
      const wob = 8 + Math.random() * 22;
      const dir = Math.random() < 0.5 ? -1 : 1;
      const sw = Math.max(3, w * 0.45);
      const vbW = 80, vbH = len + 80;
      const sx = vbW / 2;
      const path = `M ${sx} 0 C ${sx + dir * wob} ${len * 0.35}, ${sx - dir * wob * 0.8} ${len * 0.7}, ${sx + dir * wob * 0.2} ${len}`;
      const pathLen = len * 1.18;
      const dur = 2.4 + Math.random() * 2.0;
      const delay = 0.05 + (i % 4) * 0.18 + Math.random() * 0.6;
      const ex = sx + dir * wob * 0.2, ey = len;
      const beadR = 4 + Math.random() * 5 + sw * 0.3;
      let splashes = '';
      for (let s = 0; s < 2 + Math.floor(Math.random() * 3); s++) {
        const sr = 1.2 + Math.random() * 3.2;
        splashes += `<circle class="ls-splash" style="--sdelay:${(delay + dur * 0.85 + 0.1 + s * 0.06).toFixed(2)}s" cx="${ex + (Math.random() * 40 - 20)}" cy="${ey + 14 + Math.random() * 16}" r="${sr}" fill="${c}" opacity=".85"/>`;
      }
      root.insertAdjacentHTML('beforeend', `
        <div class="ls-drip" style="left:${xPct}%;transform:translateX(-50%)">
          <svg width="${vbW}" height="${vbH}" viewBox="0 0 ${vbW} ${vbH}">
            <path class="ls-stroke" d="${path}" stroke="${c}" stroke-width="${sw}"
              style="--len:${pathLen.toFixed(0)};--dur:${dur.toFixed(2)}s;--delay:${delay.toFixed(2)}s"/>
            <circle class="ls-bead" cx="${ex}" cy="${ey}" r="${beadR.toFixed(1)}" fill="${c}"
              style="--bdelay:${(delay + dur * 0.92).toFixed(2)}s"/>
            ${splashes}
          </svg>
        </div>`);
    });
  }, []);

  // Build paint specks
  useEffect(() => {
    const root = specksRef.current;
    if (!root) return;
    const colors = ['#2d6e75','#d4623a','#a8333a','#c69633','#5a2a3a','#3a8a8f','#e8825a'];
    for (let i = 0; i < 80; i++) {
      const s = document.createElement('span');
      s.className = 'ls-speck';
      const size = 2 + Math.pow(Math.random(), 2.4) * 24;
      Object.assign(s.style, {
        width: size + 'px', height: size + 'px',
        left: Math.random() * 100 + '%', top: Math.random() * 100 + '%',
        background: colors[Math.floor(Math.random() * colors.length)],
        opacity: String(.5 + Math.random() * .45),
        filter: `blur(${Math.random() < 0.3 ? 1.5 : 0}px)`,
      });
      s.style.setProperty('--d', (1.5 + Math.random() * 3.5).toFixed(2) + 's');
      s.style.setProperty('--fx', ((Math.random() * 2 - 1) * 30).toFixed(1) + 'px');
      s.style.setProperty('--fy', ((Math.random() * 2 - 1) * 30).toFixed(1) + 'px');
      s.style.setProperty('--fdur', (4 + Math.random() * 6).toFixed(1) + 's');
      root.appendChild(s);
    }
  }, []);

  // Falling droplets
  useEffect(() => {
    const root = fallingRef.current;
    const ringsRoot = ringsRef.current;
    if (!root || !ringsRoot) return;
    const colors = ['#2d6e75','#d4623a','#a8333a','#c69633','#5a2a3a','#3a8a8f','#e8825a'];

    function spawn() {
      const W = window.innerWidth, H = window.innerHeight;
      const c = colors[Math.floor(Math.random() * colors.length)];
      const x = Math.random() * W;
      const targetY = H * 0.55 + Math.random() * H * 0.3;
      const size = 7 + Math.random() * 10;
      const el = document.createElement('div');
      el.className = 'ls-fdrop';
      Object.assign(el.style, {
        left: x + 'px', width: size + 'px', height: size * 1.4 + 'px',
        background: `linear-gradient(180deg, ${c} 0%, ${c} 100%)`,
      });
      root!.appendChild(el);
      const a = el.animate([
        { top: '-30px', transform: 'translateX(-50%) scaleY(.95)' },
        { top: targetY + 'px', transform: 'translateX(-50%) scaleY(1.6) scaleX(.78)' },
      ], { duration: 1100 + Math.random() * 900, easing: 'cubic-bezier(.5,0,.75,.2)', fill: 'forwards' });
      a.onfinish = () => {
        el.remove();
        const r = document.createElement('div');
        r.className = 'ls-ring';
        Object.assign(r.style, { left: x + 'px', top: targetY + 'px', width: '12px', height: '12px', color: c });
        ringsRoot!.appendChild(r);
        setTimeout(() => r.remove(), 1500);
      };
    }

    const timers = Array.from({ length: 6 }, (_, i) => window.setTimeout(spawn, i * 180));
    const interval = window.setInterval(spawn, 350);
    return () => { clearInterval(interval); timers.forEach(clearTimeout); };
  }, []);

  // Progress bar animation
  useEffect(() => {
    const stage = stageRef.current;
    const fillBar = barFillRef.current;
    const head = barHeadRef.current;
    const drop = barDropRef.current;
    const fillTxt = fillTxtRef.current;
    const pct = pctRef.current;
    const phase = phaseRef.current;
    if (!stage || !fillBar || !head || !drop || !fillTxt || !pct || !phase) return;

    const phases: [number, string][] = [
      [0,'Priming brushes'],[12,'Mixing pigments'],[28,'Wetting the paper'],
      [44,'First wash · teal'],[58,'Glazing · coral'],[72,'Splatter · crimson'],
      [86,'Drying inks'],[96,'Signing the work'],[100,'Ready'],
    ];

    let p = 0, target = 0, last = performance.now(), lastDropAt = -10, rafId = 0;

    function tick(now: number) {
      const dt = Math.min(60, now - last); last = now;
      const speed = 0.022 + (p < 70 ? 0.025 : 0.012);
      target = Math.min(100, target + speed * dt);
      if (Math.random() < 0.004 && target < 98) target -= 0.4;
      p += (target - p) * 0.18;
      const v = Math.max(0, Math.min(100, p));

      const done = v >= 99.9;
      const display = done ? 100 : Math.floor(v);

      fillBar!.style.width = (done ? 100 : v) + '%';
      head!.style.left = (done ? 100 : v) + '%';
      drop!.style.left = (done ? 100 : v) + '%';
      fillTxt!.style.setProperty('--reveal', (done ? 100 : v) + '%');
      pct!.textContent = String(display).padStart(2, '0');

      for (let i = phases.length - 1; i >= 0; i--) {
        if (v >= phases[i][0]) { phase!.textContent = phases[i][1]; break; }
      }

      if (v - lastDropAt > 10 && v < 99) {
        lastDropAt = v;
        stage!.dataset.drop = '1';
        setTimeout(() => { stage!.dataset.drop = '0'; }, 700);
      }

      if (!done) {
        rafId = requestAnimationFrame(tick);
      } else {
        phase!.textContent = 'Ready';

        // 1. Hide loading-only UI immediately
        stage!.querySelectorAll<HTMLElement>(
          '.ls-progress-wrap, .ls-eyebrow, .ls-corner, .ls-corner-r, .ls-footer-l, .ls-footer-r'
        ).forEach(el => {
          el.style.transition = 'opacity 0.2s ease';
          el.style.opacity = '0';
        });

        // 2. Teardrop: each drip string falls off the bottom, staggered
        setTimeout(() => {
          const drips = stage!.querySelectorAll<HTMLElement>('.ls-drip');
          drips.forEach((drip, i) => {
            setTimeout(() => {
              drip.style.transition = 'transform 0.75s cubic-bezier(0.4, 0, 1, 0.9)';
              drip.style.transform = 'translateX(-50%) translateY(110vh)';
            }, i * 60);
          });

          // 3. Specks + blooms fade as strings fall
          stage!.querySelectorAll<HTMLElement>('.ls-speck').forEach(s => {
            s.style.transition = 'opacity 0.5s ease';
            s.style.opacity = '0';
          });
          setTimeout(() => {
            const blooms = stage!.querySelector<HTMLElement>('.ls-blooms');
            if (blooms) { blooms.style.transition = 'opacity 0.5s ease'; blooms.style.opacity = '0'; }
          }, 350);

          // 4. After all drips have cleared, fade the stage out → homepage reveals clean
          const allClear = (stage!.querySelectorAll('.ls-drip').length - 1) * 60 + 750 + 80;
          setTimeout(() => {
            stage!.style.transition = 'opacity 0.4s ease';
            stage!.style.opacity = '0';
            setTimeout(() => onCompleteRef.current(), 450);
          }, allClear);
        }, 220);
      }
    }

    rafId = requestAnimationFrame((t) => { last = t; tick(t); });
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div ref={stageRef} className="ls-stage" data-drop="0">
      <div className="ls-blooms">
        <div className="ls-bloom ls-b1" />
        <div className="ls-bloom ls-b2" />
        <div className="ls-bloom ls-b3" />
        <div className="ls-bloom ls-b4" />
      </div>

      <div className="ls-grain" />
      <div className="ls-drips" ref={dripsRef} />
      <div className="ls-falling" ref={fallingRef} />
      <div ref={specksRef} style={{ position: 'absolute', inset: 0 }} />
      <div ref={ringsRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3 }} />

      <div className="ls-center">
        <div className="ls-eyebrow">
          <span className="ls-dot" />Mixing the palette<span className="ls-dot" />
        </div>
        <div className="ls-wordmark" aria-label="Renzo">
          <span className="ls-ghost">Renzo</span>
          <span className="ls-wordmark-fill" ref={fillTxtRef} style={{ ['--reveal' as string]: '0%' }}>Renzo</span>
        </div>
        <div className="ls-tag">
          A passionate <em>Software Developer</em> · building with care &amp; craft.
        </div>
      </div>

      <div className="ls-progress-wrap">
        <div className="ls-meta">
          <span>Loading the canvas</span>
          <span className="ls-pct"><b ref={pctRef as React.Ref<HTMLElement>}>00</b>&nbsp;/&nbsp;100</span>
        </div>
        <div className="ls-bar">
          <div className="ls-bar-fill" ref={barFillRef} />
          <div className="ls-bar-head" ref={barHeadRef} />
          <div className="ls-bar-drop" ref={barDropRef} />
        </div>
        <div className="ls-label-row">
          <span ref={phaseRef}>Priming brushes</span>
          <span>Hand-painted with care</span>
        </div>
      </div>

      <div className="ls-corner">
        <span className="ls-glyph" />Perfolio
      </div>
      <div className="ls-corner-r">
        Renzo G.<small>Software Developer</small>
      </div>

      <div className="ls-footer-l">EST · 2024 — Lima → Worldwide</div>
      <div className="ls-footer-r">Hand-painted with HTML &amp; CSS</div>

      <div className="ls-veil" />
    </div>
  );
}
