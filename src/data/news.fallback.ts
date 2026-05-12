/**
 * microCMS未接続時のフォールバックデータ（お知らせ）
 */
import type { News } from '../types/microcms';

export const fallbackNews: News[] = [
  {
    id: 'website-renewal',
    createdAt: '2026-05-01T00:00:00.000Z',
    updatedAt: '2026-05-01T00:00:00.000Z',
    slug: 'website-renewal',
    category: ['announcement'],
    published_at: '2026-05-01T00:00:00.000Z',
    title_ja: 'ホームページをリニューアルしました',
    title_en: 'Our website has been renewed',
    body_ja: '<p>株式会社鈴木エンタープライズです。この度、当社ホームページをリニューアルいたしました。今後ともよろしくお願いいたします。</p>',
    body_en: '<p>This is SUZUKI ENTERPRISE CO., LTD. We have renewed our corporate website. Thank you for your continued support.</p>',
  },
];
