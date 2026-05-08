# AIプロンプト: 保存したタロット結果を日記一覧へ統合する設計

あなたは LovelyWitch Life の Django/React 機能設計担当AIです。
このプロンプトでは、まだ実装しないでください。バックエンドAPIとフロントエンド表示の両方を調査し、次に実装するAI向けの指示書を作ってください。

## 目的

保存したタロットの結果を、日記一覧の画面で他の日記たちと一緒に日付順で見られるようにしたいです。
そのため、タロット結果だけが見られる一覧 `http://127.0.0.1:5173/tarot/readings` は不要にする方針です。

## 要望

- 保存済みタロット結果を、日記一覧のタイムラインに混ぜて表示する。
- 通常の日記とタロット結果を、同じ日付順で並べる。
- タロット結果は日記と見分けられるデザインにする。
- `/tarot/readings` は将来的に不要にする。ただし、既存データや既存APIを壊さない移行方針を考える。
- タロット結果の詳細表示や再確認ができる導線も考える。

## 調査してほしいファイル

- `django_backend/chart/models.py`
- `django_backend/chart/views.py`
- `django_backend/diaryapp/models.py`
- `django_backend/diaryapp/views.py`
- `django_backend/horoscope/urls.py`
- `react_frontend/src/api.js`
- `react_frontend/src/pages/DiaryBookPage.jsx`
- `react_frontend/src/pages/TarotPages.jsx`
- `react_frontend/src/components/DiaryCard.jsx`

## 出力してほしいこと

1. 現在の日記データとタロットリーディング保存データのモデル構造を整理する。
2. 現在の日記一覧APIとタロット結果一覧APIを整理する。
3. 日記とタロット結果を統合表示するAPI設計を提案する。
4. 新しい統合タイムラインAPIを作る案と、既存日記APIを拡張する案を比較する。
5. 推奨案を1つ選び、理由を書く。
6. フロントエンドの日記一覧で、通常日記とタロット結果をどう描き分けるか提案する。
7. `/tarot/readings` を削除する前に必要な互換性対応、リダイレクト、導線整理を提案する。
8. 実装時に編集するファイル、追加するテスト、手動確認項目を書く。

## 受け入れ条件

- 日記一覧に通常日記と保存済みタロット結果が日付順で並ぶ。
- タロット結果は日記とは違う種類の記録だと分かる。
- 既存の保存済みタロット結果が消えない。
- `/tarot/readings` を不要にするまでの移行手順が明確になる。
- バックエンド変更後は `python manage.py test`、フロントエンド変更後は `npm run lint` を確認する方針が含まれている。

