# AIプロンプト: Reflection Chat Reactフロントエンド詳細設計

あなたは LovelyWitch Life のReactフロントエンド担当AIです。
タロット結果の次ページで相談できる `TAROT CONSULT` と、将来の日記Second Selfを見据えたUI設計を作ってください。

## 目的

最初に、タロットで占ったあと、本の結果ページから相談ページへ進み、そのリーディングについて会話できるUIを作る計画を立ててください。
その後、日記本文をもとにした `Second Self / Mirror Self` チャットへ拡張できるようにします。

## 前提

- バックエンドは `ai_prompts/17_diary_second_self_backend_prompt.md` のAPI案を前提にする。
- 最初の実装対象は `TAROT CONSULT`。
- 本UIのページ構成に合わせる。
- スマホでも入力欄、返答、下ナビが被らないようにする。
- 日記Second Selfは次フェーズ。INDEXの3択をすぐ増やさない。
- 日記Second Selfでは、検索用vectorはアプリ側DBに保存される前提で説明する。OpenAI側のVector Storeへ日記全文を預ける説明にしない。

## 調査対象

- `react_frontend/src/App.jsx`
- `react_frontend/src/api.js`
- `react_frontend/src/BookDesign.jsx`
- `react_frontend/src/pages/TarotPages.jsx`
- `react_frontend/src/pages/DiaryBookPage.jsx`
- `react_frontend/src/components/`

## Phase 1: TAROT CONSULT

### 本のページ構成

```text
TAROT INDEX
  -> TAROT DRAW
  -> TAROT CARDS
  -> TAROT MESSAGE
  -> TAROT CONSULT
```

`TAROT MESSAGE` の次ページとして `TAROT CONSULT` を追加する。
`TAROT MESSAGE` には「相談する」ボタンを出してもよいが、通常のページ送りでも進めるようにする。

### UI要素

- 相談対象のリーディング概要
- 短い導入文
- 会話履歴
- 入力欄
- 送信ボタン
- 送信中表示
- エラー表示
- `TAROT MESSAGE` に戻るボタンまたは本の戻るボタン対応

### 相談画面の雰囲気

- 本のページ背景になじむ透明寄りの背景。
- 枠線だけ軽く表示。
- チャット吹き出しは大きすぎず、読みやすく。
- AI返答は占星術/タロット本文と同じくらいの文字サイズ。
- 相談相手として、カード結果を一緒に読み解く落ち着いた画面にする。

### API呼び出し

```text
POST /api/tarot/readings/<id>/consult/
```

リクエスト:

```json
{
  "message": "この結果をどう受け止めたらいい？"
}
```

レスポンス:

```json
{
  "reply": "...",
  "readingId": 3,
  "references": {
    "question": "...",
    "spreadType": "three_card",
    "cards": []
  }
}
```

### 状態管理

- `consultMessages`: user/assistantの配列
- `consultInput`
- `consultSending`
- `consultError`
- `tarotBookReading` がない場合の空状態

`BookDesign.jsx` 内で状態を持つ場合、既存の `tarotBookReading` と同じ文脈で扱う。
重くなりすぎる場合は `TarotConsultPanel` コンポーネントへ分離する。

## Phase 2: タロット相談履歴

バックエンドで履歴保存が入った後に対応する。

API:

```text
GET /api/tarot/readings/<id>/consult/
POST /api/tarot/readings/<id>/consult/
```

UI:

- ページを開いたら過去相談を読み込む。
- 保存済み履歴がある場合は会話として表示する。
- 新しい相談を追記する。

## Phase 3: Diary Second Self / Mirror Self

タロット相談が安定した後に追加する。

### 推奨ルート

```text
/diary/second-self
```

または本UI内:

```text
/bookdesign
```

### 組み込み方針

- INDEXの3択はすぐ増やさない。
- Diary画面内に `Mirror Self` 入口を追加する。
- チャットUI本体は `SecondSelfChat` として分離する。

### UI要素

- 初回説明と同意
- `Build Mirror` / 日記を読み込むボタン
- インデックス状態
- チャット入力
- AI返答
- 参照した日記カード

### 説明文の方針

ユーザーには、次のように説明できるUIにする。

- 日記を短い断片に分け、検索用の記憶としてこのアプリ側に保存する。
- 相談時には、関係がありそうな日記断片だけをAIに渡す。
- 日記全文を毎回AIへ送るわけではない。
- 必要なら記憶の再作成や削除ができる。

避ける説明:

- 「ChatGPTに日記を全部覚えさせます」
- 「OpenAIのVector Storeに日記を保存します」
- 「AIがあなた本人になります」

## コンポーネント案

タロット相談:

```text
src/components/TarotConsultPanel.jsx
src/components/TarotConsultMessage.jsx
```

日記Second Self:

```text
src/pages/SecondSelfPage.jsx
src/components/SecondSelfChat.jsx
src/components/SecondSelfConsent.jsx
src/components/SecondSelfReferences.jsx
```

最初は `TarotConsultPanel` だけ作る。
日記Second Selfのコンポーネントは後続フェーズでよい。

## スマホ要件

- 375px幅で横スクロールしない。
- 本の下ナビと入力欄が被らない。
- 入力欄は固定しすぎない。
- キーボード表示時でも最新メッセージと入力欄が見える。
- 長いAI返答はページ内で自然にスクロールできる。
- 送信ボタンは押しやすいサイズにする。
- `TAROT MESSAGE` から `TAROT CONSULT` への導線が分かりやすい。

## 空状態

`tarotBookReading` がない場合:

- 「先にカードを引くと、ここで結果について相談できます」
- `TAROT DRAW` へ戻る導線を出す。

相談履歴がまだない場合:

- 例文チップを出す。

例:

- この結果をどう受け止めたらいい？
- 今の私ができる小さな一歩は？
- このカードの前向きな意味を知りたい

## エラー状態

- API失敗
- ログイン切れ
- readingが見つからない
- 他ユーザーのreading
- OpenAIキー未設定

怖くない短い言葉で表示し、再試行できるようにする。

## 受け入れ条件

- `TAROT MESSAGE` の次に `TAROT CONSULT` ページがある。
- 保存済み `TarotReading` を文脈に相談できる。
- AI返答がチャット画面に表示される。
- 本UIの下ナビと相談入力欄が被らない。
- スマホで破綻しない。
- 将来、日記Second Selfを同じReflection Chat思想で追加できる。
- `npm run lint` が通る。

## 実装順

1. `BookDesign.jsx` のタロットページ構成を確認。
2. `TarotConsultPanel` を作る。
3. `TAROT CONSULT` ページを追加。
4. `POST /api/tarot/readings/<id>/consult/` へ接続。
5. 空状態、送信中、エラー状態を整える。
6. スマホCSSを調整。
7. `npm run lint` を実行。
8. 履歴保存対応はバックエンド実装後に追加する。
