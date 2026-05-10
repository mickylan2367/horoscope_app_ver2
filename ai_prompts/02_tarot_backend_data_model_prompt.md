# AIプロンプト: タロット機能のDjangoモデル・API詳細設計

あなたはDjangoバックエンド担当AIです。

## 目的

タロットカード、標準78枚デッキ、ユーザー作成デッキ、ユーザー作成カード、タロット結果保存、星固定、保存上限管理を実現するためのDjango側設計を作ってください。

ユーザーが明示的に「実装して」と依頼するまでは、コード変更、マイグレーション作成、fixture作成、データ投入はしないでください。

## この設計の基本方針

タロット機能は `django_backend/chart/` app に置く方針で検討してください。

理由:

- タロットは日記ではなく占術・リーディング機能である。
- 既存の `chart` app には `HoroscopeResult` と `HoroscopeProfile` があり、占術結果や占術プロフィールを扱っている。
- `diaryapp` は日記本文、日記画像、プロフィール周辺が中心であり、タロットのカード・デッキ・リーディング履歴を置くと責務が混ざる。

ただし、Diary連携を将来入れる場合は、タロット結果から日記作成へリンクする程度に留め、最初からDBレベルで強く結合しない設計にしてください。

## 対象ファイル

主に調査するファイル:

- `django_backend/chart/models.py`
- `django_backend/chart/views.py`
- `django_backend/chart/urls.py`
- `django_backend/chart/tests.py`
- `django_backend/horoscope/urls.py`
- `django_backend/users/models.py`
- `django_backend/diaryapp/models.py`

必要なら確認するファイル:

- `react_frontend/src/api.js`
- `react_frontend/src/App.jsx`
- `react_frontend/src/pages/`

## 必須要件

- 標準タロット78枚を保持できること。
- 標準デッキとユーザー作成デッキを区別できること。
- カードには最低限、名前、分類、大アルカナ/小アルカナ/オラクル、スート、番号、キーワード、正位置解釈、逆位置解釈、画像パスまたは画像URLを持たせること。
- オラクルカードのように正逆を使わないカードにも対応できること。
- ユーザーが独自デッキまたは独自カードを追加できること。
- タロット結果はユーザー単位で保存できること。
- 保存結果は通常ユーザーでは最大50件に制限すること。
- 星固定された結果は自動削除対象から外すこと。
- 上限超過時は、固定されていない古い結果から削除すること。
- 固定結果だけで50件を超えた場合の扱いを提案すること。
- 将来Pro Planで保存上限を変更できる余地を残すこと。

## 推奨モデル案

以下の4モデルを基本案として検討してください。

### TarotDeck

デッキ単位の情報を持つモデル。

推奨フィールド:

- `id`
- `user`: `ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name="tarot_decks")`
- `name`: `CharField`
- `description`: `TextField(blank=True)`
- `deck_type`: `CharField(choices=[tarot, oracle])`
- `is_system`: `BooleanField(default=False, db_index=True)`
- `allow_reversed`: `BooleanField(default=True)`
- `created_at`
- `updated_at`

設計意図:

- `user=None` かつ `is_system=True` のものを標準デッキにする。
- ユーザー作成デッキは `user=request.user`、`is_system=False` にする。
- オラクルカードは `deck_type="oracle"`、`allow_reversed=False` を初期値にする案がよい。

制約案:

- 標準デッキ名の重複を防ぐ制約。
- ユーザーごとのデッキ名重複を防ぐかはUI要件次第。最初は許容でもよい。

### TarotCard

カード単位の情報を持つモデル。

推奨フィールド:

- `id`
- `deck`: `ForeignKey(TarotDeck, on_delete=models.CASCADE, related_name="cards")`
- `user`: `ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name="tarot_cards")`
- `name`: `CharField`
- `arcana`: `CharField(choices=[major, minor, oracle])`
- `suit`: `CharField(choices=[cups, pentacles, swords, wands, none], blank=True)`
- `number`: `IntegerField(null=True, blank=True)`
- `keywords`: `JSONField(default=list, blank=True)` または `TextField(blank=True)`
- `upright_meaning`: `TextField`
- `reversed_meaning`: `TextField(blank=True)`
- `image`: `ImageField(upload_to="tarot_cards/%Y/%m/", blank=True)` または `image_url`
- `order`: `PositiveIntegerField(default=0, db_index=True)`
- `created_at`
- `updated_at`

設計意図:

- 標準カードは `deck.is_system=True` のデッキに属し、`user=None`。
- ユーザー作成カードは `user=request.user` を持つ。
- `arcana="oracle"` の場合は `suit="none"`、`number` は任意。
- `keywords` はUIでタグとして扱うなら `JSONField(default=list)` が扱いやすい。
- 画像アップロードを初回実装に含めない場合でも、将来に備えて `image` または `image_url` の設計は決めておくこと。

制約案:

- 同一デッキ内で `order` と `name` の扱いを整理する。
- 標準78枚では `arcana/suit/number` の整合性をテストで担保する。

### TarotReading

1回のリーディング結果を保存するモデル。

推奨フィールド:

- `id`
- `user`: `ForeignKey(User, on_delete=models.CASCADE, related_name="tarot_readings")`
- `deck`: `ForeignKey(TarotDeck, null=True, blank=True, on_delete=models.SET_NULL, related_name="readings")`
- `spread_type`: `CharField(choices=[one_card, three_card, custom])`
- `question`: `TextField(blank=True)`
- `memo`: `TextField(blank=True)`
- `is_pinned`: `BooleanField(default=False, db_index=True)`
- `created_at`: `DateTimeField(auto_now_add=True, db_index=True)`
- `updated_at`

設計意図:

- 通常ユーザーの保存上限はこのモデルの件数で数える。
- `deck` は削除されても履歴を残せるよう `SET_NULL` を検討する。
- `question` はユーザーが占う前に入力する質問。
- `memo` は結果保存後の自分用メモ。

### TarotReadingCard

リーディングに含まれる各カードのスナップショットを保存するモデル。

推奨フィールド:

- `id`
- `reading`: `ForeignKey(TarotReading, on_delete=models.CASCADE, related_name="cards")`
- `card`: `ForeignKey(TarotCard, null=True, blank=True, on_delete=models.SET_NULL, related_name="reading_cards")`
- `position`: `PositiveIntegerField`
- `position_label`: `CharField(max_length=80, blank=True)`
- `is_reversed`: `BooleanField(default=False)`
- `card_name_snapshot`: `CharField`
- `meaning_snapshot`: `TextField`
- `image_snapshot`: `CharField(blank=True)`

設計意図:

- 後からカード解釈やカード画像を編集しても、過去のリーディング結果が変わらないようにする。
- `meaning_snapshot` には、引いた向きに応じて `upright_meaning` または `reversed_meaning` を保存する。
- `card_name_snapshot` と `image_snapshot` も保存しておくと、カード削除後も履歴表示が壊れにくい。

制約案:

- `UniqueConstraint(fields=["reading", "position"])`
- `ordering = ["position"]`

## 保存上限ロジック案

通常ユーザーは `TarotReading` を最大50件まで保存できる想定にしてください。

ただし、将来Pro Planを入れやすくするため、50を直接あちこちに書かず、以下のような関数に寄せる設計を提案してください。

```python
def get_tarot_reading_limit(user):
    return 50
```

将来はここで `user.plan`、`Profile`、別のSubscriptionモデルなどを見る余地を残します。

保存後の削除ルール:

1. `TarotReading.objects.filter(user=user).count()` を確認する。
2. 上限以下なら何もしない。
3. 上限超過なら `is_pinned=False` の古い結果から削除する。
4. 削除対象は `created_at` 昇順。
5. `is_pinned=True` だけで上限を超えている場合は、以下のどちらかを提案する。

推奨案:

- 新規保存は許可する。
- 未固定の古い結果があれば削除する。
- 未固定がなく上限超過になる場合は保存を拒否し、「星固定を外してください」と返す。

代替案:

- 固定済みは50件を超えても許可し、未固定だけ最大50件にする。
- ただしDB削減という元要望とはずれるため、初期仕様としては非推奨。

## API案

Reactから扱いやすいJSON APIを設計してください。

推奨エンドポイント:

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

### `POST /api/tarot/readings/draw/` の契約案

リクエスト例:

```json
{
  "deckId": 1,
  "spreadType": "three_card",
  "question": "今の私に必要なメッセージは？",
  "memo": "",
  "allowReversed": true,
  "save": true
}
```

レスポンス例:

```json
{
  "id": 123,
  "deck": {
    "id": 1,
    "name": "Default Tarot"
  },
  "spreadType": "three_card",
  "question": "今の私に必要なメッセージは？",
  "memo": "",
  "isPinned": false,
  "createdAt": "2026-05-07T12:00:00Z",
  "cards": [
    {
      "position": 1,
      "positionLabel": "Past",
      "cardId": 10,
      "cardName": "The Wheel of Fortune",
      "isReversed": false,
      "meaning": "...",
      "image": "..."
    }
  ],
  "limit": 50,
  "remaining": 12
}
```

設計上の注意:

- `save=false` を許可する場合、DB保存せず一時結果だけ返す案も検討する。
- 最小実装では `save=true` 固定でもよい。
- 抽選はバックエンド側で行うほうが改ざんされにくく、保存結果との整合性が高い。

### `PATCH /api/tarot/readings/<id>/` の契約案

変更可能な項目:

- `isPinned`
- `memo`

カード内容や抽選結果は後から変更できない方針がよいです。

## 初期データ投入方針

標準78枚はDBに入れる設計にしてください。

候補:

1. fixture
2. `chart/data/default_tarot.json` + management command

推奨:

```text
chart/data/default_tarot.json
chart/management/commands/seed_default_tarot.py
```

理由:

- 既存データがある場合の再投入、更新、重複回避を制御しやすい。
- デッキ名、カード順、解釈文の更新に対応しやすい。
- fixtureより運用時の説明がしやすい。

標準78枚データに含めたい項目:

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

## 最小実装フェーズ

初回リリースで入れる範囲:

- 標準78枚デッキ
- 1枚引き
- 3枚引き
- 正位置/逆位置
- 質問文
- メモ
- 結果保存
- 履歴一覧
- 星固定
- 50件上限

後回しでよい範囲:

- 独自カード画像アップロード
- 独自デッキ共有
- 自由枚数スプレッド
- Diary連携
- Pro Plan
- カード解釈のAI生成

## テストケース案

モデルテスト:

- 標準デッキを作成できる。
- ユーザーデッキを作成できる。
- 標準78枚の枚数、分類、スート、番号が期待通り。
- オラクルカードで `reversed_meaning` が空でも扱える。
- `TarotReadingCard` が `meaning_snapshot` を保持する。

APIテスト:

- 未ログインで保存系APIが401になる。
- ログインユーザーがデッキ一覧を取得できる。
- ログインユーザーが1枚引きを保存できる。
- ログインユーザーが3枚引きを保存できる。
- `PATCH` で `isPinned` を変更できる。
- 他人のデッキ・カード・リーディングを編集/削除できない。

保存上限テスト:

- 51件目保存時に未固定の最古結果が削除される。
- 固定済み結果は削除されない。
- 固定済み50件の状態で新規保存しようとした場合の仕様が守られる。
- `get_tarot_reading_limit(user)` を差し替えれば上限変更できる。

削除テスト:

- デッキ削除時のカード削除挙動。
- カード削除後も過去の `TarotReadingCard` がスナップショットで表示できる。
- リーディング削除で `TarotReadingCard` も削除される。

## 実装前にユーザーへ確認すべき仕様

必ず確認すること:

1. 最初のリリースで、1枚引きだけにするか、3枚引きまで入れるか。
2. 標準78枚はライダー版ベースでよいか。
3. 独自カード作成を初回リリースに含めるか。
4. 画像アップロードを初回リリースに含めるか。
5. ピン済みが50件に達している場合、新規保存拒否でよいか。

できれば確認すること:

- 逆位置をデフォルトONにするか。
- 3枚引きのラベルを `Past / Present / Future` にするか、日本語にするか。
- 結果をDiaryへ送る導線が必要か。
- 標準カード解釈文の文体をどうするか。

## 出力形式

このプロンプトを読んだAIは、まず以下を出力してください。

1. 現状調査結果
2. モデル案
3. API案
4. 保存上限・星固定ロジック案
5. 初期データ投入方針
6. マイグレーション方針
7. テスト方針
8. 実装前の確認事項

実装依頼がない限り、コード変更はしないでください。
