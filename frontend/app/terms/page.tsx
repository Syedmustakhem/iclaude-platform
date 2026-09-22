import type { Metadata } from "next";
import Link from "next/link";

import {
  generateOrganizationSchema,
  generatePageMetadata,
} from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";

export const metadata: Metadata = generatePageMetadata({
  title: "Terms of Service — iclaude",
  description:
    "Read the iclaude Terms of Service covering use of our online tools, uploaded files, acceptable use, advertising, third-party services and service availability.",
  path: "/terms/",
  keywords: [
    "iclaude terms",
    "iclaude terms of service",
    "online tools terms",
    "file processing terms",
    "acceptable use policy",
    "Google AdSense terms",
    "iclaude user agreement",
  ],
});

const sections = [
  { id: "acceptance", number: "01", title: "Acceptance of Terms" },
  { id: "service", number: "02", title: "About iclaude" },
  { id: "eligibility", number: "03", title: "Eligibility & Use" },
  { id: "tools", number: "04", title: "Online Tools" },
  { id: "files", number: "05", title: "Uploaded Files" },
  { id: "acceptable-use", number: "06", title: "Acceptable Use" },
  { id: "intellectual-property", number: "07", title: "Intellectual Property" },
  { id: "third-party", number: "08", title: "Third-Party Services" },
  { id: "advertising", number: "09", title: "Advertising & Google AdSense" },
  { id: "availability", number: "10", title: "Availability & Changes" },
  { id: "disclaimers", number: "11", title: "Disclaimers" },
  { id: "liability", number: "12", title: "Limitation of Liability" },
  { id: "indemnification", number: "13", title: "Indemnification" },
  { id: "changes", number: "14", title: "Changes to These Terms" },
  { id: "law", number: "15", title: "Governing Law" },
  { id: "contact", number: "16", title: "Contact" },
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

function Bullet({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
      <span className="leading-7">{children}</span>
    </li>
  );
}

export default function TermsPage() {
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <StructuredData data={organizationSchema} />

      <main className="overflow-hidden bg-white">
        {/* Hero */}
        <section className="relative border-b border-slate-200 bg-slate-950 text-white">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-24 -top-32 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
          </div>

          <div className="relative iclaude-content py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-5xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-blue-200 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                Legal & Terms
              </div>

              <div className="mt-7 max-w-4xl">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Terms of Service
                </h1>

                <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                  These terms explain the rules and conditions that apply
                  when you access and use iclaude, including our online
                  tools, file-processing features and advertising-supported
                  services.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-300">
                  Last updated: September 21, 2026
                </div>

                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2.5 text-sm text-emerald-200">
                  ✓ Clear & transparent
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust cards */}
        <section className="border-b border-slate-200 bg-slate-50/80">
          <div className="iclaude-content py-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    ✓
                  </div>

                  <div>
                    <p className="font-semibold text-slate-950">
                      Simple service rules
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Clear expectations for using iclaude.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    ◈
                  </div>

                  <div>
                    <p className="font-semibold text-slate-950">
                      Advertising disclosed
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Advertising-supported access is explained.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    🔒
                  </div>

                  <div>
                    <p className="font-semibold text-slate-950">
                      Responsible use
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Use the platform lawfully and responsibly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="iclaude-content">
            <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
              {/* Navigation */}
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
                        <span className="font-mono text-[10px] font-bold text-slate-400 group-hover:text-blue-500">
                          {section.number}
                        </span>

                        <span>{section.title}</span>
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="mt-4 hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 lg:block">
                  <p className="text-sm font-semibold text-slate-950">
                    Need clarification?
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    If you have a question about these terms, contact the
                    iclaude team.
                  </p>

                  <Link
                    href="/contact/"
                    className="mt-4 inline-flex text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    Contact us →
                  </Link>
                </div>
              </aside>

              {/* Terms */}
              <article className="min-w-0">
                <div className="space-y-6">
                  {/* 01 */}
                  <section
                    id="acceptance"
                    className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="01"
                      title="Acceptance of Terms"
                      eyebrow="Getting started"
                    />

                    <div className="mt-7 space-y-4 text-slate-600">
                      <p className="leading-8">
                        By accessing or using iclaude, you agree to be bound
                        by these Terms of Service and any policies referenced
                        by these terms, including our Privacy Policy.
                      </p>

                      <p className="leading-8">
                        If you do not agree with these terms, you should not
                        access or use the iclaude service.
                      </p>
                    </div>
                  </section>

                  {/* 02 */}
                  <section
                    id="service"
                    className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="02"
                      title="About iclaude"
                    />

                    <div className="mt-7 space-y-4 text-slate-600">
                      <p className="leading-8">
                        iclaude provides online utilities designed to help
                        users perform common digital tasks involving files
                        such as images, PDFs, videos and other supported
                        content.
                      </p>

                      <p className="leading-8">
                        Available tools, features, file formats, limits and
                        processing methods may change over time as the
                        platform develops.
                      </p>

                      <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
                        <p className="font-semibold text-slate-950">
                          Service evolution
                        </p>

                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          New tools and features may be introduced, while
                          existing features may be modified, replaced,
                          restricted or discontinued.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 03 */}
                  <section
                    id="eligibility"
                    className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="03"
                      title="Eligibility & Use"
                    />

                    <div className="mt-7 space-y-4 text-slate-600">
                      <p className="leading-8">
                        You are responsible for ensuring that your use of
                        iclaude is permitted under the laws and regulations
                        applicable to you.
                      </p>

                      <ul className="space-y-3">
                        <Bullet>
                          Provide accurate information when you voluntarily
                          communicate with iclaude.
                        </Bullet>

                        <Bullet>
                          Use the service only for lawful and legitimate
                          purposes.
                        </Bullet>

                        <Bullet>
                          Respect the rights, privacy and intellectual
                          property of other people.
                        </Bullet>

                        <Bullet>
                          Maintain control over files and content that you
                          submit to the service.
                        </Bullet>
                      </ul>
                    </div>
                  </section>

                  {/* 04 */}
                  <section
                    id="tools"
                    className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="04"
                      title="Online Tools"
                      eyebrow="Using iclaude"
                    />

                    <div className="mt-7 space-y-4 text-slate-600">
                      <p className="leading-8">
                        iclaude tools are provided to perform specific
                        operations based on the functionality available at
                        the time of use.
                      </p>

                      <p className="leading-8">
                        Results may depend on the file, format, size,
                        processing method, browser, device and other
                        technical conditions.
                      </p>

                      <p className="leading-8">
                        You are responsible for reviewing generated or
                        processed files before relying on them for important
                        personal, professional, legal or business purposes.
                      </p>
                    </div>
                  </section>

                  {/* 05 */}
                  <section
                    id="files"
                    className="scroll-mt-24 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/80 via-white to-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="05"
                      title="Uploaded Files"
                      eyebrow="Your content"
                    />

                    <div className="mt-7 space-y-4 text-slate-600">
                      <p className="leading-8">
                        You retain responsibility for files and other content
                        that you upload or submit through iclaude.
                      </p>

                      <p className="leading-8">
                        You represent that you have the necessary rights,
                        permissions or authority to upload, process or
                        otherwise use the content you submit.
                      </p>

                      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                        <p className="font-semibold text-slate-950">
                          Important
                        </p>

                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          Do not upload content that you are prohibited from
                          processing, sharing or modifying.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 06 */}
                  <section
                    id="acceptable-use"
                    className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="06"
                      title="Acceptable Use"
                    />

                    <p className="mt-7 leading-8 text-slate-600">
                      You must not use iclaude to:
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {[
                        "Break or violate applicable laws or regulations.",
                        "Upload or process content you do not have permission to use.",
                        "Attempt to gain unauthorized access to systems or accounts.",
                        "Interfere with, disrupt or overload the service.",
                        "Circumvent technical limits or security controls.",
                        "Use automated activity in a way that harms service availability.",
                        "Distribute malicious software or harmful code.",
                        "Abuse the service, infrastructure or other users.",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
                            !
                          </span>

                          <span className="text-sm leading-6 text-slate-600">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* 07 */}
                  <section
                    id="intellectual-property"
                    className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="07"
                      title="Intellectual Property"
                    />

                    <div className="mt-7 space-y-4 text-slate-600">
                      <p className="leading-8">
                        Unless otherwise stated, the iclaude name, branding,
                        website design, interface, original content,
                        software and other platform materials are owned by
                        or licensed to iclaude and may be protected by
                        applicable intellectual property laws.
                      </p>

                      <p className="leading-8">
                        These terms do not grant you ownership of iclaude
                        intellectual property. You may not copy, reproduce,
                        modify, distribute or exploit platform materials
                        except as permitted by law or with appropriate
                        permission.
                      </p>

                      <p className="leading-8">
                        You remain responsible for the intellectual property
                        rights associated with content you upload or process.
                      </p>
                    </div>
                  </section>

                  {/* 08 */}
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
                        iclaude may use third-party services and infrastructure
                        for hosting, security, analytics, advertising,
                        communications, file processing and other operational
                        functions.
                      </p>

                      <p className="leading-8">
                        Third-party services may have their own terms,
                        policies and requirements. Your use of those services
                        may therefore be subject to the applicable
                        third-party terms.
                      </p>

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <p className="font-semibold text-slate-950">
                          External services
                        </p>

                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          iclaude does not control the independent policies
                          or practices of third-party service providers.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 09 */}
                  <section
                    id="advertising"
                    className="scroll-mt-24 rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-blue-50 p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="09"
                      title="Advertising & Google AdSense"
                      eyebrow="Advertising-supported service"
                    />

                    <div className="mt-7 space-y-4 text-slate-600">
                      <p className="leading-8">
                        iclaude may display advertisements through Google
                        AdSense and other advertising services to help support
                        the operation, maintenance and development of free
                        online tools.
                      </p>

                      <p className="leading-8">
                        Advertisements may be provided by third-party
                        advertising providers. The advertisements shown to
                        users may vary depending on factors such as available
                        advertising inventory, contextual information,
                        settings, consent choices and other applicable
                        conditions.
                      </p>

                      <p className="leading-8">
                        Google and other advertising providers may use
                        cookies or similar technologies in connection with
                        advertising. Details about information handling and
                        available advertising controls are described in our{" "}
                        <Link
                          href="/privacy/"
                          className="font-semibold text-blue-600 underline decoration-blue-200 underline-offset-4 hover:text-blue-700"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </p>

                      <div className="rounded-2xl border border-violet-200 bg-white/80 p-5 shadow-sm">
                        <div className="flex gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                            ◉
                          </div>

                          <div>
                            <p className="font-semibold text-slate-950">
                              Advertising does not change these terms
                            </p>

                            <p className="mt-2 text-sm leading-7 text-slate-600">
                              Your use of iclaude remains subject to these
                              Terms of Service whether or not advertisements
                              are displayed during your visit.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 10 */}
                  <section
                    id="availability"
                    className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="10"
                      title="Availability & Changes"
                    />

                    <div className="mt-7 space-y-4 text-slate-600">
                      <p className="leading-8">
                        We aim to keep iclaude available and functional, but
                        we do not guarantee that the service will always be
                        available, uninterrupted or error-free.
                      </p>

                      <p className="leading-8">
                        The service may occasionally be unavailable because
                        of maintenance, upgrades, infrastructure issues,
                        security events, third-party outages or other
                        circumstances.
                      </p>

                      <p className="leading-8">
                        We may modify, suspend, restrict or discontinue parts
                        of the service as the platform develops.
                      </p>
                    </div>
                  </section>

                  {/* 11 */}
                  <section
                    id="disclaimers"
                    className="scroll-mt-24 rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50/70 via-white to-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="11"
                      title="Disclaimers"
                      eyebrow="Important information"
                    />

                    <div className="mt-7 space-y-4 text-slate-600">
                      <p className="leading-8">
                        iclaude tools are provided for general utility
                        purposes. To the extent permitted by applicable law,
                        the service and its features are provided without
                        guarantees that results will always be accurate,
                        complete, uninterrupted or suitable for every
                        particular purpose.
                      </p>

                      <p className="leading-8">
                        You are responsible for determining whether a
                        processed file or generated result is appropriate
                        before relying on it.
                      </p>

                      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                        <p className="font-semibold text-slate-950">
                          Review important results
                        </p>

                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          Always review important files, conversions and
                          outputs before using them for critical decisions,
                          submissions or business purposes.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 12 */}
                  <section
                    id="liability"
                    className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="12"
                      title="Limitation of Liability"
                    />

                    <div className="mt-7 space-y-4 text-slate-600">
                      <p className="leading-8">
                        To the maximum extent permitted by applicable law,
                        iclaude and its operators, contributors and service
                        providers will not be responsible for indirect,
                        incidental, special, consequential or similar losses
                        arising from or related to your use of the service.
                      </p>

                      <p className="leading-8">
                        This may include losses relating to service
                        interruptions, inability to access the service, file
                        processing issues, data loss or other technical
                        circumstances, subject to applicable law.
                      </p>

                      <p className="leading-8">
                        Nothing in these terms is intended to exclude or
                        restrict liability where applicable law does not
                        permit such exclusion or restriction.
                      </p>
                    </div>
                  </section>

                  {/* 13 */}
                  <section
                    id="indemnification"
                    className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="13"
                      title="Indemnification"
                    />

                    <p className="mt-7 leading-8 text-slate-600">
                      To the extent permitted by applicable law, you agree to
                      be responsible for claims, losses, liabilities and
                      reasonable expenses arising from your unlawful use of
                      iclaude, violation of these terms, infringement of
                      another person&apos;s rights, or content that you submit
                      through the service.
                    </p>
                  </section>

                  {/* 14 */}
                  <section
                    id="changes"
                    className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="14"
                      title="Changes to These Terms"
                    />

                    <div className="mt-7 space-y-4 text-slate-600">
                      <p className="leading-8">
                        These Terms of Service may be updated when iclaude
                        introduces new functionality, changes its
                        infrastructure, modifies its business practices or
                        needs to address legal or operational requirements.
                      </p>

                      <p className="leading-8">
                        The latest version will be published on this page
                        together with its updated date.
                      </p>

                      <p className="leading-8">
                        Your continued use of iclaude after an updated version
                        becomes available may constitute acceptance of the
                        updated terms to the extent permitted by applicable
                        law.
                      </p>
                    </div>
                  </section>

                  {/* 15 */}
                  <section
                    id="law"
                    className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                  >
                    <SectionHeader
                      number="15"
                      title="Governing Law"
                    />

                    <div className="mt-7 space-y-4 text-slate-600">
                      <p className="leading-8">
                        These terms and the relationship between you and
                        iclaude are intended to be governed by applicable
                        laws and regulations.
                      </p>

                      <p className="leading-8">
                        Any specific jurisdiction, venue or dispute-resolution
                        provisions may be stated or updated as the legal
                        structure of iclaude is formally established.
                      </p>
                    </div>
                  </section>

                  {/* 16 */}
                  <section
                    id="contact"
                    className="scroll-mt-24 overflow-hidden rounded-3xl bg-slate-950 p-7 text-white shadow-xl sm:p-9"
                  >
                    <SectionHeader
                      number="16"
                      title="Contact"
                    />

                    <div className="mt-7 max-w-2xl">
                      <p className="leading-8 text-slate-300">
                        If you have questions about these Terms of Service,
                        acceptable use, advertising, online tools or any
                        other aspect of iclaude, please contact us.
                      </p>

                      <Link
                        href="/contact/"
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
                  These Terms describe the intended rules for using iclaude.
                  Specific features, processing methods, service limits and
                  third-party integrations may change as the platform
                  develops.
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white">
          <div className="iclaude-content py-14 sm:py-16">
            <div className="mx-auto max-w-4xl rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50 p-7 text-center shadow-sm sm:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-600">
                Questions?
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Need clarification about our terms?
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                We want the rules around iclaude to be easy to understand.
                Reach out if you have a question about using the platform.
              </p>

              <Link
                href="/contact/"
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