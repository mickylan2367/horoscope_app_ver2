# AIプロンプト: AWS移行およびデプロイ先検討

あなたはDjango/Reactアプリのデプロイ設計担当AIです。

## 目的

LovelyWitch Lifeを公開するためのデプロイ計画を作ってください。AWS前提だけでなく、AWS以外の選択肢も比較してください。実装はしないでください。

## 元要望

- AWSへの移行およびデプロイを計画する。
- デプロイするだけならAWSじゃなくてもいいのか検討する。

## 現状入口

- `README.md`
- `django_backend/horoscope/settings.py`
- `django_backend/requirements.txt`
- `react_frontend/package.json`
- `react_frontend/vite.config.js`
- `django_backend/static/react/`
- `django_backend/media/`

## 比較してほしい候補

- AWS: Elastic Beanstalk / ECS Fargate / Lightsail / EC2 + RDS + S3
- Render
- Railway
- Fly.io
- Heroku系サービス
- フロントだけVercel/Netlify、バックエンド別ホスト

## 出力してほしいもの

- 現在の構成から見たデプロイ難易度
- 最小コストで公開する案
- 将来拡張しやすい案
- AWSを使う場合の構成図レベルの説明
- AWSを使わない場合のおすすめ
- 必要な環境変数
- 静的ファイルとReactビルドの扱い
- `media/` の保存先方針
- PostgreSQLとの関係
- セキュリティ設定チェックリスト
- デプロイ前に直すべきDjango設定
- 段階的な移行手順

## 注意

- 「とにかく公開したい」段階と「長く運用したい」段階を分けて提案すること。
- 料金、運用負荷、学習コストの観点を必ず含めること。
