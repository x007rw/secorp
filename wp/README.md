# 株式会社鈴木エンタープライズ — WordPress 開発環境

Astro 版で作成したデザインを WordPress テーマとして再現する開発環境です。

## 必要なもの

- **Docker Desktop**（Windows / Mac / Linux）
  - Windows の場合：[Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/) をインストール後、WSL2 を有効化
  - 起動済みであることを確認：タスクトレイの Docker アイコンが緑

## セットアップ手順

```bash
# 1. WordPress ディレクトリへ
cd C:\dev\secorp\wp

# 2. .env ファイルを作成（パスワード等の設定）
copy .env.example .env

# 3. コンテナ起動（初回はイメージダウンロードで数分かかります）
docker compose up -d

# 4. ブラウザで確認
#    WordPress:    http://localhost:8080/
#    phpMyAdmin:   http://localhost:8081/
```

初回アクセス時の WordPress セットアップウィザード：
- 言語：**日本語**
- サイトのタイトル：**株式会社鈴木エンタープライズ**
- ユーザー名：任意（例：admin）
- パスワード：任意（控えてください）
- メールアドレス：任意

セットアップ完了後、管理画面で：
1. **外観 → テーマ** → 「株式会社鈴木エンタープライズ」を**有効化**
2. **設定 → パーマリンク** → 「投稿名」を選択して保存
3. **設定 → 表示設定** → ホームページの表示を「**固定ページ**」に切替

## ディレクトリ構成

```
wp/
├── docker-compose.yml      Dockerサービス定義
├── .env                    環境変数（パスワード等、Git追跡外）
├── .env.example            .env のテンプレート
├── .gitignore
├── README.md               このファイル
└── wp-content/
    ├── themes/
    │   └── secorp/         自作テーマ（Astroデザインを再現）
    │       ├── style.css         テーマ情報＋ベースCSS
    │       ├── functions.php     テーマセットアップ・CPT登録
    │       ├── header.php        共通ヘッダー
    │       ├── footer.php        共通フッター
    │       ├── front-page.php    ホーム
    │       ├── page.php          固定ページ
    │       ├── single-product.php 製品個別
    │       ├── archive-product.php 製品一覧
    │       ├── index.php         フォールバック
    │       ├── assets/
    │       │   ├── css/
    │       │   └── images/        ロゴ・OGP・製品写真等
    │       └── template-parts/
    ├── plugins/             プラグイン（Git追跡外）
    └── uploads/             メディアライブラリ（Git追跡外）
```

## よく使うコマンド

```bash
# サービス停止
docker compose stop

# サービス再起動
docker compose restart

# サービス削除（データは残る）
docker compose down

# サービス＋DB完全削除（リセット）
docker compose down -v

# WordPress コンテナのログ確認
docker compose logs -f wordpress

# WP-CLI（管理コマンド）実行
docker compose run --rm wpcli wp plugin install yoast-seo --activate
docker compose run --rm wpcli wp option update blogname "株式会社鈴木エンタープライズ"
```

## ポート設定の変更

`.env` で変更可能：

```
WP_PORT=8080      # http://localhost:8080/
PMA_PORT=8081     # http://localhost:8081/
```

## トラブルシューティング

### ポートが既に使われている

```
Error: bind: address already in use
```
→ `.env` で別ポート（8082 等）に変更

### DB 接続エラー

```bash
docker compose down -v
docker compose up -d
```
で完全リセット

### テーマファイルの変更が反映されない

ブラウザの**強制リロード**（Ctrl+Shift+R）を試す。
`functions.php` の編集後はキャッシュプラグイン使用時に手動キャッシュクリア。

## 次のステップ

1. **Astro 版の画像を WP テーマに移植**
   - `../public/images/` の SVGロゴ・WebP製品画像を `wp-content/themes/secorp/assets/images/` にコピー
2. **管理画面で初期コンテンツを作成**
   - カスタマイザーで**カスタムロゴ**設定
   - 固定ページ（会社概要、企業理念、沿革、アクセス、お問い合わせ、プライバシー）作成
   - 製品（5項目）を CPT で登録
3. **必須プラグイン導入**
   - Yoast SEO または Rank Math
   - Advanced Custom Fields
   - WP All Import（Excel/CSV取込用）
   - Polylang（多言語）
4. **Xserver 等への本番デプロイ**
