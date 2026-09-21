import Image from "next/image";
import Link from "next/link";

const toolLinks = [
  {
    label: "Image Compressor",
    href: "/image-compressor/",
  },
  {
    label: "Image Resizer",
    href: "/image-resizer/",
  },
  {
    label: "Remove Background",
    href: "/remove-background/",
  },
  {
    label: "PDF to Word",
    href: "/pdf-to-word/",
  },
  {
    label: "Video Compressor",
    href: "/video-compressor/",
  },
];

const companyLinks = [
  {
    label: "About",
    href: "/about/",
  },
  {
    label: "Contact",
    href: "/contact/",
  },
];

const legalLinks = [
  {
    label: "Privacy",
    href: "/privacy/",
  },
  {
    label: "Terms",
    href: "/terms/",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="iclaude-container py-14 sm:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label="iclaude home"
            >
              <Image
                src="/icon.png"
                alt="iclaude"
                width={170}
                height={54}
                className="h-11 w-auto object-contain"
              />
            </Link>

            <p className="mt-5 text-sm leading-7 text-slate-400">
              Simple, focused online tools for working with
              images, PDFs, videos and everyday digital files.
            </p>

            <Link
              href="/tools/"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-blue-300"
            >
              Explore all tools
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
              Tools
            </h2>

            <ul className="mt-5 space-y-3">
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

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
              Company
            </h2>

            <ul className="mt-5 space-y-3">
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

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
              Legal
            </h2>

            <ul className="mt-5 space-y-3">
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

        <div className="mt-14 flex flex-col gap-3 border-t border-slate-800 pt-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} iclaude. All rights reserved.
          </p>

          <p>
            Free online tools for everyday digital workflows.
          </p>
        </div>
      </div>
    </footer>
  );
}