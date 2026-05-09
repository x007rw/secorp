<?php
/**
 * 固定ページ デフォルトテンプレート
 */
get_header();
?>

<section class="py-20 max-w-4xl mx-auto px-4">
    <?php if (have_posts()) : ?>
        <?php while (have_posts()) : the_post(); ?>
            <h1 class="text-2xl md:text-3xl font-bold border-l-4 border-accent-400 pl-3 mb-2 text-brand-900">
                <?php the_title(); ?>
            </h1>
            <p class="text-sm text-slate-500 mb-10 ml-1">
                <?php echo esc_html(get_post_meta(get_the_ID(), 'subtitle_en', true)); ?>
            </p>
            <article class="prose-jp">
                <?php the_content(); ?>
            </article>
        <?php endwhile; ?>
    <?php endif; ?>
</section>

<?php get_footer();
