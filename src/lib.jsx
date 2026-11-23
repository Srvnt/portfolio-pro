import { useEffect, useRef, useState } from "react";

export const REDUCED = typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
export const FINE = typeof window !== "undefined" && matchMedia("(hover: hover) and (pointer: fine)").matches;
export const lerp = (a, b, t) => a + (b - a) * t;
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Calls back once when the element scrolls into view. */
export function useInView(ref, { threshold = 0.15, rootMargin = "0px 0px -8% 0px", once = true } = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting);
      if (e.isIntersecting && once) io.disconnect();
    }, { threshold, rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, rootMargin, once]);
  return inView;
}

/** Runs `frame(time)` each animation frame while the element is on screen. */
export function useVisibleLoop(ref, frame) {
  const fn = useRef(frame);
  fn.current = frame;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let visible = false, raf;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    const loop = (t) => { raf = requestAnimationFrame(loop); if (visible) fn.current(t); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [ref]);
}

/**
 * Scroll-reveal wrapper with optional 3D tilt + cursor spotlight.
 * <Reveal as="article" className="stat" tilt delay={0.1}>…</Reveal>
 */
export function Reveal({ as: Tag = "div", className = "", tilt = false, delay = 0, tiltStrength = 6, style, children, onReveal, ...rest }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [touched, setTouched] = useState(false);
  const [tilting, setTilting] = useState(false);

  useEffect(() => { if (inView) onReveal?.(); }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlers = tilt ? {
    onPointerEnter: () => { setTouched(true); setTilting(true); },
    onPointerMove: (e) => {
      const el = ref.current, r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", px * 100 + "%");
      el.style.setProperty("--my", py * 100 + "%");
      if (!FINE || REDUCED) return;
      el.style.setProperty("--rx", (0.5 - py) * tiltStrength + "deg");
      el.style.setProperty("--ry", (px - 0.5) * tiltStrength + "deg");
    },
    onPointerLeave: () => {
      setTilting(false);
      ref.current.style.setProperty("--rx", "0deg");
      ref.current.style.setProperty("--ry", "0deg");
    },
  } : {};

  const cls = ["reveal", tilt && "tilt", inView && "in", tilting && "tilting", className].filter(Boolean).join(" ");
  return (
    <Tag ref={ref} className={cls} style={{ "--d": touched ? "0s" : `${delay}s`, ...style }} {...handlers} {...rest}>
      {children}
    </Tag>
  );
}

/** Magnetic hover — element drifts toward the cursor. */
export function useMagnetic() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !FINE) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
    };
    const leave = () => (el.style.transform = "");
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, []);
  return ref;
}

export function Magnetic({ as: Tag = "a", children, ...rest }) {
  const ref = useMagnetic();
  return <Tag ref={ref} {...rest}>{children}</Tag>;
}

export function SectionLabel({ n, children }) {
  return <Reveal className="section__label"><span>{n}</span><span>{children}</span></Reveal>;
}
