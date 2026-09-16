# Follow/subscribe QR codes

Drop a QR image in this folder and it appears on `share.html`'s "Follow the season" cards
automatically — nothing else to edit, as long as the filename matches what that card already
expects.

## How it works

Each subscribe card's QR box holds an `<img>` pointed at a specific filename in this folder,
plus a fallback placeholder (`QR · pending`) that shows instead if the file is not there yet:

```html
<img src="./photos/qr/substack.png" alt="Scan to follow the Mars College Substack"
     loading="lazy" onerror="this.remove()">
<div class="ph">QR<br>pending</div>
```

If the image 404s, `onerror` removes it and the placeholder shows through — an empty folder
never breaks the page. The moment a correctly-named file lands here, it replaces the placeholder
on the next load. No JavaScript build step, no manifest to update. Same mechanism as
`photos/practitioners/`'s portrait handling — see that folder's README for the original pattern.

**Two seats already wired:**
- `substack.png` — the Mars College Substack subscribe card
- `tlp.png` — The Listener's Path subscribe card (`https://tlp.beehiiv.com/subscribe`)

## Size and shape

The QR box is a fixed 112 × 112px square, `object-fit:contain` (not cropped). A square PNG or
SVG with a quiet border and no extra whitespace reads cleanest at that size — export at 400×400px
or larger so it stays crisp at retina resolution when the card is screenshotted.

## What NOT to do

Do not resize the `.qr-slot` box or change its markup to "make room" for a code — it already
displays any correctly-named square image without further edits.
