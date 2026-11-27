import { useEffect, useRef } from "react";
import { useLang } from "../i18n.jsx";
import { Reveal, SectionLabel, lerp, useVisibleLoop } from "../lib.jsx";

const GROUPS = { lang: "#7c5cff", data: "#22d3ee", ops: "#ff4d8d", core: "#ffffff" };
const SKILLS = [
  ["Full-stack", "core", 1.6],
  ["Java", "lang", 1.35], ["Spring Boot", "lang", 1.1], ["React", "lang", 1.3], ["TypeScript", "lang", 1.05], ["Python", "lang", 0.95], ["SQL", "lang", 1],
  ["PostgreSQL", "data", 1.2], ["Azure", "data", 1.15], ["AWS", "data", 1.15],
  ["CI/CD", "ops", 1.2], ["TDD", "ops", 1.25], ["Git", "ops", 0.95], ["Docker", "ops", 1], ["AI", "ops", 1.1],
];
const LINKS = [["Java", "Spring Boot"], ["Spring Boot", "PostgreSQL"], ["React", "TypeScript"], ["SQL", "PostgreSQL"], ["Docker", "CI/CD"], ["CI/CD", "Azure"], ["CI/CD", "AWS"], ["TDD", "Java"], ["TDD", "CI/CD"], ["Git", "CI/CD"], ["AI", "TDD"], ["Python", "AI"], ["React", "Spring Boot"], ["Docker", "AWS"]];
const hexA = (a) => Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, "0");

/** Interactive force-ish graph of the tech stack. Nodes flee the cursor; hovering highlights neighbours. */
function Constellation() {
  const ref = useRef(null);
  const state = useRef({ nodes: [], W: 0, H: 0, t: 0, mouse: { x: -9999, y: -9999, on: false } });

  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext("2d"), S = state.current;
    S.ctx = ctx;
    S.dust = Array.from({ length: 60 }, () => ({ x: Math.random(), y: Math.random(), z: Math.random() * 0.8 + 0.2 }));
    const layout = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const W = (S.W = canvas.clientWidth), H = (S.H = canvas.clientHeight);
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cx = W / 2, cy = H / 2 + 10, R = Math.min(W, H) * 0.36, outer = SKILLS.length - 1;
      S.nodes = SKILLS.map(([name, g, size], i) => {
        let hx = cx, hy = cy;
        if (i > 0) {
          const a = ((i - 1) / outer) * Math.PI * 2 - Math.PI / 2;
          const rr = R * (i % 2 ? 1 : 0.62);
          hx = cx + Math.cos(a) * rr * (W > H ? 1.35 : 1);
          hy = cy + Math.sin(a) * rr;
        }
        const prev = S.nodes.find((n) => n.name === name);
        return { name, g, size, hx, hy, x: prev ? prev.x : hx, y: prev ? prev.y : hy, vx: 0, vy: 0, ph: Math.random() * 6.28, hl: 0 };
      });
      S.byName = Object.fromEntries(S.nodes.map((n) => [n.name, n]));
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  useVisibleLoop(ref, () => {
    const S = state.current, { ctx, W, H, nodes, mouse } = S;
    if (!ctx || !nodes.length) return;
    const t = (S.t += 0.016);
    ctx.clearRect(0, 0, W, H);

    for (const d of S.dust) {
      d.y -= 0.0004 * d.z; if (d.y < 0) d.y = 1;
      ctx.fillStyle = `rgba(255,255,255,${0.25 * d.z})`;
      ctx.fillRect(d.x * W, d.y * H, d.z * 1.6, d.z * 1.6);
    }

    let hover = null, best = 60;
    for (const n of nodes) { const d = Math.hypot(n.x - mouse.x, n.y - mouse.y); if (d < best) { best = d; hover = n; } }
    const connected = new Set();
    if (hover) {
      connected.add(hover.name);
      for (const [a, b] of LINKS) { if (a === hover.name) connected.add(b); if (b === hover.name) connected.add(a); }
      if (hover.g === "core") nodes.forEach((n) => connected.add(n.name));
    }

    for (const n of nodes) {
      n.vx += (n.hx + Math.cos(t * 0.7 + n.ph) * 10 - n.x) * 0.012;
      n.vy += (n.hy + Math.sin(t * 0.9 + n.ph) * 10 - n.y) * 0.012;
      if (mouse.on && n !== hover) {
        const dx = n.x - mouse.x, dy = n.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 22000) { const f = ((22000 - d2) / 22000) * 1.6, d = Math.sqrt(d2) || 1; n.vx += (dx / d) * f; n.vy += (dy / d) * f; }
      }
      if (n === hover) { n.vx += (mouse.x - n.x) * 0.02; n.vy += (mouse.y - n.y) * 0.02; }
      n.vx *= 0.86; n.vy *= 0.86; n.x += n.vx; n.y += n.vy;
      n.hl = lerp(n.hl, hover ? (connected.has(n.name) ? 1 : -0.6) : 0, 0.12);
    }

    const edge = (a, b, strong) => {
      const lit = Math.min(a.hl, b.hl) > 0.3;
      const alpha = Math.max(0.05, 0.14 + (lit ? 0.6 : 0) - (hover && !strong ? 0.08 : 0));
      const grd = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
      grd.addColorStop(0, GROUPS[a.g] + hexA(alpha)); grd.addColorStop(1, GROUPS[b.g] + hexA(alpha));
      ctx.strokeStyle = grd; ctx.lineWidth = lit ? 1.6 : 1;
      const mx = (a.x + b.x) / 2 + (a.y - b.y) * 0.12, my = (a.y + b.y) / 2 + (b.x - a.x) * 0.12;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.quadraticCurveTo(mx, my, b.x, b.y); ctx.stroke();
      if (strong) { // packet travelling along the link
        const k = (t * 0.5 + a.ph) % 1, ik = 1 - k;
        ctx.globalAlpha = 0.8; ctx.fillStyle = GROUPS[b.g];
        ctx.beginPath(); ctx.arc(ik * ik * a.x + 2 * ik * k * mx + k * k * b.x, ik * ik * a.y + 2 * ik * k * my + k * k * b.y, 1.8, 0, 7); ctx.fill();
        ctx.globalAlpha = 1;
      }
    };
    nodes.slice(1).forEach((n) => edge(nodes[0], n, false));
    LINKS.forEach(([a, b]) => edge(S.byName[a], S.byName[b], true));

    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    for (const n of nodes) {
      const col = GROUPS[n.g], hl = Math.max(0, n.hl), dim = Math.max(0, -n.hl), r = 5 * n.size + hl * 4;
      ctx.globalAlpha = 1 - dim * 0.6;
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 5);
      g.addColorStop(0, col + "55"); g.addColorStop(1, col + "00");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x, n.y, r * 5, 0, 7); ctx.fill();
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, 7); ctx.fill();
      ctx.fillStyle = "#0a0a12"; ctx.beginPath(); ctx.arc(n.x, n.y, r * 0.45, 0, 7); ctx.fill();
      ctx.font = `${n.g === "core" ? 700 : 600} ${Math.round(12 * n.size + hl * 3)}px "JetBrains Mono", monospace`;
      ctx.fillStyle = `rgba(236,235,244,${0.75 + hl * 0.25})`;
      ctx.fillText(n.name, n.x, n.y + r + 14 + n.size * 2);
      ctx.globalAlpha = 1;
    }
  });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect(), m = state.current.mouse;
    m.x = e.clientX - r.left; m.y = e.clientY - r.top; m.on = true;
  };
  const onLeave = () => Object.assign(state.current.mouse, { x: -9999, y: -9999, on: false });

  return <canvas ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} />;
}

export default function Skills() {
  const { t } = useLang();
  const s = t.skills;
  return (
    <section className="section skills" id="skills">
      <SectionLabel n="04">{s.label}</SectionLabel>
      <Reveal as="h2" className="title">{s.title}</Reveal>

      <div className="bento">
        <Reveal className="cell cell--constellation" tilt tiltStrength={2}>
          <div className="cell__head"><span className="mono">tech_graph.live</span><span className="hint">{s.hint}</span></div>
          <Constellation />
        </Reveal>
        <Reveal className="cell cell--lang" tilt delay={0.06}>
          <div className="cell__icon">{"{ }"}</div>
          <h3>{s.lang}</h3>
          <div className="chips chips--lg">{["Java", "Spring Boot", "React", "TypeScript", "Python", "SQL"].map((c) => <span key={c}>{c}</span>)}</div>
        </Reveal>
        <Reveal className="cell cell--cloud" tilt delay={0.12}>
          <div className="cell__icon">☁</div>
          <h3>{s.cloud}</h3>
          <div className="chips chips--lg">{["PostgreSQL", "Azure", "AWS"].map((c) => <span key={c}>{c}</span>)}</div>
        </Reveal>
        <Reveal className="cell cell--tools" tilt>
          <div className="cell__icon">⚙</div>
          <h3>{s.tools}</h3>
          <div className="chips chips--lg">{["CI/CD", "TDD", "Git", "Docker", s.ai].map((c) => <span key={c}>{c}</span>)}</div>
        </Reveal>
        {s.soft.map((c, i) => (
          <Reveal className="cell cell--soft" tilt delay={i * 0.08} key={i}>
            <div className="cell__icon">{c.icon}</div>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
