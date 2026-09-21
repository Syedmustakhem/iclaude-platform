import type { Metadata } from "next";
import Link from "next/link";
import ToolCard from "@/components/tools/ToolCard";
import { tools } from "@/lib/tools";
import {
  generatePageMetadata,
  generateWebsiteSchema,
  generateOrganizationSchema,
} from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";

export const metadata: Metadata = generatePageMetadata({
  title: "Free Online Tools for Images, PDF & Video",
  description:
    "iclaude provides simple online tools to compress, resize, convert and process images, PDFs and videos. Choose a tool, upload your file and get started.",
  path: "/",
  keywords: [
    "online tools",
    "free online tools",
    "file tools",
    "image tools",
    "PDF tools",
    "video tools",
    "image compressor",
    "image resizer",
    "background remover",
    "PDF to Word",
    "video compressor",
  ],
});

const websiteSchema = generateWebsiteSchema();
const organizationSchema = generateOrganizationSchema();

const popularToolSlugs = [
  "image-compressor",
  "image-resizer",
  "remove-background",
  "pdf-to-word",
  "video-compressor",
];

const howItWorks = [
  {
    number: "1",
    title: "Choose a tool",
    description:
      "Select the file tool that matches the task you need to complete.",
  },
  {
    number: "2",
    title: "Upload your file",
    description:
      "Choose a supported file from your computer, phone or tablet.",
  },
  {
    number: "3",
    title: "Process your file",
    description:
      "Use the selected workflow to prepare or transform your file.",
  },
  {
    number: "4",
    title: "Download the result",
    description:
      "Download the processed file when your task is complete.",
  },
];

const benefits = [
  {
    title: "Simple workflows",
    description:
      "Each tool focuses on one common file task without unnecessary complexity.",
  },
  {
    title: "Multiple file types",
    description:
      "Work with common image, document and video formats supported by each tool.",
  },
  {
    title: "Tool-focused pages",
    description:
      "Every tool has its own page with instructions, formats, use cases and practical tips.",
  },
  {
    title: "Designed for everyday tasks",
    description:
      "Use iclaude when preparing files for websites, sharing, storage or everyday digital work.",
  },
];

export default function HomePage() {
  const popularTools = popularToolSlugs
    .map((slug) =>
      tools.find((tool) => tool.slug === slug)
    )
    .filter((tool) => Boolean(tool));

  return (
    <>
      <StructuredData data={websiteSchema} />
      <StructuredData data={organizationSchema} />

      <main>
        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-blue-50 via-white to-white">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-80 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.12),transparent_65%)]"
            aria-hidden="true"
          />

          <div className="iclaude-container relative z-10">
            <div className="mx-auto max-w-5xl px-0 py-16 text-center sm:py-24 lg:py-28">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 text-3xl font-bold text-white shadow-lg shadow-blue-200">
                i
              </div>

              <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                Simple online file tools
              </p>

              <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
                Free Online Tools for{" "}
                <span className="iclaude-gradient-text">
                  Images, PDF & Video
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
                Compress, resize, convert and process your files
                with straightforward online tools designed for
                everyday digital work.
              </p>

              {/* Search-style navigation */}
              <div className="mx-auto mt-9 max-w-2xl">
                <Link
                  href="/tools"
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2 text-left shadow-lg shadow-slate-200/50 transition hover:border-blue-300 hover:shadow-xl"
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl"
                    aria-hidden="true"
                  >
                    🔍
                  </span>

                  <span className="flex-1">
                    <span className="block text-sm font-medium text-slate-400">
                      Find a tool
                    </span>

                    <span className="block text-sm text-slate-700">
                      Browse image, PDF and video tools
                    </span>
                  </span>

                  <span className="mr-2 hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white sm:block">
                    Browse
                  </span>
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <span className="rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
                  Image tools
                </span>

                <span className="rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
                  PDF tools
                </span>

                <span className="rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
                  Video tools
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            POPULAR TOOLS
        ====================================================== */}
        <section className="py-14 sm:py-20">
          <div className="iclaude-container">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Get started
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Popular tools
                </h2>

                <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                  Start with one of the core iclaude tools for
                  common image, PDF and video tasks.
                </p>
              </div>

              <Link
                href="/tools"
                className="shrink-0 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View all tools →
              </Link>
            </div>

            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {popularTools.map((tool) => {
                if (!tool) {
                  return null;
                }

                return (
                  <ToolCard
                    key={tool.slug}
                    tool={tool}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            CATEGORIES
        ====================================================== */}
        <section className="bg-slate-50 py-14 sm:py-20">
          <div className="iclaude-container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Browse by category
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Tools for different file types
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Choose a category to find tools designed for the
                type of file you are working with.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <Link
                href="/tools#Images-heading"
                className="iclaude-card p-7"
              >
                <span
                  className="text-3xl"
                  aria-hidden="true"
                >
                  🖼️
                </span>

                <h3 className="mt-5 text-xl font-semibold text-slate-950">
                  Image Tools
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Compress images, resize them and remove
                  backgrounds with dedicated image workflows.
                </p>

                <span className="mt-5 inline-block text-sm font-semibold text-blue-600">
                  Explore image tools →
                </span>
              </Link>

              <Link
                href="/tools#PDF-heading"
                className="iclaude-card p-7"
              >
                <span
                  className="text-3xl"
                  aria-hidden="true"
                >
                  📄
                </span>

                <h3 className="mt-5 text-xl font-semibold text-slate-950">
                  PDF Tools
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Work with PDF documents using simple conversion
                  and file-processing workflows.
                </p>

                <span className="mt-5 inline-block text-sm font-semibold text-blue-600">
                  Explore PDF tools →
                </span>
              </Link>

              <Link
                href="/tools#Video-heading"
                className="iclaude-card p-7"
              >
                <span
                  className="text-3xl"
                  aria-hidden="true"
                >
                  🎬
                </span>

                <h3 className="mt-5 text-xl font-semibold text-slate-950">
                  Video Tools
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Reduce video file sizes and prepare videos for
                  easier sharing and storage.
                </p>

                <span className="mt-5 inline-block text-sm font-semibold text-blue-600">
                  Explore video tools →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* =====================================================
            HOW IT WORKS
        ====================================================== */}
        <section className="py-14 sm:py-20">
          <div className="iclaude-container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Simple workflow
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                How iclaude works
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Every tool follows a straightforward workflow so
                you can focus on the file task rather than
                navigating complicated software.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map((step) => (
                <div
                  key={step.number}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {step.number}
                  </div>

                  <h3 className="mt-5 font-semibold text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            WHY ICLAUDE
        ====================================================== */}
        <section className="bg-slate-50 py-14 sm:py-20">
          <div className="iclaude-container">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Why iclaude
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Built around useful file workflows
                </h2>

                <p className="mt-5 max-w-xl leading-8 text-slate-600">
                  iclaude brings common file operations together
                  so you can find the right tool without searching
                  through complicated software interfaces.
                </p>

                <Link
                  href="/tools"
                  className="mt-7 inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Explore all tools
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6"
                  >
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600"
                      aria-hidden="true"
                    >
                      ✓
                    </div>

                    <h3 className="mt-4 font-semibold text-slate-950">
                      {benefit.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            SEO CONTENT
        ====================================================== */}
        <section className="py-14 sm:py-20">
          <div className="iclaude-content">
            <article className="mx-auto max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                About the platform
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Online tools for everyday digital work
              </h2>

              <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
                <p>
                  Digital files often need small changes before
                  they can be shared, uploaded, stored or used in
                  another application. An image may need to be
                  smaller, a photo may need new dimensions, a
                  background may need to be removed, or a document
                  may need to be converted into another format.
                </p>

                <p>
                  iclaude is being built as a collection of focused
                  online tools for these everyday file tasks. Each
                  tool has a dedicated workflow and supporting
                  information so users can understand what it does
                  before uploading a file.
                </p>

                <p>
                  The platform currently focuses on image, PDF and
                  video workflows, with additional tools planned as
                  the platform grows.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}
        <section className="pb-16 sm:pb-24">
          <div className="iclaude-container">
            <div className="overflow-hidden rounded-3xl bg-slate-950 px-6 py-14 text-center sm:px-12">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                Get started
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Find the right tool for your file
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
                Browse the iclaude tool collection and choose the
                workflow that matches what you need to accomplish.
              </p>

              <Link
                href="/tools"
                className="mt-7 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Browse all tools
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}