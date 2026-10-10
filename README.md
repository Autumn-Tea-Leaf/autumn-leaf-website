# Autumn Leaf 秋叶

Portfolio site for Autumn Leaf Design Studio (Andy Ou). Plain static HTML/CSS/JS. It needs no build tools to host.

- **Fonts:** Montserrat, Courier New and Liu Jian Mao Cao, the same as the original site and the playbook.
- **Colours:** the playbook palette (`#546A7B`, `#E8EBEE`, `#FFFFFF`, `#DDE1E5`, `#CCA24A`), set as tokens in `css/main.css`.
- **Motion:** GSAP and ScrollTrigger handle the parallax, pinning and reveals. Lenis provides the smooth scroll. Both are stored in `js/vendor/` and load from the site itself, along with the fonts in `assets/fonts/`, so no outside services are contacted. Motion is turned off for visitors who have "reduce motion" switched on.

## Editing projects

All 12 projects are defined in the `PROJECTS` array in `build.mjs`. That covers each project's title, copy, credits, Behance link and images. After editing, regenerate the pages:

```bash
node build.mjs
```

This rewrites `index.html`, `contact.html`, `privacy.html`, `404.html`, `work/*.html`, `sitemap.xml` and `CNAME`. It also writes redirect pages for the old URLs (`artwork1–4.html`, `error.html`).

New images go in `assets/work/<slug>/`, saved as `.webp` with a maximum width of about 1800px. Short loops go in the same folder as `.mp4`, each with a `-poster.webp` still. To give a new image width and height attributes, add its size to `assets/dims.json`.

## Hosting

Upload the folder's contents to the existing GitHub Pages repo, replacing the old files. The `CNAME` file keeps `autumnleafdesigns.co.za` pointed at the site.
