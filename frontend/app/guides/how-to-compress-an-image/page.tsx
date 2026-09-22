import type { Metadata } from "next";
import Link from "next/link";

import Breadcrumbs from "@/components/seo/Breadcrumbs";
import StructuredData from "@/components/seo/StructuredData";

import {
  generateBreadcrumbSchema,
  generatePageMetadata,
  generateWebPageSchema,
} from "@/lib/seo";
import { getRequiredGuideBySlug } from "@/lib/guides";

const guide = getRequiredGuideBySlug("how-to-compress-an-image");

export const metadata: Metadata = generatePageMetadata({
  title: guide.title,
  description: guide.description,
  path: `/guides/${guide.slug}/`,
  keywords: guide.keywords,
});

export default function HowToCompressAnImagePage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides/" },
    { name: guide.title },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbs.map((item) => ({
      name: item.name,
      url: item.href ?? `/guides/${guide.slug}/`,
    })),
  );

  const webPageSchema = generateWebPageSchema({
    name: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}/`,
  });

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={webPageSchema} />

      <Breadcrumbs items={breadcrumbs} />

      <main className="overflow-hidden bg-white">
        <section className="relative isolate overflow-hidden border-b border-slate-200 bg-[#07111f] text-white">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
          >
            <div className="absolute left-[-12%] top-[-40%] h-[520px] w-[520px] rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute right-[-10%] top-[-15%] h-[460px] w-[460px] rounded-full bg-cyan-400/15 blur-3xl" />
          </div>

          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-cyan-200">
                  {guide.category}
                </span>
                <span>{guide.readTime}</span>
              </div>

              <h1 className="mt-7 text-4xl font-black tracking-[-0.045em] text-white sm:text-6xl">
                {guide.title}
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                {guide.description}
              </p>
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div>
              <p className="text-lg leading-9 text-slate-700">
                {guide.intro}
              </p>

              <div className="mt-12 space-y-12">
                {guide.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-2xl font-black tracking-[-0.035em] text-slate-950 sm:text-3xl">
                      {section.heading}
                    </h2>

                    <div className="mt-5 space-y-5">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-base leading-8 text-slate-600"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {section.bullets?.length ? (
                      <ul className="mt-6 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-3 text-sm leading-7 text-slate-700"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>

              <div className="mt-14 rounded-[28px] border border-slate-200 bg-slate-50 p-7 sm:p-9">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">
                  Ready to process an image?
                </p>

                <h2 className="mt-3 text-2xl font-black tracking-[-0.035em] text-slate-950">
                  Compress your image with iClaude
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                  Move from the guide to the image-compression workflow when
                  you are ready to prepare your file.
                </p>

                <Link
                  href="/image-compressor/"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  Open image compressor
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <aside className="h-fit lg:sticky lg:top-28">
              <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.3)]">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  Quick links
                </p>

                <div className="mt-5 space-y-3">
                  <Link
                    href="/image-compressor/"
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                  >
                    Image Compressor
                    <span aria-hidden="true">→</span>
                  </Link>

                  <Link
                    href="/image-resizer/"
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                  >
                    Image Resizer
                    <span aria-hidden="true">→</span>
                  </Link>

                  <Link
                    href="/guides/"
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                  >
                    All guides
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </main>
    </>
  );
}
