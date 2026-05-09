</main>

<footer class="bg-brand-900 text-slate-300 text-sm mt-20">
    <div class="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div>
            <div class="flex items-center gap-3 mb-4">
                <?php
                $logo_id = get_theme_mod('custom_logo');
                if ($logo_id) {
                    echo wp_get_attachment_image($logo_id, 'full', false, [
                        'class' => 'h-14 w-auto bg-white p-1.5 rounded',
                        'alt'   => get_bloginfo('name'),
                    ]);
                }
                ?>
                <p class="font-bold text-white"><?php bloginfo('name'); ?></p>
            </div>
            <p class="text-slate-400 leading-relaxed">
                〒211-0025<br />
                神奈川県川崎市中原区木月2-2-34 鈴木ビル3F
            </p>
        </div>
        <div>
            <p class="font-bold text-white mb-3">Menu</p>
            <ul class="space-y-1.5">
                <li><a href="<?php echo esc_url(home_url('/company/about/')); ?>" class="hover:text-white">会社概要</a></li>
                <li><a href="<?php echo esc_url(home_url('/company/philosophy/')); ?>" class="hover:text-white">企業理念</a></li>
                <li><a href="<?php echo esc_url(home_url('/products/')); ?>" class="hover:text-white">製品</a></li>
                <li><a href="<?php echo esc_url(home_url('/company/history/')); ?>" class="hover:text-white">沿革</a></li>
                <li><a href="<?php echo esc_url(home_url('/contact/')); ?>" class="hover:text-white">お問い合わせ</a></li>
            </ul>
        </div>
        <div>
            <p class="font-bold text-white mb-3">Contact</p>
            <p>TEL：044-433-6399</p>
            <p>FAX：044-434-8488</p>
            <p class="mt-3">
                <a href="<?php echo esc_url(home_url('/legal/privacy/')); ?>" class="text-slate-400 hover:text-white">プライバシーポリシー</a>
            </p>
        </div>
    </div>
    <div class="border-t border-white/10">
        <p class="max-w-6xl mx-auto px-4 py-4 text-xs text-slate-400">
            © <?php echo date('Y'); ?> SUZUKI ENTERPRISE CO., LTD.
        </p>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
