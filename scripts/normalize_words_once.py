from pathlib import Path

path = Path(__file__).resolve().parents[1] / 'words.txt'
replacements = {
    '乗換': '乗り換え',
    '手提げ': '手提げ袋',
    '物干し': '物干し竿',
    '土産': 'お土産',
    '婚姻': '結婚',
    '医院': '病院',
    '子供': '子ども',
    '取り敢えず': 'とりあえず',
    '有難い': 'ありがたい',
}

words = [line.strip() for line in path.read_text(encoding='utf-8').splitlines() if line.strip()]
seen = set()
out = []
for word in words:
    word = replacements.get(word, word)
    if word not in seen:
        seen.add(word)
        out.append(word)
path.write_text('\n'.join(out) + '\n', encoding='utf-8')

# one-time normalization trigger
