"""Daily article compiler for the KEMA Debate Tracker.

Fetches K-pop industry news from Google News RSS, classifies each article
as leaning pro-corporate ("for") or pro-creative-freedom ("against"),
ranks them, and writes the top 15 per side to data/articles.json.

Mirrors the logic in js/app.js so the deployed site and the local site
behave identically. Standard library only — no pip installs needed.

Run manually:  python automation/update_articles.py
Or let the GitHub Action (.github/workflows/daily-update.yml) run it daily.
"""

import json
import re
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path

PER_SIDE = 15

FEEDS = [
    ('k-pop idol "exclusive contract" OR "contract dispute" OR lawsuit OR termination', 'against'),
    ('k-pop artist "creative freedom" OR "creative control" OR "artist rights" OR autonomy', 'against'),
    ('k-pop industry growth OR revenue OR investment OR "global success"', 'for'),
    ('k-pop entertainment company HYBE OR SM OR JYP OR YG strategy OR expansion', 'for'),
]

# Hard relevance gate — must actually be about the K-pop industry (mirrors js/app.js)
CORE_RE = re.compile(
    r'k[\s-]?pop|idol|hybe|ador|newjeans|njz|\bjyp\b|yg entertainment|sm entertainment'
    r'|big hit|pledis|starship|cube enter|fnc enter|kakao enter'
    r'|korean (?:music|entertainment|agency|label)|k-?entertainment', re.I)

# Scoring centered on the study-guide question: creative freedom vs corporate
# control. Adjacent themes (mental health, dating bans) no longer drive
# classification (mirrors js/app.js).
KEYWORDS = {
    'against': [
        'exploit', 'slave contract', 'lawsuit', 'sue', 'sued', 'dispute',
        'terminate', 'termination', 'breach', 'unfair', 'underpaid', 'unpaid',
        'debt', 'court', 'injunction', 'tribunal', 'allegation', 'abuse',
        'mistreat', 'creative freedom', 'creative control', 'artistic freedom',
        'artist rights', 'autonomy', 'self-expression', 'independence',
        'restriction', 'controlled', 'leave the label', 'exclusive contract',
        'feud', 'protest', 'fined', 'investigation', 'royalt', 'settlement',
    ],
    'for': [
        'growth', 'profit', 'revenue', 'billion', 'million albums',
        'record-breaking', 'record sales', 'success', 'investment', 'expansion',
        'strategy', 'partnership', 'soft power', 'export', 'training system',
        'milestone', 'ipo', 'stock', 'earnings', 'agency announces', 'new label',
        'chart-topping', 'sold out', 'tour gross', 'box office', 'global push',
        'multi-label', 'shareholder', 'market cap', 'subsidiary',
    ],
}


def fetch_feed(query, hint):
    url = ('https://news.google.com/rss/search?q='
           + urllib.parse.quote(query) + '&hl=en-US&gl=US&ceid=US:en')
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=30) as r:
        root = ET.fromstring(r.read())
    items = []
    for it in root.iter('item'):
        get = lambda tag: (it.findtext(tag) or '').strip()
        raw = get('title')
        m = re.match(r'^(.*) - ([^-]+)$', raw)
        snippet = re.sub(r'<[^>]*>', '', get('description'))[:180]
        # Google News descriptions are often just the title again — drop those
        norm = lambda s: re.sub(r'[^a-z0-9]', '', s.lower())
        if norm(raw)[:40] in norm(snippet):
            snippet = ''
        items.append({
            'title': m.group(1) if m else raw,
            'source': m.group(2) if m else 'Google News',
            'link': get('link'),
            'date': get('pubDate') or datetime.now(timezone.utc).strftime('%a, %d %b %Y %H:%M:%S GMT'),
            'snippet': snippet,
            'hint': hint,
        })
    return items


def classify(item):
    text_t = item['title'].lower()
    text_d = item['snippet'].lower()
    score = {}
    for side, words in KEYWORDS.items():
        score[side] = sum(2 for w in words if w in text_t) + sum(1 for w in words if w in text_d)
    if score['against'] > score['for']:
        item['side'], item['confidence'] = 'against', score['against']
    elif score['for'] > score['against']:
        item['side'], item['confidence'] = 'for', score['for']
    else:
        item['side'], item['confidence'] = item['hint'], 0
    return item


def rank(item):
    try:
        age_days = max(0.0, (datetime.now(timezone.utc) - parsedate_to_datetime(item['date'])).total_seconds() / 86400)
    except Exception:
        age_days = 7.0
    return item['confidence'] * 2 + max(0.0, 7 - age_days)


# mirrors ISSUES in js/app.js — used for the Trends history
ISSUE_WORDS = {
    'contracts': ['contract', 'lawsuit', 'sue', 'sued', 'dispute', 'termination', 'terminate', 'injunction', 'court', 'tribunal', 'penalty', 'renewal', 'breach'],
    'trainee': ['trainee', 'training system', 'audition', 'debut', 'debt', 'minor'],
    'creative': ['creative', 'self-produc', 'songwrit', 'producer', 'artistic', 'concept', 'freedom'],
    'private': ['dating', 'privacy', 'private life', 'image', 'relationship', 'weight'],
    'health': ['mental health', 'depression', 'burnout', 'anxiety', 'hiatus', 'harassment', 'bullying', 'overwork'],
    'economy': ['revenue', 'profit', 'earnings', 'stock', 'ipo', 'billion', 'investment', 'market', 'export', 'growth', 'expansion', 'sales', 'chart', 'tour', 'soft power', 'partnership', 'deal'],
    'regulation': ['regulat', 'law', 'bill', 'ministry', 'government', 'fair trade', 'kftc', 'policy', 'rights', 'union', 'association'],
}


def tag_issue(item):
    text = f"{item['title']} {item['snippet']}".lower()
    best, best_hits = None, 0
    for issue_id, words in ISSUE_WORDS.items():
        hits = sum(1 for w in words if w in text)
        if hits > best_hits:
            best, best_hits = issue_id, hits
    return best or ('economy' if item['side'] == 'for' else 'contracts')


def update_history(out, data_dir):
    """Append today's snapshot to data/history.json (one entry per day)."""
    hist_path = data_dir / 'history.json'
    try:
        hist = json.loads(hist_path.read_text(encoding='utf-8'))
    except (FileNotFoundError, ValueError):
        hist = []
    hist = [h for h in hist if h.get('date') != out['generatedAt']]

    f_score = sum(i['confidence'] for i in out['for']) or 1
    a_score = sum(i['confidence'] for i in out['against']) or 1
    everything = out['for'] + out['against']
    issues = {}
    for item in everything:
        iid = tag_issue(item)
        issues[iid] = issues.get(iid, 0) + 1

    hist.append({
        'date': out['generatedAt'],
        'tilt': round(f_score / (f_score + a_score) * 100),
        'issues': issues,
        'sources': len({i['source'] for i in everything}),
    })
    hist.sort(key=lambda h: h['date'])
    hist_path.write_text(json.dumps(hist[-120:], ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'History: {len(hist[-120:])} day(s) on record')


def main():
    pool, seen = [], set()
    for query, hint in FEEDS:
        try:
            for item in fetch_feed(query, hint):
                if not CORE_RE.search(f"{item['title']} {item['snippet']}"):
                    continue  # not actually about the K-pop industry
                key = re.sub(r'[^a-z0-9]', '', item['title'].lower())[:60]
                if key not in seen:
                    seen.add(key)
                    pool.append(classify(item))
        except Exception as e:
            print(f'feed failed ({hint}): {e}')

    if not pool:
        raise SystemExit('All feeds failed — keeping previous articles.json')

    out = {
        'generatedAt': datetime.now(timezone.utc).strftime('%Y-%m-%d'),
        'mode': 'static',
    }
    for side in ('for', 'against'):
        # confident stance matches first; hint-only ties are fill-in
        ranked = sorted((i for i in pool if i['side'] == side),
                        key=lambda i: (i['confidence'] > 0, rank(i)), reverse=True)
        out[side] = [{k: v for k, v in i.items() if k != 'hint'} for i in ranked[:PER_SIDE]]

    data_dir = Path(__file__).resolve().parent.parent / 'data'
    data_dir.mkdir(exist_ok=True)
    dest = data_dir / 'articles.json'
    dest.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f"Wrote {len(out['for'])} for / {len(out['against'])} against -> {dest}")
    update_history(out, data_dir)


if __name__ == '__main__':
    main()
