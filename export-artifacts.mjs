// Splices each single-file build into a standalone HTML for artifact publishing.
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const OUT = [
  ['dist-single/index.html', '../woof-rwa-site.html'],
  ['dist-single-docs/docs.html', '../woof-rwa-docs.html'],
]

for (const [src, dest] of OUT) {
  const html = readFileSync(resolve(root, src), 'utf8')
  const head = html.match(/<head>([\s\S]*?)<\/head>/)[1].replace(/<meta charset[^>]*>/i, '').trim()
  const body = html.match(/<body>([\s\S]*?)<\/body>/)[1].trim()
  writeFileSync(resolve(root, dest), `${head}\n${body}\n`)
  console.log(`exported ${dest}`)
}
