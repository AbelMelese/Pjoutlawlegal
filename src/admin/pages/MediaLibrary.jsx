import { useCallback, useEffect, useState } from 'react';
import { Copy, FileText, ImageOff, Search, Trash2 } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { listEntries } from '../lib/content';
import { deleteMedia, FOLDERS, formatBytes, listMedia, updateMedia } from '../lib/media';
import { can } from '../lib/permissions';
import { AREA_BY_KEY } from '../lib/schemas';
import { friendlyError } from '../lib/supabase';
import Uploader from '../components/Uploader';
import { Alert, Button, Card, ConfirmDialog, EmptyState, Modal, PageHeader, Spinner, TextInput, formatDateTime, inputClass, useToast } from '../components/ui';

/** Which content sections (draft or live) reference this file's URL. */
async function findUsage(url) {
  const rows = await listEntries();
  return Object.values(rows)
    .filter((row) => JSON.stringify(row.draft).includes(url) || JSON.stringify(row.published ?? {}).includes(url))
    .map((row) => AREA_BY_KEY[row.key]?.title ?? row.title);
}

export default function MediaLibrary() {
  const { role } = useAuth();
  const toast = useToast();
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [folder, setFolder] = useState('');
  const [uploadFolder, setUploadFolder] = useState('general');
  const [selected, setSelected] = useState(null);

  const load = useCallback(async () => {
    try {
      setItems(await listMedia({ search, folder }));
      setError('');
    } catch (err) {
      setError(friendlyError(err, 'Could not load the media library.'));
    }
  }, [search, folder]);

  useEffect(() => {
    const timer = setTimeout(load, 250);
    return () => clearTimeout(timer);
  }, [load]);

  return (
    <div>
      <PageHeader title="Media Library" description="Images and documents used on the website. Uploaded files are public once used on a page." />

      <Card title="Upload" className="mb-6">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
          <label htmlFor="upload-folder" className="font-semibold text-slate-700">
            Save in folder
          </label>
          <select id="upload-folder" className={`${inputClass()} w-auto`} value={uploadFolder} onChange={(event) => setUploadFolder(event.target.value)}>
            {FOLDERS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <Uploader
          folder={uploadFolder}
          onUploaded={(item) => {
            setItems((current) => [item, ...(current ?? [])]);
            toast(`${item.file_name} uploaded. Add a description so screen readers and search engines understand it.`);
            setSelected(item);
          }}
        />
      </Card>

      <div className="mb-4 flex flex-wrap gap-3">
        <label className="relative min-w-[16rem] flex-1">
          <span className="sr-only">Search</span>
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input className={`${inputClass()} pl-9`} placeholder="Search by file name or description" value={search} onChange={(event) => setSearch(event.target.value)} />
        </label>
        <select className={`${inputClass()} w-auto`} value={folder} onChange={(event) => setFolder(event.target.value)} aria-label="Filter by folder">
          <option value="">All folders</option>
          {FOLDERS.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {error ? <Alert tone="danger">{error}</Alert> : null}
      {items === null && !error ? <Spinner /> : null}
      {items?.length === 0 ? (
        <EmptyState icon={ImageOff} title={search || folder ? 'No files match' : 'No files uploaded yet'}>
          The site’s original images are built into the website and do not appear here. Upload new images above.
        </EmptyState>
      ) : null}

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items?.map((item) => (
          <li key={item.id}>
            <button type="button" onClick={() => setSelected(item)} className="block w-full overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm hover:border-[#C5A03A] focus-visible:outline-2 focus-visible:outline-[#1E3A5F]">
              <div className="flex aspect-[4/3] items-center justify-center bg-slate-100">
                {item.mime_type.startsWith('image/') ? <img src={item.public_url} alt="" className="h-full w-full object-cover" loading="lazy" /> : <FileText size={36} className="text-slate-400" aria-hidden="true" />}
              </div>
              <div className="px-3 py-2">
                <p className="truncate text-sm font-semibold text-slate-800">{item.file_name}</p>
                <p className={`truncate text-xs ${item.alt_text ? 'text-slate-500' : 'font-semibold text-amber-700'}`}>{item.alt_text || 'Needs a description'}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <MediaDetails
        item={selected}
        canDelete={can(role, 'deleteMedia')}
        onClose={() => setSelected(null)}
        onSaved={(updated) => {
          setItems((current) => current.map((item) => (item.id === updated.id ? updated : item)));
          setSelected(updated);
        }}
        onDeleted={(id) => {
          setItems((current) => current.filter((item) => item.id !== id));
          setSelected(null);
        }}
      />
    </div>
  );
}

function MediaDetails({ item, canDelete, onClose, onSaved, onDeleted }) {
  const toast = useToast();
  const [alt, setAlt] = useState('');
  const [folder, setFolder] = useState('general');
  const [busy, setBusy] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [usage, setUsage] = useState(null);

  useEffect(() => {
    if (!item) return;
    setAlt(item.alt_text ?? '');
    setFolder(item.folder);
    setUsage(null);
    findUsage(item.public_url).then(setUsage).catch(() => setUsage([]));
  }, [item]);

  if (!item) return null;

  const save = async () => {
    setBusy('save');
    try {
      onSaved(await updateMedia(item.id, { alt_text: alt.trim(), folder }));
      toast('Details saved.');
    } catch (err) {
      toast(friendlyError(err, 'Could not save.'), 'danger');
    } finally {
      setBusy('');
    }
  };

  const remove = async () => {
    setBusy('delete');
    try {
      await deleteMedia(item);
      onDeleted(item.id);
      toast('File deleted.');
    } catch (err) {
      toast(friendlyError(err, 'Could not delete the file.'), 'danger');
    } finally {
      setBusy('');
      setConfirmDelete(false);
    }
  };

  const inUse = usage?.length > 0;

  return (
    <>
      <Modal
        open={Boolean(item) && !confirmDelete}
        onClose={onClose}
        title={item.file_name}
        wide
        footer={
          <>
            {canDelete ? (
              <Button variant="danger" icon={Trash2} onClick={() => setConfirmDelete(true)} disabled={usage === null || inUse} title={inUse ? 'Remove it from those pages first' : undefined}>
                Delete
              </Button>
            ) : null}
            <Button onClick={onClose}>Close</Button>
            <Button variant="primary" onClick={save} busy={busy === 'save'} disabled={alt === (item.alt_text ?? '') && folder === item.folder}>
              Save details
            </Button>
          </>
        }
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex items-center justify-center rounded-xl bg-slate-100 p-2">
            {item.mime_type.startsWith('image/') ? (
              <img src={item.public_url} alt={item.alt_text} className="max-h-[50vh] w-auto rounded" />
            ) : (
              <a href={item.public_url} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 p-10 text-[#1E3A5F] underline">
                <FileText size={40} aria-hidden="true" /> Open PDF
              </a>
            )}
          </div>
          <div className="space-y-4 text-sm">
            <TextInput label="Description (alt text)" help="What the image shows, in a short sentence." value={alt} onChange={setAlt} maxLength={300} multiline rows={3} />
            <label className="block space-y-1.5">
              <span className="text-sm font-semibold text-slate-800">Folder</span>
              <select className={inputClass()} value={folder} onChange={(event) => setFolder(event.target.value)}>
                {FOLDERS.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-slate-600">
              <dt className="font-semibold">Size</dt>
              <dd>
                {formatBytes(item.size_bytes)}
                {item.width ? ` · ${item.width} × ${item.height}px` : ''}
              </dd>
              <dt className="font-semibold">Uploaded</dt>
              <dd>{formatDateTime(item.created_at)}</dd>
              <dt className="font-semibold">Used on</dt>
              <dd>{usage === null ? 'Checking…' : inUse ? usage.join(', ') : 'Not used on any page'}</dd>
            </dl>
            <Button
              size="sm"
              icon={Copy}
              onClick={async () => {
                await navigator.clipboard.writeText(item.public_url);
                toast('Address copied.');
              }}
            >
              Copy file address
            </Button>
          </div>
        </div>
      </Modal>
      <ConfirmDialog open={confirmDelete} title="Delete this file?" confirmLabel="Delete permanently" tone="danger" busy={busy === 'delete'} onConfirm={remove} onCancel={() => setConfirmDelete(false)}>
        <p>
          <strong>{item.file_name}</strong> will be removed from the media library and from storage. This cannot be undone.
        </p>
      </ConfirmDialog>
    </>
  );
}
