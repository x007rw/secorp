# 株式会社鈴木エンタープライズ - Webサイトリニューアル

Astro + Tailwind CSS + Cloudflare Pages 構成によるコーポレートサイト。

## 構成

- **フレームワーク**: Astro 6.x（静的サイト生成）
- **CSS**: Tailwind CSS 4.x
- **ホスティング想定**: Cloudflare Pages
- **多言語**: 日本語（デフォルト） / 英語（`/en/`）
- **ドメイン**: `https://www.secorp.co.jp`（移行先）

## ディレクトリ構造

```
src/
├── components/       Header, Footer
├── i18n/             多言語UI辞書（ui.ts）
├── layouts/          Layout.astro（OGP, schema.org, hreflang対応）
├── pages/
│   ├── index.astro
│   ├── company/      会社情報（about, philosophy, history, access）
│   ├── products/     製品（shield-segment, concrete-reinforcement）
│   ├── contact/
│   ├── legal/        プライバシーポリシー, Cookieポリシー
│   └── en/           英語版ミラー
└── styles/global.css  Tailwind + カスタム

public/
├── _redirects        Cloudflare Pages 301リダイレクトマップ
├── robots.txt
├── llms.txt          AIクローラ向けメタ情報
├── favicon.svg
├── downloads/        PDF配置先
└── images/           画像配置先
```

## 主要URL

| URL | 内容 |
|-----|------|
| `/` | トップページ |
| `/company/about/` | 会社概要 |
| `/company/philosophy/` | 経営理念 |
| `/company/history/` | 沿革 |
| `/company/access/` | アクセス |
| `/products/` | 製品カテゴリ一覧 |
| `/products/shield-segment/steel/` | 鋼製セグメント |
| `/products/shield-segment/rc/` | RCセグメント |
| `/products/concrete-reinforcement/bundrex/` | バンドレックス® |
| `/products/concrete-reinforcement/power-mesh/` | POWER MESH |
| `/contact/` | お問い合わせ |
| `/legal/privacy/` | プライバシーポリシー |
| `/en/...` | 英語版すべてのミラー |

## SEO実装

- ✅ Schema.org Organization 構造化データ（JSON-LD）
- ✅ OGP / Twitter Card メタタグ
- ✅ hreflang（ja / en / x-default）
- ✅ canonical
- ✅ XML サイトマップ（多言語対応）
- ✅ robots.txt
- ✅ llms.txt（AIクローラ向け）
- ✅ ASCII URL（`%エンコード` 排除）
- ✅ trailingSlash: 'always'

## コマンド

| Command | Action |
|---|---|
| `npm install` | 依存関係インストール |
| `npm run dev` | 開発サーバー起動（http://localhost:4321/） |
| `npm run build` | 本番ビルド（`dist/` 出力） |
| `npm run preview` | ビルド成果物のプレビュー |

## デプロイ手順（Cloudflare Pages）

1. GitHub にリポジトリプッシュ
2. Cloudflare Pages から「Connect to Git」で連携
3. ビルド設定:
   - Framework: Astro
   - Build command: `npm run build`
   - Build output: `dist`
4. カスタムドメイン `www.secorp.co.jp` を割当
5. DNS（Cloudflare DNS）で旧 `secorp.work` を CNAME で本サイトへ転送

## TODO（次フェーズ）

- [ ] 製品画像・ロゴ画像・OGP画像（`public/images/`）配置
- [ ] PDFファイル（`public/downloads/`）配置：bundrex-spec.pdf、power-mesh-spec.pdf 他
- [ ] Formspree/Cloudflare Workers のフォーム送信先URL設定
- [ ] GA4測定ID埋込（Layout.astro）
- [ ] 残りページ追加（projects, news, recruit, insulation, plant-equipment, mold, iot）
- [ ] Cookie同意バナー（CMP）
- [ ] 設立年の確定（1964 vs 1967 - 謄本確認後）
