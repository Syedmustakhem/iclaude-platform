import Link from "next/link";

const toolLinks = [
  {
    label: "Image Compressor",
    href: "/image-compressor",
  },
  {
    label: "Image Resizer",
    href: "/image-resizer",
  },
  {
    label: "Background Remover",
    href: "/remove-background",
  },
  {
    label: "PDF to Word",
    href: "/pdf-to-word",
  },
  {
    label: "Video Compressor",
    href: "/video-compressor",
  },
];

const companyLinks = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
];

const legalLinks = [
  {
    label: "Privacy",
    href: "/privacy",
  },
  {
    label: "Terms",
    href: "/terms",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="iclaude-container py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:pr-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2"
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 text-lg font-bold text-white"
                aria-hidden="true"
              >
                i
              </span>

              <span className="text-xl font-bold text-white">
                iclaude
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
              Simple online tools for working with images,
              PDFs, videos and digital files.
            </p>

            <Link
              href="/tools"
              className="mt-5 inline-flex text-sm font-semibold text-blue-400 transition hover:text-blue-300"
            >
              Explore all tools →
            </Link>
          </div>

          {/* Tools */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Tools
            </h2>

            <ul className="mt-4 space-y-3">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h2>

            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Legal
            </h2>

            <ul className="mt-4 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} iclaude. All rights reserved.
          </p>

          <p>
            Online file tools for everyday workflows.
          </p>
        </div>
      </div>
    </footer>
  );
}