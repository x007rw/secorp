# 株式会社鈴木エンタープライズ - Webサイト

**Astro + microCMS + Cloudflare Pages** 構成のヘッドレスCMSコーポレートサイト。

## 構成

- **フレームワーク**: Astro 6.x（静的サイト生成）
- **CSS**: Tailwind CSS 4.x
- **CMS**: microCMS（ヘッドレスCMS、SaaS）
- **ホスティング**: Cloudflare Pages
- **自動翻訳**: DeepL API（日→英）
- **多言語**: 日本語（デフォルト） / 英語（`/en/`）
- **ドメイン**: `https://www.secorp.co.jp`（移行先）

## 詳細セットアップ

完全な環境構築手順は **[SETUP.md](./SETUP.md)** を参照してください。

microCMSスキーマ設計書は **[docs/microcms-schema.md](./docs/microcms-schema.md)** を参照。

## ディレクトリ構造

```
src/
├── components/      Header, Footer
├── data/            microCMS未接続時のフォールバックデータ
├── i18n/            多言語UI辞書（ui.ts）
├── layouts/         Layout.astro（OGP, schema.org, hreflang対応）
├── lib/             microcms.ts（APIクライアント＋フォールバック）
├── pages/
│   ├── index.astro
│   ├── company/      会社情報（about, philosophy, history, access）
│   ├── products/     [slug].astro（動的ルート、microCMS連動）
│   ├── news/         [slug].astro（お知らせ、microCMS連動）
│   ├── contact/
│   ├── legal/
│   └── en/           英語版ミラー
├── styles/          global.css
└── types/           microcms.ts（API型定義）

scripts/
└── translate.mjs    DeepL自動翻訳バッチ

public/
├── _headers         Cloudflare Pages セキュリティヘッダ
├── _redirects       Cloudflare Pages 301リダイレクト
├── robots.txt
├── favicon-32.png, favicon-192.png, apple-touch-icon.png
└── images/          静的画像

wp/                  WordPress版（ローカル予備環境、本番では使用しない）

docs/
└── microcms-schema.md  microCMS API スキーマ設計書
```

## コマンド

| Command | Action |
|---|---|
| `npm install` | 依存関係インストール |
| `npm run dev` | 開発サーバー起動（http://localhost:4321/） |
| `npm run build` | 本番ビルド（`dist/` 出力） |
| `npm run preview` | ビルド成果物のプレビュー |
| `npm run translate:dry` | DeepL翻訳テスト（書き込まない） |
| `npm run translate` | 英語が空のフィールドだけ自動翻訳 |
| `npm run translate:all` | 全フィールド強制再翻訳 |

## 環境変数

`.env.example` をコピーして `.env` を作成：

| 変数名 | 用途 | 必須 |
|---|---|---|
| `MICROCMS_SERVICE_DOMAIN` | microCMSのサービスID | 本番のみ |
| `MICROCMS_API_KEY` | microCMS読み取りキー | 本番のみ |
| `MICROCMS_WRITE_API_KEY` | microCMS書き込みキー | 翻訳実行時のみ |
| `DEEPL_API_KEY` | DeepL APIキー | 翻訳実行時のみ |

**未設定でも動作します**: `src/data/*.fallback.ts` のローカルデータを使用。

## SEO実装

- ✅ Schema.org Organization 構造化データ（JSON-LD）
- ✅ OGP / Twitter Card
- ✅ hreflang（ja / en / x-default）
- ✅ canonical
- ✅ XML サイトマップ（多言語対応）
- ✅ robots.txt
- ✅ trailingSlash: 'always'
- ✅ ASCII URL

## セキュリティ実装（`public/_headers`）

- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ Strict-Transport-Security
- ✅ Content-Security-Policy（microCMS画像CDN許可）
- ✅ Referrer-Policy
- ✅ Permissions-Policy

## WordPress版について

`wp/` ディレクトリには Docker ベースの WordPress 開発環境が予備として残されています。
本構成（Astro + microCMS）で運用中ですが、いつでも `cd wp && docker compose up -d` で起動可能。

詳細は [`wp/README.md`](./wp/README.md) を参照。
