import type { Metadata } from "next";
import Link from "next/link";

import StructuredData from "@/components/seo/StructuredData";
import {
  generateOrganizationSchema,
  generatePageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "About iclaude — Simple Online Tools for Everyday Files",
  description:
    "Learn about iclaude, a growing collection of focused online tools for images, PDFs, videos and everyday digital file tasks.",
  path: "/about/",
  keywords: [
    "about iclaude",
    "iclaude online tools",
    "free file tools",
    "image tools",
    "PDF tools",
    "video tools",
    "online file utilities",
  ],
});

const principles = [
  {
    number: "01",
    icon: "✦",
    title: "Focused by design",
    text: "Each tool is built around a specific file task instead of surrounding you with unnecessary features.",
  },
  {
    number: "02",
    icon: "↗",
    title: "Clear workflows",
    text: "The experience guides you from choosing a tool to adding a file and completing the task with minimal friction.",
  },
  {
    number: "03",
    icon: "✓",
    title: "Useful first",
    text: "Supported formats, practical controls and helpful guidance are part of the product experience.",
  },
];

const currentTools = [
  {
    number: "01",
    name: "Image Compressor",
    description: "Reduce image file sizes while preparing files for sharing, publishing and storage.",
    href: "/image-compressor/",
    icon: "▧",
    category: "IMAGES",
  },
  {
    number: "02",
    name: "Image Resizer",
    description: "Resize images to the dimensions required by your next destination.",
    href: "/image-resizer/",
    icon: "↔",
    category: "IMAGES",
  },
  {
    number: "03",
    name: "Background Remover",
    description: "Prepare cleaner, subject-focused images by removing distracting backgrounds.",
    href: "/remove-background/",
    icon: "◌",
    category: "IMAGES",
  },
  {
    number: "04",
    name: "PDF to Word",
    description: "Convert supported PDF documents into editable Word-compatible files.",
    href: "/pdf-to-word/",
    icon: "▤",
    category: "PDF",
  },
  {
    number: "05",
    name: "Video Compressor",
    description: "Reduce video file sizes for easier uploads, sharing and storage.",
    href: "/video-compressor/",
    icon: "▶",
    category: "VIDEO",
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
      <path d="m4 10 4 4 8-8" />
    </svg>
  );
}

export default function AboutPage() {
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <StructuredData data={organizationSchema} />

      <main className="overflow-hidden bg-white">
        {/* =========================================================
            HERO
        ========================================================== */}
        <section className="relative isolate overflow-hidden bg-slate-950">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.22),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(6,182,212,0.16),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.18),transparent_38%)]"
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
            className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
          />

          <div className="iclaude-container relative py-20 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-5xl text-center">
              <div className="iclaude-reveal inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm font-semibold text-slate-200 shadow-2xl backdrop-blur-xl">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-xs font-black text-slate-950">
                  i
                </span>

                About iclaude
              </div>

              <h1 className="iclaude-reveal iclaude-delay-1 mt-8 text-4xl font-black tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
                Making everyday file work
                <span className="mt-2 block bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                  feel effortless.
                </span>
              </h1>

              <p className="iclaude-reveal iclaude-delay-2 mx-auto mt-7 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                iclaude is building a focused home for the small file tasks
                that appear everywhere — from compressing images to preparing
                documents and videos.
              </p>

              <div className="iclaude-reveal iclaude-delay-3 mt-10 flex flex-wrap justify-center gap-3">
                <Link
                  href="/tools/"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xl transition hover:-translate-y-1 hover:bg-slate-100"
                >
                  Explore tools
                  <ArrowIcon />
                </Link>

                <Link
                  href="/contact/"
                  className="inline-flex items-center rounded-xl border border-white/15 bg-white/[0.06] px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/10"
                >
                  Get in touch
                </Link>
              </div>

              <div className="iclaude-reveal iclaude-delay-4 mx-auto mt-14 grid max-w-2xl grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl">
                <div className="px-3 py-5">
                  <p className="text-2xl font-black text-white">5</p>
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
                  <p className="text-2xl font-black text-white">1</p>
                  <p className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
                    Simple goal
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </section>

        {/* =========================================================
            MISSION
        ========================================================== */}
        <section className="bg-white">
          <div className="iclaude-container py-20 sm:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
                  Our approach
                </div>

                <h2 className="mt-5 text-3xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl">
                  Software should help you finish the task — not become the
                  task.
                </h2>
              </div>

              <div className="space-y-5 text-base leading-8 text-slate-600">
                <p>
                  Digital work is full of small operations: reducing an image
                  before uploading it, resizing a photo, preparing a document
                  or making a video easier to share.
                </p>

                <p>
                  Those tasks often do not require a complicated application.
                  They require a clear workflow that gets out of the way.
                </p>

                <p>
                  That is the idea behind iclaude. We are building focused
                  online utilities around practical file workflows, starting
                  with images, PDFs and videos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            PRINCIPLES
        ========================================================== */}
        <section className="border-y border-slate-200 bg-slate-50/70">
          <div className="iclaude-container py-20 sm:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                What guides us
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl">
                Less friction. More progress.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
                Every part of the experience starts with the same question:
                what helps the user complete the task faster?
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {principles.map((principle) => (
                <article
                  key={principle.number}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/5"
                >
                  <div
                    aria-hidden="true"
                    className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-50 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100"
                  />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-sm text-white shadow-lg">
                        {principle.icon}
                      </span>

                      <span className="text-xs font-black tracking-[0.18em] text-slate-300">
                        {principle.number}
                      </span>
                    </div>

                    <h3 className="mt-9 text-xl font-black text-slate-950">
                      {principle.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {principle.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            CURRENT TOOLS
        ========================================================== */}
        <section className="bg-white">
          <div className="iclaude-container py-20 sm:py-28">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
                  Available now
                </div>

                <h2 className="mt-5 text-3xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl">
                  A growing toolkit for everyday files.
                </h2>

                <p className="mt-5 text-base leading-7 text-slate-600">
                  Start with the workflow that matches the task in front of
                  you.
                </p>
              </div>

              <Link
                href="/tools/"
                className="group inline-flex w-fit items-center gap-2 text-sm font-bold text-slate-950 transition hover:text-blue-600"
              >
                View all tools
                <span className="transition-transform group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {currentTools.map((tool, index) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`group relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5 ${
                    index === currentTools.length - 1
                      ? "md:col-span-2"
                      : ""
                  }`}
                >
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-50 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

                  <div className="relative flex items-center gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-lg text-white shadow-lg transition duration-300 group-hover:scale-105">
                      {tool.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-black tracking-[0.16em] text-blue-600">
                          {tool.category}
                        </span>

                        <span className="text-[10px] font-bold text-slate-300">
                          {tool.number}
                        </span>
                      </div>

                      <h3 className="text-lg font-black text-slate-950">
                        {tool.name}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {tool.description}
                      </p>
                    </div>

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition duration-300 group-hover:translate-x-1 group-hover:bg-blue-600 group-hover:text-white">
                      <ArrowIcon />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            EXPERIENCE
        ========================================================== */}
        <section className="border-y border-slate-200 bg-slate-50/70">
          <div className="iclaude-container py-20 sm:py-28">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                  The experience
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl">
                  Everything should feel obvious.
                </h2>

                <p className="mt-5 max-w-xl leading-7 text-slate-600">
                  From the first click to the final result, iclaude is being
                  designed around clarity, speed and useful feedback.
                </p>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
                <div className="space-y-5">
                  {[
                    "Choose the right tool",
                    "Understand supported formats",
                    "Upload your file",
                    "Configure the task",
                    "Review the result",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm ring-1 ring-slate-200">
                        <CheckIcon />
                      </span>

                      <span className="flex-1 text-sm font-bold text-slate-800">
                        {item}
                      </span>

                      <span className="text-xs font-black text-slate-300">
                        0{index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            ROADMAP
        ========================================================== */}
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.22),transparent_45%)]"
          />

          <div className="iclaude-container relative py-20 sm:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">
                What&apos;s next
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] sm:text-5xl">
                The toolkit keeps growing.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-300">
                iclaude is starting with focused image, PDF and video
                workflows. More useful file operations are planned as the
                platform evolves.
              </p>

              <div className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
                {[
                  "PDF workflows",
                  "Document utilities",
                  "More video tools",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 text-sm font-semibold text-slate-200 backdrop-blur"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <Link
                href="/tools/"
                className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-slate-100"
              >
                Explore current tools
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================
            FINAL CTA
        ========================================================== */}
        <section className="bg-white">
          <div className="iclaude-container py-16 sm:py-20">
            <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8 text-center shadow-sm sm:p-12">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                Ready to get started?
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Pick a tool and get the job done.
              </h2>

              <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
                Explore the current iclaude toolkit and find the workflow you
                need.
              </p>

              <Link
                href="/tools/"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-slate-800"
              >
                Explore iclaude tools
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}