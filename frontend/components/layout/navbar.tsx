import Image from "next/image";
import Link from "next/link";

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

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="iclaude-container">
        <div className="flex h-[72px] items-center justify-between gap-6">
          <Link
            href="/"
            className="flex shrink-0 items-center"
            aria-label="iclaude home"
          >
            <Image
              src="/icon.png"
              alt="iclaude"
              width={150}
              height={48}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 md:flex"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/tools/"
            className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md"
          >
            Explore tools

            <span
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}