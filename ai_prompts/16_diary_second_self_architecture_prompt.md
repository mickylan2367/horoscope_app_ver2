# AIプロンプト: Reflection Chat全体アーキテクチャ設計

あなたは LovelyWitch Life の新機能設計担当AIです。
このプロンプトでは、タロット結果から相談できるチャット機能と、日記本文から「もう一人の自分」と話すチャット機能を、同じ思想で拡張できる全体アーキテクチャとして設計してください。

## 目的

LovelyWitch Life に、ユーザーが自分の記録や占い結果をもとに対話できる機能を追加します。
最初に実装するのは、タロットで占った後、結果画面の次ページでそのリーディングについて相談できる `TAROT CONSULT` です。
その後、日記本文を検索して、過去の自分の言葉を参照しながら話せる `Second Self / Mirror Self` へ拡張します。

## 元要望

- タロットで占った後、結果画面から相談するボタンを次のページに表示したい。
- そのページで、タロット結果についてお話しできるようにしたい。
- 日記アプリに保存された日記の文章を使って、もう一人の自分と話す機能も作りたい。
- LoRAやファインチューニングは不要。
- 日記側は検索モデル、つまりRAG寄りの構成にする。
- 日記側の検索vectorはOpenAI Vector Storeへ預けるのではなく、まずアプリ側のDjango DBで管理する。

## 重要な設計判断

### 最初に作るもの

タロット相談を先に作る。

理由:

- `TarotReading` には、質問、カード、スプレッド、AI解釈がすでにまとまっている。
- 日記RAGよりDB変更と検索設計が軽い。
- 本のページ構成に自然に追加できる。
- 体験として `Draw -> Cards -> Message -> Consult` が分かりやすい。

### 日記Second Selfとの関係

タロット相談と日記Second Selfは、最初は分ける。
ただし、将来的には同じ `Reflection Chat` 基盤で扱えるようにする。

```text
Reflection Chat
  - Tarot Consult: TarotReadingを文脈にした相談
  - Diary Second Self: DiaryMemoryChunkを検索して文脈にした相談
  - Future: TarotReading + DiaryMemoryChunkを混ぜた相談
```

### 日記vectorの管理方針

日記Second Selfでは、検索用vectorをこちらのアプリ側で用意して管理する。

```text
日記本文
  -> チャンク化
  -> OpenAI embeddings APIでvector作成
  -> Django DBへ保存
  -> 相談文もembedding化
  -> Django側で近いチャンクを検索
  -> 関連チャンクだけChat Completions/Responsesへ渡す
```

初期実装では、OpenAI Vector Store / File Searchへ日記全文を預けない。
理由は、日記が強いプライベート情報であり、ユーザー単位の削除、再インデックス、検索範囲制御をアプリ側で明確に持ちたいから。

将来、日記件数やユーザー数が増えて検索性能が問題になった場合は、検索部分だけ以下へ差し替える余地を残す。

```text
SQLite JSONField + Python cosine similarity
  -> PostgreSQL + pgvector
  -> 必要なら外部Vector DB
  -> 最後の候補としてOpenAI Vector Store
```

## 関連プロンプト

- `ai_prompts/17_diary_second_self_backend_prompt.md`
- `ai_prompts/18_diary_second_self_frontend_prompt.md`
- `ai_prompts/13_bookdesign_tarot_index_prompt.md`
- `ai_prompts/14_tarot_readings_in_diary_list_prompt.md`
- `ai_prompts/50_effective_efficient_frontend.md`
- `ai_prompts/60_effective_efficient_backend.md`

## 調査してほしいファイル

バックエンド:

- `django_backend/chart/models.py`
- `django_backend/chart/views.py`
- `django_backend/chart/urls.py`
- `django_backend/chart/tests.py`
- `django_backend/diaryapp/models.py`
- `django_backend/diaryapp/views.py`
- `django_backend/horoscope/urls.py`
- `django_backend/horoscope/settings.py`

フロントエンド:

- `react_frontend/src/App.jsx`
- `react_frontend/src/api.js`
- `react_frontend/src/BookDesign.jsx`
- `react_frontend/src/pages/TarotPages.jsx`
- `react_frontend/src/pages/DiaryBookPage.jsx`
- `react_frontend/src/components/`

## 推奨ページ構成

本のタロットページ:

```text
TAROT INDEX
  -> TAROT DRAW
  -> TAROT CARDS
  -> TAROT MESSAGE
  -> TAROT CONSULT
```

`TAROT MESSAGE` を読んだあと、通常のページ送りまたは相談ボタンで `TAROT CONSULT` に進める。
`TAROT CONSULT` は、現在の `TarotReading` を文脈にしてチャットするページにする。

## 推奨バックエンド構成

### Tarot Consult

最小API:

```text
POST /api/tarot/readings/<id>/consult/
GET  /api/tarot/readings/<id>/consult/
```

最小実装では履歴保存なしでもよいが、将来のために保存モデルを検討する。

推奨モデル:

- `TarotConsultSession`
- `TarotConsultMessage`

AIに渡す文脈:

- 元の質問
- スプレッド種別
- 引いたカード名
- 正位置/逆位置
- ポジション
- カードごとの短い解釈
- 保存済みリーディング本文
- ユーザーの相談文

### Diary Second Self

タロット相談の次フェーズとして作る。

最小API:

```text
GET  /api/diary/second-self/status/
POST /api/diary/second-self/reindex/
POST /api/diary/second-self/chat/
```

日記本文をチャンク化し、OpenAI embeddings APIでvectorを作成してDjango DBへ保存する。
質問に近い日記断片はDjango側で検索し、AIへ渡すのは関連チャンクだけにする。

## AI人格設計

### Tarot Consult

- 占い結果を深掘りする相談相手として話す。
- カードの意味を使い、未来を過度に断定しない。
- 良いカードが出ている場合は、前向きな具体的可能性として紡ぐ。
- ユーザーのやりたいことは基本的に後押しする。
- 迷っている場合は、無理に変えず「そのままでいい」と言える。
- 不安を煽らない。

### Diary Second Self

- ユーザー本人ではなく、過去の日記をよく知るもう一人の自分として話す。
- 日記に根拠があることと推測を分ける。
- 日記にない記憶を作らない。
- 参照した日記をユーザーが確認できるようにする。

## 実装フェーズ

### Phase 1: Tarot Consult最小実装

1. 既存 `TarotReading` と保存済みカード構造を確認する。
2. `POST /api/tarot/readings/<id>/consult/` を作る。
3. 履歴保存なしの一問一答でAI応答を返す。
4. `BookDesign.jsx` に `TAROT CONSULT` ページを追加する。
5. `TAROT MESSAGE` の次ページとして相談画面へ進める。
6. `npm run lint` とDjangoテストを確認する。

### Phase 2: Tarot Consult履歴保存

1. `TarotConsultSession` と `TarotConsultMessage` を追加する。
2. `GET /api/tarot/readings/<id>/consult/` で履歴を返す。
3. 相談履歴をページ内に表示する。

### Phase 3: Diary Second Self

1. `DiaryMemoryChunk` を追加する。
2. 日記本文をチャンク化し、アプリ側DBにembeddingを保存する。
3. `status/reindex/chat` APIを作る。
4. 日記画面または本UIに `Mirror Self` 入口を追加する。

### Phase 4: Context Merge

将来的に、タロット相談で日記記憶も参照できるようにする。

例:

```text
このカード結果と最近の日記の傾向を合わせると、私はどう動けばいい？
```

ただし初期実装では混ぜない。

## 受け入れ条件

- 最初の実装対象が `TAROT CONSULT` として明確。
- 日記Second Selfは次フェーズとして残っている。
- タロット相談と日記RAGが将来同じReflection Chat基盤へ合流できる。
- タロット相談は結果画面の次ページとして自然に表示される。
- AIがカード文脈を使って相談に答える。
- ユーザーの記録や相談内容のプライバシーを守る設計になっている。

## 注意

- このプロンプトだけを読んだ段階では、実装しないでください。
- 実装する場合は `17` backend、次に `18` frontend の順で進めてください。
- 日記本文をAIへ送る機能は、必ず説明と同意UIを検討してください。
