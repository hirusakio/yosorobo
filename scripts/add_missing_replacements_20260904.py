from pathlib import Path
p = Path(__file__).resolve().parents[1] / 'words.txt'
words = [x.strip() for x in p.read_text(encoding='utf-8').splitlines() if x.strip()]
seen = set(words)
for w in ['消防車','挟む','蒸す','月','給料']:
    if w not in seen:
        words.append(w)
        seen.add(w)
p.write_text('\n'.join(words) + '\n', encoding='utf-8')
