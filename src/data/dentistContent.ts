// ─────────────────────────────────────────────────────────────────────────────
// src/data/dentistContent.ts
// Per-dentist content for /about-us/dentists/[slug]/. Each entry powers the
// Person + Physician JSON-LD schema (E-E-A-T critical for healthcare per
// Treysyde Location §4 + Homepage §8 schema notes).
//
// PLACEHOLDER content — [verify with client] for every dentist before launch:
// dental school, years, specialties, credentials, photo, location assignments.
// ─────────────────────────────────────────────────────────────────────────────

export interface DentistContent {
  slug:           string
  name:           string
  title:          string
  medicalSpecialty?: string  // "Orthodontics", "Oral and Maxillofacial Surgery", "General Dentistry"
  /** Years in practice — used in schema + bio */
  yearsInPractice?: number
  /** Dental school / training [verify] */
  dentalSchool?:  string
  /** 2-3 sentence bio for cards. [verify] */
  shortBio:       string
  /** Longer detail-page bio. [verify] */
  longBio?:       string
  /** Slugs of clinics this dentist works at */
  worksAt:        string[]
  /** Optional headshot URL — [content] */
  photo?:         string
  /** Optional family/lifestyle photo for the profile page — [content] */
  familyPhoto?:   string
  /** Languages spoken */
  languages?:     string[]
}

const PILOT_LOVELAND: DentistContent = {
  slug: 'dr-kelcey-loveland',
  name: 'Dr. Kelcey Loveland',
  title: 'Orthodontist',
  medicalSpecialty: 'Orthodontics',
  dentalSchool: '',
  shortBio:
    "Dr. Loveland is the orthodontist overseeing Invisalign and orthodontic treatment at Boca Dental & Braces' Las Vegas locations, with a focus on clear aligner therapy for adults and teens.",
  longBio:
    "Dr. Kelcey Loveland is the orthodontist at Boca Dental & Braces, overseeing Invisalign and orthodontic treatment across the Las Vegas locations. She focuses on clear aligner therapy for adults and teens.",
  worksAt: ['boca-kids-dentistry', 'flamingo-torrey', 'beltway-marketplace'],
  languages: ['English'],
}

const PILOT_CALDER: DentistContent = {
  slug: 'dr-charles-calder',
  name: 'Dr. Charles Calder',
  title: 'Oral and Maxillofacial Surgeon',
  medicalSpecialty: 'Oral and Maxillofacial Surgery',
  dentalSchool: 'Loma Linda University School of Dentistry — DDS 2000, MD 2003, OMFS Residency 2006',
  shortBio:
    'Dr. Calder is the oral and maxillofacial surgeon at our Flamingo & Torrey Pines location, performing wisdom-tooth removal, complex extractions, dental implant placement, and bone grafting.',
  longBio:
    'Dr. Charles Calder earned his DDS from the Loma Linda University School of Dentistry in 2000, followed by his MD in 2003 and completion of his Oral and Maxillofacial Surgery residency in 2006. He performs oral surgery procedures at Boca Dental & Braces — wisdom teeth, surgical extractions, dental implant placement, bone grafting, and frenectomy — and is licensed in IV sedation for high-anxiety cases. He is a member of the American Association of Oral and Maxillofacial Surgeons and was inducted into the OKU dental honor society.',
  worksAt: ['flamingo-torrey'],
  languages: ['English'],
}

const PILOT_DANNELS: DentistContent = {
  slug: 'dr-wyatt-dannels',
  name: 'Dr. Wyatt Dannels',
  title: 'Lead Dentist & Founder',
  medicalSpecialty: 'General Dentistry',
  yearsInPractice: 13,
  dentalSchool: 'University of Southern California',
  shortBio:
    'Dr. Wyatt Dannels is the founder and CEO of Boca Dental & Braces. A USC dental graduate, he focuses on implant dentistry and full-mouth rehabilitation, and built the practice around expanding access to quality, affordable care across Las Vegas.',
  longBio:
    `Dr. Wyatt Dannels graduated from the USC dental program in 2013 and has spent the past 13 years building a career rooted in compassion, accessibility, and life changing care. His path into dentistry began at age 14, after an accident left him with eight broken teeth. That experience gave him a firsthand understanding of how deeply dental problems can affect a person, not only physically, but emotionally and financially as well. It shaped his belief that dentistry should be delivered with empathy, especially for patients who feel embarrassed, fearful, or overwhelmed.

Dr. Dannels is most passionate about implant dentistry and full mouth rehabilitation, a focus that grew out of his own life experiences. In 2012, he was diagnosed with a cancer that required a below the knee amputation, and in 2015 he traveled to Australia for a groundbreaking procedure in which implants were placed directly into his tibial bone. That procedure restored his stability, mobility, and confidence in ways he never thought possible, and it transformed the direction of his career. Having lived the impact of implant technology himself, he is uniquely able to connect with patients who feel hopeless about their oral health, including those with failing or missing teeth, severe wear, or ill fitting dentures.

He also loves cosmetic and restorative dentistry, particularly crowns and Invisalign, where he gets to watch a patient's smile, and confidence, completely transform. For Dr. Dannels, the goal is never simply to fix teeth. It is to restore comfort, function, confidence, and quality of life for every person he treats.

As the founder and CEO of Boca Dental and Braces, Dr. Dannels built the practice around a clear mission: to expand access to quality, affordable dental care in Las Vegas communities that have long been underserved. He is especially proud that Boca has become a leading provider for Medicaid and Liberty Dental patients, reflecting a commitment to serving families who are often overlooked. He serves on the Liberty Dental board and is a member of the Academy of General Dentistry, and he envisions Boca as the "Chick fil A of dentistry," known for exceptional care, consistency, and genuine warmth.

Originally from Arizona, Dr. Dannels now calls Las Vegas home. He is bilingual in Spanish, a skill he developed while serving a two year mission in Mexico beginning in 2000, and connecting with the Hispanic community has remained important to him both personally and professionally. Outside the office, he is an avid golfer and a passionate sports card collector. Most importantly, he is a husband and father. He has been married for 20 years and has four children, including an oldest son currently serving a church mission in Chile.`,
  worksAt: ['russell-eastern', 'beltway-marketplace'],
  languages: ['English', 'Spanish'],
}

const DEFAULT_CONTENT_FOR = (slug: string, name: string, title: string): DentistContent => ({
  slug,
  name,
  title,
  medicalSpecialty: title.includes('Ortho')
    ? 'Orthodontics'
    : title.includes('Pediatric')
      ? 'Pediatric Dentistry'
      : title.includes('Surgery') || title.includes('Maxillofacial')
        ? 'Oral and Maxillofacial Surgery'
        : title.includes('Periodontist')
          ? 'Periodontics'
          : 'General Dentistry',
  shortBio: `${name} cares for patients as part of the Boca Dental & Braces team across the Las Vegas Valley.`,
  worksAt: [],
})

// Build the registry from initialData.doctors with pilot overrides
import { INITIAL_DATA } from './initialData'
import { locationsForDoctor } from './doctorLocations'

const PILOT_OVERRIDES: Record<string, DentistContent> = {
  'dr-kelcey-loveland': PILOT_LOVELAND,
  'dr-charles-calder': PILOT_CALDER,
  'dr-wyatt-dannels': PILOT_DANNELS,
}

/** First N sentences of a longer bio, for card/short use. */
function shortFrom(bio: string, n = 2): string {
  const parts = bio.match(/[^.!?]+[.!?]+/g)
  return parts ? parts.slice(0, n).join(' ').trim() : bio
}

export const DENTIST_CONTENT: Record<string, DentistContent> = Object.fromEntries(
  INITIAL_DATA.doctors.map((d) => {
    const base = { ...(PILOT_OVERRIDES[d.slug] ?? DEFAULT_CONTENT_FOR(d.slug, d.name, d.title)) }
    // Real bios/photos live on initialData.doctors — overlay them when present.
    base.name = d.name
    base.title = d.title
    // Provider→location assignments come from the canonical Boca-Bible map.
    base.worksAt = locationsForDoctor(d.slug)
    if (d.bio) {
      base.longBio = d.bio
      base.shortBio = shortFrom(d.bio)
    }
    if (d.photo) base.photo = d.photo
    if (d.familyPhoto) base.familyPhoto = d.familyPhoto
    return [d.slug, base]
  }),
)

export function dentistContentFor(slug: string): DentistContent | undefined {
  return DENTIST_CONTENT[slug]
}
