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
  nav: { status: "Avoin uusille haasteille", about: "Profiili", journey: "Polku", work: "Työt", skills: "Osaaminen", craft: "Työtapa", contact: "Yhteys" },
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
  work: {
    label: "Työnäytteet",
    title: <>Koodia, joka <em>todistaa.</em></>,
    sub: "Kaksi omaa projektia alusta loppuun — suunnittelusta testeihin ja tuotantoon.",
    live: "Avaa demo", code: "Lähdekoodi",
    projects: {
      jobfit: {
        kicker: "AI · selaimessa",
        tagline: "Vertaa CV:tä työpaikkailmoitukseen merkityksen, ei avainsanojen perusteella.",
        bullets: [
          "Monikielinen (suomi & englanti) upotusmalli ajetaan kokonaan selaimessa Web Workerissa — CV ei koskaan poistu laitteelta.",
          "Jokainen vaatimus kohdistetaan sitä tukevaan CV- tai portfoliorivin todisteeseen: täyttyy, osittain tai puuttuu.",
          "Nimettyjen termien tarkistus paikkaa upotusten sokean pisteen (esim. ”Swedish” ≠ ”English”) ja ymmärtää suomen taivutukset.",
          "SSRF-suojattu sivunhakija: DNS-tarkistus yhteyden hetkellä, uudelleenohjausten valvonta ja headless Chromium JS-sivuille.",
        ],
        stats: [["83 %", "tarkkuus 60 merkityllä vaatimuksella"], ["0 tavua", "CV-dataa palvelimelle"], ["3", "mallia vertailtu evaluaatiolla"]],
      },
      settleup: {
        kicker: "Algoritmit · full-stack",
        tagline: "Jaetut kulut tasan mahdollisimman vähillä tilisiirroilla — todistetusti.",
        bullets: [
          "Tarkka ratkaisija: dynaaminen ohjelmointi kaikkien 2ⁿ osajoukon yli löytää todistetusti minimimäärän siirtoja (NP-vaikea ongelma).",
          "Raha kokonaislukusentteinä ja suurimman jäännöksen menetelmä — summat täsmäävät aina sentilleen.",
          "Python-CLI, selainversio (ristiintarkistettu 800 satunnaistapauksella) ja Spring Boot -REST-API PostgreSQL:llä ja JWT-kirjautumisella.",
          "Testattu brute force -vertailulla, ominaisuuspohjaisilla testeillä ja Testcontainers-integraatiotesteillä.",
        ],
        stats: [["3 vs 7", "siirtoa esimerkkitapauksessa"], ["75", "testiä (Python + Java)"], ["300", "satunnaistapausta brute force -tarkistettu"]],
        demo: { exact: "Tarkka", greedy: "Ahne", transfers: "siirtoa", naive: "vs 7 naiivisti" },
      },
    },
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
  nav: { status: "Open to new challenges", about: "Profile", journey: "Journey", work: "Work", skills: "Skills", craft: "Craft", contact: "Contact" },
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
  work: {
    label: "Work",
    title: <>Code that <em>proves it.</em></>,
    sub: "Two personal projects built end to end — from design to tests to production.",
    live: "Live demo", code: "Source code",
    projects: {
      jobfit: {
        kicker: "AI · in the browser",
        tagline: "Match a CV to a job ad by meaning, not keywords.",
        bullets: [
          "A multilingual (Finnish & English) embedding model runs entirely in the browser in a Web Worker — the CV never leaves the device.",
          "Every requirement is matched to the CV or portfolio line that backs it up: met, partial or gap.",
          "A named-term check fixes the embeddings' blind spot (\"Swedish\" ≠ \"English\") and understands Finnish inflections.",
          "SSRF-hardened page fetcher: DNS checked at connect time, guarded redirects and headless Chromium for JS-only sites.",
        ],
        stats: [["83%", "accuracy on 60 labelled requirements"], ["0 bytes", "of CV data sent to a server"], ["3", "models compared by evaluation"]],
      },
      settleup: {
        kicker: "Algorithms · full-stack",
        tagline: "Settle shared expenses with the fewest possible transfers — provably.",
        bullets: [
          "Exact solver: dynamic programming over all 2ⁿ subsets finds the provably minimal number of transfers (an NP-hard problem).",
          "Money as integer cents with the largest-remainder method — splits always add up to the cent.",
          "Python CLI, a browser version (cross-checked on 800 random cases) and a Spring Boot REST API with PostgreSQL and JWT auth.",
          "Tested against an independent brute force, with property-based tests and Testcontainers integration tests.",
        ],
        stats: [["3 vs 7", "transfers in the sample case"], ["75", "tests (Python + Java)"], ["300", "random cases brute-force verified"]],
        demo: { exact: "Exact", greedy: "Greedy", transfers: "transfers", naive: "vs 7 naive" },
      },
    },
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
