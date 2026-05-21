import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const appDir = path.join(root, 'app');
const outDir = path.join(root, 'docs', 'screenshots');

fs.mkdirSync(outDir, { recursive: true });

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript' };

const server = http.createServer((req, res) => {
  const urlPath = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  const filePath = path.join(appDir, urlPath);
  if (!filePath.startsWith(appDir)) {
    res.writeHead(403);
    res.end();
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end();
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

await new Promise((resolve) => server.listen(0, resolve));
const port = server.address().port;
const baseUrl = `http://127.0.0.1:${port}`;

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 420, height: 900, deviceScaleFactor: 2 });
await page.goto(baseUrl, { waitUntil: 'networkidle0' });
await page.waitForSelector('.habit-card', { timeout: 5000 });

await page.screenshot({ path: path.join(outDir, '01-home.png'), fullPage: true });

await page.click('[data-action="toggle"]');
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(outDir, '02-checked-in.png'), fullPage: true });

await browser.close();
server.close();
console.log('Screenshots saved to docs/screenshots/');
