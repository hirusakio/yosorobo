from pathlib import Path

path = Path(__file__).resolve().parents[1] / 'words.txt'
additions = '''おすそ分け
口パク
社交辞令
早とちり
座学
一匹狼
紅一点
抜き打ちテスト
学級閉鎖
三者面談
読書感想文
幽霊部員
百葉箱
ベルマーク
だるまさんがころんだ
フルーツバスケット
花いちもんめ
かごめかごめ
あっち向いてホイ
指スマ
マジカルバナナ
伝言ゲーム
おはじき
メンコ
タイムカプセル
エゴサーチ
バズる
初見
古参
カメラ目線
ワイプ
ガヤ
前説
出待ち
ファンサ
五月病
初夢
菓子折り
引き出物
へそくり
お通し
一本締め
胴上げ
始球式
選手宣誓
秘密兵器
隠し球
とばっちり
一攫千金
一夜漬け
お蔵入り
たらい回し
フラグ
タイムリープ
異世界転生
不老不死
玉手箱
天狗
河童
雪女
のっぺらぼう
口裂け女
トイレの花子さん
ツチノコ
ネッシー
ミステリーサークル
オーパーツ
ポルノ
HIKAKIN
ひろゆき
情熱大陸
SASUKE
逃走中
はじめてのおつかい
格付けチェック
ピタゴラスイッチ
トリビアの泉
黒ひげ危機一発
UFOキャッチャー
ナポレオン
クレオパトラ
アインシュタイン
ニュートン
エジソン
モナ・リザ
考える人
スフィンクス
ピサの斜塔
ナスカの地上絵'''.splitlines()

words = [line.strip() for line in path.read_text(encoding='utf-8').splitlines() if line.strip()]
seen = set(words)
for word in additions:
    word = word.strip()
    if word and word not in seen:
        words.append(word)
        seen.add(word)
path.write_text('\n'.join(words) + '\n', encoding='utf-8')
