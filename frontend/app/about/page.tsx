import type { Metadata } from "next";
import Link from "next/link";
import {
  generatePageMetadata,
  generateOrganizationSchema,
} from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";

export const metadata: Metadata = generatePageMetadata({
  title: "About iclaude — Online File Tools",
  description:
    "Learn about iclaude and its goal of making common image, PDF and video file tasks simpler through focused online tools.",
  path: "/about/",
  keywords: [
    "about iclaude",
    "online file tools",
    "image tools",
    "PDF tools",
    "video tools",
  ],
});

export default function AboutPage() {
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <StructuredData data={organizationSchema} />

      <main>
        {/* Hero */}
        <section className="border-b border-slate-100 bg-gradient-to-b from-blue-50/70 via-white to-white">
          <div className="iclaude-content py-14 sm:py-20">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                About iclaude
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                Simple tools for everyday digital files
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                iclaude is being built as a collection of focused
                online tools for common image, PDF and video
                workflows.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-14 sm:py-20">
          <div className="iclaude-content">
            <article className="mx-auto max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Our approach
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                Make common file tasks easier to start
              </h2>

              <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
                <p>
                  Digital work often involves small file-related
                  tasks: reducing the size of an image, changing
                  image dimensions, removing a background,
                  converting a document or reducing the size of a
                  video.
                </p>

                <p>
                  iclaude is designed around these focused tasks.
                  Instead of requiring users to learn a large
                  application for a simple operation, each tool is
                  intended to provide a straightforward workflow
                  for a particular job.
                </p>

                <p>
                  The platform currently focuses on image, PDF and
                  video tools, with the collection intended to grow
                  as additional useful workflows are developed.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* Principles */}
        <section className="bg-slate-50 py-14 sm:py-20">
          <div className="iclaude-container">
            <div className="mx-auto max-w-5xl">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Principles
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                  What we&apos;re building around
                </h2>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-7">
                  <h3 className="text-xl font-semibold text-slate-950">
                    Focused tools
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Each tool is built around a specific file
                    task rather than trying to make every workflow
                    unnecessarily complicated.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-7">
                  <h3 className="text-xl font-semibold text-slate-950">
                    Clear workflows
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    The platform follows a simple choose, upload,
                    process and download model where appropriate.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-7">
                  <h3 className="text-xl font-semibold text-slate-950">
                    Useful information
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Tool pages explain supported formats, common
                    uses and practical considerations instead of
                    relying only on a button and an upload box.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Current tools */}
        <section className="py-14 sm:py-20">
          <div className="iclaude-content">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                Current tool collection
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                The initial iclaude collection focuses on five
                workflows:
              </p>

              <ul className="mt-7 space-y-3">
                {[
                  ["Image Compressor", "/image-compressor/"],
                  ["Image Resizer", "/image-resizer/"],
                  ["Background Remover", "/remove-background/"],
                  ["PDF to Word", "/pdf-to-word/"],
                  ["Video Compressor", "/video-compressor/"],
                ].map(([name, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
                    >
                      <span>{name}</span>

                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href="/tools/"
                className="mt-7 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Browse all tools
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16 sm:pb-24">
          <div className="iclaude-content">
            <div className="rounded-3xl bg-slate-950 px-6 py-12 text-center sm:px-12">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Explore iclaude
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
                Choose a tool and explore the available workflows
                for images, PDFs and videos.
              </p>

              <Link
                href="/tools/"
                className="mt-7 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Explore tools
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}