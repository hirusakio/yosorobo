from pathlib import Path
p=Path('words.txt')
words=p.read_text(encoding='utf-8').splitlines()
# Second-table selections. User exceptions keep the noun; otherwise follow table.
delete={
'逃亡','脱走','上昇','下降','停止','衝突','燃焼','凍結','増加','減少','膨張','収縮','崩壊','崩落','倒壊','腐敗','老化','衰退','脱出','潜伏','潜入','包囲','救出','承認','救命','雇用','運搬','設置','制作','製造','支援','変更','整理','分類','表示','口論','逃げ切り','思い込む','やり直し','読み飛ばし','割り込み','気遣い','裏切り','晒し','覗き見','手直し','紛失','追跡'
}
# Explicitly retained from the second table:
keep={'落下','回転','接触','復活','移動','沸騰','労働','挑戦','教育','完成','修正','思い込み'}
out=[]; seen=set()
for w in words:
    if w in delete: continue
    if w not in seen:
        seen.add(w); out.append(w)
p.write_text('\n'.join(out)+'\n',encoding='utf-8')
print('deleted',sum(w in delete for w in words))
print('kept',{w:w in out for w in sorted(keep)})
