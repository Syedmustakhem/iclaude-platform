import Image from "next/image";
import Link from "next/link";

const toolLinks = [
  ["Image Compressor", "/image-compressor/"],
  ["Image Resizer", "/image-resizer/"],
  ["JPG to PNG", "/jpg-to-png/"],
  ["PNG to JPG", "/png-to-jpg/"],
  ["HEIC to JPG", "/heic-to-jpg/"],
  ["Remove Background", "/remove-background/"],
  ["PDF to Word", "/pdf-to-word/"],
  ["Video Compressor", "/video-compressor/"],
  ["WebP to JPG", "/webp-to-jpg/"],
];

const categoryLinks = [
  ["All Tools", "/tools/"],
  ["Image Tools", "/tools/?category=Images"],
  ["PDF Tools", "/tools/?category=PDF"],
  ["Video Tools", "/tools/?category=Video"],
];

const companyLinks = [
  ["About", "/about/"],
  ["Contact", "/contact/"],
];

const legalLinks = [
  ["Privacy Policy", "/privacy/"],
  ["Terms of Service", "/terms/"],
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

function SparkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="m12 2 1.55 6.45L20 10l-6.45 1.55L12 18l-1.55-6.45L4 10l6.45-1.55L12 2Z" />
      <path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-slate-950 text-slate-300">
      {/* Decorative background */}
      <div
        className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-violet-600/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="iclaude-container relative py-16 sm:py-20">
        {/* CTA */}
        <div className="mb-14 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">
                <SparkIcon />
                Ready when you are
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-white sm:text-3xl">
                Find the tool for your next file task.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                Compress, resize, convert and process common
                digital files with simple online tools.
              </p>
            </div>

            <Link
              href="/tools/"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Explore the toolbox

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>

        {/* Main footer */}
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] lg:gap-12">
          {/* Brand */}
          <div className="max-w-md">
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
              aria-label="iclaude home"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1.5 shadow-lg">
                <Image
                  src="/icon.png"
                  alt="iclaude logo"
                  width={44}
                  height={44}
                  className="h-full w-full object-contain"
                />
              </span>

              <span>
                <span className="block text-xl font-black tracking-[-0.04em] text-white">
                  iclaude
                </span>

                <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
                  File tools, simplified
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Free online tools for compressing, resizing,
              converting and preparing images, PDFs, videos
              and everyday digital files.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Images", "PDF", "Video", "Free Tools"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-bold text-slate-400"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
              Popular Tools
            </h2>

            <ul className="mt-5 space-y-3.5">
              {toolLinks.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-400 transition duration-200 hover:translate-x-0.5 hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
              Categories
            </h2>

            <ul className="mt-5 space-y-3.5">
              {categoryLinks.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition duration-200 hover:translate-x-0.5 hover:text-white"
                  >
                    {label}
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
              {companyLinks.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition duration-200 hover:translate-x-0.5 hover:text-white"
                  >
                    {label}
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
              {legalLinks.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition duration-200 hover:translate-x-0.5 hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEO discovery links */}
        <div className="mt-14 border-t border-slate-800 pt-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white">
                Free online tools
              </p>

              <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-500">
                Explore practical tools for image compression,
                image resizing, image conversion, background
                removal, PDF conversion and video compression.
              </p>
            </div>

            <Link
              href="/tools/"
              className="group inline-flex shrink-0 items-center gap-2 text-xs font-bold text-slate-300 transition hover:text-white"
            >
              Browse all tools

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
            {toolLinks.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-xs text-slate-500 underline-offset-4 transition hover:text-slate-300 hover:underline"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-5 border-t border-slate-800 pt-7 sm:flex-row sm:items-center sm:justify-between">
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

            <span className="text-xs text-slate-500">
              Built for everyday workflows
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}