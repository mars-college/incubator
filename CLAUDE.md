# CLAUDE.md

Context for anyone — human or agent — picking this project up.

---

## What this is

**Incubator Camp** is a practitioner incubator at Mars College, an off-grid college built
every winter on a dry lake bed near Bombay Beach, California. Eight to twelve practitioners
spend nine months incubating a program in inner work, three of those months living in one
camp in the desert.

This repository is the camp's website, its application, and its delivery pipeline.

**Season:** Mars College semester, **January 11 – March 29, 2027** (confirmed against Mars
College's own materials — an earlier draft used March 28 throughout; that has been corrected
everywhere in shipped copy).

Build season in: December 1 – January 11. Build season out: April 1 – May 12. Both optional.

**Camp lead:** Kamau Zuberi Akabueze (KzA), founder of THE ÅLïEN SCõÖL, Mars '26 alum.

---

## Files

```
index.html           The camp. Ten positions, 0 through 9, single scroll.
apply.html           The application. Nine sections, live validation, local
                      draft-save, posts to Apps Script. WORKING AND TESTED LIVE.
el-nino.html          The El Niño briefing. Also the piece most likely to be forwarded.
practitioners.html    The panel, published as it fills.
share.html            The share portal. Screenshot-ready cards for social, organized into
                      labeled sections (jump nav, bottom-left) — Arrive, Is this you?, The
                      nine phases, El Niño, Who's building this, The numbers, Follow the
                      season, Cinematic. 4:5, 9:16, and a fixed 5:4 "cinematic" card type
                      built for LinkedIn, all snap-scrolled. Serves applicants pulling one
                      card for a post, and accepted practitioners/Martians returning to it
                      as a standing reference.
gallery.html          Cinematic slideshow for Mars '26 photography. Empty until
                      photos are added to /photos and listed in the PHOTOS array.
apps-script/          The application's delivery pipeline. Live and confirmed working.
budget/budget.xlsx    Season budget model, built from real Mars 2026 kitchen data.
```

---

## THREE STANDING RULES — do not break these

### 1. THE FULL LANGUAGE ACTION
Governs every word of public copy.
- **No contractions anywhere.** Rebuild the sentence rather than restoring one.
- **Every sentence reads as a first sentence.** Re-anchor the real noun instead of referring
  back with *it, this, that, there*.
- **Point at the reader** so a category description becomes a recognition.
- Use `::` where an em dash would otherwise go.

### 2. THE STRANGER TEST
Every sentence must land for someone who has never met the camp lead and has never been to
Mars. Compressed insider phrasing reads as depth to an insider and as a riddle to an
applicant, and a riddle at the invitation costs an application.

Read a sentence as a stranger. If the response is *huh*, rewrite. If the response is a
picture, ship it. Positions 0 through 3 stay plain; the esoteric register belongs in deeper
material, never at the door.

### 3. THE CARTRIDGE RULE
The design system runs on TTP (Typographical Thought Prints), an engine installed into the
site rather than a brand aesthetic applied to it. **No register name ever reaches a visitor**
— not in copy, not in alt text, not in a class name, not in a comment.

Never appears anywhere in this repository's user-facing output:
`HARRIS` · `HBA` · `VAPOR` · `STEAM` · `PING` · `thought event` · `thought score` ·
`temporal fossil` · `afterimage` · `BÏN` · `TÏME` · `typographical thought print`

A practitioner who never learns why the page feels coherent is the practitioner it worked on.

### And one more, from the author
> The power of the desert is the fantastic in the mundane.

Describe the ordinary act precisely and let the reader draw the conclusion. Never explain why
something matters to a reader with no context for the claim.

### Wording constraint on `apply.html` specifically
The application went through an explicit pass to remove defensive negation — no "not," "none,"
"nothing," "never," "no [x]" in copy addressed to the applicant. Frame absence as invitation
rather than deficiency ("still unwritten" not "not yet written"). Preserve this in any future
edit to that file's copy.

---

## Design tokens

```css
--ground: #0B0907;   /* warm near-black. always grained. sunrise: #F2ECE0 */
--bone:   #EDE8DE;   /* all primary type. sunrise: #211C15 */
--quiet:  #8A857B;   /* captions, rebate, metadata. sunrise: #6B6459 */
--time:   #E2622A;   /* accent. keep under 2% of any screen. sunrise: #A8431A */
--line:   rgba(237,232,222,.09);
--rule:   rgba(237,232,222,.16);
--surface: #1A1510;  /* floating overlays only (pop-ups, the companion bar). sunrise: #FBF7ED */
--shadow: rgba(0,0,0,.7);   /* sunrise: rgba(33,28,21,.18) */
--mist:   #C4BCAF;   /* masthead micro-caption. sunrise: same as --quiet */
```

Every page also declares `--ground-rgb`/`--bone-rgb`/`--time-rgb` (plain comma triplets) so
hand-written `rgba()` gradients, glows, and shadows can stay theme-aware
(`rgba(var(--time-rgb),.34)`) without `color-mix()`. SVG presentation attributes cannot resolve
`var()` reliably, so any themed SVG fill/stroke needs a CSS class or id selector instead (see the
`#glowStop0`/`#glowStop1` pattern on `index.html`'s first codex diagram).

**Sunrise / sunset theme.** `index.html`, `apply.html`, `el-nino.html`, and `practitioners.html`
carry a manual light/dark toggle (a bespoke sun/moon glyph living in the rebate, replacing the
decorative "∴" mark on `index.html` or added to a `.tail` wrapper alongside the existing back
link on the other three). It sets `data-theme="sunrise"` on `<html>`, persisted via
`localStorage` (`ic_theme`) so it survives page-to-page navigation, with a tiny anti-flash
script in `<head>` that applies the saved theme before first paint. Sunset (the values above) is
the default and unchanged from before this system existed. `gallery.html` and `share.html`
intentionally keep their fixed dark/cinematic treatment — their chrome composites against
photographs, not page background, so they are out of the toggle's scope.

**Type — four families, one job each**

| Face | Job |
|---|---|
| Bodoni Moda (upright, `opsz 34`, `wght 500-520`, `-webkit-text-stroke: .35px`) | Thresholds. Italic is reserved for exactly one instance sitewide — "Infinity" in the `index.html` hero ("Wake up to Infinity with wifi"); every other threshold, masthead, and accent use is upright. |
| Archivo 700/900 | Headings that name, and the declarations |
| Literata | All prose |
| IBM Plex Mono | Every dated or measured value, all metadata |

**Grain is not optional.** Black without grain reads as dark mode. Black with grain reads as
film. `opacity: .26`, `mix-blend-mode: soft-light`, fixed, full viewport.

**The signature is the film rebate** — the fixed left strip with the stock name running
vertically, frame numbers, and an orange triangle tracking scroll position. On `apply.html`,
the rebate numbers additionally carry a small orange dot once that section's required fields
are complete — the one place the rebate carries state beyond position.

**Pop-ups never tuck under the rebate or drift off-screen.** Floating elements (the "open
integrity observation" / "Steeping Space" glossary panel on `index.html`, the Apply companion
bar, the draft-restore bar on `apply.html`) use `--surface` instead of `--ground` so they read
as a layer above the page rather than camouflage. The glossary panel additionally runs a small
JS positioning routine on open (`index.html`'s main script) that clamps it against
`var(--rebate) + gutter` on the left and the viewport edge on the right/bottom, and on touch
devices it opens on tap with a visible close control and outside-tap/Escape dismissal instead of
relying on CSS-only `:hover`/`:focus-within`.

**Forbidden components:** cards, rounded corners above 2px, drop shadows, filled buttons, icon
sets, badges, pill tags, gradient overlays, hero video, stock photography, emoji.

**CSS Grid gotcha, hit and fixed twice already:** any `grid-template-columns` pairing a fixed
px value with a bare `1fr` that holds prose will let the `1fr` track collapse to the width of
its single longest word — every line breaks at one word. The fix is `minmax(0,1fr)` in place
of `1fr`. Every instance of this pattern in the live bundle has been corrected; use `minmax`
by default in any new grid that holds paragraph-length text.

**Motion budget — this list is exhaustive:**
1. Hero sunrise, on load, once.
2. Sunrise parallax on scroll, four layers at different rates.
3. Rebate triangle tracking scroll.
4. Threshold lines resolving from blur, twice per page at most.
5. CTA underline thickening on hover.
6. Codex diagrams (the five labeled infographics — co-incubation, macrocosm/setting, in every
   direction, the chain we live on, one job for twelve weeks) settle a few pixels as their own
   section passes the vertical center of the viewport. This is deliberately a different
   character of motion from #2: small (±24px), section-relative rather than page-scroll-relative,
   and each diagram's label is baked into its own SVG as `<text>`, so diagram and caption always
   move together as one fused unit — it cannot drift apart the way independently-transformed
   layers could.

`prefers-reduced-motion` disables 1, 2, 4, 6, and makes 3 instant.

Kept separate from this budget on purpose: `.art`, the faint decorative line-art watermark
behind the copy in sections 3, 5, and 9 (opacity `.07`, `z-index:0`, no motion, no scroll
interaction). It is texture, not a diagram — do not amplify its opacity/weight and do not give
it motion; that was tried once, broke section 5's legibility, and was reverted. The codex
diagrams above are the real, labeled infographics and are the only ones meant to carry visual
weight or motion.

---

## The application (`apply.html`) — current real behavior

- **Nine sections**, all radio-based choices (no native `<select>` — those silently ignore
  custom styling on macOS/iOS and were replaced site-wide after being caught in review).
- **Required fields are declared once**, in a `REQUIRED` array in the script, and drive three
  surfaces automatically: a per-section counter, an orange dot on the rebate number, and a
  summary line above the Send button. Add a field to that array and all three update.
- **Section 06 is sealed** — separate spreadsheet file, not a separate tab, because Sheets
  range-protection warns rather than hides. This is a structural guarantee, not a policy.
- **The "list me on the panel page" choice is a radio pair**, not two independent checkboxes —
  it was originally two checkboxes and could be left both-checked or both-unchecked; fixed to
  a proper mutually-exclusive group.
- **A local draft autosaves** to `localStorage` as the applicant types, including section 06.
  A restore banner appears on reload naming how long ago it was saved, with an explicit "Clear
  draft" control always visible near the rebate. Cleared automatically on a confirmed send.
  This reverses an earlier explicit design decision ("nothing is stored in your browser") —
  the decision was revisited deliberately; do not treat the old claim as still true anywhere.
- **Delivery is live**, via `apps-script/`. See that folder's `SETUP.md` for the working
  configuration, the one real bug already hit and fixed, and how to redeploy safely.

---

## Fund and external links

The Neuroarts Fund for Innerversal Health Practitioners is linked wherever it is mentioned —
`index.html` (twice), `apply.html`, `practitioners.html` — pointing at:
```
https://artizen.fund/index/mf/neuroarts-fund-for-innerversal-health-practitioners?season=7
```
One of these was caught pointing at the wrong URL entirely (`creativesteeping.com`, a leftover
from an earlier edit) and corrected. If the Fund's URL changes, all four instances need updating
together — there is no shared include for this link yet.

The Mars College "learn more" block — spliced into `index.html` position 2 and the footers of
`el-nino.html` and `practitioners.html`, marked by `<!-- LEARN MORE -->` HTML comments — is a
deliberately de-emphasized (dotted underline, quiet color, no orange) pointer straight out to
Mars College's own Substack, for readers wanting institution-level context beyond what a single
camp page should carry. It is not a separate file; there is no `learn-more.html` in this repo.

---

## What is done, and what is not

**Done and tested live:** all pages, the copy, the design system, the budget model, the full
application pipeline including both spreadsheet destinations and both emails.

**Still open:** nothing outstanding. The two items formerly tracked here are resolved:

1. **The dues figure** is published in section 08 (`index.html`): Mars College Treasury $300,
   shelter (if no RV) $500, Incubator Camp dues $1,150 — pooled, equal, three installments
   across the Fall and Winter.
2. **Photographs.** `gallery.html`'s `PHOTOS` array is populated — 62 captioned Mars '26 images
   are live there. What was actually missing was inbound links: nothing on the site pointed to
   `gallery.html`. `index.html` now links to it from the hero CTA row and from a small photo
   preview strip between positions 2 and 3.

**Future idea, not built yet:** a triple-tap on `index.html`'s "Wake Up To Infinity" headline as
a hidden gesture that opens `share.html` — a quiet access path for accepted practitioners rather
than a visible link. Worth building when there is a real need to distinguish that audience from
a first-time visitor.

`photos/qr/` holds the QR codes for `share.html`'s "Follow the season" cards (Mars College
Substack, The Listener's Path) — same drop-a-file-in mechanism as `photos/practitioners/`, see
that folder's own README.

**Installed and live, not just built:** the Apply companion (a state-aware nudge in the
left margin, reading `data-stage="early|mid|late"` attributes already present on every
section of `index.html`, `el-nino.html`, and `practitioners.html`) and the Mars College
"learn more" link (in `index.html` position 2, and the footers of the other two) are both
spliced directly into those three files. There is no separate include to maintain — if
their copy or behavior ever needs to change, edit it in place in each of the three pages;
the `<!-- APPLY COMPANION -->` and `<!-- LEARN MORE -->` HTML comments mark each block's
boundaries for exactly that purpose.

**Also fixed during that same pass:** `index.html`'s own Apply buttons (including the
rebate nav's "9" link) previously pointed at `#p9`, a section inside the same page that
only ever linked back to itself — a dead loop, not a path to the real application. And
`el-nino.html` / `practitioners.html` still referenced the pre-launch filename
`incubator-camp-v3.html` in their back-links and Apply CTAs. All of these now point at
the correct live files (`./apply.html`, `./index.html`).

---

## Working on this

Static files, no build step, no dependencies.

```
python3 -m http.server 8000
```

**Before shipping any change to copy, check all three standing rules above. Before shipping
any change to layout, check for the `1fr`-with-prose grid gotcha. Before shipping any change
to `apply.html`'s fields, update the `REQUIRED` array and reconcile the Apps Script header row
per `apps-script/SETUP.md`.**

---

*Growth is a process. Time is only the sparring partner.*
