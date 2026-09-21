import type { Metadata } from "next";
import Link from "next/link";

import ToolCard from "@/components/tools/ToolCard";
import {
  getAvailableTools,
  getAvailableToolsByCategory,
  tools,
  type ToolCategory,
} from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Online File Tools | Images, PDF & Video",
  description:
    "Explore free online tools for compressing, resizing and transforming images, PDFs and videos. Simple tools for everyday file tasks.",
  alternates: {
    canonical: "/tools/",
  },
  openGraph: {
    title: "Free Online File Tools | iclaude",
    description:
      "Explore simple online tools for images, PDFs, videos and everyday file tasks.",
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
};

const categoryConfig: CategoryConfig[] = [
  {
    id: "images",
    category: "Images",
    label: "Image tools",
    eyebrow: "Images",
    description:
      "Compress, resize and transform images for websites, documents, social media and everyday digital work.",
  },
  {
    id: "pdf",
    category: "PDF",
    label: "PDF tools",
    eyebrow: "PDF",
    description:
      "Work with supported PDF files through simple upload-based document tools.",
  },
  {
    id: "video",
    category: "Video",
    label: "Video tools",
    eyebrow: "Video",
    description:
      "Reduce video file sizes and prepare videos for sharing, uploading and storage.",
  },
];

function CategorySection({
  config,
}: {
  config: CategoryConfig;
}) {
  const categoryTools = getAvailableToolsByCategory(
    config.category,
  );

  if (categoryTools.length === 0) {
    return null;
  }

  return (
    <section
      id={config.id}
      aria-labelledby={`${config.id}-heading`}
      className="scroll-mt-28 border-t border-slate-200/70 bg-white"
    >
      <div className="iclaude-container py-16 sm:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            {config.eyebrow}
          </p>

          <h2
            id={`${config.id}-heading`}
            className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl"
          >
            {config.label}
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            {config.description}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryTools.map((tool) => (
            <div
              key={tool.slug}
              className="iclaude-reveal"
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

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_top_right,rgba(6,182,212,0.09),transparent_32%)]"
        />

        <div
          aria-hidden="true"
          className="iclaude-dot-grid absolute inset-x-0 top-0 h-72 opacity-40"
        />

        <div className="iclaude-container relative py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="iclaude-reveal inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-blue-600"
              />
              Free online file tools
            </div>

            <h1 className="iclaude-reveal iclaude-delay-1 mt-7 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
              Everything you need for
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                everyday file tasks.
              </span>
            </h1>

            <p className="iclaude-reveal iclaude-delay-2 mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Compress, resize, convert and transform your files with
              focused tools designed to keep your workflow simple.
            </p>

            <div className="iclaude-reveal iclaude-delay-3 mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#all"
                className="iclaude-button-primary inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Browse all tools
                <span aria-hidden="true">↓</span>
              </a>

              <Link
                href="/"
                className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
              >
                Back to home
              </Link>
            </div>

            <div className="iclaude-reveal iclaude-delay-4 mt-10 grid grid-cols-3 gap-3 sm:mx-auto sm:max-w-lg">
              <div className="rounded-2xl border border-slate-200/80 bg-white/80 px-3 py-4 shadow-sm backdrop-blur">
                <p className="text-2xl font-black text-slate-950">
                  {availableTools.length}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                  Available tools
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white/80 px-3 py-4 shadow-sm backdrop-blur">
                <p className="text-2xl font-black text-slate-950">
                  3
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                  File categories
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white/80 px-3 py-4 shadow-sm backdrop-blur">
                <p className="text-2xl font-black text-slate-950">
                  100%
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                  Simple workflow
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category navigation */}
      <nav
        aria-label="Tool categories"
        className="sticky top-[72px] z-30 border-y border-slate-200/70 bg-white/90 backdrop-blur-xl"
      >
        <div className="iclaude-container overflow-x-auto">
          <div className="flex min-w-max items-center justify-center gap-1 py-3">
            <a
              href="#all"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
            >
              All tools
            </a>

            {categoryConfig.map((config) => (
              <a
                key={config.id}
                href={`#${config.id}`}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
              >
                {config.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* All tools */}
      <section
        id="all"
        aria-labelledby="all-tools-heading"
        className="scroll-mt-28 bg-slate-50/70"
      >
        <div className="iclaude-container py-16 sm:py-20">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                Explore
              </p>

              <h2
                id="all-tools-heading"
                className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl"
              >
                All available tools
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                Choose a tool and get straight to the task without
                unnecessary steps.
              </p>
            </div>

            <span className="inline-flex w-fit rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
              {availableTools.length} available
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {availableTools.map((tool) => (
              <div
                key={tool.slug}
                className="iclaude-reveal"
              >
                <ToolCard tool={tool} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category sections */}
      {categoryConfig.map((config) => (
        <CategorySection
          key={config.category}
          config={config}
        />
      ))}

      {/* Workflow section */}
      <section className="border-t border-slate-200 bg-white">
        <div className="iclaude-container py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              Simple workflow
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              From file to finished result.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              Each iclaude tool is designed around a straightforward
              upload, process and download workflow.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            <div className="iclaude-card p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-sm font-black text-blue-600">
                01
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-950">
                Choose your tool
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Select the tool that matches the file task you want to
                complete.
              </p>
            </div>

            <div className="iclaude-card p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-sm font-black text-indigo-600">
                02
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-950">
                Upload your file
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Add the supported file and follow the options provided
                by the selected tool.
              </p>
            </div>

            <div className="iclaude-card p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-sm font-black text-cyan-600">
                03
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-950">
                Download your result
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Review the processed file and continue with your
                workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="iclaude-container py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-300">
              iclaude
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Get your file ready and move on.
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-400">
              Simple tools for the file tasks you deal with every day.
            </p>

            <a
              href="#all"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              Explore tools
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}