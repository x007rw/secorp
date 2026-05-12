# 株式会社鈴木エンタープライズ Web サイト セットアップガイド

Astro + microCMS + Cloudflare Pages 構成の本番運用セットアップ手順。

## 全体アーキテクチャ

```
[管理者]
   ↓ コンテンツ更新
[microCMS（SaaS型ヘッドレスCMS）] ── Webhook ──→ [Cloudflare Pages]
                                                       ↓ 自動ビルド・デプロイ
                                                  [静的サイト公開]
                                                       ↓
                                                 [一般ユーザー]
```

- **管理画面**: microCMS（無料Hobby 〜 月¥4,900 Team）
- **公開サイト**: Cloudflare Pages（無料）
- **DNS・WAF**: Cloudflare（無料）
- **自動翻訳**: DeepL API Free（月50万文字無料）

合計ランニングコスト: **月¥0 〜 ¥4,900**

---

## セットアップ手順（順序通りに）

### ① microCMS アカウント作成・スキーマ設定

1. [https://microcms.io/](https://microcms.io/) でアカウント作成
2. 新規サービス作成
   - サービスID: `secorp`（推奨）
   - サービス名: 株式会社鈴木エンタープライズ
3. 4つの API を作成（詳細は [docs/microcms-schema.md](./docs/microcms-schema.md) 参照）：
   - `products`（リスト形式）
   - `news`（リスト形式）
   - `pages`（リスト形式）
   - `settings`（オブジェクト形式）
4. APIキー2つを発行
   - **読み取り専用キー**（GET権限のみ）→ ビルド時に使用
   - **書き込みキー**（GET+PATCH権限）→ DeepL自動翻訳で使用

### ② DeepL API Free 登録

1. [https://www.deepl.com/pro-api](https://www.deepl.com/pro-api) で Free プラン申込
2. クレジットカード登録（**課金は発生しません**、月50万文字超過時にAPIエラーになるだけ）
3. APIキーをコピー（末尾が `:fx` のキー）

### ③ Cloudflare Pages 連携

1. [https://dash.cloudflare.com/](https://dash.cloudflare.com/) で Pages > プロジェクト作成
2. GitHub 連携で `secorp` リポジトリを選択
3. ビルド設定：
   - **ビルドコマンド**: `npm run build`
   - **ビルド出力ディレクトリ**: `dist`
   - **Node.js バージョン**: `22.12` 以上
4. 環境変数（**ビルド時** に設定）：
   ```
   MICROCMS_SERVICE_DOMAIN = secorp
   MICROCMS_API_KEY        = （microCMSの読み取り専用キー）
   ```
5. デプロイ実行 → 数分で公開
6. 「設定」→「ビルドフック」で**デプロイフックURL**を取得

### ④ microCMS の Webhook 設定（自動再ビルド）

microCMS管理画面 →「サービス設定」→「Webhook」→「カスタム通知」

```
URL: <Cloudflare Pages のデプロイフックURL>
イベント: コンテンツの公開・更新・削除 すべて
通知タイミング: コンテンツ
対象API: products, news, pages, settings すべて
```

これでコンテンツ更新後、**数十秒で自動的に本番反映**されます。

### ⑤ 独自ドメイン設定

1. Cloudflare Pages の「カスタムドメイン」で `secorp.co.jp` 追加
2. ドメインのネームサーバーをCloudflareに変更（既にCloudflare利用ならCNAME追加のみ）
3. SSL証明書は自動発行・自動更新（無料）

---

## 開発環境セットアップ

```bash
cd C:\dev\secorp
npm install

# .env を作成（.env.example をコピーして編集）
cp .env.example .env
# MICROCMS_SERVICE_DOMAIN, MICROCMS_API_KEY を記入
# （未設定でもフォールバックデータで動作）

npm run dev
# → http://localhost:4321/
```

### 環境変数未設定での動作

`.env` のmicroCMS関連が未設定の場合：
- `src/data/products.fallback.ts` の5製品が表示される
- `src/data/news.fallback.ts` の1お知らせが表示される
- これにより**社長承認待ち中もサイト構築・確認が可能**

microCMS の APIキーを設定した瞬間に、APIからのデータ取得に切り替わります。

---

## DeepL 自動翻訳の運用

### 手動実行（推奨）

日本語コンテンツを microCMS で更新した後、ローカルで実行：

```bash
# 翻訳結果を確認（書き込まない）
npm run translate:dry

# 英語フィールドが空のものだけ翻訳・書き戻し
npm run translate

# 全フィールドを強制再翻訳（手直し済みの英文も上書き）
npm run translate:all
```

### 自動実行（オプション）

GitHub Actions で日次実行する場合：

```yaml
# .github/workflows/translate.yml の例
on:
  schedule:
    - cron: '0 18 * * *'  # 毎日朝3時 JST
  workflow_dispatch:

jobs:
  translate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22 }
      - run: npm ci
      - run: npm run translate
        env:
          MICROCMS_SERVICE_DOMAIN: ${{ secrets.MICROCMS_SERVICE_DOMAIN }}
          MICROCMS_WRITE_API_KEY:  ${{ secrets.MICROCMS_WRITE_API_KEY }}
          DEEPL_API_KEY:           ${{ secrets.DEEPL_API_KEY }}
```

---

## 運用フロー

### コンテンツを追加する（社内担当者）

1. microCMS管理画面にログイン
2. 「製品」「お知らせ」等から「+ 追加」をクリック
3. 日本語フィールド（`_ja` がついているもの）を入力
4. 「公開」ボタンで保存
5. → Cloudflare Pages が自動ビルド（30秒〜1分）
6. → 本番サイトに反映

### 英訳を生成する（Web担当者）

1. 月1回程度、新規追加された日本語コンテンツを確認
2. `npm run translate` を実行
3. microCMS で英訳結果を確認・必要なら微修正
4. 「公開」で英語版も反映

---

## 移行作業（WordPress版 → 本構成）

WordPress 版（`wp/` ディレクトリ）は**そのまま残置**しています。
ローカルでいつでも `cd wp && docker compose up -d` で起動可能。

本構成への完全移行が確定したら、`wp/` を削除可能です（git履歴は残ります）。

---

## トラブルシューティング

### ビルドが失敗する
- Node.js バージョンが 22.12 以上か確認
- `.env` の MICROCMS_SERVICE_DOMAIN が正しいか確認

### microCMSから取得した画像が表示されない
- Cloudflare Pages の Content Security Policy が `images.microcms-assets.io` を許可しているか確認
- `public/_headers` を参照

### 翻訳スクリプトがエラーになる
- DeepL APIキーが `:fx` で終わっているか確認（Freeプランの印）
- microCMS の書き込みキーが正しいか確認
- レスポンスが「Quota exceeded」なら、月50万文字を使い切った可能性

---

## 関連ドキュメント

- [microCMSスキーマ設計書](./docs/microcms-schema.md)
- [Astro公式](https://docs.astro.build/)
- [microCMS公式](https://document.microcms.io/)
- [Cloudflare Pages公式](https://developers.cloudflare.com/pages/)
- [DeepL API公式](https://developers.deepl.com/)
