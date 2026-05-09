<!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<?php wp_head(); ?>
</head>
<body <?php body_class('bg-white text-slate-800 antialiased'); ?>>
<?php wp_body_open(); ?>

<header class="fixed top-0 inset-x-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center gap-2.5 group min-w-0">
            <?php
            $logo_id = get_theme_mod('custom_logo');
            if ($logo_id) {
                echo wp_get_attachment_image($logo_id, 'full', false, [
                    'class' => 'h-12 w-auto shrink-0',
                    'alt'   => get_bloginfo('name'),
                ]);
            }
            ?>
            <span class="font-bold text-sm sm:text-base text-brand-900 truncate">
                <?php bloginfo('name'); ?>
            </span>
        </a>

        <nav class="hidden md:flex items-center gap-6 text-sm">
            <?php
            wp_nav_menu([
                'theme_location' => 'primary',
                'container'      => false,
                'menu_class'     => 'flex items-center gap-6 list-none m-0 p-0',
                'fallback_cb'    => function () {
                    echo '<ul class="flex items-center gap-6 list-none m-0 p-0">';
                    echo '<li><a href="' . esc_url(home_url('/about/')) . '" class="text-slate-700 hover:text-brand-600">会社概要</a></li>';
                    echo '<li><a href="' . esc_url(home_url('/philosophy/')) . '" class="text-slate-700 hover:text-brand-600">企業理念</a></li>';
                    echo '<li><a href="' . esc_url(home_url('/products/')) . '" class="text-slate-700 hover:text-brand-600">製品</a></li>';
                    echo '<li><a href="' . esc_url(home_url('/history/')) . '" class="text-slate-700 hover:text-brand-600">沿革</a></li>';
                    echo '<li><a href="' . esc_url(home_url('/contact/')) . '" class="text-slate-700 hover:text-brand-600">お問い合わせ</a></li>';
                    echo '</ul>';
                },
            ]);
            ?>
        </nav>

        <div class="flex items-center gap-2">
            <!-- Desktop: 言語切替 -->
            <div class="hidden md:flex items-center gap-2 text-xs">
                <a href="#" class="px-2 py-1 rounded border bg-brand-900 text-white border-brand-900">日本語</a>
                <a href="#" class="px-2 py-1 rounded border border-slate-300 hover:bg-slate-100 text-slate-700">English</a>
            </div>

            <button id="menu-toggle" type="button" class="md:hidden p-2 -mr-2 text-slate-700" aria-label="menu" aria-expanded="false">
            <svg id="menu-icon-open" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg id="menu-icon-close" class="hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
            </button>
        </div>
    </div>

    <nav id="mobile-menu" class="hidden md:hidden border-t border-slate-200 bg-white">
        <ul class="px-4 py-1 list-none m-0">
            <li><a href="<?php echo esc_url(home_url('/about/')); ?>" class="block py-3 text-base text-slate-700 border-b border-slate-100">会社概要</a></li>
            <li><a href="<?php echo esc_url(home_url('/philosophy/')); ?>" class="block py-3 text-base text-slate-700 border-b border-slate-100">企業理念</a></li>
            <li><a href="<?php echo esc_url(home_url('/products/')); ?>" class="block py-3 text-base text-slate-700 border-b border-slate-100">製品</a></li>
            <li><a href="<?php echo esc_url(home_url('/history/')); ?>" class="block py-3 text-base text-slate-700 border-b border-slate-100">沿革</a></li>
            <li><a href="<?php echo esc_url(home_url('/contact/')); ?>" class="block py-3 text-base text-slate-700 border-b border-slate-100">お問い合わせ</a></li>
        </ul>
        <div class="px-4 py-4 bg-slate-50 border-t border-slate-200">
            <p class="text-xs text-slate-500 uppercase tracking-wider mb-2">Language</p>
            <div class="grid grid-cols-2 gap-2">
                <a href="#" class="text-center py-2.5 rounded text-sm font-medium border bg-brand-900 text-white border-brand-900">日本語</a>
                <a href="#" class="text-center py-2.5 rounded text-sm font-medium border bg-white border-slate-300 text-slate-700 hover:bg-slate-100">English</a>
            </div>
        </div>
    </nav>
</header>

<main class="pt-16">

<script>
(() => {
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const iconOpen = document.getElementById('menu-icon-open');
    const iconClose = document.getElementById('menu-icon-close');

    toggle?.addEventListener('click', () => {
        const isOpen = menu?.classList.toggle('hidden') === false;
        toggle?.setAttribute('aria-expanded', String(isOpen));
        iconOpen?.classList.toggle('hidden', isOpen);
        iconClose?.classList.toggle('hidden', !isOpen);
    });

    menu?.querySelectorAll('a').forEach((a) =>
        a.addEventListener('click', () => {
            menu?.classList.add('hidden');
            toggle?.setAttribute('aria-expanded', 'false');
            iconOpen?.classList.remove('hidden');
            iconClose?.classList.add('hidden');
        })
    );
})();
</script>
