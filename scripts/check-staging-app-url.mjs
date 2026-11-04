// Drift check for the staging build (`ng build --configuration production,staging`).
// Fails unless src/app/app-url.staging.ts equals src/app/app-url.ts except for the API prefix line.
import { readFileSync } from 'node:fs';

const PROD_LINE = '    public static prefix  =`${AppURL.webURL}/api`;';
const STAGING_LINE = "    public static prefix  = 'https://getexcellentpublicity.com/api'; // STAGING ONLY: the only line that differs from app-url.ts";

const prod = readFileSync(new URL('../src/app/app-url.ts', import.meta.url), 'utf8').split('\n');
const staging = readFileSync(new URL('../src/app/app-url.staging.ts', import.meta.url), 'utf8').split('\n');

const fail = (message) => { console.error(`app-url.staging.ts drift check FAILED: ${message}`); process.exit(1); };
if (prod.length !== staging.length) fail(`line count ${staging.length} != ${prod.length}`);
const changed = prod.map((line, i) => (line === staging[i] ? -1 : i)).filter((i) => i >= 0);
if (changed.length !== 1) fail(`${changed.length} differing lines (expected exactly 1)`);
const [i] = changed;
if (prod[i] !== PROD_LINE) fail(`line ${i + 1} of app-url.ts is not the expected API prefix line`);
if (staging[i] !== STAGING_LINE) fail(`line ${i + 1} of app-url.staging.ts is not the expected staging API prefix line`);
console.log(`app-url.staging.ts drift check OK: only line ${i + 1} (API prefix) differs`);
