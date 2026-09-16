# share.html — format guide

How the card system works, so a new idea can be added without re-deriving the CSS. Pairs with
`SHARE-COPY.md` (the copy itself) and `CLAUDE.md` (the site-wide rules this still has to obey).

---

## The shape of one card

Every card is the same two-element skeleton:

```html
<div class="slide"><div class="card">
  <div class="grain" aria-hidden="true"></div>
  <div class="guides" aria-hidden="true"><i class="t"></i><i class="b"></i><span class="t">safe</span><span class="b">safe</span></div>
  <div class="eyebrow">Small label at top</div>
  <!-- body goes here -->
  <div class="mark"><span>Incubator Camp</span><span class="dots">∴</span><span>Mars College</span></div>
</div></div>
```

`.slide` is the full-viewport scroll-snap wrapper — one per card, never edited. `.card` is the
actual rectangle, sized by the format toggle at top (4:5 / 9:16). `.grain`, `.guides`, and
`.mark` are furniture every card carries; copy them exactly, only the body between `.eyebrow`
and `.mark` changes.

To add a **new section**, give its first card's `.slide` an `id="s-whatever"` and add a matching
`<a href="#s-whatever">Section name</a>` inside `#jn-list` near the top of the file. That is the
entire jump-nav mechanism — no other file to touch.

## Type roles — pick one job each, do not mix casually

| Class | Job | Example in this deck |
|---|---|---|
| `.eyebrow` | Small mono label, always present, top of card | "NOAA · Climate Prediction Center" |
| `.big` | Large bold Archivo statement | "Two payments." |
| `.script` | Upright Bodoni display accent, one word or short phrase | Infinity, Finished. |
| `.said` | A spoken line — quotes, dialogue-weight statements | "The same system makes the mud..." |
| `.plain` | Body prose, Literata, for a sentence or two | the "why the camp exists" card |
| `.small` | Mono footnote under a stack | "Rolling · 8 to 12 seats · Mars College" |
| `.attrib` | Mono attribution line, wide letter-spacing | "Kamau Zuberi Akabueze" under a quote |
| `.orange` | Inline accent color — spend it on one word, not a sentence | "AND." in the Martians card |
| `.stack` | Wrapper that stacks `.big`/`.script`/`.small` lines tightly | almost every declarative card |
| `.rule` | A single 1px divider line inside a stack | under "Growth is a process" |

Reach for `.plain` when the line is a sentence someone reads; reach for `.big`/`.script` when it
is a declaration someone feels in one glance. Mixing more than 3 type roles on one card usually
means it wants to be two cards.

## Content blocks — for structured content, not manifesto lines

- **`.rows`** — a two-column fact table (`.k` label left, `.v` value right, `.opt` for a muted
  qualifier). Used for dates, dues, any "here is the data" card.
- **`.tips`** — a stacked list, bold lead-in phrase then a sentence. Used for the El Niño prep
  checklist. Good for any "do this, then this" practical content.
- **`.led`** (on the `.card` itself) + a plain `<ol>`/`<li>` inside — the self-selection ledger
  style ("Apply if…" / "Wait a season if…"). The `<em>▸</em>` at the start of each `<li>` is the
  only bullet mark used anywhere in this deck; do not swap in a different glyph.
- **`.frames`** — the seat-counter row of small blocks (`.f` = filled, `.g` = guest, bare `<i>`
  = open). Manually synced with `practitioners.html` — see the HTML comment above that card.
- **`.qr-slot`** + **`.follow-row`** — the subscribe-card pattern: a bordered square holding
  `<img onerror="this.remove()">` over a "pending" fallback, beside a `.u`-styled URL. To wire a
  new channel, copy the Substack or TLP card whole and point the `src` at a new filename in
  `photos/qr/`.

## Photo cards — `.card.photo`

```html
<div class="slide"><div class="card photo">
  <img class="bg" src="./photos/whatever.jpg" alt="Describe the photo.">
  <div class="scrim" aria-hidden="true"></div>
  <div class="grain" aria-hidden="true"></div>
  <div class="eyebrow">Label</div>
  <div style="margin-top:auto">
    <div class="said">The line that sits over the photo.</div>
    <div class="attrib">Small credit line</div>
  </div>
  <div class="mark">…</div>
</div></div>
```

`img.bg` is full-bleed (`object-fit:cover`), `.scrim` is the dark gradient that keeps text
readable over a bright photo — both are already tuned, do not adjust their opacity per-card.
Text goes in a wrapper with `margin-top:auto` so it sits at the bottom regardless of how much
text there is. Note `.guides` (safe-zone lines) are deliberately omitted on the three cinematic
cards since they are never posted as a 9:16 story — add them back if a photo card is meant to
work in that format too.

## The cinematic format — `.card.cine`

Add `cine` alongside `photo` on a card's class list and it locks to `aspect-ratio:5/4`
regardless of what the top toggle is set to — correct for LinkedIn no matter what format the
rest of the deck is being screenshotted in. Only combine `cine` with `photo`; a cinematic card
without a real photograph behind it has no reason to exist as its own format.

## Furniture you should never need to touch

- **`.controls`** (top, format/guides/marks toggles) and **`.jumpnav`** (bottom-left, section
  index) are both marked `never captured` — they dim automatically once scrolling starts
  (`.hidechrome`) so a screenshot stays clean. Do not add new buttons here casually; they are
  meant to stay minimal.
- **`.sunwrap`** — the radial-gradient sun glow, used sparingly (hero, El Niño, the close) to
  mark a card as an especially warm, atmospheric beat. Reusing it on every card would flatten
  the effect; it currently appears on exactly 3 cards, on purpose.
- **`.frames a`, crop marks, safe-zone guides** — export tooling, not content. Leave alone.

## Constraints inherited from the rest of the site (see `CLAUDE.md` for the full versions)

- **No contractions, no abstract negation** ("not X, but Y," "it is not… it is," defensive
  "not/no/without/cannot" that is not load-bearing). State the affirmative claim directly.
- **No forbidden components**: no cards-as-UI-metaphor (rounded boxes with shadows), no filled
  buttons, no icon sets, no badges, no pill tags, no emoji. The `.qr-slot` is functional
  wayfinding, not decoration — keep any new QR treatment as plain and bordered as it already is.
- **`--time` (orange) stays under 2% of any screen.** Spend it on one word or one line element
  per card at most (see `.orange`, the triangle-style bullets, the `.dots` in `.mark`).
- **Motion**: this deck currently has none beyond the format-toggle CSS transition and the
  controls' opacity fade. If a new idea wants motion, it needs to be weighed against the site's
  documented, exhaustive motion budget in `CLAUDE.md` first — do not add scroll-linked effects
  here without checking there.

## Adding a new card, step by step

1. Copy the nearest existing card that matches the shape you want (stack / quote / rows / tips /
   ledger / photo).
2. Write the copy first in `SHARE-COPY.md`, in the right section, using the voice rules above.
3. Paste the template into `share.html` in the matching section, swap in the new copy.
4. If it opens a new section, add its `id` and a jump-nav link.
5. Reload with a hard refresh (`Ctrl+Shift+R`) — `python -m http.server` does not send
   cache-control headers, so a normal refresh can silently show the old version.
