import type { Metadata } from "next";
import Link from "next/link";
import {
  generateOrganizationSchema,
  generatePageMetadata,
} from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";

export const metadata: Metadata = generatePageMetadata({
  title: "Privacy Policy — iclaude",
  description:
    "Learn how iclaude handles uploaded files, technical information, cookies, Google AdSense advertising, third-party services and privacy requests.",
  path: "/privacy",
  keywords: [
    "iclaude privacy policy",
    "iclaude data privacy",
    "Google AdSense privacy",
    "advertising cookies",
    "file upload privacy",
    "online tools privacy",
    "data retention",
    "cookie policy",
    "user privacy rights",
  ],
});

const sections = [
  { id: "introduction", number: "01", title: "Introduction" },
  { id: "information", number: "02", title: "Information You Provide" },
  { id: "uploaded-files", number: "03", title: "Uploaded Files" },
  { id: "usage", number: "04", title: "How Information May Be Used" },
  { id: "technical", number: "05", title: "Technical Information" },
  { id: "cookies", number: "06", title: "Cookies & Similar Technologies" },
  { id: "advertising", number: "07", title: "Google AdSense & Advertising" },
  { id: "third-party", number: "08", title: "Third-Party Services" },
  { id: "security", number: "09", title: "Data Security" },
  { id: "retention", number: "10", title: "Data Retention" },
  { id: "children", number: "11", title: "Children's Privacy" },
  { id: "choices", number: "12", title: "Your Choices" },
  { id: "changes", number: "13", title: "Changes to This Policy" },
  { id: "contact", number: "14", title: "Contact" },
];

function SectionHeader({
  number,
  title,
  eyebrow,
}: {
  number: string;
  title: string;
  eyebrow?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-xs font-bold text-blue-600">
        {number}
      </div>

      <div>
        {eyebrow ? (
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
            {eyebrow}
          </p>
        ) : null}

        <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          {title}
        </h2>
      </div>
    </div>
  );
}

export default function PrivacyPage() {
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <StructuredData data={organizationSchema} />

      <main className="overflow-hidden bg-white">
        {/* Hero */}
        <section className="relative border-b border-slate-200 bg-slate-950 text-white">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-24 -top-32 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
          </div>

          <div className="relative iclaude-content py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-5xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-blue-200 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                Legal & Privacy
              </div>

              <div className="mt-7 max-w-4xl">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Privacy Policy
                </h1>

                <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                  This policy explains how iclaude is intended to handle
                  information when you use our website, online tools,
                  file-processing features and advertising-supported
                  services.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-300">
                  <span className="text-blue-300">●</span>
                  Last updated: September 21, 2026
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2.5 text-sm text-emerald-200">
                  <span>✓</span>
                  Transparency first
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="border-b border-slate-200 bg-slate-50/80">
          <div className="iclaude-content py-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    🔒
                  </div>
                  <div>
                    <p className="font-semibold text-slate-950">
                      Privacy-focused
                    </p>
                    <p className="text-sm text-slate-500">
                      Information is handled for defined purposes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    ◈
                  </div>
                  <div>
                    <p className="font-semibold text-slate-950">
                      Advertising disclosed
                    </p>
                    <p className="text-sm text-slate-500">
                      Google AdSense use is explained clearly.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    ✓
                  </div>
                  <div>
                    <p className="font-semibold text-slate-950">
                      User choices
                    </p>
                    <p className="text-sm text-slate-500">
                      Privacy-related requests can be submitted.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="iclaude-content">
            <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
              {/* Sticky navigation */}
              <aside className="lg:sticky lg:top-24">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="px-3 pb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    On this page
                  </p>

                  <nav className="space-y-1">
                    {sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
                      >
                        <span className="font-mono text-[10px] font-bold text-slate-400 transition group-hover:text-blue-500">
                          {section.number}
                        </span>

                        <span>{section.title}</span>
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="mt-4 hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 lg:block">
                  <p className="text-sm font-semibold text-slate-950">
                    Have a privacy question?
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Contact the iclaude team for privacy-related questions
                    or requests.
                  </p>

                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    Contact us
                    <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                </div>
              </aside>

              {/* Policy */}
              <article className="min-w-0">
                <div className="space-y-6">
                  {/* Introduction */}
                  <section
                    id="introduction"
                    className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="01"
                      title="Introduction"
                      eyebrow="About this policy"
                    />

                    <div className="mt-7 space-y-4 text-slate-600">
                      <p className="leading-8">
                        iclaude provides online tools for common image, PDF
                        and video file tasks. We aim to collect and use only
                        the information needed to operate, secure and improve
                        the service.
                      </p>

                      <p className="leading-8">
                        By using iclaude, you acknowledge that you have read
                        this Privacy Policy. If you do not agree with this
                        policy, please do not use the service.
                      </p>
                    </div>
                  </section>

                  {/* Information */}
                  <section
                    id="information"
                    className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="02"
                      title="Information You Provide"
                    />

                    <div className="mt-7 space-y-4 text-slate-600">
                      <p className="leading-8">
                        Depending on the features available at the time you
                        use iclaude, you may provide information such as your
                        name, email address, messages sent through our
                        contact channels, and files submitted to our tools.
                      </p>

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <p className="text-sm font-semibold text-slate-950">
                          Public tools
                        </p>

                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          We do not require you to create an account simply
                          to use the public tool pages unless a future
                          feature specifically requires an account.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Uploaded files */}
                  <section
                    id="uploaded-files"
                    className="scroll-mt-24 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/80 via-white to-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="03"
                      title="Uploaded Files"
                      eyebrow="File processing"
                    />

                    <div className="mt-7 space-y-4 text-slate-600">
                      <p className="leading-8">
                        Some iclaude tools require you to upload a file for
                        processing. Uploaded files may temporarily pass
                        through our processing infrastructure so the
                        requested operation can be completed.
                      </p>

                      <p className="leading-8">
                        iclaude is designed to avoid retaining uploaded
                        files longer than necessary for the requested
                        processing workflow. Exact storage and deletion
                        behavior may depend on the tool and its underlying
                        processing infrastructure.
                      </p>

                      <div className="flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                        <div className="mt-0.5 text-xl">⚠️</div>

                        <div>
                          <p className="font-semibold text-slate-950">
                            Upload responsibly
                          </p>

                          <p className="mt-1 text-sm leading-7 text-slate-600">
                            Do not upload files containing information that
                            you are not authorized to process or share.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Usage */}
                  <section
                    id="usage"
                    className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="04"
                      title="How Information May Be Used"
                    />

                    <p className="mt-7 leading-8 text-slate-600">
                      Information may be used to:
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {[
                        "Provide requested tools and file processing.",
                        "Respond to support and contact requests.",
                        "Maintain and secure the website.",
                        "Detect abuse, fraud or excessive automated use.",
                        "Understand service performance and usage.",
                        "Improve existing tools and develop new features.",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                            ✓
                          </span>

                          <span className="text-sm leading-6 text-slate-600">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Technical */}
                  <section
                    id="technical"
                    className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="05"
                      title="Technical Information"
                    />

                    <div className="mt-7 space-y-4 text-slate-600">
                      <p className="leading-8">
                        When you access a website, technical information may
                        be processed by our hosting, security, analytics or
                        infrastructure providers. This can include
                        information such as IP address, browser type, device
                        information, requested pages, approximate timestamps
                        and technical error data.
                      </p>

                      <p className="leading-8">
                        This information may be used for security,
                        diagnostics, performance monitoring and service
                        improvement.
                      </p>
                    </div>
                  </section>

                  {/* Cookies */}
                  <section
                    id="cookies"
                    className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="06"
                      title="Cookies & Similar Technologies"
                    />

                    <div className="mt-7 space-y-4 text-slate-600">
                      <p className="leading-8">
                        iclaude may use cookies, local storage and similar
                        technologies for website functionality, security,
                        analytics, advertising and other supported features.
                      </p>

                      <p className="leading-8">
                        These technologies may help us remember preferences,
                        understand how visitors use the website, maintain
                        security, measure performance and support advertising
                        functionality.
                      </p>

                      <p className="leading-8">
                        Some cookies or similar technologies may be placed or
                        accessed by third-party service providers, including
                        advertising and analytics providers. Their use of
                        information is governed by their respective privacy
                        policies and applicable settings.
                      </p>
                    </div>
                  </section>

                  {/* AdSense */}
                  <section
                    id="advertising"
                    className="scroll-mt-24 rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-blue-50 p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="07"
                      title="Google AdSense & Advertising"
                      eyebrow="Advertising transparency"
                    />

                    <div className="mt-7 space-y-4 text-slate-600">
                      <p className="leading-8">
                        iclaude may display advertisements through Google
                        AdSense and other advertising services in order to
                        support the operation and development of the website
                        and its free online tools.
                      </p>

                      <p className="leading-8">
                        Google and its advertising partners may use cookies,
                        advertising identifiers and similar technologies to
                        deliver, measure and personalize advertisements.
                        Depending on applicable settings, permissions and
                        user choices, advertisements may be based on
                        information such as a visitor&apos;s interaction with
                        this website or other websites and services.
                      </p>

                      <p className="leading-8">
                        Google may use advertising cookies to help serve
                        advertisements based on a user&apos;s previous visits
                        to this website or other websites. Google also
                        provides controls that allow users to manage or opt
                        out of personalized advertising.
                      </p>

                      <p className="leading-8">
                        Users can manage personalized advertising preferences
                        through Google&apos;s advertising settings. Where
                        available, users may also control advertising choices
                        through controls or links provided with
                        advertisements.
                      </p>

                      <p className="leading-8">
                        iclaude does not control the information practices of
                        Google or other third-party advertising providers.
                        Their processing of information is subject to their
                        own privacy policies, terms and applicable settings.
                      </p>

                      <div className="mt-7 rounded-2xl border border-violet-200 bg-white/80 p-5 shadow-sm">
                        <div className="flex gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                            ◉
                          </div>

                          <div>
                            <p className="font-semibold text-slate-950">
                              Why we use advertising
                            </p>

                            <p className="mt-2 text-sm leading-7 text-slate-600">
                              Advertising helps us support free access to
                              iclaude tools. The advertisements displayed may
                              vary depending on available inventory,
                              contextual information, user settings and
                              applicable consent requirements.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Third party */}
                  <section
                    id="third-party"
                    className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="08"
                      title="Third-Party Services"
                    />

                    <div className="mt-7 space-y-4 text-slate-600">
                      <p className="leading-8">
                        iclaude may rely on third-party infrastructure and
                        service providers for functions such as hosting,
                        storage, file processing, security, analytics,
                        communications, advertising and other operational
                        requirements.
                      </p>

                      <p className="leading-8">
                        Those providers may process information on behalf of
                        iclaude as necessary to provide their services. Their
                        own privacy policies may also apply to their
                        processing activities.
                      </p>
                    </div>
                  </section>

                  {/* Security */}
                  <section
                    id="security"
                    className="scroll-mt-24 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="09"
                      title="Data Security"
                      eyebrow="Protecting information"
                    />

                    <div className="mt-7 space-y-4 text-slate-600">
                      <p className="leading-8">
                        We intend to use reasonable technical and
                        organizational safeguards to protect information
                        handled by iclaude.
                      </p>

                      <p className="leading-8">
                        However, no internet service or method of electronic
                        transmission can be guaranteed to be completely
                        secure.
                      </p>

                      <div className="flex gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                          🔐
                        </div>

                        <div>
                          <p className="font-semibold text-slate-950">
                            Security principle
                          </p>

                          <p className="mt-1 text-sm leading-7 text-slate-600">
                            We aim to use appropriate safeguards while
                            recognizing that no online system can provide an
                            absolute security guarantee.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Retention */}
                  <section
                    id="retention"
                    className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="10"
                      title="Data Retention"
                    />

                    <div className="mt-7 space-y-4 text-slate-600">
                      <p className="leading-8">
                        Information is intended to be retained only for as
                        long as reasonably necessary for the purpose for
                        which it was collected, including operational,
                        security, legal and dispute-resolution needs.
                      </p>

                      <p className="leading-8">
                        Temporary files generated during processing may have
                        shorter retention periods than account, support or
                        operational records.
                      </p>
                    </div>
                  </section>

                  {/* Children */}
                  <section
                    id="children"
                    className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="11"
                      title="Children's Privacy"
                    />

                    <p className="mt-7 leading-8 text-slate-600">
                      iclaude is not intentionally designed to collect
                      personal information from children. If you believe a
                      child has provided personal information through the
                      service, please contact us so that the situation can be
                      reviewed.
                    </p>
                  </section>

                  {/* Choices */}
                  <section
                    id="choices"
                    className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="12"
                      title="Your Choices"
                      eyebrow="Privacy requests"
                    />

                    <div className="mt-7 space-y-4 text-slate-600">
                      <p className="leading-8">
                        Depending on the information involved and the
                        applicable law, you may have rights relating to
                        access, correction, deletion, restriction, objection
                        or other forms of control over personal information.
                      </p>

                      <p className="leading-8">
                        To ask a privacy-related question or request, contact
                        us through the{" "}
                        <Link
                          href="/contact"
                          className="font-semibold text-blue-600 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-700"
                        >
                          contact page
                        </Link>
                        .
                      </p>
                    </div>
                  </section>

                  {/* Changes */}
                  <section
                    id="changes"
                    className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="13"
                      title="Changes to This Policy"
                    />

                    <div className="mt-7 space-y-4 text-slate-600">
                      <p className="leading-8">
                        This Privacy Policy may be updated as iclaude
                        introduces new features, changes its infrastructure
                        or updates its legal and operational requirements.
                      </p>

                      <p className="leading-8">
                        The updated version will be published on this page
                        with a revised update date.
                      </p>
                    </div>
                  </section>

                  {/* Contact */}
                  <section
                    id="contact"
                    className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 p-7 text-white shadow-xl sm:p-9"
                  >
                    <div className="absolute" />

                    <SectionHeader
                      number="14"
                      title="Contact"
                    />

                    <div className="mt-7 max-w-2xl">
                      <p className="leading-8 text-slate-300">
                        For privacy questions or requests, please use the
                        iclaude contact page. We encourage you to contact us
                        if you have questions about how information is
                        handled by the service.
                      </p>

                      <Link
                        href="/contact"
                        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-100"
                      >
                        Contact iclaude
                        <span>→</span>
                      </Link>
                    </div>
                  </section>
                </div>

                {/* Bottom notice */}
                <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-500">
                  <strong className="font-semibold text-slate-700">
                    Important:
                  </strong>{" "}
                  This Privacy Policy describes the intended handling of
                  information by iclaude. Specific processing, storage,
                  advertising and third-party practices may depend on the
                  features and infrastructure active at the time you use the
                  service.
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white">
          <div className="iclaude-content py-14 sm:py-16">
            <div className="mx-auto max-w-4xl rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50 p-7 text-center shadow-sm sm:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-600">
                Need help?
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Have a privacy-related question?
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                If you have a question about your information, uploaded files,
                advertising or this policy, our contact page is the best way
                to reach us.
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Contact iclaude
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}