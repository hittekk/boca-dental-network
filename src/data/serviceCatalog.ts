// ─────────────────────────────────────────────────────────────────────────────
// src/data/serviceCatalog.ts
// Full ~50-page service catalog from the Expansion sheet of the sitemap xlsx.
// URLs use the sitemap pattern `/[category]/[service]/` (NOT `/services/...`).
// Each entry powers a /[category]/[slug]/ service page.
//
// Detailed Treysyde 11-section content (key facts, signs/symptoms, candidacy,
// process steps, benefits, comparison, FAQs, cost, related) lives in
// `serviceContent.ts` — keyed by slug. Pages without content fall back to a
// scaffold-with-placeholders rendering so every URL in the sitemap resolves.
// ─────────────────────────────────────────────────────────────────────────────

export interface ServiceCategoryEntry {
  slug:        string
  label:       string
  /** Category-level desc on homepage 3×3 grid */
  desc?:       string
  /** Lucide icon name (resolved at render) */
  icon?:       string
  /** Brief description for hub/category page */
  longDesc?:   string
}

export interface ServicePageEntry {
  slug:          string
  label:         string
  categorySlug:  string
  desc:          string
}

export const SERVICE_CATEGORIES: ServiceCategoryEntry[] = [
  { slug: 'general-dentistry',     label: 'General Dentistry',
    desc: 'Exams, cleanings, X-rays, fillings, emergency care',
    longDesc: 'Routine and preventive dental care for the whole family — exams, cleanings, fillings, mouthguards, and emergency visits at all 9 Boca Dental & Braces locations across Las Vegas.' },
  { slug: 'cosmetic-dentistry',    label: 'Cosmetic Dentistry',
    desc: 'Teeth whitening, veneers, bonding, smile makeovers',
    longDesc: 'Smile transformations using porcelain veneers, professional whitening, bonding, and full smile makeovers — performed by Boca Dental & Braces cosmetic specialists across Las Vegas.' },
  { slug: 'restorative-dentistry', label: 'Restorative Dentistry',
    desc: 'Crowns, bridges, dentures, fillings, cracked tooth repair',
    longDesc: 'Restore damaged or missing teeth with crowns, bridges, dentures, fillings, and cracked-tooth repair from Boca Dental & Braces — available at all 9 Las Vegas locations.' },
  { slug: 'dental-implants',       label: 'Dental Implants',
    desc: 'Single tooth, full arch, All-on-4, implant dentures',
    longDesc: 'Permanent tooth replacement with single dental implants, full-arch implants (All-on-4 / All-on-6), implant-supported bridges and dentures at Boca Dental & Braces Las Vegas.' },
  { slug: 'orthodontics',          label: 'Orthodontics',
    desc: 'Invisalign, traditional braces, teen & adult ortho',
    longDesc: 'Invisalign clear aligners, traditional braces, and retainers — overseen by Dr. Kelcey Loveland, board-eligible orthodontist at Boca Dental & Braces Las Vegas.' },
  { slug: 'pediatric-dentistry',   label: 'Pediatric Dentistry',
    desc: 'Kids exams, infant care, sealants, emergency pedo',
    longDesc: "Pediatric dental care from a child's first tooth through high school — exams, cleanings, fluoride, sealants, and pediatric emergencies at our Boca Kids Dentistry clinic and select locations." },
  { slug: 'sedation-dentistry',    label: 'Sedation & Comfort Dentistry',
    desc: 'Nitrous oxide, oral sedation, IV sedation',
    longDesc: 'Anxiety-free dental care with nitrous oxide, oral sedation, and IV sedation options. Available at select Boca Dental & Braces Las Vegas locations.' },
  { slug: 'oral-surgery',          label: 'Oral Surgery',
    desc: 'Extractions, wisdom teeth, bone grafting',
    longDesc: 'Surgical dental care including extractions, wisdom teeth removal, bone grafting, and frenectomy — overseen by Dr. Charles Calder, oral and maxillofacial surgeon at our Flamingo & Torrey Pines location.' },
  { slug: 'periodontal',           label: 'Periodontal Care',
    desc: 'Gum disease treatment, deep cleaning, maintenance',
    longDesc: 'Gum disease treatment, scaling and root planing (deep cleaning), periodontal maintenance, and laser gum treatment at Boca Dental & Braces Las Vegas locations.' },
  // 3 categories not on the homepage 3×3 but in the sitemap:
  { slug: 'endodontics',           label: 'Endodontics',
    desc: 'Root canal therapy + emergency root canals',
    longDesc: 'Root canal therapy and emergency root canals — performed by our general dentists and endodontic specialists at Boca Dental & Braces Las Vegas.' },
  { slug: 'prosthodontics',        label: 'Prosthodontics',
    desc: 'Full mouth reconstruction, occlusal adjustment, implant prosth',
    longDesc: 'Advanced restorative and reconstructive dentistry: full mouth reconstruction, occlusal (bite) adjustment, and implant prosthodontics at Boca Dental & Braces Las Vegas.' },
  { slug: 'preventive-dentistry',  label: 'Preventive & Wellness Dentistry',
    desc: 'Athletic mouthguards, bruxism treatment, halitosis',
    longDesc: 'Preventive and wellness dentistry — custom athletic mouthguards, bruxism (teeth grinding) treatment, and bad breath / halitosis treatment at Boca Dental & Braces Las Vegas.' },
]

export const SERVICE_PAGES: ServicePageEntry[] = [
  // General Dentistry
  { slug: 'dental-exams-cleanings',   label: 'Dental Exams & Cleanings',       categorySlug: 'general-dentistry',     desc: 'Comprehensive exams, X-rays, professional cleanings, preventive guidance.' },
  { slug: 'custom-mouthguards',       label: 'Custom Mouthguards',             categorySlug: 'general-dentistry',     desc: 'Night guards for bruxism, sports guards for athletes.' },
  { slug: 'emergency-dental-care',    label: 'Emergency Dental Care',          categorySlug: 'general-dentistry',     desc: 'Same-day appointments for toothache, trauma, broken or knocked-out teeth.' },
  { slug: 'second-opinion',           label: 'Second Opinion Consultations',   categorySlug: 'general-dentistry',     desc: 'Independent assessment of treatment plans from another dentist.' },
  // Cosmetic
  { slug: 'teeth-whitening',          label: 'Teeth Whitening',                categorySlug: 'cosmetic-dentistry',    desc: 'In-office whitening + take-home professional kits.' },
  { slug: 'veneers',                  label: 'Porcelain Veneers',              categorySlug: 'cosmetic-dentistry',    desc: 'Custom porcelain shells that transform smile shape and color.' },
  { slug: 'dental-bonding',           label: 'Dental Bonding',                 categorySlug: 'cosmetic-dentistry',    desc: 'Composite resin to repair chips, close gaps, reshape teeth.' },
  { slug: 'smile-makeovers',          label: 'Smile Makeovers',                categorySlug: 'cosmetic-dentistry',    desc: 'Comprehensive smile transformation combining multiple cosmetic procedures.' },
  { slug: 'gum-contouring',           label: 'Gum Contouring',                 categorySlug: 'cosmetic-dentistry',    desc: 'Reshape gum line for a more balanced, proportional smile.' },
  // Restorative
  { slug: 'tooth-colored-fillings',   label: 'Tooth-Colored Fillings',         categorySlug: 'restorative-dentistry', desc: 'Composite fillings that blend seamlessly with natural teeth.' },
  { slug: 'dental-crowns',            label: 'Dental Crowns',                  categorySlug: 'restorative-dentistry', desc: 'Porcelain, zirconia, and PFM crowns for damaged teeth.' },
  { slug: 'dental-bridges',           label: 'Dental Bridges',                 categorySlug: 'restorative-dentistry', desc: 'Fixed bridges to replace one or more missing teeth.' },
  { slug: 'dentures',                 label: 'Dentures',                       categorySlug: 'restorative-dentistry', desc: 'Full, partial, and implant-supported dentures.' },
  { slug: 'cracked-tooth-repair',     label: 'Cracked Tooth Repair',           categorySlug: 'restorative-dentistry', desc: 'Repair and protect cracked or fractured teeth.' },
  // Implants
  { slug: 'full-arch-implants',       label: 'Full Arch Implants (All-on-4)',  categorySlug: 'dental-implants',       desc: 'All-on-4 / All-on-6 full-arch tooth replacement.' },
  { slug: 'implant-bridges',          label: 'Implant-Supported Bridges',      categorySlug: 'dental-implants',       desc: 'Bridges anchored on dental implants for multiple missing teeth.' },
  { slug: 'implant-dentures',         label: 'Implant-Supported Dentures',     categorySlug: 'dental-implants',       desc: 'Snap-in or fixed dentures secured by implants.' },
  // Periodontal
  { slug: 'gum-disease-treatment',    label: 'Gum Disease Treatment',          categorySlug: 'periodontal',           desc: 'Treatment for gingivitis and periodontitis at all stages.' },
  { slug: 'scaling-root-planing',     label: 'Scaling & Root Planing',         categorySlug: 'periodontal',           desc: 'Deep cleaning below the gumline to remove tartar and bacteria.' },
  { slug: 'periodontal-maintenance',  label: 'Periodontal Maintenance',        categorySlug: 'periodontal',           desc: 'Specialized cleanings every 3–4 months for patients with gum disease.' },
  { slug: 'laser-gum-treatment',      label: 'Laser Gum Treatment',            categorySlug: 'periodontal',           desc: 'Minimally invasive laser therapy for periodontal disease.' },
  // Endodontics
  { slug: 'root-canal-treatment',     label: 'Root Canal Treatment',           categorySlug: 'endodontics',           desc: 'Save infected teeth with modern, comfortable root canal therapy.' },
  { slug: 'emergency-root-canal',     label: 'Emergency Root Canal',           categorySlug: 'endodontics',           desc: 'Same-day root canal for severe tooth pain or abscess.' },
  // Oral Surgery
  { slug: 'tooth-extractions',        label: 'Tooth Extractions',              categorySlug: 'oral-surgery',          desc: 'Simple and surgical extractions when teeth cannot be saved.' },
  { slug: 'wisdom-tooth-removal',     label: 'Wisdom Tooth Removal',           categorySlug: 'oral-surgery',          desc: 'Removal of impacted or problematic wisdom teeth.' },
  { slug: 'bone-grafting',            label: 'Bone Grafting',                  categorySlug: 'oral-surgery',          desc: 'Restore jaw bone for future implants or restorations.' },
  { slug: 'frenectomy',               label: 'Frenectomy',                     categorySlug: 'oral-surgery',          desc: 'Lip and tongue tie release for infants, kids, and adults.' },
  // Orthodontics
  { slug: 'braces',                   label: 'Traditional Braces',             categorySlug: 'orthodontics',          desc: 'Metal and ceramic braces for complex alignment.' },
  { slug: 'invisalign',               label: 'Invisalign Clear Aligners',      categorySlug: 'orthodontics',          desc: 'Nearly invisible, removable clear aligners for teens and adults.' },
  { slug: 'retainers',                label: 'Retainers',                      categorySlug: 'orthodontics',          desc: 'Fixed and removable retainers to maintain orthodontic results.' },
  // Pediatric
  { slug: 'childrens-exams-cleanings',label: "Children's Exams & Cleanings",   categorySlug: 'pediatric-dentistry',   desc: "Routine dental care designed for kids' developing teeth." },
  { slug: 'teen-dentistry',           label: 'Teen Dentistry',                 categorySlug: 'pediatric-dentistry',   desc: 'Dental care, ortho consults, and wisdom-teeth monitoring for teens.' },
  { slug: 'fluoride-treatments-kids', label: 'Fluoride Treatments for Kids',   categorySlug: 'pediatric-dentistry',   desc: 'Professional fluoride applications to strengthen developing enamel.' },
  { slug: 'pediatric-dental-emergency-care', label: 'Pediatric Emergency Care', categorySlug: 'pediatric-dentistry',  desc: 'Same-day emergency care for kids — knocked-out teeth, trauma, severe pain.' },
  { slug: 'infant-toddler-dentistry', label: 'Infant & Toddler Dentistry',     categorySlug: 'pediatric-dentistry',   desc: 'First dental visit by age 1, gentle care for the youngest patients.' },
  // Prosthodontics
  { slug: 'full-mouth-reconstruction',label: 'Full Mouth Reconstruction',      categorySlug: 'prosthodontics',        desc: 'Comprehensive restoration of all teeth in one coordinated plan.' },
  { slug: 'occlusal-adjustment',      label: 'Occlusal (Bite) Adjustment',     categorySlug: 'prosthodontics',        desc: 'Correct bite imbalances to relieve TMJ pain and protect teeth.' },
  { slug: 'implant-prosthodontics',   label: 'Implant Prosthodontics',         categorySlug: 'prosthodontics',        desc: 'Advanced restorations on dental implants — crowns, bridges, full arches.' },
  // Preventive
  { slug: 'athletic-mouthguards',     label: 'Custom Athletic Mouthguards',    categorySlug: 'preventive-dentistry',  desc: 'Custom-fit mouthguards for contact sports and recreation.' },
  { slug: 'bruxism-treatment',        label: 'Bruxism / Teeth Grinding',       categorySlug: 'preventive-dentistry',  desc: 'Night guards and TMJ treatment for chronic teeth grinding.' },
  { slug: 'bad-breath-treatment',     label: 'Bad Breath (Halitosis)',         categorySlug: 'preventive-dentistry',  desc: 'Identify and treat the underlying causes of chronic bad breath.' },
]

/** Helper: find a service page by category + slug */
export function findServicePage(
  category: string,
  slug: string,
): ServicePageEntry | undefined {
  return SERVICE_PAGES.find(
    (s) => s.categorySlug === category && s.slug === slug,
  )
}

/** Helper: all services under a given category */
export function servicePagesInCategory(category: string): ServicePageEntry[] {
  return SERVICE_PAGES.filter((s) => s.categorySlug === category)
}

/** Helper: find a category */
export function findCategory(slug: string): ServiceCategoryEntry | undefined {
  return SERVICE_CATEGORIES.find((c) => c.slug === slug)
}
