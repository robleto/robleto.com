import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'projects');

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_PROJECTS_DB_ID = process.env.NOTION_PROJECTS_DB_ID;

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Node.js' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpsGet(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function notionQuery() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.notion.com',
      path: `/v1/databases/${NOTION_PROJECTS_DB_ID}/query`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      }
    };
    let data = '';
    const req = https.request(options, (res) => {
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.write('{}');
    req.end();
  });
}

async function run() {
  const json = await notionQuery();
  const results = json.results || [];

  for (const entry of results) {
    const slug = entry.properties.Slug?.rich_text?.[0]?.plain_text || '';
    if (!slug) continue;

    const localPath = path.join(PUBLIC_DIR, `${slug}.png`);
    if (fs.existsSync(localPath)) {
      console.log(`✓ ${slug} — already exists locally`);
      continue;
    }

    const imageUrl =
      entry.properties.Image?.files?.[0]?.file?.url ||
      entry.properties.Image?.files?.[0]?.external?.url || '';

    if (!imageUrl) {
      console.log(`✗ ${slug} — no image URL in Notion`);
      continue;
    }

    try {
      console.log(`↓ Downloading ${slug}...`);
      const buffer = await httpsGet(imageUrl);
      fs.writeFileSync(localPath, buffer);
      console.log(`  Saved to public/projects/${slug}.png (${Math.round(buffer.length / 1024)}KB)`);
    } catch (err) {
      console.log(`  ERROR for ${slug}: ${err.message}`);
    }
  }
}

run();
