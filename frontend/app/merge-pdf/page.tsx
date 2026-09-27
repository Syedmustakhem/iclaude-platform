import type { Metadata } from "next";
import Link from "next/link";

import ToolPage from "@/components/tools/ToolPage";
import {
  absoluteUrl,
  generateBreadcrumbSchema,
  generateToolMetadata,
  generateToolSchema,
  serializeStructuredData,
} from "@/lib/seo";
import { getRequiredToolBySlug } from "@/lib/tools";

const tool = getRequiredToolBySlug("merge-pdf");

export const metadata: Metadata = generateToolMetadata(tool);

export default function MergePdfPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Tools",
      url: "/tools/",
    },
    {
      name: tool.name,
      url: tool.href,
    },
  ]);

  const toolSchema = generateToolSchema(tool);

  return (
    <>
      <main className="min-h-screen bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-sm text-slate-500"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-blue-600"
                >
                  Home
                </Link>
              </li>

              <li aria-hidden="true">/</li>

              <li>
                <Link
                  href="/tools/"
                  className="transition hover:text-blue-600"
                >
                  Tools
                </Link>
              </li>

              <li aria-hidden="true">/</li>

              <li
                aria-current="page"
                className="font-medium text-slate-700"
              >
                {tool.name}
              </li>
            </ol>
          </nav>

          {/* Hero */}
          <section className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Free online PDF tool
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {tool.name}
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              {tool.description}
            </p>
          </section>

          {/* Tool */}
          <section
            aria-label={tool.name}
            className="mx-auto mt-10 max-w-5xl"
          >
            <ToolPage tool={tool} />
          </section>

          {/* SEO content */}
          <section className="mx-auto mt-16 max-w-4xl">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Free PDF Merger
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Merge multiple PDF files into one document with the
                iclaude PDF Merger. Upload your PDF files, arrange them
                in the order you want, combine them, and download the
                resulting PDF.
              </p>

              <p className="mt-4 leading-7 text-slate-600">
                A PDF merger is useful for combining reports, invoices,
                applications, supporting documents, project files, and
                other documents into a single PDF.
              </p>
            </div>
          </section>

          {/* How it works */}
          <section className="mx-auto mt-12 max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900">
              How to merge PDF files
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 p-5">
                <div className="text-sm font-bold text-blue-600">
                  01
                </div>

                <h3 className="mt-2 font-semibold text-slate-900">
                  Upload PDF files
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Select the PDF documents you want to combine.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-5">
                <div className="text-sm font-bold text-blue-600">
                  02
                </div>

                <h3 className="mt-2 font-semibold text-slate-900">
                  Arrange the files
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Put your PDF files in the order you want them to
                  appear in the final document.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-5">
                <div className="text-sm font-bold text-blue-600">
                  03
                </div>

                <h3 className="mt-2 font-semibold text-slate-900">
                  Merge and download
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Merge the documents and download your combined PDF.
                </p>
              </div>
            </div>
          </section>

          {/* Use cases */}
          <section className="mx-auto mt-12 max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900">
              What can you use a PDF merger for?
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {tool.content.useCases.map((useCase) => (
                <div
                  key={useCase}
                  className="rounded-xl border border-slate-200 p-5"
                >
                  <p className="text-sm leading-6 text-slate-600">
                    {useCase}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mx-auto mt-12 max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900">
              Frequently asked questions
            </h2>

            <div className="mt-6 space-y-4">
              {tool.faq.map((item) => (
                <details
                  key={item.question}
                  className="rounded-xl border border-slate-200 p-5"
                >
                  <summary className="cursor-pointer font-semibold text-slate-900">
                    {item.question}
                  </summary>

                  <p className="mt-3 leading-7 text-slate-600">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Back to tools */}
          <div className="mx-auto mt-12 max-w-4xl text-center">
            <Link
              href="/tools/"
              className="inline-flex items-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
            >
              ← Browse all tools
            </Link>
          </div>
        </div>

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeStructuredData(breadcrumbSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeStructuredData(toolSchema),
          }}
        />
      </main>
    </>
  );
}