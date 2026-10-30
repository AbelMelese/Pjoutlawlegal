import { Link } from 'react-router-dom';
import { PencilLine } from 'lucide-react';
import { STATUS_LABELS } from '../lib/content';
import { AREA_BY_KEY, SERVICE_LISTS } from '../lib/schemas';
import { useEntries } from '../lib/useEntries';
import { Alert, Badge, Card, PageHeader, Spinner } from '../components/ui';

export default function Services() {
  const { loading, error, areas } = useEntries();
  const byKey = Object.fromEntries(areas.map((entry) => [entry.area.key, entry]));

  return (
    <div>
      <PageHeader
        title="Services"
        description="The services the firm offers appear in three places. Add, edit, reorder or remove them in the page they belong to."
      />
      <Alert tone="info" className="mb-6">
        Describe only services, credentials and results that are accurate. Legal advertising rules apply to everything published here.
      </Alert>
      {error ? <Alert tone="danger">{error}</Alert> : null}
      {loading ? <Spinner /> : null}
      <div className="space-y-5">
        {SERVICE_LISTS.map((list) => {
          const entry = byKey[list.area];
          if (!entry) return null;
          const items = entry.draft?.[list.field] ?? [];
          return (
            <Card
              key={`${list.area}-${list.field}`}
              title={list.label}
              description={`${list.description} On: ${AREA_BY_KEY[list.area].title}`}
              actions={
                <>
                  <Badge tone={STATUS_LABELS[entry.status].tone}>{STATUS_LABELS[entry.status].label}</Badge>
                  <Link to={`/admin/pages/${list.area}`} className="inline-flex items-center gap-1.5 rounded-lg bg-[#1E3A5F] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#16304f]">
                    <PencilLine size={15} aria-hidden="true" /> Edit
                  </Link>
                </>
              }
            >
              <ol className="grid gap-2 sm:grid-cols-2">
                {items.map((item, index) => (
                  <li key={`${item.title}-${index}`} className="rounded-lg bg-slate-50 px-3 py-2 text-sm">
                    <span className="mr-2 font-semibold text-slate-400">{index + 1}.</span>
                    <span className="font-medium text-slate-800">{item.title}</span>
                  </li>
                ))}
              </ol>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
