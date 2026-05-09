# AIプロンプト: Reflection Chat Djangoバックエンド詳細設計

あなたは LovelyWitch Life のDjangoバックエンド担当AIです。
タロット結果から相談できる `TAROT CONSULT` と、将来の日記Second Selfを見据えたバックエンド設計を作ってください。

## 目的

最初に、保存済みタロット結果 `TarotReading` を文脈にして、ユーザーが相談できるAPIを作る計画を立ててください。
その後、日記本文を検索して「もう一人の自分」と話す機能へ拡張できるようにしてください。

## 前提

- LoRAやファインチューニングは行わない。
- タロット相談は、保存済み `TarotReading` の情報をそのまま文脈として使う。
- 日記Second SelfはRAG構成にするが、タロット相談の後のフェーズでよい。
- 日記Second Selfの検索vectorはOpenAI Vector Storeへ預けず、まずDjango DBで管理する。
- 未ログインユーザーや他ユーザーの結果へアクセスできないようにする。
- 既存OpenAI API呼び出しの方針に合わせる。

## 調査対象

- `django_backend/chart/models.py`
- `django_backend/chart/views.py`
- `django_backend/chart/urls.py`
- `django_backend/chart/tests.py`
- `django_backend/diaryapp/models.py`
- `django_backend/diaryapp/views.py`
- `django_backend/horoscope/urls.py`
- `django_backend/horoscope/settings.py`
- `django_backend/requirements.txt`

## Phase 1: Tarot Consult API

### 最小API

```text
POST /api/tarot/readings/<id>/consult/
```

リクエスト例:

```json
{
  "message": "この結果をどう受け止めたらいい？"
}
```

レスポンス例:

```json
{
  "reply": "このリーディングでは、今すぐ全部を決めるより...",
  "readingId": 3,
  "references": {
    "question": "仕事について",
    "spreadType": "three_card",
    "cards": [
      {
        "name": "The Star",
        "position": "future",
        "isReversed": false
      }
    ]
  }
}
```

### 処理

1. ログイン確認。
2. `TarotReading` がログインユーザーのものか確認。
3. 相談文を検証する。
4. `TarotReading`、関連カード、既存AI解釈を取得する。
5. AIプロンプトを作る。
6. OpenAI APIで返答を生成する。
7. 返答と参照情報を返す。

### AIへ渡す文脈

- 元の質問
- スプレッド種別
- リーディング作成日
- 各カードの名前
- 各カードのポジション
- 正位置/逆位置
- カードごとの意味または保存済み短文
- AIリーディング本文
- ユーザーの相談文

## Phase 2: Tarot Consult履歴保存

最小実装後に追加する。

### 推奨モデル

#### TarotConsultSession

- `id`
- `user`
- `reading`: `ForeignKey(TarotReading, on_delete=models.CASCADE, related_name="consult_sessions")`
- `title`
- `created_at`
- `updated_at`

#### TarotConsultMessage

- `id`
- `session`: `ForeignKey(TarotConsultSession, on_delete=models.CASCADE, related_name="messages")`
- `role`: `user` / `assistant`
- `content`
- `created_at`

### 追加API

```text
GET /api/tarot/readings/<id>/consult/
POST /api/tarot/readings/<id>/consult/
```

`GET` は既存相談履歴を返す。
`POST` は新しい相談を保存し、AI返答も保存する。

## AIプロンプト方針

### Tarot Consult System Prompt

要件:

- あなたはタロット結果を一緒に読み解く相談相手。
- カードの内容と保存済みリーディングを根拠に返答する。
- 未来を断定しない。
- 良いカードがある場合は、カード内容から前向きで具体的な可能性を紡ぐ。
- ユーザーのやりたいことは基本的に後押しする。
- 迷っているときは、無理に変えず「そのままでいい」と伝えてよい。
- 不安を煽らない。
- 医療、法律、金銭、危機対応は断定しない。
- 自傷他害など危機が見える場合は、身近な人や専門窓口への相談を促す。

## Phase 3: Diary Second Self Backend

タロット相談の後に実装する。

### Vector管理方針

日記検索用vectorは、アプリ側で作成・保存・削除・検索する。

```text
Diary本文
  -> plain text化
  -> chunk分割
  -> OpenAI embeddings APIでembedding作成
  -> DiaryMemoryChunk.embeddingへ保存
  -> ユーザーの相談文もembedding化
  -> Django側でcosine similarity検索
  -> 上位チャンクだけAI応答生成へ渡す
```

初期実装ではOpenAI Vector Store / File Searchは使わない。
将来の候補としては残してよいが、日記全文を外部vector storeへ常時保存する設計を初期案にしない。

理由:

- ユーザーごとの検索範囲をDBで明確に制御しやすい。
- インデックス削除、再作成、日記削除連動を実装しやすい。
- AIへ送る日記断片を必要最小限にできる。
- 将来PostgreSQL + pgvectorへ移行しやすい。

### DiaryMemoryChunk

推奨フィールド:

- `id`
- `user`
- `diary`
- `chunk_index`
- `source_date`
- `source_title`
- `text`
- `text_hash`: 日記本文更新時に再embeddingが必要か判定する。
- `embedding`: 初期実装は `JSONField`。SQLiteではPythonで読み出して類似度計算する。
- `embedding_model`: 例 `text-embedding-3-small`。後でモデル変更時に再index判定できるようにする。
- `token_estimate`
- `created_at`
- `updated_at`

### API

```text
GET /api/diary/second-self/status/
POST /api/diary/second-self/reindex/
POST /api/diary/second-self/chat/
DELETE /api/diary/second-self/index/
```

### 検索方針

SQLite初期実装:

- embeddingをDjango DBの `JSONField` に保存。
- Pythonでcosine similarityを計算。
- ログインユーザーのチャンクだけを検索する。
- チャンク数が増えるまではこれでよい。

PostgreSQL移行後:

- pgvectorを使う。
- `user_id` とvector indexを組み合わせる。
- 検索関数のインターフェースは変えず、内部実装だけ差し替える。

OpenAI Vector Store:

- 初期実装では使わない。
- 大規模化、運用負荷、コスト、削除要件を再評価した後の候補に留める。

## セキュリティ

- 未ログインでは使えない。
- 他ユーザーの `TarotReading`、日記、チャンク、セッションへアクセスできない。
- AIに渡す文脈は必要最小限にする。
- エラー時に秘密情報を返さない。
- 日記Second Selfでは、外部AI APIへ日記断片を送ることをフロントで説明できるレスポンス設計にする。
- 日記全文を毎回AIへ送らず、検索で選ばれた関連チャンクだけを送る。

## テスト方針

Phase 1で追加すべきテスト:

- 未ログインでタロット相談APIを使えない。
- 他ユーザーの `TarotReading` で相談できない。
- 自分の `TarotReading` では相談できる。
- 相談文が空なら400を返す。
- OpenAI API失敗時に安全なエラーを返す。
- AIプロンプトにカード、質問、リーディング本文が含まれる。

Phase 3で追加すべきテスト:

- 他ユーザーの日記チャンクが検索されない。
- reindexでチャンクが作成される。
- chat APIが参照日記付きで返る。

## 実装順

1. `TarotReading` と関連カードの既存モデル/APIを調査。
2. `POST /api/tarot/readings/<id>/consult/` を実装。
3. タロット相談用プロンプト生成関数を分離。
4. テストを追加。
5. `python manage.py test chart.tests` または関連テストを実行。
6. 必要なら履歴保存モデルを追加。
7. その後、日記Second Selfのモデル/APIへ進む。

## 受け入れ条件

- タロット結果詳細または本内結果から、同じ `TarotReading` を文脈に相談できる。
- 他ユーザーのリーディングを参照しない。
- 最小実装では履歴なしでも動く。
- 将来履歴保存と日記RAGへ拡張できる。
- フロントエンドが `TAROT CONSULT` ページで使いやすいレスポンスになっている。
