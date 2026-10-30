import { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { ACCEPT_ATTRIBUTE, checkFile, uploadMedia } from '../lib/media';
import { friendlyError } from '../lib/supabase';
import { Alert } from './ui';

/** Drag-and-drop (or click) uploader. Calls onUploaded(mediaRow) per file. */
export default function Uploader({ folder = 'general', onUploaded, imagesOnly = false }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(0);
  const [problems, setProblems] = useState([]);

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList ?? []);
    const issues = [];
    const ok = files.filter((file) => {
      const problem = checkFile(file) || (imagesOnly && !file.type.startsWith('image/') ? `${file.name}: please choose an image.` : null);
      if (problem) issues.push(problem);
      return !problem;
    });
    setProblems(issues);
    setBusy((count) => count + ok.length);
    for (const file of ok) {
      try {
        onUploaded?.(await uploadMedia(file, { folder }));
      } catch (error) {
        setProblems((current) => [...current, `${file.name}: ${friendlyError(error, error.message || 'upload failed.')}`]);
      } finally {
        setBusy((count) => count - 1);
      }
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          handleFiles(event.dataTransfer.files);
        }}
        className={`flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
          dragging ? 'border-[#C5A03A] bg-amber-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
        }`}
      >
        <UploadCloud className="text-slate-500" aria-hidden="true" />
        <span className="font-semibold text-slate-800">{busy ? `Uploading ${busy} file${busy === 1 ? '' : 's'}…` : 'Drop files here or click to upload'}</span>
        <span className="text-sm text-slate-500">
          {imagesOnly ? 'JPG, PNG, WebP, GIF or AVIF' : 'Images (JPG, PNG, WebP, GIF, AVIF) or PDF'} · up to 10 MB · large photos are resized automatically
        </span>
      </button>
      <input ref={inputRef} type="file" className="sr-only" multiple accept={imagesOnly ? ACCEPT_ATTRIBUTE.replace(',application/pdf', '') : ACCEPT_ATTRIBUTE} onChange={(event) => handleFiles(event.target.files)} tabIndex={-1} />
      {problems.length ? (
        <Alert tone="danger" title="Some files were not uploaded">
          <ul className="list-disc pl-5">
            {problems.map((problem) => (
              <li key={problem}>{problem}</li>
            ))}
          </ul>
        </Alert>
      ) : null}
    </div>
  );
}
