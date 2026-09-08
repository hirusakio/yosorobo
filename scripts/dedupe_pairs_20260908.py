from pathlib import Path

p = Path('words.txt')
words = p.read_text(encoding='utf-8').splitlines()

# User-selected cleanup from the first duplicate table.
# Keep noun forms for noun+する pairs; keep ordinary verbs where selected.
delete = {
    '引っ越す', '着替え', '片付け', '謝る', '説明する',
    '尋ねる', '答える', '説得する', '言い訳する', '忠告する',
    '命令する', '反対する', '賛成する', '約束する', '告白する',
    '自慢する', '励まし', '測定', '比べる', '選ぶ',
    '判断する', '決断する', '理解する', '納得する', '勘違いする',
    '誤解する', '予想する', '想像する', '期待する', '後悔する',
    '反省する', '安心する', '感動する', '興奮する', '我慢する',
    '成功する', '失敗する', '成長する', '進化する', '退化する',
    '悪化する', '変身する', '合体する', '分裂する', '発射する',
    '分解する', '発火する', '反抗する', '抵抗する', '邪魔する',
    '降参する', '居眠りする', 'あくびする', 'くしゃみする', '味見する',
    '節約する', '浪費する', '没頭する', '目覚め', '別れ',
    '出会い', '暮らし', '祈り', '憧れ', '驚き',
    '怒り', '悲しみ', '喜び', '笑い', '疲れ',
    '貯蓄', '購入', '販売', '受け取り', '払う',
    '宿泊', '外出', '帰宅', '返却', '演じる',
    '踊り', '愛', '交際', '付き合い', '招く',
}

# Explicit exceptions: keep these noun forms as-is.
keep = {'引っ越し', '質問', '調査', '集合', '分別', '音読', '暗記', '演技', '撮影', '招待'}

# Replace 払う with 支払う while preserving the position if possible.
out = []
seen = set()
for w in words:
    if w == '払う':
        w = '支払う'
    if w in delete:
        continue
    if w not in seen:
        seen.add(w)
        out.append(w)

if '支払う' not in seen:
    out.append('支払う')

p.write_text('\n'.join(out) + '\n', encoding='utf-8')
print('deleted:', sum(1 for w in words if w in delete))
print('支払う:', '支払う' in out)
print('kept exceptions:', {w: (w in out) for w in sorted(keep)})
