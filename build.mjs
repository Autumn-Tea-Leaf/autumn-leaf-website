// Autumn Leaf: static site generator.
// Run `node build.mjs` after editing projects below; it writes every .html file.
// Links use clean URLs (/contact, /work/petali); GitHub Pages serves the matching .html file.
// No dependencies. Output is plain HTML that GitHub Pages can serve as-is.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const SITE = "https://autumnleafdesigns.co.za";
const EMAIL = "autumnleafdesignstudio@gmail.com";
// Contact form submissions are emailed here through FormSubmit (formsubmit.co).
const FORM_TO = "andy.ou987@gmail.com";
const dims = existsSync("assets/dims.json") ? JSON.parse(readFileSync("assets/dims.json", "utf8")) : {};

const SOCIAL = [
  ["Behance", "https://www.behance.net/AutumnLeafDesigns"],
  ["LinkedIn", "https://www.linkedin.com/in/andy-ou-0578042a1/"],
  ["Instagram", "https://www.instagram.com/autumnleafdesign/"],
];

const CATS = {
  branding: "Branding",
  digital: "Web & UX",
  motion: "Motion",
  "3d": "3D & AR",
  image: "Image",
};

// Gallery helpers: img("petali/02") → assets/work/petali/02.webp, vid("petali/01") → mp4 + poster
const img = (p, alt = "") => ({ type: "image", src: `assets/work/${p}.webp`, alt });
const vid = (p, alt = "") => ({ type: "video", src: `assets/work/${p}.mp4`, poster: `assets/work/${p}-poster.webp`, alt });

const PROJECTS = [
  {
    slug: "petali",
    title: "Petali",
    kind: "Botanical soda",
    year: 2025,
    disciplines: ["Branding", "Packaging", "Motion"],
    cats: ["branding", "motion"],
    credits: "Andy Ou, Abhay Badrinath",
    tools: "Illustrator, Photoshop, After Effects",
    behance: "https://www.behance.net/gallery/236708053/PETALI-Soda-Branding-Product-Design",
    intro: "Petali: the calm that carries weight. A conceptual botanical soda brand exploring soft strength: a grounded confidence that doesn’t need to be loud to be felt.",
    body: "The project spans branding, packaging and visual identity, chasing elegance, freshness and modern minimalism. Every flavour and detail was tuned for balance and quiet clarity, proof that lightness can still hold power.",
    cover: vid("petali/01", "Petali Bloomed Citrus can surrounded by flowers and clouds"),
    thumb: "assets/work/petali/01-poster.webp",
    gallery: [
      img("petali/02", "Petali brand presentation board"),
      img("petali/03", "Petali coasters and can details"),
      vid("petali/04", "Three Petali cans in peach, apple and citrus"),
      img("petali/05", "Petali six-pack and billboard mockups"),
      vid("petali/06", "Petali lifestyle campaign"),
      img("petali/07", "The calm that carries weight, campaign portraits"),
    ],
  },
  {
    slug: "zukae",
    title: "Zukae",
    kind: "Instant noodles",
    year: 2025,
    disciplines: ["Branding", "Packaging"],
    cats: ["branding", "motion"],
    credits: "Andy Ou, Abhay Badrinath",
    tools: "Photoshop, Illustrator, After Effects",
    behance: "https://www.behance.net/gallery/236834783/ZukaeInstant-NoodlesBrandingProduct-Design",
    intro: "Zukae is a brutalist-inspired instant noodle concept built on contrast, silence and hunger. Restraint, then release.",
    body: "Stark design, flash photography and heavy visual minimalism carry raw emotion. “Silence is heavy. Hunger breaks you.” Each visual explores the tension between control and chaos, turning a cup of noodles into a symbol of craving, pressure and power.",
    cover: vid("zukae/01", "Zukae wordmark over a black-and-white cityscape"),
    thumb: "assets/work/zukae/01-poster.webp",
    gallery: [
      img("zukae/02", "Zukae brand guidelines board"),
      vid("zukae/03", "Zukae typography"),
      img("zukae/04", "Zukae packaging mockups"),
      vid("zukae/05", "Zukae social media design"),
      img("zukae/06", "Zukae product mockups"),
    ],
  },
  {
    slug: "yoko",
    title: "Yokō",
    kind: "Matcha café",
    year: 2025,
    disciplines: ["Brand identity", "Packaging"],
    cats: ["branding"],
    credits: "Andy Ou, Abhay Badrinath",
    tools: "Illustrator, Photoshop",
    behance: "https://www.behance.net/gallery/234054963/Yoko-Matcha-Cafe-Brand-Identity",
    intro: "YOKŌ is a premium ceremonial-grade matcha brand that embodies quiet refinement and timeless tradition.",
    body: "Rooted in Japanese heritage yet designed for the modern world, the identity balances minimal elegance with cultural depth. From the gold-accented canister to the poetic kanji, every detail reflects stillness, presence and enduring craft.",
    cover: img("yoko/05", "Yokō logo applied across green matcha imagery"),
    thumb: "assets/work/yoko/05.webp",
    gallery: [
      img("yoko/01", "Yokō visual identity board"),
      vid("yoko/02", "Yokō colour palette"),
      img("yoko/03", "Yokō business cards and canister"),
      vid("yoko/04", "Yokō mountain motif"),
      img("yoko/05", "Yokō logo applications"),
      img("yoko/06", "Yokō packaging and merchandise"),
    ],
  },
  {
    slug: "atelier-c",
    title: "Atelier C",
    kind: "Artisan chocolate",
    year: 2025,
    disciplines: ["Visual identity", "Packaging"],
    cats: ["branding", "motion"],
    credits: "Andy Ou, Abhay Badrinath",
    tools: "Photoshop, Illustrator, After Effects",
    behance: "https://www.behance.net/gallery/232870449/Atelier-C-Visual-Identity",
    intro: "Atelier C is a premium chocolate brand: bold, modern flavours alongside timeless classics.",
    body: "Hand-drawn illustrations and refined details bring personality to every bar and box. From vibrant slabs to artisanal milk and dark chocolate, the identity blends luxury, craft and approachability for a memorable presence on the shelf and in the hand.",
    cover: img("atelier-c/03", "Atelier C storefront with illuminated sign"),
    thumb: "assets/work/atelier-c/03.webp",
    gallery: [
      vid("atelier-c/01", "Atelier C animated logo with chocolates"),
      img("atelier-c/02", "Atelier C concept and brief"),
      img("atelier-c/04", "Atelier C logo suite"),
      vid("atelier-c/05", "Atelier C logo animation"),
      img("atelier-c/06", "Atelier C typography"),
      img("atelier-c/07", "Atelier C packaging"),
      img("atelier-c/08", "Atelier C boxes"),
      vid("atelier-c/09", "Atelier C motion study"),
      img("atelier-c/10", "Atelier C chocolate bar wrappers"),
      img("atelier-c/11", "Atelier C tote bag"),
      img("atelier-c/12", "Atelier C business cards"),
    ],
  },
  {
    slug: "manini-selection",
    title: "Manini Selection",
    kind: "Wine & art e-commerce",
    year: 2025,
    disciplines: ["Web design", "Development", "E-commerce"],
    cats: ["digital"],
    client: "Manini Selection",
    tools: "WordPress, Divi",
    live: "https://www.maniniselection.com",
    intro: "Manini Selection brings wine and art together. Every bottle carries the work of a South African artist.",
    body: "I built the site for the client in 2025 as a home for the whole brand: the story behind it, profiles of each featured artist, events, the Art & Wine Club, and shops for both wine and art. A dark, gallery-like frame with warm gold and playful geometric accents keeps the artwork at the centre, and every page works just as well on a phone.",
    cover: img("manini/01", "Manini Selection homepage: guests with wine glasses in a gallery, Welcome to Manini"),
    thumb: "assets/work/manini/01.webp",
    gallery: [
      img("manini/02", "About Manini section with a couple sharing wine"),
      img("manini/03", "The Manini values, spelled out letter by letter"),
      img("manini/04", "Meet the Artist carousel featuring Restone Maambo"),
      img("manini/05", "Our Brand Story page"),
      img("manini/06", "Artist profile page for Thokozani Mthiyane"),
      img("manini/07", "Art & Wine Club page"),
      img("manini/08", "Wine shop: Our Exclusive Selections"),
      img("manini/09", "Manini Selection on mobile, three screens"),
    ],
  },
  {
    slug: "discord-ad",
    title: "Discord Ad",
    kind: "Animated spot",
    year: 2024,
    disciplines: ["Motion", "Advertising"],
    cats: ["motion"],
    behance: "https://www.behance.net/gallery/213510029/Discord-Ad",
    intro: "An animated spot for Discord that highlights the platform’s engaging, slightly addictive nature.",
    body: "Hand-drawn frames and smooth timing capture Discord’s playful environment and the community it builds, showing simply how it brings people together in a fun and interactive way.",
    cover: { type: "image", src: "assets/work/discord-ad/cover.webp", alt: "Frame from the Discord animated ad" },
    thumb: "assets/work/discord-ad/cover.webp",
    gallery: [
      { type: "film", src: "assets/video/discord-ad.mp4", poster: "assets/work/discord-ad/cover.webp", alt: "Discord ad, full film" },
      img("discord-ad/01", "Discord ad objective, idea and scamps"),
    ],
  },
  {
    slug: "true-threads",
    title: "True Threads",
    kind: "Awareness website",
    year: 2024,
    disciplines: ["Web design", "UX/UI"],
    cats: ["digital"],
    behance: "https://www.behance.net/gallery/213504505/Website-design",
    intro: "True Threads sheds light on the hidden cost of fast fashion.",
    body: "A clean, intuitive site leads visitors through the realities of sweatshop labour, told through “Steve,” a fictional but relatable worker. A world map pinpoints the global impact, and the journey closes by pointing people towards sustainable brands. Storytelling that moves from awareness to action.",
    cover: img("true-threads/01", "True Threads website design"),
    coverPosition: "top",
    thumb: "assets/work/true-threads/01.webp",
    gallery: [img("true-threads/01", "True Threads full page design")],
  },
  {
    slug: "ar-zen-garden",
    title: "AR Zen Garden",
    kind: "Augmented reality",
    year: 2024,
    disciplines: ["AR", "3D"],
    cats: ["3d", "digital"],
    tools: "Echo3D",
    behance: "https://www.behance.net/gallery/213355207/AR-Experience",
    intro: "An augmented-reality Zen garden that brings tranquility into any space.",
    body: "A central tree anchors raked sand and carefully placed stones, symbols of harmony and order, while soft ambient music completes the calm. Built for Echo3D, it invites anyone to step into a customisable virtual retreat, Zen principles meeting modern technology.",
    cover: { type: "image", src: "assets/work/ar-zen-garden/cover.webp", alt: "3D Zen garden with a bonsai tree and raked sand" },
    coverFit: "contain",
    thumb: "assets/work/ar-zen-garden/cover.webp",
    gallery: [img("ar-zen-garden/01", "AR Zen Garden poster with QR code")],
  },
  {
    slug: "3d-modeling",
    title: "Wonder Cave",
    kind: "3D environment",
    year: 2024,
    disciplines: ["3D modelling", "Lighting"],
    cats: ["3d"],
    behance: "https://www.behance.net/gallery/213355039/3D-Modeling",
    intro: "An ancient cave of dark, monolithic walls and still, reflective water.",
    body: "At its centre a spear rests on a pedestal, ringed by geometric rock formations that hint at a forgotten civilisation. Careful lighting and texture do the storytelling: a scene built for a fantasy campaign, inviting exploration.",
    cover: { type: "video", src: "assets/work/3d-modeling/comp.mp4", poster: "assets/work/3d-modeling/render.webp", alt: "Wonder Cave fly-through: the camera pushes in between rock columns towards the floating stone" },
    thumb: "assets/work/3d-modeling/cover.webp",
    gallery: [
      img("3d-modeling/render", "Wonder Cave render: a shattered stone floating above a spear on a pedestal, between dark rock columns"),
      img("3d-modeling/cover", "Wonder Cave render, portrait view with reflections in still water"),
    ],
  },
  {
    slug: "photography",
    title: "Photography",
    kind: "Editorial & film stills",
    year: 2024,
    disciplines: ["Photography", "Poster design"],
    cats: ["image"],
    behance: "https://www.behance.net/gallery/213354881/Photography",
    intro: "Photography that leans cinematic: quiet light, long shadows and frames that feel like a film is about to start.",
    body: "The series moves from a fashion portrait, bold lip prints set against the calm of the outdoors, to two film-poster studies. Huánghūn 黄昏 looks over a city at dusk, “the hour when the city forgets you.” Far From Here 遠方 is a film about distance, where every arrow points somewhere else. An empty cinema closes the set.",
    cover: img("photography/huanghun", "Huánghūn 黄昏: a city at dusk seen from a mountain, red title text"),
    thumb: "assets/work/photography/cover.webp",
    gallery: [
      img("photography/far-from-here", "Far From Here 遠方: signpost pointing to Beijing, Moscow and Amsterdam"),
      img("photography/cover", "Model in a green sweater with a lip-print patch, outdoors"),
      img("photography/cinema", "Empty cinema seats beneath a glowing wall light and an exit sign"),
    ],
  },
  {
    slug: "vega",
    title: "Vega",
    kind: "Character animation",
    year: 2024,
    disciplines: ["Animation", "Character design"],
    cats: ["motion"],
    credits: "Andy Ou, Tatyana Banda",
    tools: "Illustrator",
    behance: "https://www.behance.net/gallery/213351675/Vega-Animation",
    intro: "A 2D character animation made for TikTok.",
    body: "The work runs from objective and big idea through storyboard to character design, exploring both a realistic and a simplified version of the character before it moves.",
    cover: img("vega/01", "Vega animation objective and idea board"),
    coverPosition: "top",
    thumb: "assets/work/vega/01.webp",
    gallery: [
      { type: "embed", src: "https://www-ccv.adobe.io/v1/player/ccv/LUkRcA5C8PS/embed?api_key=behance1&bgcolor=%23191919", alt: "Vega animation" },
      img("vega/01", "Vega objective, big idea and solution"),
      img("vega/02", "Vega storyboard and character design"),
    ],
  },
  {
    slug: "autumn-leaf-web",
    title: "Autumn Leaf Web",
    kind: "Personal brand site",
    year: 2024,
    disciplines: ["Web design", "UX/UI"],
    cats: ["digital"],
    behance: "https://www.behance.net/gallery/207237707/Autumn-Leaf-Website-Design",
    intro: "The first Autumn Leaf website, a personal brand shaped by heritage.",
    body: "A childhood museum visit with my father left me with a lasting love of porcelain. The site carries its classic blue and white into a modern, minimal layout: old-world motifs, contemporary structure, and an experience built to feel simple and joyful.",
    cover: img("autumn-leaf-web/01", "Autumn Leaf website on a laptop beside porcelain vases"),
    thumb: "assets/work/autumn-leaf-web/01.webp",
    gallery: [
      img("autumn-leaf-web/02", "Autumn Leaf website on laptops"),
      img("autumn-leaf-web/03", "Autumn Leaf website mockup"),
      img("autumn-leaf-web/04", "Autumn Leaf website mockup"),
      img("autumn-leaf-web/05", "Autumn Leaf homepage design"),
      img("autumn-leaf-web/06", "Autumn Leaf project page design"),
      img("autumn-leaf-web/07", "Autumn Leaf contact page design"),
      img("autumn-leaf-web/08", "Autumn Leaf 404 page design"),
    ],
  },
  {
    slug: "i-love-you",
    title: "I Love You",
    titleCn: "我爱你",
    kind: "Illustration",
    year: 2024,
    disciplines: ["Illustration"],
    cats: ["image"],
    behance: "https://www.behance.net/gallery/195194713/I-love-you",
    intro: "我爱你: an illustration pairing red camellias with sweeping ink brushwork.",
    body: "",
    cover: { type: "image", src: "assets/work/i-love-you/cover.webp", alt: "Red camellias over black brushstrokes on teal, with 我爱你" },
    thumb: "assets/work/i-love-you/cover.webp",
    gallery: [img("i-love-you/01", "I Love You illustration")],
  },
];

const FEATURED = ["petali", "yoko", "atelier-c", "zukae"];

/* ---------------- helpers ---------------- */
let onHomePage = false;
const home = () => (onHomePage ? "" : "/"); // "#work" on the home page, "/#work" elsewhere
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const wh = (src) => (dims[src] ? ` width="${dims[src][0]}" height="${dims[src][1]}"` : "");
const pad = (n) => String(n).padStart(2, "0");
const bySlug = Object.fromEntries(PROJECTS.map((p) => [p.slug, p]));

function media(m, base, { parallax = 0, eager = false, style = "" } = {}) {
  const px = parallax ? ` data-parallax-media="${parallax}"` : "";
  const st = style ? ` style="${style}"` : "";
  if (m.type === "video") {
    return `<video${px}${st} src="${base}${m.src}" poster="${base}${m.poster}"${wh(m.src)} muted loop playsinline preload="none" data-autoplay aria-label="${esc(m.alt)}"></video>`;
  }
  return `<img${px}${st} src="${base}${m.src}"${wh(m.src)} alt="${esc(m.alt)}" loading="${eager ? "eager" : "lazy"}" decoding="async">`;
}

/* ---------------- shared chrome ---------------- */
function head({ title, desc, base, path, image = "assets/brand/porcelain.webp" }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#e8ebee">
<link rel="canonical" href="${SITE}/${path}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${SITE}/${path}">
<meta property="og:image" content="${SITE}/${image}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="${base}assets/brand/favicon.png">
<link rel="preload" href="${base}assets/fonts/montserrat-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${base}assets/fonts/fonts.css">
<link rel="stylesheet" href="${base}css/main.css">
<script>
  document.documentElement.classList.add("js");
  setTimeout(function () { if (!window.__alBooted) document.documentElement.classList.remove("js"); }, 5000);
</script>
</head>`;
}

function header(base, current) {
  const nav = [
    ["Work", `${home()}#work`, "work"],
    ["About", `${home()}#about`, "about"],
    ["Contact", "/contact", "contact"],
  ];
  const roll = (label) => `<span>${label}</span><span aria-hidden="true">${label}</span>`;
  return `
<a class="label" href="#main" style="position:absolute;left:-9999px">Skip to content</a>
<header class="header">
  <a class="header__brand" href="/" aria-label="Autumn Leaf home">
    <span class="header__mark"><img class="mark-dark" src="${base}assets/brand/mark.webp" alt="" width="30" height="39"><img class="mark-light" src="${base}assets/brand/mark-white.webp" alt="" width="30" height="39"></span>
    <span class="header__name">Autumn Leaf<span class="brush">秋叶</span></span>
  </a>
  <div class="header__meta label">
    <span>Digital design studio</span>
    <span>Johannesburg <span class="header__time" data-clock></span></span>
  </div>
  <nav class="header__nav label" aria-label="Primary">
    ${nav.map(([l, h, k]) => `<a class="link-roll" href="${h}"${current === k ? ' aria-current="page"' : ""}>${roll(l)}</a>`).join("\n    ")}
  </nav>
  <button class="menu-btn label" aria-expanded="false" aria-controls="menu"><span class="menu-btn__text">Menu</span><span class="menu-btn__lines" aria-hidden="true"></span></button>
</header>
<div class="menu" id="menu">
  <span class="menu__cn brush" aria-hidden="true">秋叶</span>
  <nav class="menu__links" aria-label="Mobile">
    ${nav.map(([l, h], i) => `<span class="line-mask"><a href="${h}">${l}<sup>0${i + 1}</sup></a></span>`).join("\n    ")}
  </nav>
  <div class="menu__foot label">
    <a href="mailto:${EMAIL}">${EMAIL}</a>
    <span data-clock></span>
  </div>
</div>
<div class="curtain" aria-hidden="true"><span class="curtain__cn brush">秋叶</span></div>
<div class="cursor" aria-hidden="true"><span>View</span></div>`;
}

function footer(base, label = "(05) Contact", onContact = false) {
  return `
<div class="wave-band" aria-hidden="true" data-drift style="background-image:url('${base}assets/brand/seigaiha.webp')"></div>
<footer class="footer" data-header="light">
  <div class="footer__waves" aria-hidden="true" data-drift="-1" style="background-image:url('${base}assets/brand/seigaiha-white.webp')"></div>
  <div class="footer__inner">
    <div class="footer__cta">
      <span class="label">${label}</span>
      <h2 class="footer__big" data-lines>Find your peace. Let’s design something calm <span class="brush">静</span></h2>
      ${onContact ? "" : `<a class="pill pill--light footer__btn" href="/contact">Start a project <span class="arrow">→</span></a>`}
    </div>
    <div class="footer__cols">
      <div class="footer__col">
        <span class="label">Sitemap</span>
        <a class="link-roll" href="${home()}#work"><span>Work</span><span aria-hidden="true">Work</span></a>
        <a class="link-roll" href="${home()}#about"><span>About</span><span aria-hidden="true">About</span></a>
        <a class="link-roll" href="/contact"><span>Contact</span><span aria-hidden="true">Contact</span></a>
      </div>
      <div class="footer__col">
        <span class="label">Social</span>
        ${SOCIAL.map(([l, h]) => `<a class="link-roll" href="${h}" target="_blank" rel="noopener"><span>${l}</span><span aria-hidden="true">${l}</span></a>`).join("\n        ")}
      </div>
      <div class="footer__col">
        <span class="label">Studio</span>
        <span>Johannesburg</span>
        <span>South Africa</span>
        <span class="label" data-clock></span>
      </div>
      <div class="footer__col">
        <span class="label">Status</span>
        <span>Available for freelance</span>
        <span>Branding, packaging, web, motion</span>
      </div>
    </div>
    <div class="footer__wordmark" aria-hidden="true"><span>Autumn Leaf</span><span class="brush">秋叶</span></div>
    <div class="footer__base label">
      <span>© ${new Date().getFullYear()} Autumn Leaf Design Studio</span>
      <span>All work belongs to Andy Ou and credited collaborators</span>
      <a href="/privacy" class="link-roll"><span>Privacy</span><span aria-hidden="true">Privacy</span></a>
      <a href="#main" class="link-roll"><span>Back to top ↑</span><span aria-hidden="true">Back to top ↑</span></a>
    </div>
  </div>
</footer>`;
}

const scripts = (base) => `
<script src="${base}js/vendor/gsap.min.js"></script>
<script src="${base}js/vendor/ScrollTrigger.min.js"></script>
<script src="${base}js/vendor/lenis.min.js"></script>
<script src="${base}js/main.js"></script>`;

/* ---------------- pages ---------------- */
function indexPage() {
  const base = "";
  const featured = FEATURED.map((s, i) => {
    const p = bySlug[s];
    const speeds = ["1", "0.86", "1", "0.9"];
    return `
      <a class="card" href="/work/${p.slug}" data-cursor="View" data-speed="${speeds[i]}">
        <div class="card__frame" data-clip>
          <div class="card__media-scale">${media(p.cover, base, { parallax: 10 })}</div>
        </div>
        <div class="card__meta">
          <span class="card__index label">${pad(i + 1)}</span>
          <div>
            <h3 class="card__title">${esc(p.title)}</h3>
            <span class="card__tags label">${p.disciplines.join(" · ")}</span>
          </div>
          <span class="card__year label">${p.year}</span>
        </div>
      </a>`;
  }).join("");

  const counts = Object.fromEntries(Object.keys(CATS).map((c) => [c, PROJECTS.filter((p) => p.cats.includes(c)).length]));
  const filters = [`<button class="filter" data-filter="all" aria-pressed="true">All<sup>${PROJECTS.length}</sup></button>`]
    .concat(Object.entries(CATS).map(([k, l]) => `<button class="filter" data-filter="${k}" aria-pressed="false">${l}<sup>${counts[k]}</sup></button>`))
    .join("\n          ");

  const rows = PROJECTS.map((p, i) => `
          <a class="row" href="/work/${p.slug}" data-cat="${p.cats.join(" ")}">
            <span class="row__thumb"><img src="${p.thumb}" alt="" loading="lazy"></span>
            <span class="row__no label">${pad(i + 1)}</span>
            <span class="row__title">${esc(p.title)}</span>
            <span class="row__disc label">${p.disciplines.join(" · ")}</span>
            <span class="row__collab label">${esc(p.kind)}</span>
            <span class="row__year label">${p.year}</span>
          </a>`).join("");

  const previews = PROJECTS.map((p) => `<img src="${p.thumb}" alt="" loading="lazy">`).join("");

  const principles = [
    ["和", "Harmony", "Balanced design, where form follows function in quiet agreement."],
    ["静", "Tranquil", "Calm that doesn’t need to be loud to be felt."],
    ["永", "Timeless", "Rooted in enduring values, not fleeting trends."],
    ["宁", "Serene", "Simple beauty that leaves room for reflection."],
  ];

  return `${head({
    title: "Autumn Leaf | Digital Design Studio by Andy Ou",
    desc: "Autumn Leaf (秋叶) is the studio of Andy Ou, a digital designer in Johannesburg crafting calm, timeless brands, packaging, websites and motion inspired by Chinese porcelain.",
    base, path: "",
  })}
<body>
<div class="loader" aria-hidden="true">
  <div class="loader__inner">
    <div class="loader__cn brush"><span>秋</span><span>叶</span></div>
    <div class="loader__bar"><i></i></div>
    <span class="loader__count label">000</span>
  </div>
</div>
${header(base, "")}
<main id="main">

  <section class="hero" data-hero aria-label="Autumn Leaf">
    <div class="hero__sticky">
      <div class="hero__media"><img src="assets/brand/porcelain.webp"${wh("assets/brand/porcelain.webp")} alt="" fetchpriority="high"></div>
      <h1 class="hero__title display"><span class="hero__word hero__word--l">Autumn</span><span class="hero__word hero__word--r">Leaf</span></h1>
      <span class="hero__cn brush" aria-hidden="true">秋叶</span>
      <div class="hero__foot label">
        <span>Digital design studio<br>by Andy Ou, Johannesburg</span>
        <span>Brand · Packaging · Web · Motion</span>
        <span class="hero__scroll">Scroll <i aria-hidden="true"></i></span>
      </div>
      <div class="hero__statement">
        <span class="label">(秋叶) Autumn Leaf</span>
        <p data-lines>Designing calm in a chaotic world.</p>
      </div>
    </div>
  </section>

  <section class="intro section wrap" id="intro">
    <div class="grid intro__grid">
      <span class="intro__label label label--muted">(00) Hello</span>
      <p class="intro__text" data-scrub-words>I’m Andy Ou. Through <em>Autumn Leaf</em> <span class="brush">秋叶</span> I design brands, packaging, websites and motion with the quiet restraint of blue-and-white porcelain. Simple, intentional, made to last.</p>
      <div class="intro__aside" data-fade>
        <p>Inspired by the timeless elegance of Chinese vases and pottery, every project starts from one belief: true beauty is simple, yet profound.</p>
        <span class="label label--muted">● Available for freelance</span>
      </div>
      <div class="intro__cta" data-fade="0.1"><a class="pill" href="#work">See the work <span class="arrow">→</span></a></div>
    </div>
  </section>

  <section class="featured section wrap" id="work">
    <div class="section-head">
      <span class="label label--muted">(01) Selected work</span>
      <h2 class="h2" data-lines>Quiet work, made with intent.</h2>
    </div>
    <div class="grid featured__list">${featured}
    </div>
  </section>

  <section class="principles" data-horizontal data-header="light" aria-label="Principles">
    <div class="principles__pin">
      <div class="principles__top label">
        <span>(02) Principles</span>
        <span class="principles__progress" aria-hidden="true"><i></i></span>
        <span>和 · 静 · 永 · 宁</span>
      </div>
      <div class="principles__track">
        <div class="principle principle--intro">
          <h2 class="h2">Designing calm in a chaotic world <span class="brush">。</span></h2>
          <p class="principle__line">What the work does, and what it refuses to do. No noise, no excess, nothing trendy for its own sake.</p>
        </div>
        ${principles.map(([cn, w, l], i) => `
        <div class="principle">
          <span class="principle__cn brush" aria-hidden="true">${cn}</span>
          <div>
            <span class="principle__no label">${pad(i + 1)} / 04</span>
            <h3 class="principle__word">${w}</h3>
            <p class="principle__line">${l}</p>
          </div>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <section class="index section wrap" id="index">
    <div class="section-head">
      <span class="label label--muted">(03) Index</span>
      <h2 class="h2" data-lines>Every project, in one place.</h2>
    </div>
    <div class="index__filters" role="group" aria-label="Filter projects">
          ${filters}
    </div>
    <div class="index__head label">
      <span class="row__no">No.</span><span class="row__title">Project</span><span class="row__disc">Discipline</span><span class="row__collab">Type</span><span class="row__year">Year</span>
    </div>
    <div class="index__list">${rows}
    </div>
  </section>
  <div class="preview" aria-hidden="true"><div class="preview__track" style="display:flex;flex-direction:column;height:${PROJECTS.length * 100}%">${previews.replace(/<img /g, '<img style="height:' + (100 / PROJECTS.length) + '%" ')}</div></div>

  <section class="about section wrap" id="about">
    <div class="section-head">
      <span class="label label--muted">(04) About</span>
      <h2 class="h2" data-lines>Rooted in porcelain <span class="brush">瓷</span></h2>
    </div>
    <div class="grid about__grid">
      <div class="about__visual" data-speed="0.92">
        <div class="about__frame about__frame--portrait"><picture><source media="(max-width: 760px)" srcset="assets/brand/andy-portrait-mobile.webp" width="900" height="1350"><img src="assets/brand/andy-portrait.webp"${wh("assets/brand/andy-portrait.webp")} alt="Andy Ou holding a camera, with 秋叶 brushed in blue beside him" loading="lazy"></picture></div>
        <div class="about__film" data-speed="0.82"><video src="assets/brand/logo-animation.mp4" poster="assets/brand/logo-animation-poster.webp" width="1280" height="720" muted loop playsinline preload="none" data-autoplay aria-label="Autumn Leaf logo animation: the leaf mark blooms out of ink"></video></div>
        <span class="about__caption label label--muted">Andy Ou, founder of Autumn Leaf</span>
      </div>
      <div class="about__body">
        <div class="about__copy">
          <p class="lede" data-lines>I’m Andy Ou, a digital designer of Chinese heritage based in Johannesburg. Autumn Leaf is my studio, a place where tradition shapes modern living.</p>
          <p data-fade>Years ago my father walked me through a museum of porcelain. The blue-and-white glaze, the calm confidence of a vase that needs no ornament. It never left me.</p>
          <p data-fade="0.1">Today that feeling guides every brief: muted tones, organic forms and refined craft, applied to identities, packaging, interfaces and motion that stay calm while the world gets louder.</p>
        </div>
        <ul class="services" data-fade>
          <li><span class="label">01</span><span>Brand identity</span><span class="mono">Logo · System · Guidelines</span></li>
          <li><span class="label">02</span><span>Packaging</span><span class="mono">Product · Print</span></li>
          <li><span class="label">03</span><span>Web &amp; UX/UI</span><span class="mono">Sites · Interfaces</span></li>
          <li><span class="label">04</span><span>Motion &amp; animation</span><span class="mono">Ads · Characters</span></li>
          <li><span class="label">05</span><span>3D &amp; AR</span><span class="mono">Modelling · Experiences</span></li>
          <li><span class="label">06</span><span>Photography &amp; illustration</span><span class="mono">Editorial · Art</span></li>
        </ul>
        <blockquote class="quote" data-fade>“To create timeless elegance with modern simplicity.”<cite class="label label--muted">The Autumn Leaf promise</cite></blockquote>
      </div>
    </div>
  </section>

  <section class="marquee" data-marquee aria-label="Find your peace. Explore serenity in every design">
    <div class="marquee__track" aria-hidden="true">
      <div class="marquee__group"><span>Find your peace</span><span class="dot"></span><span class="brush">秋叶</span><span class="dot"></span><span>Explore serenity in every design</span><span class="dot"></span></div>
    </div>
  </section>
</main>
${footer(base)}
${scripts(base)}
</body>
</html>
`;
}

function projectPage(p, i) {
  const base = "../";
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const coverStyle = [p.coverPosition ? `object-position:${p.coverPosition}` : "", p.coverFit ? `object-fit:${p.coverFit};background:var(--c-white)` : ""].filter(Boolean).join(";");
  const meta = [
    ["Year", p.year],
    ["Discipline", p.disciplines.join(", ")],
    ["Type", p.kind],
    p.credits ? ["Credits", p.credits] : null,
    p.tools ? ["Tools", p.tools] : null,
    p.client ? ["Client", p.client] : null,
    p.live ? ["Live site", `<a href="${p.live}" target="_blank" rel="noopener">${p.live.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")} ↗</a>`] : null,
    p.behance ? ["Behance", `<a href="${p.behance}" target="_blank" rel="noopener">View the case study ↗</a>`] : null,
  ].filter(Boolean);

  const gallery = p.gallery.map((m) => {
    if (m.type === "embed") {
      return `<figure class="is-embed" data-fade><iframe src="${m.src}" title="${esc(m.alt)}" loading="lazy" allow="autoplay; fullscreen" allowfullscreen></iframe></figure>`;
    }
    if (m.type === "film") {
      return `<figure data-fade><video src="${base}${m.src}" poster="${base}${m.poster}"${wh(m.src)} controls playsinline preload="metadata" aria-label="${esc(m.alt)}"></video></figure>`;
    }
    const d = dims[m.src];
    const portrait = d && d[1] > d[0] && d[1] / d[0] < 2;
    return `<figure${portrait ? ' class="is-portrait"' : ""} data-fade>${media(m, base)}</figure>`;
  }).join("\n    ");

  return `${head({
    title: `${p.title} | ${p.disciplines.join(", ")} | Autumn Leaf`,
    desc: `${p.intro} A ${p.year} project by Andy Ou / Autumn Leaf.`,
    base, path: `work/${p.slug}`, image: p.thumb,
  })}
<body>
${header(base, "work")}
<main id="main">
  <section class="p-hero">
    <div class="p-hero__top label">
      <a class="p-hero__back link-roll" href="/#index"><span>← All work</span><span aria-hidden="true">← All work</span></a>
      <span class="label--muted">${pad(i + 1)} / ${pad(PROJECTS.length)}</span>
    </div>
    <h1 class="p-hero__title display" data-project-title>${esc(p.title)}${p.titleCn ? ` <span class="brush">${p.titleCn}</span>` : ""}</h1>
    <div class="grid p-hero__info">
      <div class="p-hero__desc">
        <p class="lede" data-lines>${esc(p.intro)}</p>
        ${p.body ? `<p data-fade style="margin-top:24px;color:var(--c-ink-soft);max-width:60ch">${esc(p.body)}</p>` : ""}
      </div>
      <dl class="p-meta" data-fade="0.1">
        ${meta.map(([k, v]) => `<div><dt class="label">${k}</dt><dd>${typeof v === "string" && v.startsWith("<a") ? v : esc(v)}</dd></div>`).join("\n        ")}
      </dl>
    </div>
  </section>
  <div class="p-cover">${media(p.cover, base, { parallax: 10, eager: true, style: coverStyle })}</div>
  <section class="p-gallery" aria-label="Project images">
    ${gallery}
    <div class="p-gallery__note label">
      <span>${esc(p.title)}, ${p.year}</span>
      ${(() => { const [href, text] = p.live ? [p.live, "Visit the live site ↗"] : [p.behance, "Full case study on Behance ↗"]; return `<a class="link-roll" href="${href}" target="_blank" rel="noopener"><span>${text}</span><span aria-hidden="true">${text}</span></a>`; })()}
    </div>
  </section>
  <a class="p-next" href="/work/${next.slug}" data-cursor="Next">
    <div class="p-next__label label"><span>Next project</span><span>${pad(((i + 1) % PROJECTS.length) + 1)} / ${pad(PROJECTS.length)}</span></div>
    <h2 class="p-next__title display" data-chars>${esc(next.title)}</h2>
    <div class="p-next__media"><img src="${base}${next.thumb}" alt="" loading="lazy"></div>
  </a>
</main>
${footer(base, "(秋叶) Contact")}
${scripts(base)}
</body>
</html>
`;
}

function contactPage() {
  const base = "";
  const types = ["Brand identity", "Packaging", "Website", "Motion", "Something else"];
  return `${head({
    title: "Contact | Autumn Leaf",
    desc: "Start a project with Autumn Leaf. Brand identity, packaging, websites and motion by Andy Ou, Johannesburg.",
    base, path: "contact",
  })}
<body>
${header(base, "contact")}
<main id="main" class="c-page">
  <span class="label label--muted">(秋叶) Contact</span>
  <h1 class="c-page__title display" data-lines>Get in touch for a project <span class="brush">秋叶</span></h1>
  <div class="grid c-grid">
    <form class="c-form" data-contact-form novalidate method="POST" action="https://formsubmit.co/${FORM_TO}" data-endpoint="https://formsubmit.co/ajax/${FORM_TO}">
      <input type="hidden" name="_subject" value="New enquiry from autumnleafdesigns.co.za">
      <input type="hidden" name="_template" value="table">
      <input type="hidden" name="_captcha" value="false">
      <input type="hidden" name="_next" value="${SITE}/contact?sent=1">
      <input type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">
      <div class="field">
        <span class="label">I’m interested in</span>
        <div class="chips">
          ${types.map((t, i) => `<input type="radio" name="type" id="type-${i}" value="${t}"${i === 0 ? " checked" : ""}><label for="type-${i}">${t}</label>`).join("\n          ")}
        </div>
      </div>
      <div class="field">
        <label class="label" for="f-name">Your name</label>
        <input id="f-name" name="name" type="text" autocomplete="name" required>
        <span class="field__error" data-error-for="name"></span>
      </div>
      <div class="field">
        <label class="label" for="f-email">Email</label>
        <input id="f-email" name="email" type="email" autocomplete="email" required>
        <span class="field__error" data-error-for="email"></span>
      </div>
      <div class="field">
        <label class="label" for="f-message">Tell me about the project</label>
        <textarea id="f-message" name="message" required></textarea>
        <span class="field__error" data-error-for="message"></span>
      </div>
      <button class="pill" type="submit"><span class="pill__text">Send message</span> <span class="arrow">→</span></button>
      <p class="form-status" role="status" aria-live="polite"></p>
    </form>
    <dl class="c-aside" data-fade>
      <div><dt class="label">Email</dt><dd><a href="mailto:${EMAIL}">${EMAIL}</a></dd></div>
      <div><dt class="label">Based in</dt><dd>Johannesburg, South Africa</dd></div>
      <div><dt class="label">Local time</dt><dd data-clock></dd></div>
      <div><dt class="label">Elsewhere</dt><dd>${SOCIAL.map(([l, h]) => `<a href="${h}" target="_blank" rel="noopener">${l}</a>`).join(" · ")}</dd></div>
    </dl>
  </div>
</main>
${footer(base, "(秋叶) Or just say hi", true)}
${scripts(base)}
</body>
</html>
`;
}

function privacyPage() {
  const base = "";
  const updated = "11 October 2026";
  const sections = [
    ["Who I am", `This site belongs to Andy Ou, trading as Autumn Leaf Design Studio, based in Johannesburg, South Africa. For anything about your personal information, email <a href="mailto:${EMAIL}">${EMAIL}</a>.`],
    ["What this site collects", "Nothing in the background. There are no cookies, no analytics and no advertising trackers. Fonts and scripts are served from this site rather than from outside services. Like every website, the hosting provider (GitHub Pages) briefly logs technical details such as IP addresses to keep the service secure."],
    ["Browser storage", "The site saves one small note in your browser so the intro animation only plays once per visit. It is not a cookie, it is never sent anywhere, and it clears itself when you close the tab."],
    ["The contact form", "When you send the contact form, your name, email address, the type of project and your message are emailed to me through FormSubmit (formsubmit.co), a service that forwards form messages to my inbox. Nothing is stored on this site itself."],
    ["When you email me", "I receive your name, email address and whatever you choose to write. I use it only to reply and to work with you on your project. I never sell it or share it for marketing. I keep our emails for as long as we are working together and afterwards only as long as I need them for my records, and I will delete them sooner if you ask."],
    ["Third-party content", "The Vega project page includes a video player from Adobe (Behance), which may set its own cookies when it loads. Links to Behance, LinkedIn and Instagram take you to sites with their own privacy policies."],
    ["Your rights", `Under South Africa’s Protection of Personal Information Act (POPIA) you can ask to see the information I hold about you, have it corrected, or have it deleted. Just email me. If you are unhappy with how your information was handled, you can contact the <a href="https://inforegulator.org.za" target="_blank" rel="noopener">Information Regulator</a>.`],
    ["Copyright", "All projects, photographs, illustrations, animations and designs on this site belong to Andy Ou and, where credited, his collaborators. Please ask before using any of them."],
  ];
  return `${head({ title: "Privacy | Autumn Leaf", desc: "How Autumn Leaf handles your information. Short version: the site collects nothing, and emails are only used to reply.", base, path: "privacy" })}
<body>
${header(base, "")}
<main id="main" class="c-page legal">
  <span class="label label--muted">(秋叶) Privacy</span>
  <h1 class="c-page__title display" data-lines>Privacy notice</h1>
  <div class="grid legal__grid">
    <p class="legal__intro lede">The short version: this site doesn’t track you. If you send the contact form or email me, I only use your details to reply.</p>
    <span class="legal__updated label label--muted">Last updated ${updated}</span>
    <div class="legal__body">
      ${sections.map(([h, t], i) => `<section class="legal__item" data-fade><span class="label">${pad(i + 1)}</span><div><h2>${h}</h2><p>${t}</p></div></section>`).join("\n      ")}
    </div>
  </div>
</main>
${footer(base, "(秋叶) Questions?")}
${scripts(base)}
</body>
</html>
`;
}

function notFoundPage() {
  // Absolute paths so the 404 works from any URL depth on GitHub Pages.
  const base = "/";
  return `${head({ title: "Page not found | Autumn Leaf", desc: "This page drifted away like an autumn leaf.", base, path: "404.html" })}
<body>
${header(base, "")}
<main id="main" class="nf">
  <div>
    <div class="nf__cn brush" aria-hidden="true">叶</div>
    <span class="label label--muted">404</span>
    <h1>This page drifted away.</h1>
    <p>Like a leaf in autumn, it’s not where it used to be.</p>
    <a class="pill" href="/">Back home <span class="arrow">→</span></a>
  </div>
</main>
${scripts(base)}
</body>
</html>
`;
}

// Old artwork URLs from the previous site keep working.
const redirect = (to) => `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Autumn Leaf</title><meta http-equiv="refresh" content="0; url=${to}"><link rel="canonical" href="${SITE}${to}"></head><body><a href="${to}">Continue to Autumn Leaf</a></body></html>\n`;

/* ---------------- write ---------------- */
mkdirSync("work", { recursive: true });
onHomePage = true;
writeFileSync("index.html", indexPage());
onHomePage = false;
writeFileSync("contact.html", contactPage());
writeFileSync("404.html", notFoundPage());
writeFileSync("privacy.html", privacyPage());
PROJECTS.forEach((p, i) => writeFileSync(`work/${p.slug}.html`, projectPage(p, i)));
writeFileSync("artwork1.html", redirect("/work/photography"));
writeFileSync("artwork2.html", redirect("/work/3d-modeling"));
writeFileSync("artwork3.html", redirect("/work/discord-ad"));
writeFileSync("artwork4.html", redirect("/work/ar-zen-garden"));
writeFileSync("error.html", redirect("/"));
writeFileSync("CNAME", "autumnleafdesigns.co.za\n");
writeFileSync(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${["", "contact", "privacy", ...PROJECTS.map((p) => `work/${p.slug}`)].map((u) => `  <url><loc>${SITE}/${u}</loc></url>`).join("\n")}\n</urlset>\n`
);
console.log(`Built index, contact, 404 and ${PROJECTS.length} project pages.`);
