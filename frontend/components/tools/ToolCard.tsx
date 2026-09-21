import Link from "next/link";

import type { ToolDefinition } from "@/lib/tools";

type ToolCardProps = {
  tool: ToolDefinition;
};

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={tool.href}
      aria-label={`Open ${tool.name}`}
      className="group block h-full"
    >
      <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]">
        {/* Hover glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-blue-100/60 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="relative">
          {/* Icon + category */}
          <div className="flex items-start justify-between gap-4">
            <div
              aria-hidden="true"
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-2xl transition-transform duration-300 group-hover:scale-105"
            >
              {tool.icon}
            </div>

            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
              {tool.category}
            </span>
          </div>

          {/* Content */}
          <div className="mt-6">
            <h2 className="text-xl font-bold tracking-tight text-slate-950 transition-colors duration-200 group-hover:text-blue-600">
              {tool.name}
            </h2>

            <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">
              {tool.shortDescription}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-sm font-bold text-blue-600">
              Use tool
            </span>

            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-200 group-hover:translate-x-1 group-hover:bg-blue-600 group-hover:text-white"
            >
              →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}