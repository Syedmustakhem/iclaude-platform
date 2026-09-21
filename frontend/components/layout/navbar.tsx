"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navigation = [
  {
    label: "Tools",
    href: "/tools/",
  },
  {
    label: "About",
    href: "/about/",
  },
  {
    label: "Contact",
    href: "/contact/",
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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-2xl">
      <div className="iclaude-container">
        <div className="flex h-[72px] items-center justify-between gap-5">
          {/* Brand */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="group flex shrink-0 items-center"
            aria-label="iclaude home"
          >
            <Image
              src="/icon.png"
              alt="iclaude"
              width={150}
              height={48}
              priority
              className="h-10 w-auto object-contain transition duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 md:flex"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition duration-200 hover:bg-slate-100 hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/tools/"
            className="group hidden shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg md:inline-flex"
          >
            Explore tools

            <span
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <ArrowIcon />
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile navigation */}
        <div
          id="mobile-navigation"
          className={`overflow-hidden transition-[max-height,opacity] duration-300 md:hidden ${
            mobileOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <nav
            aria-label="Mobile navigation"
            className="border-t border-slate-100 py-4"
          >
            <div className="grid gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Link
              href="/tools/"
              onClick={closeMobileMenu}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Explore tools
              <ArrowIcon />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}