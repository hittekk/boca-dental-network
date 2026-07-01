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
  name: 'Dr. Kelcey Loveland, DDS',
  title: 'Orthodontist · Board-Eligible',
  medicalSpecialty: 'Orthodontics',
  yearsInPractice: 8,
  dentalSchool: 'University of the Pacific, Arthur A. Dugoni School of Dentistry',
  shortBio:
    "Dr. Loveland is the board-eligible orthodontist overseeing all Invisalign and orthodontic treatment at Boca Dental & Braces' Las Vegas locations. She specializes in clear aligner therapy for adults and teens.",
  longBio:
    "Dr. Kelcey Loveland completed her DDS at the University of the Pacific, Arthur A. Dugoni School of Dentistry, and pursued specialty residency training in orthodontics with a focus on digital workflow and clear aligner therapy. She is board-eligible with the American Board of Orthodontics and personally reviews and approves every Invisalign treatment plan developed across the Boca Dental & Braces network in Las Vegas. Dr. Loveland is a Diamond+ Invisalign provider and runs Invisalign Teen programs across the practice. Outside the office, she serves on the orthodontic faculty advisory committee at the Nevada State Dental Association and is fluent in English and Spanish.",
  worksAt: ['boca-kids-dentistry', 'flamingo-torrey', 'beltway-marketplace'],
  languages: ['English', 'Spanish'],
}

const PILOT_CALDER: DentistContent = {
  slug: 'dr-charles-calder',
  name: 'Dr. Chad Calder, DDS',
  title: 'Oral and Maxillofacial Surgeon',
  medicalSpecialty: 'Oral and Maxillofacial Surgery',
  yearsInPractice: 14,
  dentalSchool: 'UCLA School of Dentistry · UCSF Medical Center Residency',
  shortBio:
    'Dr. Calder is the oral and maxillofacial surgeon at our Flamingo & Torrey Pines location, performing wisdom-tooth removal, complex extractions, dental implant placement, and bone grafting.',
  longBio:
    'Dr. Chad Calder completed his DDS at UCLA School of Dentistry followed by a four-year oral and maxillofacial surgery residency at UCSF Medical Center. He performs all oral surgery procedures at Boca Dental & Braces — wisdom teeth, surgical extractions, dental implant placement, bone grafting, frenectomy, and management of facial trauma. He is licensed in IV sedation and runs the in-office sedation program for high-anxiety cases. Dr. Calder has lectured nationally on minimally invasive implant placement and serves as a clinical mentor for general dentists across the Boca Dental & Braces network.',
  worksAt: ['flamingo-torrey'],
  languages: ['English'],
}

const PILOT_DANNELS: DentistContent = {
  slug: 'dr-wyatt-dannels',
  name: 'Dr. Wyatt Dannels, DDS',
  title: 'Lead Dentist & Founder',
  medicalSpecialty: 'General Dentistry',
  yearsInPractice: 13,
  dentalSchool: 'University of Southern California',
  shortBio:
    'Dr. Dannels founded Boca Dental & Braces. He oversees the practice clinically and personally sees patients at our Russell & Eastern and Beltway Marketplace clinics.',
  longBio:
    "Dr. Wyatt Dannels is the founder of Boca Dental & Braces. A UNLV School of Dental Medicine graduate, he opened the original Russell & Eastern clinic with the goal of building a multi-location practice that delivered consistent, high-quality care across Las Vegas. Today, Dr. Dannels oversees clinical standards across all 9 locations, mentors the network's general dentists, and personally sees patients at Russell & Eastern and our newest Beltway Marketplace clinic. He is a member of the American Dental Association, the Nevada Dental Association, and serves on the local advisory board for the Nevada Health Centers' free pediatric dental program. He speaks English and conversational Spanish.",
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
