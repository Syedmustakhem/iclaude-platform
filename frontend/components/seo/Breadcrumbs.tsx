import Link from "next/link";

export type BreadcrumbItem = {
  name: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumbs({
  items,
}: BreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="iclaude-content"
    >
      <ol
        className="flex flex-wrap items-center gap-2 py-4 text-sm text-slate-500"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.name}-${index}`}
              className="flex min-w-0 items-center gap-2"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  itemProp="item"
                  className="min-w-0 transition-colors hover:text-blue-600"
                >
                  <span
                    itemProp="name"
                    className="block truncate"
                  >
                    {item.name}
                  </span>
                </Link>
              ) : (
                <span
                  itemProp="name"
                  aria-current={
                    isLast ? "page" : undefined
                  }
                  className={
                    isLast
                      ? "block truncate font-medium text-slate-700"
                      : undefined
                  }
                >
                  {item.name}
                </span>
              )}

              <meta
                itemProp="position"
                content={String(index + 1)}
              />

              {!isLast && (
                <span
                  aria-hidden="true"
                  className="text-slate-300"
                >
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}