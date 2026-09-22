import type { Metadata } from "next";
import Link from "next/link";

import ToolCard from "@/components/tools/ToolCard";
import {
  getAvailableTools,
  getAvailableToolsByCategory,
  type ToolCategory,
} from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Online File Tools | Images, PDF & Video",
  description:
    "Explore powerful free online tools for images, PDFs and videos. Compress, resize, convert and transform files with iclaude.",
  alternates: {
    canonical: "/tools/",
  },
  openGraph: {
    title: "Free Online File Tools | iclaude",
    description:
      "Compress, resize, convert and transform your files with fast, focused online tools.",
    url: "/tools/",
    type: "website",
  },
};

type CategoryConfig = {
  id: string;
  category: ToolCategory;
  label: string;
  eyebrow: string;
  description: string;
  icon: string;
  gradient: string;
};

const categoryConfig: CategoryConfig[] = [
  {
    id: "images",
    category: "Images",
    label: "Image tools",
    eyebrow: "IMAGE WORKSPACE",
    description:
      "Compress, resize and transform images for websites, documents, social media and everyday digital work.",
    icon: "▧",
    gradient: "from-blue-500/15 via-indigo-500/10 to-cyan-500/10",
  },
  {
    id: "pdf",
    category: "PDF",
    label: "PDF tools",
    eyebrow: "DOCUMENT WORKSPACE",
    description:
      "Work with supported PDF files through focused document tools designed for everyday workflows.",
    icon: "▤",
    gradient: "from-violet-500/15 via-fuchsia-500/10 to-blue-500/10",
  },
  {
    id: "video",
    category: "Video",
    label: "Video tools",
    eyebrow: "VIDEO WORKSPACE",
    description:
      "Reduce video file sizes and prepare videos for sharing, uploading and storage.",
    icon: "▶",
    gradient: "from-cyan-500/15 via-sky-500/10 to-blue-500/10",
  },
];

function CategorySection({
  config,
}: {
  config: CategoryConfig;
}) {
  const categoryTools = getAvailableToolsByCategory(config.category);

  if (categoryTools.length === 0) {
    return null;
  }

  return (
    <section
      id={config.id}
      aria-labelledby={`${config.id}-heading`}
      className="scroll-mt-28 border-t border-slate-200/70 bg-white"
    >
      <div className="iclaude-container py-20 sm:py-24">
        <div
          className={`relative mb-12 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-gradient-to-br ${config.gradient} p-7 sm:p-10`}
        >
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-white/60 blur-3xl"
          />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/75 px-3.5 py-2 text-xs font-bold tracking-[0.16em] text-slate-700 shadow-sm backdrop-blur">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950 text-xs text-white">
                  {config.icon}
                </span>
                {config.eyebrow}
              </div>

              <h2
                id={`${config.id}-heading`}
                className="text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl"
              >
                {config.label}
              </h2>

              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                {config.description}
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/80 bg-white/75 px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {categoryTools.length}{" "}
              {categoryTools.length === 1 ? "tool" : "tools"}
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryTools.map((tool) => (
            <div
              key={tool.slug}
              className="iclaude-reveal transition-transform duration-300 hover:-translate-y-1"
            >
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ToolsPage() {
  const availableTools = getAvailableTools();

  const featuredTools = availableTools.slice(0, 3);

  return (
    <main className="overflow-hidden bg-white">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative isolate overflow-hidden bg-slate-950">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.22),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(6,182,212,0.16),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.18),transparent_35%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute left-[10%] top-20 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute bottom-0 right-[10%] h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
        />

        <div className="iclaude-container relative py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-5xl text-center">
            <div className="iclaude-reveal inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm font-semibold text-slate-200 shadow-2xl backdrop-blur-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
              </span>

              {availableTools.length} tools available
            </div>

            <h1 className="iclaude-reveal iclaude-delay-1 mt-8 text-4xl font-black tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
              One place for all your
              <span className="mt-2 block bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                everyday file tasks.
              </span>
            </h1>

            <p className="iclaude-reveal iclaude-delay-2 mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Compress, resize, convert and transform your files with focused
              online tools built to keep your workflow fast and simple.
            </p>

            {/* Search-like visual */}
            <div className="iclaude-reveal iclaude-delay-3 mx-auto mt-10 max-w-2xl">
              <a
                href="#all"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.08] p-2 text-left shadow-2xl backdrop-blur-xl transition duration-300 hover:border-white/20 hover:bg-white/[0.12]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-lg text-slate-950 shadow-lg">
                  ⌕
                </span>

                <span className="flex-1">
                  <span className="block text-sm font-semibold text-white">
                    Find the right tool
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-400">
                    Browse images, PDFs, videos and more
                  </span>
                </span>

                <span className="mr-1 hidden rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-950 transition group-hover:bg-slate-100 sm:block">
                  Explore
                </span>
              </a>
            </div>

            {/* Stats */}
            <div className="iclaude-reveal iclaude-delay-4 mx-auto mt-12 grid max-w-2xl grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl">
              <div className="px-3 py-5">
                <p className="text-2xl font-black text-white">
                  {availableTools.length}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
                  Tools
                </p>
              </div>

              <div className="border-x border-white/10 px-3 py-5">
                <p className="text-2xl font-black text-white">3</p>
                <p className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
                  Categories
                </p>
              </div>

              <div className="px-3 py-5">
                <p className="text-2xl font-black text-white">100%</p>
                <p className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
                  Online
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </section>

      {/* =========================================================
          CATEGORY NAVIGATION
      ========================================================== */}
      <nav
        aria-label="Tool categories"
        className="sticky top-[72px] z-30 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl"
      >
        <div className="iclaude-container overflow-x-auto">
          <div className="flex min-w-max items-center justify-center gap-1 py-3">
            <a
              href="#all"
              className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              All tools
            </a>

            {categoryConfig.map((config) => (
              <a
                key={config.id}
                href={`#${config.id}`}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
              >
                {config.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* =========================================================
          FEATURED TOOLS
      ========================================================== */}
      {featuredTools.length > 0 && (
        <section className="bg-slate-50/70">
          <div className="iclaude-container py-20 sm:py-24">
            <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                  Start here
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl">
                  Popular file tools
                </h2>

                <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                  Jump directly into some of the tools available on iclaude.
                </p>
              </div>

              <a
                href="#all"
                className="inline-flex w-fit items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700"
              >
                View everything
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {featuredTools.map((tool, index) => (
                <div
                  key={tool.slug}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-1 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="absolute right-5 top-5 z-10 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 shadow-sm backdrop-blur">
                    {index === 0 ? "Featured" : "Popular"}
                  </div>

                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          ALL TOOLS
      ========================================================== */}
      <section
        id="all"
        aria-labelledby="all-tools-heading"
        className="scroll-mt-28 bg-white"
      >
        <div className="iclaude-container py-20 sm:py-24">
          <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
                Tool library
              </div>

              <h2
                id="all-tools-heading"
                className="text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl"
              >
                All available tools
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                Choose exactly what you need and get straight to the task
                without unnecessary steps.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {availableTools.length} available
              </span>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {availableTools.map((tool) => (
              <div
                key={tool.slug}
                className="iclaude-reveal transition-transform duration-300 hover:-translate-y-1"
              >
                <ToolCard tool={tool} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CATEGORY SECTIONS
      ========================================================== */}
      {categoryConfig.map((config) => (
        <CategorySection
          key={config.category}
          config={config}
        />
      ))}

      {/* =========================================================
          WORKFLOW
      ========================================================== */}
      <section className="border-t border-slate-200 bg-slate-50/70">
        <div className="iclaude-container py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              How it works
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl">
              Simple by design.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              Pick a tool, add your file and complete the task. Every tool is
              designed around a focused workflow.
            </p>
          </div>

          <div className="relative mx-auto mt-14 max-w-5xl">
            <div
              aria-hidden="true"
              className="absolute left-[16.66%] right-[16.66%] top-7 hidden h-px bg-gradient-to-r from-blue-200 via-indigo-200 to-cyan-200 md:block"
            />

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Choose a tool",
                  description:
                    "Find the tool that matches the file task you want to complete.",
                  icon: "⌕",
                },
                {
                  number: "02",
                  title: "Add your file",
                  description:
                    "Upload the supported file and configure the available options.",
                  icon: "↑",
                },
                {
                  number: "03",
                  title: "Get your result",
                  description:
                    "Process the file and continue with your workflow.",
                  icon: "✓",
                },
              ].map((step) => (
                <div key={step.number} className="relative text-center">
                  <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-lg font-black text-blue-600 shadow-lg shadow-slate-200/60">
                    {step.icon}
                  </div>

                  <p className="mt-6 text-xs font-black uppercase tracking-[0.16em] text-blue-600">
                    Step {step.number}
                  </p>

                  <h3 className="mt-2 text-lg font-black text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUST STRIP
      ========================================================== */}
      <section className="border-t border-slate-200 bg-white">
        <div className="iclaude-container py-14">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: "⚡",
                title: "Focused workflows",
                text: "No unnecessary steps between you and the task.",
              },
              {
                icon: "⌁",
                title: "Browser-first",
                text: "Designed to work directly from a modern browser.",
              },
              {
                icon: "◉",
                title: "Built for everyday use",
                text: "Practical utilities for common digital file tasks.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition hover:border-slate-300 hover:bg-white"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm ring-1 ring-slate-200">
                  {item.icon}
                </div>

                <div>
                  <h3 className="font-bold text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}
      <section className="relative overflow-hidden bg-slate-950">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.2),transparent_45%)]"
        />

        <div className="iclaude-container relative py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-xl text-white shadow-xl backdrop-blur">
              ✦
            </div>

            <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-blue-300">
              iclaude tools
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              Find a tool.
              <span className="block text-slate-400">
                Finish the task.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-400">
              Everything is organized in one place so you can spend less time
              searching and more time getting things done.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href="#all"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xl transition hover:-translate-y-1 hover:bg-slate-100"
              >
                Explore all tools
                <span aria-hidden="true">↑</span>
              </a>

              <Link
                href="/"
                className="inline-flex items-center rounded-xl border border-white/15 bg-white/[0.06] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-white/10"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}