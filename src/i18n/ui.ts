export const languages = {
  ja: '日本語',
  en: 'English',
} as const;

export const defaultLang = 'ja';

export type Lang = keyof typeof languages;

export const ui = {
  ja: {
    'site.name': '株式会社鈴木エンタープライズ',
    'site.tagline': 'アジアのインフラに、安全性とコスト削減を。',
    'site.description': '株式会社鈴木エンタープライズは、シールド工法用RC・鋼製セグメント、コンクリート補強用スチール・ファイバー／ポリプロピレン・ファイバー、土木建築用型枠などを供給する川崎市の専門商社です。',
    'nav.home': 'ホーム',
    'nav.company': '企業情報',
    'nav.products': '製品',
    'nav.projects': '実績',
    'nav.news': 'ニュース',
    'nav.contact': 'お問い合わせ',
    'nav.about': '会社概要',
    'nav.philosophy': '企業理念',
    'nav.history': '沿革',
    'nav.message': '社長メッセージ',
    'nav.access': 'アクセス',
    'cta.contact': 'お問い合わせ',
    'cta.learnMore': '詳しくはこちら',
    'cta.viewProducts': '製品を見る',
    'cta.viewAll': 'すべて見る',
    'footer.address': '神奈川県川崎市中原区木月2-2-34 鈴木ビル3F',
    'footer.tel': 'TEL：044-433-6399',
    'footer.fax': 'FAX：044-434-8488',
    'footer.copyright': '© SUZUKI ENTERPRISE CO., LTD.',
    'footer.privacy': 'プライバシーポリシー',
    'footer.cookies': 'Cookie ポリシー',
    'footer.sitemap': 'サイトマップ',
  },
  en: {
    'site.name': 'SUZUKI ENTERPRISE CO., LTD.',
    'site.tagline': "Safety and cost efficiency for Asia's infrastructure.",
    'site.description': "SUZUKI ENTERPRISE CO., LTD. supplies RC and steel shield-tunnel segments, concrete reinforcement steel/PP fibers, and civil/architectural moulds — based in Kawasaki, Japan.",
    'nav.home': 'Home',
    'nav.company': 'Company',
    'nav.products': 'Products',
    'nav.projects': 'Projects',
    'nav.news': 'News',
    'nav.contact': 'Contact',
    'nav.about': 'About',
    'nav.philosophy': 'Concept',
    'nav.history': 'History',
    'nav.message': 'CEO Message',
    'nav.access': 'Access',
    'cta.contact': 'Contact Us',
    'cta.learnMore': 'Learn more',
    'cta.viewProducts': 'View Products',
    'cta.viewAll': 'View all',
    'footer.address': 'Suzuki Bldg. 3F, 2-2-34 Kizuki, Nakahara-ku, Kawasaki, Kanagawa, JAPAN',
    'footer.tel': 'TEL: +81-44-433-6399',
    'footer.fax': 'FAX: +81-44-434-8488',
    'footer.copyright': '© SUZUKI ENTERPRISE CO., LTD.',
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
