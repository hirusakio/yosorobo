from pathlib import Path
p=Path('words.txt')
delete={'止む','藁にもすがる','突っ立つ','硯','へばる','王族','プッチンプリン','許嫁'}
words=p.read_text(encoding='utf-8').splitlines()
out=[w for w in words if w not in delete]
p.write_text('\n'.join(out)+'\n',encoding='utf-8')
print('deleted:', sorted(delete & set(words)))
