import { createContext, useContext, useEffect, useState } from "react";

export const CONFIG = {
  name: "Petri Malmström",
  email: "petri.malmstrom@gmail.com",
  phone: "+358 40 759 5280",
  // TODO: set your LinkedIn profile URL here
  linkedin: "https://www.linkedin.com/in/",
};

const fi = {
  title: "Petri Malmström — Ohjelmistokehittäjä",
  nav: { status: "Avoin uusille haasteille", about: "Profiili", journey: "Polku", skills: "Osaaminen", craft: "Työtapa", contact: "Yhteys" },
  hero: {
    kicker: "Ohjelmistokehittäjä @ Arter Oy",
    lead: "Rakennan puhdasta, skaalautuvaa ja luotettavaa koodia — Java, React, PostgreSQL ja pilvi. Testit ensin, automaatio aina.",
    cta1: "Katso polkuni", cta2: "Ota yhteyttä", scroll: "Vieritä",
    roles: ["Full-stack-kehittäjä", "Testivetoinen (TDD)", "CI/CD-automaation rakentaja", "AI-avusteinen kehittäjä", "Java · React · PostgreSQL", "Azure & AWS"],
  },
  about: {
    label: "Profiili",
    title: <>Kurinalaista ohjelmisto&shy;tuotantoa. <em>AI-avusteisella</em> vauhdilla.</>,
    text: "Full-stack-sovelluskehittäjä, jolla ydinosaaminen Java-, React- ja PostgreSQL-teknologioista sekä pilviarkkitehtuureista (Azure, AWS). Vahvuuksiani ovat testivetoinen kehitys (TDD) ja pitkälle viety CI/CD-automaatio. Yhdistän kurinalaisen ohjelmistotuotannon moderniin AI-avusteiseen kehittämiseen tuottaakseni puhdasta, skaalautuvaa ja luotettavaa koodia.",
    stats: [
      { n: 8, unit: "kk", text: "juniorista medior-tason kehittäjäksi — ennätysajassa" },
      { n: 16, unit: "+", text: "vuotta logistiikan ytimessä Keskon suurimmassa keskusvarastossa" },
      { n: 2, unit: "pilveä", text: "Azure & AWS — skaalautuvat arkkitehtuurit" },
      { n: 2024, from: 1999, text: "Tieto- ja viestintätekniikan insinööri (AMK)" },
    ],
  },
  journey: {
    label: "Polku",
    title: <>Trukista <em>full-stackiin.</em></>,
    sub: "Johtamista, vastuuta ja prosessien hallintaa — nyt koodina.",
    items: [
      {
        when: "6/2023 — nyt", role: "Ohjelmistokehittäjä", org: "Arter Oy", tag: "Nykyinen", live: true,
        bullets: [
          "Etenin ennätysajassa (8 kk) junior-kehittäjästä medior-tason sovelluskehittäjäksi.",
          "Kehitän vaativia full-stack-ratkaisuja Java-, React- ja PostgreSQL-teknologioilla (Azure, AWS).",
          "Vastaan CI/CD-automaatioputkien kehittämisestä ja noudatan testivetoista (TDD) kehitystapaa.",
          "Hyödynnän ja kehitän aktiivisesti AI-työkaluja kehitystyön tehostamisessa.",
        ],
        chips: ["Java", "Spring Boot", "React", "PostgreSQL", "Azure", "AWS", "CI/CD", "TDD"],
      },
      {
        when: "2022 — 2024", role: "Tieto- ja viestintätekniikan insinööri (AMK)", org: "Hämeen ammattikorkeakoulu, Riihimäki", tag: "Koulutus",
        bullets: ["Opiskelin insinööriksi työn ohella — ja siirryin alalle jo ennen valmistumista."],
      },
      {
        when: "1/2007 — 5/2023", role: "Varastotyöntekijä", org: "Kesko Oyj", tag: "16 vuotta",
        bullets: [
          "Hallitsin koko logistiikkaprosessin Keskon suurimmassa keskusvarastossa.",
          "Toimin SAP-tehokäyttäjänä ja tukena muille järjestelmän käyttöön ja ongelmatilanteisiin liittyvissä kysymyksissä.",
          "Työskentelin monipuolisesti tavaran vastaanotossa, keräilyssä/jakelussa sekä trukkikuljettajana.",
        ],
        chips: ["SAP", "Prosessit", "Logistiikka"],
      },
      {
        when: "1 — 12/2006", role: "Sopimussotilas", org: "Puolustusvoimat", tag: "Johtaminen",
        bullets: [
          "Toimin joukkueen varajohtajana ja vastasin joukon päivittäisestä toiminnasta.",
          "Johdin ja koulutin uusia alokkaita osana koulutusorganisaatiota.",
          "Opetin palveluksen kannalta keskeisiä perustaitoja ja toimintamalleja.",
        ],
      },
    ],
  },
  skills: {
    label: "Osaaminen",
    title: <>Työkalupakki, joka <em>skaalautuu.</em></>,
    hint: "Liikuta hiirtä ✦",
    lang: "Kielet & kehykset", cloud: "Tietokannat & pilvi", tools: "Menetelmät & työkalut", ai: "AI-työkalut",
    soft: [
      { icon: "◎", title: "Ongelmanratkaisu", text: "Systemaattinen analyysi ja juurisyiden selvittäminen." },
      { icon: "◆", title: "Liiketoiminta", text: "Kokonaisuuksien hahmottaminen ja asiakasarvon ymmärtäminen." },
      { icon: "✦", title: "Tiimityö", text: "Ratkaisukeskeinen yhteistyö, oma-aloitteisuus ja vastuunotto." },
    ],
  },
  craft: {
    label: "Työtapa", red: "Punainen.", green: "Vihreä.", refactor: "Refaktoroi.",
    principles: [
      { title: "Testit ensin", text: "TDD ei ole hidaste vaan turvaverkko. Jokainen ominaisuus syntyy epäonnistuvasta testistä." },
      { title: "Automatisoi kaikki", text: "Pitkälle viety CI/CD: build, testit ja julkaisu kulkevat putkessa ilman käsityötä." },
      { title: "AI vipuvartena", text: "Hyödynnän ja kehitän AI-työkaluja — nopeutta ilman, että laadusta tingitään." },
    ],
  },
  contact: { label: "Yhteys", title: <>Rakennetaan jotain <em>upeaa.</em></>, copy: "Kopioi", copied: "Sähköposti kopioitu ✓" },
  footer: { text: "Rakennettu käsin. Testattu huolella.", top: "↑ Alkuun" },
};

const en = {
  title: "Petri Malmström — Software Developer",
  nav: { status: "Open to new challenges", about: "Profile", journey: "Journey", skills: "Skills", craft: "Craft", contact: "Contact" },
  hero: {
    kicker: "Software Developer @ Arter Oy",
    lead: "I build clean, scalable and reliable software — Java, React, PostgreSQL and the cloud. Tests first, automation always.",
    cta1: "See my journey", cta2: "Get in touch", scroll: "Scroll",
    roles: ["Full-stack developer", "Test-driven by default", "CI/CD pipeline builder", "AI-augmented engineer", "Java · React · PostgreSQL", "Azure & AWS"],
  },
  about: {
    label: "Profile",
    title: <>Disciplined engineering. <em>AI-augmented</em> speed.</>,
    text: "Full-stack developer with core expertise in Java, React and PostgreSQL, plus cloud architectures on Azure and AWS. My strengths are test-driven development (TDD) and deep CI/CD automation. I combine disciplined software engineering with modern AI-assisted development to ship clean, scalable and reliable code.",
    stats: [
      { n: 8, unit: "mo", text: "from junior to mid-level developer — in record time" },
      { n: 16, unit: "+", text: "years at the heart of logistics in Kesko's largest central warehouse" },
      { n: 2, unit: "clouds", text: "Azure & AWS — scalable architectures" },
      { n: 2024, from: 1999, text: "B.Eng. in Information and Communication Technology" },
    ],
  },
  journey: {
    label: "Journey",
    title: <>From forklift to <em>full-stack.</em></>,
    sub: "Leadership, ownership and process mastery — now written in code.",
    items: [
      {
        when: "6/2023 — now", role: "Software Developer", org: "Arter Oy", tag: "Current", live: true,
        bullets: [
          "Promoted from junior to mid-level developer in record time (8 months).",
          "Building demanding full-stack solutions with Java, React and PostgreSQL on Azure and AWS.",
          "Own the development of CI/CD automation pipelines and follow a test-driven (TDD) workflow.",
          "Actively use and develop AI tooling to accelerate development.",
        ],
        chips: ["Java", "Spring Boot", "React", "PostgreSQL", "Azure", "AWS", "CI/CD", "TDD"],
      },
      {
        when: "2022 — 2024", role: "B.Eng., Information and Communication Technology", org: "Häme University of Applied Sciences, Riihimäki", tag: "Education",
        bullets: ["Studied engineering alongside work — and moved into the industry before graduating."],
      },
      {
        when: "1/2007 — 5/2023", role: "Warehouse Worker", org: "Kesko Oyj", tag: "16 years",
        bullets: [
          "Mastered the full logistics process in Kesko's largest central warehouse.",
          "SAP power user — the go-to support for colleagues on system usage and problem situations.",
          "Worked across goods receiving, picking/distribution and as a forklift operator.",
        ],
        chips: ["SAP", "Processes", "Logistics"],
      },
      {
        when: "1 — 12/2006", role: "Contract Soldier", org: "Finnish Defence Forces", tag: "Leadership",
        bullets: [
          "Served as deputy platoon leader, responsible for the unit's daily operations.",
          "Led and trained new recruits as part of the training organisation.",
          "Taught essential core skills and operating procedures.",
        ],
      },
    ],
  },
  skills: {
    label: "Skills",
    title: <>A toolkit that <em>scales.</em></>,
    hint: "Move your mouse ✦",
    lang: "Languages & frameworks", cloud: "Databases & cloud", tools: "Methods & tools", ai: "AI tools",
    soft: [
      { icon: "◎", title: "Problem solving", text: "Systematic analysis and root-cause investigation." },
      { icon: "◆", title: "Business", text: "Seeing the big picture and understanding customer value." },
      { icon: "✦", title: "Teamwork", text: "Solution-focused collaboration, initiative and ownership." },
    ],
  },
  craft: {
    label: "Craft", red: "Red.", green: "Green.", refactor: "Refactor.",
    principles: [
      { title: "Tests first", text: "TDD isn't a brake, it's a safety net. Every feature starts with a failing test." },
      { title: "Automate everything", text: "Deep CI/CD: build, tests and releases flow through the pipeline with zero manual steps." },
      { title: "AI as leverage", text: "I use and build AI tooling — speed without compromising quality." },
    ],
  },
  contact: { label: "Contact", title: <>Let's build something <em>great.</em></>, copy: "Copy", copied: "Email copied ✓" },
  footer: { text: "Handcrafted. Thoroughly tested.", top: "↑ Top" },
};

const DICT = { fi, en };
const LangCtx = createContext(null);

function initialLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "fi" || saved === "en") return saved;
  } catch {}
  return navigator.language?.startsWith("fi") ? "fi" : "en";
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = DICT[lang].title;
    try { localStorage.setItem("lang", lang); } catch {}
  }, [lang]);
  const toggle = () => setLang((l) => (l === "fi" ? "en" : "fi"));
  return <LangCtx.Provider value={{ lang, t: DICT[lang], toggle }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
