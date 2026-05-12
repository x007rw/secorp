# microCMS スキーマ設計書

株式会社鈴木エンタープライズ サイト用 microCMS API スキーマ定義。

## サービス設定

- **サービスID**: `secorp`（推奨、URLは `https://secorp.microcms.io`）
- **プラン**: Hobby（無料、月1万APIコール）または Team（¥4,900/月、月10万APIコール）

## API 一覧（4本）

| API ID | エンドポイント形式 | 種類 | 用途 |
|---|---|---|---|
| `products` | リスト形式 | 製品情報 | 製品カード・個別ページ |
| `news` | リスト形式 | お知らせ・トピック | お知らせ一覧・個別 |
| `pages` | リスト形式 | 静的ページ | 会社概要・企業理念等の本文 |
| `settings` | オブジェクト形式 | サイト設定 | 会社情報・連絡先等 |

---

## 1. `products` API

| フィールドID | 表示名 | 種類 | 必須 | 備考 |
|---|---|---|---|---|
| `slug` | スラッグ | テキスト | ✅ | URLに使用（例: `rc-segment`） |
| `category` | カテゴリ | セレクト | ✅ | `shield-segment` / `concrete-reinforcement` / `mold` |
| `order` | 表示順 | 数字 | ✅ | 小さい順に表示 |
| `title_ja` | 製品名（日本語） | テキスト | ✅ | 例: RCセグメント |
| `title_en` | 製品名（英語） | テキスト | | 例: RC Segment（DeepL自動翻訳対象） |
| `excerpt_ja` | 概要（日本語） | テキストエリア | ✅ | カード表示用150字程度 |
| `excerpt_en` | 概要（英語） | テキストエリア | | DeepL自動翻訳対象 |
| `body_ja` | 本文（日本語） | リッチエディタ | | 個別ページ用詳細 |
| `body_en` | 本文（英語） | リッチエディタ | | DeepL自動翻訳対象 |
| `image` | メイン画像 | 画像 | ✅ | カード・個別ページ共用 |
| `gallery` | ギャラリー | 画像（複数） | | 詳細ページ用追加画像 |
| `spec` | 仕様 | カスタム（繰り返し） | | label/value のペア |

## 2. `news` API

| フィールドID | 表示名 | 種類 | 必須 | 備考 |
|---|---|---|---|---|
| `slug` | スラッグ | テキスト | ✅ | URL用 |
| `category` | カテゴリ | セレクト | | `announcement` / `media` / `event` |
| `published_at` | 公開日 | 日時 | ✅ | 表示・並び替えに使用 |
| `title_ja` | タイトル（日本語） | テキスト | ✅ | |
| `title_en` | タイトル（英語） | テキスト | | DeepL自動翻訳対象 |
| `body_ja` | 本文（日本語） | リッチエディタ | ✅ | |
| `body_en` | 本文（英語） | リッチエディタ | | DeepL自動翻訳対象 |
| `thumbnail` | サムネイル | 画像 | | 一覧表示用 |

## 3. `pages` API

| フィールドID | 表示名 | 種類 | 必須 | 備考 |
|---|---|---|---|---|
| `slug` | スラッグ | テキスト | ✅ | `about`, `philosophy`, `history` 等 |
| `title_ja` | タイトル（日本語） | テキスト | ✅ | |
| `title_en` | タイトル（英語） | テキスト | | |
| `body_ja` | 本文（日本語） | リッチエディタ | ✅ | |
| `body_en` | 本文（英語） | リッチエディタ | | DeepL自動翻訳対象 |
| `meta_description_ja` | メタ説明（日本語） | テキストエリア | | SEO用 |
| `meta_description_en` | メタ説明（英語） | テキストエリア | | |

## 4. `settings` API（オブジェクト形式）

| フィールドID | 表示名 | 種類 | 必須 | 備考 |
|---|---|---|---|---|
| `company_name_ja` | 会社名（日本語） | テキスト | ✅ | |
| `company_name_en` | 会社名（英語） | テキスト | ✅ | |
| `tel` | 電話番号 | テキスト | ✅ | |
| `fax` | FAX番号 | テキスト | | |
| `email` | メールアドレス | テキスト | ✅ | |
| `address_ja` | 住所（日本語） | テキストエリア | ✅ | |
| `address_en` | 住所（英語） | テキストエリア | | |

---

## カテゴリ選択肢

### products.category
- `shield-segment` → シールドセグメント
- `concrete-reinforcement` → コンクリート補強材
- `mold` → 土木・建築用型枠

### news.category
- `announcement` → お知らせ
- `media` → メディア掲載
- `event` → イベント

---

## 多言語フィールド命名規則

すべての翻訳対象フィールドは `_ja` / `_en` のサフィックスで管理：
- `title_ja` / `title_en`
- `excerpt_ja` / `excerpt_en`
- `body_ja` / `body_en`

**理由**: microCMS には標準で多言語切替がないため、フィールド分割で対応。DeepL自動翻訳スクリプト（`scripts/translate.mjs`）が `_ja` を読み取って `_en` に書き戻す。

---

## API キー権限設計

microCMS管理画面の「APIキー管理」で2つのキーを発行：

| キー名 | 権限 | 用途 |
|---|---|---|
| `read-only` | GET のみ | 本番ビルド時の取得 |
| `read-write` | GET + PATCH | DeepL自動翻訳スクリプト用 |

`read-only` キーは Cloudflare Pages の環境変数 `MICROCMS_API_KEY` に設定。
`read-write` キーはローカル `.env` のみで使用（リポジトリにコミットしない）。

---

## Webhook 設定（自動再デプロイ）

microCMS管理画面 → 「Webhook設定」で以下を追加：

```
URL: https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/{TOKEN}
イベント: コンテンツの公開・更新・削除
```

これでコンテンツ更新後、自動で Astro が再ビルド・デプロイされます（数十秒で反映）。
