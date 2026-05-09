<?php
/**
 * フロントページ（ホーム）
 * Astro 版 src/pages/index.astro を再現
 */

$years_in_business = (int) date('Y') - 1967;

get_header();
?>

<!-- HERO -->
<section class="relative bg-brand-900 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-40">
        <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/hero-tunnel.webp" alt="" class="w-full h-full object-cover" loading="eager" width="1920" height="1081" />
    </div>
    <div class="absolute inset-0 bg-gradient-to-r from-brand-900/85 to-brand-900/30"></div>
    <div class="relative max-w-6xl mx-auto px-4 py-24 md:py-36">
        <p class="text-xs uppercase tracking-widest text-accent-300 mb-4">Civil Engineering &amp; Construction Materials</p>
        <h1 class="text-3xl md:text-5xl font-bold leading-tight">
            アジアのインフラに、<br />
            安全性とコスト削減を。
        </h1>
        <p class="mt-6 max-w-2xl text-slate-100 leading-relaxed">
            シールド工法用RC／鋼製セグメント、コンクリート補強繊維、土木建築用型枠を、半世紀以上の調達ネットワークで供給します。
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
            <a href="<?php echo esc_url(home_url('/products/')); ?>" class="bg-accent-400 text-brand-900 font-semibold px-5 py-3 rounded hover:bg-accent-300 transition-colors">製品を見る</a>
            <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="border border-white/40 px-5 py-3 rounded hover:bg-white/10 transition-colors">お問い合わせ</a>
        </div>
    </div>
</section>

<!-- INTRO -->
<section class="py-20 max-w-6xl mx-auto px-4">
    <h2 class="text-2xl md:text-3xl font-bold border-l-4 border-accent-400 pl-3 mb-8 text-brand-900">私たちについて</h2>
    <div class="grid md:grid-cols-2 gap-10 items-start">
        <div class="space-y-4 leading-relaxed text-slate-700">
            <p>株式会社鈴木エンタープライズは1967年の創業以来、半世紀以上にわたり東アジアを中心に、鉄鋼・土木建築資材の品質向上とコスト削減に取り組んでまいりました。</p>
            <p>シールド工法用セグメント（RC・鋼製）、コンクリート補強繊維（KOSTEEL社 BUNDREX®日本総代理店）、土木建築用型枠など、日本のインフラ事業を支える資材を、信頼の調達ネットワークで安定供給しています。</p>
            <a href="<?php echo esc_url(home_url('/company/about/')); ?>" class="inline-block mt-2 text-brand-600 hover:text-accent-600 font-semibold">会社概要を見る →</a>
        </div>
        <div class="grid grid-cols-3 gap-3 text-center">
            <div class="bg-slate-50 p-5 rounded border border-slate-200">
                <div class="text-3xl font-bold text-brand-900"><?php echo $years_in_business; ?><span class="text-base text-slate-500">年</span></div>
                <p class="text-xs text-slate-600 mt-1">事業歴<br />（1967年創業）</p>
            </div>
            <div class="bg-slate-50 p-5 rounded border border-slate-200">
                <div class="text-3xl font-bold text-brand-900">2,000<span class="text-base text-slate-500">MT</span></div>
                <p class="text-xs text-slate-600 mt-1">SFRC補強繊維<br />年間供給</p>
            </div>
            <div class="bg-slate-50 p-5 rounded border border-slate-200">
                <div class="text-3xl font-bold text-brand-900">±1<span class="text-base text-slate-500">mm</span></div>
                <p class="text-xs text-slate-600 mt-1">鋼製セグメント<br />寸法精度</p>
            </div>
        </div>
    </div>
</section>

<!-- PRODUCTS -->
<section class="py-20 bg-slate-50">
    <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-2xl md:text-3xl font-bold border-l-4 border-accent-400 pl-3 mb-8 text-brand-900">土木・建設資材</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php
            $products = new WP_Query([
                'post_type'      => 'product',
                'posts_per_page' => 6,
                'orderby'        => 'menu_order',
                'order'          => 'ASC',
            ]);

            if ($products->have_posts()) :
                while ($products->have_posts()) : $products->the_post();
            ?>
                <a href="<?php the_permalink(); ?>" class="group bg-white border border-slate-200 rounded overflow-hidden shadow-sm hover:shadow-md hover:border-accent-400 transition-all">
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="aspect-video overflow-hidden bg-slate-100">
                            <?php the_post_thumbnail('large', [
                                'class' => 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500',
                                'loading' => 'lazy',
                            ]); ?>
                        </div>
                    <?php endif; ?>
                    <div class="p-5">
                        <h3 class="font-bold mb-2 text-brand-900 group-hover:text-brand-600 transition-colors">
                            <?php the_title(); ?>
                        </h3>
                        <p class="text-sm text-slate-600 leading-relaxed">
                            <?php echo esc_html(wp_trim_words(get_the_excerpt(), 60, '…')); ?>
                        </p>
                    </div>
                </a>
            <?php
                endwhile;
                wp_reset_postdata();
            else :
            ?>
                <p class="col-span-3 text-center text-slate-500 py-12">製品が登録されていません。<br />管理画面から「製品 → 新規追加」で登録してください。</p>
            <?php endif; ?>
        </div>
    </div>
</section>

<?php get_footer();
