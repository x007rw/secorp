<?php
/**
 * 製品 一覧ページ
 */
get_header();
?>

<section class="py-20 max-w-6xl mx-auto px-4">
    <h1 class="text-2xl md:text-3xl font-bold border-l-4 border-accent-400 pl-3 mb-2 text-brand-900">土木・建設資材</h1>
    <p class="text-sm text-slate-500 mb-10 ml-1">Civil Engineering &amp; Construction Materials</p>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
            <a href="<?php the_permalink(); ?>" class="group bg-white border border-slate-200 rounded overflow-hidden shadow-sm hover:shadow-md hover:border-accent-400 transition-all">
                <?php if (has_post_thumbnail()) : ?>
                    <div class="aspect-video overflow-hidden bg-slate-100">
                        <?php the_post_thumbnail('large', [
                            'class'   => 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500',
                            'loading' => 'lazy',
                        ]); ?>
                    </div>
                <?php endif; ?>
                <div class="p-5">
                    <p class="text-xs text-slate-500 uppercase tracking-wider mb-1">
                        <?php echo esc_html(get_post_meta(get_the_ID(), 'product_en', true)); ?>
                    </p>
                    <h3 class="font-bold mb-2 text-brand-900 group-hover:text-brand-600 transition-colors">
                        <?php the_title(); ?>
                    </h3>
                    <p class="text-sm text-slate-600 leading-relaxed">
                        <?php echo esc_html(wp_trim_words(get_the_excerpt(), 60, '…')); ?>
                    </p>
                    <span class="inline-block mt-3 text-xs font-semibold text-accent-600">詳しく見る →</span>
                </div>
            </a>
        <?php endwhile; endif; ?>
    </div>
</section>

<?php get_footer();
