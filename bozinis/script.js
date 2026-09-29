// Bozinis Center — mobile nav + ΕΛ / EN language toggle.
// Greek is the page's default text; English strings live below.
(function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("open", !open);
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
    })
  );

  document.getElementById("year").textContent = new Date().getFullYear();

  const en = {
    "top.call": "Call us:",
    "nav.products": "Products",
    "nav.about": "About",
    "nav.stores": "Stores",
    "nav.contact": "Contact",
    "hero.eyebrow": "Kopanos, Imathia · 2 stores",
    "hero.l1": "Everything you need",
    "hero.l2": "for your home.",
    "hero.lead": "Plumbing, heating, solar water heaters, bathroom fixtures and tools — with honest advice for professionals and homeowners alike.",
    "hero.cta1": "See our products",
    "hero.cta2": "Find us",
    "strip.1": "Plumbing",
    "strip.2": "Heating",
    "strip.3": "Solar",
    "strip.4": "Bathroom",
    "strip.5": "Tools",
    "prod.kicker": "What you'll find",
    "prod.title": "Our products",
    "prod.sub": "From a single fitting to a complete heating installation — come in and we'll find it together.",
    "prod.c1": "Plumbing",
    "prod.c1d": "Pipes, fittings, valves, pumps, water filters and everything a proper installation needs.",
    "prod.c2": "Heating",
    "prod.c2d": "Boilers, radiators, circulators and spare parts for central and underfloor heating.",
    "prod.c3": "Solar water heaters",
    "prod.c3d": "Solar and electric water heaters, boilers and spare parts for hot water all year round.",
    "prod.c4": "Bathroom",
    "prod.c4d": "Basins, toilets, taps, shower enclosures, bathroom furniture and accessories.",
    "prod.c5": "Tools & hardware",
    "prod.c5d": "Hand and power tools, screws, brackets, adhesives and sealants.",
    "prod.c6": "Don't see it here?",
    "prod.c6d": "Just ask. If we don't have it, we'll order it for you.",
    "prod.c6b": "Call us",
    "about.kicker": "Family business",
    "about.title": "Your neighbour for every job around the house",
    "about.p1": "Bozinis Center serves Kopanos, Naousa and the surrounding villages from two stores with a wide range of plumbing, heating and bathroom products.",
    "about.p2": "Whether you're a plumber, an installer or fixing something yourself, you'll find the right materials and people who know what you need.",
    "about.f1": "Honest advice",
    "about.f1d": "We help you choose the right product for the job.",
    "about.f2": "For pros & homeowners",
    "about.f2d": "From a replacement tap to materials for an entire project.",
    "about.f3": "Two stores",
    "about.f3d": "Themistokleous 12 and Ermou 87, in Kopanos.",
    "stores.kicker": "Come visit",
    "stores.title": "Our stores",
    "stores.s1": "Main store",
    "stores.s1a": "Themistokleous 12",
    "stores.s2": "Second store",
    "stores.s2a": "Ermou 87",
    "stores.city": "Kopanos, Imathia, 590 35",
    "stores.map": "Get directions",
    "stores.hours": "Opening hours",
    "stores.d1": "Monday – Friday",
    "stores.d2": "Tue, Thu, Fri (afternoon)",
    "stores.d3": "Saturday",
    "stores.d4": "Sunday",
    "stores.closed": "Closed",
    "contact.title": "Have a question or need a quote?",
    "contact.sub": "Give us a call, send an email or message us on social media.",
    "contact.phone": "Phone",
    "footer.addr": "Themistokleous 12 & Ermou 87 · Kopanos, Imathia 590 35",
  };

  const nodes = document.querySelectorAll("[data-i18n]");
  const el = new Map();
  nodes.forEach((n) => el.set(n, n.textContent));

  const langBtn = document.querySelector(".lang-toggle");
  let lang = "el";
  try { lang = localStorage.getItem("bozinis-lang") || "el"; } catch (e) {}

  function apply(next) {
    lang = next;
    document.documentElement.lang = lang;
    nodes.forEach((n) => {
      const key = n.dataset.i18n;
      n.textContent = lang === "en" && en[key] ? en[key] : el.get(n);
    });
    langBtn.querySelectorAll("[data-lang]").forEach((s) =>
      s.classList.toggle("active", s.dataset.lang === lang)
    );
    try { localStorage.setItem("bozinis-lang", lang); } catch (e) {}
  }

  langBtn.addEventListener("click", () => apply(lang === "el" ? "en" : "el"));
  apply(lang);
})();
