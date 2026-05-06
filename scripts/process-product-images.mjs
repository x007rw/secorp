import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dir = join(root, 'public/images/products');

async function extractAndSave(srcName, region, outName, target = 800) {
  const src = join(dir, srcName);
  const out = join(dir, outName);

  await sharp(src)
    .extract(region)
    .resize(target, target, { fit: 'cover', position: 'center' })
    .webp({ quality: 82 })
    .toFile(out);

  const meta = await sharp(out).metadata();
  console.log(`✓ ${outName} (${meta.width}×${meta.height}, ${(meta.size / 1024).toFixed(1)}KB)`);
}

// 91_o.jpeg (1124×271): 2-panel tunnel shot — left=clean tunnel, right=green-tinted
await extractAndSave('91_o.jpeg', { left: 0, top: 0, width: 562, height: 271 }, 'shield-tunnel.webp');

// 87_o.jpeg (1240×267): 4-panel fiber materials
//   panel 1 (0–310): steel fiber bundles (best for Bundrex/Steel fiber)
//   panel 3 (620–930): PP fiber in plastic bag (best for PP fiber)
await extractAndSave('87_o.jpeg', { left: 0, top: 0, width: 310, height: 267 }, 'steel-fiber.webp');
await extractAndSave('87_o.jpeg', { left: 620, top: 0, width: 310, height: 267 }, 'pp-fiber.webp');

// 94_o.png (1135×242): 4-panel factory/manufacturing scenes
//   panel 2 (284–568): metal coils — best for mould/manufacturing
await extractAndSave('94_o.png', { left: 284, top: 0, width: 284, height: 242 }, 'mould.webp');

console.log('\nAll images processed.');
