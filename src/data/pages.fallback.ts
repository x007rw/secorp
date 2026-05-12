/**
 * microCMS未接続時のフォールバックデータ（固定ページ）
 *
 * 各ページの body_ja / body_en は HTML 文字列。
 * microCMS のリッチエディタで生成される HTML と互換性を持たせる。
 * 表示時は src/styles/global.css の .prose-jp スタイルで整形される。
 */
import type { Page } from '../types/microcms';

const now = '2026-05-12T00:00:00.000Z';

const ABOUT_HTML_JA = `
<table>
  <tbody>
    <tr><th>会社名</th><td>株式会社鈴木エンタープライズ / SUZUKI ENTERPRISE CO., LTD.</td></tr>
    <tr><th>本社所在地</th><td>〒211-0025 神奈川県川崎市中原区木月2-2-34 鈴木ビル3F</td></tr>
    <tr><th>TEL / FAX</th><td>TEL: 044-433-6399 / FAX: 044-434-8488</td></tr>
    <tr><th>設立</th><td>1967年7月</td></tr>
    <tr><th>資本金</th><td>8,000万円</td></tr>
    <tr><th>法人番号</th><td>3020001076051</td></tr>
    <tr><th>代表者</th><td>代表取締役　鈴木裕哉</td></tr>
    <tr><th>事業内容</th><td>土木・建設・プラント分野向け鉄鋼・非鉄金属原材料および加工品の輸入・卸売</td></tr>
    <tr><th>主要取扱品</th><td>シールドセグメント（RC・鋼製）、コンクリート補強繊維、土木建築用型枠、防音・保温材</td></tr>
    <tr><th>主要取引銀行</th><td>三井住友銀行・横浜銀行・城南信用金庫</td></tr>
  </tbody>
</table>
<p>東急東横線・目黒線「元住吉」駅 東口より徒歩約1分<br>JR南武線・東急東横線「武蔵小杉」駅 南口より徒歩約15分</p>
`.trim();

const PHILOSOPHY_HTML_JA = `
<h2>ご挨拶</h2>
<p>私共、株式会社鈴木エンタープライズは半世紀以上にわたり東アジアを中心に、鉄鋼・土木建築資材の品質向上とコスト削減に努めて参りました。今後も日本のインフラ事業の安全性の向上、高品質、コスト削減に努めて参ります。</p>
<p>しかしながら本邦並びに先進国の多くは出生率低下による人口の減少、ひいては日本の土木・インフラ事業に関わる技術者や作業員の減少にともない、新旧合わせたインフラ構造物の評価・検査体制の維持が困難になっております。そして本邦ではインフラや土木構造物の安全率を高める命題のあまりに人件費の高騰を招き、ひいてはインフラ事業そのもののコストが大幅に上昇している現況です。</p>
<p>私共はこういった二律背反の命題、安全率の向上とコスト削減を同時に達成する為に、何が必要か長年考えて参りましたが、それはやはり人間の自由な意志と発想によるイノベーション（Innovation）に他ならないと確信しております。ここで言うイノベーションとは、ドラスティックな発明でなくとも、これら製品の製造工程を改良することによって、コスト削減も品質向上も同時に成しえることも入ります。</p>
<p>実際に私共の鋼製セグメントの製造監理チームは各種提携工場においてある特殊な工法を導入することによって、これを（コスト削減と品質向上の両立）を達成しました。</p>
<p>私共の製造監理技術者のみならず、アジアに広がる提携先の製造工場の技術者も日本のみならずアジアの宝だと信じております。この為には、これら技術者の知見をITによって「見える化・データ化」も必要になってきますが、これは今後の課題です。今は私共と提携工場の技術者を含めて組織化し、プラットフォーム又は「ビジネス・エコシステム」を構築し、アジア、ひいては世界の土木・インフラに安全性とコスト削減の両立を提案してまいります。</p>

<h2>企業理念</h2>
<p>アジアのインフラに、安全性とコスト削減を提供する。</p>

<h2>企業ヴィジョン</h2>
<ul>
  <li><strong>VISION 1</strong>: 人間主義によって土木製品・インフラの品質の向上とコスト削減を同時に達成する。</li>
  <li><strong>VISION 2</strong>: 広くアジアの人材・技術者を集め、プラットフォームを形成してアジアの土木・インフラに広く貢献する。</li>
  <li><strong>VISION 3</strong>: アジア及び世界に同様のビジネスパートナーと集い、後世の人材の育成・技術の派生に努める。</li>
</ul>
`.trim();

const HISTORY_HTML_JA = `
<table>
  <tbody>
    <tr><th>1967</th><td>株式会社鈴木エンタープライズ設立</td></tr>
    <tr><th>1972〜</th><td>韓国浦項製鉄(POSCO)鋼材の本邦独占代理店として供給開始</td></tr>
    <tr><th>1978〜</th><td>中近東・アジア圏プロジェクト向け建設資材・機器の供給</td></tr>
    <tr><th>1982〜</th><td>韓国製鉄鋼製品（鋼管杭・溶接材料）の独自供給・販売システム構築</td></tr>
    <tr><th>1988〜</th><td>韓国製セメント（東洋セメント・雙龍セメント）の供給・販売開始</td></tr>
    <tr><th>1996〜</th><td>RC・鋼製セグメントの海外調達・供給開始（国交省・鉄道・地下鉄・電気・ガス・水道シールド事業へ納入）</td></tr>
    <tr><th>2008〜</th><td>コンクリート補強繊維（スチール／ポリプロピレン）の海外調達・供給（SFRCセグメント年間2,000MTペース）</td></tr>
    <tr><th>2023〜</th><td>土木・建築用型枠の包括的海外製造体制を構築</td></tr>
  </tbody>
</table>
`.trim();

const ACCESS_HTML_JA = `
<h2>住所</h2>
<p>〒211-0025<br>神奈川県川崎市中原区木月2-2-34 鈴木ビル3F</p>

<h2>連絡先</h2>
<p>TEL: 044-433-6399 / FAX: 044-434-8488</p>

<h2>最寄駅</h2>
<ul>
  <li>東急東横線・目黒線「元住吉」駅 東口より徒歩約1分</li>
  <li>JR南武線・東急東横線「武蔵小杉」駅 南口より徒歩約15分</li>
</ul>

<iframe src="https://maps.google.co.jp/maps?q=Japan,kanagawa,kawasaki,nakaharaku,kizuki%202-2-34&z=16&output=embed" width="100%" height="320" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="鈴木エンタープライズ 所在地" style="border: 1px solid #e2e8f0; border-radius: 4px; margin-top: 1rem;"></iframe>
`.trim();

const PRIVACY_HTML_JA = `
<p>株式会社鈴木エンタープライズ（以下「当社」といいます）は、お客様の個人情報の保護を重要な責務と認識し、個人情報の保護に関する法律その他の関連法令を遵守し、適正な取扱いに努めます。</p>

<h2>1. 個人情報の利用目的</h2>
<ul>
  <li>お問い合わせ・資料請求への対応</li>
  <li>商品・サービスのご提案、お見積りの提示</li>
  <li>取引履行のための連絡・契約管理</li>
  <li>採用選考</li>
  <li>当社サービスの改善および新サービス開発</li>
</ul>

<h2>2. 個人情報の第三者提供</h2>
<p>当社は、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。</p>

<h2>3. Cookieおよび類似技術の使用</h2>
<p>Cookie とは、ウェブサイトを訪問した際にブラウザに保存される小さなテキストファイルです。当社ウェブサイトでは、利用状況の把握およびサービス向上のために以下のCookieおよび類似技術を使用することがあります。</p>
<table>
  <thead>
    <tr><th>種類</th><th>用途</th><th>提供元</th></tr>
  </thead>
  <tbody>
    <tr><td>必須Cookie</td><td>サイトの基本動作</td><td>当社</td></tr>
    <tr><td>分析Cookie</td><td>アクセス状況の把握、改善</td><td>Google Analytics 4</td></tr>
  </tbody>
</table>
<p>ブラウザの設定からCookieの受け入れ可否や削除を行うことができます。Cookieを無効にすると、当サイトの一部機能が正常に動作しない場合があります。</p>
<p>第三者のプライバシーポリシーは下記をご参照ください：</p>
<ul>
  <li><a href="https://policies.google.com/privacy?hl=ja" target="_blank" rel="noopener">Google プライバシーポリシー</a></li>
</ul>

<h2>4. 個人情報の開示・訂正・削除</h2>
<p>ご本人から個人情報の開示・訂正・削除のご請求があった場合、合理的な範囲で速やかに対応いたします。</p>

<h2>5. お問い合わせ窓口</h2>
<p>株式会社鈴木エンタープライズ<br>〒211-0025 神奈川県川崎市中原区木月2-2-34 鈴木ビル3F<br>TEL: 044-433-6399</p>

<h2>6. 改定</h2>
<p>本プライバシーポリシーは必要に応じて改定する場合があります。最新版は本ウェブサイト上に掲載いたします。</p>

<p style="text-align: right; color: #64748b; font-size: 0.875rem; margin-top: 2rem;">最終改定日：2026年5月6日</p>
`.trim();

export const fallbackPages: Record<string, Page> = {
  about: {
    id: 'about',
    createdAt: now,
    updatedAt: now,
    slug: 'about',
    title_ja: '会社概要',
    title_en: 'Company Overview',
    body_ja: ABOUT_HTML_JA,
    body_en: '',
    meta_description_ja: '株式会社鈴木エンタープライズの会社概要。1967年創業、川崎市中原区を拠点とする土木・建設資材の専門商社。代表取締役 鈴木 裕哉。',
    meta_description_en: 'Company overview of SUZUKI ENTERPRISE CO., LTD. Established 1967, based in Kawasaki, Japan. CEO: Hiroya Suzuki.',
  },
  philosophy: {
    id: 'philosophy',
    createdAt: now,
    updatedAt: now,
    slug: 'philosophy',
    title_ja: '企業理念',
    title_en: 'Our Concept',
    body_ja: PHILOSOPHY_HTML_JA,
    body_en: '',
    meta_description_ja: '株式会社鈴木エンタープライズの企業理念とビジョン。アジアのインフラに安全性とコスト削減を提供することを使命に、人間主義によるイノベーションでインフラを支える。',
    meta_description_en: 'Our concept and vision: providing safety and cost efficiency for Asian infrastructure through human-centered innovation.',
  },
  history: {
    id: 'history',
    createdAt: now,
    updatedAt: now,
    slug: 'history',
    title_ja: '沿革',
    title_en: 'History',
    body_ja: HISTORY_HTML_JA,
    body_en: '',
    meta_description_ja: '株式会社鈴木エンタープライズの沿革。1967年創業、POSCO日本独占代理店、シールドセグメント供給、コンクリート補強繊維SFRC年間2,000MT。',
    meta_description_en: 'History of SUZUKI ENTERPRISE CO., LTD. since 1967.',
  },
  access: {
    id: 'access',
    createdAt: now,
    updatedAt: now,
    slug: 'access',
    title_ja: 'アクセス',
    title_en: 'Access',
    body_ja: ACCESS_HTML_JA,
    body_en: '',
    meta_description_ja: '株式会社鈴木エンタープライズへのアクセス。神奈川県川崎市中原区木月、東急東横線・目黒線「元住吉」駅から徒歩1分。',
    meta_description_en: 'Access to SUZUKI ENTERPRISE CO., LTD. 1-minute walk from Motosumiyoshi Station, Kawasaki.',
  },
  privacy: {
    id: 'privacy',
    createdAt: now,
    updatedAt: now,
    slug: 'privacy',
    title_ja: 'プライバシーポリシー',
    title_en: 'Privacy Policy',
    body_ja: PRIVACY_HTML_JA,
    body_en: '',
    meta_description_ja: '株式会社鈴木エンタープライズのプライバシーポリシー。個人情報の取扱いについて。',
    meta_description_en: 'Privacy policy of SUZUKI ENTERPRISE CO., LTD.',
  },
};
