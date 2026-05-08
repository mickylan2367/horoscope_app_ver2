# AIプロンプト: SQLiteからPostgreSQLへの移行計画

あなたはDjangoインフラ・DB移行担当AIです。

## 目的

現在のローカルSQLite構成からPostgreSQLへ移行する計画を作ってください。実装やマイグレーション実行はしないでください。

## 現状入口

- `django_backend/horoscope/settings.py`
- `django_backend/db.sqlite3`
- `django_backend/requirements.txt`
- `django_backend/*/migrations/`
- `django_backend/media/`

## 出力してほしいもの

- 現状DB設定の確認結果
- PostgreSQL化に必要なPython依存関係
- `.env` または環境変数化する設定項目
- ローカル開発DBと本番DBの分け方
- 既存SQLiteデータ移行手順案
- `dumpdata` / `loaddata` を使う場合の注意点
- 画像など `media/` はDB移行対象ではないことの整理
- バックアップ手順
- ロールバック方針
- Djangoテスト確認手順

## 注意

- SECRET_KEYやDBパスワードをコードに直接書かない方針にすること。
- Windowsローカル開発環境でのPostgreSQL導入も考慮すること。
- AWS等への将来デプロイを見据えて、RDSに移しやすい構成を提案すること。
