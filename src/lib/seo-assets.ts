import type { PageDef } from './site'

const abs = (baseUrl: string, path: string) =>
  path === '/' ? `${baseUrl}/` : `${baseUrl}${path}`

export function buildSitemap(pages: PageDef[], baseUrl: string): string {
  const urls = pages
    .map(
      (p) =>
        `  <url>\n    <loc>${abs(baseUrl, p.path)}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n  </url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export function buildRobots(baseUrl: string): string {
  return [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${baseUrl}/sitemap.xml`,
    '',
  ].join('\n')
}

export function buildLlmsTxt(
  site: { name: string; url: string; description: string },
  pages: PageDef[],
): string {
  const lines = [`# ${site.name}`, '', `> ${site.description}`, '', '## Pages', '']
  for (const p of pages) {
    const url = p.path === '/' ? site.url : `${site.url}${p.path}`
    lines.push(`- [${p.title}](${url}): ${p.description}`)
  }
  lines.push('')
  return lines.join('\n')
}
