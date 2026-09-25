"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import ToolCard from "@/components/tools/ToolCard";
import {
  getAvailableTools,
  getAvailableToolsByCategory,
  type ToolCategory,
} from "@/lib/tools";

type CategoryId = "all" | "images" | "pdf" | "video";

type CategoryConfig = {
  id: Exclude<CategoryId, "all">;
  category: ToolCategory;
  label: string;
  shortLabel: string;
  eyebrow: string;
  description: string;
  icon: string;
  gradient: string;
  accent: string;
};

const categoryConfig: CategoryConfig[] = [
  {
    id: "images",
    category: "Images",
    label: "Image tools",
    shortLabel: "Images",
    eyebrow: "IMAGE WORKSPACE",
    description:
      "Compress, resize and transform images for websites, documents, social media and everyday digital work.",
    icon: "▧",
    gradient:
      "from-blue-500/[0.14] via-indigo-500/[0.08] to-cyan-500/[0.1]",
    accent: "text-blue-600",
  },
  {
    id: "pdf",
    category: "PDF",
    label: "PDF tools",
    shortLabel: "PDF",
    eyebrow: "DOCUMENT WORKSPACE",
    description:
      "Work with supported PDF files through focused document tools designed for everyday workflows.",
    icon: "▤",
    gradient:
      "from-violet-500/[0.14] via-fuchsia-500/[0.08] to-blue-500/[0.1]",
    accent: "text-violet-600",
  },
  {
    id: "video",
    category: "Video",
    label: "Video tools",
    shortLabel: "Video",
    eyebrow: "VIDEO WORKSPACE",
    description:
      "Reduce video file sizes and prepare videos for sharing, uploading and storage.",
    icon: "▶",
    gradient:
      "from-cyan-500/[0.14] via-sky-500/[0.08] to-blue-500/[0.1]",
    accent: "text-cyan-600",
  },
];

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.25 4.25" />
    </svg>
  );
}

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
      strokeLinecap="round"
      strokeLinejoin="round"
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
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
      <path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />
    </svg>
  );
}

function ToolLibraryIcon({
  type,
}: {
  type: "image" | "pdf" | "video";
}) {
  if (type === "pdf") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 3.5h8l4 4V20.5H6z" />
        <path d="M14 3.5v4h4" />
        <path d="M8.5 15.5h7" />
        <path d="M8.5 12.5h5" />
      </svg>
    );
  }

  if (type === "video") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="5"
          width="13"
          height="14"
          rx="2.5"
        />
        <path d="m16 10 5-3v10l-5-3z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="3"
      />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m5.5 18 5.5-5 3.5 3 2-2 2 2" />
    </svg>
  );
}

function CategorySection({
  config,
  tools,
}: {
  config: CategoryConfig;
  tools: ReturnType<typeof getAvailableToolsByCategory>;
}) {
  if (tools.length === 0) return null;

  return (
    <section
      id={config.id}
      aria-labelledby={`${config.id}-heading`}
      className="scroll-mt-32 border-t border-slate-200/70 bg-white"
    >
      <div className="iclaude-container py-20 sm:py-24">
        <div
          className={`relative mb-10 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-gradient-to-br ${config.gradient} p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-10`}
        >
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-white/70 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-32 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-white/50 blur-3xl"
          />

          <div className="relative flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/90 bg-white/80 px-3.5 py-2 text-xs font-black tracking-[0.16em] text-slate-700 shadow-sm backdrop-blur">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950 text-xs text-white">
                  {config.icon}
                </span>

                {config.eyebrow}
              </div>

              <h2
                id={`${config.id}-heading`}
                className="text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl"
              >
                {config.label}
              </h2>

              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                {config.description}
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/90 bg-white/80 px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              {tools.length}{" "}
              {tools.length === 1 ? "tool" : "tools"} ready
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
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

export default function ToolsDirectory() {
  const availableTools = getAvailableTools();

  const [activeCategory, setActiveCategory] =
    useState<CategoryId>("all");

  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredTools = useMemo(() => {
    return availableTools.filter((tool) => {
      const matchesCategory =
        activeCategory === "all" ||
        categoryConfig.find(
          (config) => config.id === activeCategory,
        )?.category === tool.category;

      if (!matchesCategory) return false;

      if (!normalizedQuery) return true;

      const searchableText = [
        tool.name,
        tool.slug,
        tool.description,
        tool.shortDescription,
        tool.category,
        ...tool.keywords,
        ...tool.popularSearches,
        ...tool.supportedFormats,
        ...tool.benefits,
        ...tool.content.useCases,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [
    activeCategory,
    availableTools,
    normalizedQuery,
  ]);

  const featuredTools = availableTools.slice(0, 3);

  const categoryCounts = useMemo(
    () => ({
      all: availableTools.length,
      images: getAvailableToolsByCategory("Images").length,
      pdf: getAvailableToolsByCategory("PDF").length,
      video: getAvailableToolsByCategory("Video").length,
    }),
    [availableTools],
  );

  const hasSearch = normalizedQuery.length > 0;

  const showingFilteredResults =
    hasSearch || activeCategory !== "all";

  return (
    <main className="overflow-hidden bg-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-slate-950">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(59,130,246,0.25),transparent_31%),radial-gradient(circle_at_82%_12%,rgba(6,182,212,0.18),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.2),transparent_36%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute left-[8%] top-24 h-44 w-44 rounded-full bg-blue-500/20 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute bottom-0 right-[8%] h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
        />

        <div className="iclaude-container relative py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-5xl text-center">
            <div className="iclaude-reveal inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm font-semibold text-slate-200 shadow-2xl backdrop-blur-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
              </span>

              {availableTools.length} tools available
            </div>

            <h1 className="iclaude-reveal iclaude-delay-1 mt-8 text-4xl font-black tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
              Your file toolbox,
              <span className="mt-2 block bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                without the clutter.
              </span>
            </h1>

            <p className="iclaude-reveal iclaude-delay-2 mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Find a focused tool for the task in front of you. Compress,
              resize, convert and transform supported files in a few simple
              steps.
            </p>

            <div className="iclaude-reveal iclaude-delay-3 mx-auto mt-10 max-w-3xl">
              <label className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.09] p-2 text-left shadow-2xl backdrop-blur-xl transition duration-300 focus-within:border-cyan-300/40 focus-within:bg-white/[0.12]">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-slate-950 shadow-lg">
                  <SearchIcon />
                </span>

                <span className="flex-1">
                  <span className="sr-only">
                    Search tools
                  </span>

                  <input
                    type="search"
                    value={query}
                    onChange={(event) =>
                      setQuery(event.target.value)
                    }
                    placeholder="Search a tool, file type or task..."
                    className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-slate-500"
                  />

                  <span className="mt-0.5 block text-xs text-slate-500">
                    Try “compress”, “resize”, “PDF” or “video”
                  </span>
                </span>

                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="mr-1 rounded-xl border border-white/10 bg-white/[0.07] px-3 py-2 text-xs font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
                    aria-label="Clear tool search"
                  >
                    Clear
                  </button>
                )}
              </label>
            </div>

            {/* Category counters */}
            <div className="iclaude-reveal iclaude-delay-4 mx-auto mt-10 grid max-w-4xl grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl sm:grid-cols-4">
              {[
                ["all", categoryCounts.all, "Tools"],
                ["images", categoryCounts.images, "Images"],
                ["pdf", categoryCounts.pdf, "PDF"],
                ["video", categoryCounts.video, "Video"],
              ].map(([id, count, label], index) => (
                <button
                  key={id}
                  type="button"
                  onClick={() =>
                    setActiveCategory(id as CategoryId)
                  }
                  className={`px-3 py-5 transition ${
                    index > 0
                      ? "border-l border-white/10"
                      : ""
                  } ${
                    activeCategory === id
                      ? "bg-white/[0.08]"
                      : "hover:bg-white/[0.04]"
                  }`}
                >
                  <p className="text-2xl font-black text-white">
                    {count}
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
                    {label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="iclaude-reveal iclaude-delay-4 mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
            {categoryConfig.map((config) => (
              <Link
                key={config.id}
                href={`#${config.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-slate-300 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <span>{config.icon}</span>

                {config.label}

                <ArrowIcon className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </section>

      {/* CATEGORY NAVIGATION */}
      <nav
        aria-label="Tool categories"
        className="sticky top-[74px] z-30 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl lg:top-[78px]"
      >
        <div className="iclaude-container overflow-x-auto">
          <div className="flex min-w-max items-center justify-center gap-1 py-3">
            {[
              {
                id: "all" as const,
                label: "All tools",
                count: categoryCounts.all,
              },
              ...categoryConfig.map((config) => ({
                id: config.id,
                label: config.shortLabel,
                count: categoryCounts[config.id],
              })),
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  setActiveCategory(item.id)
                }
                className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                  activeCategory === item.id
                    ? "bg-slate-950 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`}
                aria-pressed={
                  activeCategory === item.id
                }
              >
                {item.label}

                <span
                  className={`ml-2 text-xs ${
                    activeCategory === item.id
                      ? "text-slate-400"
                      : "text-slate-400"
                  }`}
                >
                  {item.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* FEATURED TOOLS */}
      {!showingFilteredResults &&
        featuredTools.length > 0 && (
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

                <button
                  type="button"
                  onClick={() =>
                    setActiveCategory("all")
                  }
                  className="inline-flex w-fit items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700"
                >
                  View everything
                  <ArrowIcon className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {featuredTools.map((tool, index) => (
                  <div
                    key={tool.slug}
                    className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-1 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="absolute right-5 top-5 z-10 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 shadow-sm backdrop-blur">
                      {index === 0
                        ? "Featured"
                        : "Popular"}
                    </div>

                    <ToolCard tool={tool} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      {/* ALL TOOLS */}
      <section
        id="all"
        aria-labelledby="all-tools-heading"
        className="scroll-mt-32 bg-white"
      >
        <div className="iclaude-container py-20 sm:py-24">
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
                <SparkIcon />

                {showingFilteredResults
                  ? "Filtered results"
                  : "Tool library"}
              </div>

              <h2
                id="all-tools-heading"
                className="text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl"
              >
                {hasSearch
                  ? `Results for “${query.trim()}”`
                  : activeCategory === "all"
                    ? "All available tools"
                    : categoryConfig.find(
                          (config) =>
                            config.id ===
                            activeCategory,
                        )?.label}
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                {filteredTools.length === 0
                  ? "Try a different search term or browse another category."
                  : showingFilteredResults
                    ? `${filteredTools.length} ${
                        filteredTools.length === 1
                          ? "tool"
                          : "tools"
                      } match your current selection.`
                    : "Choose exactly what you need and get straight to the task without unnecessary steps."}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {showingFilteredResults && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveCategory("all");
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:text-slate-950"
                >
                  Reset
                </button>
              )}

              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />

                {filteredTools.length} available
              </span>
            </div>
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map((tool) => (
                <div
                  key={tool.slug}
                  className="iclaude-reveal transition-transform duration-300 hover:-translate-y-1"
                >
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-2xl rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm ring-1 ring-slate-200">
                <SearchIcon />
              </div>

              <h3 className="mt-6 text-xl font-black text-slate-950">
                No matching tools yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
                We couldn’t find a tool matching that search. Clear the search
                or explore another category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("all");
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Show all tools
                <ArrowIcon />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CATEGORY SECTIONS */}
      {!showingFilteredResults &&
        categoryConfig.map((config) => (
          <CategorySection
            key={config.category}
            config={config}
            tools={getAvailableToolsByCategory(
              config.category,
            )}
          />
        ))}

      {/* HOW IT WORKS */}
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
                <div
                  key={step.number}
                  className="relative text-center"
                >
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

      {/* VALUE PROPS */}
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
                className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition hover:border-slate-300 hover:bg-white hover:shadow-sm"
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

      {/* CTA */}
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
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("all");

                  document
                    .getElementById("all")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xl transition hover:-translate-y-1 hover:bg-slate-100"
              >
                Explore all tools

                <ArrowIcon className="h-4 w-4 rotate-90" />
              </button>

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