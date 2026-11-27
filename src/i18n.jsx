import { createContext, useContext, useEffect, useState } from "react";

export const CONFIG = {
  name: "Petri Malmström",
  email: "petri.malmstrom@gmail.com",
  phone: "+358 40 759 5280",
  linkedin: "https://www.linkedin.com/in/petri-malmstrom/",
};

const fi = {
  title: "Petri Malmström — Ohjelmistokehittäjä",
  nav: { status: "Avoin uusille haasteille", about: "Profiili", journey: "Polku", work: "Työt", skills: "Osaaminen", craft: "Työtapa", contact: "Yhteys" },
  hero: {
    kicker: "Ohjelmistokehittäjä @ Arter Oy",
    lead: "Teen full-stack-kehitystä Arterilla: Java, Spring Boot, React ja PostgreSQL, pilvenä Azure ja AWS. Kirjoitan testit ensin ja automatisoin julkaisut.",
    cta1: "Katso polkuni", cta2: "Ota yhteyttä", scroll: "Vieritä",
    roles: ["Full-stack-kehittäjä", "Java & Spring Boot", "React & TypeScript", "PostgreSQL", "Azure & AWS", "TDD & CI/CD"],
  },
  about: {
    label: "Profiili",
    title: <>Ohjelmistokehittäjä, taustalla <em>16 vuotta</em> logistiikkaa.</>,
    text: "Full-stack-sovelluskehittäjä, jolla ydinosaaminen Java-, React- ja PostgreSQL-teknologioista sekä pilviarkkitehtuureista (Azure, AWS). Vahvuuksiani ovat testivetoinen kehitys (TDD) ja pitkälle viety CI/CD-automaatio. Yhdistän kurinalaisen ohjelmistotuotannon moderniin AI-avusteiseen kehittämiseen tuottaakseni puhdasta, skaalautuvaa ja luotettavaa koodia.",
    stats: [
      { n: 8, unit: "kk", text: "juniorista medior-tason kehittäjäksi" },
      { n: 16, unit: "+", text: "vuotta Keskon suurimmassa keskusvarastossa" },
      { n: 2, unit: "pilveä", text: "pilvialustaa työssä: Azure ja AWS" },
      { n: 2024, from: 1999, text: "valmistuin tieto- ja viestintätekniikan insinööriksi (AMK)" },
    ],
  },
  journey: {
    label: "Polku",
    title: <>Trukista <em>full-stackiin.</em></>,
    sub: "Armeija, 16 vuotta varastolla, insinööriopinnot työn ohessa ja nyt ohjelmistokehittäjänä.",
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
        bullets: ["Opiskelin insinööriksi työn ohessa ja siirryin alalle jo ennen valmistumista."],
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
    title: <>Omia <em>projekteja</em></>,
    sub: "Kaksi omaa projektia. Molemmissa on toimiva demo ja koodi GitHubissa.",
    live: "Avaa demo", code: "Lähdekoodi",
    projects: {
      jobfit: {
        kicker: "AI selaimessa",
        tagline: "Vertaa CV:tä työpaikkailmoitukseen ja näyttää, mitkä vaatimukset täyttyvät ja mitkä puuttuvat.",
        bullets: [
          "Upotusmalli toimii suomeksi ja englanniksi ja pyörii kokonaan selaimessa, joten CV ei lähde laitteelta minnekään.",
          "Jokaisen vaatimuksen kohdalla näkyy CV:n tai portfolion rivi, johon arvio perustuu.",
          "Pelkkä upotusmalli piti sanoja ”Swedish” ja ”English” lähes samoina, joten lisäsin erillisen tarkistuksen nimetyille taidoille. Se ymmärtää myös suomen taivutusmuodot.",
          "Palvelinosa, joka hakee ilmoituksen linkistä, on suojattu SSRF-hyökkäyksiltä.",
        ],
        stats: [["83 %", "oikein 60 testivaatimuksella"], ["0", "CV-tietoja palvelimelle"], ["3", "mallia vertailtu"]],
      },
      settleup: {
        kicker: "Algoritmit ja full-stack",
        tagline: "Laskee jaetuista kuluista, kuka maksaa kenelle, niin että tilisiirtoja tarvitaan mahdollisimman vähän.",
        bullets: [
          "Tarkka ratkaisija käy dynaamisella ohjelmoinnilla läpi kaikki ryhmän osajoukot ja löytää pienimmän mahdollisen siirtomäärän.",
          "Rahasummat käsitellään kokonaisina sentteinä, joten pyöristysvirheitä ei synny.",
          "Mukana Python-komentorivityökalu, selainversio ja Spring Boot -REST-API (PostgreSQL, JWT).",
          "Testeissä tarkan ratkaisijan tuloksia verrataan erilliseen brute force -toteutukseen.",
        ],
        stats: [["3 / 7", "siirtoa: optimoitu vs. suora takaisinmaksu"], ["75", "testiä"], ["300", "satunnaistapausta tarkistettu brute forcella"]],
        demo: { exact: "Tarkka", greedy: "Ahne", transfers: "siirtoa", naive: "suoraan maksettuna 7" },
      },
    },
  },
  skills: {
    label: "Osaaminen",
    title: <>Mitä <em>osaan</em></>,
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
      { title: "Testit ensin", text: "Aloitan ominaisuuden testillä, joka ei vielä mene läpi. Kun koodi on valmis, testit jäävät suojaamaan sitä muutoksilta." },
      { title: "Automaatio", text: "Build, testit ja julkaisu ajetaan CI/CD-putkessa. Käsin tehtävät vaiheet unohtuvat helposti." },
      { title: "AI-työkalut", text: "Käytän AI-työkaluja päivittäin ja kehitän niitä myös itse. Niiden tuottama koodi tarkistetaan ja testataan kuten muukin." },
    ],
  },
  contact: { label: "Yhteys", title: <>Ota <em>yhteyttä</em></>, copy: "Kopioi", copied: "Sähköposti kopioitu ✓" },
  footer: { text: "Tehty Reactilla ja Vitellä.", top: "↑ Alkuun" },
};

const en = {
  title: "Petri Malmström — Software Developer",
  nav: { status: "Open to new challenges", about: "Profile", journey: "Journey", work: "Work", skills: "Skills", craft: "Craft", contact: "Contact" },
  hero: {
    kicker: "Software Developer @ Arter Oy",
    lead: "I do full-stack development at Arter: Java, Spring Boot, React and PostgreSQL, on Azure and AWS. I write the tests first and automate the releases.",
    cta1: "See my journey", cta2: "Get in touch", scroll: "Scroll",
    roles: ["Full-stack developer", "Java & Spring Boot", "React & TypeScript", "PostgreSQL", "Azure & AWS", "TDD & CI/CD"],
  },
  about: {
    label: "Profile",
    title: <>Software developer with <em>16 years</em> of logistics behind me.</>,
    text: "Full-stack developer with core expertise in Java, React and PostgreSQL, plus cloud architectures on Azure and AWS. My strengths are test-driven development (TDD) and deep CI/CD automation. I combine disciplined software engineering with modern AI-assisted development to ship clean, scalable and reliable code.",
    stats: [
      { n: 8, unit: "mo", text: "from junior to mid-level developer" },
      { n: 16, unit: "+", text: "years in Kesko's largest central warehouse" },
      { n: 2, unit: "clouds", text: "clouds I use at work: Azure and AWS" },
      { n: 2024, from: 1999, text: "graduated as a B.Eng. in Information and Communication Technology" },
    ],
  },
  journey: {
    label: "Journey",
    title: <>From forklift to <em>full-stack.</em></>,
    sub: "The army, 16 years in a warehouse, an engineering degree alongside work, and now software development.",
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
        bullets: ["Studied engineering alongside work and moved into the industry before graduating."],
      },
      {
        when: "1/2007 — 5/2023", role: "Warehouse Worker", org: "Kesko Oyj", tag: "16 years",
        bullets: [
          "Mastered the full logistics process in Kesko's largest central warehouse.",
          "Worked as an SAP power user and helped colleagues with using the system and solving problems.",
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
    title: <>Side <em>projects</em></>,
    sub: "Two projects of my own. Both have a working demo and the code on GitHub.",
    live: "Live demo", code: "Source code",
    projects: {
      jobfit: {
        kicker: "AI in the browser",
        tagline: "Compares a CV with a job ad and shows which requirements are met and which are missing.",
        bullets: [
          "The embedding model works in Finnish and English and runs entirely in the browser, so the CV never leaves the device.",
          "For each requirement it shows the CV or portfolio line the result is based on.",
          "The embedding model alone treated \"Swedish\" and \"English\" as almost the same, so I added a separate check for named skills. It also understands Finnish word endings.",
          "The server part that fetches a job ad from a link is protected against SSRF attacks.",
        ],
        stats: [["83%", "correct on 60 test requirements"], ["0", "CV data sent to a server"], ["3", "models compared"]],
      },
      settleup: {
        kicker: "Algorithms and full-stack",
        tagline: "Works out who pays whom after shared expenses, using as few bank transfers as possible.",
        bullets: [
          "The exact solver uses dynamic programming over every subset of the group to find the smallest possible number of transfers.",
          "Amounts are handled as whole cents, so there are no rounding errors.",
          "Includes a Python command-line tool, a browser version and a Spring Boot REST API (PostgreSQL, JWT).",
          "The tests compare the exact solver's results with a separate brute-force implementation.",
        ],
        stats: [["3 / 7", "transfers: optimised vs. paying back directly"], ["75", "tests"], ["300", "random cases checked by brute force"]],
        demo: { exact: "Exact", greedy: "Greedy", transfers: "transfers", naive: "7 if paid back directly" },
      },
    },
  },
  skills: {
    label: "Skills",
    title: <>What I <em>work with</em></>,
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
      { title: "Tests first", text: "I start a feature with a test that doesn't pass yet. Once the code is done, the tests stay to protect it from later changes." },
      { title: "Automation", text: "Builds, tests and releases run in a CI/CD pipeline. Manual steps are easy to forget." },
      { title: "AI tools", text: "I use AI tools every day and also build them. The code they produce gets reviewed and tested like any other code." },
    ],
  },
  contact: { label: "Contact", title: <>Get in <em>touch</em></>, copy: "Copy", copied: "Email copied ✓" },
  footer: { text: "Built with React and Vite.", top: "↑ Top" },
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
