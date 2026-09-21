import Link from "next/link";

import Breadcrumbs from "@/components/seo/Breadcrumbs";
import StructuredData from "@/components/seo/StructuredData";
import ToolCard from "@/components/tools/ToolCard";
import UploadArea from "@/components/tools/UploadArea";
import ImageCompressor from "@/components/tools/ImageCompressor";
import {
  generateBreadcrumbSchema,
  generateToolSchema,
} from "@/lib/seo";

import {
  getRelatedTools,
  type ToolDefinition,
} from "@/lib/tools";

type ToolPageProps = {
  tool: ToolDefinition;
};

export default function ToolPage({
  tool,
}: ToolPageProps) {
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

  const toolSchema = generateToolSchema(tool);

  const relatedTools = getRelatedTools(tool).filter(
    (relatedTool) => relatedTool.status === "available",
  );

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={toolSchema} />

      <Breadcrumbs items={breadcrumbs} />

      <main className="iclaude-tool-shell">
        {/* ======================================================
            Hero
            ====================================================== */}

        <section className="iclaude-tool-hero">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_32%),radial-gradient(circle_at_top_right,rgba(6,182,212,0.10),transparent_30%)]"
          />

          <div
            aria-hidden="true"
            className="iclaude-dot-grid absolute inset-x-0 top-0 h-80 opacity-40"
          />

          <div className="iclaude-container relative py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <div className="iclaude-reveal">
                <div
                  className="iclaude-tool-icon mx-auto h-16 w-16 rounded-2xl text-3xl"
                  aria-hidden="true"
                >
                  {tool.icon}
                </div>
              </div>

              <p className="iclaude-reveal iclaude-delay-1 mt-6 text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                {tool.category} tool
              </p>

              <h1 className="iclaude-reveal iclaude-delay-2 mt-3 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
                {tool.name}
              </h1>

              <p className="iclaude-reveal iclaude-delay-3 mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                {tool.description}
              </p>

              <div className="iclaude-reveal iclaude-delay-4 mt-8 flex flex-wrap justify-center gap-2">
                {tool.supportedFormats.map((format) => (
                  <span
                    key={format}
                    className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-sm"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            Tool workspace
            ====================================================== */}

        <section
          id="tool"
          className="scroll-mt-28 bg-slate-50/70 py-12 sm:py-16"
        >
          <div className="iclaude-container">
            <div className="mx-auto max-w-4xl">
              <div className="iclaude-tool-panel p-5 sm:p-8">
                <div className="mb-7 text-center">
                  <div className="iclaude-tool-badge mx-auto">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-blue-600"
                    />
                    Upload your file
                  </div>

                  <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                    Start with your {tool.category.toLowerCase()} file
                  </h2>

                  <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
                    Select a supported file below. The current workspace
                    provides the upload experience while processing is
                    connected to the tool service.
                  </p>
                </div>

                {tool.slug === "image-compressor" ? (
  <ImageCompressor />
) : (
  <UploadArea
    acceptedFormats={tool.supportedFormats}
    maxFileSizeMB={50}
    multiple={false}
  />
)}

                <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-slate-500">
                  <span>Maximum file size: 50 MB</span>
                  <span aria-hidden="true">•</span>
                  <span>
                    Supported: {tool.supportedFormats.join(", ")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            Introduction
            ====================================================== */}

        <section className="bg-white py-14 sm:py-20">
          <div className="iclaude-container">
            <article className="iclaude-prose mx-auto max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                About this tool
              </p>

              <h2>
                What is {tool.name}?
              </h2>

              <p className="text-base sm:text-lg">
                {tool.content.introduction}
              </p>
            </article>
          </div>
        </section>

        {/* ======================================================
            How it works
            ====================================================== */}

        <section className="bg-slate-50 py-14 sm:py-20">
          <div className="iclaude-container">
            <div className="mx-auto max-w-5xl">
              <div className="text-center">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                  Simple process
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  How to use {tool.shortName}
                </h2>

                <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
                  Follow the steps below to complete the workflow.
                </p>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {tool.content.howItWorks.map(
                  (step, index) => (
                    <article
                      key={step}
                      className="iclaude-card p-6"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <p className="mt-5 text-sm leading-7 text-slate-600">
                        {step}
                      </p>
                    </article>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            Benefits
            ====================================================== */}

        <section className="bg-white py-14 sm:py-20">
          <div className="iclaude-container">
            <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                  Why use it
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  Designed for practical file workflows
                </h2>

                <p className="mt-5 leading-8 text-slate-600">
                  iclaude focuses on clear tools and straightforward
                  workflows so you can get to the file task without
                  unnecessary complexity.
                </p>
              </div>

              <ul className="space-y-3">
                {tool.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white"
                  >
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-600"
                      aria-hidden="true"
                    >
                      ✓
                    </span>

                    <span className="text-sm leading-6 text-slate-700">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ======================================================
            Use cases
            ====================================================== */}

        <section className="bg-slate-50 py-14 sm:py-20">
          <div className="iclaude-container">
            <div className="mx-auto max-w-5xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                Use cases
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Common uses for {tool.shortName}
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                Here are some common situations where this type of
                file workflow can be useful.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {tool.content.useCases.map((useCase) => (
                  <article
                    key={useCase}
                    className="iclaude-card-static p-5"
                  >
                    <div className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600"
                      />

                      <p className="text-sm leading-7 text-slate-700">
                        {useCase}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            Supported formats
            ====================================================== */}

        <section className="bg-white py-14 sm:py-20">
          <div className="iclaude-container">
            <div className="mx-auto max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                Compatibility
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Supported file formats
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                The current tool configuration is designed around the
                following supported formats.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {tool.supportedFormats.map((format) => (
                  <div
                    key={format}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center transition hover:border-blue-200 hover:bg-blue-50/50"
                  >
                    <span className="text-lg font-black text-slate-900">
                      {format}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            Tips
            ====================================================== */}

        <section className="bg-slate-50 py-14 sm:py-20">
          <div className="iclaude-container">
            <div className="mx-auto max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                Helpful tips
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Tips for better results
              </h2>

              <div className="mt-8 space-y-3">
                {tool.content.tips.map((tip, index) => (
                  <article
                    key={tip}
                    className="iclaude-card-static p-5"
                  >
                    <div className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-black text-blue-600">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="text-sm leading-7 text-slate-700">
                        {tip}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            FAQ
            ====================================================== */}

        <section className="bg-white py-14 sm:py-20">
          <div className="iclaude-container">
            <div className="mx-auto max-w-4xl">
              <div className="text-center">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                  Questions
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  Frequently asked questions
                </h2>
              </div>

              <div className="mt-10">
                {tool.faq.map((item) => (
                  <details
                    key={item.question}
                    className="iclaude-faq"
                  >
                    <summary>
                      <span>{item.question}</span>
                    </summary>

                    <div>
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            Related tools
            ====================================================== */}

        {relatedTools.length > 0 && (
          <section className="bg-slate-50 py-14 sm:py-20">
            <div className="iclaude-container">
              <div className="mx-auto max-w-6xl">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                      Explore more
                    </p>

                    <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                      Related tools
                    </h2>

                    <p className="mt-3 max-w-xl leading-7 text-slate-600">
                      Continue with another tool that may fit your
                      workflow.
                    </p>
                  </div>

                  <Link
                    href="/tools/"
                    className="inline-flex w-fit items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700"
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

        {/* ======================================================
            Final CTA
            ====================================================== */}

        <section className="bg-white py-14 sm:py-20">
          <div className="iclaude-container">
            <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-12 text-center shadow-[0_24px_70px_rgba(15,23,42,0.18)] sm:px-12">
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl"
              />

              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-40 w-40 -translate-x-1/2 translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl"
              />

              <div className="relative">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-300">
                  Ready when you are
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Ready to use {tool.shortName}?
                </h2>

                <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
                  Return to the workspace and continue with your file
                  workflow.
                </p>

                <Link
                  href="#tool"
                  className="iclaude-button-primary mt-8 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  Start using the tool
                  <span
                    aria-hidden="true"
                    className="ml-2"
                  >
                    ↑
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}