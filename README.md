# Incubator Camp

A practitioner incubator at Mars College. Bombay Beach, California.
Semester: January 11 – March 29, 2027.

Static site, no build step, no dependencies.

```
python3 -m http.server 8000
open http://localhost:8000
```

| Page | What it is |
|---|---|
| `index.html` | The camp |
| `apply.html` | The application — live, tested, delivering to two Google Sheets |
| `el-nino.html` | The El Niño briefing for the 2027 season |
| `practitioners.html` | The panel, published as it fills |
| `share.html` | Screenshot deck for social, 4:5 and 9:16 |
| `gallery.html` | Cinematic slideshow, awaiting Mars '26 photographs in `/photos` |

The Apply companion (a state-aware nudge in the left margin) and the Mars College
"learn more" link are installed directly in `index.html`, `el-nino.html`, and
`practitioners.html` — no separate files, nothing left to splice in.


`apps-script/` holds the application's delivery pipeline — confirmed working, with a
setup guide, the exact live configuration, and one real bug already hit and fixed.

`budget/budget.xlsx` models the season, built from real Mars 2026 kitchen data.

**Read `CLAUDE.md` before changing any copy or any styling.** It carries the three
standing rules that are not obvious from the code, plus a CSS grid gotcha that has
already bitten this project twice.
