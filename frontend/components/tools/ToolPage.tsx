import Link from "next/link";
import {
  getToolBySlug,
  type ToolDefinition,
} from "@/lib/tools";
import {
  generateBreadcrumbSchema,
  generateToolSchema,
} from "@/lib/seo";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import StructuredData from "@/components/seo/StructuredData";
import ToolCard from "@/components/tools/ToolCard";
import UploadArea from "@/components/tools/UploadArea";

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
      href: "/tools",
    },
    {
      name: tool.name,
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbs.map((item) => ({
      name: item.name,
      url: item.href ?? tool.href,
    }))
  );

  const toolSchema = generateToolSchema(tool);

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={toolSchema} />

      <Breadcrumbs items={breadcrumbs} />

      <main>
        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="border-b border-slate-100 bg-gradient-to-b from-blue-50/70 via-white to-white">
          <div className="iclaude-content py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-4xl text-center">
              <div
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl shadow-sm"
                aria-hidden="true"
              >
                {tool.icon}
              </div>

              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
                {tool.category} tool
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                {tool.name}
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
                {tool.description}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {tool.supportedFormats.map((format) => (
                  <span
                    key={format}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            UPLOAD TOOL
        ====================================================== */}
        <section
          id="tool"
          className="scroll-mt-24 py-10 sm:py-14"
        >
          <div className="iclaude-content">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                <UploadArea
                  acceptedFormats={tool.supportedFormats}
                  maxFileSizeMB={50}
                  multiple={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            INTRODUCTION
        ====================================================== */}
        <section className="border-t border-slate-100 py-12 sm:py-16">
          <div className="iclaude-content">
            <article className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                What is {tool.name}?
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                {tool.content.introduction}
              </p>
            </article>
          </div>
        </section>

        {/* =====================================================
            HOW IT WORKS
        ====================================================== */}
        <section className="bg-slate-50 py-12 sm:py-16">
          <div className="iclaude-content">
            <div className="mx-auto max-w-5xl">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Simple process
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                  How to use {tool.shortName}
                </h2>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {tool.content.howItWorks.map(
                  (step, index) => (
                    <div
                      key={step}
                      className="rounded-2xl border border-slate-200 bg-white p-6"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                        {index + 1}
                      </div>

                      <p className="mt-5 text-sm leading-7 text-slate-600">
                        {step}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            BENEFITS
        ====================================================== */}
        <section className="py-12 sm:py-16">
          <div className="iclaude-content">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-10 md:grid-cols-2 md:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                    Why use iclaude
                  </p>

                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                    Designed for simple file workflows
                  </h2>

                  <p className="mt-5 leading-7 text-slate-600">
                    iclaude is designed around a straightforward
                    upload, process and download workflow so you
                    can complete common file tasks without
                    unnecessary steps.
                  </p>
                </div>

                <ul className="space-y-4">
                  {tool.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4"
                    >
                      <span
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-sm text-green-600"
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
          </div>
        </section>

        {/* =====================================================
            USE CASES
        ====================================================== */}
        <section className="bg-slate-50 py-12 sm:py-16">
          <div className="iclaude-content">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                Common uses for {tool.shortName}
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {tool.content.useCases.map((useCase) => (
                  <div
                    key={useCase}
                    className="rounded-xl border border-slate-200 bg-white p-5"
                  >
                    <p className="text-sm leading-7 text-slate-700">
                      {useCase}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            SUPPORTED FORMATS
        ====================================================== */}
        <section className="py-12 sm:py-16">
          <div className="iclaude-content">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                Supported file formats
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                The {tool.name.toLowerCase()} supports the
                following formats and file types:
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {tool.supportedFormats.map((format) => (
                  <span
                    key={format}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            TIPS
        ====================================================== */}
        <section className="bg-slate-50 py-12 sm:py-16">
          <div className="iclaude-content">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                Tips for better results
              </h2>

              <div className="mt-8 space-y-4">
                {tool.content.tips.map((tip) => (
                  <div
                    key={tip}
                    className="rounded-xl border border-slate-200 bg-white p-5"
                  >
                    <p className="text-sm leading-7 text-slate-700">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            FAQ
        ====================================================== */}
        <section className="py-12 sm:py-16">
          <div className="iclaude-content">
            <div className="mx-auto max-w-4xl">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Questions
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                  Frequently asked questions
                </h2>
              </div>

              <div className="mt-10 space-y-4">
                {tool.faq.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-xl border border-slate-200 bg-white"
                  >
                    <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-slate-900">
                      <div className="flex items-center justify-between gap-4">
                        <span>{item.question}</span>

                        <span
                          aria-hidden="true"
                          className="text-xl text-slate-400 transition-transform group-open:rotate-45"
                        >
                          +
                        </span>
                      </div>
                    </summary>

                    <div className="border-t border-slate-100 px-5 py-4">
                      <p className="text-sm leading-7 text-slate-600">
                        {item.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            RELATED TOOLS
        ====================================================== */}
        {tool.relatedTools.length > 0 && (
          <section className="border-t border-slate-100 bg-slate-50 py-12 sm:py-16">
            <div className="iclaude-content">
              <div className="mx-auto max-w-6xl">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                      Explore more
                    </p>

                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                      Related tools
                    </h2>
                  </div>

                  <Link
                    href="/tools"
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    View all tools →
                  </Link>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {tool.relatedTools
                    .map((slug) => getToolBySlug(slug))
                    .filter(
                      (
                        relatedTool
                      ): relatedTool is ToolDefinition =>
                        Boolean(relatedTool)
                    )
                    .map((relatedTool) => (
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

        {/* =====================================================
            FINAL CTA
        ====================================================== */}
        <section className="py-14 sm:py-20">
          <div className="iclaude-content">
            <div className="overflow-hidden rounded-3xl bg-slate-950 px-6 py-12 text-center sm:px-12">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to use {tool.shortName}?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                Upload your file and complete your task with the
                iclaude workflow.
              </p>

              <Link
                href="#tool"
                className="mt-7 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Start using the tool
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}