from pathlib import Path
p=Path('words.txt')
delete={'乗車','下車','妬む','入場','視聴','溶解','入り込む','掃く','交付','掲示','収集'}
words=p.read_text(encoding='utf-8').splitlines()
out=[w for w in words if w not in delete]
p.write_text('\n'.join(out)+'\n',encoding='utf-8')
print('deleted:', sorted(delete & set(words)))
