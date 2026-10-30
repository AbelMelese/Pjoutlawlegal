import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { bundledAssets } from '../../content/assets';
import { listMedia } from '../lib/media';
import { friendlyError } from '../lib/supabase';
import Uploader from './Uploader';
import { Alert, EmptyState, Modal, Spinner, inputClass } from './ui';

const originals = Object.entries(bundledAssets)
  .filter(([key]) => key !== 'logo')
  .map(([key, src]) => ({ id: `asset:${key}`, public_url: `asset:${key}`, preview: src, file_name: key.replace(/-/g, ' '), alt_text: '' }));

/** Modal to pick an image from the media library, upload one, or go back to an original site image. */
export default function MediaPicker({ open, onClose, onSelect }) {
  const [tab, setTab] = useState('library');
  const [items, setItems] = useState(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open || tab !== 'library') return undefined;
    let cancelled = false;
    const timer = setTimeout(() => {
      listMedia({ search, imagesOnly: true })
        .then((rows) => !cancelled && setItems(rows))
        .catch((err) => !cancelled && setError(friendlyError(err, 'Could not load the media library.')));
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [open, tab, search]);

  const grid = (list) => (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {list.map((item) => (
        <li key={item.id}>
          <button type="button" onClick={() => onSelect(item)} className="group block w-full overflow-hidden rounded-xl border border-slate-200 text-left hover:border-[#C5A03A] focus-visible:outline-2 focus-visible:outline-[#1E3A5F]">
            <div className="flex aspect-[4/3] items-center justify-center bg-slate-100">
              <img src={item.preview ?? item.public_url} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <p className="truncate px-2 py-1.5 text-xs font-medium text-slate-700">{item.file_name}</p>
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <Modal open={open} onClose={onClose} title="Choose an image" wide>
      <div className="mb-4 flex gap-2 border-b border-slate-200" role="tablist">
        {[
          ['library', 'Media library'],
          ['upload', 'Upload new'],
          ['originals', 'Original site images'],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`-mb-px border-b-2 px-3 py-2 text-sm font-semibold ${tab === id ? 'border-[#1E3A5F] text-[#1E3A5F]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'library' ? (
        <div className="space-y-4">
          <label className="relative block">
            <span className="sr-only">Search images</span>
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input className={`${inputClass()} pl-9`} placeholder="Search by file name or description" value={search} onChange={(event) => setSearch(event.target.value)} />
          </label>
          {error ? <Alert tone="danger">{error}</Alert> : null}
          {items === null && !error ? <Spinner /> : null}
          {items?.length === 0 ? <EmptyState title="No images yet">Upload one in the “Upload new” tab.</EmptyState> : null}
          {items?.length ? grid(items) : null}
        </div>
      ) : null}

      {tab === 'upload' ? <Uploader imagesOnly folder="pages" onUploaded={(item) => onSelect(item)} /> : null}

      {tab === 'originals' ? (
        <div className="space-y-3">
          <p className="text-sm text-slate-600">The images the website was built with. Pick one to put an original image back.</p>
          {grid(originals)}
        </div>
      ) : null}
    </Modal>
  );
}
