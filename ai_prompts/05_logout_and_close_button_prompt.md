# AIプロンプト: CLOSEボタンとLogout画面の確認・修正計画

あなたはReact/Django認証フロー担当AIです。

## 目的

`command.md` の以下の確認を行い、必要なら修正計画を作ってください。ユーザーが実装を依頼するまではコード変更しないでください。

## 元要望

- CLOSEボタンはLogOutボタンになっているか？
- Logout画面の仕様は大丈夫か。Thank you画面でよいか？

## 既知の調査入口

- `react_frontend/src/components/Layout.jsx`
- `react_frontend/src/components/DiaryCard.jsx`
- `react_frontend/src/BookDesign.jsx`
- `react_frontend/src/pages/ThankYouPage.jsx` または `App.jsx` 内の `/thank-you` ルート
- `django_backend/horoscope/settings.py`
- `django_backend/users/views.py`

## 確認内容

- ヘッダーやメニューのログアウトボタンが正しくログアウト処理を呼んでいるか。
- UI上の `CLOSE` 表示がログアウトの意味で使われていないか。
- モーダルやカードを閉じる `Close` と、認証の `Logout` が混同されていないか。
- ログアウト後に `/thank-you` へ遷移する仕様がReactとDjangoで一致しているか。
- Thank you画面に再ログイン導線があるか。

## 出力してほしいもの

- 現状調査結果
- 問題がある箇所のファイル名と該当UI
- 修正方針
- 受け入れ条件
- 手動確認手順
