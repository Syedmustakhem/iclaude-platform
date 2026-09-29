import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

import ToolCard from "@/components/tools/ToolCard";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";

import {
  generatePageMetadata,
} from "@/lib/seo";
import { tools } from "@/lib/tools";

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
  "PDF merger",
  "merge PDF online",
  "merge PDF files",
  "video compressor",
  "trim video online",
  "compress video online",
  "convert video online",
  "YouTube thumbnail downloader",
  "download YouTube thumbnail",
  "compress image online",
  "resize image online",
  "convert PDF online",
  "ai image generator free",
  "text to image ai",
  "free ai image generator",
],
});

const popularToolSlugs = [
  "image-compressor",
  "image-resizer",
  "remove-background",
  "pdf-to-word",
  "merge-pdf",
  "jpg-to-pdf",
  "youtube-thumbnail-downloader",
  "video-studio",
  "ai-image-generator",
];

const marqueeItems = [
  "Compress images",
  "Resize photos",
  "Remove backgrounds",
  "Merge PDF files",
  "Convert PDF to Word",
  "JPG to PDF",
  "Download YouTube thumbnails",
  "Generate AI images",
  "Trim videos",
  "Compress videos",
  "Prepare files faster",
];

const stats = [
  { value: 15, label: "Live tools", detail: "Ready to explore today" },
  { value: 6, label: "Task guides", detail: "Built around real tasks" },
  { value: 3, label: "Core formats", detail: "Images, PDF & more" },
  { value: "24/7", label: "Browser access", detail: "No desktop app required", accent: true },
];

const workflowGroups = [
  {
    title: "Image tools",
    description: "Prepare photos and visuals for wherever they need to go.",
    href: "/image-compressor/",
    accent: "blue",
    tools: ["Compress images", "Resize images", "Remove backgrounds", "AI image generator"],
  },
  {
    title: "PDF tools",
    description: "Combine, convert and prepare PDF documents for your next task.",
    href: "/merge-pdf/",
    accent: "violet",
    tools: [
      "Merge PDF files",
      "PDF to Word",
      "JPG to PDF",
    ],
  },
  {
    title: "More everyday tools",
    description: "QR codes, format converters and handy extras for daily tasks.",
    href: "/tools/",
    accent: "cyan",
    tools: ["QR code generator", "HEIC & WebP converters", "YouTube thumbnails", "Video Studio"],
  },
];

const fileMoments: {
  title: string;
  text: string;
  label: string;
  href: string;
  icon: "image" | "document" | "video";
}[] = [
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
    icon: "image",
  },
  {
    title: "Create images from words",
    text: "Describe anything and get an AI-generated image in under a minute — free, no sign-up.",
    label: "Generate an image",
    href: "/ai-image-generator/",
    icon: "image",
  },
  {
    title: "Make a document editable",
    text: "Move from a fixed PDF to a Word-compatible document when the next step is editing.",
    label: "Convert PDF to Word",
    href: "/pdf-to-word/",
    icon: "document",
  },
  {
    title: "Combine documents",
    text: "Bring multiple PDF files together into one organized document.",
    label: "Merge PDF files",
    href: "/merge-pdf/",
    icon: "document",
  },
  {
    title: "Turn images into a PDF",
    text: "Combine JPG images into a convenient PDF document for sharing, storing or submitting.",
    label: "Convert JPG to PDF",
    href: "/jpg-to-pdf/",
    icon: "document",
  },
  {
    title: "Save a YouTube thumbnail",
    text: "Get an available thumbnail image from a YouTube video URL for reference or legitimate content workflows.",
    label: "Download a thumbnail",
    href: "/youtube-thumbnail-downloader/",
    icon: "image",
  },
  {
    title: "Trim and shrink a video",
    text: "Cut out the part you need and compress the file — all processed in your browser, nothing gets uploaded.",
    label: "Open Video Studio",
    href: "/video-studio/",
    icon: "video",
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
      "You can currently use iclaude for image, PDF, video and everyday file workflows, including image compression, image resizing, background removal, free AI image generation from text prompts, JPG to PDF conversion, PDF merging, PDF to Word conversion, QR code generation, YouTube thumbnail downloading, and video trimming, compression and conversion right in your browser. Each available tool has its own focused workflow.",
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

const mockRows: { title: string; detail: string; Icon: typeof ImageIcon; tone: string }[] = [
  { title: "Image Compressor", detail: "Reduce image file size", Icon: ImageIcon, tone: "bg-blue-50 text-blue-600" },
  { title: "Image Resizer", detail: "Resize images quickly", Icon: GridIcon, tone: "bg-violet-50 text-violet-600" },
  { title: "Remove Background", detail: "Clean cutouts in seconds", Icon: ImageIcon, tone: "bg-emerald-50 text-emerald-600" },
  { title: "AI Image Generator", detail: "Text to image, free", Icon: SparkIcon, tone: "bg-fuchsia-50 text-fuchsia-600" },
  { title: "Merge PDF", detail: "Combine PDF files", Icon: FileIcon, tone: "bg-rose-50 text-rose-600" },
  { title: "PDF to Word", detail: "Make documents editable", Icon: FileIcon, tone: "bg-amber-50 text-amber-600" },
  { title: "JPG to PDF", detail: "Convert images to PDF", Icon: FileIcon, tone: "bg-cyan-50 text-cyan-600" },
  { title: "Video Studio", detail: "Trim & compress videos", Icon: VideoIcon, tone: "bg-indigo-50 text-indigo-600" },
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
      <rect x="3" y="5" width="13" height="14" rx="2.5" />
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

const momentIcons = {
  image: ImageIcon,
  document: FileIcon,
  video: VideoIcon,
} as const;

const accentStyles: Record<string, { badge: string; dot: string; glow: string }> = {
  blue: {
    badge: "bg-blue-50 text-blue-600 border-blue-100",
    dot: "bg-blue-500",
    glow: "bg-blue-200",
  },
  violet: {
    badge: "bg-violet-50 text-violet-600 border-violet-100",
    dot: "bg-violet-500",
    glow: "bg-violet-200",
  },
  cyan: {
    badge: "bg-cyan-50 text-cyan-600 border-cyan-100",
    dot: "bg-cyan-500",
    glow: "bg-cyan-200",
  },
};

export default function HomePage() {
  const popularTools = popularToolSlugs
    .map((slug) => tools.find((tool) => tool.slug === slug))
    .filter((tool): tool is (typeof tools)[number] => Boolean(tool));

  return (
    <>
      <main className="overflow-hidden">
        {/* ============ HERO ============ */}
        <section className="relative isolate overflow-hidden bg-[#f8fbff]">
          <div className="pointer-events-none absolute inset-0 -z-20" aria-hidden="true">
            <div className="iclaude-hero-orb absolute -left-48 top-16 h-[30rem] w-[30rem] rounded-full bg-cyan-300/25 blur-3xl" />
            <div className="iclaude-float-slow absolute left-1/2 top-[-24rem] h-[52rem] w-[70rem] -translate-x-1/2 rounded-full bg-blue-300/20 blur-3xl" />
            <div className="iclaude-float-reverse absolute -right-48 top-20 h-[34rem] w-[34rem] rounded-full bg-violet-300/20 blur-3xl" />
          </div>

          <div className="pointer-events-none absolute inset-0 -z-10 iclaude-dot-grid opacity-45" aria-hidden="true" />

          <div className="iclaude-container">
            <div className="grid min-h-[620px] items-center gap-14 py-14 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-24">
              <div className="max-w-2xl">
                <div className="iclaude-reveal inline-flex items-center gap-2 rounded-full border border-blue-100/90 bg-white/80 px-3.5 py-2 text-xs font-bold text-slate-600 shadow-[0_8px_30px_rgba(37,99,235,0.07)] backdrop-blur-xl">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
                    <SparkIcon />
                  </span>
                  Simple tools for everyday file work
                </div>

                <h1 className="iclaude-reveal iclaude-delay-1 mt-7 max-w-3xl text-[clamp(3rem,6.5vw,5.25rem)] font-black leading-[0.95] tracking-[-0.06em] text-slate-950">
                  Get every file
                  <span className="block iclaude-gradient-text iclaude-gradient-animate">ready for what&apos;s next.</span>
                </h1>

                <p className="iclaude-reveal iclaude-delay-2 mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                  Compress, resize, convert and transform files with focused online tools designed to help you finish the job without the clutter of a full software suite.
                </p>

                <div className="iclaude-reveal iclaude-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/tools/"
                    className="iclaude-button-primary iclaude-btn-shine group inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white"
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

                <div className="iclaude-reveal iclaude-delay-4 mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-slate-600">
                  {["Free to use", "No sign-up needed", "Works in your browser"].map((item) => (
                    <span key={item} className="inline-flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <CheckIcon />
                      </span>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="iclaude-hero-float relative mx-auto w-full max-w-[510px] lg:ml-auto">
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
                          <span className="text-[10px] font-bold text-blue-600">9 tools</span>
                        </div>

                        <div className="mt-3 grid gap-2">
                          {mockRows.map(({ title, detail, Icon, tone }) => (
                            <div key={title} className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3 transition duration-300 hover:border-blue-100 hover:bg-white hover:shadow-sm">
                              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tone}`}>
                                <Icon />
                              </span>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-xs font-extrabold text-slate-900">{title}</p>
                                <p className="mt-0.5 truncate text-[10px] text-slate-500">{detail}</p>
                              </div>
                              <ArrowIcon className="h-3.5 w-3.5 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {[
                          ["Images", "4 tools"],
                          ["PDF", "3 tools"],
                          ["Video & more", "2 tools"],
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

        {/* ============ CAPABILITY MARQUEE ============ */}
        <section className="border-y border-slate-200/80 bg-white" aria-label="Popular capabilities">
          <div className="iclaude-container overflow-hidden">
            <div className="iclaude-marquee flex min-w-max items-center py-4">
              {[0, 1].map((half) => (
                <div key={half} aria-hidden={half === 1} className="flex items-center gap-4 pr-4">
                  {marqueeItems.map((item) => (
                    <span
                      key={`${half}-${item}`}
                      className="inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-600"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ STATS ============ */}
        <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
          <div className="iclaude-container">
            <Reveal>
              <div className="grid overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50/80 sm:grid-cols-4">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`group p-5 transition duration-300 hover:bg-white sm:p-6 ${
                      index !== 0 ? "border-t border-slate-200 sm:border-l sm:border-t-0" : ""
                    }`}
                  >
                    <span className={`text-2xl font-black tracking-[-0.05em] ${stat.accent ? "text-blue-600" : "text-slate-950"}`}>
                      {typeof stat.value === "number" ? <CountUp to={stat.value} /> : stat.value}
                    </span>
                    <p className="mt-2 text-sm font-bold text-slate-900">{stat.label}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{stat.detail}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ POPULAR TOOLS ============ */}
        <section id="tools" className="scroll-mt-20 py-20 sm:py-28">
          <div className="iclaude-container">
            <Reveal>
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
                  className="group inline-flex shrink-0 items-center gap-2 text-sm font-bold text-slate-950 transition hover:text-blue-600"
                >
                  View every tool
                  <span className="transition-transform group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </Link>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {popularTools.map((tool, index) => (
                <Reveal key={tool.slug} delayClass={`iclaude-delay-${(index % 3) + 1}`}>
                  <ToolCard tool={tool} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>


        {/* ============ HOW IT WORKS ============ */}
        <section id="how-it-works" className="scroll-mt-24 border-y border-slate-200/80 bg-[#f8fbff] py-20 sm:py-28">
          <div className="iclaude-container">
            <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <Reveal>
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
              </Reveal>

              <div className="grid gap-4 sm:grid-cols-3">
                {processSteps.map((step, index) => (
                  <Reveal key={step.number} delayClass={`iclaude-delay-${index + 1}`}>
                    <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5">
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
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ FILE MOMENTS ============ */}
        <section className="py-20 sm:py-28">
          <div className="iclaude-container">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <Reveal>
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
              </Reveal>

              <div className="grid gap-4 sm:grid-cols-2">
                {fileMoments.map((moment, index) => {
                  const Icon = momentIcons[moment.icon];
                  const tone =
                    index === 0
                      ? "bg-blue-600 text-white"
                      : index === 1
                        ? "bg-violet-50 text-violet-600"
                        : index === 2
                          ? "bg-amber-50 text-amber-600"
                          : "bg-cyan-50 text-cyan-600";

                  return (
                    <Reveal key={moment.title} delayClass={`iclaude-delay-${(index % 2) + 1}`}>
                      <Link
                        href={moment.href}
                        className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5"
                      >
                        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}>
                          <Icon />
                        </span>
                        <h3 className="mt-6 text-lg font-bold text-slate-950">
                          {moment.title}
                        </h3>
                        <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                          {moment.text}
                        </p>
                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                          {moment.label}
                          <span className="transition-transform group-hover:translate-x-1">
                            <ArrowIcon />
                          </span>
                        </span>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ============ WORKFLOW GROUPS ============ */}
        <section className="border-y border-slate-200 bg-slate-50/80 py-20 sm:py-28">
          <div className="iclaude-container">
            <Reveal>
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
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {workflowGroups.map((group, index) => {
                const Icon = index === 0 ? ImageIcon : index === 1 ? FileIcon : GridIcon;
                const styles = accentStyles[group.accent] ?? accentStyles.blue;

                return (
                  <Reveal key={group.title} delayClass={`iclaude-delay-${index + 1}`}>
                    <Link
                      href={group.href}
                      className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5"
                    >
                      <div
                        className={`absolute right-[-45px] top-[-45px] h-36 w-36 rounded-full opacity-50 blur-2xl transition duration-500 group-hover:scale-150 ${styles.glow}`}
                        aria-hidden="true"
                      />
                      <div className="relative flex flex-1 flex-col">
                        <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${styles.badge}`}>
                          <Icon />
                        </span>
                        <h3 className="mt-7 text-xl font-bold tracking-tight text-slate-950">
                          {group.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-slate-600">
                          {group.description}
                        </p>
                        <ul className="mt-6 flex-1 space-y-3">
                          {group.tools.map((tool) => (
                            <li key={tool} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                              <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
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
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="border-b border-slate-200 bg-white py-20 sm:py-28">
          <div className="iclaude-content">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                    Questions, answered
                  </p>
                  <h2 className="mt-4 text-3xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">
                    Everything you need to get started.
                  </h2>
                </div>
              </Reveal>
              <div className="mt-12 space-y-3">
                {faqs.map((faq, index) => (
                  <Reveal key={faq.question} delayClass={`iclaude-delay-${(index % 3) + 1}`}>
                    <details className="iclaude-faq group rounded-2xl border border-slate-200 bg-white px-5 py-1 shadow-sm transition hover:border-slate-300 sm:px-6">
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
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="bg-white py-20 sm:py-28">
          <div className="iclaude-container">
            <Reveal>
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
                    className="iclaude-btn-shine mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-50"
                  >
                    Explore iclaude tools
                    <ArrowIcon />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
