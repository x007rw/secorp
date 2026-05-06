import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const src = await readFile(join(root, 'public/images/logo.svg'));

// 透過PNG（SVGをそのままレンダリング）
async function renderTransparent(size, out) {
  await sharp(src, { density: 300 })
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(root, 'public', out));
  console.log(`✓ ${out} (${size}×${size}, transparent)`);
}

// 白背景PNG（OGP・Apple Touch Icon用）
async function renderWhiteBg(size, out) {
  await sharp(src, { density: 300 })
    .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .flatten({ background: '#ffffff' })
    .png()
    .toFile(join(root, 'public', out));
  console.log(`✓ ${out} (${size}×${size}, white)`);
}

// OGP画像（1200×630、白背景にロゴ中央配置）
async function renderOgp() {
  const logoBuf = await sharp(src, { density: 300 })
    .resize(500, 500, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: logoBuf, gravity: 'center' }])
    .png()
    .toFile(join(root, 'public', 'images/ogp.png'));
  console.log('✓ images/ogp.png (1200×630, white bg + centered logo)');
}

// Favicons (transparent for modern browsers)
await renderTransparent(32, 'favicon-32.png');
await renderTransparent(192, 'favicon-192.png');
await renderTransparent(512, 'favicon-512.png');

// Apple Touch Icon (white bg recommended for iOS)
await renderWhiteBg(180, 'apple-touch-icon.png');

// OGP画像
await renderOgp();

console.log('\nDone!');
