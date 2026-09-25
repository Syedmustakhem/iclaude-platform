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
import {
  getRequiredToolBySlug,
  getAvailableTools,
} from "@/lib/tools";
import {
  getToolBySlug,
} from "@/lib/tools";
export const metadata: Metadata = generatePageMetadata({
  title: "Free Online File Tools for Images, PDF & Video",
  description:
    "Compress, resize, convert and transform your files with fast, focused online tools for images, PDFs and videos.",
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
  "jpg-to-png",
  "png-to-jpg",
  "heic-to-jpg",
  "remove-background",
  "pdf-to-word",
  "video-compressor",
];

const workflowGroups = [
  {
    title: "Image tools",
    description: "Prepare photos and visuals for wherever they need to go.",
    href: "/image-compressor/",
    accent: "blue",
    tools: ["Compress images", "Resize images", "Remove backgrounds"],
  },
  {
    title: "PDF tools",
    description: "Turn fixed documents into files you can work with.",
    href: "/pdf-to-word/",
    accent: "violet",
    tools: ["PDF to Word", "Editable documents", "Clear conversions"],
  },
  {
    title: "Video tools",
    description: "Make videos easier to send, store and publish.",
    href: "/video-compressor/",
    accent: "cyan",
    tools: ["Compress video", "Reduce file size", "Share with ease"],
  },
];

const nextWorkflows = [
  { title: "PDF Editor", detail: "Edit PDF pages and text" },
  { title: "Merge PDFs", detail: "Combine documents in order" },
  { title: "Video Downloader", detail: "Save videos for your workflow" },
];

const fileMoments = [
  {
    title: "Get a website upload-ready",
    text: "Shrink image files before publishing so pages stay lighter and easier to load.",
    label: "Compress images",
    href: "/image-compressor/",
    icon: "image",
  },
  {
    title: "Fit a photo anywhere",
    text: "Resize visuals for profiles, marketplaces, forms and social posts without a complicated editor.",
    label: "Resize an image",
    href: "/image-resizer/",
    icon: "resize",
  },
  {
    title: "Make a document editable",
    text: "Move from a fixed PDF to a Word-compatible document when the next step is editing.",
    label: "Convert PDF to Word",
    href: "/pdf-to-word/",
    icon: "document",
  },
  {
    title: "Send a smaller video",
    text: "Reduce video file size before sharing, storing or publishing your next clip.",
    label: "Compress video",
    href: "/video-compressor/",
    icon: "video",
  },
];

const platformPrinciples = [
  {
    title: "One focused job at a time",
    text: "You should not need to learn a complex suite to complete a simple file task.",
  },
  {
    title: "Clear before clever",
    text: "Useful information, supported formats and next steps are always easy to find.",
  },
  {
    title: "Built for everyday momentum",
    text: "Each workflow is designed to help you finish the file task and continue with your work.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Choose your tool",
    text: "Start with the exact job you need to finish.",
  },
  {
    number: "02",
    title: "Add your file",
    text: "Use a clear, focused upload workspace.",
  },
  {
    number: "03",
    title: "Finish and download",
    text: "Process your file and carry on with your day.",
  },
];

const faqs = [
  {
    question: "What can I do with iclaude?",
    answer:
      "You can currently compress images and videos, resize images, remove image backgrounds and convert PDFs to editable Word-compatible documents.",
  },
  {
    question: "Do I need to install software?",
    answer:
      "No. iclaude tools are designed to be used directly in a modern browser, without a desktop application.",
  },
  {
    question: "Which file formats are supported?",
    answer:
      "Supported file types depend on the tool. Each tool page lists the formats and the workflow it supports before you start.",
  },

  {
    question: "Can I find all the tools in one place?",
    answer:
      "Yes. The toolbox brings the currently available iclaude workflows together so you can choose a task without searching through unrelated software.",
  },
  {
    question: "Are more tools planned?",
    answer:
      "Yes. iclaude is designed to grow into a broader collection of focused file workflows. Planned ideas are shown separately from tools that are currently available.",
  },
  {
    question: "Where can I get help?",
    answer:
      "Use the Contact page to reach the iclaude support workflow, report a problem or share an idea.",
  },
];

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
      strokeWidth="2.1"
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

function GridIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </svg>
  );
}

export default function HomePage() {
  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = generateOrganizationSchema();
const popularTools = popularToolSlugs
  .map((slug) => getToolBySlug(slug))
  .filter((tool) => tool !== undefined)
  .filter(
    (tool) =>
      tool.status === "available" &&
      tool.indexable,
  );
  return (
    <>
      <StructuredData data={websiteSchema} />
      <StructuredData data={organizationSchema} />

      <main className="overflow-hidden">
        <section className="relative isolate overflow-hidden bg-[#f8fbff]">
          <div className="pointer-events-none absolute inset-0 -z-20" aria-hidden="true">
            <div className="iclaude-hero-orb absolute -left-48 top-16 h-[30rem] w-[30rem] rounded-full bg-cyan-300/25 blur-3xl" />
            <div className="iclaude-float-slow absolute left-1/2 top-[-24rem] h-[52rem] w-[70rem] -translate-x-1/2 rounded-full bg-blue-300/20 blur-3xl" />
            <div className="iclaude-float-reverse absolute -right-48 top-20 h-[34rem] w-[34rem] rounded-full bg-violet-300/20 blur-3xl" />
          </div>

          <div className="pointer-events-none absolute inset-0 -z-10 iclaude-dot-grid opacity-45" aria-hidden="true" />

          <div className="iclaude-container">
            <div className="grid min-h-[650px] items-center gap-14 py-14 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-24">
              <div className="max-w-2xl">
                <div className="iclaude-reveal inline-flex items-center gap-2 rounded-full border border-blue-100/90 bg-white/80 px-3.5 py-2 text-xs font-bold text-slate-600 shadow-[0_8px_30px_rgba(37,99,235,0.07)] backdrop-blur-xl">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
                    <SparkIcon />
                  </span>
                  Simple tools for everyday file work
                </div>

                <h1 className="iclaude-reveal iclaude-delay-1 mt-7 max-w-3xl text-[clamp(3.2rem,7vw,5.5rem)] font-black leading-[0.93] tracking-[-0.065em] text-slate-950">
                  Get every file
                  <span className="block iclaude-gradient-text">ready for what&apos;s next.</span>
                </h1>

                <p className="iclaude-reveal iclaude-delay-2 mt-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                  Compress, resize, convert and transform files with focused online tools designed to help you finish the job without the clutter of a full software suite.
                </p>

                <div className="iclaude-reveal iclaude-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/tools/"
                    className="iclaude-button-primary group inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white"
                  >
                    Explore all tools
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      <ArrowIcon />
                    </span>
                  </Link>

                  <Link
                    href="#tools"
                    className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
                  >
                    Browse popular tools
                  </Link>
                </div>

                <div className="iclaude-reveal iclaude-delay-4 mt-8 grid max-w-xl grid-cols-1 gap-3 text-sm sm:grid-cols-3 sm:gap-4">
                  {[
                    ["01", "Pick a task", "Start with what you need to do."],
                    ["02", "Add a file", "Use a focused upload workspace."],
                    ["03", "Get it done", "Download and keep moving."],
                  ].map(([number, title, text]) => (
                    <div key={number} className="rounded-2xl border border-slate-200/80 bg-white/70 p-3.5 backdrop-blur-sm">
                      <span className="text-[10px] font-black tracking-[0.18em] text-blue-600">{number}</span>
                      <p className="mt-2 text-xs font-extrabold text-slate-900">{title}</p>
                      <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-[510px] lg:ml-auto">
                <div className="absolute -inset-8 rounded-[44px] bg-gradient-to-br from-blue-500/20 via-violet-500/8 to-cyan-400/20 blur-3xl" aria-hidden="true" />

                <div className="iclaude-reveal iclaude-delay-2 relative rounded-[30px] border border-white/90 bg-white/75 p-2.5 shadow-[0_35px_110px_-35px_rgba(15,23,42,0.3)] backdrop-blur-2xl sm:p-3.5">
                  <div className="overflow-hidden rounded-[23px] border border-slate-200 bg-slate-50">
                    <div className="flex h-11 items-center border-b border-slate-200 bg-white/95 px-4">
                      <div className="flex items-center gap-1.5" aria-hidden="true">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-200" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-200" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-200" />
                      </div>
                      <div className="ml-5 flex h-6 flex-1 items-center rounded-md bg-slate-50 px-3">
                        <span className="text-[9px] font-semibold text-slate-400">iclaude.in/tools</span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-blue-300 shadow-lg shadow-slate-950/10">
                            <GridIcon />
                          </span>
                          <div>
                            <p className="text-sm font-extrabold text-slate-950">Your file workspace</p>
                            <p className="mt-0.5 text-xs text-slate-500">Choose one focused action.</p>
                          </div>
                        </div>
                        <span className="hidden rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-700 sm:inline-flex">
                          Ready
                        </span>
                      </div>

                      <div className="mt-6 rounded-[22px] border border-slate-200 bg-white p-3 shadow-sm">
                        <div className="flex items-center justify-between px-1">
                          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">Popular workflows</p>
                          <span className="text-[10px] font-bold text-blue-600">5 tools</span>
                        </div>

                        <div className="mt-3 grid gap-2">
                          {[
                            ["Image Compressor", "Reduce image file size", ImageIcon, "bg-blue-50 text-blue-600"],
                            ["Image Resizer", "Resize images quickly", GridIcon, "bg-violet-50 text-violet-600"],
                            ["PDF to Word", "Make documents editable", FileIcon, "bg-amber-50 text-amber-600"],
                            ["Video Compressor", "Reduce video file size", VideoIcon, "bg-cyan-50 text-cyan-600"],
                          ].map(([title, detail, Icon, tone]) => {
                            const WorkflowIcon = Icon as typeof ImageIcon;
                            return (
                              <div key={String(title)} className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3 transition duration-300 hover:border-blue-100 hover:bg-white hover:shadow-sm">
                                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${String(tone)}`}>
                                  <WorkflowIcon />
                                </span>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-xs font-extrabold text-slate-900">{String(title)}</p>
                                  <p className="mt-0.5 truncate text-[10px] text-slate-500">{String(detail)}</p>
                                </div>
                                <ArrowIcon className="h-3.5 w-3.5 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500" />
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {[
                          ["Images", "3 tools"],
                          ["PDF", "1 tool"],
                          ["Video", "1 tool"],
                        ].map(([label, detail]) => (
                          <div key={label} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                            <p className="text-[10px] font-extrabold text-slate-900">{label}</p>
                            <p className="mt-0.5 text-[9px] text-slate-500">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="iclaude-float-card absolute -bottom-5 -left-3 hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl shadow-slate-900/10 sm:flex sm:items-center sm:gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <CheckIcon />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-950">Less clutter</p>
                    <p className="mt-0.5 text-[11px] text-slate-500">One task. One clear workflow.</p>
                  </div>
                </div>

                <div className="absolute -right-3 -top-4 hidden rounded-2xl border border-blue-100 bg-white/95 px-3.5 py-3 shadow-xl shadow-blue-950/10 backdrop-blur sm:block">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <SparkIcon />
                    </span>
                    <div>
                      <p className="text-[10px] font-extrabold text-slate-900">Browser ready</p>
                      <p className="text-[9px] text-slate-500">No installation needed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200/80 bg-white">
          <div className="iclaude-container overflow-hidden">
            <div className="iclaude-marquee flex min-w-max items-center gap-4 py-4">
              {[
                "Compress images",
                "Resize photos",
                "Remove backgrounds",
                "Convert PDF to Word",
                "Compress video",
                "Prepare files faster",
                "Compress images",
                "Resize photos",
                "Remove backgrounds",
                "Convert PDF to Word",
                "Compress video",
                "Prepare files faster",
              ].map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-600"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>


        <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
          <div className="iclaude-container">
            <div className="grid overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50/80 sm:grid-cols-4">
              {[
                ["05", "Live tools", "Ready to explore today"],
                ["04", "File moments", "Built around real tasks"],
                ["03", "Core formats", "Images, PDF & video"],
              ].map(([value, label, detail], index) => (
                <div
                  key={label}
                  className={`group p-5 transition duration-300 hover:bg-white sm:p-6 ${
                    index !== 0 ? "border-t border-slate-200 sm:border-l sm:border-t-0" : ""
                  }`}
                >
                  <span className="text-2xl font-black tracking-[-0.05em] text-slate-950">
                    {value}
                  </span>
                  <p className="mt-2 text-sm font-bold text-slate-900">{label}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p>
                </div>
              ))}
              <div className="border-t border-slate-200 p-5 sm:border-l sm:border-t-0 sm:p-6">
                <span className="text-2xl font-black tracking-[-0.05em] text-blue-600">24/7</span>
                <p className="mt-2 text-sm font-bold text-slate-900">Browser access</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">No desktop app required</p>
              </div>
            </div>
          </div>
        </section>

        <section id="tools" className="scroll-mt-20 py-24 sm:py-28">
          <div className="iclaude-container">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                  The toolbox
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">
                  Start with the task, not the software.
                </h2>
                <p className="mt-5 text-base leading-7 text-slate-600">
                  Every tool is designed around one useful job, so there is less
                  to learn and more room to move.
                </p>
              </div>
              <Link
                href="/tools/"
                className="group inline-flex items-center gap-2 text-sm font-bold text-slate-950 transition hover:text-blue-600"
              >
                View every tool
                <span className="transition-transform group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {popularTools.map((tool) => (
                <ToolCard key={tool!.slug} tool={tool!} />
              ))}
            </div>
          </div>
        </section>


        <section className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-32">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="iclaude-float-slow absolute left-[-10rem] top-[-14rem] h-[30rem] w-[30rem] rounded-full bg-blue-600/20 blur-3xl" />
            <div className="iclaude-float-reverse absolute bottom-[-15rem] right-[-8rem] h-[34rem] w-[34rem] rounded-full bg-cyan-500/15 blur-3xl" />
            <div className="iclaude-dot-grid absolute inset-0 opacity-10" />
          </div>

          <div className="iclaude-container relative">
            <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
              <div className="max-w-xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                  Your file command center
                </p>
                <h2 className="mt-4 text-4xl font-bold tracking-[-0.055em] sm:text-6xl">
                  One place to prepare files for what comes next.
                </h2>
                <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
                  Keep simple jobs simple. Pick the action, follow the focused
                  workflow and move straight to the next step.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Compress", "Make large files easier to store, send and publish.", ImageIcon],
                  ["Resize", "Get visuals into the dimensions your next destination needs.", GridIcon],
                  ["Convert", "Move a fixed document toward an editable workflow.", FileIcon],
                  ["Transform", "Prepare media and assets for the way you plan to use them.", VideoIcon],
                ].map(([title, detail, Icon], index) => {
                  const ToolIcon = Icon as typeof ImageIcon;
                  return (
                    <div
                      key={String(title)}
                      className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.09]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-cyan-200">
                          <ToolIcon />
                        </span>
                        <span className="text-[10px] font-black tracking-[0.18em] text-white/35">
                          0{index + 1}
                        </span>
                      </div>
                      <h3 className="mt-7 text-xl font-bold">{String(title)}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{String(detail)}</p>
                      <div className="mt-6 h-1 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 transition-all duration-700 group-hover:w-full" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200/80 bg-[#f8fbff] py-24 sm:py-28">
          <div className="iclaude-container">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div className="max-w-md">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                  Built around real file moments
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">
                  The small jobs that keep work moving.
                </h2>
                <p className="mt-6 text-base leading-8 text-slate-600">
                  From a product photo that needs a clean background to a PDF
                  that needs one last edit, iclaude helps you get files ready
                  for their next destination.
                </p>
                <Link
                  href="/tools/"
                  className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-slate-950 transition hover:text-blue-600"
                >
                  Find the right workflow
                  <span className="transition-transform group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {fileMoments.map((moment, index) => {
                  const Icon =
                    moment.icon === "image"
                      ? ImageIcon
                      : moment.icon === "document"
                        ? FileIcon
                        : moment.icon === "video"
                          ? VideoIcon
                          : GridIcon;
                  const tone =
                    index === 0
                      ? "bg-blue-600 text-white"
                      : index === 1
                        ? "bg-violet-50 text-violet-600"
                        : index === 2
                          ? "bg-amber-50 text-amber-600"
                          : "bg-cyan-50 text-cyan-600";

                  return (
                    <Link
                      key={moment.title}
                      href={moment.href}
                      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5"
                    >
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}
                      >
                        <Icon />
                      </span>
                      <h3 className="mt-6 text-lg font-bold text-slate-950">
                        {moment.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {moment.text}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                        {moment.label}
                        <span className="transition-transform group-hover:translate-x-1">
                          <ArrowIcon />
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50/80 py-24 sm:py-28">
          <div className="iclaude-container">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Made for your whole workflow
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">
                One calm place for files of every kind.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600">
                Choose the kind of file you are working with, then pick the
                exact action that gets it ready.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {workflowGroups.map((group, index) => {
                const Icon =
                  index === 0 ? ImageIcon : index === 1 ? FileIcon : VideoIcon;
                const accentClasses =
                  group.accent === "blue"
                    ? "bg-blue-50 text-blue-600 border-blue-100"
                    : group.accent === "violet"
                      ? "bg-violet-50 text-violet-600 border-violet-100"
                      : "bg-cyan-50 text-cyan-600 border-cyan-100";
                const dotClass =
                  group.accent === "blue"
                    ? "bg-blue-500"
                    : group.accent === "violet"
                      ? "bg-violet-500"
                      : "bg-cyan-500";
                const glowClass =
                  group.accent === "blue"
                    ? "bg-blue-200"
                    : group.accent === "violet"
                      ? "bg-violet-200"
                      : "bg-cyan-200";

                return (
                  <Link
                    key={group.title}
                    href={group.href}
                    className="group relative overflow-hidden rounded-[26px] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5"
                  >
                    <div
                      className={`absolute right-[-45px] top-[-45px] h-36 w-36 rounded-full opacity-50 blur-2xl transition duration-500 group-hover:scale-150 ${glowClass}`}
                    />
                    <div className="relative">
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${accentClasses}`}
                      >
                        <Icon />
                      </span>
                      <h3 className="mt-7 text-xl font-bold tracking-tight text-slate-950">
                        {group.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {group.description}
                      </p>
                      <ul className="mt-6 space-y-3">
                        {group.tools.map((tool) => (
                          <li
                            key={tool}
                            className="flex items-center gap-2 text-xs font-semibold text-slate-600"
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
                            {tool}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-slate-950 transition group-hover:text-blue-600">
                        Explore {group.title.toLowerCase()}
                        <ArrowIcon />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>


        <section className="relative overflow-hidden border-y border-slate-200 bg-[#f8fbff] py-24 sm:py-32">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="iclaude-hero-orb absolute right-[-10rem] top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-blue-300/20 blur-3xl" />
            <div className="iclaude-float-slow absolute bottom-[-12rem] left-[-8rem] h-[25rem] w-[25rem] rounded-full bg-violet-300/15 blur-3xl" />
          </div>

          <div className="iclaude-container relative">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Think about the destination
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.05em] text-slate-950 sm:text-5xl">
                What does your file need to become?
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                Start from the outcome you want, then jump directly into the workflow that matches it.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {[
                ["01", "Lighter", "Reduce image or video size before sending, uploading or publishing.", "/image-compressor/", "Compress a file"],
                ["02", "Right-sized", "Adjust an image to fit a profile, marketplace, website or form.", "/image-resizer/", "Resize an image"],
                ["03", "Editable", "Turn a fixed PDF into a Word-compatible workflow when editing comes next.", "/pdf-to-word/", "Convert a PDF"],
              ].map(([number, title, description, href, label]) => (
                <Link
                  key={number}
                  href={href}
                  className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400" />
                  <span className="text-xs font-black tracking-[0.2em] text-blue-600">{number}</span>
                  <h3 className="mt-12 text-2xl font-bold tracking-tight text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                    {label}
                    <ArrowIcon />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-24 py-24 sm:py-28">
          <div className="iclaude-container">
            <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                  How it works
                </p>
                <h2 className="mt-4 max-w-md text-3xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">
                  A short path from upload to done.
                </h2>
                <p className="mt-6 max-w-md text-base leading-8 text-slate-600">
                  No maze of settings. Just choose the right workflow and take
                  the next clear step.
                </p>
                <Link
                  href="/tools/"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  Choose a tool
                  <ArrowIcon />
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {processSteps.map((step) => (
                  <div
                    key={step.number}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5"
                  >
                    <span className="text-xs font-bold tracking-[0.18em] text-blue-600">
                      {step.number}
                    </span>
                    <div className="mt-10 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
                      {step.number === "01" ? (
                        <GridIcon />
                      ) : step.number === "02" ? (
                        <FileIcon />
                      ) : (
                        <CheckIcon />
                      )}
                    </div>
                    <h3 className="mt-6 text-lg font-bold text-slate-950">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white py-24 sm:py-28">
          <div className="iclaude-container">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Designed to feel simpler
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">
                Less time figuring out the tool. More time finishing the task.
              </h2>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {platformPrinciples.map((principle, index) => (
                <article
                  key={principle.title}
                  className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50 p-7"
                >
                  <span className="text-xs font-bold tracking-[0.18em] text-blue-600">
                    0{index + 1}
                  </span>
                  <h3 className="mt-8 text-xl font-bold tracking-tight text-slate-950">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {principle.text}
                  </p>
                  <div
                    className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-blue-200/40 blur-2xl"
                    aria-hidden="true"
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-28">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="iclaude-float absolute left-[10%] top-[-12rem] h-[32rem] w-[32rem] rounded-full bg-blue-600/20 blur-3xl" />
            <div className="iclaude-float-reverse absolute bottom-[-14rem] right-[8%] h-[34rem] w-[34rem] rounded-full bg-violet-500/20 blur-3xl" />
          </div>
          <div className="iclaude-container relative">
            <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                  Growing with your work
                </p>
                <h2 className="mt-4 max-w-lg text-3xl font-bold tracking-[-0.045em] sm:text-5xl">
                  More useful workflows are on the way.
                </h2>
                <p className="mt-6 max-w-lg text-base leading-8 text-slate-300">
                  iclaude is expanding into the file tasks you reach for most.
                  The tools below are planned next, while today&apos;s available
                  workflows stay front and center.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {nextWorkflows.map((workflow, index) => (
                  <div
                    key={workflow.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.1]"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-cyan-200">
                      {index === 2 ? <VideoIcon /> : <FileIcon />}
                    </span>
                    <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.15em] text-cyan-300">
                      Coming soon
                    </p>
                    <h3 className="mt-2 text-base font-bold text-white">
                      {workflow.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {workflow.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white py-24 sm:py-28">
          <div className="iclaude-content">
            <div className="mx-auto max-w-3xl">
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                  Questions, answered
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">
                  Everything you need to get started.
                </h2>
              </div>
              <div className="mt-12 space-y-3">
                {faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-2xl border border-slate-200 bg-white px-5 py-1 shadow-sm transition hover:border-slate-300 sm:px-6"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-sm font-bold text-slate-950">
                      {faq.question}
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-normal text-slate-500 transition duration-200 group-open:rotate-45"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <p className="max-w-2xl border-t border-slate-100 py-5 text-sm leading-7 text-slate-600">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-24 sm:py-28">
          <div className="iclaude-container">
            <div className="relative isolate overflow-hidden rounded-[32px] bg-slate-950 px-6 py-16 text-center shadow-2xl shadow-slate-950/15 sm:px-12 sm:py-20">
              <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
                <div className="iclaude-float-slow absolute left-1/2 top-[-17rem] h-[34rem] w-[52rem] -translate-x-1/2 rounded-full bg-blue-500/25 blur-3xl" />
                <div className="absolute bottom-[-12rem] right-[-8rem] h-[25rem] w-[25rem] rounded-full bg-violet-500/20 blur-3xl" />
              </div>
              <div className="relative">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2 shadow-lg">
                  <Image
                    src="/icon.png"
                    alt="iclaude"
                    width={48}
                    height={48}
                    className="h-full w-full object-contain"
                  />
                </span>
                <h2 className="mx-auto mt-7 max-w-2xl text-3xl font-bold tracking-[-0.045em] text-white sm:text-5xl">
                  Your next file task can be the easy part.
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-300">
                  Choose a focused tool, finish the task and get back to the
                  work that matters.
                </p>
                <Link
                  href="/tools/"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-50"
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
