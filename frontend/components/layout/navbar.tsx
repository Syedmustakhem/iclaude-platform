import Link from "next/link";

const navigation = [
  {
    label: "Tools",
    href: "/tools",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "About",
    href: "/about",
  },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="iclaude-container">
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Brand */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            aria-label="iclaude home"
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 text-lg font-bold text-white shadow-sm"
              aria-hidden="true"
            >
              i
            </span>

            <span className="text-xl font-bold tracking-tight text-slate-950">
              iclaude
            </span>
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
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Primary action */}
          <Link
            href="/tools"
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            Explore tools
          </Link>
        </div>
      </div>
    </header>
  );
}