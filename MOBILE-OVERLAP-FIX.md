# Mobile bottom-band overlap — observation and fix

## What was observed

On phones, three independent `position:fixed` elements stack in the same bottom-of-viewport
space with no coordinate system between them:

- **The rebate** — the fixed left nav strip (position numbers 0–9), full height, always
  present. This is the signature nav element and does not change.
- **The El Niño "on panel" bug** — a fixed bottom-right data box (Niño 3.4 / Playa / Season),
  present on `index.html` only.
- **The Apply companion** — the fixed bottom nudge (message + "Apply now" / "See the nine
  phases" CTA), spliced into `index.html`, `el-nino.html`, and `practitioners.html`.

On a phone screen, the El Niño box lands directly on top of the Apply CTA text, and the Apply
companion's mobile layout runs underneath the rebate strip. Apply is the priority; El Niño is
not, so the fix defers the El Niño box out of the way rather than the reverse.

## Root cause

1. **Companion vs. rebate, in `index.html`, `el-nino.html`, `practitioners.html`.** Desktop CSS
   correctly reserves the rebate's width for the companion (`left:var(--rebate)`). The
   `@media (max-width:820px)` override reset this to `left:0; right:0`, erasing that
   reservation, so the full-width companion bar ran underneath the rebate strip.
2. **El Niño bug vs. companion, in `index.html` only.** `.bug` was `position:fixed; right:16px;
   bottom:16px; z-index:85` at every screen width. Once the companion went full-width on
   mobile, `.bug`'s higher z-index rendered on top of it in the bottom-right corner — the exact
   corner where the CTA text lives.

`apply.html` was not affected — it has no companion or bug widget, and its own fixed element
(the draft-restore bar) was already correctly offset from the rebate.

## Fix

### `index.html`

**1. Wrap the El Niño box's stat lines** so they can be hidden independently of the label on
narrow screens (`href` and label text unchanged):

```html
<!-- before -->
<a class="bug" href="#p5" aria-label="El Niño conditions, section five">
  <span class="on">El Niño</span> · on panel<br>
  Niño 3.4 &nbsp;<b>+2.1°C</b><br>
  Playa &nbsp;<b>firm</b><br>
  Season &nbsp;<b>134 days</b>
</a>

<!-- after -->
<a class="bug" href="#p5" aria-label="El Niño conditions, section five">
  <span class="on">El Niño</span> · on panel<br>
  <span class="bug-stats">Niño 3.4 &nbsp;<b>+2.1°C</b><br>
  Playa &nbsp;<b>firm</b><br>
  Season &nbsp;<b>134 days</b></span>
</a>
```

**2. In the existing `@media (max-width:820px)` block**, move the bug out of the bottom band
and collapse it to a single-line label:

```css
/* before */
.bug{right:10px;bottom:10px;font-size:9.5px;}

/* after */
.bug{right:10px;top:10px;bottom:auto;font-size:9.5px;}
.bug .bug-stats{display:none;}
```

The El Niño data itself is not removed from the site — it is still fully readable on its own
section (position 5), reachable via the rebate's "5" nav marker and via the bug's own link.
Only the redundant ambient duplicate is compacted where phone screen space is tightest.

**3. In the `#companion` mobile override**, keep the rebate's width reserved instead of
resetting it:

```css
/* before */
@media (max-width:820px){
  #companion{ left:0; right:0; max-width:none; }
  ...
}

/* after */
@media (max-width:820px){
  #companion{ left:var(--rebate); right:0; max-width:none; }
  ...
}
```

### `el-nino.html` and `practitioners.html`

Same single change as #3 above — in each file's own `#companion` mobile override, change
`left:0;` to `left:var(--rebate);`. Neither file has a `.bug` element, so nothing else changes
in either of them.

### `apply.html`

No change needed.

## Why this fix and not something else

- The rebate is the site's signature nav and stays exactly as designed — full height, always
  present. The other two elements defer to it, not the other way around.
- The bug keeps its existing bordered, monospace look — nothing new was introduced (no pill,
  badge, or card component), it is simply smaller and moved to a different fixed corner on
  narrow screens.
- Only the `max-width:820px` breakpoint that already existed in each file was touched — no new
  breakpoints were added, and nothing changes above 820px width.

## How to verify after applying

1. Load each of `index.html`, `el-nino.html`, `practitioners.html` at a phone width (≈375px).
2. Confirm the rebate strip, the El Niño tag (top-right, `index.html` only), and the Apply
   companion (bottom) no longer overlap at any scroll position.
3. Confirm the El Niño tag still links to the El Niño section and its full data is visible
   there.
4. Confirm the Apply companion's CTA text and link are fully legible and tappable, and no
   longer runs under the rebate strip.
5. Check the same three pages above 820px width to confirm no change there.
