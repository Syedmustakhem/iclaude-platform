import Link from "next/link";
import type { ToolDefinition } from "@/lib/tools";

type ToolCardProps = {
  tool: ToolDefinition;
};

export default function ToolCard({
  tool,
}: ToolCardProps) {
  return (
    <Link
      href={tool.href}
      className="group block h-full"
      aria-label={`Open ${tool.name}`}
    >
      <article className="iclaude-card flex h-full flex-col p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl"
            aria-hidden="true"
          >
            {tool.icon}
          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {tool.category}
          </span>
        </div>

        <h2 className="text-xl font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
          {tool.name}
        </h2>

        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
          {tool.shortDescription}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-sm font-medium text-blue-600">
            Use tool
          </span>

          <span
            aria-hidden="true"
            className="text-slate-400 transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </article>
    </Link>
  );
}