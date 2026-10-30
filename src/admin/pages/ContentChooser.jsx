import { Link } from 'react-router-dom';
import { Building2, FileText, Search } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { STATUS_LABELS } from '../lib/content';
import { canEditKind } from '../lib/permissions';
import { useEntries } from '../lib/useEntries';
import { editorPath } from '../lib/schemas';
import { Alert, Badge, PageHeader, Spinner } from '../components/ui';

const ICONS = { page: FileText, settings: Building2, seo: Search };

export default function ContentChooser() {
  const { role } = useAuth();
  const { loading, error, areas } = useEntries();

  return (
    <div>
      <PageHeader title="Content Editor" description="Choose what you would like to change." />
      {error ? <Alert tone="danger">{error}</Alert> : null}
      {loading ? <Spinner /> : null}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map(({ area, status }) => {
          const Icon = ICONS[area.kind];
          const editable = canEditKind(role, area.kind);
          const href = editorPath(area.key);
          return (
            <li key={area.key}>
              <Link to={href} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#C5A03A] hover:shadow-md">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-lg bg-[#1E3A5F]/10 p-2 text-[#1E3A5F]">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <Badge tone={STATUS_LABELS[status].tone}>{STATUS_LABELS[status].label}</Badge>
                </div>
                <p className="font-semibold text-slate-900">{area.title}</p>
                <p className="mt-1 flex-1 text-sm text-slate-500">{area.summary}</p>
                {!editable ? <p className="mt-3 text-xs font-semibold text-slate-500">View only for your role</p> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
