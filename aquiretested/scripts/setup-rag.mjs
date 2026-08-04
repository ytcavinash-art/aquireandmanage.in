import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import OpenAI from 'openai';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const suppliedPath = process.argv[2];
const defaultPath = path.join(projectRoot, 'assets', 'AM_Advisory_Company_Profile.pdf');
const pdfPath = path.resolve(suppliedPath || defaultPath);

if (!process.env.OPENAI_API_KEY) throw new Error('Set OPENAI_API_KEY before running this script.');
if (!fs.existsSync(pdfPath)) throw new Error(`Company profile PDF not found: ${pdfPath}`);

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const vectorStore = await client.vectorStores.create({ name: 'A&M Advisory Knowledge Base' });
const file = await client.files.create({ file: fs.createReadStream(pdfPath), purpose: 'assistants' });
await client.vectorStores.files.create(vectorStore.id, {
  file_id: file.id,
  attributes: { category: 'company-profile', organization: 'a-and-m-advisory' },
});

let status = 'in_progress';
for (let attempt = 0; attempt < 60 && status !== 'completed'; attempt += 1) {
  await new Promise((resolve) => setTimeout(resolve, 2_000));
  const files = await client.vectorStores.files.list(vectorStore.id);
  status = files.data.find((item) => item.id === file.id)?.status || 'in_progress';
  if (status === 'failed' || status === 'cancelled') throw new Error(`Vector indexing ${status}.`);
}
if (status !== 'completed') throw new Error('Vector indexing did not complete within two minutes.');

console.log(`OPENAI_VECTOR_STORE_ID=${vectorStore.id}`);
console.log(`Uploaded ${path.basename(pdfPath)} as ${file.id}`);
