import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n.jsx";
import { Magnetic, REDUCED, Reveal, SectionLabel, useInView } from "../lib.jsx";

const PROJECTS = [
  {
    id: "jobfit",
    name: "JobFit",
    demo: "https://jobfit-cloud.vercel.app/",
    repo: "https://github.com/Srvnt/jobfit",
    stack: ["TypeScript", "Vite", "Transformers.js", "Web Workers", "Vercel", "Chromium"],
    Visual: JobFitVisual,
  },
  {
    id: "settleup",
    name: "SettleUp",
    demo: "https://srvnt.github.io/settleup/",
    repo: "https://github.com/Srvnt/settleup",
    stack: ["Python", "JavaScript", "Java", "Spring Boot", "PostgreSQL", "Testcontainers"],
    Visual: SettleUpVisual,
  },
];

/* ---------------- JobFit: requirement ⇄ evidence matching ---------------- */
// Illustrative rows showing how JobFit scores and classifies requirements.
const JF_ROWS = [
  { req: "Kokemusta Javasta ja Spring Bootista", ev: "Java, Spring Boot, React", score: 0.71, status: "met" },
  { req: "Experience with React & TypeScript", ev: "React, TypeScript", score: 0.64, status: "met" },
  { req: "CI/CD-putkien rakentaminen", ev: "CI/CD-automaatioputket", score: 0.58, status: "met" },
  { req: "Kubernetes in production", ev: "Docker", score: 0.36, status: "partial" },
  { req: "Fluent Swedish is a plus", ev: "English (fluent)", score: 0.62, status: "gap", term: "Swedish" },
];
const JF_STATUS = {
  fi: { met: "täyttyy", partial: "osittain", gap: "puuttuu", term: "termi puuttuu" },
  en: { met: "met", partial: "partial", gap: "gap", term: "term missing" },
};

function JobFitVisual() {
  const { lang } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.35, rootMargin: "0px" });
  const L = JF_STATUS[lang];
  return (
    <div className="jf" ref={ref} data-on={inView || REDUCED ? "1" : "0"}>
      <div className="viz__bar mono">
        <span>job_ad.txt</span><span className="viz__swap">⇄</span><span>cv.pdf</span>
        <span className="viz__chip">MiniLM · WebWorker</span>
      </div>
      <div className="jf__rows">
        {JF_ROWS.map((r, i) => (
          <div className={`jf__row jf__row--${r.status}`} key={i} style={{ "--i": i, "--s": r.score }}>
            <div className="jf__text">
              <span className="jf__req">{r.req}</span>
              <span className="jf__ev mono">↳ {r.ev}</span>
            </div>
            <div className="jf__meter">
              <div className="jf__track">
                <i className="jf__fill" />
                <b className="jf__th" style={{ left: "31%" }} />
                <b className="jf__th" style={{ left: "43%" }} />
              </div>
              <span className="jf__score mono">{r.score.toFixed(2)}</span>
            </div>
            <span className="jf__status mono">{r.term ? `${L.term}: ${r.term}` : L[r.status]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- SettleUp: exact vs greedy settlement graph ---------------- */
const SU_PEOPLE = [
  { name: "Aino", bal: 120 },
  { name: "Ben", bal: -90 },
  { name: "Chloe", bal: -80 },
  { name: "Dev", bal: 90 },
  { name: "Emil", bal: -40 },
];
// From the settleup README's flat_share example.
const SU_PLANS = {
  exact: [["Ben", "Dev", 90], ["Chloe", "Aino", 80], ["Emil", "Aino", 40]],
  greedy: [["Ben", "Aino", 90], ["Chloe", "Dev", 80], ["Emil", "Aino", 30], ["Emil", "Dev", 10]],
};

function SettleUpVisual() {
  const { t } = useLang();
  const d = t.work.projects.settleup.demo;
  const [mode, setMode] = useState("exact");
  const [auto, setAuto] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.3, rootMargin: "0px", once: false });

  useEffect(() => {
    if (!auto || !inView || REDUCED) return;
    const id = setInterval(() => setMode((m) => (m === "exact" ? "greedy" : "exact")), 3800);
    return () => clearInterval(id);
  }, [auto, inView]);

  const W = 420, H = 300, cx = W / 2, cy = H / 2 + 6, R = 112, NR = 26;
  const pos = Object.fromEntries(
    SU_PEOPLE.map((p, i) => {
      const a = (i / SU_PEOPLE.length) * Math.PI * 2 - Math.PI / 2;
      return [p.name, { x: cx + Math.cos(a) * R * 1.35, y: cy + Math.sin(a) * R }];
    })
  );
  const plan = SU_PLANS[mode];

  const arrow = ([from, to, amt], i) => {
    const a = pos[from], b = pos[to];
    const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
    const sx = a.x + ux * (NR + 4), sy = a.y + uy * (NR + 4), ex = b.x - ux * (NR + 10), ey = b.y - uy * (NR + 10);
    const bend = 0.18 * (i % 2 ? -1 : 1);
    const mx = (sx + ex) / 2 - uy * len * bend, my = (sy + ey) / 2 + ux * len * bend;
    const lx = 0.25 * sx + 0.5 * mx + 0.25 * ex, ly = 0.25 * sy + 0.5 * my + 0.25 * ey;
    return (
      <g className="su__edge" key={`${mode}-${from}-${to}`} style={{ "--i": i }}>
        <path d={`M${sx},${sy} Q${mx},${my} ${ex},${ey}`} className="su__path" markerEnd="url(#su-head)" pathLength="1" />
        <path d={`M${sx},${sy} Q${mx},${my} ${ex},${ey}`} className="su__flow" />
        <g transform={`translate(${lx},${ly})`} className="su__amt">
          <rect x="-22" y="-11" width="44" height="22" rx="11" />
          <text textAnchor="middle" dominantBaseline="central">{amt} €</text>
        </g>
      </g>
    );
  };

  return (
    <div className="su" ref={ref}>
      <div className="viz__bar mono">
        <span>flat_share.csv</span>
        <div className="su__toggle" role="group" aria-label="Algorithm">
          {["exact", "greedy"].map((m) => (
            <button key={m} className={mode === m ? "on" : ""} onClick={() => { setAuto(false); setMode(m); }}>{d[m]}</button>
          ))}
          <i style={{ transform: `translateX(${mode === "exact" ? 0 : 100}%)` }} />
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="su__svg" role="img" aria-label={`${plan.length} ${d.transfers}`}>
        <defs>
          <marker id="su-head" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#22d3ee" />
          </marker>
          <radialGradient id="su-pos"><stop offset="0" stopColor="#3ee08f" stopOpacity=".35" /><stop offset="1" stopColor="#3ee08f" stopOpacity="0" /></radialGradient>
          <radialGradient id="su-neg"><stop offset="0" stopColor="#ff4d8d" stopOpacity=".35" /><stop offset="1" stopColor="#ff4d8d" stopOpacity="0" /></radialGradient>
        </defs>
        {plan.map(arrow)}
        {SU_PEOPLE.map((p) => {
          const { x, y } = pos[p.name], positive = p.bal > 0;
          return (
            <g key={p.name} transform={`translate(${x},${y})`} className={`su__node ${positive ? "pos" : "neg"}`}>
              <circle r={NR * 2} fill={`url(#su-${positive ? "pos" : "neg"})`} />
              <circle r={NR} className="su__disc" />
              <text className="su__name" textAnchor="middle" y="-3">{p.name}</text>
              <text className="su__bal" textAnchor="middle" y="11">{positive ? "+" : "−"}{Math.abs(p.bal)}</text>
            </g>
          );
        })}
      </svg>
      <div className="su__foot">
        <b key={mode} className={`su__count ${mode}`}>{plan.length}</b>
        <span>{d.transfers}</span>
        <span className="su__naive mono">{d.naive}</span>
      </div>
    </div>
  );
}

/* ---------------- Section ---------------- */
export default function Work() {
  const { t } = useLang();
  const w = t.work;
  return (
    <section className="section work" id="work">
      <SectionLabel n="03">{w.label}</SectionLabel>
      <Reveal as="h2" className="title">{w.title}</Reveal>
      <Reveal as="p" className="sub">{w.sub}</Reveal>

      <div className="projects">
        {PROJECTS.map(({ id, name, demo, repo, stack, Visual }, i) => {
          const p = w.projects[id];
          return (
            <Reveal as="article" className={`project${i % 2 ? " project--flip" : ""}`} key={id}>
              <Reveal className="project__visual" tilt tiltStrength={3}>
                <Visual />
              </Reveal>
              <div className="project__body">
                <div className="project__head">
                  <span className="project__index mono">0{i + 1}</span>
                  <span className="project__kicker mono">{p.kicker}</span>
                </div>
                <h3 className="project__name">{name}</h3>
                <p className="project__tagline">{p.tagline}</p>
                <ul className="project__bullets">{p.bullets.map((b, k) => <li key={k}>{b}</li>)}</ul>
                <div className="project__stats">
                  {p.stats.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}
                </div>
                <div className="chips">{stack.map((s) => <span key={s}>{s}</span>)}</div>
                <div className="project__links">
                  <Magnetic href={demo} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                    <span>{w.live}</span>
                    <svg viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9" /></svg>
                  </Magnetic>
                  <Magnetic href={repo} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                    <span>{w.code}</span>
                  </Magnetic>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
