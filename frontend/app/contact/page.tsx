import type { Metadata } from "next";
import Link from "next/link";
import {
  generateOrganizationSchema,
  generatePageMetadata,
} from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact iclaude — Get Help With Our Online Tools",
  description:
    "Contact iclaude for questions, feedback, bug reports or help using our online image, PDF and video tools.",
  path: "/contact",
  keywords: [
    "contact iclaude",
    "iclaude support",
    "online tools support",
    "file tool support",
  ],
});

export default function ContactPage() {
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
                Contact iclaude
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                How can we help?
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Have a question about an iclaude tool, found a
                problem or want to share feedback? Use the contact
                options below.
              </p>
            </div>
          </div>
        </section>

        {/* Contact options */}
        <section className="py-14 sm:py-20">
          <div className="iclaude-container">
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl"
                  aria-hidden="true"
                >
                  ✉️
                </div>

                <h2 className="mt-5 text-2xl font-semibold text-slate-950">
                  General questions
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  For general questions, feedback or suggestions
                  about iclaude, use our support contact channel.
                </p>

                <div className="mt-6 rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Support email
                  </p>

                  <p className="mt-2 text-sm font-medium text-slate-900">
                    support@iclaude.in
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-2xl"
                  aria-hidden="true"
                >
                  🐛
                </div>

                <h2 className="mt-5 text-2xl font-semibold text-slate-950">
                  Report a problem
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  If a tool does not behave as expected, please
                  include the tool name, the file type involved and
                  a description of what happened.
                </p>

                <div className="mt-6 rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Helpful information
                  </p>

                  <p className="mt-2 text-sm text-slate-700">
                    Tool name · file type · browser · error message
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact form */}
        <section className="bg-slate-50 py-14 sm:py-20">
          <div className="iclaude-content">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                    Send a message
                  </p>

                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                    Tell us what you need
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    This form is currently a contact interface.
                    Message delivery will be connected to the
                    iclaude backend in a later phase.
                  </p>
                </div>

               <form className="mt-8 space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-900"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-900"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-slate-900"
                    >
                      Subject
                    </label>

                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="How can we help?"
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-900"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Describe your question or feedback..."
                      className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled
                    className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white opacity-60"
                  >
                    Send message
                  </button>

                  <p className="text-center text-xs leading-5 text-slate-500">
                    Contact form submission will be enabled after
                    the backend contact service is implemented.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Help */}
        <section className="py-14 sm:py-20">
          <div className="iclaude-content">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                Looking for a tool?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
                You may be able to complete your task directly
                with one of the available iclaude tools.
              </p>

              <Link
                href="/tools"
                className="mt-7 inline-flex items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Browse all tools
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}