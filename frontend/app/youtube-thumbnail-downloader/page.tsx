import type { Metadata } from "next";

import YouTubeThumbnailDownloader from "../../components/tools/YouTubeThumbnailDownloader";
import {
  absoluteUrl,
  generateBreadcrumbSchema,
  generateToolSchema,
  serializeStructuredData,
} from "../../lib/seo";
import { getRequiredToolBySlug } from "../../lib/tools";

const tool = getRequiredToolBySlug("youtube-thumbnail-downloader");

export const metadata: Metadata = {
  title: tool.seoTitle,
  description: tool.seoDescription,
  keywords: tool.keywords,

  alternates: {
    canonical: absoluteUrl(tool.href),
  },

  robots: {
    index: false,
    follow: true,
  },

  openGraph: {
    type: "website",
    title: tool.seoTitle,
    description: tool.seoDescription,
    url: absoluteUrl(tool.href),
    siteName: "iclaude",
    locale: "en_IN",
    images: [
      {
        url: absoluteUrl("/iclaude-og-image.png"),
        width: 1200,
        height: 630,
        alt: `${tool.name} - iclaude`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: tool.seoTitle,
    description: tool.seoDescription,
    images: [absoluteUrl("/iclaude-og-image.png")],
  },
};

export default function YouTubeThumbnailDownloaderPage() {
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
          <div className="mb-4 inline-flex items-center rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
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
          <YouTubeThumbnailDownloader />
        </section>

        <section className="mx-auto mt-16 max-w-4xl">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">
              YouTube Thumbnail Downloader
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Download an available YouTube video thumbnail by entering
              the video URL. The tool extracts the YouTube video ID and
              lets you preview available thumbnail images before
              downloading them.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              You do not need to download the video itself. Use the
              thumbnail downloader for personal references, design
              workflows and other uses where you have the appropriate
              rights to use the image.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900">
            How to download a YouTube thumbnail
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-5">
              <div className="text-sm font-bold text-red-600">01</div>

              <h3 className="mt-2 font-semibold text-slate-900">
                Copy the URL
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Copy the URL of the YouTube video whose thumbnail you
                want to view.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <div className="text-sm font-bold text-red-600">02</div>

              <h3 className="mt-2 font-semibold text-slate-900">
                Paste the URL
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Paste the YouTube URL into the downloader and select
                Get Thumbnail.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <div className="text-sm font-bold text-red-600">03</div>

              <h3 className="mt-2 font-semibold text-slate-900">
                Download
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Preview the available thumbnail and download the
                resolution you need.
              </p>
            </div>
          </div>
        </section>

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