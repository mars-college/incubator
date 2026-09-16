# Practitioner portraits

Drop a photo in this folder and it appears on [`practitioners.html`](../../practitioners.html)
automatically — nothing else to edit, as long as the filename matches what that
practitioner's seat already expects.

## How it works

Each seat's portrait box in `practitioners.html` holds an `<img>` pointed at a
specific filename, plus a fallback placeholder (`Portrait · 4:5 · pending`, or
similar) that shows instead if the file isn't there yet:

```html
<img src="./photos/thumb/practitioners/kza.jpg" alt="Kamau Zuberi Akabueze"
     loading="lazy" onerror="this.remove()">
<div class="ph">Portrait<br>4:5 · pending</div>
```

**Note the `thumb/` in that path.** The portrait a visitor downloads is a
web-sized copy, not the photograph you drop here — a phone camera portrait runs
several megabytes and the box displays it about 300 pixels wide. Put the
original in *this* folder under the name the seat expects, then run

```
node tools/optimize-images.mjs
```

from the repo root, which writes `photos/thumb/practitioners/<same-name>.jpg`
(plus `web/` and `tray/` copies) for the page to use. Originals stay here
untouched, and re-running the script only rebuilds what changed.

If the image 404s, `onerror` removes it and the placeholder shows through —
so an empty folder never breaks the page. The moment a correctly-named file
lands here, it replaces the placeholder on the next load. No JavaScript
build step, no manifest to update.

**Founding seat (Kamau Zuberi Akabueze) is already wired** to `kza.jpg` —
drop that file in and his portrait goes live.

**For every seat after that:** when a new practitioner is confirmed, whoever
edits that seat in `practitioners.html` picks a filename (a short slug —
initials, or a first name, whatever reads clearly) and adds the same
`<img ... onerror="this.remove()">` line pointed at
`./photos/thumb/practitioners/<that-slug>.jpg`, following seat 01 as the
pattern. The photograph itself goes in this folder as `<that-slug>.jpg` and
order doesn't matter — only that the name matches and the optimizer has run
since.

## Size and shape

The portrait box is a fixed **4:5 ratio** (width:height), and the image is
cropped to fill it with `object-fit:cover` — centered by default. That means:

- **The source does not need to be exactly 4:5.** Cover crops the excess
  automatically. A roughly-4:5 or taller image works fine.
- **Keep the face centered**, with some headroom on all sides. The crop is
  centered on the frame, not face-aware — a portrait shot with the subject
  dead-center and not tight against any edge survives the crop safely.
- **Minimum usable size:** 1000 × 1250px.
- **Recommended:** 1200 × 1500px or larger. The box renders as small as
  ~200px wide in a desktop three-column row and as wide as the full column
  on mobile (which can exceed 400px before scaling) — on a retina display
  that's over 1000px of real pixels, so a source below the minimum will look
  soft.
- **Format:** JPG (or WebP). No need to pre-crop to exact 4:5 or to keep the
  file large — a well-compressed image under 500KB is plenty at this display
  size.

## What NOT to do

Don't rename or resize the placeholder markup in `practitioners.html` to
"make room" for a photo — the box is already sized correctly and will accept
any image that meets the spec above without any other change.
