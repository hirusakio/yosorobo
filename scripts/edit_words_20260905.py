from pathlib import Path
p=Path(__file__).resolve().parents[1]/'words.txt'
repl={'うとうとする':'うとうと','恵む':'恵み'}
remove={'パーソナライズ','ツルハ','胃痛','縫い付ける','逃走'}
words=[x.strip() for x in p.read_text(encoding='utf-8').splitlines() if x.strip()]
out=[]; seen=set()
for w in words:
    if w in remove: continue
    w=repl.get(w,w)
    if w not in seen:
        seen.add(w); out.append(w)
p.write_text('\n'.join(out)+'\n',encoding='utf-8')
