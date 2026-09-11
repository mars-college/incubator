# Deployment — incubator.mars.college

Static files, no build step. Hosted on Vercel, same account and same pattern as
the other camp subdomains (see `web/mars-v2/AI-LEGIBILITY.md`).

```
Git repo        github.com/mars-college/incubator (private, branch main)
Vercel team     gene-kogans-projects
Vercel project  incubator-mars-college
Fallback URL    https://incubator-mars-college.vercel.app
Domain          incubator.mars.college
DNS             DigitalOcean — A record, host `incubator`, value 76.76.21.21
```

Unlike the other camp subdomains this one is **not** a proxy: the files in this
folder are the site, uploaded straight to Vercel.

## Redeploy after an edit

```
cd web/incubator.mars.college
vercel deploy --prod --yes --scope gene-kogans-projects
```

The Vercel CLI on this machine must run under Node 24 — on Node 26 every command
dies with `TypeError: fetch failed`:

```
~/.nvm/versions/node/v24.20.0/bin/node \
  ~/.nvm/versions/node/v26.5.0/lib/node_modules/vercel/dist/index.js \
  deploy --prod --yes --scope gene-kogans-projects
```

## What is deliberately never published

`.vercelignore` keeps these out of every deployment. Check it before adding a
file that carries contacts, keys, or money:

- `apps-script/` — the Apps Script deployment URL, both Sheet IDs, the notify email
- `budget/` — the season budget model
- `CONTACT-SHEET.md`, `CLAUDE.md`, `README.md`, `QA_SPEED_RUN_CHECKLIST.md`,
  `MarsSubstackbyKzA.md`, `.claude/`

Verified after the first deploy: every page returns 200, every file above
returns 404.

`apps-script/`, `budget/` and `CONTACT-SHEET.md` are also kept **out of git**
(see `.gitignore`). They exist only in the Mars archive copy of this folder at
`Mars/web/incubator.mars.college`, and in KzA's original delivery. A clone of
the repo will not have them, which is deliberate — a clone can still deploy the
site, because the application posts to an Apps Script URL that is already
inlined in `apply.html`.

## Local preview

```
python3 -m http.server 8000
```

Also wired as the `mars-incubator` configuration in `Mars/.claude/launch.json`.
