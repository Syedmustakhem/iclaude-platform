import Link from "next/link";

import type { ToolDefinition } from "@/lib/tools";

type ToolCardProps = {
  tool: ToolDefinition;
};

export function ToolIcon({ icon }: { icon: ToolDefinition["icon"] }) {
  const shared = {
    viewBox: "0 0 24 24",
    className: "h-6 w-6",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    "aria-hidden": true,
  } as const;

  if (icon === "compress" || icon === "video-compress") {
    return (
      <svg {...shared}>
        <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
        {icon === "video-compress" ? (
          <path d="m10 9 5 3-5 3z" />
        ) : (
          <path d="M8 12h8M12 8v8" />
        )}
      </svg>
    );
  }

  if (icon === "resize") {
    return (
      <svg {...shared}>
        <path d="M5 9V5h4M15 5h4v4M19 15v4h-4M9 19H5v-4" />
        <path d="M5 5l5 5m9-5-5 5m5 9-5-5m-9 5 5-5" />
      </svg>
    );
  }

  if (icon === "background") {
    return (
      <svg {...shared}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <circle cx="9" cy="9" r="1.5" />
        <path d="m20 16-4.5-4.5L9 18m-5 2 4-4" />
      </svg>
    );
  }

  return (
    <svg {...shared}>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
  );
}

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
              <ToolIcon icon={tool.icon} />
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
