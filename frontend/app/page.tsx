import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import StructuredData from "@/components/seo/StructuredData";
import ToolCard from "@/components/tools/ToolCard";

import {
  generateOrganizationSchema,
  generatePageMetadata,
  generateWebsiteSchema,
} from "@/lib/seo";

import { tools } from "@/lib/tools";

export const metadata: Metadata = generatePageMetadata({
  title: "Free Online File Tools for Images, PDF & Video",
  description:
    "Compress, resize, convert and transform your files with simple free online tools for images, PDFs and videos. Fast, focused and easy to use.",
  path: "/",
  keywords: [
    "free online tools",
    "online file tools",
    "image compressor",
    "image resizer",
    "background remover",
    "PDF to Word converter",
    "video compressor",
    "compress image online",
    "resize image online",
    "convert PDF online",
  ],
});

const popularToolSlugs = [
  "image-compressor",
  "image-resizer",
  "remove-background",
  "pdf-to-word",
  "video-compressor",
];

const processSteps = [
  {
    number: "01",
    title: "Choose a tool",
    text: "Pick the workflow that matches what you need to do.",
  },
  {
    number: "02",
    title: "Add your file",
    text: "Upload the image, document or video you want to process.",
  },
  {
    number: "03",
    title: "Process",
    text: "Use the focused workflow to prepare your file.",
  },
  {
    number: "04",
    title: "Download",
    text: "Get your finished file when the process is complete.",
  },
];

const advantages = [
  {
    title: "Focused by design",
    text: "Every tool is built around a specific file task instead of overwhelming you with unnecessary options.",
  },
  {
    title: "Fast to understand",
    text: "Clear interfaces and straightforward workflows help you get started immediately.",
  },
  {
    title: "Built for everyday work",
    text: "Prepare files for websites, documents, social media, sharing, storage and more.",
  },
  {
    title: "Growing collection",
    text: "New practical workflows can be added as the platform evolves.",
  },
];

const faqs = [
  {
    question: "What is iclaude?",
    answer:
      "iclaude is a collection of online tools designed for common image, PDF and video file workflows.",
  },
  {
    question: "What can I do with iclaude?",
    answer:
      "The current collection includes image compression, image resizing, background removal, PDF to Word conversion and video compression.",
  },
  {
    question: "Do I need to install software?",
    answer:
      "No desktop application is required for the website experience. The tools are designed to be accessed directly through a modern web browser.",
  },
  {
    question: "Which file formats are supported?",
    answer:
      "Supported formats depend on the individual tool. Each tool page provides information about the formats and workflow available for that tool.",
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

function SparkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
      <path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="m4 10 4 4 8-9" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9" r="1.4" />
      <path d="m21 15-5-5-7 7-2-2-4 4" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h4" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="m16 10 5-3v10l-5-3z" />
    </svg>
  );
}

export default function HomePage() {
  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = generateOrganizationSchema();

  const popularTools = popularToolSlugs
    .map((slug) => tools.find((tool) => tool.slug === slug))
    .filter(Boolean);

  return (
    <>
      <StructuredData data={websiteSchema} />
      <StructuredData data={organizationSchema} />

      <main className="overflow-hidden">
        {/* =========================================================
            HERO
        ========================================================== */}

        <section className="relative isolate overflow-hidden bg-white">
          {/* Animated background */}
          <div
            className="pointer-events-none absolute inset-0 -z-20"
            aria-hidden="true"
          >
            <div className="absolute left-1/2 top-[-280px] h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/[0.07] blur-3xl iclaude-float-slow" />

            <div className="absolute left-[-180px] top-[300px] h-[420px] w-[420px] rounded-full bg-cyan-400/[0.06] blur-3xl iclaude-float" />

            <div className="absolute right-[-180px] top-[160px] h-[460px] w-[460px] rounded-full bg-violet-500/[0.07] blur-3xl iclaude-float-reverse" />
          </div>

          <div
            className="pointer-events-none absolute inset-0 -z-10 iclaude-dot-grid opacity-60"
            aria-hidden="true"
          />

          <div className="iclaude-container">
            <div className="grid min-h-[720px] items-center gap-14 py-16 lg:grid-cols-[1fr_0.95fr] lg:gap-20 lg:py-24">
              {/* Hero copy */}
              <div className="max-w-2xl">
                <div className="iclaude-reveal inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                    <SparkIcon />
                  </span>

                  Simple tools. Better workflows.
                </div>

                <h1 className="iclaude-reveal iclaude-delay-1 mt-7 text-5xl font-bold leading-[1.02] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-[72px]">
                  Your files,
                  <br />
                  <span className="iclaude-gradient-text">
                    without the friction.
                  </span>
                </h1>

                <p className="iclaude-reveal iclaude-delay-2 mt-7 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
                  Powerful, focused online tools for compressing,
                  resizing, converting and transforming the files
                  you work with every day.
                </p>

                <div className="iclaude-reveal iclaude-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/tools/"
                    className="iclaude-button-primary group inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white"
                  >
                    Explore tools
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      <ArrowIcon />
                    </span>
                  </Link>

                  <Link
                    href="#popular"
                    className="inline-flex min-h-13 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                  >
                    See what you can do
                  </Link>
                </div>

                <div className="iclaude-reveal iclaude-delay-4 mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <CheckIcon />
                    </span>
                    Image tools
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <CheckIcon />
                    </span>
                    PDF tools
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <CheckIcon />
                    </span>
                    Video tools
                  </span>
                </div>
              </div>

              {/* Product visual */}
              <div className="relative mx-auto w-full max-w-[560px] lg:ml-auto">
                <div
                  className="absolute -inset-8 rounded-[40px] bg-gradient-to-br from-blue-500/10 via-violet-500/5 to-cyan-400/10 blur-3xl"
                  aria-hidden="true"
                />

                <div className="iclaude-reveal iclaude-delay-2 relative">
                  {/* floating notification */}
                  <div className="absolute -right-3 top-8 z-20 hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl shadow-slate-900/10 sm:flex sm:items-center sm:gap-3 iclaude-float-card">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <CheckIcon />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-950">
                        File ready
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Your workflow is complete
                      </p>
                    </div>
                  </div>

                  {/* main application preview */}
                  <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_30px_90px_-30px_rgba(15,23,42,0.28)]">
                    <div className="flex h-12 items-center gap-2 border-b border-slate-100 px-5">
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />

                      <div className="ml-4 h-7 flex-1 rounded-lg bg-slate-50" />
                    </div>

                    <div className="p-5 sm:p-7">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Image
                            src="/icon.png"
                            alt="iclaude"
                            width={36}
                            height={36}
                            className="h-9 w-9 rounded-xl object-contain"
                          />

                          <div>
                            <p className="text-sm font-bold text-slate-950">
                              Image Compressor
                            </p>

                            <p className="text-xs text-slate-500">
                              Reduce file size without unnecessary steps
                            </p>
                          </div>
                        </div>

                        <span className="hidden rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-semibold text-blue-600 sm:inline-flex">
                          Online
                        </span>
                      </div>

                      <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-7 text-center sm:p-10">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                          <ImageIcon />
                        </div>

                        <h2 className="mt-5 text-base font-bold text-slate-950">
                          Drop your file here
                        </h2>

                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          Or choose a file from your device
                        </p>

                        <div className="mx-auto mt-5 h-9 w-32 rounded-lg bg-slate-950" />
                      </div>

                      <div className="mt-5 grid grid-cols-3 gap-3">
                        <div className="rounded-xl bg-slate-50 p-3">
                          <div className="h-2 w-12 rounded-full bg-slate-200" />
                          <div className="mt-2 h-2 w-8 rounded-full bg-slate-100" />
                        </div>

                        <div className="rounded-xl bg-slate-50 p-3">
                          <div className="h-2 w-12 rounded-full bg-slate-200" />
                          <div className="mt-2 h-2 w-10 rounded-full bg-slate-100" />
                        </div>

                        <div className="rounded-xl bg-blue-50 p-3">
                          <div className="h-2 w-10 rounded-full bg-blue-200" />
                          <div className="mt-2 h-2 w-7 rounded-full bg-blue-100" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* floating tool badge */}
                  <div className="absolute -bottom-5 -left-4 z-20 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/10 sm:-left-8">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <SparkIcon />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-slate-950">
                          Focused tools
                        </p>

                        <p className="text-[11px] text-slate-500">
                          Less clutter. More done.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            MINI TRUST BAR
        ========================================================== */}

        <section className="border-y border-slate-100 bg-slate-50/60">
          <div className="iclaude-container">
            <div className="grid divide-y divide-slate-200 py-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="flex items-center justify-center gap-3 px-5 py-5 text-sm text-slate-600">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                  <ImageIcon />
                </span>
                <span>
                  <strong className="font-semibold text-slate-950">
                    Image
                  </strong>{" "}
                  workflows
                </span>
              </div>

              <div className="flex items-center justify-center gap-3 px-5 py-5 text-sm text-slate-600">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
                  <FileIcon />
                </span>
                <span>
                  <strong className="font-semibold text-slate-950">
                    PDF
                  </strong>{" "}
                  workflows
                </span>
              </div>

              <div className="flex items-center justify-center gap-3 px-5 py-5 text-sm text-slate-600">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-cyan-600 shadow-sm">
                  <VideoIcon />
                </span>
                <span>
                  <strong className="font-semibold text-slate-950">
                    Video
                  </strong>{" "}
                  workflows
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            POPULAR TOOLS
        ========================================================== */}

        <section
          id="popular"
          className="scroll-mt-20 py-24 sm:py-28"
        >
          <div className="iclaude-container">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                  Popular tools
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  Get straight to the task.
                </h2>

                <p className="mt-4 text-base leading-7 text-slate-600">
                  Pick a focused tool and start working with your
                  file without navigating through a complicated
                  application.
                </p>
              </div>

              <Link
                href="/tools/"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-950"
              >
                Browse all tools
                <span className="transition-transform group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {popularTools.map((tool) => (
                <ToolCard
                  key={tool!.slug}
                  tool={tool!}
                />
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            CATEGORIES
        ========================================================== */}

        <section className="border-y border-slate-200/70 bg-[#fafbfc] py-24 sm:py-28">
          <div className="iclaude-container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                One place for common file tasks
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Tools built around your workflow.
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600">
                Whether you're preparing an image, document or
                video, start with the workflow you actually need.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              <Link
                href="/image-compressor/"
                className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5"
              >
                <div className="absolute right-[-35px] top-[-35px] h-32 w-32 rounded-full bg-blue-500/[0.07] transition duration-500 group-hover:scale-150" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <ImageIcon />
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-slate-950">
                    Images
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Compress, resize and prepare your images for
                    websites, uploads and sharing.
                  </p>

                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                    Explore image tools
                    <ArrowIcon />
                  </span>
                </div>
              </Link>

              <Link
                href="/pdf-to-word/"
                className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-950/5"
              >
                <div className="absolute right-[-35px] top-[-35px] h-32 w-32 rounded-full bg-violet-500/[0.07] transition duration-500 group-hover:scale-150" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                    <FileIcon />
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-slate-950">
                    Documents
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Convert and prepare documents with focused
                    browser-based workflows.
                  </p>

                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-violet-600">
                    Explore PDF tools
                    <ArrowIcon />
                  </span>
                </div>
              </Link>

              <Link
                href="/video-compressor/"
                className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-950/5"
              >
                <div className="absolute right-[-35px] top-[-35px] h-32 w-32 rounded-full bg-cyan-500/[0.07] transition duration-500 group-hover:scale-150" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                    <VideoIcon />
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-slate-950">
                    Video
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Reduce video sizes and prepare your files for
                    easier sharing and storage.
                  </p>

                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-600">
                    Explore video tools
                    <ArrowIcon />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================
            HOW IT WORKS
        ========================================================== */}

        <section className="py-24 sm:py-28">
          <div className="iclaude-container">
            <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
              <div className="max-w-md">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                  How it works
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  Simple from start to finish.
                </h2>

                <p className="mt-5 text-base leading-8 text-slate-600">
                  We keep each workflow focused so you can spend
                  less time figuring out the software and more time
                  getting the file ready.
                </p>

                <Link
                  href="/tools/"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Start a workflow
                  <ArrowIcon />
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {processSteps.map((step) => (
                  <div
                    key={step.number}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                  >
                    <span className="text-xs font-bold tracking-[0.16em] text-slate-400 transition group-hover:text-blue-600">
                      {step.number}
                    </span>

                    <h3 className="mt-5 text-lg font-bold text-slate-950">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            WHY ICLAUDE
        ========================================================== */}

        <section className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-28">
          <div
            className="absolute inset-0 opacity-30"
            aria-hidden="true"
          >
            <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
            <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
          </div>

          <div className="iclaude-container relative">
            <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
                  Why iclaude
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                  Less software to learn.
                  <br />
                  More work to finish.
                </h2>

                <p className="mt-6 max-w-lg text-base leading-8 text-slate-400">
                  Common file tasks should not require complicated
                  interfaces. iclaude is built around clear,
                  focused workflows that make those tasks easier to
                  approach.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {advantages.map((item, index) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
                  >
                    <span className="text-xs font-bold tracking-[0.16em] text-blue-400">
                      0{index + 1}
                    </span>

                    <h3 className="mt-5 text-lg font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-400">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SEO CONTENT
        ========================================================== */}

        <section className="py-24 sm:py-28">
          <div className="iclaude-content">
            <article className="mx-auto max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Built for everyday files
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Free online tools for images, PDFs and videos
              </h2>

              <div className="mt-7 space-y-5 text-base leading-8 text-slate-600">
                <p>
                  Working with digital files often means handling
                  small but important tasks. You may need to reduce
                  an image before uploading it, resize a photo for a
                  specific platform, remove an unwanted background,
                  convert a PDF into an editable document or reduce
                  the size of a video before sharing it.
                </p>

                <p>
                  iclaude brings these common workflows together in
                  a focused collection of online file tools. Each
                  tool is designed around a particular task, making
                  it easier to understand what the tool does and
                  where to start.
                </p>

                <p>
                  Explore the available tools to find a workflow
                  for your next image, PDF or video task.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* =========================================================
            FAQ
        ========================================================== */}

        <section className="border-y border-slate-200/70 bg-slate-50/70 py-24 sm:py-28">
          <div className="iclaude-content">
            <div className="mx-auto max-w-3xl">
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                  FAQ
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  Frequently asked questions
                </h2>
              </div>

              <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group border-b border-slate-100 p-6 last:border-b-0"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-sm font-bold text-slate-950">
                      {faq.question}

                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-normal text-slate-500 transition duration-200 group-open:rotate-45"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            FINAL CTA
        ========================================================== */}

        <section className="bg-white py-24 sm:py-28">
          <div className="iclaude-container">
            <div className="relative overflow-hidden rounded-[32px] bg-slate-950 px-6 py-16 text-center shadow-2xl shadow-slate-950/10 sm:px-12 sm:py-20">
              <div
                className="absolute left-1/2 top-[-260px] h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2 shadow-lg">
                  <Image
                    src="/icon.png"
                    alt="iclaude"
                    width={48}
                    height={48}
                    className="h-full w-full object-contain"
                  />
                </div>

                <h2 className="mx-auto mt-7 max-w-2xl text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
                  Ready to simplify your next file task?
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-400">
                  Explore the collection and choose the tool that
                  fits your workflow.
                </p>

                <Link
                  href="/tools/"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  Explore iclaude tools
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}