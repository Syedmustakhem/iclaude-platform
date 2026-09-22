import Image from "next/image";
import Link from "next/link";

const toolLinks = [
  ["Image Compressor", "/image-compressor/"],
  ["Image Resizer", "/image-resizer/"],
  ["Remove Background", "/remove-background/"],
  ["PDF to Word", "/pdf-to-word/"],
  ["Video Compressor", "/video-compressor/"],
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
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 10h11" />
      <path d="m11 5 5 5-5 5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-violet-600/10 blur-3xl" aria-hidden="true" />

      <div className="iclaude-container relative py-16 sm:py-20">
        <div className="mb-14 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">Ready when you are</p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-white sm:text-3xl">
                Find the tool for your next file task.
              </h2>
            </div>
            <Link href="/tools/" className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50">
              Explore the toolbox
              <span className="transition-transform group-hover:translate-x-1"><ArrowIcon /></span>
            </Link>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.7fr_1fr_1fr_1fr] lg:gap-16">
          <div className="max-w-md">
            <Link href="/" className="group inline-flex items-center gap-3" aria-label="iclaude home">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1.5 shadow-lg">
                <Image src="/icon.png" alt="iclaude logo" width={44} height={44} className="h-full w-full object-contain" />
              </span>
              <span>
                <span className="block text-xl font-black tracking-[-0.04em] text-white">iclaude</span>
                <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">File tools, simplified</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Focused online tools for compressing, resizing, converting and preparing images, PDFs, videos and everyday digital files.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Images", "PDF", "Video"].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-bold text-slate-400">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white">Tools</h2>
            <ul className="mt-5 space-y-3.5">
              {toolLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-400 transition duration-200 hover:translate-x-0.5 hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white">Company</h2>
            <ul className="mt-5 space-y-3.5">
              {companyLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-400 transition duration-200 hover:translate-x-0.5 hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white">Legal</h2>
            <ul className="mt-5 space-y-3.5">
              {legalLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-400 transition duration-200 hover:translate-x-0.5 hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-slate-800 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-slate-500">© {new Date().getFullYear()} iclaude. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy/" className="text-xs text-slate-500 transition hover:text-slate-300">Privacy</Link>
            <Link href="/terms/" className="text-xs text-slate-500 transition hover:text-slate-300">Terms</Link>
            <span className="hidden h-3 w-px bg-slate-800 sm:block" />
            <span className="text-xs text-slate-500">Built for everyday workflows</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
