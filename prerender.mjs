import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const out = resolve(root, 'dist/index.html')

const { render } = await import(resolve(root, 'dist-ssr/entry-server.js'))
const html = readFileSync(out, 'utf8').replace(
  '<div id="root"></div>',
  `<div id="root">${render()}</div>`
)

writeFileSync(out, html)
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log('prerendered dist/index.html')
