import { useId, useState } from 'react';
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, ImagePlus, Plus, Trash2 } from 'lucide-react';
import { resolveImage } from '../../content/assets';
import { SITE_PAGES } from '../lib/schemas';
import { slugify } from '../lib/validate';
import MediaPicker from './MediaPicker';
import { Button, FieldShell, TextInput, inputClass } from './ui';

const blankFor = (field) => {
  switch (field.type) {
    case 'list':
    case 'strings':
    case 'images':
      return [];
    case 'group':
      return Object.fromEntries(field.fields.map((child) => [child.name, blankFor(child)]));
    case 'image':
      return { src: '', alt: '' };
    case 'checkbox':
      return false;
    case 'link':
      return '/contact';
    case 'select':
      return field.options[0]?.value ?? '';
    default:
      return '';
  }
};

export const blankItem = (fields) => Object.fromEntries(fields.map((field) => [field.name, blankFor(field)]));

/** Render any schema field. `path` is the dotted error key, e.g. "services.0.title". */
export function Field({ field, value, onChange, errors, path, disabled }) {
  const error = errors[path];
  const common = { label: field.label, help: field.help, error, required: field.required, disabled };

  switch (field.type) {
    case 'text':
    case 'slug':
      return <TextInput {...common} value={value} onChange={onChange} max={field.maxLength} recommended={field.recommended} maxLength={field.maxLength} />;
    case 'textarea':
      return (
        <TextInput
          {...common}
          multiline
          rows={Math.min(10, Math.max(3, Math.ceil((value ?? '').length / 90)))}
          value={value}
          onChange={onChange}
          max={field.maxLength}
          recommended={field.recommended}
          maxLength={field.maxLength}
        />
      );
    case 'email':
      return <TextInput {...common} type="email" autoComplete="off" value={value} onChange={onChange} />;
    case 'phone':
      return <TextInput {...common} type="tel" value={value} onChange={onChange} placeholder="(202) 555-0100" />;
    case 'url':
      return <TextInput {...common} type="url" inputMode="url" value={value} onChange={onChange} placeholder={field.httpsOnly ? 'https://' : 'https://… or /page'} />;
    case 'link':
      return <LinkField {...common} value={value} onChange={onChange} />;
    case 'select':
      return <SelectField {...common} options={field.options} value={value} onChange={onChange} />;
    case 'checkbox':
      return <CheckboxField label={field.label} help={field.help} value={value} onChange={onChange} disabled={disabled} />;
    case 'image':
      return <ImageField {...common} value={value} onChange={onChange} />;
    case 'images':
      return <ImagesField field={field} value={value} onChange={onChange} errors={errors} path={path} disabled={disabled} />;
    case 'strings':
      return <StringsField field={field} value={value} onChange={onChange} errors={errors} path={path} disabled={disabled} />;
    case 'group':
      return (
        <div className="space-y-5">
          {field.fields.map((child) => (
            <Field
              key={child.name}
              field={child}
              value={value?.[child.name]}
              onChange={(next) => onChange({ ...value, [child.name]: next })}
              errors={errors}
              path={`${path}.${child.name}`}
              disabled={disabled}
            />
          ))}
        </div>
      );
    case 'list':
      return <ListField field={field} value={value} onChange={onChange} errors={errors} path={path} disabled={disabled} />;
    default:
      return null;
  }
}

function LinkField({ label, help, error, required, value, onChange, disabled }) {
  const id = useId();
  const known = SITE_PAGES.some((page) => page.value === value);
  return (
    <FieldShell id={id} label={label} help={help} error={error} required={required}>
      <select id={id} className={inputClass(error)} value={known ? value : '__custom'} disabled={disabled} onChange={(event) => onChange(event.target.value === '__custom' ? '' : event.target.value)}>
        {SITE_PAGES.map((page) => (
          <option key={page.value} value={page.value}>
            {page.label}
          </option>
        ))}
        <option value="__custom">Another address…</option>
      </select>
      {!known ? (
        <input className={inputClass(error)} value={value ?? ''} onChange={(event) => onChange(event.target.value)} placeholder="https://… or /page" aria-label={`${label} address`} disabled={disabled} />
      ) : null}
    </FieldShell>
  );
}

function SelectField({ label, help, error, required, options, value, onChange, disabled }) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} help={help} error={error} required={required}>
      <select id={id} className={inputClass(error)} value={value ?? ''} onChange={(event) => onChange(event.target.value)} disabled={disabled}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

function CheckboxField({ label, help, value, onChange, disabled }) {
  const id = useId();
  return (
    <div className="flex items-start gap-3">
      <input id={id} type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-[#1E3A5F]" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} disabled={disabled} />
      <div>
        <label htmlFor={id} className="text-sm font-semibold text-slate-800">
          {label}
        </label>
        {help ? <p className="text-sm text-slate-500">{help}</p> : null}
      </div>
    </div>
  );
}

export function ImageField({ label, help, error, required, value, onChange, disabled }) {
  const id = useId();
  const [picking, setPicking] = useState(false);
  const image = value ?? { src: '', alt: '' };
  const preview = resolveImage(image.src);
  return (
    <FieldShell id={id} label={label} help={help} error={error} required={required}>
      <div className={`flex flex-col gap-4 rounded-xl border p-3 sm:flex-row ${error ? 'border-red-300' : 'border-slate-200'}`}>
        <div className="flex h-28 w-full shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 sm:w-44">
          {preview ? <img src={preview} alt="" className="h-full w-full object-contain" /> : <ImagePlus className="text-slate-400" aria-hidden="true" />}
        </div>
        <div className="flex-1 space-y-3">
          <TextInput
            label="Image description (alt text)"
            help="Describe what the image shows for visitors using screen readers and for search engines."
            value={image.alt}
            onChange={(alt) => onChange({ ...image, alt })}
            maxLength={300}
            disabled={disabled}
          />
          <div className="flex flex-wrap gap-2">
            <Button size="sm" icon={ImagePlus} onClick={() => setPicking(true)} disabled={disabled}>
              {image.src ? 'Replace image' : 'Choose image'}
            </Button>
            {image.src && !required ? (
              <Button size="sm" variant="ghost" onClick={() => onChange({ src: '', alt: '' })} disabled={disabled}>
                Remove
              </Button>
            ) : null}
          </div>
        </div>
      </div>
      <MediaPicker
        open={picking}
        onClose={() => setPicking(false)}
        onSelect={(item) => {
          onChange({ src: item.public_url, alt: image.alt || item.alt_text || '', ...(item.width ? { width: item.width, height: item.height } : {}) });
          setPicking(false);
        }}
      />
    </FieldShell>
  );
}

function ImagesField({ field, value, onChange, errors, path, disabled }) {
  const items = Array.isArray(value) ? value : [];
  const update = (index, next) => onChange(items.map((item, i) => (i === index ? next : item)));
  const move = (index, delta) => {
    const next = [...items];
    [next[index], next[index + delta]] = [next[index + delta], next[index]];
    onChange(next);
  };
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold text-slate-800">{field.label}</legend>
      {field.help ? <p className="text-sm text-slate-500">{field.help}</p> : null}
      {errors[path] ? <p className="text-sm font-medium text-red-700">{errors[path]}</p> : null}
      {items.map((image, index) => (
        <div key={index} className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700">Image {index + 1}</span>
            <ItemControls index={index} count={items.length} onMove={move} onRemove={() => onChange(items.filter((_, i) => i !== index))} canRemove={items.length > (field.min ?? 0)} disabled={disabled} label={`image ${index + 1}`} />
          </div>
          <ImageField value={image} onChange={(next) => update(index, next)} error={errors[`${path}.${index}`]} required disabled={disabled} />
        </div>
      ))}
      {!field.max || items.length < field.max ? (
        <Button size="sm" icon={Plus} onClick={() => onChange([...items, { src: '', alt: '' }])} disabled={disabled}>
          Add image
        </Button>
      ) : null}
    </fieldset>
  );
}

function StringsField({ field, value, onChange, errors, path, disabled }) {
  const items = Array.isArray(value) ? value : [];
  const move = (index, delta) => {
    const next = [...items];
    [next[index], next[index + delta]] = [next[index + delta], next[index]];
    onChange(next);
  };
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-semibold text-slate-800">{field.label}</legend>
      {errors[path] ? <p className="text-sm font-medium text-red-700">{errors[path]}</p> : null}
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-2">
          <div className="flex-1">
            <input
              className={inputClass(errors[`${path}.${index}`])}
              value={item}
              maxLength={field.maxLength}
              onChange={(event) => onChange(items.map((current, i) => (i === index ? event.target.value : current)))}
              aria-label={`${field.itemLabel ?? 'Line'} ${index + 1}`}
              disabled={disabled}
            />
            {errors[`${path}.${index}`] ? <p className="mt-1 text-sm text-red-700">{errors[`${path}.${index}`]}</p> : null}
          </div>
          <ItemControls index={index} count={items.length} onMove={move} onRemove={() => onChange(items.filter((_, i) => i !== index))} canRemove disabled={disabled} label={`${field.itemLabel ?? 'line'} ${index + 1}`} />
        </div>
      ))}
      {!field.max || items.length < field.max ? (
        <Button size="sm" variant="ghost" icon={Plus} onClick={() => onChange([...items, ''])} disabled={disabled}>
          Add {(field.itemLabel ?? 'line').toLowerCase()}
        </Button>
      ) : null}
    </fieldset>
  );
}

function ItemControls({ index, count, onMove, onRemove, canRemove, disabled, label, fixed }) {
  if (fixed) return null;
  return (
    <div className="flex shrink-0 items-center gap-1">
      <button type="button" className="rounded p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30" onClick={() => onMove(index, -1)} disabled={disabled || index === 0} aria-label={`Move ${label} up`}>
        <ArrowUp size={16} />
      </button>
      <button type="button" className="rounded p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30" onClick={() => onMove(index, 1)} disabled={disabled || index === count - 1} aria-label={`Move ${label} down`}>
        <ArrowDown size={16} />
      </button>
      {canRemove ? (
        <button type="button" className="rounded p-1.5 text-red-600 hover:bg-red-50 disabled:opacity-30" onClick={onRemove} disabled={disabled} aria-label={`Remove ${label}`}>
          <Trash2 size={16} />
        </button>
      ) : null}
    </div>
  );
}

function ListField({ field, value, onChange, errors, path, disabled }) {
  const items = Array.isArray(value) ? value : [];
  const [open, setOpen] = useState(() => (items.length <= 2 ? items.map((_, i) => i) : []));
  const slugField = field.fields.find((child) => child.type === 'slug');

  const updateItem = (index, name, next) => {
    onChange(
      items.map((item, i) => {
        if (i !== index) return item;
        const updated = { ...item, [name]: next };
        // Keep an auto-generated link name in step with the title for new items.
        if (slugField && name === slugField.from && (!item[slugField.name] || item[slugField.name] === slugify(item[name]))) {
          updated[slugField.name] = slugify(next);
        }
        return updated;
      }),
    );
  };
  const move = (index, delta) => {
    const next = [...items];
    [next[index], next[index + delta]] = [next[index + delta], next[index]];
    onChange(next);
    setOpen((current) => current.map((i) => (i === index ? index + delta : i === index + delta ? index : i)));
  };
  const toggle = (index) => setOpen((current) => (current.includes(index) ? current.filter((i) => i !== index) : [...current, index]));
  const itemHasError = (index) => Object.keys(errors).some((key) => key.startsWith(`${path}.${index}.`));

  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold text-slate-800">{field.label}</legend>
      {field.help ? <p className="text-sm text-slate-500">{field.help}</p> : null}
      {errors[path] ? <p className="text-sm font-medium text-red-700">{errors[path]}</p> : null}
      {items.map((item, index) => {
        const isOpen = open.includes(index) || itemHasError(index);
        const title = item?.[field.titleField] || `${field.itemLabel ?? 'Item'} ${index + 1}`;
        return (
          <div key={index} className={`rounded-xl border ${itemHasError(index) ? 'border-red-300' : 'border-slate-200'} bg-white`}>
            <div className="flex items-center gap-2 px-3 py-2">
              <button type="button" className="flex min-w-0 flex-1 items-center gap-2 py-1 text-left" onClick={() => toggle(index)} aria-expanded={isOpen}>
                {isOpen ? <ChevronDown size={16} className="shrink-0 text-slate-500" /> : <ChevronRight size={16} className="shrink-0 text-slate-500" />}
                <span className="truncate text-sm font-semibold text-slate-800">{title}</span>
              </button>
              <ItemControls
                fixed={field.fixed}
                index={index}
                count={items.length}
                onMove={move}
                onRemove={() => onChange(items.filter((_, i) => i !== index))}
                canRemove={items.length > (field.min ?? 0)}
                disabled={disabled}
                label={title}
              />
            </div>
            {isOpen ? (
              <div className="space-y-5 border-t border-slate-100 px-4 py-4">
                {field.fields.map((child) => (
                  <Field
                    key={child.name}
                    field={child}
                    value={item?.[child.name]}
                    onChange={(next) => updateItem(index, child.name, next)}
                    errors={errors}
                    path={`${path}.${index}.${child.name}`}
                    disabled={disabled}
                  />
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
      {!field.fixed && (!field.max || items.length < field.max) ? (
        <Button
          size="sm"
          icon={Plus}
          onClick={() => {
            onChange([...items, blankItem(field.fields)]);
            setOpen((current) => [...current, items.length]);
          }}
          disabled={disabled}
        >
          Add {(field.itemLabel ?? 'item').toLowerCase()}
        </Button>
      ) : null}
    </fieldset>
  );
}
