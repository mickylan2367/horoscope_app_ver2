# LovelyWitch Life

[![CI](https://github.com/mickylan2367/horoscope_app_ver2/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/mickylan2367/horoscope_app_ver2/actions/workflows/ci.yml)

LovelyWitch Life は、占星術、日記、タロット、プロフィール管理をひとつにまとめた個人向けWebアプリです。Django を API とサーバーサイド基盤に使い、Vite/React で画面を構築しています。

![Home screenshot](image/home.png)

## 主な機能

- ホロスコープ計算、出生情報プロフィール保存、AIリーディング生成
- 日記の作成、編集、一覧表示、カレンダー表示、Markdownプレビュー
- 日記画像のアップロード、並び替え、キャプション管理
- タロット/オラクルデッキ、カード、リーディング履歴の管理
- タロット結果と日記体験をつなぐ本型UI、ワープ演出、モバイル表示調整
- ログイン、ユーザー登録、プロフィール、アイコン、パスワード変更
- Codex を使った Slack 上の役割別エージェント運用

## 技術スタック

- Backend: Django 5.0.3, SQLite, Pillow, Markdown, OpenAI API
- Astrology: Skyfield, NumPy, Matplotlib
- Frontend: React 19, Vite 8, React Router 7, Tailwind CSS 4
- UI/Animation: Framer Motion, fullPage.js, lucide-react
- Agent: Python 製 Slack Socket Mode ランナー

## ディレクトリ構成

- `django_backend/`
  - Django プロジェクト本体です。
  - `horoscope/` に設定とルートURLがあります。
  - `chart/` に占星術、ホロスコープ、タロット関連のモデル/API/計算処理があります。
  - `diaryapp/` に日記、画像、プロフィール、認証補助APIがあります。
  - `static/react/` は `react_frontend` の本番ビルド出力先です。
  - `media/` はアップロード画像の保存先です。
- `react_frontend/`
  - Vite/React のフロントエンドです。
  - `src/pages/` に各ページ、`src/components/` に共通UIがあります。
  - `vite.config.js` で `/api/` と `/media/` を Django にプロキシしています。
- `slack-ai-agent/`
  - Slack から Codex 役割エージェントを起動するランナーです。
  - `agents/` に planner/frontend/backend/reviewer/integrator などのロール設定があります。
- `ai_prompts/`
  - これまでの追加機能や改修用のAI作業プロンプトを保管しています。
- `image/`
  - README や説明用のスクリーンショット、共有画像置き場です。

## 必要な環境変数

Django/React アプリだけを動かす場合:

```powershell
$env:OPENAI_API_KEY="sk-..."
```

Slack agent を使う場合:

```dotenv
SLACK_BOT_TOKEN=xoxb-...
SLACK_APP_TOKEN=xapp-...
```

Slack agent のトークンは `slack-ai-agent/agents/<role>/.env` に置くか、プロセス環境変数として設定します。ロール別 `.env` がある場合は、そちらが優先されます。

## セットアップ

Backend:

```powershell
cd django_backend
python -m venv ..\venv
..\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
```

Frontend:

```powershell
cd react_frontend
npm install
```

## ローカル開発

Django API サーバー:

```powershell
cd django_backend
python manage.py runserver 127.0.0.1:8080
```

Vite 開発サーバー:

```powershell
cd react_frontend
npm run dev
```

開発中のReact画面は `http://127.0.0.1:5173/` で確認します。Vite は Django の API とメディアを `http://127.0.0.1:8080/` にプロキシします。

Django からビルド済みReactを配信する場合:

```powershell
cd react_frontend
npm run build
```

ビルド成果物は `django_backend/static/react/` に出力され、Django 側では `/app/` 以下でReactアプリを配信します。

## よく使うコマンド

Backend:

```powershell
cd django_backend
python manage.py test
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 127.0.0.1:8080
```

Frontend:

```powershell
cd react_frontend
npm run lint
npm run build
npm run preview
```

Slack agent:

```powershell
python .\slack-ai-agent\app.py
python .\slack-ai-agent\app.py --role planner
python .\slack-ai-agent\app.py --all
python .\slack-ai-agent\app.py --list-roles
```

## 主要URL

- `/` Django の既存ホロスコープ画面
- `/app/` React アプリ
- `/app/chart` React版チャート画面
- `/app/diary` 日記カレンダー
- `/app/diary/list` 日記一覧
- `/app/tarot` タロット入口
- `/app/tarot/decks` デッキ管理
- `/app/tarot/read` タロットリーディング
- `/app/profile` プロフィール
- `/admin/` Django admin

## API 概要

- `/api/auth/` ログイン、ログアウト、登録、現在ユーザー取得
- `/api/profile/` プロフィールとパスワード変更
- `/api/diaries/` 日記CRUD
- `/api/diaries/<id>/images/` 日記画像追加
- `/api/diary-images/<id>/` 日記画像更新/削除
- `/api/chart/` 出生プロフィールとチャート計算
- `/api/tarot/` デッキ、カード、リーディング

## テストと確認

Backend 変更後:

```powershell
cd django_backend
python manage.py test
```

Frontend 変更後:

```powershell
cd react_frontend
npm run lint
```

画面変更では、Vite 開発サーバー上で該当ルートを手動確認します。

## 注意事項

- APIキー、Slackトークン、ローカル認証情報はコミットしないでください。
- `venv/`, `node_modules/`, ローカルDB、アップロード画像、ランタイムログは原則として管理対象に含めません。
- `django_backend/static/react/` はReactのビルド成果物です。フロントエンドを変更したら `npm run build` で更新します。
- `ai_prompts/` は実装計画や作業指示の保管場所であり、アプリ実行に必須ではありません。
