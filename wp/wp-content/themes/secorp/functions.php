<?php
/**
 * 株式会社鈴木エンタープライズ — テーマ関数
 */

if (!defined('ABSPATH')) exit;

/* ============================================================
 * テーマセットアップ
 * ============================================================ */
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption']);
    add_theme_support('responsive-embeds');
    add_theme_support('custom-logo', [
        'height'      => 56,
        'width'       => 56,
        'flex-height' => true,
        'flex-width'  => true,
    ]);

    register_nav_menus([
        'primary' => 'メインナビゲーション',
        'footer'  => 'フッターメニュー',
    ]);
});

/* ============================================================
 * SVG アップロード許可（信頼できる管理者のみ運用）
 * ============================================================ */
add_filter('upload_mimes', function ($mimes) {
    $mimes['svg']  = 'image/svg+xml';
    $mimes['webp'] = 'image/webp';
    return $mimes;
});
add_filter('wp_check_filetype_and_ext', function ($data, $file, $filename, $mimes) {
    $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
    if ($ext === 'svg') {
        $data['ext']  = 'svg';
        $data['type'] = 'image/svg+xml';
    } elseif ($ext === 'webp') {
        $data['ext']  = 'webp';
        $data['type'] = 'image/webp';
    }
    return $data;
}, 10, 4);

/* ============================================================
 * CSS / JS の読み込み
 * ============================================================ */
add_action('wp_enqueue_scripts', function () {
    // Tailwind CDN（同期読込、head内）
    wp_enqueue_script(
        'tailwind',
        'https://cdn.tailwindcss.com',
        [],
        null,
        false
    );
    // CDN ロード後に config を上書き（再描画される）
    wp_add_inline_script('tailwind', "
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: { 50:'#f1f5f9', 600:'#1e3a8a', 700:'#1e293b', 900:'#0f172a' },
                        accent: { 300:'#fcd34d', 400:'#fbbf24', 600:'#d97706' },
                    },
                    fontFamily: {
                        sans: ['\"Noto Sans JP\"', 'sans-serif'],
                    },
                }
            }
        };
    ", 'after');

    wp_enqueue_style(
        'secorp-fonts',
        'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap',
        [],
        null
    );

    wp_enqueue_style(
        'secorp-style',
        get_stylesheet_uri(),
        ['secorp-fonts'],
        wp_get_theme()->get('Version')
    );
});

/* ============================================================
 * カスタム投稿タイプ：製品 / お知らせ
 * ============================================================ */
add_action('init', function () {
    register_post_type('product', [
        'labels' => [
            'name'          => '製品',
            'singular_name' => '製品',
            'add_new'       => '新規追加',
            'add_new_item'  => '新しい製品を追加',
            'edit_item'     => '製品を編集',
            'all_items'     => '製品一覧',
            'menu_name'     => '製品',
        ],
        'public'        => true,
        'has_archive'   => true,
        'menu_position' => 5,
        'menu_icon'     => 'dashicons-portfolio',
        'supports'      => ['title', 'editor', 'thumbnail', 'excerpt', 'page-attributes', 'custom-fields'],
        'rewrite'       => ['slug' => 'products', 'with_front' => false],
        'show_in_rest'  => true,
    ]);

    register_post_type('news', [
        'labels' => [
            'name'          => 'お知らせ',
            'singular_name' => 'お知らせ',
            'add_new'       => '新規追加',
            'add_new_item'  => '新しいお知らせを追加',
            'edit_item'     => 'お知らせを編集',
            'all_items'     => 'お知らせ一覧',
            'menu_name'     => 'お知らせ',
        ],
        'public'        => true,
        'has_archive'   => true,
        'menu_position' => 6,
        'menu_icon'     => 'dashicons-megaphone',
        'supports'      => ['title', 'editor', 'thumbnail', 'excerpt'],
        'rewrite'       => ['slug' => 'news', 'with_front' => false],
        'show_in_rest'  => true,
    ]);
});

/* ============================================================
 * ファビコン（Astro版と同一構成）
 * 管理画面の「サイトアイコン」設定よりテーマ固定を優先
 * ============================================================ */
add_action('wp_head', function () {
    $base = get_template_directory_uri() . '/assets/images';
    echo '<link rel="icon" type="image/svg+xml" href="' . esc_url($base . '/logo.svg') . '" />' . "\n";
    echo '<link rel="icon" type="image/png" sizes="32x32" href="' . esc_url($base . '/favicon-32.png') . '" />' . "\n";
    echo '<link rel="icon" type="image/png" sizes="192x192" href="' . esc_url($base . '/favicon-192.png') . '" />' . "\n";
    echo '<link rel="apple-touch-icon" sizes="180x180" href="' . esc_url($base . '/apple-touch-icon.png') . '" />' . "\n";
}, 2);
// WPコアの site-icon 出力を抑止（テーマ側のタグと重複させない）
remove_action('wp_head', 'wp_site_icon', 99);

/* ============================================================
 * セキュリティ・運用設定
 * ============================================================ */
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wp_shortlink_wp_head');
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

/* ============================================================
 * 構造化データ（Schema.org Organization）
 * ============================================================ */
add_action('wp_head', function () {
    if (!is_front_page()) return;

    $org = [
        '@context'      => 'https://schema.org',
        '@type'         => 'Organization',
        '@id'           => home_url('/') . '#organization',
        'name'          => '株式会社鈴木エンタープライズ',
        'alternateName' => 'SUZUKI ENTERPRISE CO., LTD.',
        'url'           => home_url('/'),
        'logo'          => get_template_directory_uri() . '/assets/images/logo.svg',
        'foundingDate'  => '1967-07',
        'address' => [
            '@type'           => 'PostalAddress',
            'streetAddress'   => '木月２丁目２番３４号 鈴木ビル3F',
            'addressLocality' => '川崎市中原区',
            'addressRegion'   => '神奈川県',
            'postalCode'      => '211-0025',
            'addressCountry'  => 'JP',
        ],
        'telephone' => '+81-44-433-6399',
        'faxNumber' => '+81-44-434-8488',
    ];

    echo '<script type="application/ld+json">' . wp_json_encode($org, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
}, 5);
