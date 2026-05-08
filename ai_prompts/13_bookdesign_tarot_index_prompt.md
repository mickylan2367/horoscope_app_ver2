# AIプロンプト: bookdesign内にタロット機能のTAROT INDEXを組み込む設計

あなたは LovelyWitch Life の React UI/UX 設計担当AIです。
このプロンプトでは、まだ実装しないでください。まず本のページ構造とタロット画面の関係を調査し、実装指示書を作ってください。

## 目的

タロットカードの機能を `http://127.0.0.1:5173/bookdesign` の本のページに組み込みたいです。
INDEXページでカードを選んだら、本のページがひらりとめくれて、次の `TAROT INDEX` 画面へ移動するようにしてください。

## 要望

- `bookdesign` のINDEXからタロット用の項目を選べるようにする。
- タロット項目を選ぶと、本のページめくり演出で `TAROT INDEX` へ移動する。
- `TAROT INDEX` では、タロット機能へ入るための選択画面を表示する。
- 少なくとも次の機能へ自然に移動できるようにする。
  - `http://127.0.0.1:5173/tarot/read`
  - `http://127.0.0.1:5173/tarot/decks`
- 保存済みタロット結果だけを見る `http://127.0.0.1:5173/tarot/readings` は将来的に不要にする方針なので、独立した主要導線としては強調しない。
- PCでもスマホでも、本の中にタロットが入っているように見せる。

## 調査してほしいファイル

- `react_frontend/src/App.jsx`
- `react_frontend/src/BookDesign.jsx`
- `react_frontend/src/pages/TarotPages.jsx`
- `react_frontend/src/pages/DiaryBookPage.jsx`
- `react_frontend/src/components/`
- `react_frontend/src/index.css`

## 出力してほしいこと

1. 現在の `bookdesign` のINDEX構造を説明する。
2. 現在のタロット関連ルートと画面構成を説明する。
3. `TAROT INDEX` を本のページとして追加する場合の状態管理案を提案する。
4. `TAROT INDEX` に置く3つ前後の選択肢を提案する。
5. `/tarot/read` と `/tarot/decks` へ移動するとき、ページめくり演出とルート遷移をどうつなぐか説明する。
6. `/tarot/readings` を将来不要にする前提で、画面導線からどう弱めるか提案する。
7. 実装時に編集するファイルと、追加するコンポーネント候補を書く。
8. スマホでのレイアウト崩れを避けるための注意点を書く。
9. 実装後の手動確認項目を書く。

## 受け入れ条件

- `bookdesign` のINDEXからタロットの入口が見つけられる。
- タロット入口を選ぶと、本のページめくりで `TAROT INDEX` に移動したように見える。
- `TAROT INDEX` からリーディング画面とデッキ画面へ移動できる。
- 既存の `/tarot/read` と `/tarot/decks` の直接アクセスは壊さない。
- `/tarot/readings` は主要導線から外す方針が明確になっている。

