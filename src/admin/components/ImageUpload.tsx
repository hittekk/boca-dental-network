import { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { uploadMedia } from '../../lib/supabase';

const ORANGE = '#F3672A';
const NAVY = '#162E7A';

type Props = {
  value: string | null;
  onChange: (url: string | null) => void;
  label?: string;
  folder?: string;
  aspectRatio?: 'square' | 'wide' | 'tall';
  height?: number;
};

export default function ImageUpload({
  value,
  onChange,
  label,
  folder = 'uploads',
  aspectRatio = 'wide',
  height,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    try {
      const url = await uploadMedia(file, folder);
      onChange(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  }

  const ratioClass =
    aspectRatio === 'square' ? 'aspect-square' :
    aspectRatio === 'tall' ? 'aspect-[3/4]' :
    'aspect-[16/9]';

  return (
    <div>
      {label && (
        <label className="block text-[11px] font-bold mb-1.5 text-slate-600 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className={`relative ${ratioClass} rounded-xl border-2 border-dashed transition-all overflow-hidden ${
          value ? 'border-transparent' : 'border-slate-300 hover:border-orange-400 bg-slate-50'
        }`}
        style={height ? { aspectRatio: 'auto', height } : undefined}
      >
        {value ? (
          <>
            <img
              src={value}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <button
              type="button"
              onClick={() => onChange(null)}
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg backdrop-blur-sm transition-all hover:scale-110"
              title="Remove image"
            >
              <X className="h-4 w-4 text-slate-700" />
            </button>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-2 left-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/90 hover:bg-white text-slate-700 shadow-lg flex items-center gap-1.5 transition-all"
            >
              <Upload className="h-3 w-3" />
              Replace
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-orange-500 transition-colors group"
          >
            {uploading ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="text-xs font-semibold">Uploading...</span>
              </>
            ) : (
              <>
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
                  style={{ background: `${ORANGE}15` }}
                >
                  <ImageIcon className="h-5 w-5" style={{ color: ORANGE }} />
                </div>
                <span className="text-xs font-semibold">Click or drop image</span>
                <span className="text-[10px] text-slate-400">PNG, JPG, WebP up to 10MB</span>
              </>
            )}
          </button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
      </div>
      {error && (
        <div className="mt-2 text-xs text-red-600">{error}</div>
      )}
    </div>
  );
}
