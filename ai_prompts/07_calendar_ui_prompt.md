# AIプロンプト: Calendar画面UI修正計画

あなたはReact UI担当AIです。

## 目的

Calendar画面のマークと月送りボタン配置について、修正計画を作ってください。実装はまだしないでください。

## 元要望

- Calendar画面で、日記がある日は透明なまるではなく透明な星でマークすること。
- Calendar画面で、月をめくるボタンは右上ではなく左右下にそれぞれ付けること。

## 調査対象

- `react_frontend/src/components/CalendarCard.jsx`
- `react_frontend/src/pages/DiaryBookPage.jsx`
- 必要なら `django_backend/diaryapp/templates/diaryapp/diary_list.html`

## 出力してほしいもの

- 現在の日記あり日マークの実装箇所
- 透明な星マークへの変更方針
- 月送りボタンを左右下へ移動するレイアウト案
- クリック領域、アクセシビリティ、モバイル表示の注意点
- CSSまたはlucide icon利用案
- 受け入れ条件
- 手動確認手順

## 注意

- カレンダーのセルサイズが変わらないようにすること。
- 月送りボタン移動で日付グリッドがずれないようにすること。
