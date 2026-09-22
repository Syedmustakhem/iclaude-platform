import Link from "next/link";

import type { ToolDefinition } from "@/lib/tools";

type ToolCardProps = {
  tool: ToolDefinition;
};

export function ToolIcon({
  icon,
}: {
  icon: ToolDefinition["icon"];
}) {
  const shared = {
    viewBox: "0 0 24 24",
    className: "h-6 w-6",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (icon === "compress" || icon === "video-compress") {
    return (
      <svg {...shared}>
        <path d="M8 3H5a2 2 0 0 0-2 2v3" />
        <path d="M16 3h3a2 2 0 0 1 2 2v3" />
        <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
        <path d="M16 21h3a2 2 0 0 0 2-2v-3" />

        {icon === "video-compress" ? (
          <path d="m10 9 5 3-5 3z" />
        ) : (
          <>
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </>
        )}
      </svg>
    );
  }

  if (icon === "resize") {
    return (
      <svg {...shared}>
        <path d="M5 9V5h4" />
        <path d="M15 5h4v4" />
        <path d="M19 15v4h-4" />
        <path d="M9 19H5v-4" />
        <path d="M5 5l5 5" />
        <path d="m19 5-5 5" />
        <path d="m19 19-5-5" />
        <path d="m5 19 5-5" />
      </svg>
    );
  }

  if (icon === "background") {
    return (
      <svg {...shared}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <circle cx="9" cy="9" r="1.5" />
        <path d="m20 16-4.5-4.5L9 18" />
        <path d="m4 20 4-4" />
      </svg>
    );
  }

  return (
    <svg {...shared}>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 10h11" />
      <path d="m11 5 5 5-5 5" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 2 1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z" />
    </svg>
  );
}

function getIconTheme(icon: ToolDefinition["icon"]) {
  if (icon === "compress") {
    return {
      surface: "bg-blue-50 border-blue-100",
      icon: "text-blue-600",
      glow: "bg-blue-400/20",
    };
  }

  if (icon === "video-compress") {
    return {
      surface: "bg-cyan-50 border-cyan-100",
      icon: "text-cyan-600",
      glow: "bg-cyan-400/20",
    };
  }

  if (icon === "resize") {
    return {
      surface: "bg-violet-50 border-violet-100",
      icon: "text-violet-600",
      glow: "bg-violet-400/20",
    };
  }

  if (icon === "background") {
    return {
      surface: "bg-emerald-50 border-emerald-100",
      icon: "text-emerald-600",
      glow: "bg-emerald-400/20",
    };
  }

  return {
    surface: "bg-amber-50 border-amber-100",
    icon: "text-amber-600",
    glow: "bg-amber-400/20",
  };
}

export default function ToolCard({ tool }: ToolCardProps) {
  const theme = getIconTheme(tool.icon);

  return (
    <Link
      href={tool.href}
      aria-label={`Open ${tool.name}`}
      className="group block h-full rounded-[28px] outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4"
    >
      <article className="relative flex h-full min-h-[310px] flex-col overflow-hidden rounded-[28px] border border-slate-200/90 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.045)] transition-all duration-500 ease-out hover:-translate-y-2 hover:border-slate-300 hover:shadow-[0_24px_65px_rgba(15,23,42,0.11)] sm:p-7">
        {/* Ambient hover glow */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full ${theme.glow} opacity-0 blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-100`}
        />

        {/* Top shine */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/0 to-transparent transition-all duration-500 group-hover:via-blue-400/60"
        />

        <div className="relative flex h-full flex-col">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div
              aria-hidden="true"
              className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${theme.surface} ${theme.icon} shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:-rotate-1 group-hover:shadow-md`}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl bg-white/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <span className="relative">
                <ToolIcon icon={tool.icon} />
              </span>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-slate-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-slate-500 transition-colors duration-300 group-hover:border-blue-100 group-hover:bg-blue-50 group-hover:text-blue-600">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-current opacity-60"
              />
              {tool.category}
            </span>
          </div>

          {/* Content */}
          <div className="mt-7">
            <h2 className="text-[21px] font-extrabold tracking-[-0.035em] text-slate-950 transition-colors duration-300 group-hover:text-blue-600">
              {tool.name}
            </h2>

            <p className="mt-3 min-h-[72px] max-w-[32rem] text-sm leading-6 text-slate-600">
              {tool.shortDescription}
            </p>
          </div>

          {/* Feature indicator */}
          <div className="mt-5 flex items-center gap-2 text-[11px] font-semibold text-slate-400">
            <span
              aria-hidden="true"
              className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"
            >
              <svg
                viewBox="0 0 20 20"
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m4 10 4 4 8-9" />
              </svg>
            </span>

            Browser-based workflow
          </div>

          {/* Footer */}
          <div className="mt-auto pt-7">
            <div className="border-t border-slate-100 pt-5">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-950 transition-colors duration-300 group-hover:text-blue-600">
                  Use tool
                  <span className="text-slate-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-blue-400">
                    <SparkIcon />
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-slate-950 group-hover:text-white"
                >
                  <ArrowIcon />
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}