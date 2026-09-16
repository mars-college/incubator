# QA Speed Run — Incubator Camp

Static site, no build step. Serve locally with `python3 -m http.server 8000` and run through the
phases below against `index.html`, `apply.html`, `el-nino.html`, `practitioners.html`,
`share.html`, `gallery.html`. Each phase should take a couple of minutes; the whole run is meant
to be fast, not exhaustive — for a deeper look, read the file itself.

---

## Phase 1: Every page loads clean

- [ ] Each of the 6 pages loads with no console errors
- [ ] No 404s in the network log for any image, font, or script
- [ ] The Google Fonts `<link>` resolves on every page

## Phase 2: Rebate & navigation

- [ ] The rebate nav is present and fixed full-height on every page that has one (all six —
      `gallery.html` has its own variant with a back-to-index link instead of numbers)
- [ ] On `index.html`, the numbered links 0–9 scroll to the correct sections
- [ ] The orange triangle indicator tracks the active section correctly while scrolling
- [ ] The bold vertical "Apply" link at the bottom of the rebate (`index.html`) links to
      `apply.html`
- [ ] At 375px width, the rebate never overlaps any other fixed element (companion, El Niño tag)

## Phase 3: Apply companion widget

- [ ] Appears on `index.html`, `el-nino.html`, `practitioners.html` — absent from `apply.html`
- [ ] Its label/message/CTA change correctly as you scroll through early/mid/late `data-stage`
      sections
- [ ] The dismiss (✕) hides it for the rest of that browser session (`sessionStorage`), and it
      reappears on a fresh page load
- [ ] At 375px width, the longest CTA ("Preview the application →") wraps to its own line inside
      the pill instead of running past the edge
- [ ] The companion never sits underneath the rebate strip at any width

## Phase 4: El Niño bug (`index.html` only)

- [ ] Visible bottom-right on desktop with full stats (Niño 3.4, Playa, Season)
- [ ] Collapses to a compact, label-only tag in the top-right below 820px width
- [ ] Links to `#p5`

## Phase 5: Motion budget — exhaustive, 6 entries

1. Hero sunrise, on load, once
2. Sunrise parallax, 4 layers at different rates, on scroll
3. Rebate triangle tracking scroll
4. Threshold lines resolving from blur (max twice per page)
5. CTA underline thickening on hover
6. The five codex diagrams (co-incubation, macrocosm/setting, in every direction, the chain we
   live on, one job for twelve weeks) settling ±24px as their section crosses the viewport center

- [ ] All six behave exactly as above, and nothing else on the site moves
- [ ] `prefers-reduced-motion: reduce` disables 1, 2, 4, and 6, and makes 3 instant
- [ ] `.art` (the faint decorative watermark behind sections 3/5/9) stays static at `opacity:.07`
      — this is deliberate. Do not amplify its opacity/weight and do not give it motion.

## Phase 6: Photography & attribution

- [ ] Hero CTA "Life on Mars gallery" and the photo strip between sections 2–3 (`index.html`)
      both link to `gallery.html` and show real photos, not placeholders
- [ ] `gallery.html`'s slideshow itself still plays/advances correctly
- [ ] The Kamau Zuberi Akabueze mini-gallery above section 6 (`index.html`) shows all 3 photos at
      full size — a 3-column grid on desktop, stacked full-width on mobile
- [ ] Kamau's inline portrait appears between "He is a father and a photographer." and "Why he is
      running this camp" in section 6
- [ ] `practitioners.html` seat 01 (Kamau) shows his real portrait, not the "pending" placeholder
- [ ] `practitioners.html` seat 02 (El Niño) shows the BBC graphic, with "Image :: BBC Online"
      credited in its metadata block
- [ ] **Licensing check (flagged, not yet resolved):** confirm rights to publish the BBC-branded
      El Niño graphic before this goes live publicly

## Phase 7: Section 08 — dues

- [ ] Facts table shows $300 (Mars College treasury) / $500 (shelter, if no RV) / $1,150
      (Incubator Camp dues), with "Pooled · equal · 3 installments" as the qualifier
- [ ] No stale "figure pending" language remains anywhere in that section

## Phase 8: Copy standing rules (spot check, not exhaustive)

- [ ] No contractions anywhere in shipped copy
- [ ] No forbidden register words leak anywhere: `HARRIS`, `HBA`, `VAPOR`, `STEAM`, `PING`,
      "thought event", "thought score", "temporal fossil", "afterimage", `BÏN`, `TÏME`,
      "typographical thought print"
- [ ] `apply.html` has no defensive negation ("not," "none," "nothing," "never," "no [x]") in
      applicant-facing copy

## Phase 9: Responsive pass

- [ ] Full scroll-through of `index.html` at 375px and at a desktop width, checking for
      horizontal overflow or any element collision
- [ ] Same pass on `el-nino.html` and `practitioners.html`

## Phase 10: Links

- [ ] Every internal cross-link between the six pages resolves (spot-check `apply.html`,
      `el-nino.html`, `practitioners.html`, `gallery.html` links from `index.html` and back)
- [ ] All four instances of the Neuroarts Fund link point to the same correct URL
- [ ] The Mars College Substack "learn more" links in `index.html`, `el-nino.html`, and
      `practitioners.html` resolve

---

## Sign-off

- [ ] All phases above pass
- [ ] Ready to hand to the Mars College Change Agent for deployment
