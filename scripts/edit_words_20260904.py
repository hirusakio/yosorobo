from pathlib import Path

path = Path(__file__).resolve().parents[1] / 'words.txt'
replacements = {
    'にら': ['ニラ'],
    '消防': ['消防車'],
    '狭まる': ['狭い', '挟む'],
    '蒸らす': ['蒸す'],
    '月面': ['月'],
    '月給': ['給料'],
}
remove = {
    'ローテク','当て馬','息む','勘当','Uber','ハードディスク',
    '一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月',
    '章','根','線','中','欄','実','番','寝た子を起こす','キャンセル待ち'
}

words = [line.strip() for line in path.read_text(encoding='utf-8').splitlines() if line.strip()]
out = []
seen = set()
for word in words:
    if word in remove:
        continue
    targets = replacements.get(word, [word])
    for target in targets:
        if target not in seen:
            seen.add(target)
            out.append(target)
path.write_text('\n'.join(out) + '\n', encoding='utf-8')
