
import type { Metadata } from "next";

import QRCodeGenerator from "../../components/tools/QrCodeGenerator";
import {
  absoluteUrl,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateToolMetadata,
  generateToolSchema,
  generateWebPageSchema,
  serializeStructuredData,
} from "../../lib/seo";
import { getRequiredToolBySlug } from "../../lib/tools";

const tool = getRequiredToolBySlug("qr-code-generator");

/* ============================================================
   SEO metadata
   ============================================================ */

export const metadata: Metadata = generateToolMetadata(tool);

/* ============================================================
   Page
   ============================================================ */

export default function QRCodeGeneratorPage() {
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

  const faqSchema = generateFAQSchema(tool);

  const webPageSchema = generateWebPageSchema({
    name: tool.name,
    description: tool.description,
    path: tool.href,
  });

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        {/* ======================================================
            Breadcrumb
            ====================================================== */}

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

            <li
              className="font-medium text-slate-700"
              aria-current="page"
            >
              {tool.name}
            </li>
          </ol>
        </nav>

        {/* ======================================================
            Hero
            ====================================================== */}

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

        {/* ======================================================
            QR Generator
            ====================================================== */}

        <section
          className="mx-auto mt-10 max-w-5xl"
          aria-label="QR code generator"
        >
          <QRCodeGenerator />
        </section>

        {/* ======================================================
            Introduction
            ====================================================== */}

        <section className="mx-auto mt-16 max-w-4xl">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Free QR Code Generator
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Create a QR code online from a URL or text. Enter your
              content, generate the QR code directly in your browser,
              and download it for use on websites, menus, posters,
              business cards, packaging, documents, and other
              materials.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              No account is required. The QR code can be generated
              directly in your browser, making it convenient for
              quickly creating a QR code whenever you need one.
            </p>
          </div>
        </section>

        {/* ======================================================
            How it works
            ====================================================== */}

        <section className="mx-auto mt-12 max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900">
            How to create a QR code
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Create a QR code in three simple steps.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-5">
              <div className="text-sm font-bold text-blue-600">
                01
              </div>

              <h3 className="mt-2 font-semibold text-slate-900">
                Enter your content
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Enter the URL or text that you want to encode into
                your QR code.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <div className="text-sm font-bold text-blue-600">
                02
              </div>

              <h3 className="mt-2 font-semibold text-slate-900">
                Generate the QR code
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Click the Generate QR Code button to create your QR
                code in the browser.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <div className="text-sm font-bold text-blue-600">
                03
              </div>

              <h3 className="mt-2 font-semibold text-slate-900">
                Download
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Download the generated QR code and use it wherever
                you need it.
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================
            Use cases
            ====================================================== */}

        <section className="mx-auto mt-12 max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900">
            Common QR code uses
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            QR codes can provide a quick way for people to access
            links or information using a smartphone camera.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">
                Websites and links
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Share a website or landing page without requiring
                people to type the address manually.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">
                Restaurant menus
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Place a QR code on menus, tables, signs, or printed
                materials to provide quick access to a menu page.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">
                Business cards
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Add a QR code to printed business materials to make
                sharing a website or online profile easier.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">
                Posters and flyers
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Connect printed promotional material with an online
                page using a scannable QR code.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">
                Packaging
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Add a QR code to product packaging to provide access
                to relevant online information.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">
                Documents
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Include QR codes in documents and printed resources
                when you want to connect them with online content.
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================
            FAQ
            ====================================================== */}

        <section className="mx-auto mt-12 max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900">
            Frequently asked questions
          </h2>

          <div className="mt-6 space-y-4">
            <details className="rounded-xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-semibold text-slate-900">
                Is this QR code generator free?
              </summary>

              <p className="mt-3 leading-7 text-slate-600">
                Yes. You can use the QR code generator without
                purchasing a subscription.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-semibold text-slate-900">
                Do I need to install software?
              </summary>

              <p className="mt-3 leading-7 text-slate-600">
                No. The QR code generator runs directly in a modern
                web browser.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-semibold text-slate-900">
                Do I need an account?
              </summary>

              <p className="mt-3 leading-7 text-slate-600">
                No account is required to generate a QR code.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-semibold text-slate-900">
                What can I put in a QR code?
              </summary>

              <p className="mt-3 leading-7 text-slate-600">
                This generator is designed for creating QR codes
                from URLs and text.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-semibold text-slate-900">
                When is the QR code generated?
              </summary>

              <p className="mt-3 leading-7 text-slate-600">
                Enter your content first and then click the Generate
                QR Code button. The QR code is created when you
                submit the form.
              </p>
            </details>
          </div>
        </section>
      </div>

      {/* ========================================================
          Structured data
          ======================================================== */}

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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(webPageSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(faqSchema),
        }}
      />
    </main>
  );
}
