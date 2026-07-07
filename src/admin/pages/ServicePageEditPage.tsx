import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save, Loader2, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { SERVICE_CATEGORIES, SERVICE_PAGES } from '../../data/serviceCatalog';
import { SERVICE_CONTENT } from '../../data/serviceContent';

const ORANGE = '#F3672A';
const NAVY = '#162E7A';
const DARK_NAVY = '#001D3D';

type Fact = { value: string; label: string };
type Step = { number: string; title: string; body: string };
type Benefit = { icon: string; label: string; body: string };
type SubType = { title: string; body: string };
type Faq = { question: string; answer: string };
type CmpRow = { factor: string; thisValue: string; altValue: string };
type Comparison = { thisLabel: string; altLabel: string; rows: CmpRow[] };

type Form = {
  // identity / columns
  slug: string;
  category_slug: string;
  label: string;
  short_desc: string;
  is_pediatric: boolean;
  is_published: boolean;
  sort_order: number;
  // SEO columns
  title_tag: string;
  meta_description: string;
  primary_keyword: string;
  secondary_keywords: string[];
  h1: string;
  hero_intro: string;
  hero_alt: string;
  // content jsonb (body)
  whatIsHeader: string;
  whatIsBody: string[];
  keyFacts: Fact[];
  subTypes: SubType[];
  signsLabel: string;
  signs: string[];
  candidacyLabel: string;
  candidacy: string[];
  candidacyCaveat: string;
  processHeader: string;
  processIntro: string;
  steps: Step[];
  duration: string;
  technology: string;
  benefitsHeader: string;
  benefits: Benefit[];
  hasComparison: boolean;
  comparison: Comparison;
  differentiators: string[];
  providerSentence: string;
  providerSlug: string;
  nineLocationStatement: string;
  faqs: Faq[];
  costHeader: string;
  costValue: string;
  costContext: string;
  inlineCTA: string;
  relatedSlugs: string[];
  geoParagraph: string;
};

const BLANK: Form = {
  slug: '', category_slug: SERVICE_CATEGORIES[0]?.slug ?? '', label: '', short_desc: '',
  is_pediatric: false, is_published: true, sort_order: 0,
  title_tag: '', meta_description: '', primary_keyword: '', secondary_keywords: [], h1: '',
  hero_intro: '', hero_alt: '',
  whatIsHeader: '', whatIsBody: [''], keyFacts: [], subTypes: [],
  signsLabel: '', signs: [], candidacyLabel: '', candidacy: [], candidacyCaveat: '',
  processHeader: '', processIntro: '', steps: [], duration: '', technology: '',
  benefitsHeader: '', benefits: [], hasComparison: false,
  comparison: { thisLabel: '', altLabel: '', rows: [] },
  differentiators: [], providerSentence: '', providerSlug: '', nineLocationStatement: '',
  faqs: [], costHeader: '', costValue: '', costContext: '', inlineCTA: '',
  relatedSlugs: [], geoParagraph: '',
};

type AnyContent = Record<string, unknown>;

/** Merge static + DB row into the flat Form used by the editor. */
function buildForm(slug: string | undefined, dbRow: AnyContent | null): Form {
  const f: Form = { ...BLANK };
  const sc = slug ? (SERVICE_CONTENT[slug] as unknown as AnyContent | undefined) : undefined;
  const entry = slug ? SERVICE_PAGES.find((p) => p.slug === slug) : undefined;

  // 1) static catalog entry (label / category / desc)
  if (entry) {
    f.slug = entry.slug;
    f.label = entry.label;
    f.category_slug = entry.categorySlug;
    f.short_desc = entry.desc ?? '';
  }
  // 2) static full content (body + SEO), if it exists
  const apply = (c: AnyContent | undefined) => {
    if (!c) return;
    if (c.slug) f.slug = c.slug as string;
    if (c.label) f.label = c.label as string;
    if (c.categorySlug) f.category_slug = c.categorySlug as string;
    if (c.titleTag !== undefined) f.title_tag = (c.titleTag as string) ?? '';
    if (c.metaDesc !== undefined) f.meta_description = (c.metaDesc as string) ?? '';
    if (c.primaryKeyword !== undefined) f.primary_keyword = (c.primaryKeyword as string) ?? '';
    if (c.secondaryKeywords) f.secondary_keywords = c.secondaryKeywords as string[];
    if (c.h1 !== undefined) f.h1 = (c.h1 as string) ?? '';
    if (c.heroIntro !== undefined) f.hero_intro = (c.heroIntro as string) ?? '';
    if (c.heroAlt !== undefined) f.hero_alt = (c.heroAlt as string) ?? '';
    if (c.whatIsHeader !== undefined) f.whatIsHeader = (c.whatIsHeader as string) ?? '';
    if (c.whatIsBody) f.whatIsBody = (c.whatIsBody as string[]).length ? (c.whatIsBody as string[]) : [''];
    if (c.keyFacts) f.keyFacts = c.keyFacts as Fact[];
    if (c.subTypes) f.subTypes = c.subTypes as SubType[];
    if (c.signsLabel !== undefined) f.signsLabel = (c.signsLabel as string) ?? '';
    if (c.signs) f.signs = c.signs as string[];
    if (c.candidacyLabel !== undefined) f.candidacyLabel = (c.candidacyLabel as string) ?? '';
    if (c.candidacy) f.candidacy = c.candidacy as string[];
    if (c.candidacyCaveat !== undefined) f.candidacyCaveat = (c.candidacyCaveat as string) ?? '';
    if (c.processHeader !== undefined) f.processHeader = (c.processHeader as string) ?? '';
    if (c.processIntro !== undefined) f.processIntro = (c.processIntro as string) ?? '';
    if (c.steps) f.steps = c.steps as Step[];
    if (c.duration !== undefined) f.duration = (c.duration as string) ?? '';
    if (c.technology !== undefined) f.technology = (c.technology as string) ?? '';
    if (c.benefitsHeader !== undefined) f.benefitsHeader = (c.benefitsHeader as string) ?? '';
    if (c.benefits) f.benefits = c.benefits as Benefit[];
    if (c.comparison) {
      f.hasComparison = true;
      f.comparison = c.comparison as Comparison;
    }
    if (c.differentiators) f.differentiators = c.differentiators as string[];
    if (c.providerInline) {
      const pi = c.providerInline as { sentence?: string; providerSlug?: string };
      f.providerSentence = pi.sentence ?? '';
      f.providerSlug = pi.providerSlug ?? '';
    }
    if (c.nineLocationStatement !== undefined) f.nineLocationStatement = (c.nineLocationStatement as string) ?? '';
    if (c.faqs) f.faqs = c.faqs as Faq[];
    if (c.costHeader !== undefined) f.costHeader = (c.costHeader as string) ?? '';
    if (c.costRange) {
      const cr = c.costRange as { value?: string; context?: string };
      f.costValue = cr.value ?? '';
      f.costContext = cr.context ?? '';
    }
    if (c.inlineCTA !== undefined) f.inlineCTA = (c.inlineCTA as string) ?? '';
    if (c.relatedSlugs) f.relatedSlugs = c.relatedSlugs as string[];
    if (c.geoParagraph !== undefined) f.geoParagraph = (c.geoParagraph as string) ?? '';
  };
  apply(sc);

  // 3) DB row wins (columns + content jsonb)
  if (dbRow) {
    if (dbRow.slug) f.slug = dbRow.slug as string;
    if (dbRow.category_slug) f.category_slug = dbRow.category_slug as string;
    if (dbRow.label) f.label = dbRow.label as string;
    f.short_desc = (dbRow.short_desc as string) ?? f.short_desc;
    f.title_tag = (dbRow.title_tag as string) ?? f.title_tag;
    f.meta_description = (dbRow.meta_description as string) ?? f.meta_description;
    f.primary_keyword = (dbRow.primary_keyword as string) ?? f.primary_keyword;
    if (dbRow.secondary_keywords) f.secondary_keywords = dbRow.secondary_keywords as string[];
    f.h1 = (dbRow.h1 as string) ?? f.h1;
    f.hero_intro = (dbRow.hero_intro as string) ?? f.hero_intro;
    f.hero_alt = (dbRow.hero_alt as string) ?? f.hero_alt;
    f.is_pediatric = Boolean(dbRow.is_pediatric);
    f.is_published = dbRow.is_published === undefined ? true : Boolean(dbRow.is_published);
    f.sort_order = (dbRow.sort_order as number) ?? 0;
    apply(dbRow.content as AnyContent | undefined);
  }
  return f;
}

function buildContentJson(f: Form): AnyContent {
  const c: AnyContent = {
    whatIsHeader: f.whatIsHeader,
    whatIsBody: f.whatIsBody.filter((p) => p.trim()),
    keyFacts: f.keyFacts,
    signsLabel: f.signsLabel,
    signs: f.signs.filter((s) => s.trim()),
    candidacyLabel: f.candidacyLabel,
    candidacy: f.candidacy.filter((s) => s.trim()),
    processHeader: f.processHeader,
    processIntro: f.processIntro,
    steps: f.steps,
    duration: f.duration,
    technology: f.technology,
    benefitsHeader: f.benefitsHeader,
    benefits: f.benefits,
    differentiators: f.differentiators.filter((s) => s.trim()),
    providerInline: { sentence: f.providerSentence, providerSlug: f.providerSlug || undefined },
    nineLocationStatement: f.nineLocationStatement,
    faqs: f.faqs,
    costHeader: f.costHeader,
    costRange: { value: f.costValue, context: f.costContext },
    inlineCTA: f.inlineCTA,
    relatedSlugs: f.relatedSlugs.filter((s) => s.trim()),
  };
  if (f.subTypes.length) c.subTypes = f.subTypes;
  if (f.candidacyCaveat.trim()) c.candidacyCaveat = f.candidacyCaveat;
  if (f.geoParagraph.trim()) c.geoParagraph = f.geoParagraph;
  if (f.hasComparison && (f.comparison.thisLabel || f.comparison.rows.length)) c.comparison = f.comparison;
  return c;
}

export default function ServicePageEditPage({ isNew = false }: { isNew?: boolean }) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [form, setForm] = useState<Form>(BLANK);
  const [saved, setSaved] = useState(false);
  const [ready, setReady] = useState(isNew);

  const { data: dbRow, isLoading } = useQuery({
    queryKey: ['admin', 'service_page', slug],
    queryFn: async () => {
      const { data, error } = await supabase.from('service_pages').select('*').eq('slug', slug!).maybeSingle();
      if (error) throw error;
      return (data ?? null) as AnyContent | null;
    },
    enabled: !isNew && !!slug,
  });

  useEffect(() => {
    if (isNew) {
      setForm({ ...BLANK });
      setReady(true);
    } else if (!isLoading) {
      setForm(buildForm(slug, dbRow ?? null));
      setReady(true);
    }
  }, [isNew, slug, dbRow, isLoading]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const save = useMutation({
    mutationFn: async () => {
      const payload = {
        slug: form.slug.trim(),
        category_slug: form.category_slug,
        label: form.label.trim(),
        short_desc: form.short_desc.trim() || null,
        title_tag: form.title_tag.trim() || null,
        meta_description: form.meta_description.trim() || null,
        primary_keyword: form.primary_keyword.trim() || null,
        secondary_keywords: form.secondary_keywords.filter((s) => s.trim()),
        h1: form.h1.trim() || null,
        hero_intro: form.hero_intro.trim() || null,
        hero_alt: form.hero_alt.trim() || null,
        is_pediatric: form.is_pediatric,
        is_published: form.is_published,
        sort_order: form.sort_order,
        content: buildContentJson(form),
      };
      const { error } = await supabase.from('service_pages').upsert(payload, { onConflict: 'slug' });
      if (error) throw error;
      return form.slug.trim();
    },
    onSuccess: (savedSlug) => {
      qc.invalidateQueries({ queryKey: ['admin', 'service_pages'] });
      qc.invalidateQueries({ queryKey: ['admin', 'service_page', savedSlug] });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      if (isNew) navigate(`/dental-admin/service-pages/${savedSlug}`);
    },
  });

  const category = useMemo(
    () => SERVICE_CATEGORIES.find((c) => c.slug === form.category_slug),
    [form.category_slug]
  );

  if (!ready) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-slate-300" />
      </div>
    );
  }

  const canSave = form.label.trim() && form.slug.trim() && form.category_slug && !save.isPending;

  return (
    <div className="p-8 max-w-4xl mx-auto pb-24">
      <div className="flex items-center justify-between mb-6">
        <Link to="/dental-admin/service-pages" className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" />
          All service pages
        </Link>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-emerald-600 font-semibold">Saved!</span>}
          {save.isError && <span className="text-xs text-red-600 font-semibold">Save failed — check slug is unique.</span>}
          <button
            onClick={() => save.mutate()}
            disabled={!canSave}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm text-white disabled:opacity-50 active:scale-[0.98] transition-all"
            style={{ background: ORANGE }}
          >
            {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isNew ? 'Create page' : 'Save changes'}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2" style={{ background: `${NAVY}10`, color: NAVY }}>
          {isNew ? 'New Service Page' : 'Editing Service Page'}
        </div>
        <h1 className="text-3xl font-extrabold" style={{ color: DARK_NAVY }}>{form.label || 'New service page'}</h1>
        {form.slug && form.category_slug && (
          <p className="text-sm text-slate-500 mt-1 font-mono">/{form.category_slug}/{form.slug}/</p>
        )}
      </div>

      <div className="space-y-5">
        {/* IDENTITY */}
        <Card title="Identity">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Service name" className="col-span-2">
              <input className="input-style" value={form.label} onChange={(e) => set('label', e.target.value)} placeholder="Dental Crowns" />
            </Field>
            <Field label="Category">
              <select className="input-style" value={form.category_slug} onChange={(e) => set('category_slug', e.target.value)}>
                {SERVICE_CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.label}</option>
                ))}
              </select>
            </Field>
            <Field label="URL slug">
              {isNew ? (
                <input className="input-style font-mono text-xs" value={form.slug} onChange={(e) => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} placeholder="dental-crowns" />
              ) : (
                <input className="input-style font-mono text-xs bg-slate-50 text-slate-500" value={form.slug} readOnly title="Slug can't change after creation (it's the page URL)" />
              )}
            </Field>
            <Field label="Short description (shown in category lists)" className="col-span-2">
              <input className="input-style" value={form.short_desc} onChange={(e) => set('short_desc', e.target.value)} placeholder="Porcelain, zirconia, and PFM crowns for damaged teeth." />
            </Field>
          </div>
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100">
            <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
              <input type="checkbox" checked={form.is_published} onChange={(e) => set('is_published', e.target.checked)} className="h-4 w-4 rounded accent-orange-500" />
              {form.is_published ? <Eye className="h-3.5 w-3.5 text-emerald-500" /> : <EyeOff className="h-3.5 w-3.5 text-slate-400" />}
              Published
            </label>
            <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
              <input type="checkbox" checked={form.is_pediatric} onChange={(e) => set('is_pediatric', e.target.checked)} className="h-4 w-4 rounded accent-orange-500" />
              Pediatric (Boca Kids)
            </label>
          </div>
        </Card>

        {/* SEO + HERO */}
        <Card title="SEO & Hero">
          <Field label="Page title (browser tab / search result title)">
            <input className="input-style" value={form.title_tag} onChange={(e) => set('title_tag', e.target.value)} placeholder="Dental Crowns in Reno, NV | Boca Specialty Dental and Braces" />
          </Field>
          <div className="mt-4">
            <Field label="Meta description (search snippet, ~155 chars)">
              <textarea className="input-style" rows={2} value={form.meta_description} onChange={(e) => set('meta_description', e.target.value)} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Field label="Primary keyword">
              <input className="input-style" value={form.primary_keyword} onChange={(e) => set('primary_keyword', e.target.value)} placeholder="dental crowns reno" />
            </Field>
            <Field label="H1 headline">
              <input className="input-style" value={form.h1} onChange={(e) => set('h1', e.target.value)} placeholder="Dental Crowns in Reno, NV" />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Secondary keywords">
              <StringList value={form.secondary_keywords} onChange={(v) => set('secondary_keywords', v)} placeholder="zirconia crown reno" />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Hero intro paragraph">
              <textarea className="input-style" rows={3} value={form.hero_intro} onChange={(e) => set('hero_intro', e.target.value)} />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Hero image alt text">
              <input className="input-style" value={form.hero_alt} onChange={(e) => set('hero_alt', e.target.value)} />
            </Field>
          </div>
        </Card>

        {/* WHAT IS */}
        <Card title="What Is — overview">
          <Field label="Section heading">
            <input className="input-style" value={form.whatIsHeader} onChange={(e) => set('whatIsHeader', e.target.value)} placeholder="What Is a Dental Crown?" />
          </Field>
          <div className="mt-4">
            <Field label="Body paragraphs">
              <StringList value={form.whatIsBody} onChange={(v) => set('whatIsBody', v)} multiline placeholder="Paragraph text…" addLabel="Add paragraph" />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Stat cards (the big numbers)">
              <RepeatList
                items={form.keyFacts}
                onChange={(v) => set('keyFacts', v)}
                blank={() => ({ value: '', label: '' })}
                addLabel="Add stat"
                render={(it, patch) => (
                  <div className="grid grid-cols-3 gap-3">
                    <input className="input-style col-span-1" value={it.value} onChange={(e) => patch({ value: e.target.value })} placeholder="10–15 yrs" />
                    <input className="input-style col-span-2" value={it.label} onChange={(e) => patch({ label: e.target.value })} placeholder="Typical lifespan with good care" />
                  </div>
                )}
              />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Sub-types (optional H3 blocks, e.g. crown materials)">
              <RepeatList
                items={form.subTypes}
                onChange={(v) => set('subTypes', v)}
                blank={() => ({ title: '', body: '' })}
                addLabel="Add sub-type"
                render={(it, patch) => (
                  <div className="space-y-2">
                    <input className="input-style" value={it.title} onChange={(e) => patch({ title: e.target.value })} placeholder="Porcelain crowns" />
                    <textarea className="input-style" rows={2} value={it.body} onChange={(e) => patch({ body: e.target.value })} placeholder="Description…" />
                  </div>
                )}
              />
            </Field>
          </div>
        </Card>

        {/* SIGNS + CANDIDACY */}
        <Card title="Signs & Candidacy">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Field label="Signs heading">
                <input className="input-style" value={form.signsLabel} onChange={(e) => set('signsLabel', e.target.value)} placeholder="Signs You May Need a Crown" />
              </Field>
              <div className="mt-3">
                <StringList value={form.signs} onChange={(v) => set('signs', v)} placeholder="Cracked or fractured tooth" />
              </div>
            </div>
            <div>
              <Field label="Candidacy heading">
                <input className="input-style" value={form.candidacyLabel} onChange={(e) => set('candidacyLabel', e.target.value)} placeholder="Who Is a Good Candidate?" />
              </Field>
              <div className="mt-3">
                <StringList value={form.candidacy} onChange={(v) => set('candidacy', v)} placeholder="Adults with a damaged tooth" />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Field label="Caveat (optional)">
              <input className="input-style" value={form.candidacyCaveat} onChange={(e) => set('candidacyCaveat', e.target.value)} />
            </Field>
          </div>
        </Card>

        {/* PROCESS */}
        <Card title="Process / Steps">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Process heading">
              <input className="input-style" value={form.processHeader} onChange={(e) => set('processHeader', e.target.value)} placeholder="What to Expect" />
            </Field>
            <Field label="Process intro (one sentence)">
              <input className="input-style" value={form.processIntro} onChange={(e) => set('processIntro', e.target.value)} />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Steps">
              <RepeatList
                items={form.steps}
                onChange={(v) => set('steps', v)}
                blank={() => ({ number: String(form.steps.length + 1).padStart(2, '0'), title: '', body: '' })}
                addLabel="Add step"
                render={(it, patch) => (
                  <div className="space-y-2">
                    <div className="grid grid-cols-4 gap-2">
                      <input className="input-style col-span-1" value={it.number} onChange={(e) => patch({ number: e.target.value })} placeholder="01" />
                      <input className="input-style col-span-3" value={it.title} onChange={(e) => patch({ title: e.target.value })} placeholder="Step title" />
                    </div>
                    <textarea className="input-style" rows={2} value={it.body} onChange={(e) => patch({ body: e.target.value })} placeholder="Step description…" />
                  </div>
                )}
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Field label="Duration / timeline callout">
              <input className="input-style" value={form.duration} onChange={(e) => set('duration', e.target.value)} placeholder="2 visits over 2–3 weeks" />
            </Field>
            <Field label="Technology mention">
              <input className="input-style" value={form.technology} onChange={(e) => set('technology', e.target.value)} placeholder="Digital impressions" />
            </Field>
          </div>
        </Card>

        {/* BENEFITS */}
        <Card title="Benefits">
          <Field label="Benefits heading">
            <input className="input-style" value={form.benefitsHeader} onChange={(e) => set('benefitsHeader', e.target.value)} placeholder="Benefits of Dental Crowns" />
          </Field>
          <div className="mt-4">
            <RepeatList
              items={form.benefits}
              onChange={(v) => set('benefits', v)}
              blank={() => ({ icon: 'Check', label: '', body: '' })}
              addLabel="Add benefit"
              render={(it, patch) => (
                <div className="space-y-2">
                  <div className="grid grid-cols-4 gap-2">
                    <input className="input-style col-span-1" value={it.icon} onChange={(e) => patch({ icon: e.target.value })} placeholder="Shield" title="Lucide icon name (e.g. Shield, Clock, Heart)" />
                    <input className="input-style col-span-3" value={it.label} onChange={(e) => patch({ label: e.target.value })} placeholder="Benefit title" />
                  </div>
                  <textarea className="input-style" rows={2} value={it.body} onChange={(e) => patch({ body: e.target.value })} placeholder="Benefit description…" />
                </div>
              )}
            />
            <p className="text-[11px] text-slate-400 mt-2">Icon = a Lucide icon name (Shield, Clock, Heart, ShieldCheck, Zap, Award…). Unknown names fall back to a checkmark.</p>
          </div>
        </Card>

        {/* COMPARISON */}
        <Card title="Comparison table (optional)">
          <label className="flex items-center gap-2 text-sm font-medium cursor-pointer mb-4">
            <input type="checkbox" checked={form.hasComparison} onChange={(e) => set('hasComparison', e.target.checked)} className="h-4 w-4 rounded accent-orange-500" />
            Include a comparison table
          </label>
          {form.hasComparison && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Field label="This option label">
                  <input className="input-style" value={form.comparison.thisLabel} onChange={(e) => set('comparison', { ...form.comparison, thisLabel: e.target.value })} placeholder="Crown" />
                </Field>
                <Field label="Alternative label">
                  <input className="input-style" value={form.comparison.altLabel} onChange={(e) => set('comparison', { ...form.comparison, altLabel: e.target.value })} placeholder="Filling" />
                </Field>
              </div>
              <div className="mt-4">
                <Field label="Rows">
                  <RepeatList
                    items={form.comparison.rows}
                    onChange={(rows) => set('comparison', { ...form.comparison, rows })}
                    blank={() => ({ factor: '', thisValue: '', altValue: '' })}
                    addLabel="Add row"
                    render={(it, patch) => (
                      <div className="grid grid-cols-3 gap-2">
                        <input className="input-style" value={it.factor} onChange={(e) => patch({ factor: e.target.value })} placeholder="Coverage" />
                        <input className="input-style" value={it.thisValue} onChange={(e) => patch({ thisValue: e.target.value })} placeholder="Entire tooth" />
                        <input className="input-style" value={it.altValue} onChange={(e) => patch({ altValue: e.target.value })} placeholder="Part of tooth" />
                      </div>
                    )}
                  />
                </Field>
              </div>
            </>
          )}
        </Card>

        {/* WHY BOCA */}
        <Card title="Why Boca">
          <Field label="Differentiators (bullet points)">
            <StringList value={form.differentiators} onChange={(v) => set('differentiators', v)} placeholder="Same-day crowns available" />
          </Field>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <Field label="Provider sentence (credibility line)">
              <textarea className="input-style" rows={2} value={form.providerSentence} onChange={(e) => set('providerSentence', e.target.value)} placeholder="Dr. Montalvo has placed thousands of crowns…" />
            </Field>
            <Field label="Provider slug (links the sentence to a dentist — optional)">
              <input className="input-style font-mono text-xs" value={form.providerSlug} onChange={(e) => set('providerSlug', e.target.value)} placeholder="dr-montalvo" />
            </Field>
            <Field label="Multi-location convenience statement">
              <textarea className="input-style" rows={2} value={form.nineLocationStatement} onChange={(e) => set('nineLocationStatement', e.target.value)} placeholder="Available at all 3 of our Reno & Sparks clinics…" />
            </Field>
          </div>
        </Card>

        {/* FAQ */}
        <Card title="FAQs">
          <RepeatList
            items={form.faqs}
            onChange={(v) => set('faqs', v)}
            blank={() => ({ question: '', answer: '' })}
            addLabel="Add FAQ"
            render={(it, patch) => (
              <div className="space-y-2">
                <input className="input-style font-semibold" value={it.question} onChange={(e) => patch({ question: e.target.value })} placeholder="Question?" />
                <textarea className="input-style" rows={3} value={it.answer} onChange={(e) => patch({ answer: e.target.value })} placeholder="Answer…" />
              </div>
            )}
          />
        </Card>

        {/* COST */}
        <Card title="Cost & Related">
          <Field label="Cost section heading">
            <input className="input-style" value={form.costHeader} onChange={(e) => set('costHeader', e.target.value)} placeholder="How Much Do Crowns Cost in Reno?" />
          </Field>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Field label="Cost value">
              <input className="input-style" value={form.costValue} onChange={(e) => set('costValue', e.target.value)} placeholder="Leave blank — no pricing on site" />
            </Field>
            <Field label="Cost context">
              <input className="input-style" value={form.costContext} onChange={(e) => set('costContext', e.target.value)} placeholder="per crown, varies by material" />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Financing / inline CTA text">
              <input className="input-style" value={form.inlineCTA} onChange={(e) => set('inlineCTA', e.target.value)} />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Related service slugs">
              <StringList value={form.relatedSlugs} onChange={(v) => set('relatedSlugs', v)} placeholder="dental-bridges" mono />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Local SEO paragraph (optional override)">
              <textarea className="input-style" rows={3} value={form.geoParagraph} onChange={(e) => set('geoParagraph', e.target.value)} />
            </Field>
          </div>
        </Card>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={() => save.mutate()}
          disabled={!canSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white disabled:opacity-50 active:scale-[0.98] transition-all"
          style={{ background: ORANGE }}
        >
          {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isNew ? 'Create page' : 'Save changes'}
        </button>
      </div>

      <p className="text-[11px] text-slate-400 mt-4">
        Category: {category?.label ?? form.category_slug}. Saved changes appear immediately for visitors browsing the live
        site; the pre-rendered HTML and sitemap refresh on the next publish/deploy.
      </p>

      <style>{`
        .input-style { width: 100%; padding: 0.55rem 0.8rem; border-radius: 0.5rem; border: 1.5px solid rgb(226 232 240); font-size: 0.875rem; color: ${DARK_NAVY}; background: white; transition: border-color 150ms; }
        .input-style:focus { outline: none; border-color: ${ORANGE}; }
      `}</style>
    </div>
  );
}

/* ---------- reusable bits ---------- */

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h2 className="font-bold text-sm uppercase tracking-wider mb-5" style={{ color: NAVY }}>{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-[11px] font-bold mb-1.5 text-slate-600 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}

function StringList({
  value, onChange, placeholder, multiline = false, mono = false, addLabel = 'Add',
}: {
  value: string[]; onChange: (v: string[]) => void; placeholder?: string; multiline?: boolean; mono?: boolean; addLabel?: string;
}) {
  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          {multiline ? (
            <textarea className="input-style" rows={2} value={item} placeholder={placeholder}
              onChange={(e) => { const n = [...value]; n[i] = e.target.value; onChange(n); }} />
          ) : (
            <input className={`input-style ${mono ? 'font-mono text-xs' : ''}`} value={item} placeholder={placeholder}
              onChange={(e) => { const n = [...value]; n[i] = e.target.value; onChange(n); }} />
          )}
          <button onClick={() => onChange(value.filter((_, j) => j !== i))}
            className="h-9 w-9 mt-0.5 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 flex-shrink-0">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button onClick={() => onChange([...value, ''])}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-orange-600">
        <Plus className="h-3 w-3" />{addLabel}
      </button>
    </div>
  );
}

function RepeatList<T>({
  items, onChange, blank, addLabel, render,
}: {
  items: T[]; onChange: (next: T[]) => void; blank: () => T; addLabel: string;
  render: (item: T, patch: (p: Partial<T>) => void) => React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={i} className="rounded-lg border border-slate-200 bg-slate-50/40 p-3 pr-10 relative">
          <button onClick={() => onChange(items.filter((_, j) => j !== i))}
            className="absolute top-2 right-2 h-7 w-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          {render(it, (p) => { const n = [...items]; n[i] = { ...it, ...p }; onChange(n); })}
        </div>
      ))}
      <button onClick={() => onChange([...items, blank()])}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-orange-600">
        <Plus className="h-3 w-3" />{addLabel}
      </button>
    </div>
  );
}
