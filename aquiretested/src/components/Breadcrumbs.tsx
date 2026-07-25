import { ChevronRight, Home } from 'lucide-react';

export type BreadcrumbItem = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
        <li><a href="/" className="inline-flex items-center gap-1.5 transition hover:text-crimson"><Home size={14} aria-hidden="true" /> Home</a></li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <ChevronRight size={13} className="text-slate-300" aria-hidden="true" />
            {item.href ? <a href={item.href} className="transition hover:text-crimson">{item.label}</a> : <span className="text-navy" aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
