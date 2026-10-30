import { FileText, Image, Rocket, Undo2, User, Wrench } from 'lucide-react';
import { AREA_BY_KEY } from '../lib/schemas';
import { formatDateTime } from './ui';

const ICONS = {
  'content.published': Rocket,
  'content.version_restored': Undo2,
  'site.rebuild_requested': Wrench,
};
const TYPE_ICONS = { content: FileText, media: Image, user: User, site: Wrench };

/** Turn changed field names into words, e.g. ["phone","email"] -> "Phone, E-mail". */
function describeFields(entityId, fields) {
  if (!Array.isArray(fields) || !fields.length) return '';
  const area = AREA_BY_KEY[entityId];
  const labels = Object.fromEntries((area?.sections ?? []).flatMap((s) => s.fields.map((f) => [f.name, f.label ?? s.title])));
  return fields.map((field) => labels[field] ?? field).join(', ');
}

export default function ActivityList({ items }) {
  return (
    <ol className="divide-y divide-slate-100">
      {items.map((item) => {
        const Icon = ICONS[item.action] ?? TYPE_ICONS[item.entity_type] ?? FileText;
        const fields = describeFields(item.entity_id, item.details?.fields);
        return (
          <li key={item.id} className="flex gap-3 px-5 py-3">
            <span className="mt-0.5 rounded-lg bg-slate-100 p-2 text-slate-600">
              <Icon size={16} aria-hidden="true" />
            </span>
            <div className="min-w-0 text-sm">
              <p className="font-medium text-slate-900">{item.summary}</p>
              {fields ? <p className="text-slate-600">Changed: {fields}</p> : null}
              {item.details?.note ? <p className="text-slate-600">Note: “{item.details.note}”</p> : null}
              <p className="text-xs text-slate-500">
                {item.actor_email} · {formatDateTime(item.occurred_at)}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

