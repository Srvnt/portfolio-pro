import { useState } from "react";
import { LangProvider } from "./i18n.jsx";
import { Cursor, Grain, Loader, ScrollProgress } from "./components/Effects.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import About, { Marquee } from "./components/About.jsx";
import Journey from "./components/Journey.jsx";
import Skills from "./components/Skills.jsx";
import Craft from "./components/Craft.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  const [ready, setReady] = useState(false);
  return (
    <LangProvider>
      <div className={ready ? "ready" : ""}>
        <Loader onDone={() => setReady(true)} />
        <Grain />
        <ScrollProgress />
        <Cursor />
        <Nav />
        <main id="top">
          <Hero ready={ready} />
          <Marquee />
          <About />
          <Journey />
          <Skills />
          <Craft />
        </main>
        <Contact />
      </div>
    </LangProvider>
  );
}
