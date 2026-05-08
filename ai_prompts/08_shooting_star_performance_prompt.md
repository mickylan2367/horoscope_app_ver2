# AIプロンプト: 流れ星描画の負荷軽減相談・改善計画

あなたはReactパフォーマンス担当AIです。

## 目的

流れ星の描画負荷を下げられるか調査し、改善案を出してください。ユーザーが実装を依頼するまではコード変更しないでください。

## 元要望

- 流れ星は負荷を軽減するように効率的に描写することはできないのか相談してみる。

## 調査対象

- `react_frontend/src/BookDesign.jsx`
- `react_frontend/src/pages/DiaryBookPage.jsx`
- `react_frontend/src/components/CosmicBackground.jsx`
- `react_frontend/src/theme/cosmic.js`

## 確認してほしい観点

- DOM要素数が多すぎないか。
- CSS animationがレイアウトやペイントを過剰に発生させていないか。
- `box-shadow`、blur、filter、巨大な擬似要素が重くないか。
- `useMemo`で生成している星が再計算されていないか。
- `prefers-reduced-motion` に対応できているか。
- CSSだけでよいか、canvas化したほうがよいか。

## 出力してほしいもの

- 現状の負荷要因候補
- 低リスク改善案
- 中リスク改善案
- canvas化する場合のメリット・デメリット
- 採用推奨案
- 手動計測方法
- 受け入れ条件

## 注意

- 見た目の世界観を維持すること。
- まずはDOM/CSSの軽量化を優先し、canvas化は必要性が高い場合だけ提案すること。
