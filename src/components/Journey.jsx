import { useEffect, useRef } from "react";
import { useLang } from "../i18n.jsx";
import { Reveal, SectionLabel } from "../lib.jsx";

export default function Journey() {
  const { t } = useLang();
  const timeline = useRef(null), rail = useRef(null);

  // Fill the rail and light up dots as the user scrolls through the timeline.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const tl = timeline.current;
      const r = tl.getBoundingClientRect(), mid = innerHeight * 0.6;
      rail.current.style.height = Math.max(0, Math.min(1, (mid - r.top) / r.height)) * 100 + "%";
      tl.querySelectorAll(".tl").forEach((it) => it.classList.toggle("lit", it.getBoundingClientRect().top + 30 < mid));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    update();
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); };
  }, []);

  return (
    <section className="section journey" id="journey">
      <SectionLabel n="02">{t.journey.label}</SectionLabel>
      <Reveal as="h2" className="title">{t.journey.title}</Reveal>
      <Reveal as="p" className="sub">{t.journey.sub}</Reveal>

      <div className="timeline" ref={timeline}>
        <div className="timeline__rail"><i ref={rail} /></div>
        {t.journey.items.map((it, i) => (
          <Reveal as="article" className="tl" key={i}>
            <div className="tl__dot" />
            <div className="tl__when mono">{it.when}</div>
            <Reveal className="tl__card" tilt>
              <div className="tl__head">
                <h3>{it.role}</h3>
                <span className={`tag${it.live ? " tag--live" : ""}`}>{it.tag}</span>
              </div>
              <p className="tl__org">{it.org}</p>
              <ul>{it.bullets.map((b, k) => <li key={k}>{b}</li>)}</ul>
              {it.chips && <div className="chips">{it.chips.map((c) => <span key={c}>{c}</span>)}</div>}
            </Reveal>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
