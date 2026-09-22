import type { Metadata } from "next";
import Link from "next/link";

import StructuredData from "@/components/seo/StructuredData";
import {
  generateOrganizationSchema,
  generatePageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "About iclaude — Online File Tools",
  description:
    "Learn about iclaude and its goal of making common image, PDF and video file tasks simpler through focused online tools.",
  path: "/about/",
  keywords: [
    "about iclaude",
    "online file tools",
    "image tools",
    "PDF tools",
    "video tools",
  ],
});

const principles = [
  {
    number: "01",
    title: "Focused tools",
    text: "Every tool is made for one clear job, so you can get started without navigating a complicated suite.",
  },
  {
    number: "02",
    title: "Clear workflows",
    text: "Choose, upload, process and download. The next useful step should always be easy to see.",
  },
  {
    number: "03",
    title: "Useful by default",
    text: "Supported formats, practical tips and common use cases are part of the experience—not an afterthought.",
  },
];

const currentTools = [
  {
    name: "Image Compressor",
    description: "Reduce image file size for publishing, sharing and storage.",
    href: "/image-compressor/",
  },
  {
    name: "Image Resizer",
    description: "Fit an image to the dimensions your next destination needs.",
    href: "/image-resizer/",
  },
  {
    name: "Background Remover",
    description: "Create a cleaner subject-focused image from a busy background.",
    href: "/remove-background/",
  },
  {
    name: "PDF to Word",
    description: "Turn a PDF into an editable Word-compatible document.",
    href: "/pdf-to-word/",
  },
  {
    name: "Video Compressor",
    description: "Make video files smaller for sharing, storage and uploads.",
    href: "/video-compressor/",
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

export default function AboutPage() {
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <StructuredData data={organizationSchema} />

      <main className="iclaude-page-shell">
        <section className="iclaude-page-hero relative overflow-hidden">
          <div className="iclaude-page-orb iclaude-float absolute -left-32 top-12 h-80 w-80 rounded-full bg-cyan-300/25 blur-3xl" />
          <div className="iclaude-float-reverse absolute -right-24 top-0 h-96 w-96 rounded-full bg-violet-300/20 blur-3xl" />
          <div className="iclaude-container relative py-20 sm:py-24 lg:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <p className="iclaude-eyebrow">About iclaude</p>
              <h1 className="mt-5 text-4xl font-bold tracking-[-0.055em] text-slate-950 sm:text-6xl">
                The easy part of working with files.
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
                iclaude is building a simpler home for the file tasks that show
                up everywhere—images, documents and videos included.
              </p>

              <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-3 text-left">
                {[
                  ["5", "Useful tools today"],
                  ["3", "File categories"],
                  ["1", "Clear next step"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/80 bg-white/80 px-4 py-4 shadow-sm backdrop-blur"
                  >
                    <p className="text-2xl font-bold tracking-tight text-slate-950">
                      {value}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="iclaude-container">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="iclaude-eyebrow">Our approach</p>
                <h2 className="mt-4 text-3xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">
                  Common tasks should not require complex software.
                </h2>
              </div>
              <div className="space-y-5 text-base leading-8 text-slate-600">
                <p>
                  Digital work is full of small jobs: reducing an image before
                  an upload, resizing a photo to meet a requirement, turning a
                  document into an editable file or making a video easier to
                  share.
                </p>
                <p>
                  iclaude is designed around those moments. Instead of asking
                  you to learn a broad application for a single operation, we
                  keep each workflow focused on one practical result.
                </p>
                <p>
                  The platform starts with image, PDF and video tools and will
                  keep growing around the workflows people use most often.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-20 sm:py-28">
          <div className="iclaude-container">
            <div className="mx-auto max-w-2xl text-center">
              <p className="iclaude-eyebrow">What guides us</p>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">
                A better experience starts with fewer distractions.
              </h2>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {principles.map((principle) => (
                <article
                  key={principle.number}
                  className="group rounded-[24px] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5"
                >
                  <p className="text-xs font-bold tracking-[0.18em] text-blue-600">
                    {principle.number}
                  </p>
                  <h3 className="mt-10 text-xl font-bold text-slate-950">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {principle.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="iclaude-container">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="iclaude-eyebrow">Available now</p>
                <h2 className="mt-4 text-3xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">
                  A practical collection for everyday files.
                </h2>
                <p className="mt-5 text-base leading-7 text-slate-600">
                  Start with the workflow that fits the task in front of you.
                </p>
              </div>
              <Link
                href="/tools/"
                className="group inline-flex items-center gap-2 text-sm font-bold text-slate-950 transition hover:text-blue-600"
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
                  className={`group flex items-center gap-5 rounded-2xl border border-slate-200 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-950/5 ${index === 4 ? "md:col-span-2" : "bg-white"}`}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600">
                    0{index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-bold text-slate-950">
                      {tool.name}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-slate-600">
                      {tool.description}
                    </span>
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition group-hover:translate-x-1 group-hover:bg-blue-600 group-hover:text-white">
                    <ArrowIcon />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-20 text-white sm:py-28">
          <div className="iclaude-container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                What&apos;s next
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.045em] sm:text-5xl">
                More useful workflows, without the bloat.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300">
                PDF editing, merging documents and additional video workflows
                are planned as iclaude continues to grow.
              </p>
              <Link
                href="/tools/"
                className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                Explore the current tools
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
