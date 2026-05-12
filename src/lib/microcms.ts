/**
 * microCMS API クライアント
 *
 * 設計方針:
 * - MICROCMS_API_KEY が設定されていれば API から取得
 * - 未設定なら src/data/*.fallback.ts のローカルデータを使用
 * - これによりmicroCMSアカウント未契約でも開発・ビルド可能
 */
import { createClient } from 'microcms-js-sdk';
import type { Product, News, Page, Settings, MicroCMSListResponse } from '../types/microcms';
import { fallbackProducts } from '../data/products.fallback';
import { fallbackNews } from '../data/news.fallback';
import { fallbackPages } from '../data/pages.fallback';

const serviceDomain = import.meta.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = import.meta.env.MICROCMS_API_KEY;

export const isMicroCMSEnabled = Boolean(serviceDomain && apiKey);

const client = isMicroCMSEnabled
  ? createClient({
      serviceDomain: serviceDomain!,
      apiKey: apiKey!,
    })
  : null;

if (!isMicroCMSEnabled) {
  console.warn(
    '[microCMS] MICROCMS_SERVICE_DOMAIN または MICROCMS_API_KEY が未設定です。フォールバックデータを使用します。',
  );
}

/**
 * 製品一覧（表示順でソート）
 */
export async function getProducts(): Promise<Product[]> {
  if (!client) {
    return [...fallbackProducts].sort((a, b) => a.order - b.order);
  }
  const res = await client.getList<Product>({
    endpoint: 'products',
    queries: { orders: 'order', limit: 100 },
  });
  return res.contents;
}

/**
 * 製品個別（slug指定）
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!client) {
    return fallbackProducts.find((p) => p.slug === slug) ?? null;
  }
  const res = await client.getList<Product>({
    endpoint: 'products',
    queries: { filters: `slug[equals]${slug}`, limit: 1 },
  });
  return res.contents[0] ?? null;
}

/**
 * お知らせ一覧（公開日降順）
 */
export async function getNews(limit = 20): Promise<News[]> {
  if (!client) {
    return [...fallbackNews]
      .sort((a, b) => b.published_at.localeCompare(a.published_at))
      .slice(0, limit);
  }
  const res = await client.getList<News>({
    endpoint: 'news',
    queries: { orders: '-published_at', limit },
  });
  return res.contents;
}

/**
 * お知らせ個別
 */
export async function getNewsBySlug(slug: string): Promise<News | null> {
  if (!client) {
    return fallbackNews.find((n) => n.slug === slug) ?? null;
  }
  const res = await client.getList<News>({
    endpoint: 'news',
    queries: { filters: `slug[equals]${slug}`, limit: 1 },
  });
  return res.contents[0] ?? null;
}

/**
 * 固定ページ
 * microCMSにあればそれを使い、なければフォールバックを返す
 */
export async function getPageBySlug(slug: string): Promise<Page | null> {
  if (!client) {
    return fallbackPages[slug] ?? null;
  }
  const res = await client.getList<Page>({
    endpoint: 'pages',
    queries: { filters: `slug[equals]${slug}`, limit: 1 },
  });
  return res.contents[0] ?? fallbackPages[slug] ?? null;
}

/**
 * サイト設定（オブジェクト形式API）
 */
export async function getSettings(): Promise<Settings | null> {
  if (!client) return null;
  return await client.getObject<Settings>({ endpoint: 'settings' });
}

/**
 * 書き込み権限付きクライアント（DeepL翻訳スクリプト等で使用）
 * Node.js 側でのみ呼ばれる前提。
 */
export function createWriteClient() {
  const writeKey = process.env.MICROCMS_WRITE_API_KEY;
  if (!serviceDomain || !writeKey) {
    throw new Error('MICROCMS_SERVICE_DOMAIN と MICROCMS_WRITE_API_KEY が必要です');
  }
  return createClient({ serviceDomain, apiKey: writeKey });
}
