import type { Metadata } from "next";

import JpgToPdf from "../../components/tools/JpgToPdf";
import {
  generateBreadcrumbSchema,
  generateToolMetadata,
  generateToolSchema,
  serializeStructuredData,
} from "../../lib/seo";
import { getRequiredToolBySlug } from "../../lib/tools";

const tool = getRequiredToolBySlug("jpg-to-pdf");

export const metadata: Metadata = generateToolMetadata(tool);

export default function JpgToPdfPage() {
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
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-sm text-slate-500"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <a
                href="/"
                className="transition hover:text-blue-600"
              >
                Home
              </a>
            </li>

            <li aria-hidden="true">/</li>

            <li>
              <a
                href="/tools/"
                className="transition hover:text-blue-600"
              >
                Tools
              </a>
            </li>

            <li aria-hidden="true">/</li>

            <li className="font-medium text-slate-700">
              {tool.name}
            </li>
          </ol>
        </nav>

        <section className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            Free online tool
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {tool.name}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            {tool.description}
          </p>
        </section>

        <section className="mx-auto mt-10 max-w-5xl">
          <JpgToPdf />
        </section>

        <section className="mx-auto mt-16 max-w-4xl">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Free JPG to PDF Converter
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Convert JPG, JPEG, PNG, and WebP images into a PDF document
              directly in your browser. Add multiple images, arrange them in
              the order you want, and create a single downloadable PDF.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Your images are processed locally in your browser, so you do
              not need to upload them to a server or create an account.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900">
            How to convert JPG to PDF
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-5">
              <div className="text-sm font-bold text-blue-600">
                01
              </div>

              <h3 className="mt-2 font-semibold text-slate-900">
                Add your images
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Select one or multiple JPG, JPEG, PNG, or WebP images.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <div className="text-sm font-bold text-blue-600">
                02
              </div>

              <h3 className="mt-2 font-semibold text-slate-900">
                Arrange the pages
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Reorder or remove images to control the PDF page order.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <div className="text-sm font-bold text-blue-600">
                03
              </div>

              <h3 className="mt-2 font-semibold text-slate-900">
                Download the PDF
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Generate your PDF and download it instantly.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900">
            Frequently asked questions
          </h2>

          <div className="mt-6 space-y-4">
            <details className="rounded-xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-semibold text-slate-900">
                Is the JPG to PDF converter free?
              </summary>

              <p className="mt-3 leading-7 text-slate-600">
                Yes. You can convert images to PDF without creating an
                account or purchasing a subscription.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-semibold text-slate-900">
                Can I convert multiple JPG images into one PDF?
              </summary>

              <p className="mt-3 leading-7 text-slate-600">
                Yes. You can select multiple images, arrange their order,
                and combine them into a single PDF document.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-semibold text-slate-900">
                Are my images uploaded to a server?
              </summary>

              <p className="mt-3 leading-7 text-slate-600">
                No. The conversion is performed directly in your browser.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-semibold text-slate-900">
                What image formats are supported?
              </summary>

              <p className="mt-3 leading-7 text-slate-600">
                The tool supports JPG, JPEG, PNG, and WebP images.
              </p>
            </details>
          </div>
        </section>
      </div>

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
  );
}