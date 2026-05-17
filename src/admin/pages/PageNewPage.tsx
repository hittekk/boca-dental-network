import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, Sparkles, Check } from 'lucide-react';
import * as Icons from 'lucide-react';
import { supabase, type DbPageTemplate } from '../../lib/supabase';

const ORANGE = '#F3672A';
const NAVY = '#162E7A';
const DARK_NAVY = '#001D3D';

export default function PageNewPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedTemplate, setSelectedTemplate] = useState<DbPageTemplate | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');

  const { data: templates, isLoading } = useQuery({
    queryKey: ['admin', 'page_templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_templates')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      if (error) throw error;
      return (data ?? []) as DbPageTemplate[];
    },
  });

  const create = useMutation({
    mutationFn: async () => {
      if (!selectedTemplate) throw new Error('No template selected');
      const { data, error } = await supabase
        .from('pages')
        .insert({
          slug: slug || slugify(title),
          title,
          template_id: selectedTemplate.id,
          content: selectedTemplate.default_content ?? {},
          status: 'draft',
        })
        .select('id')
        .single();
      if (error) throw error;
      return data.id as string;
    },
    onSuccess: (id) => navigate(`/dental-admin/pages/${id}`),
  });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <Link
        to="/dental-admin/pages"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        All pages
      </Link>

      {/* Stepper */}
      <div className="flex items-center gap-3 mb-8">
        <Step number={1} label="Pick a template" active={step === 1} done={step > 1} />
        <div className="flex-1 h-px bg-slate-200" />
        <Step number={2} label="Name your page" active={step === 2} done={false} />
      </div>

      {step === 1 && (
        <>
          <div className="mb-6">
            <div
              className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2"
              style={{ background: `${ORANGE}15`, color: ORANGE }}
            >
              <Sparkles className="h-3 w-3" />
              Step 1 of 2
            </div>
            <h1 className="text-3xl font-extrabold" style={{ color: DARK_NAVY }}>
              Pick a template
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Templates determine which fields appear in the editor. Pick the one that matches what you're building.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-16 text-slate-400">Loading templates...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates?.map((tpl) => {
                const Icon = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[tpl.icon ?? 'FileText'] ?? Icons.FileText;
                const isSelected = selectedTemplate?.id === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    onClick={() => setSelectedTemplate(tpl)}
                    className={`group text-left rounded-2xl border-2 p-5 transition-all hover:-translate-y-0.5 ${
                      isSelected
                        ? 'shadow-lg'
                        : 'border-slate-200 bg-white hover:shadow-md'
                    }`}
                    style={isSelected ? { borderColor: ORANGE, background: `${ORANGE}05` } : undefined}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="h-10 w-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{
                          background: isSelected ? ORANGE : `${NAVY}15`,
                          color: isSelected ? 'white' : NAVY,
                        }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      {isSelected && (
                        <div
                          className="h-6 w-6 rounded-full flex items-center justify-center"
                          style={{ background: ORANGE }}
                        >
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-base mb-1" style={{ color: DARK_NAVY }}>
                      {tpl.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3">{tpl.description}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      <span>{tpl.category}</span>
                      <span>·</span>
                      <span>
                        {tpl.field_schema?.sections?.reduce((n, s) => n + s.fields.length, 0) ?? 0} fields
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex justify-end mt-6">
            <button
              disabled={!selectedTemplate}
              onClick={() => setStep(2)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: ORANGE }}
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </>
      )}

      {step === 2 && selectedTemplate && (
        <>
          <div className="mb-6">
            <div
              className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2"
              style={{ background: `${ORANGE}15`, color: ORANGE }}
            >
              <Sparkles className="h-3 w-3" />
              Step 2 of 2 · {selectedTemplate.name} template
            </div>
            <h1 className="text-3xl font-extrabold" style={{ color: DARK_NAVY }}>
              Name your page
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              You'll be able to add content on the next screen.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-xl">
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold mb-1.5 text-slate-600 uppercase tracking-wider">
                  Page title <span style={{ color: ORANGE }}>*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!slug || slug === slugify(title)) setSlug(slugify(e.target.value));
                  }}
                  placeholder="About Boca Dental"
                  className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold mb-1.5 text-slate-600 uppercase tracking-wider">
                  URL slug
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-mono">/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(slugify(e.target.value))}
                    placeholder="about-boca-dental"
                    className="flex-1 px-3.5 py-2.5 rounded-lg border-2 border-slate-200 text-sm font-mono focus:outline-none focus:border-orange-500"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Auto-generated from title. Change it if you want a custom URL.
                </p>
              </div>
              {create.error && (
                <div className="text-sm text-red-600 px-3 py-2 rounded-lg bg-red-50 border border-red-100">
                  {(create.error as Error).message}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              disabled={!title || create.isPending}
              onClick={() => create.mutate()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-all active:scale-[0.98] disabled:opacity-50"
              style={{ background: ORANGE }}
            >
              {create.isPending ? 'Creating...' : 'Create page'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function Step({ number, label, active, done }: { number: number; label: string; active: boolean; done: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors"
        style={{
          background: done ? ORANGE : active ? DARK_NAVY : '#E2E8F0',
          color: done || active ? 'white' : '#94A3B8',
        }}
      >
        {done ? <Check className="h-4 w-4" /> : number}
      </div>
      <span
        className="text-xs font-semibold uppercase tracking-wider"
        style={{ color: active || done ? DARK_NAVY : '#94A3B8' }}
      >
        {label}
      </span>
    </div>
  );
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
