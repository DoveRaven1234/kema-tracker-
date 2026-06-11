# KEMA Debate Tracker

A daily-updating research site for the Jakarta MUN / KEMA topic
**"The Seoul of K-Pop: Balancing Corporate Competition with Creative Freedom."**

Compiles the **top 30 current articles** on the debate — 15 leaning pro-corporate,
15 leaning pro-creative-freedom — plus a curated recap of the 8 major issues.

## Using it

Just open `index.html` in a browser. That's it — no installs, no server, no API keys.

- The first visit each day pulls fresh articles from Google News and caches them in
  your browser; every visit after that is instant until the next day.
- **↻ Force refresh** on any article page re-pulls immediately.
- If the news feeds are unreachable, the site falls back to yesterday's edition,
  then to curated search links — it never shows a blank page.

## Pages

| Page | What's on it |
|---|---|
| `index.html` | Quick recap of the debate + top 5 headlines per side |
| `daily.html` | Today's 5 picks per side with "why it matters" analysis, coverage-tilt gauge, and live issue-frequency chart |
| `for.html` | 15 articles leaning toward the corporate model |
| `against.html` | 15 articles leaning toward creative freedom |
| `press.html` | Real articles direct from 6 outlets (Soompi/Koreaboo/NME in English, Yonhap/SBS/Hankyoreh in Korean), debate-relevant items flagged |
| `issues.html` | The 8 major issues, each with both sides' framing (debate prep) |
| `stances.html` | Stance spectrum chart, 11 clickable player dossiers (facts, case file, committee angles, daily news), flashpoint timeline 2009–2026 |
| `trends.html` | Coverage-tilt history chart, issue movement vs. previous day, diversity stats — accumulates one snapshot per day |
| `about.html` | Methodology, ranking logic, and honest limitations |

## Optional: fully automatic daily updates (free hosting)

If you push this folder to GitHub and enable GitHub Pages, the included workflow
(`.github/workflows/daily-update.yml`) regenerates `data/articles.json` every day
at **06:00 WIB** — the site stays fresh even before anyone visits.

```
git init
git add .
git commit -m "KEMA debate tracker"
# create a repo on github.com, then:
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
# Settings → Pages → deploy from main branch
```

You can also regenerate the data manually anytime:

```
python automation/update_articles.py
```

## Tweaking it

- **Search queries / keywords:** edit the `TOPIC.feeds` and `KEYWORDS` lists at the
  top of `js/app.js` (and mirror in `automation/update_articles.py`).
- **Articles per side:** change `perSide` in `js/app.js` / `PER_SIDE` in the Python script.
- **Colors:** the `:root` variables at the top of `css/style.css`.

## Honest notes

Stance labels are keyword heuristics — a starting sort, not a judgment. Read articles
before citing them in committee. Article links route through Google News redirects.
