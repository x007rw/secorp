/**
 * microCMS未接続時のフォールバックデータ
 * MICROCMS_API_KEY が未設定の開発環境では、このデータが使われる
 */
import type { Product } from '../types/microcms';

export const fallbackProducts: Product[] = [
  {
    id: 'rc-segment',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    slug: 'rc-segment',
    category: ['shield-segment'],
    order: 1,
    title_ja: 'RCセグメント',
    title_en: 'RC Segment',
    excerpt_ja: 'シールド工法で構築されるトンネルの鉄筋コンクリート製内壁パーツ。日本基準のセグメントを海外提携工場で監理生産します。',
    excerpt_en: 'Reinforced concrete inner-wall segments for tunnels built by shield tunneling. Japanese-standard segments manufactured under quality control at our overseas partner factories.',
    image: {
      url: '/images/products/rc-segment.webp',
      width: 800,
      height: 450,
    },
  },
  {
    id: 'steel-segment',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    slug: 'steel-segment',
    category: ['shield-segment'],
    order: 2,
    title_ja: '鋼製セグメント',
    title_en: 'Steel Segment',
    excerpt_ja: 'ガス導管・地下鉄・道路トンネル等に用いる鋼製の内壁セグメント。寸法精度 ±1mm 以内で量産対応。',
    excerpt_en: 'Steel inner-wall segments for gas pipelines, subways, and road tunnels. Mass production with dimensional precision within ±1mm.',
    image: {
      url: '/images/products/steel-segment.webp',
      width: 800,
      height: 450,
    },
  },
  {
    id: 'mold',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    slug: 'mold',
    category: ['mold'],
    order: 3,
    title_ja: '土木・建築用型枠',
    title_en: 'Moulds (Formwork)',
    excerpt_ja: 'RCセグメント用型枠など、±0.5mm 以内の寸法精度を要求される高精度型枠。PC床板用型枠の海外製作にも対応。',
    excerpt_en: 'High-precision moulds requiring dimensional accuracy within ±0.5mm, including moulds for RC segments. Overseas manufacturing of PC floor-slab moulds also available.',
    image: {
      url: '/images/products/mould.webp',
      width: 800,
      height: 450,
    },
  },
  {
    id: 'steel-fiber',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    slug: 'steel-fiber',
    category: ['concrete-reinforcement'],
    order: 4,
    title_ja: 'スチール・ファイバー',
    title_en: 'Steel Fiber',
    excerpt_ja: '鉄筋と同じ「構造的補強」として用いる鋼繊維。韓国KOSTEEL社製 BUNDREX® の日本国内総代理店です。',
    excerpt_en: 'Steel fibers used as structural reinforcement, equivalent to rebar. We are the exclusive Japan distributor of BUNDREX® manufactured by KOSTEEL (Korea).',
    image: {
      url: '/images/products/steel-fiber.webp',
      width: 800,
      height: 450,
    },
  },
  {
    id: 'pp-fiber',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    slug: 'pp-fiber',
    category: ['concrete-reinforcement'],
    order: 5,
    title_ja: 'ポリプロピレン・ファイバー',
    title_en: 'Polypropylene Fiber',
    excerpt_ja: 'コンクリートの非構造的補強(ひび割れ・剥離防止)に用いる高強度PP繊維。日本の大手ゼネコンに納入実績。',
    excerpt_en: 'High-strength polypropylene fiber for non-structural concrete reinforcement (preventing cracking and spalling). Track record of supply to major Japanese general contractors.',
    image: {
      url: '/images/products/pp-fiber.webp',
      width: 800,
      height: 450,
    },
  },
];
