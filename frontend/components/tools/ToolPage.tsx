import Link from "next/link";

import Breadcrumbs from "@/components/seo/Breadcrumbs";
import StructuredData from "@/components/seo/StructuredData";

import ToolCard, { ToolIcon } from "@/components/tools/ToolCard";
import UploadArea from "@/components/tools/UploadArea";
import ImageCompressor from "@/components/tools/ImageCompressor";
import ImageResizer from "@/components/tools/ImageResizer";
import BackgroundRemover from "@/components/tools/BackgroundRemover";
import PdfToWord from "@/components/tools/PdfToWord";
import VideoCompressor from "@/components/tools/VideoCompressor";

import {
  generateBreadcrumbSchema,
  generateToolSchema,
  generateWebPageSchema,
} from "@/lib/seo";

import {
  getRelatedTools,
  type ToolDefinition,
} from "@/lib/tools";

type ToolPageProps = {
  tool: ToolDefinition;
};

export default function ToolPage({ tool }: ToolPageProps) {
  const breadcrumbs = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Tools",
      href: "/tools/",
    },
    {
      name: tool.name,
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbs.map((item) => ({
      name: item.name,
      url: item.href ?? tool.href,
    })),
  );

  const webPageSchema = generateWebPageSchema({
    name: tool.name,
    description: tool.description,
    path: tool.href,
  });

  const toolSchema = generateToolSchema(tool);

  const relatedTools = getRelatedTools(tool).filter(
    (relatedTool) => relatedTool.status === "available",
  );

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={toolSchema} />

      <Breadcrumbs items={breadcrumbs} />

      <main className="overflow-hidden bg-white">
        {/* =========================================================
            PREMIUM HERO
            ========================================================= */}

        <section className="relative isolate overflow-hidden border-b border-slate-200 bg-[#f8fafc]">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
          >
            <div className="absolute left-[-12%] top-[-30%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute right-[-12%] top-[-20%] h-[460px] w-[460px] rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="absolute bottom-[-35%] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-indigo-500/5 blur-3xl" />
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage:
                "linear-gradient(to bottom, black, transparent 80%)",
            }}
          />

          <div className="iclaude-container relative py-12 sm:py-20 lg:py-28">
            <div className="mx-auto max-w-5xl text-center tool-page-hero-content">
              {/* Status */}
              <div className="iclaude-reveal flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-bold text-slate-600 shadow-sm backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>

                  Free online tool
                </div>
              </div>

              {/* Icon */}
              <div className="iclaude-reveal iclaude-delay-1 mt-7">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] border border-white bg-white text-4xl shadow-[0_20px_50px_rgba(15,23,42,0.10)] ring-1 ring-slate-200/70 sm:h-20 sm:w-20 sm:rounded-[24px]">
                  <ToolIcon icon={tool.icon} />
                </div>
              </div>

              {/* Category */}
              <p className="iclaude-reveal iclaude-delay-1 mt-7 text-xs font-black uppercase tracking-[0.2em] text-blue-600">
                {tool.category} tool
              </p>

              {/* Heading */}
              <h1 className="iclaude-reveal iclaude-delay-2 mx-auto mt-3 max-w-4xl text-[2.45rem] leading-[1.02] font-black tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-7xl">
                {tool.name}
              </h1>

              {/* Description */}
              <p className="iclaude-reveal iclaude-delay-3 mx-auto mt-5 max-w-3xl text-[15px] leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
                {tool.description}
              </p>

              {/* Formats */}
              <div className="iclaude-reveal iclaude-delay-4 mt-7 flex flex-wrap justify-center gap-2">
                {tool.supportedFormats.map((format) => (
                  <span
                    key={format}
                    className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-600 shadow-sm"
                  >
                    {format}
                  </span>
                ))}
              </div>

              {/* Hero CTA */}
              <div className="iclaude-reveal iclaude-delay-4 mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:items-center">
                <Link
                  href="#tool"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Start using {tool.shortName}
                  <span aria-hidden="true">↓</span>
                </Link>

                <span className="text-xs font-medium text-slate-400">
                  No installation required
                </span>
              </div>

              {/* Trust row */}
              <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2.5 text-[11px] font-semibold text-slate-500 sm:mt-10 sm:gap-x-6 sm:gap-y-3 sm:text-xs">
                <span className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  Simple workflow
                </span>

                <span className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  Browser-friendly
                </span>

                <span className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  Built for everyday use
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            WORKSPACE
            ========================================================= */}

        <section
          id="tool"
          className="scroll-mt-20 border-b border-slate-200 bg-slate-50 py-10 sm:scroll-mt-24 sm:py-20"
        >
          <div className="iclaude-container">
            <div className="mx-auto max-w-6xl">
              <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-end">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    Tool workspace
                  </div>

                  <h2 className="text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                    Get started in seconds
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                    Upload your file and follow the focused workflow designed
                    for {tool.shortName.toLowerCase()}.
                  </p>
                </div>

                <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-500 shadow-sm sm:flex">
                  <span className="text-emerald-500">●</span>
                  Ready to use
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[24px] border border-slate-200/90 bg-white p-1.5 shadow-[0_20px_60px_rgba(15,23,42,0.07)] sm:rounded-[30px] sm:p-3 sm:shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
                <div className="rounded-[19px] border border-slate-100 bg-slate-50/70 p-3 sm:rounded-[24px] sm:p-7">
                  {tool.slug === "image-compressor" ? (
                    <ImageCompressor />
                  ) : tool.slug === "image-resizer" ? (
                    <ImageResizer />
                  ) : tool.slug === "remove-background" ? (
                    <BackgroundRemover />
                  ) : tool.slug === "pdf-to-word" ? (
                    <PdfToWord />
                  ) : tool.slug === "video-compressor" ? (
                    <VideoCompressor />
                  ) : (
                    <UploadArea
                      acceptedFormats={tool.supportedFormats}
                      maxFileSizeMB={50}
                      multiple={false}
                    />
                  )}
                </div>
              </div>

              <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] font-medium text-slate-400 sm:mt-4 sm:gap-x-6 sm:text-xs">
                <span>Maximum file size: 50 MB</span>
                <span className="hidden sm:inline">•</span>
                <span>
                  Supported: {tool.supportedFormats.join(", ")}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            INTRO
            ========================================================= */}

        <section className="bg-white py-16 sm:py-24">
          <div className="iclaude-container">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
                  About the tool
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  Everything you need for {tool.shortName.toLowerCase()}
                </h2>

                <div className="mt-6 h-1 w-16 rounded-full bg-slate-950" />
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <p className="text-base leading-8 text-slate-600 sm:text-lg">
                  {tool.content.introduction}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            HOW IT WORKS
            ========================================================= */}

        <section className="border-y border-slate-200 bg-[#f8fafc] py-16 sm:py-24">
          <div className="iclaude-container">
            <div className="mx-auto max-w-6xl">
              <div className="max-w-2xl">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
                  Workflow
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  How {tool.shortName} works
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  A straightforward workflow designed to keep every step clear.
                </p>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {tool.content.howItWorks.map((step, index) => (
                  <article
                    key={step}
                    className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl sm:rounded-3xl sm:p-6"
                  >
                    <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-blue-500/5 blur-2xl transition group-hover:bg-blue-500/10" />

                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="text-xs font-bold text-slate-300">
                          STEP {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <p className="mt-7 text-sm font-semibold leading-7 text-slate-700">
                        {step}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            BENEFITS
            ========================================================= */}

        <section className="bg-white py-16 sm:py-24">
          <div className="iclaude-container">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
                    Why iclaude
                  </p>

                  <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                    Built around the task, not the complexity
                  </h2>

                  <p className="mt-5 max-w-lg leading-8 text-slate-600">
                    {tool.shortName} is designed to keep the experience focused,
                    understandable and practical.
                  </p>

                  <Link
                    href="#tool"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700"
                  >
                    Start with your file
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {tool.benefits.map((benefit, index) => (
                    <article
                      key={benefit}
                      className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-lg"
                    >
                      <div className="flex items-start gap-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-sm font-black text-emerald-600 transition group-hover:bg-emerald-100">
                          ✓
                        </span>

                        <div>
                          <span className="mb-1 block text-[10px] font-black uppercase tracking-wider text-slate-400">
                            Benefit {String(index + 1).padStart(2, "0")}
                          </span>

                          <p className="text-sm font-semibold leading-6 text-slate-700">
                            {benefit}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            USE CASES
            ========================================================= */}

        <section className="bg-slate-950 py-16 sm:py-24">
          <div className="iclaude-container">
            <div className="mx-auto max-w-6xl">
              <div className="max-w-2xl">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-300">
                  Use cases
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
                  Useful in real-world workflows
                </h2>

                <p className="mt-4 leading-7 text-slate-400">
                  Common situations where {tool.shortName.toLowerCase()} can
                  make file work simpler.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {tool.content.useCases.map((useCase, index) => (
                  <article
                    key={useCase}
                    className="group rounded-[22px] border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] sm:rounded-3xl sm:p-6"
                  >
                    <div className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-xs font-black text-slate-950">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="pt-1 text-sm leading-7 text-slate-300">
                        {useCase}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            FORMATS
            ========================================================= */}

        <section className="bg-white py-16 sm:py-24">
          <div className="iclaude-container">
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
                    Compatibility
                  </p>

                  <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                    Supported formats
                  </h2>
                </div>

                <p className="max-w-md text-sm leading-7 text-slate-500">
                  Use the formats listed below with this tool configuration.
                </p>
              </div>

              <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {tool.supportedFormats.map((format) => (
                  <div
                    key={format}
                    className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-lg sm:p-5"
                  >
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xs font-black text-slate-400 shadow-sm transition group-hover:text-blue-600">
                      FILE
                    </div>

                    <p className="mt-4 text-lg font-black text-slate-900">
                      {format}
                    </p>

                    <p className="mt-1 text-[11px] font-medium text-slate-400">
                      Supported format
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            TIPS
            ========================================================= */}

        <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-24">
          <div className="iclaude-container">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
                    Helpful tips
                  </p>

                  <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                    Get better results
                  </h2>

                  <p className="mt-5 max-w-md leading-8 text-slate-600">
                    A few practical things to keep in mind before processing
                    your file.
                  </p>
                </div>

                <div className="space-y-3">
                  {tool.content.tips.map((tip, index) => (
                    <article
                      key={tip}
                      className="group flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-x-1 hover:border-slate-300 hover:shadow-md sm:gap-4 sm:p-5"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-black text-blue-600">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="pt-1 text-sm leading-7 text-slate-700">
                        {tip}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            FAQ
            ========================================================= */}

        <section className="bg-white py-16 sm:py-24">
          <div className="iclaude-container">
            <div className="mx-auto max-w-4xl">
              <div className="text-center">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
                  FAQ
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  Frequently asked questions
                </h2>

                <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-500">
                  Quick answers about using {tool.shortName.toLowerCase()}.
                </p>
              </div>

              <div className="mt-10 space-y-3">
                {tool.faq.map((item, index) => (
                  <details
                    key={item.question}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-sm"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-sm font-bold text-slate-900 outline-none marker:hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 sm:px-6">
                      <span>
                        <span className="mr-3 text-xs text-blue-600">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {item.question}
                      </span>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-7 text-slate-600 sm:px-6">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            RELATED TOOLS
            ========================================================= */}

        {relatedTools.length > 0 && (
          <section className="bg-slate-50 py-16 sm:py-24">
            <div className="iclaude-container">
              <div className="mx-auto max-w-6xl">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
                      Continue exploring
                    </p>

                    <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                      More tools for your workflow
                    </h2>

                    <p className="mt-3 max-w-xl leading-7 text-slate-500">
                      Discover other tools that can help with everyday digital
                      file tasks.
                    </p>
                  </div>

                  <Link
                    href="/tools/"
                    className="inline-flex items-center gap-2 rounded-lg text-sm font-bold text-blue-600 transition hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    View all tools
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {relatedTools.map((relatedTool) => (
                    <ToolCard
                      key={relatedTool.slug}
                      tool={relatedTool}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            FINAL CTA
            ========================================================= */}

        <section className="bg-white py-16 sm:py-24">
          <div className="iclaude-container">
            <div className="relative isolate overflow-hidden rounded-[26px] bg-slate-950 px-5 py-12 text-center shadow-[0_24px_70px_rgba(15,23,42,0.16)] sm:rounded-[32px] sm:px-12 sm:py-20">
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl"
              />

              <div
                aria-hidden="true"
                className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/3 translate-y-1/3 rounded-full bg-cyan-400/10 blur-3xl"
              />

              <div className="relative">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl ring-1 ring-white/10">
                  <ToolIcon icon={tool.icon} />
                </div>

                <p className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-blue-300">
                  Ready when you are
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
                  Start with {tool.shortName}
                </h2>

                <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
                  Jump back to the workspace and complete your file workflow
                  with a clean, focused experience.
                </p>

                <Link
                  href="#tool"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-black text-slate-950 shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  Open tool
                  <span aria-hidden="true">↑</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}