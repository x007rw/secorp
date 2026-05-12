/**
 * microCMS API レスポンス型定義
 * スキーマは docs/microcms-schema.md と一致させる
 */

export type Lang = 'ja' | 'en';

export interface MicroCMSImage {
  url: string;
  width: number;
  height: number;
}

interface BaseFields {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
}

export type ProductCategory = 'shield-segment' | 'concrete-reinforcement' | 'mold';
export type NewsCategory = 'announcement' | 'media' | 'event';

export interface ProductSpec {
  fieldId: 'spec';
  label: string;
  value: string;
}

export interface Product extends BaseFields {
  slug: string;
  category: [ProductCategory];
  order: number;
  title_ja: string;
  title_en?: string;
  excerpt_ja: string;
  excerpt_en?: string;
  body_ja?: string;
  body_en?: string;
  image: MicroCMSImage;
  gallery?: MicroCMSImage[];
  spec?: ProductSpec[];
}

export interface News extends BaseFields {
  slug: string;
  category?: [NewsCategory];
  published_at: string;
  title_ja: string;
  title_en?: string;
  body_ja: string;
  body_en?: string;
  thumbnail?: MicroCMSImage;
}

export interface Page extends BaseFields {
  slug: string;
  title_ja: string;
  title_en?: string;
  body_ja: string;
  body_en?: string;
  meta_description_ja?: string;
  meta_description_en?: string;
}

export interface Settings {
  company_name_ja: string;
  company_name_en: string;
  tel: string;
  fax?: string;
  email: string;
  address_ja: string;
  address_en?: string;
}

export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

/**
 * 多言語フィールドから言語別の値を取得するヘルパー
 * 英語が未設定なら日本語にフォールバック
 */
export function localized<T extends Record<string, unknown>>(
  obj: T,
  field: string,
  lang: Lang,
): string {
  const key = `${field}_${lang}` as keyof T;
  const fallbackKey = `${field}_ja` as keyof T;
  return (obj[key] as string) || (obj[fallbackKey] as string) || '';
}
