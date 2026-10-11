/* Autumn Leaf: scroll, parallax and interaction layer.
   Depends on GSAP + ScrollTrigger + Lenis (loaded from CDN before this file). */
(() => {
  const doc = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const hasGsap = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  doc.classList.add("js");
  window.__alBooted = true;
  if (!hasGsap) {
    doc.classList.add("no-loader");
    const c = $(".curtain");
    if (c) c.remove();
    $$("[data-fade]").forEach((el) => { el.style.opacity = 1; el.style.transform = "none"; });
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "expo.out", duration: 1.2 });

  /* ---------- Smooth scroll ---------- */
  let lenis = null;
  if (!reduce && typeof window.Lenis !== "undefined") {
    lenis = new window.Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- Text splitting ---------- */
  function splitChars(el) {
    if (el.dataset.split) return $$(".char", el);
    el.dataset.split = "1";
    const nodes = [...el.childNodes];
    el.textContent = "";
    nodes.forEach((node) => {
      if (node.nodeType === 3) {
        node.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { el.append(" "); return; }
          const w = document.createElement("span");
          w.className = "word";
          [...part].forEach((ch) => {
            const c = document.createElement("span");
            c.className = "char";
            c.textContent = ch;
            w.append(c);
          });
          el.append(w);
        });
      } else {
        el.append(node);
      }
    });
    return $$(".char", el);
  }

  function splitWords(el) {
    if (el.dataset.split) return $$(".word", el);
    el.dataset.split = "1";
    const walk = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(" "); return; }
            const w = document.createElement("span");
            w.className = "word";
            w.textContent = part;
            frag.append(w);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1 && !child.classList.contains("word")) {
          if (child.classList.contains("brush")) { child.classList.add("word"); return; }
          walk(child);
        }
      });
    };
    walk(el);
    return $$(".word", el);
  }

  // Wrap each visual line in a mask so it can slide up from below.
  function splitLines(el) {
    if (el.dataset.lines) return $$(".line-inner", el);
    if (el.__orig === undefined) el.__orig = el.innerHTML;
    const words = splitWords(el);
    el.dataset.lines = "1";
    const lines = [];
    let lastTop = null;
    words.forEach((w) => {
      const top = Math.round(w.offsetTop);
      if (lastTop === null || Math.abs(top - lastTop) > 4) { lines.push([]); lastTop = top; }
      lines[lines.length - 1].push(w);
    });
    el.textContent = "";
    return lines.map((ws) => {
      const mask = document.createElement("span");
      mask.className = "line-mask";
      const inner = document.createElement("span");
      inner.className = "line-inner";
      ws.forEach((w, i) => { inner.append(w); if (i < ws.length - 1) inner.append(" "); });
      mask.append(inner);
      el.append(mask);
      return inner;
    });
  }

  /* ---------- Header ---------- */
  const header = $(".header");
  function initHeader() {
    if (!header) return;
    let last = 0;
    const onScroll = (y) => {
      const down = y > last && y > 160;
      if (!doc.classList.contains("menu-open")) header.classList.toggle("is-hidden", down);
      header.classList.toggle("is-solid", y > 40);
      last = y;
    };
    if (lenis) lenis.on("scroll", ({ scroll }) => onScroll(scroll));
    else window.addEventListener("scroll", () => onScroll(window.scrollY), { passive: true });

    // Sections that sit on dark backgrounds flip the header to white.
    $$("[data-header='light']").forEach((sec) => {
      ScrollTrigger.create({
        trigger: sec,
        start: "top top+=36",
        end: "bottom top+=36",
        onToggle: (self) => header.classList.toggle("is-light", self.isActive),
      });
    });

    const btn = $(".menu-btn");
    if (btn) {
      btn.addEventListener("click", () => {
        const open = !doc.classList.contains("menu-open");
        doc.classList.toggle("menu-open", open);
        btn.setAttribute("aria-expanded", String(open));
        btn.querySelector(".menu-btn__text").textContent = open ? "Close" : "Menu";
        header.classList.remove("is-hidden");
        if (lenis) open ? lenis.stop() : lenis.start();
        if (open) {
          gsap.fromTo(".menu__links a", { yPercent: 110 }, { yPercent: 0, stagger: 0.06, duration: 1.1, delay: 0.25 });
        }
      });
      $$(".menu a").forEach((a) => a.addEventListener("click", () => {
        doc.classList.remove("menu-open");
        btn.setAttribute("aria-expanded", "false");
        btn.querySelector(".menu-btn__text").textContent = "Menu";
        if (lenis) lenis.start();
      }));
    }
  }

  /* ---------- Johannesburg clock ---------- */
  function initClock() {
    const els = $$("[data-clock]");
    if (!els.length) return;
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Johannesburg" });
    const tick = () => els.forEach((el) => (el.textContent = `${fmt.format(new Date())} SAST`));
    tick();
    setInterval(tick, 15000);
  }

  /* ---------- Anchor links through Lenis ---------- */
  function initAnchors() {
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id.length < 2) return;
        const target = $(id);
        if (!target) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.6 });
        else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      });
    });
  }

  /* ---------- Page transitions ---------- */
  const curtain = $(".curtain");
  function initTransitions() {
    if (!curtain || reduce) return;
    $$("a[href]").forEach((a) => {
      const url = new URL(a.href, location.href);
      const internal = url.origin === location.origin && !a.target && !a.hasAttribute("download") && !a.href.startsWith("mailto:");
      const samePage = url.pathname === location.pathname && url.hash;
      if (!internal || samePage) return;
      a.addEventListener("click", (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        gsap.timeline({ onComplete: () => (location.href = a.href) })
          .set(curtain, { yPercent: 100 })
          .to(curtain, { yPercent: 0, duration: 0.8, ease: "expo.inOut" })
          .to(".curtain__cn", { opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.3");
      });
    });
    // Leaving via back/forward cache: reset the curtain.
    window.addEventListener("pageshow", (e) => { if (e.persisted) gsap.set(curtain, { yPercent: 100 }); });
  }

  function curtainOut() {
    if (!curtain) return Promise.resolve();
    if (reduce) { curtain.remove(); return Promise.resolve(); }
    gsap.set(curtain, { yPercent: 0 });
    gsap.set(".curtain__cn", { opacity: 1 });
    return new Promise((res) => {
      gsap.timeline({ onComplete: res })
        .to(".curtain__cn", { opacity: 0, duration: 0.3, ease: "power1.out" })
        .to(curtain, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "-=0.1");
    });
  }

  /* ---------- Loader (first visit per session, home only) ---------- */
  function runLoader() {
    const loader = $(".loader");
    let seen = false;
    try { seen = sessionStorage.getItem("al-loaded") === "1"; } catch (_) { /* storage blocked */ }
    if (!loader || reduce || seen) {
      if (loader) loader.remove();
      return curtainOut();
    }
    try { sessionStorage.setItem("al-loaded", "1"); } catch (_) { /* storage blocked */ }
    if (curtain) gsap.set(curtain, { yPercent: 100 });
    if (lenis) lenis.stop();
    const count = $(".loader__count", loader);
    const state = { v: 0 };
    return new Promise((res) => {
      gsap.timeline({
        onComplete: () => { loader.remove(); if (lenis) lenis.start(); res(); },
      })
        .to(".loader__cn span", { clipPath: "inset(0 0 0% 0)", duration: 1.4, stagger: 0.25, ease: "expo.inOut" })
        .to(".loader__bar i", { scaleX: 1, duration: 1.8, ease: "power2.inOut" }, 0.2)
        .to(state, {
          v: 100, duration: 1.8, ease: "power2.inOut",
          onUpdate: () => (count.textContent = String(Math.round(state.v)).padStart(3, "0")),
        }, 0.2)
        .to(".loader__inner", { yPercent: -30, opacity: 0, duration: 0.8, ease: "expo.in" }, "+=0.15")
        .to(loader, { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "expo.inOut" }, "-=0.35");
    });
  }

  /* ---------- Hero ---------- */
  function initHero() {
    const hero = $("[data-hero]");
    if (!hero) return null;
    const media = $(".hero__media", hero);
    const img = $(".hero__media img", hero);
    const left = $(".hero__word--l", hero);
    const right = $(".hero__word--r", hero);
    const cn = $(".hero__cn", hero);
    const foot = $(".hero__foot", hero);
    const statement = $(".hero__statement", hero);
    const chars = [...splitChars(left), ...splitChars(right)];
    const stmtLines = statement ? splitLines($("[data-lines]", statement)) : [];

    if (reduce) return () => {};

    gsap.set(chars, { yPercent: 110 });
    gsap.set(cn, { opacity: 0, y: 40 });
    gsap.set(foot.children, { opacity: 0, y: 16 });
    gsap.set(media, { "--t": "50%", "--b": "50%" });
    if (statement) { gsap.set(stmtLines, { yPercent: 110 }); gsap.set($(".label", statement), { opacity: 0 }); }

    const mobile = window.matchMedia("(max-width: 760px)").matches;
    const spread = mobile ? 0 : 1;

    const scrollTl = gsap.timeline({
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom bottom", scrub: 1 },
      defaults: { ease: "none" },
    });
    scrollTl
      .to(media, { "--t": "0%", "--r": "0%", "--b": "0%", "--l": "0%", "--rad": "0vw", duration: 1 }, 0)
      .to(img, { scale: 1, duration: 1 }, 0)
      .to(left, { xPercent: -60 * spread, yPercent: mobile ? -120 : 0, opacity: 0, duration: 0.7 }, 0)
      .to(right, { xPercent: 60 * spread, yPercent: mobile ? 120 : 0, opacity: 0, duration: 0.7 }, 0)
      .to(cn, { yPercent: -60, opacity: 0, duration: 0.6 }, 0.05)
      .to(foot, { opacity: 0, duration: 0.2 }, 0)
      .to(media, { "--shade": 1, duration: 0.4 }, 0.6);
    if (statement) {
      scrollTl
        .to($(".label", statement), { opacity: 0.8, duration: 0.15 }, 0.8)
        .to(stmtLines, { yPercent: 0, stagger: 0.05, duration: 0.3, ease: "power3.out" }, 0.8);
    }
    ScrollTrigger.create({
      trigger: hero, start: "top+=60% top", end: "bottom top+=36",
      onToggle: (self) => header && header.classList.toggle("is-light", self.isActive),
    });

    // Intro animation, played once the loader/curtain is out of the way.
    return () => {
      gsap.timeline()
        .to(media, { "--t": "22%", "--b": mobile ? "20%" : "12%", duration: 1.8, ease: "expo.inOut" }, 0)
        .to(chars, { yPercent: 0, stagger: 0.035, duration: 1.5 }, 0.45)
        .to(cn, { opacity: 1, y: 0, duration: 1.6 }, 0.9)
        .to(foot.children, { opacity: 1, y: 0, stagger: 0.08, duration: 1 }, 1.1);
    };
  }

  /* ---------- Parallax ---------- */
  function initParallax() {
    if (reduce) return;
    // Media drifting inside its frame
    $$("[data-parallax-media]").forEach((el) => {
      const amt = parseFloat(el.dataset.parallaxMedia) || 10;
      gsap.fromTo(el, { yPercent: -amt }, {
        yPercent: amt, ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
    // Whole elements moving at a different speed than the page
    $$("[data-speed]").forEach((el) => {
      const speed = parseFloat(el.dataset.speed);
      if (window.matchMedia("(max-width: 760px)").matches && !el.hasAttribute("data-speed-mobile")) return;
      gsap.to(el, {
        y: () => (1 - speed) * window.innerHeight * 0.5,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
      });
    });
    // Rotating elements
    $$("[data-rotate]").forEach((el) => {
      gsap.fromTo(el, { rotate: -parseFloat(el.dataset.rotate) }, {
        rotate: parseFloat(el.dataset.rotate), ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
    // Wave bands that drift sideways as you scroll
    $$("[data-drift]").forEach((el) => {
      const dir = parseFloat(el.dataset.drift) || 1;
      gsap.fromTo(el, { backgroundPositionX: 0 }, {
        backgroundPositionX: `${-dir * 400}px`, ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
    // Frames that open up as they enter
    $$("[data-clip]").forEach((el) => {
      gsap.fromTo(el, { clipPath: "inset(12% 8% 12% 8%)" }, {
        clipPath: "inset(0% 0% 0% 0%)", ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "top 35%", scrub: true },
      });
    });
  }

  /* ---------- Reveals ---------- */
  function initReveals() {
    $$("[data-lines]").forEach((el) => {
      if (el.closest("[data-hero]")) return;
      const lines = splitLines(el);
      if (reduce) return;
      gsap.set(lines, { yPercent: 110 });
      ScrollTrigger.create({
        trigger: el, start: "top 88%", once: true,
        onEnter: () => {
          el.__revealed = true;
          gsap.to($$(".line-inner", el), { yPercent: 0, stagger: 0.08, duration: 1.4 });
        },
      });
    });

    // Line breaks depend on width, so re-measure lines when the viewport width changes.
    let lastW = window.innerWidth;
    let t;
    window.addEventListener("resize", () => {
      clearTimeout(t);
      t = setTimeout(() => {
        if (window.innerWidth === lastW) return;
        lastW = window.innerWidth;
        $$("[data-lines]").forEach((el) => {
          if (el.closest("[data-hero]") || el.__orig === undefined) return;
          el.innerHTML = el.__orig;
          delete el.dataset.split;
          delete el.dataset.lines;
          const lines = splitLines(el);
          if (!reduce) gsap.set(lines, { yPercent: el.__revealed ? 0 : 110 });
        });
        ScrollTrigger.refresh();
      }, 200);
    });
    $$("[data-chars]").forEach((el) => {
      const chars = splitChars(el);
      if (reduce) return;
      gsap.set(chars, { yPercent: 110 });
      ScrollTrigger.create({
        trigger: el, start: "top 92%", once: true,
        onEnter: () => gsap.to(chars, { yPercent: 0, stagger: 0.025, duration: 1.4 }),
      });
    });
    $$("[data-fade]").forEach((el) => {
      if (reduce) return;
      ScrollTrigger.create({
        trigger: el, start: "top 92%", once: true,
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 1.4, delay: parseFloat(el.dataset.fade) || 0 }),
      });
    });
    // Words that light up as they pass through the viewport
    $$("[data-scrub-words]").forEach((el) => {
      const words = splitWords(el);
      if (reduce) return;
      gsap.fromTo(words, { opacity: 0.14 }, {
        opacity: 1, stagger: 0.1, ease: "none",
        scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
      });
    });
  }

  /* ---------- Horizontal principles ---------- */
  function initHorizontal() {
    const sec = $("[data-horizontal]");
    if (!sec || reduce) return;
    const track = $(".principles__track", sec);
    const pin = $(".principles__pin", sec);
    const bar = $(".principles__progress i", sec);
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: sec,
        pin,
        start: "top top",
        end: () => `+=${distance()}`,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => bar && gsap.set(bar, { scaleX: self.progress }),
      },
    });
    $$(".principle", sec).forEach((p) => {
      const cn = $(".principle__cn", p);
      if (!cn) return;
      gsap.fromTo(cn, { yPercent: 18, rotate: -6 }, {
        yPercent: -18, rotate: 4, ease: "none",
        scrollTrigger: { trigger: p, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
      });
    });
  }

  /* ---------- Marquee (scroll-velocity aware) ---------- */
  function initMarquee() {
    $$("[data-marquee]").forEach((mq) => {
      const track = $(".marquee__track", mq);
      const group = $(".marquee__group", track);
      track.append(group.cloneNode(true));
      if (reduce) return;
      let x = 0;
      let dir = 1;
      let boost = 0;
      const base = 0.6;
      if (lenis) lenis.on("scroll", ({ velocity }) => {
        if (velocity) dir = velocity > 0 ? 1 : -1;
        boost = Math.min(Math.abs(velocity) * 0.35, 14);
      });
      gsap.ticker.add(() => {
        const w = group.offsetWidth;
        x -= (base + boost) * dir;
        boost *= 0.92;
        if (x <= -w) x += w;
        if (x > 0) x -= w;
        track.style.transform = `translate3d(${x}px,0,0)`;
      });
    });
  }

  /* ---------- Work index: filters + floating preview ---------- */
  function initIndex() {
    const list = $(".index__list");
    if (!list) return;
    const rows = $$(".row", list);

    $$(".filter").forEach((btn) => {
      btn.addEventListener("click", () => {
        const f = btn.dataset.filter;
        $$(".filter").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
        rows.forEach((r) => {
          const show = f === "all" || r.dataset.cat.split(" ").includes(f);
          r.classList.toggle("is-filtered", !show);
        });
        if (!reduce) gsap.fromTo(rows.filter((r) => !r.classList.contains("is-filtered")), { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.04, duration: 0.8 });
        ScrollTrigger.refresh();
      });
    });

    const preview = $(".preview");
    if (!preview || !finePointer) return;
    const track = $(".preview__track", preview);
    const xTo = gsap.quickTo(preview, "x", { duration: 0.7, ease: "power3" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.7, ease: "power3" });
    const pw = () => preview.offsetWidth;
    const ph = () => preview.offsetHeight;
    window.addEventListener("pointermove", (e) => {
      xTo(e.clientX - pw() / 2);
      yTo(e.clientY - ph() / 2);
    });
    rows.forEach((r, i) => {
      r.addEventListener("pointerenter", () => {
        preview.classList.add("is-on");
        list.classList.add("is-hovering");
        track.style.transform = `translateY(${(-i * 100) / rows.length}%)`;
      });
      r.addEventListener("pointerleave", () => {
        preview.classList.remove("is-on");
        list.classList.remove("is-hovering");
      });
    });
  }

  /* ---------- Cursor ---------- */
  function initCursor() {
    const cursor = $(".cursor");
    if (!cursor || !finePointer || reduce) return;
    const label = $("span", cursor);
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power3" });
    window.addEventListener("pointermove", (e) => { xTo(e.clientX); yTo(e.clientY); });
    $$("[data-cursor]").forEach((el) => {
      el.addEventListener("pointerenter", () => {
        label.textContent = el.dataset.cursor;
        gsap.to(cursor, { scale: 1, duration: 0.6 });
      });
      el.addEventListener("pointerleave", () => gsap.to(cursor, { scale: 0, duration: 0.5 }));
    });
  }

  /* ---------- Footer parallax ---------- */
  function initFooter() {
    const inner = $(".footer__inner");
    if (!inner || reduce) return;
    gsap.fromTo(inner, { yPercent: -28 }, {
      yPercent: 0, ease: "none",
      scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom bottom", scrub: true },
    });
  }

  /* ---------- Videos play only while visible ---------- */
  function initVideos() {
    const vids = $$("video[data-autoplay]");
    if (!vids.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          if (target.preload === "none") target.preload = "auto";
          const p = target.play();
          if (p && p.catch) p.catch(() => {});
        } else {
          target.pause();
        }
      });
    }, { rootMargin: "200px 0px" });
    vids.forEach((v) => {
      v.muted = true;
      if (reduce) { v.removeAttribute("autoplay"); return; }
      io.observe(v);
    });
  }

  /* ---------- Contact form → composed email ---------- */
  function initContactForm() {
    const form = $("[data-contact-form]");
    if (!form) return;
    const status = $(".form-status", form);
    const btn = $('button[type="submit"]', form);
    const btnText = $(".pill__text", btn);
    const setErr = (name, msg) => {
      const input = form.elements[name];
      const err = $(`[data-error-for="${name}"]`, form);
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      if (err) err.textContent = msg || "";
    };
    const thanks = $("[data-thanks]");
    const showThanks = (name, email) => {
      if (!thanks) { status.textContent = "Thanks, your message has been sent. I’ll be in touch soon."; return; }
      $("[data-thanks-name]", thanks).textContent = name ? `, ${name.split(" ")[0]}` : "";
      $("[data-thanks-email]", thanks).textContent = email || "your inbox";
      form.hidden = true;
      thanks.hidden = false;
      thanks.focus({ preventScroll: true });
      if (lenis) lenis.scrollTo(thanks, { offset: -120, duration: 1.2 });
      if (!reduce) {
        gsap.fromTo(thanks, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2 });
        gsap.fromTo($(".c-thanks__cn", thanks), { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.6, delay: 0.2, ease: "expo.inOut" });
      }
    };
    if (thanks) {
      $("[data-thanks-reset]", thanks).addEventListener("click", () => {
        thanks.hidden = true;
        form.hidden = false;
        status.textContent = "";
        btnText.textContent = "Send message";
        btn.disabled = false;
        form.elements.name.focus();
      });
    }
    // Arriving back after a no-JavaScript submission
    if (new URLSearchParams(location.search).get("sent") === "1") showThanks("", "");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = form.elements.name.value.trim();
      const email = form.elements.email.value.trim();
      const message = form.elements.message.value.trim();
      const type = (form.querySelector('input[name="type"]:checked') || {}).value || "General";
      let ok = true;
      setErr("name", name ? "" : "Please add your name."); ok = ok && !!name;
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      setErr("email", emailOk ? "" : "Please add a valid email."); ok = ok && emailOk;
      setErr("message", message ? "" : "Tell me a little about the project."); ok = ok && !!message;
      if (!ok) { status.textContent = ""; return; }
      if (form.elements._honey && form.elements._honey.value) return; // bot

      btn.disabled = true;
      btn.setAttribute("aria-busy", "true");
      btnText.textContent = "Sending…";
      status.textContent = "";
      status.classList.remove("form-status--error");
      try {
        const res = await fetch(form.dataset.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            _subject: `${type} enquiry from ${name}`,
            _template: "table",
            _captcha: "false",
            _replyto: email,
            Name: name,
            Email: email,
            "Interested in": type,
            Message: message,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.success === false || data.success === "false") throw new Error(data.message || res.status);
        form.reset();
        form.querySelector('input[name="type"]').checked = true;
        showThanks(name, email);
      } catch (err) {
        console.warn("Contact form error:", err && err.message);
        btnText.textContent = "Send message";
        btn.disabled = false;
        const wa = form.dataset.whatsapp;
        const text = `Hi Andy, I’m ${name} (${email}). I’m interested in: ${type}.

${message}`;
        const link = document.createElement("a");
        link.href = `https://wa.me/${wa}?text=${encodeURIComponent(text)}`;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = `send me a WhatsApp on ${form.dataset.whatsappDisplay}`;
        status.classList.add("form-status--error");
        status.textContent = "Sorry, that didn’t send. Please ";
        status.append(link, " instead. Your message will be filled in for you.");
      } finally {
        btn.removeAttribute("aria-busy");
      }
    });
  }

  /* ---------- Project page intro ---------- */
  function initProjectIntro() {
    const title = $("[data-project-title]");
    if (!title || reduce) return () => {};
    const chars = splitChars(title);
    gsap.set(chars, { yPercent: 110 });
    return () => gsap.to(chars, { yPercent: 0, stagger: 0.025, duration: 1.5, delay: 0.1 });
  }

  /* ---------- Boot ---------- */
  const start = () => {
    initHeader();
    initClock();
    initAnchors();
    initTransitions();
    const playHero = initHero();
    const playProject = initProjectIntro();
    initParallax();
    initReveals();
    initHorizontal();
    initMarquee();
    initIndex();
    initCursor();
    initFooter();
    initVideos();
    initContactForm();

    runLoader().then(() => {
      if (playHero) playHero();
      if (playProject) playProject();
    });

    window.addEventListener("load", () => ScrollTrigger.refresh());
  };

  // Wait for webfonts so line splitting measures the real glyphs.
  const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  Promise.race([fontsReady, new Promise((r) => setTimeout(r, 2500))]).then(start);
})();
