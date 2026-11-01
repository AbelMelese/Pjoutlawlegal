import { Link } from 'react-router-dom';
import { ExternalLink, PencilLine } from 'lucide-react';
import { STATUS_LABELS } from '../lib/content';
import { useEntries } from '../lib/useEntries';
import { Alert, Badge, Card, PageHeader, Spinner, timeAgo } from '../components/ui';

export default function PagesList() {
  const { loading, error, areas } = useEntries();
  const pages = areas.filter(({ area }) => area.kind === 'page');

  return (
    <div>
      <PageHeader title="Pages" description="Every public page you can edit. Changes are saved as drafts and only reach visitors when published." />
      {error ? <Alert tone="danger">{error}</Alert> : null}
      {loading ? <Spinner /> : null}
      <Card padded={false}>
        <ul className="divide-y divide-slate-100">
          {pages.map(({ area, status, row }) => (
            <li key={area.key} className="flex flex-wrap items-center gap-4 px-5 py-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link to={`/admin/pages/${area.key}`} className="text-base font-semibold text-slate-900 hover:text-[#1E3A5F] hover:underline">
                    {area.title}
                  </Link>
                  <Badge tone={STATUS_LABELS[status].tone}>{STATUS_LABELS[status].label}</Badge>
                </div>
                <p className="mt-0.5 text-sm text-slate-500">
                  {area.route} · {area.summary}
                  {row?.draft_updated_at ? ` · Last edited ${timeAgo(row.draft_updated_at)}` : ''}
                </p>
              </div>
              <div className="flex gap-2">
                <a href={area.route} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                  <ExternalLink size={15} aria-hidden="true" /> View live
                </a>
                <Link to={`/admin/pages/${area.key}`} className="inline-flex items-center gap-1.5 rounded-lg bg-[#1E3A5F] px-3 py-2 text-sm font-semibold text-white hover:bg-[#16304f]">
                  <PencilLine size={15} aria-hidden="true" /> Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Card>
      <p className="mt-4 text-sm text-slate-500">
        The Online Payment page is part of the payment system and is not edited here; its search title and description are in SEO Management. New pages require a developer, so that layout, navigation and search settings stay consistent.
      </p>
    </div>
  );
}
