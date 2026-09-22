"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const toolGroups = [
  {
    label: "Images",
    items: [
      { label: "Image Compressor", href: "/image-compressor/", detail: "Reduce image file size" },
      { label: "Image Resizer", href: "/image-resizer/", detail: "Resize images quickly" },
      { label: "Remove Background", href: "/remove-background/", detail: "Clean image backgrounds" },
    ],
  },
  {
    label: "Documents",
    items: [
      { label: "PDF to Word", href: "/pdf-to-word/", detail: "Make PDFs editable" },
    ],
  },
  {
    label: "Video",
    items: [
      { label: "Video Compressor", href: "/video-compressor/", detail: "Reduce video file size" },
    ],
  },
];

const navigation = [
  { label: "Tools", href: "/tools/" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 10h11" />
      <path d="m11 5 5 5-5 5" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m5 7.5 5 5 5-5" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </svg>
  );
}

function ToolIcon({ type }: { type: "image" | "document" | "video" }) {
  if (type === "document") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h4" />
      </svg>
    );
  }

  if (type === "video") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <rect x="3" y="6" width="13" height="12" rx="2" />
        <path d="m16 10 5-3v10l-5-3z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9" r="1.4" />
      <path d="m21 15-5-5-7 7-2-2-4 4" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  function closeMenus() {
    setMobileOpen(false);
    setToolsOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur-2xl">
      <div className="iclaude-container">
        <div className="flex h-[76px] items-center justify-between gap-4">
          <Link href="/" onClick={closeMenus} className="group flex shrink-0 items-center gap-3" aria-label="iclaude home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md">
              <Image src="/icon.png" alt="iclaude logo" width={40} height={40} priority className="h-full w-full object-contain" />
            </span>
            <span className="block">
              <span className="block text-[17px] font-black tracking-[-0.045em] text-slate-950 sm:text-[18px]">iclaude</span>
              <span className="hidden text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400 sm:block">File tools, simplified</span>
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
            <div className="relative">
              <button
                type="button"
                onClick={() => setToolsOpen((open) => !open)}
                className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                aria-expanded={toolsOpen}
              >
                Tools
                <ChevronIcon />
              </button>

              {toolsOpen && (
                <div className="absolute left-1/2 top-[calc(100%+12px)] w-[560px] -translate-x-1/2 overflow-hidden rounded-[24px] border border-slate-200 bg-white p-3 shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
                  <div className="grid grid-cols-3 gap-2">
                    {toolGroups.map((group) => (
                      <div key={group.label} className="rounded-2xl bg-slate-50 p-3">
                        <p className="px-2 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">{group.label}</p>
                        <div className="mt-2 space-y-1">
                          {group.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={closeMenus}
                              className="group/item block rounded-xl p-2.5 transition hover:bg-white hover:shadow-sm"
                            >
                              <span className="flex items-center gap-2 text-xs font-bold text-slate-800">
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                                  <ToolIcon type={group.label === "Documents" ? "document" : group.label === "Video" ? "video" : "image"} />
                                </span>
                                {item.label}
                              </span>
                              <span className="mt-1 block pl-9 text-[10px] leading-4 text-slate-500">{item.detail}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/tools/" onClick={closeMenus} className="mt-2 flex items-center justify-between rounded-2xl bg-slate-950 px-4 py-3 text-xs font-bold text-white transition hover:bg-blue-600">
                    View the complete toolbox
                    <ArrowIcon />
                  </Link>
                </div>
              )}
            </div>

            {navigation.slice(1).map((item) => (
              <Link key={item.href} href={item.href} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950">
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/tools/" className="group hidden shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(15,23,42,0.14)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-[0_14px_34px_rgba(37,99,235,0.25)] md:inline-flex">
            Explore tools
            <span className="transition-transform duration-300 group-hover:translate-x-1"><ArrowIcon /></span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border bg-white text-slate-700 shadow-sm transition duration-200 active:scale-95 md:hidden ${
              mobileOpen
                ? "border-slate-300 bg-slate-50 shadow-md"
                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            }`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={`overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out md:hidden ${
            mobileOpen
              ? "max-h-[900px] translate-y-0 opacity-100"
              : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
          }`}
        >
          <nav aria-label="Mobile navigation" className="border-t border-slate-100 pb-5 pt-3">
            <div className="grid gap-1 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
              {navigation.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenus}
                  className="group flex min-h-12 items-center justify-between rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-700 transition duration-200 active:scale-[0.985] hover:bg-slate-50 hover:text-slate-950"
                >
                  <span>{item.label}</span>
                  <span className="translate-x-0 text-slate-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-blue-500">
                    <ArrowIcon />
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-3 overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50/90 p-3 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
              <div className="flex items-end justify-between px-2">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-600">Quick access</p>
                  <p className="mt-1 text-sm font-bold tracking-tight text-slate-950">Popular tools</p>
                </div>
                <Link
                  href="/tools/"
                  onClick={closeMenus}
                  className="text-[11px] font-bold text-slate-500 transition hover:text-blue-600"
                >
                  View all
                </Link>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {toolGroups.flatMap((group) =>
                  group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenus}
                      className="group flex min-h-[66px] items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-3 py-2.5 shadow-sm transition duration-200 active:scale-[0.985] hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-blue-300 transition duration-200 group-hover:bg-blue-600 group-hover:text-white">
                        <ToolIcon
                          type={
                            group.label === "Documents"
                              ? "document"
                              : group.label === "Video"
                                ? "video"
                                : "image"
                          }
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-xs font-extrabold text-slate-900">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block truncate text-[10px] leading-4 text-slate-500">
                          {item.detail}
                        </span>
                      </span>
                    </Link>
                  )),
                )}
              </div>
            </div>

            <Link
              href="/tools/"
              onClick={closeMenus}
              className="group mt-3 flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)] transition duration-300 active:scale-[0.985] hover:bg-blue-600"
            >
              <span>Explore the complete toolbox</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>

            <p className="mt-3 text-center text-[10px] font-semibold text-slate-400">
              Fast tools • Simple workflow • Built for everyday files
            </p>
          </nav>
        </div>
      </div>
    </header>
  );
}
