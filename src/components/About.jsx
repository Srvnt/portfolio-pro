import { useRef } from "react";
import { useLang } from "../i18n.jsx";
import { Reveal, SectionLabel } from "../lib.jsx";

const TECH = ["Java", "Spring Boot", "React", "TypeScript", "PostgreSQL", "Azure", "AWS", "Docker", "CI/CD", "TDD", "Python", "Git", "AI"];

export function Marquee() {
  const items = [...TECH, ...TECH];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((w, i) => <span className="marquee__item" key={i}>{w}<b>✦</b></span>)}
      </div>
    </div>
  );
}

function Stat({ s, i }) {
  const num = useRef(null);
  const run = () => {
    const el = num.current, dur = 1800, t0 = performance.now(), from = s.from ?? 0;
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      el.textContent = Math.round(from + (s.n - from) * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  return (
    <Reveal className={`stat${String(s.n).length > 3 ? " stat--long" : ""}`} tilt delay={i * 0.08} onReveal={run}>
      <div className="stat__num"><b ref={num}>{s.from ?? 0}</b>{s.unit && <small>{s.unit}</small>}</div>
      <p>{s.text}</p>
    </Reveal>
  );
}

export default function About() {
  const { t } = useLang();
  return (
    <section className="section about" id="about">
      <SectionLabel n="01">{t.about.label}</SectionLabel>
      <Reveal as="h2" className="title">{t.about.title}</Reveal>
      <div className="about__grid">
        <Reveal as="p" className="about__text">{t.about.text}</Reveal>
        <div className="stats">
          {t.about.stats.map((s, i) => <Stat key={i} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
