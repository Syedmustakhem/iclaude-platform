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
  ],
});

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M20 15a4 4 0 0 1-4 4H8l-4 3v-7a4 4 0 0 1-2-3.5V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
      <path d="M7 10h10M7 14h6" />
    </svg>
  );
}

function BugIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="8" y="7" width="8" height="11" rx="4" />
      <path d="M12 3v4M5 9h3M16 9h3M5 15h3M16 15h3M9 21l1-3M15 21l-1-3" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
      <path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 10h11" />
      <path d="m11 5 5 5-5 5" />
    </svg>
  );
}

export default function ContactPage() {
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <StructuredData data={organizationSchema} />

      <main className="iclaude-page-shell">
        <section className="iclaude-page-hero relative overflow-hidden">
          <div className="iclaude-float absolute left-[-10rem] top-6 h-80 w-80 rounded-full bg-cyan-300/25 blur-3xl" />
          <div className="iclaude-float-reverse absolute right-[-12rem] top-[-6rem] h-96 w-96 rounded-full bg-violet-300/20 blur-3xl" />
          <div className="iclaude-container relative py-20 sm:py-24 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <p className="iclaude-eyebrow">Contact iclaude</p>
              <h1 className="mt-5 text-4xl font-bold tracking-[-0.055em] text-slate-950 sm:text-6xl">
                A question, idea or issue? We&apos;re listening.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                Reach out for help using a tool, to report a problem or to share
                the workflow you would love to see next.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="iclaude-container">
            <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
              {[
                {
                  title: "Ask a question",
                  text: "Need help understanding a tool, supported format or next step?",
                  tone: "bg-blue-50 text-blue-600",
                  icon: <MessageIcon />,
                },
                {
                  title: "Report a problem",
                  text: "Tell us what happened so we can make the workflow better.",
                  tone: "bg-violet-50 text-violet-600",
                  icon: <BugIcon />,
                },
                {
                  title: "Share an idea",
                  text: "Your feedback helps shape the next practical tools on iclaude.",
                  tone: "bg-cyan-50 text-cyan-600",
                  icon: <SparkIcon />,
                },
              ].map((item) => (
                <article key={item.title} className="rounded-[24px] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.tone}`}>
                    {item.icon}
                  </span>
                  <h2 className="mt-7 text-xl font-bold text-slate-950">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-20 sm:py-28">
          <div className="iclaude-container">
            <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
              <div>
                <p className="iclaude-eyebrow">Send a message</p>
                <h2 className="mt-4 text-3xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">
                  Tell us what you need.
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  The contact form is ready for the next backend phase. Until
                  then, you can reach the team directly at the support email.
                </p>
                <a href="mailto:support@iclaude.in" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800">
                  support@iclaude.in
                  <ArrowIcon />
                </a>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-slate-950">Contact form</p>
                    <p className="mt-1 text-xs text-slate-500">Delivery will be enabled with the support service.</p>
                  </div>
                  <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-bold text-amber-700">Coming soon</span>
                </div>

                <form className="mt-8 grid gap-5" aria-label="Contact form unavailable">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="text-sm font-bold text-slate-700">
                      Name
                      <input disabled type="text" placeholder="Your name" className="iclaude-input mt-2 cursor-not-allowed bg-slate-50 text-slate-400" />
                    </label>
                    <label className="text-sm font-bold text-slate-700">
                      Email
                      <input disabled type="email" placeholder="you@example.com" className="iclaude-input mt-2 cursor-not-allowed bg-slate-50 text-slate-400" />
                    </label>
                  </div>
                  <label className="text-sm font-bold text-slate-700">
                    Subject
                    <input disabled type="text" placeholder="How can we help?" className="iclaude-input mt-2 cursor-not-allowed bg-slate-50 text-slate-400" />
                  </label>
                  <label className="text-sm font-bold text-slate-700">
                    Message
                    <textarea disabled rows={5} placeholder="Describe your question or feedback..." className="iclaude-input mt-2 resize-y cursor-not-allowed bg-slate-50 text-slate-400" />
                  </label>
                  <button disabled type="submit" className="rounded-xl bg-slate-200 px-5 py-3.5 text-sm font-bold text-slate-500">Message delivery is coming soon</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="iclaude-container">
            <div className="mx-auto max-w-4xl rounded-[28px] border border-slate-200 bg-[#fbfdff] p-7 sm:p-10">
              <p className="iclaude-eyebrow">Help us help you</p>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.045em] text-slate-950">
                A few details make support faster.
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ["01", "Name the tool", "For example, Image Compressor or PDF to Word."],
                  ["02", "Mention the file type", "Tell us whether you were working with a JPG, PDF, MP4 or another format."],
                  ["03", "Describe what happened", "Include the browser and any message you saw if something did not work."],
                ].map(([number, title, text]) => (
                  <div key={number} className="rounded-2xl bg-white p-5 shadow-sm">
                    <p className="text-xs font-bold tracking-[0.16em] text-blue-600">{number}</p>
                    <h3 className="mt-5 text-base font-bold text-slate-950">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-9 border-t border-slate-200 pt-7 text-center">
                <p className="text-sm text-slate-600">You may be able to finish the task right now with one of the available tools.</p>
                <Link href="/tools/" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700">Browse all tools <ArrowIcon /></Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
