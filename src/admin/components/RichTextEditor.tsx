import { useRef, useEffect, useState } from 'react';
import { Bold, Italic, Underline, Heading2, Heading3, List, ListOrdered, Link2, Image as ImageIcon, RemoveFormatting, Loader2 } from 'lucide-react';
import { uploadMedia } from '../../lib/supabase';

const ORANGE = '#F3672A';

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

// Lightweight WordPress-style WYSIWYG. Edits HTML in a contentEditable surface and
// emits the HTML string, which the public page renders via PageBody (richtext).
export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const savedRange = useRef<Range | null>(null);
  const [uploading, setUploading] = useState(false);

  // Sync external changes (loading a page, switching fields) without clobbering
  // the caret while the user is actively typing in this editor.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const incoming = value || '';
    if (el !== document.activeElement && el.innerHTML !== incoming) {
      el.innerHTML = incoming;
    }
  }, [value]);

  function emit() {
    onChange(ref.current?.innerHTML ?? '');
  }

  function exec(command: string, arg?: string) {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    emit();
  }

  function addLink() {
    const url = window.prompt('Link URL (https://…)');
    if (url) exec('createLink', url);
  }

  // Remember where the caret is before the file dialog steals focus.
  function pickImage() {
    const sel = window.getSelection();
    savedRange.current = sel && sel.rangeCount ? sel.getRangeAt(0) : null;
    fileRef.current?.click();
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadMedia(file, 'pages');
      const el = ref.current;
      el?.focus();
      // Restore the caret position from before the dialog opened.
      if (savedRange.current) {
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(savedRange.current);
      }
      const img = `<img src="${url}" alt="" style="max-width:100%;height:auto;border-radius:12px;margin:12px 0;" />`;
      document.execCommand('insertHTML', false, img);
      emit();
    } catch (err) {
      alert('Image upload failed. Please try again.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="border-2 border-slate-200 rounded-lg overflow-hidden focus-within:border-orange-500 transition-colors bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-slate-100 bg-slate-50">
        <ToolBtn label="Bold" onClick={() => exec('bold')}><Bold className="h-3.5 w-3.5" /></ToolBtn>
        <ToolBtn label="Italic" onClick={() => exec('italic')}><Italic className="h-3.5 w-3.5" /></ToolBtn>
        <ToolBtn label="Underline" onClick={() => exec('underline')}><Underline className="h-3.5 w-3.5" /></ToolBtn>
        <Divider />
        <ToolBtn label="Heading" onClick={() => exec('formatBlock', 'H2')}><Heading2 className="h-3.5 w-3.5" /></ToolBtn>
        <ToolBtn label="Subheading" onClick={() => exec('formatBlock', 'H3')}><Heading3 className="h-3.5 w-3.5" /></ToolBtn>
        <ToolBtn label="Normal text" onClick={() => exec('formatBlock', 'P')}><span className="text-[11px] font-bold px-0.5">P</span></ToolBtn>
        <Divider />
        <ToolBtn label="Bullet list" onClick={() => exec('insertUnorderedList')}><List className="h-3.5 w-3.5" /></ToolBtn>
        <ToolBtn label="Numbered list" onClick={() => exec('insertOrderedList')}><ListOrdered className="h-3.5 w-3.5" /></ToolBtn>
        <Divider />
        <ToolBtn label="Add link" onClick={addLink}><Link2 className="h-3.5 w-3.5" /></ToolBtn>
        <ToolBtn label="Insert image" onClick={pickImage}>
          {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImageIcon className="h-3.5 w-3.5" />}
        </ToolBtn>
        <ToolBtn label="Clear formatting" onClick={() => exec('removeFormat')}><RemoveFormatting className="h-3.5 w-3.5" /></ToolBtn>
      </div>

      {/* Editable surface */}
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        onBlur={emit}
        data-placeholder={placeholder ?? 'Write your content here…'}
        className="rte-surface px-3.5 py-3 min-h-[180px] text-sm text-slate-900 focus:outline-none"
      />

      <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />

      <style>{`
        .rte-surface:empty:before { content: attr(data-placeholder); color: #94a3b8; pointer-events: none; }
        .rte-surface h2 { font-size: 1.25rem; font-weight: 800; margin: 0.6em 0 0.3em; color: #001D3D; }
        .rte-surface h3 { font-size: 1.05rem; font-weight: 700; margin: 0.5em 0 0.3em; color: #001D3D; }
        .rte-surface p { margin: 0.5em 0; line-height: 1.7; }
        .rte-surface ul { list-style: disc; padding-left: 1.5em; margin: 0.5em 0; }
        .rte-surface ol { list-style: decimal; padding-left: 1.5em; margin: 0.5em 0; }
        .rte-surface li { margin: 0.2em 0; }
        .rte-surface a { color: ${ORANGE}; text-decoration: underline; }
        .rte-surface img { max-width: 100%; height: auto; border-radius: 12px; }
      `}</style>
    </div>
  );
}

function ToolBtn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={label}
      // preventDefault keeps the editor's selection so execCommand applies to it
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="h-7 min-w-[28px] px-1.5 rounded flex items-center justify-center text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm transition-all"
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="w-px h-4 bg-slate-200 mx-1" />;
}
