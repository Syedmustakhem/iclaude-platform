import Link from "next/link";
import type { GuideDefinition } from "@/lib/guides";

type GuideCardProps = {
  guide: GuideDefinition;
};

const categoryIcons: Record<GuideDefinition["category"], string> = {
  Images: "◈",
  PDF: "▣",
  Video: "▶",
  General: "✦",
};

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.28)] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_28px_80px_-38px_rgba(15,23,42,0.34)] sm:p-7">
      <div
        aria-hidden="true"
        className="absolute right-[-60px] top-[-70px] h-40 w-40 rounded-full bg-blue-500/[0.06] blur-3xl transition duration-500 group-hover:bg-cyan-400/[0.1]"
      />

      <div className="relative flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600">
          <span aria-hidden="true">{categoryIcons[guide.category]}</span>
          {guide.category}
        </span>

        <span className="text-xs font-semibold text-slate-400">
          {guide.readTime}
        </span>
      </div>

      <div className="relative mt-7">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
          {guide.publishedLabel}
        </p>

        <h2 className="mt-3 text-xl font-black tracking-[-0.03em] text-slate-950 sm:text-2xl">
          {guide.title}
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          {guide.excerpt}
        </p>
      </div>

      <div className="relative mt-auto pt-7">
        <Link
          href={`/guides/${guide.slug}/`}
          className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-950 transition hover:gap-3 hover:text-blue-600"
        >
          Read guide
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}