<?php
/**
 * 製品 個別ページ
 */
get_header();
?>

<section class="py-20 max-w-4xl mx-auto px-4">
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        <nav class="text-sm text-slate-500 mb-4">
            <a href="<?php echo esc_url(home_url('/products/')); ?>" class="hover:text-brand-600">土木・建設資材</a>
            <span class="mx-2">/</span>
            <span><?php the_title(); ?></span>
        </nav>

        <h1 class="text-2xl md:text-3xl font-bold border-l-4 border-accent-400 pl-3 mb-2 text-brand-900">
            <?php the_title(); ?>
        </h1>
        <p class="text-sm text-slate-500 mb-10 ml-1">
            <?php echo esc_html(get_post_meta(get_the_ID(), 'product_en', true)); ?>
        </p>

        <?php if (has_post_thumbnail()) : ?>
            <div class="mb-10">
                <?php the_post_thumbnail('large', ['class' => 'w-full h-auto rounded']); ?>
            </div>
        <?php endif; ?>

        <article class="prose-jp">
            <?php the_content(); ?>
        </article>

        <div class="mt-10 flex flex-wrap gap-3">
            <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="bg-brand-900 text-white font-semibold px-5 py-3 rounded hover:bg-brand-700 transition-colors">
                お問い合わせ →
            </a>
        </div>
    <?php endwhile; endif; ?>
</section>

<?php get_footer();
