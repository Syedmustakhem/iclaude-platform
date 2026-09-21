import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Online Tools",
  description:
    "Explore iclaude's free online tools for compressing, resizing, converting and processing images, PDFs and videos.",
  alternates: {
    canonical: "https://iclaude.in/tools/",
  },
};

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="content-container py-16 text-center sm:py-20">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            iclaude tools
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Free Online Tools
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Simple tools for images, PDFs and videos. Choose a tool below to
            get started.
          </p>
        </div>
      </section>

      <section className="content-container py-12 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.href}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <span className="text-xl font-bold">
                  {tool.name.charAt(0)}
                </span>
              </div>

              <p className="mb-2 text-sm font-medium text-blue-600">
                {tool.category}
              </p>

              <h2 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600">
                {tool.name}
              </h2>

              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                {tool.description}
              </p>

              <span className="mt-5 inline-flex items-center text-sm font-semibold text-slate-900">
                Open tool
                <span className="ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="content-container pb-16">
        <div className="rounded-3xl bg-slate-900 px-6 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Simple tools. No unnecessary steps.
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Choose a tool, upload your file and process it when the tool is
            ready. iclaude is designed to keep common file tasks simple.
          </p>
        </div>
      </section>
    </main>
  );
}