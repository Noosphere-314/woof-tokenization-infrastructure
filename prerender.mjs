import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const { pages } = await import(resolve(root, 'dist-ssr/entry-server.js'))

for (const [file, render] of Object.entries(pages)) {
  const out = resolve(root, 'dist', file)
  const html = readFileSync(out, 'utf8')
  if (!html.includes('<div id="root"></div>')) throw new Error(`no mount point in ${file}`)
  writeFileSync(out, html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`))
  console.log(`prerendered dist/${file}`)
}

rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
