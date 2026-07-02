import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient = createClient(
  url || 'https://placeholder.supabase.co',
  anonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'boca-admin-auth',
    },
  }
);

export type DbLocation = {
  id: string;
  legacy_id: number | null;
  slug: string;
  label: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours: string;
  hours_detailed: { day: string; open: string; close: string; closed?: boolean; note?: string }[] | null;
  is_kids_clinic: boolean;
  rating: number | null;
  review_count: number;
  neighborhood: string | null;
  narrative: string | null;
  gbp_id: string | null;
  gbp_review_url: string | null;
  latitude: number | null;
  longitude: number | null;
  parking_info: string | null;
  languages: string[];
  insurance_notes: string | null;
  same_day_emergency: boolean;
  hero_image_url: string | null;
  exterior_image_url: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type DbService = {
  id: string;
  slug: string;
  label: string;
  short_description: string | null;
  category: string | null;
  parent_service_id: string | null;
  icon: string | null;
  hero_image_url: string | null;
  body_html: string | null;
  process_steps: Array<{ title: string; description: string }> | null;
  show_on_homepage: boolean;
  is_published: boolean;
  sort_order: number;
  meta_title: string | null;
  meta_description: string | null;
};

export type DbDoctor = {
  id: string;
  slug: string;
  name: string;
  title: string | null;
  bio: string | null;
  short_bio: string | null;
  credentials: string[] | null;
  specialties: string[] | null;
  languages: string[];
  alma_mater: string | null;
  graduation_year: number | null;
  years_experience: number | null;
  headshot_url: string | null;
  photo_url: string | null;
  is_published: boolean;
  sort_order: number;
};

export type DbOfficeManager = {
  id: string;
  name: string;
  title: string | null;
  location_id: string | null;
  image_url: string | null;
  is_published: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export type DbLead = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string;
  preferred_location_id: string | null;
  service_interest: string | null;
  message: string | null;
  pain_level: number | null;
  insurance: string | null;
  preferred_contact: string | null;
  source_page: string | null;
  source_form: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  contacted_at: string | null;
  closed_at: string | null;
};

export type TemplateField = {
  key: string;
  type: 'text' | 'textarea' | 'richtext' | 'image' | 'list' | 'number' | 'boolean';
  label: string;
  placeholder?: string;
  required?: boolean;
  item_label?: string;
};

export type TemplateSection = {
  id: string;
  title: string;
  fields: TemplateField[];
};

export type TemplateSchema = {
  sections: TemplateSection[];
};

export type DbPageTemplate = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  thumbnail_url: string | null;
  category: string | null;
  icon: string | null;
  field_schema: TemplateSchema;
  default_content: Record<string, Record<string, unknown>>;
  is_active: boolean;
  sort_order: number;
};

export type PageContent = Record<string, Record<string, unknown>>;

export type DbPage = {
  id: string;
  slug: string;
  title: string;
  template_id: string;
  content: PageContent;
  status: 'draft' | 'published' | 'archived';
  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  show_in_nav: boolean;
  nav_order: number;
  parent_page_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type DbTransformation = {
  id: string;
  title: string;
  description: string | null;
  treatment_type: string | null;
  before_image_url: string;
  after_image_url: string;
  patient_first_name: string | null;
  patient_age_range: string | null;
  treatment_duration: string | null;
  doctor_id: string | null;
  location_id: string | null;
  service_id: string | null;
  is_featured: boolean;
  is_published: boolean;
  consent_obtained: boolean;
  sort_order: number;
  created_at: string;
};

// Upload an image to Supabase Storage. Returns the public URL.
export async function uploadMedia(file: File, folder = 'uploads'): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const safeName = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from('media').upload(safeName, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from('media').getPublicUrl(safeName);
  return data.publicUrl;
}
