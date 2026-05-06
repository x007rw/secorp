export const languages = {
  ja: '日本語',
  en: 'English',
} as const;

export const defaultLang = 'ja';

export type Lang = keyof typeof languages;

export const ui = {
  ja: {
    'site.name': '株式会社鈴木エンタープライズ',
    'site.tagline': 'シールドセグメント・コンクリート補強材の専門商社',
    'site.description': '1967年創業。シールド工法用セグメント、コンクリート補強材（バンドレックス、POWER MESH）、防音・保温材、IoTセンサーまで。POSCO日本総代理店としての歴史と実績で、土木・建設業界を支えます。',
    'nav.home': 'ホーム',
    'nav.company': '企業情報',
    'nav.products': '製品・サービス',
    'nav.projects': '施工実績',
    'nav.news': 'ニュース',
    'nav.contact': 'お問い合わせ',
    'nav.about': '会社概要',
    'nav.philosophy': '経営理念',
    'nav.history': '沿革',
    'nav.message': '社長メッセージ',
    'nav.access': 'アクセス',
    'cta.contact': 'お問い合わせ',
    'cta.learnMore': '詳しくはこちら',
    'cta.viewAll': 'すべて見る',
    'footer.address': '〒211-0025 神奈川県川崎市中原区木月２丁目２番３４号 鈴木ビル3F',
    'footer.tel': 'TEL：044-433-6399',
    'footer.fax': 'FAX：044-434-8488',
    'footer.copyright': '© 2026 SUZUKI ENTERPRISE CO., LTD. All Rights Reserved.',
    'footer.privacy': 'プライバシーポリシー',
    'footer.cookies': 'Cookie ポリシー',
    'footer.sitemap': 'サイトマップ',
  },
  en: {
    'site.name': 'SUZUKI ENTERPRISE CO., LTD.',
    'site.tagline': 'Trading specialist of shield segments and concrete reinforcement materials',
    'site.description': 'Founded in 1967. Shield-method tunnel segments, concrete reinforcement materials (BUNDREX®, POWER MESH), insulation, and IoT sensors. With our history as POSCO\'s sole agent in Japan, we support the civil engineering and construction industry.',
    'nav.home': 'Home',
    'nav.company': 'Company',
    'nav.products': 'Products',
    'nav.projects': 'Projects',
    'nav.news': 'News',
    'nav.contact': 'Contact',
    'nav.about': 'About',
    'nav.philosophy': 'Philosophy',
    'nav.history': 'History',
    'nav.message': 'CEO Message',
    'nav.access': 'Access',
    'cta.contact': 'Contact Us',
    'cta.learnMore': 'Learn more',
    'cta.viewAll': 'View all',
    'footer.address': 'SUZUKI BLDG. 3F, 2-2-34 Kizuki, Nakahara-ku, Kawasaki, Kanagawa 211-0025, JAPAN',
    'footer.tel': 'TEL: +81-44-433-6399',
    'footer.fax': 'FAX: +81-44-434-8488',
    'footer.copyright': '© 2026 SUZUKI ENTERPRISE CO., LTD. All Rights Reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookie Policy',
    'footer.sitemap': 'Sitemap',
  },
} as const;

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui.ja): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export function getLocalizedPath(path: string, lang: Lang): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return cleanPath;
  return `/${lang}${cleanPath}`;
}
