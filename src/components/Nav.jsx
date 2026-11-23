import { useEffect, useState } from "react";
import { useLang } from "../i18n.jsx";

const IDS = ["about", "journey", "skills", "craft", "contact"];

export default function Nav() {
  const { t, toggle } = useLang();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    let lastY = scrollY, raf = 0;
    const update = () => {
      raf = 0;
      const y = scrollY;
      setHidden(y > lastY && y > 300);
      lastY = y;
      let a = -1;
      IDS.forEach((id, i) => {
        const s = document.getElementById(id);
        if (s && s.getBoundingClientRect().top < innerHeight * 0.4) a = i;
      });
      setActive(a);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${open ? " open" : ""}${hidden && !open ? " hide" : ""}`}>
      <a href="#top" className="nav__logo" aria-label="Petri Malmström">
        <span className="nav__mono">PM</span>
        <span className="nav__status"><i /><span>{t.nav.status}</span></span>
      </a>
      <nav className="nav__links">
        {IDS.map((id, i) => (
          <a key={id} href={`#${id}`} className={i === active ? "active" : ""} onClick={() => setOpen(false)}>
            {t.nav[id]}
          </a>
        ))}
      </nav>
      <div className="nav__actions">
        <button className="lang" onClick={toggle} aria-label="Vaihda kieli / Switch language">
          <span data-l="fi">FI</span><span data-l="en">EN</span><i />
        </button>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <span /><span />
        </button>
      </div>
    </header>
  );
}
