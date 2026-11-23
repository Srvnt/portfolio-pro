import { useEffect, useRef, useState } from "react";
import { FINE, REDUCED, lerp } from "../lib.jsx";

/* ---------- Intro loader ---------- */
export function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(REDUCED);

  useEffect(() => {
    if (REDUCED) { onDone(); return; }
    document.body.classList.add("loading");
    const dur = 1500, t0 = performance.now();
    let raf, timers = [];
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(step);
      else {
        setDone(true);
        document.body.classList.remove("loading");
        timers.push(setTimeout(onDone, 350), setTimeout(() => setGone(true), 1400));
      }
    };
    raf = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); document.body.classList.remove("loading"); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (gone) return null;
  return (
    <div className={`loader${done ? " done" : ""}`} aria-hidden="true">
      <div className="loader__mono">PM</div>
      <div className="loader__count">{pct}%</div>
      <div className="loader__bar"><i style={{ width: pct + "%" }} /></div>
    </div>
  );
}

/* ---------- Custom cursor ---------- */
export function Cursor() {
  const root = useRef(null), dot = useRef(null), ring = useRef(null);
  useEffect(() => {
    if (!FINE) return;
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf;
    const move = (e) => { x = e.clientX; y = e.clientY; root.current.classList.remove("hidden"); };
    const leave = () => root.current.classList.add("hidden");
    const over = (e) => root.current.classList.toggle("hover", !!e.target.closest("a, button, .chips span"));
    const loop = () => {
      rx = lerp(rx, x, 0.18); ry = lerp(ry, y, 0.18);
      dot.current.style.transform = `translate(${x}px,${y}px)`;
      ring.current.style.transform = `translate(${rx}px,${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerover", over);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerover", over);
    };
  }, []);
  return (
    <div className="cursor" ref={root} aria-hidden="true">
      <div className="cursor__dot" ref={dot} />
      <div className="cursor__ring" ref={ring} />
    </div>
  );
}

/* ---------- Scroll progress bar ---------- */
export function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      ref.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => removeEventListener("scroll", onScroll);
  }, []);
  return <div className="progress" ref={ref} aria-hidden="true" />;
}

export function Grain() {
  return <div className="grain" aria-hidden="true" />;
}

/* ---------- Particle burst ---------- */
export function burst(x, y) {
  if (REDUCED) return;
  const c = document.createElement("canvas"), ctx = c.getContext("2d");
  Object.assign(c.style, { position: "fixed", inset: 0, pointerEvents: "none", zIndex: 980 });
  c.width = innerWidth; c.height = innerHeight;
  document.body.appendChild(c);
  const cols = ["#7c5cff", "#22d3ee", "#ff4d8d", "#ffffff", "#3ee08f"];
  const ps = Array.from({ length: 70 }, () => {
    const a = Math.random() * 6.28, s = 3 + Math.random() * 9;
    return { x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 4, r: 2 + Math.random() * 3, c: cols[(Math.random() * cols.length) | 0], life: 1 };
  });
  const tick = () => {
    ctx.clearRect(0, 0, c.width, c.height);
    let alive = 0;
    for (const p of ps) {
      p.vy += 0.3; p.vx *= 0.98; p.x += p.vx; p.y += p.vy; p.life -= 0.014;
      if (p.life > 0) { alive++; ctx.globalAlpha = p.life; ctx.fillStyle = p.c; ctx.fillRect(p.x, p.y, p.r, p.r); }
    }
    if (alive) requestAnimationFrame(tick); else c.remove();
  };
  tick();
}
