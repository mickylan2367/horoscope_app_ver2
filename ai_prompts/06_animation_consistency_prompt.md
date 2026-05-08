# AIプロンプト: アニメーション統一方針

あなたはReact UI/UX担当AIです。

## 目的

LovelyWitch Life内のアニメーションを統一するための調査と設計をしてください。実装はまだしないでください。

## 元要望

- アニメーションの統一

## 調査対象

- `react_frontend/src/BookDesign.jsx`
- `react_frontend/src/pages/DiaryBookPage.jsx`
- `react_frontend/src/pages/DiaryWarpPage.jsx`
- `react_frontend/src/components/CosmicBackground.jsx`
- `react_frontend/src/theme/cosmic.js`
- `react_frontend/src/**/*.css` またはJSX内の `<style>`

## 出力してほしいもの

- 現在使われている主なアニメーション一覧
- 速度、イージング、発光、星、ページ遷移のばらつき
- 共通トークン化できる値
- CSS変数またはテーマ定数に集約する案
- `prefers-reduced-motion` 対応案
- 最小修正案と大きめの整理案
- 受け入れ条件

## 注意

- 見た目を大きく変えず、統一感と保守性を上げる方針にすること。
- 既存デザインの世界観を壊さないこと。
