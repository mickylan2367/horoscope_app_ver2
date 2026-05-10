# AIプロンプト: タロット作成・管理画面のReact詳細設計

あなたはReactフロントエンド担当AIです。

## 目的

ユーザーが標準78枚タロットを閲覧し、自分のオラクルカードやタロットカード、デッキを作成・編集・管理できる画面を設計してください。

ユーザーが明示的に「実装して」と依頼するまでは、コード変更はしないでください。

## 前提

バックエンド設計は `ai_prompts/02_tarot_backend_data_model_prompt.md` の詳細モデル案を前提にしてください。

特に以下のデータ構造を前提にUIを設計します。

- `TarotDeck`
- `TarotCard`
- `TarotReading`
- `TarotReadingCard`

このプロンプトでは、主に `TarotDeck` と `TarotCard` を管理するUIを扱います。リーディング画面と保存フローは `04_tarot_reading_flow_prompt.md` の範囲です。

## 対象ファイル

主に調査するファイル:

- `react_frontend/src/App.jsx`
- `react_frontend/src/api.js`
- `react_frontend/src/pages/`
- `react_frontend/src/components/`
- `react_frontend/src/components/Layout.jsx`

参考にするファイル:

- `react_frontend/src/pages/ChartPage.jsx`
- `react_frontend/src/pages/DiaryBookPage.jsx`
- `react_frontend/src/components/CalendarCard.jsx`
- `react_frontend/src/components/DiaryEditorForm.jsx`
- `react_frontend/src/components/CosmicBackground.jsx`

## 画面要件

- 標準78枚のカード一覧を見られる。
- 標準デッキとユーザー作成デッキを切り替えて見られる。
- 標準カードは閲覧専用にする。
- ユーザー作成デッキを追加、編集、削除できる。
- ユーザー作成カードを追加、編集、削除できる。
- カード名、分類、スート、番号、キーワード、正位置、逆位置、画像を扱う。
- オラクルカードのように正逆を使わないカードにも対応する。
- カード数が多くても一覧が重くならない。
- 既存のLovelyWitch Lifeの雰囲気に合うこと。

## 推奨ルート案

以下を基本案として検討してください。

```text
/tarot
/tarot/decks
/tarot/decks/:deckId
/tarot/decks/:deckId/cards/new
/tarot/cards/:cardId/edit
```

役割:

- `/tarot`: タロット機能の入口。標準デッキ、作成デッキ、リーディングへの導線。
- `/tarot/decks`: デッキ一覧。標準デッキと自分のデッキを表示。
- `/tarot/decks/:deckId`: デッキ詳細とカード一覧。
- `/tarot/decks/:deckId/cards/new`: カード作成。
- `/tarot/cards/:cardId/edit`: カード編集。

リーディング系ルートは `04` の範囲として、以下のような導線だけ想定してください。

```text
/tarot/read
/tarot/readings
```

## 推奨ページ構成

### TarotHomePage

目的:

- タロット機能の入口。
- 標準デッキを見る、カードを作る、タロットを引く、履歴を見る、の導線を置く。

表示要素:

- 標準78枚デッキへの導線
- 自分のデッキ一覧への導線
- 新規デッキ作成ボタン
- タロットを引く画面への導線
- 保存履歴への導線

注意:

- ランディングページ風にしすぎず、実用画面としてすぐ操作できる構成にする。
- 既存の宇宙・本・カードの雰囲気は使ってよい。

### TarotDeckListPage

目的:

- 標準デッキと自分のデッキを一覧表示する。

表示要素:

- `System Decks`
- `My Decks`
- デッキ名
- デッキ説明
- `tarot / oracle` の区別
- カード枚数
- 正逆あり/なし
- デッキ作成ボタン

状態:

- ローディング
- 未ログイン
- 自分のデッキがない空状態
- APIエラー

注意:

- 標準デッキは削除・編集不可。
- ユーザーデッキだけ編集・削除可能。
- 未ログインでも標準デッキは閲覧できる案を検討する。

### TarotDeckDetailPage

目的:

- 1つのデッキに含まれるカード一覧を見る。

表示要素:

- デッキヘッダー
- デッキ説明
- カード数
- `allow_reversed`
- カード検索
- `Major / Minor / Oracle` フィルタ
- スートフィルタ
- キーワード検索
- カード一覧
- ユーザーデッキの場合はカード追加ボタン

カード一覧の表示:

- 画像またはプレースホルダー
- カード名
- 分類
- スート
- 番号
- キーワード
- 正位置の短い抜粋
- 逆位置の有無

性能注意:

- 標準78枚を一度に描画しても破綻しないが、画像がある場合は `loading="lazy"` を使う。
- カード一覧は検索・フィルタ結果を `useMemo` で計算する。
- カード本文の全文を一覧に出さず、詳細または編集画面で表示する。
- 画像サイズ枠を固定してレイアウトシフトを避ける。

### TarotDeckEditor

目的:

- ユーザーデッキの作成・編集。

フォーム項目:

- `name`
- `description`
- `deck_type`: `tarot / oracle`
- `allow_reversed`

UI:

- `deck_type` はセグメントまたはselect。
- `allow_reversed` はtoggleまたはcheckbox。
- `deck_type="oracle"` の場合は `allow_reversed=false` を推奨し、UI上でも説明する。

バリデーション:

- `name` 必須。
- `description` は任意。
- 標準デッキは編集不可。

### TarotCardEditorPage

目的:

- ユーザー作成カードの追加・編集。

フォーム項目:

- `deckId`
- `name`
- `arcana`: `major / minor / oracle`
- `suit`: `cups / pentacles / swords / wands / none`
- `number`
- `keywords`
- `upright_meaning`
- `reversed_meaning`
- `image`
- `order`

UIルール:

- `arcana="major"` の場合、`suit` は `none` または非表示。
- `arcana="minor"` の場合、`suit` を必須にする。
- `arcana="oracle"` の場合、`suit` は `none`、`number` は任意。
- デッキの `allow_reversed=false` の場合、`reversed_meaning` は任意または非表示。
- `keywords` はカンマ区切り入力またはタグ入力。
- 画像は初回実装に含めない場合でも、プレースホルダーと将来のアップロード欄の設計を出す。

バリデーション:

- `name` 必須。
- `arcana` 必須。
- `upright_meaning` 必須。
- `minor` の場合は `suit` 必須。
- `number` は整数、空も許可。
- `order` は0以上の整数。
- 画像アップロードを扱う場合はファイル形式とサイズ制限を設ける。

## 推奨コンポーネント分割

以下の分割を検討してください。

```text
src/pages/TarotHomePage.jsx
src/pages/TarotDeckListPage.jsx
src/pages/TarotDeckDetailPage.jsx
src/pages/TarotCardEditorPage.jsx

src/components/tarot/TarotDeckCard.jsx
src/components/tarot/TarotDeckForm.jsx
src/components/tarot/TarotCardGrid.jsx
src/components/tarot/TarotCardPreview.jsx
src/components/tarot/TarotCardForm.jsx
src/components/tarot/TarotFilters.jsx
src/components/tarot/TarotEmptyState.jsx
```

注意:

- 既存の `components/` 直下に大量追加して混雑させるより、`components/tarot/` を作る案がよい。
- ただし既存プロジェクトの慣例に合わせ、過剰に分けすぎないこと。

## API呼び出し案

`apiFetch` を使う前提で設計してください。

使用する主なエンドポイント:

```text
GET    /api/tarot/decks/
POST   /api/tarot/decks/
GET    /api/tarot/decks/<id>/
PUT    /api/tarot/decks/<id>/
DELETE /api/tarot/decks/<id>/

GET    /api/tarot/decks/<id>/cards/
POST   /api/tarot/cards/
GET    /api/tarot/cards/<id>/
PUT    /api/tarot/cards/<id>/
DELETE /api/tarot/cards/<id>/
```

デッキ一覧レスポンスの想定:

```json
{
  "systemDecks": [
    {
      "id": 1,
      "name": "Default Tarot",
      "description": "...",
      "deckType": "tarot",
      "isSystem": true,
      "allowReversed": true,
      "cardCount": 78
    }
  ],
  "myDecks": []
}
```

カード一覧レスポンスの想定:

```json
{
  "deck": {
    "id": 1,
    "name": "Default Tarot",
    "deckType": "tarot",
    "isSystem": true,
    "allowReversed": true
  },
  "cards": [
    {
      "id": 1,
      "name": "The Fool",
      "arcana": "major",
      "suit": "none",
      "number": 0,
      "keywords": ["beginning", "freedom"],
      "uprightMeaning": "...",
      "reversedMeaning": "...",
      "image": "",
      "order": 0
    }
  ]
}
```

## 画像アップロード方針

初回実装で画像アップロードを含める場合:

- `FormData` を使う。
- `apiFetch` は `FormData` の場合 `Content-Type` を自動設定しない作りなので、そのまま使える。
- JPEG / PNG / WebP に制限する。
- サイズ上限をバックエンドと合わせる。
- プレビュー表示を用意する。
- 画像枠は固定比率にする。

初回実装で画像アップロードを含めない場合:

- 画像欄はプレースホルダーのみ。
- `image` / `imageUrl` フィールドは表示だけ対応する。
- 後からアップロード対応できるよう、カードプレビューのレイアウトは画像あり前提で作る。

## UX要件

### 一覧

- デッキ一覧はカード型UIでよい。
- カード一覧はグリッド表示が基本。
- 78枚を扱うため、検索とフィルタは必須。
- カード本文の全文表示は避ける。
- 大量画像がある場合に備えてlazy loadを使う。

### 編集

- 保存ボタンは明確にする。
- 編集中に標準カードを変更できないようにする。
- 削除操作には確認モーダルまたは確認ステップを入れる。
- 保存成功後はデッキ詳細へ戻る案が自然。

### 空状態

- 自分のデッキがない場合は「Create Deck」導線を出す。
- カードがないユーザーデッキでは「Add Card」導線を出す。
- 未ログインの場合は標準デッキ閲覧とログイン導線を分ける。

### エラー状態

- APIエラーは画面上部またはフォーム直上に表示。
- バリデーションエラーは該当項目付近に表示。
- 権限エラーの場合は「このデッキは編集できません」という表示にする。

## モバイル対応方針

- デッキ一覧は1カラムから始める。
- カード一覧はモバイル1カラム、タブレット2カラム、デスクトップ3〜4カラム。
- フィルタはモバイルでは折りたたみ、または横スクロールのチップにする。
- 編集フォームは縦積みにする。
- 画像プレビューとフォームが横並びになるのはデスクトップだけにする。

## LovelyWitch Lifeの見た目方針

- 既存の宇宙背景、淡いピンク、ラベンダー、深いネイビーの雰囲気に合わせる。
- ただし画面全体を装飾過多にせず、カード管理画面として操作しやすくする。
- カードは角丸8px前後を基本にし、既存UIと合う場合のみ少し大きくしてよい。
- ボタンはlucide iconを使えるなら使う。
- フォーム内の見出しは大きくしすぎない。
- 画面内説明文を増やしすぎず、入力ラベルと状態で分かるUIにする。

## 実装時の確認手順

実装依頼があった場合は、以下を確認してください。

1. `react_frontend/` で `npm run lint`
2. 標準デッキ一覧が表示される。
3. 標準カードが編集不可で表示される。
4. ユーザーデッキを作成できる。
5. ユーザーカードを作成できる。
6. ユーザーカードを編集できる。
7. ユーザーカードを削除できる。
8. オラクルデッキで逆位置欄が邪魔にならない。
9. モバイル幅でカード一覧とフォームが崩れない。

## 実装前にユーザーへ確認すべき仕様

必ず確認:

1. 独自カード作成を初回リリースに含めるか。
2. 画像アップロードを初回リリースに含めるか。
3. 標準78枚カードは閲覧専用でよいか。
4. オラクルカードでは逆位置を完全に非表示にするか、任意入力にするか。

できれば確認:

- カード名や解釈文は日本語中心か英語併記か。
- キーワードはタグ入力にするか、カンマ区切りで十分か。
- デッキ削除時にカードも削除してよいか。

## 出力形式

このプロンプトを読んだAIは、まず以下を出力してください。

1. 現状調査結果
2. ルート案
3. ページ構成案
4. コンポーネント分割案
5. API呼び出し案
6. フォーム設計
7. 画像アップロード方針
8. 状態・エラー・空表示
9. モバイル対応
10. 実装前の確認事項

実装依頼がない限り、コード変更はしないでください。
