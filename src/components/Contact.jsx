import { useRef, useState } from "react";
import { CONFIG, useLang } from "../i18n.jsx";
import { Magnetic, Reveal, SectionLabel } from "../lib.jsx";
import { burst } from "./Effects.jsx";

export default function Contact() {
  const { t } = useLang();
  const [toast, setToast] = useState(false);
  const timer = useRef();

  const copy = async (e) => {
    const { clientX, clientY } = e;
    try {
      await navigator.clipboard.writeText(CONFIG.email);
      setToast(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setToast(false), 2200);
    } catch {
      location.href = `mailto:${CONFIG.email}`;
    }
    burst(clientX, clientY);
  };

  return (
    <>
      <section className="section contact" id="contact">
        <div className="contact__glow" aria-hidden="true" />
        <SectionLabel n="06">{t.contact.label}</SectionLabel>
        <Reveal as="h2" className="contact__title">{t.contact.title}</Reveal>
        <Reveal>
          <Magnetic as="button" className="contact__mail" onClick={copy}>
            <span className="contact__mailText">{CONFIG.email}</span>
            <span className="contact__copy mono">{t.contact.copy}</span>
          </Magnetic>
        </Reveal>
        <Reveal className="contact__links">
          <Magnetic href={`mailto:${CONFIG.email}`} className="pill"><span>✉</span> Email</Magnetic>
          <Magnetic href={`tel:${CONFIG.phone.replace(/\s/g, "")}`} className="pill"><span>☏</span> {CONFIG.phone}</Magnetic>
          <Magnetic href={CONFIG.linkedin} className="pill" target="_blank" rel="noopener noreferrer"><span>in</span> LinkedIn</Magnetic>
        </Reveal>
      </section>

      <footer className="footer">
        <span>© {new Date().getFullYear()} {CONFIG.name}</span>
        <span className="mono">{t.footer.text}</span>
        <a href="#top" className="mono">{t.footer.top}</a>
      </footer>

      <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite">{toast ? t.contact.copied : ""}</div>
    </>
  );
}
