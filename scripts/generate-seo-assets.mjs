// scripts/generate-seo-assets.mjs
import { writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { siteConfig, pages } from '../src/lib/site.ts'
import { buildSitemap, buildRobots, buildLlmsTxt } from '../src/lib/seo-assets.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(__dirname, '../public')
mkdirSync(publicDir, { recursive: true })

writeFileSync(resolve(publicDir, 'sitemap.xml'), buildSitemap(pages, siteConfig.url))
writeFileSync(resolve(publicDir, 'robots.txt'), buildRobots(siteConfig.url))
writeFileSync(resolve(publicDir, 'llms.txt'), buildLlmsTxt(siteConfig, pages))

console.log('SEO/GEO assets written to public/: sitemap.xml, robots.txt, llms.txt')
