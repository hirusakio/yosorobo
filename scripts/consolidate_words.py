from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
SOURCE_FILES = [
    *[f"words{i}.txt" for i in range(1, 10)],
    "noun_candidates_1000plus.txt",
    "verb_candidates.txt",
    "adjective_candidates_2000.txt",
]

REPLACEMENTS = {
    "手続": "手続き",
    "もち": "餅",
    "引き分ける": "引き分け",
    "むくむ": "むくみ",
    "バックレ": "バックレる",
    "利き○○": "利き酒",
    "利き〇〇": "利き酒",
    "ねぎ": "ネギ",
    "許し合う": "許す",
    "引越し": "引っ越し",
    "待合せ": "待ち合わせ",
    "からあげ": "唐揚げ",
    "こしょう": "胡椒",
    "サケ": "鮭",
    "イス": "椅子",
    "マンガ": "漫画",
    "ねじ": "ネジ",
    "ばね": "バネ",
    "判子": "ハンコ",
    "鞄": "カバン",
    "申込み": "申し込み",
    "引継ぎ": "引き継ぎ",
    "受取": "受け取り",
    "申出": "申し出",
    "見掛け倒し": "見かけ倒し",
    "打合せ": "打ち合わせ",
    "締切": "締め切り",
    "肩書": "肩書き",
    "折込": "折り込み",
    "吹替": "吹き替え",
    "のこぎり": "ノコギリ",
    "尻尾": "しっぽ",
    "げっぷ": "ゲップ",
    "誕生会": "誕生日会",
}

EXCLUDE = {
    "真鍮", "合板", "石材", "鋼", "断熱材", "建材", "路肩", "陸橋", "貯水槽",
    "排気口", "換気口", "字体", "字間", "キャプション", "製本", "トナー",
    "受付票", "壮行会", "セットプレー",
}

words = []
seen = set()
for filename in SOURCE_FILES:
    path = ROOT / filename
    if not path.exists():
        continue
    for raw in path.read_text(encoding="utf-8").splitlines():
        word = raw.strip()
        if not word:
            continue
        word = REPLACEMENTS.get(word, word)
        if word in EXCLUDE or word in seen:
            continue
        seen.add(word)
        words.append(word)

(ROOT / "words.txt").write_text("\n".join(words) + "\n", encoding="utf-8")

index_path = ROOT / "index.html"
index = index_path.read_text(encoding="utf-8")
index = re.sub(r"const FILES=\[[^;]+\]", "const FILES=['words.txt']", index, count=1)
index_path.write_text(index, encoding="utf-8")

for filename in SOURCE_FILES:
    path = ROOT / filename
    if path.exists():
        path.unlink()

print(f"Consolidated {len(words)} unique words into words.txt")
