import { readFile, readdir, access } from 'node:fs/promises';
const htmlFiles=(await readdir('.')).filter(x=>x.endsWith('.html'));
const missing=[];
for (const name of htmlFiles) {
  const html=await readFile(name,'utf8');
  for (const match of html.matchAll(/(?:href|src|poster)=["']([^"']+)["']/g)) {
    const raw=match[1].split(/[?#]/)[0];
    if (!raw || /^(?:https?:|mailto:|tel:|data:|\/\/|\/)/i.test(raw)) continue;
    try { await access(raw); } catch { missing.push(`${name}: ${raw}`); }
  }
}
if (missing.length) { console.error(missing.join('\n')); process.exitCode=1; }
else console.log(`Checked local links and asset paths in ${htmlFiles.length} HTML files.`);
