import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');
const IMAGES_DIR = path.join(REPO_ROOT, 'public', '_notion-images');
const MANIFEST_PATH = path.join(REPO_ROOT, 'lib', 'notionInlineImages.json');

const NOTION_API_KEY = process.env.NOTION_API_KEY;

// Each entry: a label (used in logs) and the database id env var.
const DATABASES = [
  { label: 'posts', dbId: process.env.NOTION_POSTS_DB_ID },
  { label: 'portfolio', dbId: process.env.NOTION_PORTFOLIO_DB_ID },
];

if (!NOTION_API_KEY) {
  console.error('Missing NOTION_API_KEY. Source your .env first.');
  process.exit(1);
}

function notionRequest(pathSuffix, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.notion.com',
      path: pathSuffix,
      method: body ? 'POST' : 'GET',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
    };
    let data = '';
    const req = https.request(options, (res) => {
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Bad JSON from ${pathSuffix}: ${data.slice(0, 200)}`));
        }
      });
    });
    req.on('error', reject);
    req.write(body ? JSON.stringify(body) : '');
    req.end();
  });
}

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Node.js' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpsGet(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function listAllPagesInDb(databaseId) {
  const pages = [];
  let cursor;
  do {
    const body = cursor ? { start_cursor: cursor } : {};
    const resp = await notionRequest(`/v1/databases/${databaseId}/query`, body);
    pages.push(...(resp.results || []));
    cursor = resp.has_more ? resp.next_cursor : undefined;
  } while (cursor);
  return pages;
}

async function listChildren(blockId) {
  const out = [];
  let cursor;
  do {
    const qs = cursor ? `?start_cursor=${encodeURIComponent(cursor)}` : '';
    const resp = await notionRequest(`/v1/blocks/${blockId}/children${qs}`);
    out.push(...(resp.results || []));
    cursor = resp.has_more ? resp.next_cursor : undefined;
  } while (cursor);
  return out;
}

async function collectImageBlocks(blockId) {
  const out = [];
  const children = await listChildren(blockId);
  for (const block of children) {
    if (block.type === 'image') out.push(block);
    if (block.has_children) {
      const nested = await collectImageBlocks(block.id);
      out.push(...nested);
    }
  }
  return out;
}

function extOf(url) {
  try {
    const p = new URL(url).pathname;
    const e = path.extname(p).toLowerCase();
    return e || '.png';
  } catch {
    return '.png';
  }
}

async function run() {
  if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

  let manifest = {};
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
    } catch {
      manifest = {};
    }
  }

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const { label, dbId } of DATABASES) {
    if (!dbId) {
      console.log(`(skipping ${label}: env var not set)`);
      continue;
    }
    const pages = await listAllPagesInDb(dbId);
    console.log(`\n[${label}] Found ${pages.length} pages. Walking blocks...`);

    for (const page of pages) {
      const slug = page.properties?.Slug?.rich_text?.[0]?.plain_text || page.id;
      const imageBlocks = await collectImageBlocks(page.id);
      if (imageBlocks.length === 0) continue;

      for (const block of imageBlocks) {
        const isFile = block.image?.type === 'file';
        const url = isFile ? block.image.file?.url : block.image.external?.url;
        if (!url) continue;
        // External URLs don't expire — record them in the manifest pointing to the URL itself
        // so the renderer treats them uniformly. Skip downloading.
        if (!isFile) {
          manifest[block.id] = url;
          continue;
        }

        const ext = extOf(url);
        const filename = `${block.id}${ext}`;
        const dest = path.join(IMAGES_DIR, filename);
        const publicPath = `/_notion-images/${filename}`;

        if (fs.existsSync(dest)) {
          manifest[block.id] = publicPath;
          skipped++;
          continue;
        }

        try {
          const buf = await httpsGet(url);
          fs.writeFileSync(dest, buf);
          manifest[block.id] = publicPath;
          downloaded++;
          console.log(`↓ [${label}] ${slug} / ${block.id}${ext} (${Math.round(buf.length / 1024)}KB)`);
        } catch (err) {
          failed++;
          console.log(`✗ [${label}] ${slug} / ${block.id}: ${err.message}`);
        }
      }
    }
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`\nDone. Downloaded: ${downloaded}, skipped: ${skipped}, failed: ${failed}.`);
  console.log(`Manifest: ${path.relative(REPO_ROOT, MANIFEST_PATH)} (${Object.keys(manifest).length} entries)`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
