# Changelog — Incubator Camp site

For the Mars College Change Agent: everything below was made in this local working copy.
This repo is not connected to the live deployment (`incubator.mars.college`), so these changes
need to be applied there separately. Where a change is CSS/HTML-only, the exact before/after is
included so it can be copied directly. Where new photo assets were added, the files themselves
also need to move to the deployed environment (paths are listed under **New assets**, below).

---

## 1. Mobile bottom-band overlap — rebate / El Niño bug / Apply companion

Full write-up already delivered separately: see `MOBILE-OVERLAP-FIX.md` at the repo root.
Summary: on phones, the rebate nav, the El Niño "on panel" bug, and the Apply companion nudge
were stacking on top of each other. Fixed in `index.html`, `el-nino.html`, `practitioners.html`.

## 2. Bold "Apply" link in the rebate ribbon

`index.html` — a new vertical text link, bold weight, `--time` orange, reading "Apply", added to
the bottom of the rebate nav (grouped with the existing "∴" mark in a new `.tail` wrapper so it
doesn't disturb the rebate's existing `space-between` layout). Links to `apply.html`. Same visual
idiom as the existing `.stock` vertical label — no new component.

## 3. Apply companion CTA overflow fix

`index.html`, `el-nino.html`, `practitioners.html` — the companion's `.pill` was a `flex` row
with no `flex-wrap`. On narrow phones, the longer CTA text ("Preview the application →") could
run past the visible edge instead of wrapping. Added `flex-wrap:wrap` to `#companion .pill` and
changed `.txt`'s flex-basis to `200px` in all three files, so the message takes its own line and
the CTA + dismiss button wrap to a second line when space is tight, rather than overflowing.

## 4. Line-art (`.art`) — amplified, then reverted

An earlier pass mistakenly amplified `.art` (the faint decorative watermark behind sections 3, 5,
and 9 — ellipses, curves, compass). This broke section 5's legibility, where the boosted curves
cut across the "Meet El Niño" heading. **Fully reverted** to the original `opacity:.07` and
original stroke-widths in all three spots (`index.html`, sections 3/5/9). `.art` should **not**
be amplified — it is intentionally a background texture, not a diagram. This is now documented
explicitly in `CLAUDE.md`.

## 5. Codex diagrams — amplified contrast + contained parallax

The real target of "give the infographics visceral presence" was the five labeled, content-
bearing diagrams (not `.art`): **Co-incubation**, **Macrocosm/Setting**, **In every direction**,
**The chain we live on**, **One job for twelve weeks**.

- **Contrast:** `.codex .ln` opacity `.32 → .5`, `.codex .dot` opacity `.5 → .68`, `.codex .fx`
  (orange accent) opacity `.75 → .85`. Changed in both `index.html` and `el-nino.html` (which
  shares the same CSS block for its own copy of "the chain we live on").
- **Motion — a new, 6th documented entry in the motion budget:** each of the five diagrams now
  "settles" a small amount (±24px, `translate3d`) as its own section crosses the vertical center
  of the viewport, via a `scroll` + `requestAnimationFrame` listener (same technique as the
  existing hero parallax), gated by `prefers-reduced-motion` the same way. This was prototyped
  live and checked for layout collisions at both desktop and mobile widths before being kept —
  each diagram's caption is baked into its own `<svg>` as `<text>`, so diagram and label always
  move together as one fused unit. Added to `index.html` (existing script block) and as a new
  small `<script>` at the end of `el-nino.html` (which had no prior motion script).
- `CLAUDE.md`'s motion-budget list now documents this as item 6, and separately calls out `.art`
  by name as the thing that should never get this treatment.

## 6. Gallery surfaced

`gallery.html` was fully built (62 real captioned Mars '26 photos) but had zero inbound links
from the rest of the site. Added:
- A third hero CTA in `index.html`: **"Life on Mars gallery"**, same style as the other two.
- A small photo preview strip (`.glimpse`) between sections 2 and 3 in `index.html`: a mono
  label, 5 bordered thumbnails (real files from `/photos`, linking to `gallery.html`), and a
  "See the full gallery →" link.
- `CLAUDE.md`'s "Still open" note (which incorrectly said the `PHOTOS` array was empty) is
  corrected.

## 7. Kamau Zuberi Akabueze — photography

Three separate placements, all using the photos placed by the camp lead:

- **`practitioners.html`, seat 01 (Kamau's own seat):** copied `photos/IMG_1751.JPG` to
  `photos/practitioners/kza.jpg`. That seat was already wired to expect that exact filename (per
  `photos/practitioners/README.md`), so no markup change was needed — the portrait now appears
  automatically.
- **`index.html`, section 6 bio:** `photos/IMG_1751.JPG` inserted as a floated portrait
  (`.kza-portrait`, 4:5 crop, thin border) directly between "He is a father and a photographer."
  and the "Why he is running this camp" heading. (This introduced a float-containment bug in the
  quote/diagram block below it — fixed with a standard clearfix, `.col::after{clear:both}`.)
- **`index.html`, mini-gallery above section 6:** a new `.glimpse.kza-gallery` block using all
  three photos from the `photos/Kamau Zuberi Akabueze/` folder (`KzA 01.PNG`, `KzA 02.JPG`,
  `KzA 03.JPG`). Initially sized as small thumbnails (matching the "Life on Mars" strip's
  pattern); **revised** after feedback that the surrounding space was disproportionate — now a
  large 3-column grid (`.kza-gallery .strip`, `aspect-ratio:4/3`, filling the section width),
  collapsing to a full-width single column on mobile. This is a distinct class from the "Life on
  Mars" strip, so that one is unaffected.

## 8. El Niño's practitioner portrait

`practitioners.html`, seat 02 (El Niño) — added `<img src="./photos/practitioners/
elnino_via_BBC.jpg">` to the previously-empty portrait box (a BBC News ocean-temperature
graphic, standing in for a "portrait" as part of the site's running personification of El Niño
as a guest panelist). Added a credit line to that seat's metadata block: **"Image :: BBC
Online"**, matching the existing `Project ::` / `Based ::` style.

**Flag for the Change Agent:** this graphic carries visible BBC branding. A credit line is good
practice but does not by itself establish reuse rights for a branded news graphic on a public
site — worth a licensing check before this goes live.

## 9. Section 08 — dues figures and copy

`index.html`, section 8 ("Investment"):
- Facts table: `Mars College treasury` → **$300**; `Shelter, if no vehicle` renamed to
  `Shelter, if no RV` → **$500**; `Incubator Camp dues` → **$1,150** with "Pooled · equal · 3
  installments" kept as a muted qualifier on the same line.
- Two paragraph edits (as given): "…paid in three installments across **the Fall and Winter**."
  and "**Everyone contributes the same camp dues and fees**, whether you come for one month or
  all three, as Incubator Camp participation is designed for your program's full season of
  growth." (minor punctuation added — a comma before "as Incubator Camp…", trailing period).
- **Additional consistency fix, not explicitly requested:** the Mars College Treasury paragraph
  still said "without a vehicle" and "we will publish the 2027 numbers here as soon as Mars
  confirms them" — both stale now that real figures exist. Changed to "without an RV" and "Mars
  sets both figures for 2027."
- `CLAUDE.md`'s "Still open" dues-figure item is resolved and now states the real numbers.

## 10. Final polish

- **Kamau's mini-gallery above section 6** (`index.html`) was revised again after feedback that
  the surrounding space was still disproportionate for only three small thumbnails: now a large
  3-column grid at `aspect-ratio:4/3`, filling the section's full content width (single column,
  full width, on mobile). This superseded the first revision described in item 7 above.
- **`.kza-portrait`** (`index.html`, section 6) changed from `float:right` to `float:left` —
  the portrait now sits flush against the left edge of the text column, with "Why he is running
  this camp" wrapping to its right.
- **El Niño's portrait box** (`practitioners.html`, seat 02) changed from the site-wide fixed
  4:5 portrait ratio to 5:4 (wider than tall), via a new `.portrait.wide{aspect-ratio:5/4;}`
  rule scoped to that one seat only — every other seat's portrait box is unaffected. This shows
  much more of the BBC graphic (both hemisphere labels and the "Source: NOAA" credit line, which
  the tighter 4:5 crop had pushed outside the frame).

**Note on verifying any of this:** `python -m http.server` sends no cache-control headers, so a
browser can silently serve a stale cached copy of a page on a normal refresh or re-visit, with no
error shown. If a change doesn't appear to have taken effect, hard-refresh (Ctrl+Shift+R /
Ctrl+F5) before assuming something is wrong — this was the actual cause of an apparent regression
partway through this session that turned out not to be one.

## 11. share.html becomes the share portal

`share.html` grew from a flat 10-card screenshot deck (~285 lines) into a ~640-line portal
organized into 8 labeled sections, reachable by a new bottom-left "Index" jump menu: **Arrive**,
**Is this you?**, **The nine phases**, **El Niño**, **Who's building this**, **The numbers**,
**Follow the season**, **Cinematic**. All 10 original cards are preserved (regrouped into their
new sections, none deleted) plus roughly 20 new cards pulling verbatim from real content already
in the repo — the nine named phases from `index.html`, the Apply-if/Wait-if ledger, the El Niño
NOAA stat and prep checklist from `el-nino.html`, the dues-transparency line and the actual
$300/$500/$1,150 figures, and the "Martians are ::" line from `MarsSubstackbyKzA.md`.

Three new card types:
- **`.card.photo`** — full-bleed photo background with a bottom scrim for text legibility. Used
  for the founder card (`photos/IMG_1751.JPG`) and the cinematic cards.
- **`.card.cine`** — fixed at `aspect-ratio:5/4` regardless of the page's global 4:5/9:16 toggle,
  for LinkedIn. Three cinematic cards ship, using existing repo photography (two of Kamau's
  photos, one gallery frame).
- **`.qr-slot`** — a bordered placeholder box holding an `<img onerror="this.remove()">` over a
  "QR · pending" fallback, exactly mirroring `photos/practitioners/README.md`'s portrait
  mechanism. Two subscribe cards use it: Mars College Substack and The Listener's Path
  (`tlp.beehiiv.com/subscribe`) — the actual QR images are expected at `photos/qr/substack.png`
  and `photos/qr/tlp.png`, to be supplied later; the page works correctly with or without them.

New `photos/qr/README.md` documents that convention, matching the existing practitioners-photo
one. `CLAUDE.md` updated to describe `share.html`'s new role, and to record a deferred idea (not
built this round): a triple-tap on `index.html`'s "Wake Up To Infinity" headline as a hidden
gesture into `share.html` for returning practitioners.

**One CSS bug caught during verification:** the jump-nav's list initially ignored its `hidden`
attribute, because `.jumplist{display:flex}` was declared unconditionally, which overrides the
browser's default `[hidden]{display:none}` at equal specificity. Fixed with
`.jumplist:not([hidden]){display:flex}`.

---

## New assets (need to be copied to the deployed environment too)

- `photos/Kamau Zuberi Akabueze/KzA 01.PNG`
- `photos/Kamau Zuberi Akabueze/KzA 02.JPG`
- `photos/Kamau Zuberi Akabueze/KzA 03.JPG`
- `photos/practitioners/kza.jpg` (copy of `photos/IMG_1751.JPG`)
- `photos/practitioners/elnino_via_BBC.jpg`
- `photos/qr/` — folder created with a README; `substack.png` and `tlp.png` still need to be
  supplied (placeholders show cleanly until then)

`photos/IMG_1751.JPG` itself already existed in the repo before this session.

## Files touched

`index.html`, `el-nino.html`, `practitioners.html`, `share.html`, `CLAUDE.md`, plus the new
assets above and `photos/qr/README.md`. `apply.html` and `gallery.html` were not modified.

## Verification performed

Manual pass in a local browser preview at both desktop and mobile (375px) widths for every item
above: no console errors, no broken image requests (checked via network log), no layout overlap
at either breakpoint, `prefers-reduced-motion` gates the new parallax the same way it gates the
existing hero parallax, and all new links (gallery CTAs, rebate Apply link) resolve correctly.

For item 11 (`share.html`), screenshots confirmed correct rendering for a representative card of
each new type — a plain text card, the facts-table dues card, the QR-placeholder follow card —
plus DOM-level checks (computed styles, bounding rects) confirming the cinematic cards hold
exactly `5/4` regardless of toggle state and that all three photo backgrounds load. The preview
tool itself became visually unreliable deep into this unusually long page (~38,000px total
scroll height) after repeated screenshots in one tab — fresh tabs rendered correctly every time,
so this reads as a tool-side rendering/screenshot artifact at that page length rather than a
site bug, but it was not independently confirmed on a real phone or desktop browser. Worth a
direct look in an ordinary browser before treating `share.html` as fully verified end-to-end.

**Known, separate, pre-existing issue (not introduced by this work, not fixed):** in at least one
browser preview tool used during this session, `index.html`'s `.art` SVGs (which extend past the
right edge of their section via negative offsets) caused that specific tool to compute a wider
internal layout than the real device width on narrow screens. This did not reproduce on
`el-nino.html` or `practitioners.html` (neither has `.art`), and the user's own device screenshots
throughout this session showed normal, correctly-scaled rendering — so this is most likely a
quirk of that specific preview tool rather than a real cross-browser bug, but it wasn't
independently confirmed on a real phone and is worth a quick check if anyone ever sees odd
horizontal scroll on `index.html` specifically.
