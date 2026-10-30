import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, Info, Loader2, X, XCircle } from 'lucide-react';

const cx = (...classes) => classes.filter(Boolean).join(' ');

export function Button({ variant = 'secondary', size = 'md', busy = false, icon: Icon, children, className, ...props }) {
  const variants = {
    primary: 'bg-[#1E3A5F] text-white hover:bg-[#16304f] focus-visible:outline-[#1E3A5F] disabled:bg-slate-300',
    gold: 'bg-[#C5A03A] text-[#1E3A5F] hover:bg-[#b48f2c] focus-visible:outline-[#C5A03A] disabled:bg-slate-300 disabled:text-slate-500',
    secondary: 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 focus-visible:outline-[#1E3A5F] disabled:text-slate-400',
    danger: 'bg-white text-red-700 border border-red-300 hover:bg-red-50 focus-visible:outline-red-600 disabled:text-slate-400',
    ghost: 'text-slate-700 hover:bg-slate-100 focus-visible:outline-[#1E3A5F] disabled:text-slate-400',
  };
  const sizes = { sm: 'px-3 py-1.5 text-sm gap-1.5', md: 'px-4 py-2 text-sm gap-2', lg: 'px-5 py-3 text-base gap-2' };
  return (
    <button
      type="button"
      className={cx(
        'inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={busy || props.disabled}
      aria-busy={busy || undefined}
      {...props}
    >
      {busy ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : Icon ? <Icon size={16} aria-hidden="true" /> : null}
      {children}
    </button>
  );
}

export function Card({ title, description, actions, children, className, padded = true }) {
  return (
    <section className={cx('rounded-2xl border border-slate-200 bg-white shadow-sm', className)}>
      {title || actions ? (
        <header className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div>
            {title ? <h2 className="text-lg font-semibold text-slate-900">{title}</h2> : null}
            {description ? <p className="mt-0.5 text-sm text-slate-500">{description}</p> : null}
          </div>
          {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
        </header>
      ) : null}
      <div className={padded ? 'p-5' : ''}>{children}</div>
    </section>
  );
}

export function Badge({ tone = 'neutral', children }) {
  const tones = {
    neutral: 'bg-slate-100 text-slate-700 ring-slate-200',
    success: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
    warning: 'bg-amber-50 text-amber-900 ring-amber-200',
    danger: 'bg-red-50 text-red-800 ring-red-200',
    info: 'bg-sky-50 text-sky-800 ring-sky-200',
  };
  return <span className={cx('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset', tones[tone])}>{children}</span>;
}

export function Alert({ tone = 'info', title, children, className }) {
  const tones = {
    info: ['border-sky-200 bg-sky-50 text-sky-900', Info],
    success: ['border-emerald-200 bg-emerald-50 text-emerald-900', CheckCircle2],
    warning: ['border-amber-200 bg-amber-50 text-amber-900', AlertTriangle],
    danger: ['border-red-200 bg-red-50 text-red-900', XCircle],
  };
  const [classes, Icon] = tones[tone];
  return (
    <div className={cx('flex gap-3 rounded-xl border px-4 py-3 text-sm', classes, className)} role={tone === 'danger' ? 'alert' : 'status'}>
      <Icon size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
      <div className="min-w-0">
        {title ? <p className="font-semibold">{title}</p> : null}
        {children ? <div className={title ? 'mt-1' : ''}>{children}</div> : null}
      </div>
    </div>
  );
}

export function Spinner({ label = 'Loading…' }) {
  return (
    <div className="flex items-center gap-2 py-10 text-sm text-slate-500" role="status">
      <Loader2 size={18} className="animate-spin" aria-hidden="true" />
      {label}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, children, action }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      {Icon ? <Icon size={32} className="mb-3 text-slate-400" aria-hidden="true" /> : null}
      <p className="font-semibold text-slate-800">{title}</p>
      {children ? <div className="mt-1 max-w-md text-sm text-slate-500">{children}</div> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function PageHeader({ title, description, actions, children }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h1>
        {description ? <p className="mt-1 max-w-3xl text-slate-600">{description}</p> : null}
        {children}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

/** Label + control + help + error + optional character counter. */
export function FieldShell({ id, label, help, error, required, count, max, recommended, children }) {
  const over = recommended && count > recommended;
  return (
    <div className="space-y-1.5">
      {label ? (
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor={id} className="text-sm font-semibold text-slate-800">
            {label}
            {required ? <span className="text-red-600" aria-hidden="true"> *</span> : null}
          </label>
          {typeof count === 'number' && (max || recommended) ? (
            <span className={cx('text-xs tabular-nums', over ? 'text-amber-700' : 'text-slate-400')}>
              {count}
              {recommended ? ` / ${recommended} recommended` : max ? ` / ${max}` : ''}
            </span>
          ) : null}
        </div>
      ) : null}
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : help ? (
        <p id={`${id}-help`} className="text-sm text-slate-500">
          {help}
        </p>
      ) : null}
    </div>
  );
}

export const inputClass = (error) =>
  cx(
    'block w-full rounded-lg border bg-white px-3 py-2 text-[15px] text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2',
    error ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:border-[#1E3A5F] focus:ring-[#1E3A5F]/20',
  );

export function TextInput({ label, help, error, required, value, onChange, multiline = false, max, recommended, rows = 4, ...props }) {
  const id = useId();
  const Element = multiline ? 'textarea' : 'input';
  return (
    <FieldShell id={id} label={label} help={help} error={error} required={required} count={(value ?? '').length} max={max} recommended={recommended}>
      <Element
        id={id}
        className={inputClass(error)}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : help ? `${id}-help` : undefined}
        required={required}
        rows={multiline ? rows : undefined}
        {...props}
      />
    </FieldShell>
  );
}

export function Modal({ open, title, onClose, children, footer, wide = false }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal?.();
    if (!open && dialog.open) dialog.close?.();
  }, [open]);
  if (!open) return null;
  return (
    <dialog
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className={cx('m-auto w-[calc(100%-2rem)] rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-slate-900/50', wide ? 'max-w-5xl' : 'max-w-lg')}
      aria-labelledby="modal-title"
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <h2 id="modal-title" className="text-lg font-semibold text-slate-900">
          {title}
        </h2>
        <button type="button" onClick={onClose} className="rounded-lg p-1 text-slate-500 hover:bg-slate-100" aria-label="Close">
          <X size={18} />
        </button>
      </div>
      <div className="max-h-[70vh] overflow-y-auto px-5 py-4">{children}</div>
      {footer ? <div className="flex flex-wrap justify-end gap-2 border-t border-slate-100 px-5 py-4">{footer}</div> : null}
    </dialog>
  );
}

export function ConfirmDialog({ open, title, children, confirmLabel = 'Confirm', tone = 'primary', busy, onConfirm, onCancel }) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onCancel}
      footer={
        <>
          <Button onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
          <Button variant={tone === 'danger' ? 'danger' : 'primary'} busy={busy} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="space-y-3 text-sm text-slate-700">{children}</div>
    </Modal>
  );
}

const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((message, tone = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((current) => [...current, { id, message, tone }]);
    setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), tone === 'danger' ? 9000 : 5000);
  }, []);
  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Alert tone={toast.tone}>{toast.message}</Alert>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

export function formatDateTime(value) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

export function timeAgo(value) {
  if (!value) return '—';
  const seconds = Math.round((Date.now() - new Date(value).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;
  return formatDateTime(value);
}
