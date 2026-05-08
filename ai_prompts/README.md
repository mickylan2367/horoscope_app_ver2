# command.md AI作業プロンプト集

このフォルダは `command.md` の要望を、あとで別AIに読ませて調査・設計・実装させるための指示書に分割したものです。

重要: ここに書かれた各プロンプトは、今すぐ実装するためのものではありません。AIに渡すときは、必要なファイルを1つ選んで、そのプロンプトの範囲だけを実行させてください。

## 推奨順

0. `00_how_to_use_prompts.md`
1. `01_tarot_feature_overall_plan.md`
2. `02_tarot_backend_data_model_prompt.md`
3. `03_tarot_card_creation_ui_prompt.md`
4. `04_tarot_reading_flow_prompt.md`
5. `05_logout_and_close_button_prompt.md`
6. `06_animation_consistency_prompt.md`
7. `07_calendar_ui_prompt.md`
8. `08_shooting_star_performance_prompt.md`
9. `09_diary_list_performance_prompt.md`
10. `10_postgresql_migration_plan_prompt.md`
11. `11_deployment_hosting_plan_prompt.md`
12. `12_diary_book_page_transition_prompt.md`
13. `13_bookdesign_tarot_index_prompt.md`
14. `14_tarot_readings_in_diary_list_prompt.md`
15. `15_mobile_polish_vs_deployment_prompt.md`

## 今回追加した指示書

- `12_diary_book_page_transition_prompt.md`: 日記アプリへのワープを廃止し、本のページめくり遷移へ統一するための設計。
- `13_bookdesign_tarot_index_prompt.md`: `bookdesign` の本の中に `TAROT INDEX` を組み込むための設計。
- `14_tarot_readings_in_diary_list_prompt.md`: 保存済みタロット結果を日記一覧へ日付順で統合するための設計。
- `15_mobile_polish_vs_deployment_prompt.md`: スマホ調整とAWS構築の優先順位を相談するための計画。

## 共通ルール

- まず既存コードを読み、既存の設計・命名・UIトーンに合わせること。
- 実装前に影響範囲、DB変更、API変更、テスト方針を短く明示すること。
- ユーザーが「実装して」と言うまでは、設計だけの依頼でコード変更しないこと。
- React側は `react_frontend/`、Django側は `django_backend/` を中心に見ること。
- フロント変更後は `npm run lint`、バックエンド変更後は `python manage.py test` を確認項目に入れること。

