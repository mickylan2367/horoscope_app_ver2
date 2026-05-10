# AIプロンプト: このプロンプト集の使い方

このファイルは、`ai_prompts/` 配下の各プロンプトを別AIに渡すときの共通前提です。

## 最初にAIへ渡す共通指示

以下をチャットに貼ってから、実行したいプロンプトファイルを1つ指定してください。

```text
このリポジトリは C:\Users\Owner\OneDrive\horoscope_project です。
AGENTS.md のルールを守ってください。
まず ai_prompts/README.md と、今回指定する ai_prompts/*.md を読んでください。
今回は指定したプロンプトの範囲だけ扱ってください。
関係ないファイルの変更や、既存の未コミット変更の巻き戻しはしないでください。
```

## 設計だけ頼む場合

```text
ai_prompts/07_calendar_ui_prompt.md を読んでください。
Calendar画面UI修正の調査と実装計画だけ作ってください。
まだコード変更はしないでください。
```

## 調査後に実装も頼む場合

```text
ai_prompts/07_calendar_ui_prompt.md を読んでください。
まず現状調査結果と実装方針を短く提示してください。
そのあと、方針に問題がなければ実装してください。
変更後は react_frontend/ で npm run lint を実行して確認してください。
```

## バックエンド設計だけ頼む場合

```text
ai_prompts/02_tarot_backend_data_model_prompt.md を読んでください。
タロット機能のDjangoモデル・API設計だけ作ってください。
まだコード変更、マイグレーション作成、データ投入はしないでください。
```

## バックエンド実装まで頼む場合

```text
ai_prompts/02_tarot_backend_data_model_prompt.md を読んでください。
まずモデル案、API案、マイグレーション方針を提示してください。
そのあと実装してください。
変更後は django_backend/ で python manage.py test を実行してください。
```

## 複数ファイルを扱いたい場合

複数のプロンプトを同時に渡すより、基本は1つずつ進めてください。

例外として、密接に関係するものは2つまで同時に渡してもよいです。

```text
ai_prompts/06_animation_consistency_prompt.md と ai_prompts/08_shooting_star_performance_prompt.md を読んでください。
まず共通する調査結果をまとめ、低リスクな改善案だけ提案してください。
まだコード変更はしないでください。
```

## おすすめの進め方

1. 大きい新機能は、まず `01_tarot_feature_overall_plan.md` で全体設計を作る。
2. DBが絡むものは、実装前にモデル・API・マイグレーション方針を確認する。
3. UIだけの小さい修正は、`05` から `09` の該当ファイルを1つ渡して進める。
4. PostgreSQLやデプロイは、実装前に必ず設計だけ出させる。

## AIに強く守らせること

- 指定したプロンプトの範囲から外れないこと。
- 実装しない指示のときはコードを変更しないこと。
- 実装する指示のときも、先に短い方針を出すこと。
- 既存の未コミット変更を勝手に戻さないこと。
- フロント変更後は `npm run lint`、バックエンド変更後は `python manage.py test` を確認候補に入れること。
