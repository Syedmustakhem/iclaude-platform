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
    "Read the iclaude privacy policy covering website usage, uploaded files, temporary processing data, analytics and user rights.",
  path: "/privacy",
  keywords: [
    "iclaude privacy policy",
    "file upload privacy",
    "online tools privacy",
    "iclaude data privacy",
  ],
});

export default function PrivacyPage() {
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <StructuredData data={organizationSchema} />

      <main>
        <section className="border-b border-slate-100 bg-gradient-to-b from-blue-50/70 via-white to-white">
          <div className="iclaude-content py-14 sm:py-20">
            <div className="mx-auto max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Legal
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                Privacy Policy
              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                This policy explains how iclaude is intended to
                handle information when you use our website and
                online file tools.
              </p>

              <p className="mt-4 text-sm text-slate-500">
                Last updated: September 21, 2026
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <article className="iclaude-content">
            <div className="mx-auto max-w-4xl space-y-12 text-slate-600">
              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  1. Introduction
                </h2>

                <p className="mt-4 leading-8">
                  iclaude provides online tools for common image,
                  PDF and video file tasks. We aim to collect and
                  use only the information needed to operate,
                  secure and improve the service.
                </p>

                <p className="mt-4 leading-8">
                  By using iclaude, you acknowledge that you have
                  read this Privacy Policy. If you do not agree
                  with this policy, please do not use the service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  2. Information You Provide
                </h2>

                <p className="mt-4 leading-8">
                  Depending on the features available at the
                  time you use iclaude, you may provide information
                  such as your name, email address, messages sent
                  through our contact channels, and files submitted
                  to our tools.
                </p>

                <p className="mt-4 leading-8">
                  We do not require you to create an account simply
                  to use the public tool pages unless a future
                  feature specifically requires an account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  3. Uploaded Files
                </h2>

                <p className="mt-4 leading-8">
                  Some iclaude tools require you to upload a file
                  for processing. Uploaded files may temporarily
                  pass through our processing infrastructure so the
                  requested operation can be completed.
                </p>

                <p className="mt-4 leading-8">
                  iclaude is designed to avoid retaining uploaded
                  files longer than necessary for the requested
                  processing workflow. Exact storage and deletion
                  behavior may depend on the tool and its
                  underlying processing infrastructure.
                </p>

                <p className="mt-4 leading-8">
                  Do not upload files containing information that
                  you are not authorized to process or share.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  4. How Information May Be Used
                </h2>

                <p className="mt-4 leading-8">
                  Information may be used to:
                </p>

                <ul className="mt-4 list-disc space-y-2 pl-6 leading-8">
                  <li>Provide requested tools and file processing.</li>
                  <li>Respond to support and contact requests.</li>
                  <li>Maintain and secure the website.</li>
                  <li>Detect abuse, fraud or excessive automated use.</li>
                  <li>Understand service performance and usage.</li>
                  <li>Improve existing tools and develop new features.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  5. Technical Information
                </h2>

                <p className="mt-4 leading-8">
                  When you access a website, technical information
                  may be processed by our hosting, security,
                  analytics or infrastructure providers. This can
                  include information such as IP address, browser
                  type, device information, requested pages,
                  approximate timestamps and technical error data.
                </p>

                <p className="mt-4 leading-8">
                  This information may be used for security,
                  diagnostics, performance monitoring and service
                  improvement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  6. Cookies and Similar Technologies
                </h2>

                <p className="mt-4 leading-8">
                  iclaude may use cookies or similar technologies
                  when they are necessary for website functionality,
                  security, analytics or other supported features.
                </p>

                <p className="mt-4 leading-8">
                  If advertising or third-party analytics are
                  introduced, their use and applicable controls
                  will be reflected in the relevant privacy and
                  consent information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  7. Third-Party Services
                </h2>

                <p className="mt-4 leading-8">
                  iclaude may rely on third-party infrastructure
                  and service providers for functions such as
                  hosting, storage, file processing, security,
                  analytics, communications and other operational
                  requirements.
                </p>

                <p className="mt-4 leading-8">
                  Those providers may process information on behalf
                  of iclaude as necessary to provide their services.
                  Their own privacy policies may also apply to their
                  processing activities.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  8. Data Security
                </h2>

                <p className="mt-4 leading-8">
                  We intend to use reasonable technical and
                  organizational safeguards to protect information
                  handled by iclaude.
                </p>

                <p className="mt-4 leading-8">
                  However, no internet service or method of
                  electronic transmission can be guaranteed to be
                  completely secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  9. Data Retention
                </h2>

                <p className="mt-4 leading-8">
                  Information is intended to be retained only for
                  as long as reasonably necessary for the purpose
                  for which it was collected, including operational,
                  security, legal and dispute-resolution needs.
                </p>

                <p className="mt-4 leading-8">
                  Temporary files generated during processing may
                  have shorter retention periods than account,
                  support or operational records.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  10. Children's Privacy
                </h2>

                <p className="mt-4 leading-8">
                  iclaude is not intentionally designed to collect
                  personal information from children. If you believe
                  a child has provided personal information through
                  the service, please contact us so that the
                  situation can be reviewed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  11. Your Choices
                </h2>

                <p className="mt-4 leading-8">
                  Depending on the information involved and the
                  applicable law, you may have rights relating to
                  access, correction, deletion, restriction,
                  objection or other forms of control over personal
                  information.
                </p>

                <p className="mt-4 leading-8">
                  To ask a privacy-related question or request,
                  contact us through the{" "}
                  <Link
                    href="/contact"
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    contact page
                  </Link>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  12. Changes to This Policy
                </h2>

                <p className="mt-4 leading-8">
                  This Privacy Policy may be updated as iclaude
                  introduces new features, changes its
                  infrastructure or updates its legal and
                  operational requirements.
                </p>

                <p className="mt-4 leading-8">
                  The updated version will be published on this
                  page with a revised update date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  13. Contact
                </h2>

                <p className="mt-4 leading-8">
                  For privacy questions or requests, please use the
                  iclaude contact page.
                </p>

                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Contact iclaude
                </Link>
              </section>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}