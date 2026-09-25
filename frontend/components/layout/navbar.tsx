"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const toolGroups = [
  {
    label: "Images",
    description: "Compress, resize and convert images",
    type: "image" as const,
    items: [
      {
        label: "Image Compressor",
        href: "/image-compressor/",
        detail: "Reduce image file size",
      },
      {
        label: "Image Resizer",
        href: "/image-resizer/",
        detail: "Resize images quickly",
      },
      {
        label: "JPG to PNG",
        href: "/jpg-to-png/",
        detail: "Convert JPG images to PNG",
      },
      {
        label: "PNG to JPG",
        href: "/png-to-jpg/",
        detail: "Convert PNG images to JPG",
      },
      {
        label: "Remove Background",
        href: "/remove-background/",
        detail: "Clean image backgrounds",
      },
      {
        label: "HEIC to JPG",
        href: "/heic-to-jpg/",
        detail: "Convert HEIC photos to JPG",
      },
      {
        label: "WebP to JPG",
        href: "/webp-to-jpg/",
        detail: "Convert WebP images to JPG",
      },
    ],
  },
  {
    label: "Documents",
    description: "Convert and process documents",
    type: "document" as const,
    items: [
      {
        label: "PDF to Word",
        href: "/pdf-to-word/",
        detail: "Make PDFs editable",
      },
      {
        label: "JPG to PDF",
        href: "/jpg-to-pdf/",
        detail: "Create PDFs from images",
      },
      {
        label: "PDF to JPG",
        href: "/pdf-to-jpg/",
        detail: "Convert PDF pages to images",
      },
      {
        label: "Merge PDF",
        href: "/merge-pdf/",
        detail: "Combine multiple PDF files",
      },
    ],
  },
  {
    label: "Developer",
    description: "Fast utilities for developers",
    type: "developer" as const,
    items: [
      {
        label: "JSON Formatter",
        href: "/json-formatter/",
        detail: "Format and beautify JSON",
      },
      {
        label: "JSON Validator",
        href: "/json-validator/",
        detail: "Validate JSON data",
      },
      {
        label: "Base64 Encoder",
        href: "/base64-encoder/",
        detail: "Encode text to Base64",
      },
      {
        label: "Base64 Decoder",
        href: "/base64-decoder/",
        detail: "Decode Base64 strings",
      },
    ],
  },
  {
    label: "Video",
    description: "Optimize video files",
    type: "video" as const,
    items: [
      {
        label: "Video Compressor",
        href: "/video-compressor/",
        detail: "Reduce video file size",
      },
    ],
  },
];

const navigation = [
  { label: "Tools", href: "/tools/" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

function ArrowIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
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

function ChevronIcon({
  open = false,
}: {
  open?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-4 w-4 transition-transform duration-300 ${
        open ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="m5 7.5 5 5 5-5" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </svg>
  );
}

function ToolIcon({
  type,
  className = "h-5 w-5",
}: {
  type: "image" | "document" | "video" | "developer";
  className?: string;
}) {
  if (type === "document") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h4" />
      </svg>
    );
  }

  if (type === "video") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="6"
          width="13"
          height="12"
          rx="2"
        />
        <path d="m16 10 5-3v10l-5-3z" />
      </svg>
    );
  }

  if (type === "developer") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m8 8-4 4 4 4" />
        <path d="m16 8 4 4-4 4" />
        <path d="m14 5-4 14" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2"
      />
      <circle cx="8.5" cy="9" r="1.4" />
      <path d="m21 15-5-5-7 7-2-2-4 4" />
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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  function closeMenus() {
    setMobileOpen(false);
    setToolsOpen(false);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenus();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-blue-50/70 via-white/30 to-transparent"
      />

      <div className="relative border-b border-slate-200/70 bg-white/80 shadow-[0_8px_40px_rgba(15,23,42,0.045)] backdrop-blur-2xl">
        <div className="iclaude-container">
          <div className="flex h-[74px] items-center justify-between gap-4 lg:h-[78px]">

            {/* Brand */}
            <Link
              href="/"
              onClick={closeMenus}
              className="group flex shrink-0 items-center gap-2.5 rounded-2xl outline-none transition-opacity duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4"
              aria-label="iclaude home"
            >
              <span className="relative flex h-10 w-10 items-center justify-center rounded-[13px] border border-slate-200/90 bg-white p-1.5 shadow-[0_5px_18px_rgba(15,23,42,0.08)] transition duration-300 group-hover:-translate-y-0.5 group-hover:border-blue-200 group-hover:shadow-[0_9px_25px_rgba(37,99,235,0.15)]">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[13px] bg-blue-500/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
                />

                <Image
                  src="/icon.png"
                  alt="iclaude logo"
                  width={40}
                  height={40}
                  priority
                  className="relative h-full w-full object-contain"
                />
              </span>

              <span className="block">
                <span className="block text-[17px] font-black leading-none tracking-[-0.055em] text-slate-950 sm:text-[18px]">
                  iclaude
                </span>

                <span className="mt-1 hidden text-[8px] font-bold uppercase tracking-[0.18em] text-slate-400 sm:block">
                  File tools, simplified
                </span>
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-1 md:flex"
            >
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setToolsOpen((open) => !open)
                  }
                  className={`group inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                    toolsOpen
                      ? "bg-slate-100 text-slate-950"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-950"
                  }`}
                  aria-expanded={toolsOpen}
                  aria-haspopup="true"
                  aria-controls="desktop-tools-menu"
                >
                  <span>Tools</span>
                  <ChevronIcon open={toolsOpen} />
                </button>

                {toolsOpen && (
                  <>
                    <button
                      type="button"
                      aria-label="Close tools menu"
                      onClick={() =>
                        setToolsOpen(false)
                      }
                      className="fixed inset-0 top-[74px] -z-10 hidden cursor-default md:block"
                    />

                    <div
                      id="desktop-tools-menu"
                      role="menu"
                      className="absolute left-1/2 top-[calc(100%+14px)] w-[860px] max-w-[calc(100vw-32px)] max-h-[calc(100vh-110px)] -translate-x-1/2 overflow-y-auto overflow-x-hidden rounded-[26px] border border-slate-200/90 bg-white p-3 shadow-[0_30px_90px_rgba(15,23,42,0.16)]"
                    >
                      <div className="flex items-center justify-between rounded-[20px] bg-slate-950 px-4 py-3.5 text-white">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-blue-300">
                              <SparkIcon />
                            </span>

                            <p className="text-sm font-extrabold tracking-tight">
                              Explore the iclaude toolbox
                            </p>
                          </div>

                          <p className="mt-1 pl-9 text-[10px] font-medium text-slate-400">
                            Image, document, developer and video utilities.
                          </p>
                        </div>

                        <Link
                          href="/tools/"
                          onClick={closeMenus}
                          className="hidden items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-[10px] font-bold text-white transition hover:bg-white/15 sm:inline-flex"
                        >
                          View all tools
                          <ArrowIcon className="h-3.5 w-3.5" />
                        </Link>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
                        {toolGroups.map((group) => (
                          <div
                            key={group.label}
                            className="rounded-[20px] border border-slate-200/80 bg-slate-50/80 p-2.5"
                          >
                            <div className="px-2 py-1.5">
                              <div className="flex items-center gap-2">
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                                  <ToolIcon
                                    type={group.type}
                                    className="h-4 w-4"
                                  />
                                </span>

                                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
                                  {group.label}
                                </p>
                              </div>

                              <p className="mt-2 text-[10px] leading-4 text-slate-400">
                                {group.description}
                              </p>
                            </div>

                            <div className="mt-1 space-y-1">
                              {group.items.map(
                                (item) => (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={closeMenus}
                                    role="menuitem"
                                    className="group/item block rounded-xl p-2.5 outline-none transition duration-200 hover:bg-white hover:shadow-[0_5px_18px_rgba(15,23,42,0.06)] focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-500"
                                  >
                                    <span className="flex items-center justify-between gap-2">
                                      <span className="min-w-0 truncate text-xs font-bold text-slate-800">
                                        {item.label}
                                      </span>

                                      <span className="shrink-0 text-slate-300 transition duration-200 group-hover/item:translate-x-0.5 group-hover/item:text-blue-500">
                                        <ArrowIcon className="h-3.5 w-3.5" />
                                      </span>
                                    </span>

                                    <span className="mt-1 block text-[10px] leading-4 text-slate-500">
                                      {item.detail}
                                    </span>
                                  </Link>
                                ),
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <Link
                        href="/tools/"
                        onClick={closeMenus}
                        className="group mt-2 flex items-center justify-between rounded-[20px] border border-blue-100 bg-blue-50/70 px-4 py-3 text-xs font-extrabold text-blue-700 outline-none transition duration-200 hover:border-blue-200 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        <span className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                            <SparkIcon />
                          </span>

                          <span>
                            <span className="block text-[11px] text-blue-900">
                              Need another tool?
                            </span>

                            <span className="mt-0.5 block text-[10px] font-medium text-blue-500">
                              Browse the complete iclaude toolbox.
                            </span>
                          </span>
                        </span>

                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          <ArrowIcon />
                        </span>
                      </Link>
                    </div>
                  </>
                )}
              </div>

              {navigation.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 outline-none transition duration-200 hover:bg-slate-100/80 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <Link
              href="/tools/"
              className="group hidden shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-[0_9px_28px_rgba(15,23,42,0.14)] outline-none transition duration-300 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-[0_14px_34px_rgba(37,99,235,0.24)] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 md:inline-flex"
            >
              <span>Explore tools</span>

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() =>
                setMobileOpen((open) => !open)
              }
              className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border bg-white text-slate-700 shadow-sm outline-none transition duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 md:hidden ${
                mobileOpen
                  ? "border-slate-300 bg-slate-50 shadow-md"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
              aria-label={
                mobileOpen
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? (
                <CloseIcon />
              ) : (
                <MenuIcon />
              )}
            </button>
          </div>

          {/* Mobile navigation */}
          <div
            id="mobile-navigation"
            className={`overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out md:hidden ${
              mobileOpen
                ? "max-h-[calc(100vh-74px)] translate-y-0 overflow-y-auto opacity-100"
                : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
            }`}
          >
            <nav
              aria-label="Mobile navigation"
              className="border-t border-slate-100 pb-5 pt-3"
            >
              <div className="grid gap-1 rounded-[22px] border border-slate-200/80 bg-white p-2 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenus}
                    className="group flex min-h-12 items-center justify-between rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-700 outline-none transition duration-200 hover:bg-slate-50 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-[0.985]"
                  >
                    <span>{item.label}</span>

                    <span className="text-slate-300 transition duration-200 group-hover:translate-x-0.5 group-hover:text-blue-500">
                      <ArrowIcon />
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-3 overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50/90 p-3 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
                <div className="flex items-end justify-between px-2">
                  <div>
                    <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-blue-600">
                      <SparkIcon />
                      Quick access
                    </p>

                    <p className="mt-1 text-sm font-extrabold tracking-tight text-slate-950">
                      Popular tools
                    </p>
                  </div>

                  <Link
                    href="/tools/"
                    onClick={closeMenus}
                    className="rounded-md px-1 py-1 text-[11px] font-bold text-slate-500 outline-none transition hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    View all
                  </Link>
                </div>

                <div className="mt-3 space-y-4">
                  {toolGroups.map((group) => (
                    <div key={group.label}>
                      <div className="mb-2 flex items-center gap-2 px-1">
                        <span className="text-blue-600">
                          <ToolIcon
                            type={group.type}
                            className="h-4 w-4"
                          />
                        </span>

                        <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
                          {group.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {group.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeMenus}
                            className="group flex min-h-[68px] items-center gap-3 rounded-[18px] border border-slate-200/80 bg-white px-3 py-2.5 shadow-sm outline-none transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-[0.985]"
                          >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-blue-300 transition duration-200 group-hover:bg-blue-600 group-hover:text-white">
                              <ToolIcon
                                type={group.type}
                                className="h-[18px] w-[18px]"
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

                            <span className="ml-auto shrink-0 text-slate-300 transition duration-200 group-hover:translate-x-0.5 group-hover:text-blue-500">
                              <ArrowIcon className="h-3.5 w-3.5" />
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/tools/"
                onClick={closeMenus}
                className="group mt-3 flex min-h-12 items-center justify-center gap-2 rounded-[18px] bg-slate-950 px-4 py-3.5 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)] outline-none transition duration-300 hover:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-[0.985]"
              >
                <span>Explore the complete toolbox</span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>

              <p className="mt-3 text-center text-[10px] font-semibold text-slate-400">
                Fast tools&nbsp; • &nbsp;Simple workflow&nbsp; • &nbsp;Built for
                everyday files
              </p>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}