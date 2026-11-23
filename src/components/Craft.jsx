import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n.jsx";
import { REDUCED, Reveal, SectionLabel, sleep, useInView } from "../lib.jsx";

// Illustrative TDD loop — red → green → refactor → ship.
const SCRIPT = [
  ["cmd", "./mvnw test -Dtest=OrderServiceTest"],
  ["out", [["dim", "[INFO] Running fi.arter.order.OrderServiceTest"]]],
  ["out", [["err", "✗ shouldApplyDiscountToTotal  FAILED"]]],
  ["out", [["dim", "  expected: <89.90> but was: <99.90>"]]],
  ["out", [["err", "[ERROR] Tests run: 1, Failures: 1"]], 700],
  ["cmd", "vim src/main/java/fi/arter/order/OrderService.java"],
  ["out", [["dim", "  // write just enough code to go green…"]], 600],
  ["cmd", "./mvnw test"],
  ["out", [["ok", "✓ shouldApplyDiscountToTotal"]]],
  ["out", [["ok", "✓ shouldRejectNegativeQuantity"]]],
  ["out", [["ok", "✓ shouldPersistOrderToPostgres"]]],
  ["out", [["ok", "[INFO] Tests run: 128, Failures: 0 — BUILD SUCCESS"]], 500],
  ["cmd", 'git commit -am "refactor: extract DiscountPolicy" && git push'],
  ["out", [["cy", "→ pipeline #1337 triggered ⚡"]], 200],
  ["pipe"],
  ["out", [["ok", "✓ deployed to production"], ["", " "], ["dim", "(azure · aws)"]], 2600],
];
const STAGES = ["build", "test", "scan", "deploy"];

function Prompt() {
  return <><span className="p">➜</span> <span className="cy">order-service</span> <span className="dim">git:(</span><span className="err">main</span><span className="dim">)</span> </>;
}

function Terminal() {
  const ref = useRef(null);
  const visible = useInView(ref, { threshold: 0.3, rootMargin: "0px", once: false });
  const [lines, setLines] = useState([]);
  const [stages, setStages] = useState([]); // per stage: undefined | "run" | "done"

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    const wait = async (ms) => { await sleep(ms); if (cancelled) throw 0; };
    (async () => {
      while (!cancelled) {
        setLines([]); setStages([]);
        for (const [kind, data, pause = 260] of SCRIPT) {
          if (kind === "cmd") {
            for (let i = 1; i <= data.length; i++) {
              setLines((l) => [...l.slice(0, i === 1 ? l.length : -1), { cmd: data.slice(0, i), typing: true }]);
              await wait(REDUCED ? 0 : 22 + Math.random() * 40);
            }
            await wait(350);
            setLines((l) => [...l.slice(0, -1), { cmd: data }]);
          } else if (kind === "out") {
            setLines((l) => [...l, { out: data }]);
            await wait(pause);
          } else {
            for (let s = 0; s < STAGES.length; s++) {
              setStages((st) => { const n = [...st]; n[s] = "run"; return n; });
              await wait(750);
              setStages((st) => { const n = [...st]; n[s] = "done"; return n; });
            }
            await wait(200);
          }
        }
        await wait(400);
      }
    })().catch(() => {});
    return () => { cancelled = true; };
  }, [visible]);

  return (
    <Reveal className="terminal">
      <div className="terminal__bar"><i /><i /><i /><span className="mono">~/arter/order-service — zsh</span></div>
      <pre className="terminal__body mono" ref={ref}>
        {lines.map((l, i) => (
          <div key={i}>
            {l.cmd != null ? (
              <><Prompt />{l.cmd}{l.typing && <span className="cur" />}</>
            ) : (
              l.out.map(([cls, text], k) => <span key={k} className={cls}>{text}</span>)
            )}
          </div>
        ))}
      </pre>
      <div className="pipeline">
        {STAGES.map((s, i) => (
          <div className={`stage ${stages[i] || ""}`} key={s}><span>{s}</span><i /></div>
        ))}
      </div>
    </Reveal>
  );
}

export default function Craft() {
  const { t } = useLang();
  const c = t.craft;
  return (
    <section className="section craft" id="craft">
      <SectionLabel n="04">{c.label}</SectionLabel>
      <Reveal as="h2" className="title">
        <span className="c-red">{c.red}</span> <span className="c-green">{c.green}</span> <em>{c.refactor}</em>
      </Reveal>
      <div className="craft__grid">
        <Terminal />
        <div className="principles">
          {c.principles.map((p, i) => (
            <Reveal className="principle" tilt delay={i * 0.08} key={i}>
              <span className="mono">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
