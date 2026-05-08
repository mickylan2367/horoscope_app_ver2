# AIプロンプト: 日記一覧画面のカクつき改善調査

あなたはReact/Djangoパフォーマンス担当AIです。

## 目的

日記一覧画面へ移行したときにカクカクする問題を調査し、改善計画を作ってください。実装はまだしないでください。

## 元要望

- 日記一覧画面に移行したときのカクカクするのをどう改善できるか考えること。

## 調査対象

- `react_frontend/src/pages/DiaryBookPage.jsx`
- `react_frontend/src/components/DiaryCard.jsx`
- `react_frontend/src/components/DiaryEditorForm.jsx`
- `react_frontend/src/api.js`
- `django_backend/diaryapp/models.py`
- `django_backend/diaryapp/views.py`

## 確認してほしい観点

- 一覧遷移時に大量のDOM、画像、Markdown HTML、アニメーションが同時に描画されていないか。
- 画像読み込みがレイアウトシフトやメインスレッド負荷を起こしていないか。
- APIで不要に重いデータを返していないか。
- `visibleDiaries` の段階表示が十分か。
- スクロール位置合わせやページ遷移アニメーションが過剰でないか。
- バックエンド側で `select_related` / `prefetch_related` / pagination が必要か。

## 出力してほしいもの

- 原因候補の優先順位
- すぐできる改善案
- API設計を変える改善案
- UI/アニメーションを変える改善案
- 計測方法
- 実装時のテスト・確認手順

## 注意

- 体感改善を優先し、過剰な設計変更は避けること。
- 既存の本型UIを維持する前提で案を出すこと。
