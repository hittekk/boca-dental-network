import { Plus, X } from 'lucide-react';
import type { TemplateField } from '../../lib/supabase';
import ImageUpload from './ImageUpload';
import RichTextEditor from './RichTextEditor';

const ORANGE = '#F3672A';

type Props = {
  field: TemplateField;
  value: unknown;
  onChange: (value: unknown) => void;
};

export default function DynamicField({ field, value, onChange }: Props) {
  return (
    <div>
      <label className="block text-[11px] font-bold mb-1.5 text-slate-600 uppercase tracking-wider">
        {field.label}
        {field.required && <span style={{ color: ORANGE }} className="ml-1">*</span>}
      </label>
      {renderInput(field, value, onChange)}
    </div>
  );
}

function renderInput(field: TemplateField, value: unknown, onChange: (v: unknown) => void) {
  const inputClass =
    'w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-orange-500 transition-colors';

  switch (field.type) {
    case 'text':
      return (
        <input
          type="text"
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={inputClass}
        />
      );

    case 'number':
      return (
        <input
          type="number"
          value={(value as number) ?? ''}
          onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))}
          placeholder={field.placeholder}
          className={inputClass}
        />
      );

    case 'textarea':
      return (
        <textarea
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={3}
          className={inputClass}
        />
      );

    case 'richtext':
      return (
        <RichTextEditor
          value={(value as string) ?? ''}
          onChange={onChange}
          placeholder={field.placeholder ?? 'Write your content here…'}
        />
      );

    case 'image':
      return (
        <ImageUpload
          value={(value as string) ?? null}
          onChange={onChange}
          folder="pages"
          aspectRatio="wide"
        />
      );

    case 'boolean':
      return (
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 rounded accent-orange-500"
          />
          <span className="text-sm text-slate-700">{field.placeholder ?? 'Enabled'}</span>
        </label>
      );

    case 'list': {
      const items = (value as string[]) ?? [];
      return (
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = e.target.value;
                  onChange(next);
                }}
                placeholder={field.item_label ?? 'Item'}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => onChange(items.filter((_, j) => j !== i))}
                className="h-9 w-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange([...items, ''])}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-orange-600 transition-colors"
          >
            <Plus className="h-3 w-3" />
            Add {field.item_label ?? 'item'}
          </button>
        </div>
      );
    }

    default:
      return <div className="text-xs text-red-500">Unknown field type: {field.type}</div>;
  }
}
