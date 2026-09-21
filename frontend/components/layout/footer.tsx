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
    label: "Privacy Policy",
    href: "/privacy/",
  },
  {
    label: "Terms of Service",
    href: "/terms/",
  },
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M4 10h11" />
      <path d="m11 5 5 5-5 5" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M11 4h5v5" />
      <path d="m16 4-7 7" />
      <path d="M14 11v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="iclaude-container py-16 sm:py-20">
        {/* Main footer */}
        <div className="grid gap-12 lg:grid-cols-[1.7fr_1fr_1fr_1fr] lg:gap-16">
          {/* Brand */}
          <div className="max-w-md">
            <Link
              href="/"
              className="group inline-flex items-center"
              aria-label="iclaude home"
            >
              <Image
                src="/icon.png"
                alt="iclaude"
                width={170}
                height={54}
                className="h-11 w-auto object-contain transition duration-200 group-hover:scale-[1.02]"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Focused online tools for compressing,
              resizing, converting and preparing images,
              PDFs, videos and everyday digital files.
            </p>

            <Link
              href="/tools/"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-blue-300"
            >
              Explore all tools

              <span className="transition-transform duration-200 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </div>

          {/* Tools */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
              Tools
            </h2>

            <ul className="mt-5 space-y-3.5">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
              Company
            </h2>

            <ul className="mt-5 space-y-3.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
              Legal
            </h2>

            <ul className="mt-5 space-y-3.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-5 border-t border-slate-800 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-slate-500">
            © {new Date().getFullYear()} iclaude. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/privacy/"
              className="text-xs text-slate-500 transition hover:text-slate-300"
            >
              Privacy
            </Link>

            <Link
              href="/terms/"
              className="text-xs text-slate-500 transition hover:text-slate-300"
            >
              Terms
            </Link>

            <span className="hidden h-3 w-px bg-slate-800 sm:block" />

            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
              Built for everyday workflows
              <ExternalIcon />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}