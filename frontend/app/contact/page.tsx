import type { Metadata } from "next";
import Link from "next/link";

import StructuredData from "@/components/seo/StructuredData";
import {
  generateOrganizationSchema,
  generatePageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact iclaude — Get Help With Our Online Tools",
  description:
    "Contact iclaude for questions, feedback, bug reports or help using our online image, PDF and video tools.",
  path: "/contact/",
  keywords: [
    "contact iclaude",
    "iclaude support",
    "online tools support",
    "file tool support",
    "iclaude feedback",
  ],
});

function MessageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M20 15a4 4 0 0 1-4 4H8l-4 3v-7a4 4 0 0 1-2-3.5V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
      <path d="M7 10h10M7 14h6" />
    </svg>
  );
}

function BugIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="8" y="7" width="8" height="11" rx="4" />
      <path d="M12 3v4M5 9h3M16 9h3M5 15h3M16 15h3M9 21l1-3M15 21l-1-3" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
      <path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M4 10h11" />
      <path d="m11 5 5 5-5 5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="m4 10 4 4 8-8" />
    </svg>
  );
}

export default function ContactPage() {
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <StructuredData data={organizationSchema} />

      <main className="overflow-hidden bg-white">
        {/* =========================================================
            HERO
        ========================================================== */}
        <section className="relative isolate overflow-hidden bg-slate-950">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.22),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(6,182,212,0.16),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.18),transparent_38%)]"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div
            aria-hidden="true"
            className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
          />

          <div className="iclaude-container relative py-20 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-4xl text-center">
              <div className="iclaude-reveal inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm font-semibold text-slate-200 shadow-2xl backdrop-blur-xl">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-slate-950">
                  <MessageIcon />
                </span>
                Contact iclaude
              </div>

              <h1 className="iclaude-reveal iclaude-delay-1 mt-8 text-4xl font-black tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
                Have a question?
                <span className="mt-2 block bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                  Let&apos;s talk.
                </span>
              </h1>

              <p className="iclaude-reveal iclaude-delay-2 mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Need help with a tool, found something that could work better,
                or have an idea for iclaude? We want to hear from you.
              </p>

              <div className="iclaude-reveal iclaude-delay-3 mt-10 flex flex-wrap justify-center gap-3">
                <a
                  href="mailto:support@iclaude.in"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xl transition hover:-translate-y-1 hover:bg-slate-100"
                >
                  Email support
                  <ArrowIcon />
                </a>

                <Link
                  href="/tools/"
                  className="inline-flex items-center rounded-xl border border-white/15 bg-white/[0.06] px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/10"
                >
                  Browse tools
                </Link>
              </div>

              <div className="iclaude-reveal iclaude-delay-4 mx-auto mt-12 flex max-w-md items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 backdrop-blur-xl">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                  <CheckIcon />
                </span>

                <div className="text-left">
                  <p className="text-sm font-bold text-white">
                    Support channel available
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    support@iclaude.in
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </section>

        {/* =========================================================
            CONTACT TYPES
        ========================================================== */}
        <section className="bg-white">
          <div className="iclaude-container py-20 sm:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                How can we help?
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Choose what you want to tell us.
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
                Whether something went wrong or you simply have an idea, every
                useful message helps improve the platform.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
              {[
                {
                  title: "Ask a question",
                  text: "Need help understanding a tool, supported format or workflow?",
                  icon: <MessageIcon />,
                  tone: "bg-blue-50 text-blue-600",
                },
                {
                  title: "Report a problem",
                  text: "Tell us what happened so we can investigate and improve the experience.",
                  icon: <BugIcon />,
                  tone: "bg-violet-50 text-violet-600",
                },
                {
                  title: "Share an idea",
                  text: "Have a tool or workflow you would like to see added to iclaude?",
                  icon: <SparkIcon />,
                  tone: "bg-cyan-50 text-cyan-600",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/5"
                >
                  <div
                    aria-hidden="true"
                    className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-50 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100"
                  />

                  <div className="relative">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.tone}`}
                    >
                      {item.icon}
                    </span>

                    <h3 className="mt-7 text-xl font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            CONTACT FORM / SUPPORT
        ========================================================== */}
        <section className="border-y border-slate-200 bg-slate-50/70">
          <div className="iclaude-container py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div className="lg:sticky lg:top-32">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
                  Send a message
                </div>

                <h2 className="mt-5 text-3xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl">
                  Tell us what you need.
                </h2>

                <p className="mt-5 max-w-lg text-base leading-8 text-slate-600">
                  The contact form is prepared for the upcoming support
                  service. For now, the fastest way to reach the team is
                  through email.
                </p>

                <a
                  href="mailto:support@iclaude.in"
                  className="group mt-8 inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <MessageIcon />
                  </span>

                  <span className="text-left">
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                      Email
                    </span>

                    <span className="mt-0.5 block text-sm font-bold text-slate-950">
                      support@iclaude.in
                    </span>
                  </span>

                  <span className="ml-3 text-slate-400 transition-transform group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </a>

                <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                  <p className="text-sm font-bold text-slate-950">
                    Before contacting support
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Check whether your file type and size are supported by the
                    tool you are using. This can often explain why an upload
                    does not work as expected.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
                <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-base font-black text-slate-950">
                      Contact form
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Message delivery will be connected during the backend
                      phase.
                    </p>
                  </div>

                  <span className="inline-flex w-fit rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-amber-700">
                    Coming soon
                  </span>
                </div>

                <form
                  className="mt-7 grid gap-5"
                  aria-label="Contact form unavailable"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="text-sm font-bold text-slate-700">
                      Name
                      <input
                        disabled
                        type="text"
                        placeholder="Your name"
                        className="iclaude-input mt-2 cursor-not-allowed bg-slate-50 text-slate-400"
                      />
                    </label>

                    <label className="text-sm font-bold text-slate-700">
                      Email
                      <input
                        disabled
                        type="email"
                        placeholder="you@example.com"
                        className="iclaude-input mt-2 cursor-not-allowed bg-slate-50 text-slate-400"
                      />
                    </label>
                  </div>

                  <label className="text-sm font-bold text-slate-700">
                    Subject
                    <input
                      disabled
                      type="text"
                      placeholder="How can we help?"
                      className="iclaude-input mt-2 cursor-not-allowed bg-slate-50 text-slate-400"
                    />
                  </label>

                  <label className="text-sm font-bold text-slate-700">
                    Message
                    <textarea
                      disabled
                      rows={6}
                      placeholder="Describe your question, feedback or issue..."
                      className="iclaude-input mt-2 resize-y cursor-not-allowed bg-slate-50 text-slate-400"
                    />
                  </label>

                  <button
                    disabled
                    type="submit"
                    className="rounded-xl bg-slate-200 px-5 py-3.5 text-sm font-bold text-slate-500"
                  >
                    Message delivery is coming soon
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SUPPORT TIPS
        ========================================================== */}
        <section className="bg-white">
          <div className="iclaude-container py-20 sm:py-28">
            <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-7 shadow-sm sm:p-10">
              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                  Help us help you
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  A few details make support faster.
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  If you are reporting a problem, including a little context
                  can make it much easier to understand what happened.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    number: "01",
                    title: "Name the tool",
                    text: "Tell us which iclaude tool you were using.",
                  },
                  {
                    number: "02",
                    title: "Mention the file",
                    text: "Include the format and approximate file size.",
                  },
                  {
                    number: "03",
                    title: "Describe the issue",
                    text: "Tell us what you expected and what happened.",
                  },
                ].map((item) => (
                  <div
                    key={item.number}
                    className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
                  >
                    <p className="text-xs font-black tracking-[0.16em] text-blue-600">
                      {item.number}
                    </p>

                    <h3 className="mt-5 text-base font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-7 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-6 text-slate-600">
                  You may already be able to complete your task with one of
                  the available tools.
                </p>

                <Link
                  href="/tools/"
                  className="group inline-flex shrink-0 items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700"
                >
                  Browse tools
                  <span className="transition-transform group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            FINAL CTA
        ========================================================== */}
        <section className="relative overflow-hidden bg-slate-950">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.2),transparent_45%)]"
          />

          <div className="iclaude-container relative py-20 sm:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white shadow-xl backdrop-blur">
                ✦
              </div>

              <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-blue-300">
                iclaude support
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
                Need something done?
                <span className="block text-slate-400">
                  Start with a tool.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-400">
                Explore the available tools or reach out if you need help with
                your workflow.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link
                  href="/tools/"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xl transition hover:-translate-y-1 hover:bg-slate-100"
                >
                  Explore tools
                  <ArrowIcon />
                </Link>

                <a
                  href="mailto:support@iclaude.in"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-white/10"
                >
                  Email support
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}