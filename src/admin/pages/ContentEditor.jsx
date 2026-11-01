import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Eye, History, PencilLine, RotateCcw, Rocket, Save, Undo2 } from 'lucide-react';
import { defaultContent } from '../../content';
import { useAuth } from '../lib/auth';
import { describeEntry, deepEqual, discardDraft, listVersions, loadEntry, publishEntry, restoreVersion, saveDraft, STATUS_LABELS } from '../lib/content';
import { can, canEditKind } from '../lib/permissions';
import { AREA_BY_KEY } from '../lib/schemas';
import { friendlyError } from '../lib/supabase';
import { validateContent } from '../lib/validate';
import { Field } from '../components/fields';
import PagePreview from '../components/PagePreview';
import { Alert, Badge, Button, Card, ConfirmDialog, Modal, PageHeader, Spinner, TextInput, formatDateTime, timeAgo, useToast } from '../components/ui';

export default function ContentEditor({ areaKey }) {
  const params = useParams();
  const key = areaKey ?? params.key;
  const area = AREA_BY_KEY[key];
  const { role } = useAuth();
  const toast = useToast();

  const [row, setRow] = useState(undefined);
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [loadError, setLoadError] = useState('');
  const [tab, setTab] = useState('edit');
  const [busy, setBusy] = useState('');
  const [publishOpen, setPublishOpen] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [note, setNote] = useState('');

  const load = useCallback(async () => {
    try {
      const data = await loadEntry(key);
      setRow(data);
      setForm(structuredClone(data?.draft ?? defaultContent[key]));
      setErrors({});
    } catch (error) {
      setLoadError(friendlyError(error, 'Could not load this content.'));
    }
  }, [key]);

  useEffect(() => {
    setRow(undefined);
    setForm(null);
    setTab('edit');
    load();
  }, [load]);

  const entry = row === undefined ? null : describeEntry(area, row);
  const saved = entry?.draft;
  const dirty = form && saved ? !deepEqual(form, saved) : false;
  const canEdit = canEditKind(role, area?.kind);
  const canPublish = can(role, 'publish');

  // Warn before closing the tab with unsaved edits.
  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const errorList = useMemo(() => Object.entries(errors), [errors]);

  if (!area) return <Alert tone="danger">That section does not exist.</Alert>;
  if (loadError) return <Alert tone="danger">{loadError}</Alert>;
  if (!entry || !form) return <Spinner />;

  const status = STATUS_LABELS[entry.status];

  const save = async () => {
    const problems = validateContent(area, form);
    setErrors(problems);
    if (Object.keys(problems).length) {
      setTab('edit');
      toast('Please fix the highlighted fields before saving.', 'danger');
      return false;
    }
    setBusy('save');
    try {
      const updated = await saveDraft(area, form, Boolean(row));
      setRow(updated);
      setForm(structuredClone(updated.draft));
      toast(canPublish ? 'Draft saved. Publish when you are ready for visitors to see it.' : 'Draft saved. The website owner can now publish it.');
      return true;
    } catch (error) {
      toast(friendlyError(error, 'Could not save the draft.'), 'danger');
      return false;
    } finally {
      setBusy('');
    }
  };

  const publish = async () => {
    setBusy('publish');
    try {
      const result = await publishEntry(key, note.trim());
      setPublishOpen(false);
      setNote('');
      await load();
      toast(result.deployed ? result.message : `Published. ${result.message}`, result.deployed ? 'success' : 'warning');
    } catch (error) {
      toast(friendlyError(error, 'Could not publish.'), 'danger');
    } finally {
      setBusy('');
    }
  };

  const discard = async () => {
    setBusy('discard');
    try {
      const updated = await discardDraft(key);
      setRow(updated);
      setForm(structuredClone(updated.draft));
      setErrors({});
      setDiscardOpen(false);
      toast('Changes discarded.');
    } catch (error) {
      toast(friendlyError(error, 'Could not discard the changes.'), 'danger');
    } finally {
      setBusy('');
    }
  };

  const unpublished = entry.status === 'draft' || entry.status === 'changes';

  return (
    <div>
      <Link to={area.kind === 'page' ? '/admin/pages' : area.kind === 'settings' ? '/admin/settings' : '/admin/editor'} className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-[#1E3A5F] hover:underline">
        <ArrowLeft size={16} aria-hidden="true" /> {area.kind === 'page' ? 'All pages' : area.kind === 'settings' ? 'Settings' : 'Content Editor'}
      </Link>
      <PageHeader
        title={area.title}
        description={area.summary}
        actions={
          <>
            <Button icon={History} onClick={() => setHistoryOpen(true)}>
              History
            </Button>
            {area.kind !== 'seo' ? (
              <Button icon={Eye} onClick={() => window.open(`/admin/preview/${key}`, '_blank', 'noopener')} disabled={dirty} title={dirty ? 'Save first to open the full-page preview' : undefined}>
                Full preview
              </Button>
            ) : null}
          </>
        }
      >
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <Badge tone={status.tone}>{status.label}</Badge>
          {dirty ? <Badge tone="info">Unsaved edits</Badge> : null}
          {row?.published_at ? <span>Live version published {timeAgo(row.published_at)}</span> : null}
          {row?.draft_updated_at && unpublished ? <span>· Draft saved {timeAgo(row.draft_updated_at)}</span> : null}
        </div>
      </PageHeader>

      {!canEdit ? (
        <Alert tone="info" className="mb-4">
          You can view this section, but only the website owner or a super administrator can change it.
        </Alert>
      ) : null}

      {errorList.length ? (
        <Alert tone="danger" title={`${errorList.length} field${errorList.length === 1 ? ' needs' : 's need'} attention`} className="mb-4">
          Scroll to the fields marked in red. Nothing has been saved yet.
        </Alert>
      ) : null}

      {/* Sticky action bar */}
      <div className="sticky top-14 z-20 -mx-4 mb-5 flex flex-wrap items-center justify-between gap-3 border-y border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border lg:top-2">
        <div className="flex gap-1 rounded-lg bg-slate-100 p-1" role="tablist" aria-label="Editor view">
          {[
            ['edit', 'Edit', PencilLine],
            ['preview', 'Preview', Eye],
          ].map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold ${tab === id ? 'bg-white text-[#1E3A5F] shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Icon size={15} aria-hidden="true" /> {label}
            </button>
          ))}
        </div>
        {canEdit ? (
          <div className="flex flex-wrap gap-2">
            {dirty ? (
              <Button
                variant="ghost"
                icon={Undo2}
                onClick={() => {
                  setForm(structuredClone(saved));
                  setErrors({});
                }}
                disabled={Boolean(busy)}
              >
                Undo unsaved edits
              </Button>
            ) : entry.status === 'changes' ? (
              <Button variant="ghost" icon={Undo2} onClick={() => setDiscardOpen(true)} disabled={Boolean(busy)}>
                Discard draft
              </Button>
            ) : null}
            <Button variant="primary" icon={Save} onClick={save} busy={busy === 'save'} disabled={!dirty || Boolean(busy)}>
              Save draft
            </Button>
            {canPublish ? (
              <Button
                variant="gold"
                icon={Rocket}
                onClick={() => setPublishOpen(true)}
                disabled={dirty || !row || !unpublished || Boolean(busy)}
                title={dirty ? 'Save your edits first' : !unpublished ? 'Nothing new to publish' : undefined}
              >
                Publish
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>

      {tab === 'edit' ? (
        <div className="space-y-6">
          {area.sections.map((section) => (
            <Card key={section.title} title={section.title} description={section.help}>
              <div className="space-y-6">
                {section.fields.map((field) => (
                  <Field
                    key={field.name}
                    field={field}
                    value={form[field.name]}
                    onChange={(next) => setForm((current) => ({ ...current, [field.name]: next }))}
                    errors={errors}
                    path={field.name}
                    disabled={!canEdit}
                  />
                ))}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card padded={false} title="Preview" description={dirty ? 'Showing your unsaved edits. Visitors do not see this until it is published.' : 'Showing the saved draft. Visitors do not see this until it is published.'}>
          <div className="max-h-[75vh] overflow-auto rounded-b-2xl">
            <PagePreview areaKey={key} draft={form} />
          </div>
        </Card>
      )}

      <ConfirmDialog open={publishOpen} title={`Publish “${area.title}”?`} confirmLabel="Publish to the website" busy={busy === 'publish'} onConfirm={publish} onCancel={() => setPublishOpen(false)}>
        <p>Visitors will see these changes once the website finishes updating (usually 1–3 minutes). You can restore the previous version from History at any time.</p>
        <TextInput label="What changed? (optional)" value={note} onChange={setNote} maxLength={500} placeholder="e.g. Updated office hours for the holidays" />
      </ConfirmDialog>

      <ConfirmDialog open={discardOpen} title="Discard the saved draft?" confirmLabel="Discard draft" tone="danger" busy={busy === 'discard'} onConfirm={discard} onCancel={() => setDiscardOpen(false)}>
        <p>The draft will go back to exactly what is live on the website now. This cannot be undone.</p>
      </ConfirmDialog>

      <HistoryModal
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        areaKey={key}
        canRestore={can(role, 'restoreVersions')}
        hasUnsaved={dirty}
        onRestored={async () => {
          await load();
          setHistoryOpen(false);
          toast('That version is now in the draft. Review it, then Publish to make it live.');
        }}
      />
    </div>
  );
}

function HistoryModal({ open, onClose, areaKey, canRestore, hasUnsaved, onRestored }) {
  const [versions, setVersions] = useState(null);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (!open) return;
    setVersions(null);
    setError('');
    listVersions(areaKey)
      .then(setVersions)
      .catch((err) => setError(friendlyError(err, 'Could not load the history.')));
  }, [open, areaKey]);

  const restore = async (id) => {
    setBusyId(id);
    try {
      await restoreVersion(id);
      await onRestored();
    } catch (err) {
      toast(friendlyError(err, 'Could not restore that version.'), 'danger');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Published versions">
      {error ? <Alert tone="danger">{error}</Alert> : null}
      {!versions && !error ? <Spinner /> : null}
      {versions?.length === 0 ? <p className="text-sm text-slate-600">This section has not been published from the dashboard yet. The website shows the original content.</p> : null}
      {hasUnsaved && versions?.length ? (
        <Alert tone="warning" className="mb-3">
          Restoring replaces your unsaved edits.
        </Alert>
      ) : null}
      <ol className="space-y-3">
        {versions?.map((version, index) => (
          <li key={version.id} className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 p-3">
            <div className="min-w-0 text-sm">
              <p className="font-semibold text-slate-900">
                {formatDateTime(version.created_at)} {index === 0 ? <Badge tone="success">Live now</Badge> : null}
              </p>
              <p className="text-slate-600">by {version.author}</p>
              {version.note ? <p className="mt-1 text-slate-700">“{version.note}”</p> : null}
            </div>
            {canRestore && index !== 0 ? (
              <Button size="sm" icon={RotateCcw} busy={busyId === version.id} onClick={() => restore(version.id)}>
                Restore
              </Button>
            ) : null}
          </li>
        ))}
      </ol>
    </Modal>
  );
}
