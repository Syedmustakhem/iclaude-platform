import type { Metadata } from "next";
import Link from "next/link";

import AIImageGenerator from "@/components/ai-image/AIImageGenerator";
import StructuredData from "@/components/seo/StructuredData";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { getRequiredToolBySlug } from "@/lib/tools";
import { generateToolMetadata, generateFAQSchema } from "@/lib/seo";

const tool = getRequiredToolBySlug("ai-image-generator");

export const metadata: Metadata = generateToolMetadata(tool);

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="m4 10 4 4 8-9" />
    </svg>
  );
}

export default function AIImageGeneratorPage() {
  const relatedSlugs = tool.relatedTools ?? [];

  return (
    <main className="bg-[#f8fbff]">
      <StructuredData data={generateFAQSchema(tool)} />

      {/* Header */}
      <section className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute -left-40 top-10 h-[26rem] w-[26rem] rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="absolute -right-40 top-0 h-[26rem] w-[26rem] rounded-full bg-violet-300/20 blur-3xl" />
        </div>
        <div className="iclaude-container pt-10 sm:pt-14">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Tools", href: "/tools/" },
              { name: tool.shortName },
            ]}
          />
          <div className="max-w-3xl pb-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700">
              Free AI image generator
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] text-slate-950 sm:text-6xl">
              {tool.name}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {tool.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-slate-600">
              {["Free to use", "No sign-up", "5 free images per day"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <CheckIcon />
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tool */}
      <section className="pb-16 sm:pb-20">
        <div className="iclaude-container">
          <div className="mx-auto max-w-4xl">
            <AIImageGenerator />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-slate-200/80 bg-white py-16 sm:py-20">
        <div className="iclaude-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
              From words to image in three steps
            </h2>
          </div>
          <ol className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
            {tool.content.howItWorks.map((step, index) => (
              <li
                key={step}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white">
                  {index + 1}
                </span>
                <p className="mt-4 text-sm leading-7 text-slate-600">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20">
        <div className="iclaude-container">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              Why AI Image Generator
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Ideas, visualized in seconds
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              {tool.content.introduction}
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {tool.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-700 shadow-sm"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <CheckIcon />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-200/80 bg-white py-16 sm:py-20">
        <div className="iclaude-container">
          <div className="mx-auto max-w-3xl">
            <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              FAQ
            </p>
            <h2 className="mt-3 text-center text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Common questions
            </h2>
            <div className="mt-10 space-y-3">
              {tool.faq.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-slate-200 bg-white px-5 py-1 shadow-sm transition hover:border-slate-300 sm:px-6"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[15px] font-bold text-slate-950">
                    {item.question}
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-normal text-slate-500 transition duration-200 group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl border-t border-slate-100 py-5 text-sm leading-7 text-slate-600">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related tools */}
      {relatedSlugs.length > 0 && (
        <section className="border-t border-slate-200/80 bg-[#f8fbff] py-16 sm:py-20">
          <div className="iclaude-container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Keep creating
              </h2>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {relatedSlugs.map((slug) => (
                  <Link
                    key={slug}
                    href={`/${slug}/`}
                    className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700"
                  >
                    {slug
                      .split("-")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
