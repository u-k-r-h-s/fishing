import Link from "next/link";

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-xl font-bold text-dark">{title}</h1>
        {description && <p className="mt-1 text-sm text-dark/60">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-offwhite hover:bg-ocean"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
