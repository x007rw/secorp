<?php
/**
 * フォールバックテンプレート（front-page.php / page.php がない場合に使用）
 */
get_header();
?>

<section class="py-20 max-w-4xl mx-auto px-4">
    <h1 class="text-2xl md:text-3xl font-bold border-l-4 border-accent-400 pl-3 mb-6 text-brand-900">
        <?php the_title(); ?>
    </h1>

    <?php if (have_posts()) : ?>
        <?php while (have_posts()) : the_post(); ?>
            <article class="prose-jp">
                <?php the_content(); ?>
            </article>
        <?php endwhile; ?>
    <?php else : ?>
        <p class="text-slate-600">コンテンツが見つかりませんでした。</p>
    <?php endif; ?>
</section>

<?php
get_footer();
