# AIプロンプト: タロット新機能の全体詳細設計

あなたは `C:\Users\Owner\OneDrive\horoscope_project` の開発支援AIです。

## 目的

このプロジェクトに「タロット作成・管理画面」と「タロットを引く画面」を追加するための全体計画を作ってください。

このプロンプトでは、実装前の全体設計、フェーズ分け、責務分割、データ設計、API設計、画面設計、テスト方針、確認事項を整理します。

ユーザーが明示的に「実装して」と依頼するまでは、コード変更、マイグレーション作成、データ投入、Reactファイル追加はしないでください。

## 元要望

- デフォルト78枚のタロットとその解釈を用意する。
- ユーザーが追加のオラクルカードやタロットカードを作成できるようにする。
- ユーザーがタロットを引き、結果を保存できるようにする。
- 保存できる結果は例として `1 User 50 Result` までにする。
- 絶対に残したいタロット結果を星マークなどで固定できるようにする。
- 固定されていない結果は、上限超過時に古いものから削除する。
- Pro Planで保存上限を緩和・撤廃する案も将来検討する。

## 関連プロンプト

このプロンプトは全体設計用です。詳細設計では以下も参照してください。

- `ai_prompts/02_tarot_backend_data_model_prompt.md`
- `ai_prompts/03_tarot_card_creation_ui_prompt.md`
- `ai_prompts/04_tarot_reading_flow_prompt.md`

この `01` では全体像をまとめ、`02` ではDjangoモデル/API、`03` ではカード・デッキ作成UI、`04` ではリーディング画面・保存フローを深掘りします。

## 現状調査対象

バックエンド:

- `django_backend/chart/models.py`
- `django_backend/chart/views.py`
- `django_backend/chart/urls.py`
- `django_backend/chart/tests.py`
- `django_backend/horoscope/urls.py`
- `django_backend/diaryapp/models.py`
- `django_backend/diaryapp/views.py`
- `django_backend/users/models.py`

フロントエンド:

- `react_frontend/src/App.jsx`
- `react_frontend/src/api.js`
- `react_frontend/src/pages/`
- `react_frontend/src/components/`
- `react_frontend/src/components/Layout.jsx`

参考UI:

- `react_frontend/src/pages/ChartPage.jsx`
- `react_frontend/src/pages/DiaryBookPage.jsx`
- `react_frontend/src/components/CalendarCard.jsx`
- `react_frontend/src/components/DiaryEditorForm.jsx`
- `react_frontend/src/components/CosmicBackground.jsx`

## 配置方針

タロット機能は `django_backend/chart/` app に置く前提で設計してください。

理由:

- タロットは日記ではなく占術・リーディング機能である。
- 既存の `chart` app には `HoroscopeResult` と `HoroscopeProfile` があり、占術結果や占術プロフィールを扱っている。
- `diaryapp` に置くと、日記本文・日記画像・タロットカード・タロット履歴が混ざり、責務が曖昧になる。

Diary連携は将来機能として考え、初期実装ではDBレベルで強く結合しないでください。

## 機能分割案

大きく以下の4領域に分けて設計してください。

### 1. 標準タロットデータ

目的:

- デフォルト78枚のタロットカードを保持する。
- カード名、分類、スート、番号、キーワード、正位置解釈、逆位置解釈、画像を扱えるようにする。

必要なもの:

- 標準デッキ
- 標準カード78枚
- 初期データ投入手段
- 標準カード閲覧API
- 標準カード閲覧UI

### 2. デッキ・カード作成管理

目的:

- ユーザーが独自のタロットデッキやオラクルデッキを作れるようにする。
- ユーザーがカードを追加・編集・削除できるようにする。

必要なもの:

- デッキ一覧
- デッキ詳細
- デッキ作成/編集
- カード一覧
- カード作成/編集/削除
- 権限制御

### 3. タロットを引く画面

目的:

- ユーザーがデッキを選び、カードを引けるようにする。
- 最初は1枚引きと3枚引きを中心にする。

必要なもの:

- デッキ選択
- スプレッド選択
- 質問文入力
- 正逆ON/OFF
- カード抽選
- 結果表示
- 保存導線

### 4. 保存履歴・星固定・上限管理

目的:

- ユーザーがリーディング結果を保存できる。
- 残したい結果を星固定できる。
- 通常ユーザーは最大50件までにし、上限超過時は未固定の古い結果を削除する。

必要なもの:

- 履歴一覧
- 履歴詳細
- メモ編集
- 星固定切り替え
- 削除
- 上限超過処理
- 将来のPro Plan拡張余地

## 推奨Djangoモデル全体像

以下の4モデルを基本案として検討してください。

詳細は `02_tarot_backend_data_model_prompt.md` を参照してください。

```text
TarotDeck
TarotCard
TarotReading
TarotReadingCard
```

### TarotDeck

役割:

- 標準デッキとユーザー作成デッキを表す。

主要フィールド:

- `user`
- `name`
- `description`
- `deck_type`: `tarot / oracle`
- `is_system`
- `allow_reversed`
- `created_at`
- `updated_at`

### TarotCard

役割:

- デッキに属するカードを表す。

主要フィールド:

- `deck`
- `user`
- `name`
- `arcana`: `major / minor / oracle`
- `suit`: `cups / pentacles / swords / wands / none`
- `number`
- `keywords`
- `upright_meaning`
- `reversed_meaning`
- `image` または `image_url`
- `order`

### TarotReading

役割:

- 1回のリーディング結果を表す。

主要フィールド:

- `user`
- `deck`
- `spread_type`: `one_card / three_card / custom`
- `question`
- `memo`
- `is_pinned`
- `created_at`
- `updated_at`

### TarotReadingCard

役割:

- リーディングで引いた各カードと、その時点の解釈スナップショットを表す。

主要フィールド:

- `reading`
- `card`
- `position`
- `position_label`
- `is_reversed`
- `card_name_snapshot`
- `meaning_snapshot`
- `image_snapshot`

重要:

- `meaning_snapshot` を必ず検討すること。
- 後からカード解釈を編集しても、過去のリーディング履歴が変わらないようにする。

## 推奨API全体像

Reactから扱いやすいJSON APIとして、以下を基本案にしてください。

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

POST   /api/tarot/readings/draw/
GET    /api/tarot/readings/
GET    /api/tarot/readings/<id>/
PATCH  /api/tarot/readings/<id>/
DELETE /api/tarot/readings/<id>/
```

方針:

- 抽選はバックエンド側で行う。
- 保存結果にはカード名・解釈・画像のスナップショットを入れる。
- `PATCH /api/tarot/readings/<id>/` では `isPinned` と `memo` だけ変更可能にする。
- カード内容や抽選結果は履歴側では後から変更しない。

## 推奨Reactルート全体像

以下を基本案として検討してください。

```text
/tarot
/tarot/decks
/tarot/decks/:deckId
/tarot/decks/:deckId/cards/new
/tarot/cards/:cardId/edit
/tarot/read
/tarot/readings
/tarot/readings/:readingId
```

役割:

- `/tarot`: タロット入口
- `/tarot/decks`: デッキ管理
- `/tarot/decks/:deckId`: カード一覧
- `/tarot/decks/:deckId/cards/new`: カード作成
- `/tarot/cards/:cardId/edit`: カード編集
- `/tarot/read`: タロットを引く
- `/tarot/readings`: 保存履歴
- `/tarot/readings/:readingId`: 保存結果詳細

## 推奨Reactページ構成

```text
src/pages/TarotHomePage.jsx
src/pages/TarotDeckListPage.jsx
src/pages/TarotDeckDetailPage.jsx
src/pages/TarotCardEditorPage.jsx
src/pages/TarotReadingPage.jsx
src/pages/TarotReadingHistoryPage.jsx
src/pages/TarotReadingDetailPage.jsx
```

推奨コンポーネント:

```text
src/components/tarot/TarotDeckCard.jsx
src/components/tarot/TarotDeckForm.jsx
src/components/tarot/TarotCardGrid.jsx
src/components/tarot/TarotCardPreview.jsx
src/components/tarot/TarotCardForm.jsx
src/components/tarot/TarotFilters.jsx
src/components/tarot/TarotSpreadSelector.jsx
src/components/tarot/TarotReadingResult.jsx
src/components/tarot/TarotReadingHistoryCard.jsx
src/components/tarot/TarotEmptyState.jsx
```

注意:

- 既存 `components/` 直下を混雑させないため、`components/tarot/` を検討する。
- ただし過剰な分割は避ける。

## デフォルト78枚カードデータの持ち方

標準78枚はDBに入れる設計にしてください。

推奨:

```text
django_backend/chart/data/default_tarot.json
django_backend/chart/management/commands/seed_default_tarot.py
```

理由:

- 初期投入、再投入、更新、重複回避を管理しやすい。
- fixtureより運用説明がしやすい。
- 標準カード解釈文の更新に対応しやすい。

データ項目:

- `deck_slug`
- `name`
- `arcana`
- `suit`
- `number`
- `order`
- `keywords`
- `upright_meaning`
- `reversed_meaning`
- `image`

## 保存上限50件と星固定の削除ルール

通常ユーザーは `TarotReading` を最大50件まで保存できる想定にしてください。

将来Pro Planを入れやすくするため、上限は関数化してください。

```python
def get_tarot_reading_limit(user):
    return 50
```

保存後の処理:

```text
1. TarotReadingを保存する
2. userの保存件数を確認する
3. 上限以内なら完了
4. 上限超過なら is_pinned=False の古い結果から削除
5. 未固定の削除対象がない場合は保存拒否、またはピン解除を促す
```

推奨仕様:

- 固定済みが50件に達している場合、新規保存は拒否する。
- エラーメッセージで「星固定を外してください」と案内する。

## Pro Planを入れる場合の拡張余地

初期実装では課金モデルを作り込まないでください。

ただし以下の拡張余地を残してください。

- `get_tarot_reading_limit(user)` を通して上限を決める。
- APIレスポンスに `limit` と `remaining` を返す。
- フロントでは保存可能件数を表示できる設計にする。
- 将来 `user.plan`、`Profile`、`Subscription` などを参照できるようにする。

## 最小実装フェーズ

### Phase 1: 基盤

- Djangoモデル追加
- マイグレーション
- 標準78枚データ投入コマンド
- デッキ/カード取得API
- 最低限のモデルテスト

### Phase 2: デッキ・カード閲覧

- `/tarot`
- `/tarot/decks`
- `/tarot/decks/:deckId`
- 標準デッキ閲覧
- 標準カード一覧

### Phase 3: リーディング保存

- `/tarot/read`
- 1枚引き
- 3枚引き
- 正逆ON/OFF
- 質問文
- 保存
- スナップショット保存

### Phase 4: 履歴・星固定

- `/tarot/readings`
- `/tarot/readings/:readingId`
- メモ編集
- 星固定
- 50件上限
- 未固定の古い結果の自動削除

### Phase 5: ユーザー作成デッキ

- デッキ作成/編集/削除
- カード作成/編集/削除
- オラクルカード対応

## 後回しにできるもの

- 独自カード画像アップロード
- 独自デッキ共有
- 自由枚数スプレッド
- Diary連携
- Pro Plan
- カード解釈のAI生成
- 高度なカード並び替えUI
- カード画像生成

## テスト方針

バックエンド:

- `python manage.py test`
- モデル作成テスト
- 標準78枚投入テスト
- API権限テスト
- リーディング保存テスト
- 星固定切り替えテスト
- 51件目保存時の削除テスト
- 固定済み50件時の保存拒否テスト
- 他人のデータを編集・削除できないテスト

フロントエンド:

- `npm run lint`
- ルート表示確認
- デッキ一覧表示
- カード一覧検索・フィルタ
- リーディング実行
- 保存履歴表示
- 星固定切り替え
- モバイル幅確認

## 実装前にユーザーへ確認すべき仕様

必ず確認:

1. 初回リリースで1枚引きだけにするか、3枚引きまで入れるか。
2. 標準78枚はライダー版ベースでよいか。
3. 標準カード解釈文は日本語中心でよいか、英語併記が必要か。
4. 独自カード作成を初回リリースに含めるか。
5. 画像アップロードを初回リリースに含めるか。
6. ピン済みが50件に達している場合、新規保存拒否でよいか。

できれば確認:

- 逆位置をデフォルトONにするか。
- 3枚引きのラベルを `Past / Present / Future` にするか、日本語にするか。
- 結果をDiaryへ送る導線が必要か。
- オラクルカードでは逆位置欄を完全に非表示にするか。
- キーワード入力はタグ型かカンマ区切りでよいか。

## 出力してほしいもの

このプロンプトを読んだAIは、まず以下を出力してください。

1. 現状調査結果
2. 既存構造に合わせた機能分割案
3. Djangoモデル全体案
4. APIエンドポイント案
5. Reactページ・ルート案
6. デフォルト78枚カードデータの持ち方
7. 保存上限50件と星固定の削除ルール
8. Pro Planを入れる場合の拡張余地
9. 最小実装フェーズと後回しにできるフェーズ
10. 必要なテスト一覧
11. 実装前にユーザーへ確認すべき仕様

## 制約

- このプロンプトではコード変更しないこと。
- DBマイグレーションが必要な箇所を明示すること。
- 既存の占星術・日記機能と衝突しないルーティング案にすること。
- 既存の未コミット変更を勝手に戻さないこと。
- 全体設計に留め、詳細実装は `02`、`03`、`04` に分けて扱うこと。
