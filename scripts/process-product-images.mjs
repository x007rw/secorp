import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { readdir, unlink } from 'node:fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dir = join(root, 'public/images/products');

// 専用画像をWebP化（拡大せず、aspect-video 16:9 にトリミング）
async function convert(srcName, outName) {
  const src = join(dir, srcName);
  const out = join(dir, outName);

  const meta = await sharp(src).metadata();
  // 16:9 比率を計算（高さ・幅どちらか短い方に合わせる）
  const targetRatio = 16 / 9;
  const srcRatio = meta.width / meta.height;

  let cropW, cropH;
  if (srcRatio > targetRatio) {
    // 横長 → 高さに合わせて幅クロップ
    cropH = meta.height;
    cropW = Math.round(meta.height * targetRatio);
  } else {
    // 縦長 → 幅に合わせて高さクロップ
    cropW = meta.width;
    cropH = Math.round(meta.width / targetRatio);
  }
  const cropX = Math.round((meta.width - cropW) / 2);
  const cropY = Math.round((meta.height - cropH) / 2);

  await sharp(src)
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .webp({ quality: 88 })
    .toFile(out);

  const outMeta = await sharp(out).metadata();
  console.log(`✓ ${srcName} (${meta.width}×${meta.height}) → ${outName} (${outMeta.width}×${outMeta.height})`);
}

await convert('RCSegment.jpg', 'rc-segment.webp');
await convert('SteelFiber.jpg', 'steel-fiber.webp');
await convert('PlasticFiber.jpg', 'pp-fiber.webp');
await convert('RCSegmentFlame.jpg', 'mould.webp');

// 元のJPGを削除
for (const f of ['RCSegment.jpg', 'SteelFiber.jpg', 'PlasticFiber.jpg', 'RCSegmentFlame.jpg']) {
  await unlink(join(dir, f)).catch(() => {});
}

console.log('\nFinal images:');
const files = await readdir(dir);
for (const f of files.sort()) {
  const m = await sharp(join(dir, f)).metadata();
  const stat = await import('node:fs/promises').then(fs => fs.stat(join(dir, f)));
  console.log(`  ${f}  ${m.width}×${m.height}  ${(stat.size/1024).toFixed(1)}KB`);
}
