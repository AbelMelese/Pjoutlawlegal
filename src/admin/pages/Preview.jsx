import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Eye } from 'lucide-react';
import { defaultContent } from '../../content';
import { loadEntry } from '../lib/content';
import { AREA_BY_KEY, editorPath } from '../lib/schemas';
import { friendlyError } from '../lib/supabase';
import PagePreview from '../components/PagePreview';
import { Alert, Spinner } from '../components/ui';

/** Full-page preview of the saved draft (opened in a new tab from the editor). */
export default function Preview() {
  const { key } = useParams();
  const area = AREA_BY_KEY[key];
  const [draft, setDraft] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadEntry(key)
      .then((row) => setDraft(row?.draft ?? defaultContent[key]))
      .catch((err) => setError(friendlyError(err, 'Could not load the draft.')));
  }, [key]);

  if (!area) return <Alert tone="danger">That section does not exist.</Alert>;

  return (
    <div>
      <div className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 bg-[#C5A03A] px-4 py-2 text-sm font-semibold text-[#1E3A5F]">
        <span className="flex items-center gap-2">
          <Eye size={16} aria-hidden="true" /> Preview of the saved draft of “{area.title}”. Visitors do not see this until it is published.
        </span>
        <Link to={editorPath(key)} className="inline-flex items-center gap-1 underline">
          <ArrowLeft size={14} aria-hidden="true" /> Back to editing
        </Link>
      </div>
      {error ? <Alert tone="danger">{error}</Alert> : null}
      {!draft && !error ? <Spinner /> : null}
      {draft ? <PagePreview areaKey={key} draft={draft} /> : null}
    </div>
  );
}
