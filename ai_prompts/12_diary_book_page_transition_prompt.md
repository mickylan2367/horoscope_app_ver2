# AIプロンプト: 日記をbookdesign内の同一URLページめくりに統合する計画

あなたは LovelyWitch Life の React UI/UX 設計担当AIです。
このプロンプトでは、まだ実装しないでください。まず現状調査と実装計画だけを作ってください。

## 目的

日記アプリへ移動するときに、別URLへ遷移したり、ワープ画面を挟んだりするのではなく、`http://127.0.0.1:5173/bookdesign` の同じURL内で本のページがめくれるように日記を見られる設計にしてください。

意図している体験は、`INDEX -> AKASHIC INDEX` と同じです。

- `INDEX` で Diary を選ぶ。
- URLは `/bookdesign` のまま変わらない。
- 本のページがひらりとめくれる。
- 次の内部ページとして `DIARY CALENDAR` が表示される。
- そこから日記一覧、日記編集も本の中のページとして見られる。

「アニメーションを変える」のではなく、「ページ遷移の考え方を変える」ことが主目的です。

## 現在の問題

現状の `BookDesign.jsx` では Diary を選ぶと、短いページめくり風の見た目を出したあと `navigate("/diary")` で別ルートへ移動しています。
これは見た目上は一瞬ページがめくれても、実際には `/bookdesign` から `/diary` へページ全体が切り替わるため、ユーザーが期待している「同じ本の中で日記を開く」体験になっていません。

また、`DiaryBookPage.jsx` 側でも `/diary`、`/diary/list`、`/diary/new`、`/diary/:id/edit` へのルーティングを前提に内部ページを切り替えている箇所があります。
今回の設計では、少なくとも `/bookdesign` から日記を開く導線では、これらをURL遷移ではなく `BookDesign` 内の状態遷移として扱う必要があります。

## 要件

- `/bookdesign` の `INDEX` から Diary を選んでも、URLを `/diary` に変えない。
- `BookDesign` の `pages` 配列、または同等の内部ページ管理に、日記用ページを追加する。
- 最初に開く日記ページは `DIARY CALENDAR` とする。
- `DIARY CALENDAR -> DIARY LIST -> DIARY EDITOR` の移動も、できる限り同じ本の中のページめくりとして扱う。
- 背景色は日記を開くタイミングで、現在の `/diary` 画面に近い暗めの色へ自然に寄せる。
- 直接 `/diary` を開いた場合の既存画面は壊さない。ただし、`/bookdesign` からの主要導線は `/diary` へ飛ばさない。
- PCとスマホの両方で、本の中に日記が入っているように見えること。
- `DiaryWarpPage` のワープ演出は、この導線では使わない。

## APIとルーティング方針

今回変えるのは、ユーザーが見るフロントエンドの画面URLです。
Django APIのURLは、原則として既存の `/api/diaries/` 系を維持してください。

### 維持するAPI

`/bookdesign` 内に日記を埋め込む場合でも、日記データの取得・作成・更新・削除は既存APIを使います。

- `GET /api/diaries/`
- `POST /api/diaries/`
- `GET /api/diaries/<id>/`
- `PATCH /api/diaries/<id>/`
- `DELETE /api/diaries/<id>/`
- `POST /api/diaries/<id>/images/`
- `POST /api/diaries/<id>/images/reorder/`
- `DELETE /api/diary-images/<id>/`
- 必要に応じて既存の `GET /api/auth/me/`、`GET /api/csrf/`、プロフィール系API

これらは画面URLが `/bookdesign` のままでも問題なく呼び出せるはずです。
APIパスを `/bookdesign/api/...` のように変更しないでください。

### 変えるフロントエンド画面ルート

`/bookdesign` から日記を開く主導線では、次のような画面URL遷移を使わない方針にしてください。

- `/bookdesign -> /diary`
- `/bookdesign -> /diary/list`
- `/bookdesign -> /diary/new`
- `/bookdesign -> /diary/<id>/edit`

代わりに、`BookDesign` 内の状態で次の内部ページを表現します。

- `bookSection: "index"`
- `bookSection: "akashicIndex"`
- `bookSection: "diaryCalendar"`
- `bookSection: "diaryList"`
- `bookSection: "diaryEditor"`

または、既存の `currentPage` と `pages` 配列に対応するページキーで表現しても構いません。

### 残す互換ルート

直接アクセス、ブックマーク、既存リンク、リロード時の互換性のため、React Router の次のルートは残してください。

- `/diary`
- `/diary/list`
- `/diary/new`
- `/diary/:id/edit`

ただし、`/bookdesign` 内の Diary 導線ではこれらへ `navigate()` しないでください。
互換ルートは「直接開いたときの入口」として残し、主要体験は `/bookdesign` 内部ページに寄せます。

### API設計上の注意

- 日記を本に埋め込むためだけに、Django側へ新しい画面用APIを作らない。
- 既存の日記APIレスポンスが `BookDesign` に埋め込むUIで足りるかを先に確認する。
- 足りない場合だけ、既存APIへ後方互換なフィールド追加を検討する。
- 画面URLを同一にすることと、API URLを同一にすることを混同しない。
- フロント側で内部ページを切り替えても、CSRF、ログイン状態、画像アップロードのAPI呼び出しは既存の仕組みを使う。

## 調査してほしいファイル

- `react_frontend/src/App.jsx`
- `react_frontend/src/BookDesign.jsx`
- `react_frontend/src/pages/DiaryBookPage.jsx`
- `react_frontend/src/pages/DiaryListPage.jsx`
- `react_frontend/src/pages/DiaryEditPage.jsx`
- `react_frontend/src/components/CalendarCard.jsx`
- `react_frontend/src/components/DiaryCard.jsx`
- `react_frontend/src/components/DiaryEditorForm.jsx`
- `react_frontend/src/api.js`
- `react_frontend/src/index.css`

## 設計方針

1. `BookDesign` を「本全体のホスト」として扱う。
2. `BookDesign` 内に `bookSection` または `currentPage` ベースの状態を持たせ、`index`、`akashicIndex`、`diaryCalendar`、`diaryList`、`diaryEditor` のような内部ページを表現する。
3. Diaryカードのクリックでは `navigate("/diary")` を呼ばず、`setCurrentPage(...)` または内部状態更新だけで `DIARY CALENDAR` ページへ進める。
4. `DiaryBookPage` の表示ロジックを再利用できるなら、ルーティング依存部分を切り離して `BookDesign` から埋め込める部品にする。
5. 再利用が難しい場合は、`DiaryBookPage` からカレンダー、一覧、編集フォームの中身だけを小さなコンポーネントへ分割し、`BookDesign` 側のページとして配置する。
6. 日記内の「一覧へ」「カレンダーへ」「編集へ」も、`navigate("/diary/list")` ではなく内部ページ切り替えとして扱う。
7. 既存の直接アクセス用ルート `/diary`、`/diary/list`、`/diary/new`、`/diary/:id/edit` は互換性のため残す。

## 推奨する実装案

推奨は、日記UIを「ルート用コンテナ」と「本に埋め込める中身」に分ける案です。

- `DiaryBookPage.jsx` から、日記の状態・API取得・カレンダー・一覧・編集の本体を `DiaryBookContent` のようなコンポーネントに分離する。
- `DiaryBookContent` に `embedded` または `mode="embedded"` を渡せるようにする。
- embeddedモードでは、`navigate("/diary...")` を使わず、親から渡された `onPageChange` や内部stateでページを切り替える。
- ルート用の `DiaryBookPage` は今まで通り `/diary` などから使い、既存URLの互換性を保つ。
- `BookDesign` は `DiaryBookContent` を本の1ページ、または複数ページとして表示する。

## 出力してほしいこと

1. 現在の `/bookdesign -> /diary` 導線で、どこがURL遷移になっているかを具体的に説明する。
2. `BookDesign` 内で日記を同一URL表示にするための状態設計を提案する。
3. `DiaryBookPage` から分離するべきコンポーネントと責務を提案する。
4. フロントエンド画面ルートとDjango APIルートを分けて、何を維持し何を変えるかを説明する。
5. 編集するファイルと、それぞれの変更内容を一覧にする。
6. スマホ表示でページめくりと日記一覧が崩れないための注意点を書く。
7. 実装後に確認する手動テスト項目を書く。

## 受け入れ条件

- `/bookdesign` の `INDEX` で Diary を選んでも、ブラウザのURLが `/bookdesign` のまま維持される。
- Diary選択後、本のページめくりで `DIARY CALENDAR` が表示される。
- `DIARY CALENDAR` から日記一覧を開いても、URLは `/bookdesign` のまま維持される。
- 日記一覧から新規作成または編集へ進む場合も、可能な限り同じ本の内部ページとして表示される。
- 直接 `/diary`、`/diary/list`、`/diary/new`、`/diary/:id/edit` を開いた場合の既存挙動は壊れない。
- ワープ演出ではなく、ページめくり演出が主役になっている。
- 背景は日記ページへ進むにつれて、既存の日記画面に近い暗めの雰囲気へ自然に変わる。
- PCとスマホの両方で、ボタンや文字が重ならない。
- `/bookdesign` 内部表示でも、日記データの取得・保存・更新・削除・画像操作は既存の `/api/diaries/` 系APIで動く。
- 画面URLを同一にするために、API URLまで不必要に変更していない。

## 注意

今回の修正では、「日記アプリへ飛ぶ」のではなく、「bookdesignという本の中に日記ページを差し込む」と考えてください。
別URLへ移動する実装は、今回の主導線としては不採用です。
