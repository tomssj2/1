// Funky Cow — small interactions: mobile nav, menu tabs, EN/EL language toggle.

(function () {
  // ---------- Mobile nav ----------
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  // ---------- Menu tabs ----------
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));

  function selectTab(tab) {
    tabs.forEach((t) => {
      const selected = t === tab;
      t.setAttribute("aria-selected", String(selected));
      t.tabIndex = selected ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !selected;
    });
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (e) => {
      let next = null;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (next) {
        e.preventDefault();
        next.focus();
        selectTab(next);
      }
    });
  });

  // ---------- Year ----------
  document.getElementById("year").textContent = new Date().getFullYear();

  // ---------- Language (EN / EL) ----------
  const el = {
    "nav.menu": "Μενού",
    "nav.story": "Η ιστορία μας",
    "nav.visit": "Επίσκεψη",
    "nav.jobs": "Εργασία",

    "hero.eyebrow": "Οικογενειακό diner · Νάουσα",
    "hero.l1": "Smash.",
    "hero.l2": "Shake.",
    "hero.l3": "Repeat.",
    "hero.lead": "Smash burgers με τραγανές άκρες, ψημένα στη στιγμή στο πλατό, πηχτά milkshakes φτιαγμένα στο χέρι και καλή διάθεση — κατευθείαν από ένα αμερικάνικο diner των '50s.",
    "hero.cta1": "Δες το μενού",
    "hero.cta2": "Βρες μας",
    "hero.sticker1": "Φρέσκο μοσχάρι!",
    "hero.sticker2": "Shakes στο χέρι",

    "menu.title": "Το Μενού",
    "menu.sub": "Κάθε burger πατιέται τη στιγμή της παραγγελίας σε καυτό πλατό για τραγανή, καραμελωμένη κρούστα.",
    "menu.tab1": "Burgers",
    "menu.tab2": "Shakes",
    "menu.tab3": "Συνοδευτικά",
    "menu.best": "Best seller",
    "menu.fav": "Αγαπημένο",
    "menu.must": "Να το δοκιμάσεις",
    "menu.b1": "Διπλό smash μοσχάρι, cheddar, πίκλες, κρεμμύδι, Funky sauce, ψημένο brioche.",
    "menu.b2": "Ένα τραγανό μπιφτέκι, τυρί, κέτσαπ, μουστάρδα, πίκλες. Απλό και τέλειο.",
    "menu.b3": "Διπλό μοσχάρι, τραγανό μπέικον, cheddar, καραμελωμένα κρεμμύδια, καπνιστή BBQ.",
    "menu.b4": "Διπλό μοσχάρι, pepper jack, jalapeños τουρσί, chipotle μαγιονέζα. Καυτερό!",
    "menu.b5": "Διπλό μοσχάρι, ψητή γραβιέρα, ντομάτα, κόκκινο κρεμμύδι, σάλτσα γιαουρτιού με ρίγανη.",
    "menu.b6": "Τηγανητό κοτόπουλο buttermilk, coleslaw, πίκλες, μαγιονέζα μέλι-μουστάρδα.",
    "menu.s1": "Αληθινές φράουλες, παγωτό βανίλια, σαντιγί και κεράσι από πάνω.",
    "menu.s2": "Πηχτό, κρεμώδες, κλασική βανίλια.",
    "menu.s3": "Παγωτό σοκολάτα, fudge και κομμάτια σοκολάτας.",
    "menu.s4": "Θρυμματισμένα μπισκότα σε βανίλια, με έξτρα crumble από πάνω.",
    "menu.s5": "Παγωτό καραμέλα, θαλασσινό αλάτι, τραγανά pretzel.",
    "menu.s6": "Κρέμα φιστικιού Αιγίνης, βανίλια, τριμμένο φιστίκι.",
    "menu.f1": "Με σάλτσα τυριού, τραγανό κρεμμύδι και Funky sauce.",
    "menu.f2": "Χρυσές, τραγανές, αλατισμένες όσο πρέπει.",
    "menu.f3": "Σε κουρκούτι μπύρας, με σος ranch.",
    "menu.f4": "Τραγανές μπουκιές κοτόπουλου με dip της επιλογής σου.",
    "menu.f5": "Cola, λεμονάδα, πορτοκαλάδα ή νερό.",
    "menu.combo": "Κάν' το Combo",
    "menu.f6": "Πρόσθεσε πατάτες και αναψυκτικό σε οποιοδήποτε burger.",
    "menu.note": "Ρώτησέ μας για αλλεργιογόνα. Οι τιμές περιλαμβάνουν ΦΠΑ.",

    "story.title": "Υπόθεση Οικογενειακή",
    "story.p1": "Το Funky Cow είναι ένα μικρό, οικογενειακό μαγαζί στην καρδιά της Νάουσας. Ερωτευτήκαμε το κλασικό αμερικάνικο diner — τα κόκκινα καθίσματα, τα καρό πατώματα, το τσιτσίρισμα στο πλατό — και αποφασίσαμε ότι η πόλη μας χρειαζόταν ένα δικό της.",
    "story.p2": "Το κρατάμε απλό: ποιοτικό μοσχάρι που πατιέται φρέσκο για κάθε παραγγελία, shakes με αληθινό παγωτό και ζεστό καλωσόρισμα για όποιον περάσει την πόρτα. Κάτσε στο σκαμπό — είσαι πια μέρος της οικογένειας.",
    "story.f1": "Φρέσκο στη στιγμή",
    "story.f2": "Αληθινό παγωτό",
    "story.f3": "Οικογενειακή συνταγή",

    "visit.title": "Έλα να μας δεις",
    "visit.where": "Πού",
    "visit.addr": "Νάουσα",
    "visit.map": "Άνοιγμα χάρτη",
    "visit.hours": "Ωράριο",
    "visit.d1": "Δευ – Πεμ",
    "visit.d2": "Παρ – Σαβ",
    "visit.d3": "Κυριακή",
    "visit.say": "Πες ένα γεια",
    "visit.dm": "Ερωτήσεις, μεγάλες παραγγελίες ή απλά ένα γεια; Στείλε μας DM.",

    "jobs.title": "Join the Funky Crew",
    "jobs.sub": "Ψάχνουμε άτομα! Έλα στην ομάδα μας.",
    "jobs.r1": "Κουζίνα / Grill",
    "jobs.r1d": "Προετοιμασία και στήσιμο burger",
    "jobs.r2": "Ταμείο / Εξυπηρέτηση",
    "jobs.r2d": "Συναρμολόγηση & συσκευασία",
    "jobs.note": "Εμπειρία στην κουζίνα επιθυμητή.",
    "jobs.cta": "Στείλε μας DM",

    "footer.made": "Οικογενειακή επιχείρηση στη Νάουσα",
  };

  const nodes = document.querySelectorAll("[data-i18n]");
  const en = {};
  nodes.forEach((n) => (en[n.dataset.i18n] = n.textContent.trim()));
  const dict = { en, el };

  const langBtn = document.querySelector(".lang-toggle");

  function setLang(lang) {
    nodes.forEach((n) => {
      const text = dict[lang][n.dataset.i18n];
      if (text) n.textContent = text;
    });
    document.documentElement.lang = lang;
    langBtn.querySelectorAll("[data-lang]").forEach((s) =>
      s.classList.toggle("active", s.dataset.lang === lang)
    );
    try { localStorage.setItem("fc-lang", lang); } catch (e) {}
  }

  langBtn.addEventListener("click", () =>
    setLang(document.documentElement.lang === "el" ? "en" : "el")
  );

  let saved = null;
  try { saved = localStorage.getItem("fc-lang"); } catch (e) {}
  const browserLang = (navigator.language || "").startsWith("el") ? "el" : "en";
  setLang(saved === "el" || saved === "en" ? saved : browserLang);
})();
