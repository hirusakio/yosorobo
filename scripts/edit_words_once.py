from pathlib import Path

path = Path(__file__).resolve().parents[1] / 'words.txt'
replacements = {
    '験担ぎ': 'ゲン担ぎ',
    '組立': '組み立てる',
    'からかい': 'からかう',
}
remove = {'回','密約','日曜','月曜','火曜','木曜','金曜','土曜'}

words = [line.strip() for line in path.read_text(encoding='utf-8').splitlines() if line.strip()]
seen = set()
out = []
for word in words:
    if word in remove:
        continue
    word = replacements.get(word, word)
    if word not in seen:
        seen.add(word)
        out.append(word)
path.write_text('\n'.join(out) + '\n', encoding='utf-8')
