import type { Metadata } from "next";
import Link from "next/link";

import Breadcrumbs from "@/components/seo/Breadcrumbs";
import StructuredData from "@/components/seo/StructuredData";
import GuideCard from "@/components/guides/GuideCard";

import {
  generateBreadcrumbSchema,
  generatePageMetadata,
  generateWebPageSchema,
  SITE_NAME,
} from "@/lib/seo";
import { guides } from "@/lib/guides";

export const metadata: Metadata = generatePageMetadata({
  title: "Guides for Images, PDF & Video Tools",
  description:
    "Practical guides for compressing, resizing, converting and preparing digital files. Learn simple workflows and then use the matching iClaude tool.",
  path: "/guides/",
  keywords: [
    "image compression guide",
    "image resizing guide",
    "PDF conversion guide",
    "video compression guide",
    "online file tools guides",
  ],
});

export default function GuidesPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Guides" },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbs.map((item) => ({
      name: item.name,
      url: item.href ?? "/guides/",
    })),
  );

  const webPageSchema = generateWebPageSchema({
    name: "Guides for Images, PDF & Video Tools",
    description:
      "Practical guides for working with images, PDFs, videos and digital files.",
    path: "/guides/",
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
            <div className="absolute left-[-10%] top-[-35%] h-[520px] w-[520px] rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute right-[-8%] top-[-20%] h-[460px] w-[460px] rounded-full bg-cyan-400/15 blur-3xl" />
            <div className="absolute bottom-[-45%] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                iClaude Guides
              </div>

              <h1 className="mt-7 text-4xl font-black tracking-[-0.045em] text-white sm:text-6xl">
                Practical answers for everyday file work.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Learn the workflow first, understand the trade-offs, then
                jump directly into the matching iClaude tool when you are
                ready to process a file.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/tools/"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  Explore all tools
                  <span aria-hidden="true">→</span>
                </Link>

                <Link
                  href="/image-compressor/"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  Image compressor
                </Link>
              </div>
            </div>

            <div className="mt-14 grid max-w-4xl grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl sm:grid-cols-3">
              {[
                ["guides", guides.length, "Published guide"],
                ["tools", "5", "Core tools"],
                ["topics", "Images · PDF · Video", "Current focus"],
              ].map(([id, value, label], index) => (
                <div
                  key={id}
                  className={`px-5 py-5 ${
                    index > 0 ? "border-l border-white/10" : ""
                  } ${index === 2 ? "col-span-2 sm:col-span-1" : ""}`}
                >
                  <p className="text-xl font-black text-white sm:text-2xl">
                    {value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
              Learn → apply
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Guides built around real tasks.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Each guide is designed to answer a practical question and
              connect naturally to the tool that can complete the task.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                  {SITE_NAME} workflow
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-[-0.035em] text-slate-950 sm:text-3xl">
                  Need to process a file now?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                  Skip the reading and go straight to the tool directory when
                  you already know what you need.
                </p>
              </div>

              <Link
                href="/tools/"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Open tool directory
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
