/**
 * DeepL 自動翻訳スクリプト
 *
 * 役割:
 *   microCMS の products / news の日本語フィールドを DeepL で英訳し、
 *   英語フィールドが空のエントリのみ自動で書き戻す。
 *
 * 実行方法:
 *   1. .env を用意（MICROCMS_SERVICE_DOMAIN, MICROCMS_WRITE_API_KEY, DEEPL_API_KEY）
 *   2. node scripts/translate.mjs [--all] [--dry-run]
 *      --all     既に英語が入っているフィールドも上書きする
 *      --dry-run microCMSへの書き込みを行わない（翻訳結果だけ確認）
 *
 * DeepL API Free:
 *   月50万文字まで無料、クレカ登録のみで課金なし
 *   https://www.deepl.com/pro-api
 */
import 'dotenv/config';
import { createClient } from 'microcms-js-sdk';

const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
const WRITE_KEY = process.env.MICROCMS_WRITE_API_KEY;
const DEEPL_KEY = process.env.DEEPL_API_KEY;

if (!SERVICE_DOMAIN || !WRITE_KEY || !DEEPL_KEY) {
  console.error('必要な環境変数が不足しています: MICROCMS_SERVICE_DOMAIN, MICROCMS_WRITE_API_KEY, DEEPL_API_KEY');
  process.exit(1);
}

const args = process.argv.slice(2);
const FORCE_ALL = args.includes('--all');
const DRY_RUN = args.includes('--dry-run');

// DeepL Free API のエンドポイント（クレカ登録した無料プランは api-free.deepl.com）
const DEEPL_ENDPOINT = DEEPL_KEY.endsWith(':fx')
  ? 'https://api-free.deepl.com/v2/translate'
  : 'https://api.deepl.com/v2/translate';

const client = createClient({ serviceDomain: SERVICE_DOMAIN, apiKey: WRITE_KEY });

/**
 * 業界用語の用語集（DeepLに事前提示するヒント）
 * DeepL Glossary 機能を使う場合は別途登録、ここではテキスト前処理で代替
 */
const GLOSSARY = [
  ['シールド工法', 'shield tunneling method'],
  ['鋼製セグメント', 'steel segment'],
  ['RCセグメント', 'RC segment'],
  ['スチール・ファイバー', 'steel fiber'],
  ['ポリプロピレン・ファイバー', 'polypropylene fiber'],
  ['BUNDREX', 'BUNDREX'],
  ['KOSTEEL', 'KOSTEEL'],
  ['ゼネコン', 'general contractor'],
];

/**
 * DeepL API 呼び出し（日→英）
 */
async function translateJaToEn(text) {
  if (!text || text.trim() === '') return '';

  const params = new URLSearchParams();
  params.append('text', text);
  params.append('source_lang', 'JA');
  params.append('target_lang', 'EN-US');
  params.append('preserve_formatting', '1');
  // HTML タグを保護
  if (/<[a-z][\s\S]*>/i.test(text)) {
    params.append('tag_handling', 'html');
  }

  const res = await fetch(DEEPL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `DeepL-Auth-Key ${DEEPL_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepL API error ${res.status}: ${err}`);
  }

  const json = await res.json();
  return json.translations?.[0]?.text ?? '';
}

/**
 * 多言語フィールドペアの英訳が必要か判定
 */
function needsTranslation(entry, field) {
  const ja = entry[`${field}_ja`];
  const en = entry[`${field}_en`];
  if (!ja) return false;
  if (FORCE_ALL) return true;
  return !en || en.trim() === '';
}

/**
 * 1エンドポイントの全件処理
 */
async function processEndpoint(endpoint, fields) {
  console.log(`\n=== ${endpoint} の翻訳開始 ===`);
  const res = await client.getList({ endpoint, queries: { limit: 100 } });
  console.log(`${res.contents.length}件のエントリを取得`);

  let translatedCount = 0;
  let skippedCount = 0;

  for (const entry of res.contents) {
    const patch = {};
    let charCount = 0;

    for (const field of fields) {
      if (needsTranslation(entry, field)) {
        const ja = entry[`${field}_ja`];
        console.log(`  [${entry.id}] ${field}_ja → ${field}_en を翻訳中... (${ja.length}文字)`);
        const en = await translateJaToEn(ja);
        patch[`${field}_en`] = en;
        charCount += ja.length;
      }
    }

    if (Object.keys(patch).length === 0) {
      skippedCount++;
      continue;
    }

    if (DRY_RUN) {
      console.log(`  [${entry.id}] DRY-RUN: patch=`, patch);
    } else {
      await client.update({ endpoint, contentId: entry.id, content: patch });
      console.log(`  [${entry.id}] 更新完了 (${charCount}文字)`);
    }
    translatedCount++;
  }

  console.log(`\n${endpoint}: 翻訳 ${translatedCount} 件 / スキップ ${skippedCount} 件`);
}

async function main() {
  console.log(`DeepL endpoint: ${DEEPL_ENDPOINT}`);
  console.log(`Mode: ${DRY_RUN ? 'DRY-RUN' : 'WRITE'}, FORCE_ALL: ${FORCE_ALL}`);

  await processEndpoint('products', ['title', 'excerpt', 'body']);
  await processEndpoint('news', ['title', 'body']);
  await processEndpoint('pages', ['title', 'body', 'meta_description']);

  console.log('\n✅ 翻訳処理が完了しました');
}

main().catch((err) => {
  console.error('❌ エラーが発生しました:', err);
  process.exit(1);
});
