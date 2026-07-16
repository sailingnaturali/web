import { siteConfig } from '../lib/site'

export function SiteFooter() {
  return (
    <footer className="bg-sn-navy-deep">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.18em] text-sn-sky/70"
        >
          <a href="/itineraries" className="hover:text-sn-leaf">
            Itineraries
          </a>
          <a href={siteConfig.youtube} className="hover:text-sn-leaf">
            YouTube
          </a>
          <a href={siteConfig.substack} className="hover:text-sn-leaf">
            Substack
          </a>
          <a href={siteConfig.instagram} className="hover:text-sn-leaf">
            Instagram
          </a>
          <a href={siteConfig.tiktok} className="hover:text-sn-leaf">
            TikTok
          </a>
          <a href={siteConfig.engineering} className="hover:text-sn-leaf">
            Engineering
          </a>
        </nav>
        <p className="font-mono text-xs tracking-[0.1em] text-sn-sky/40">
          © Sailing Naturali — built in the Pacific Northwest.
        </p>
      </div>
    </footer>
  )
}
