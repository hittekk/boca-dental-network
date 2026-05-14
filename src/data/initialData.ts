// ─────────────────────────────────────────────────────────────────────────────
// src/data/initialData.ts
// Simulates window.INITIAL_DATA injected by PHP in production.
// In development this file is imported directly.
// In production PHP writes the equivalent JSON to window.INITIAL_DATA.
//
// Sitemap source of truth: ~/Desktop/Boca Dental/Brand/Boca Dental Web Build Sitemap V1.xlsx
// (use the "Expansion" sheet for service detail; V1 sheet for location names)
// ─────────────────────────────────────────────────────────────────────────────

import type { InitialData } from '../types';

export const INITIAL_DATA: InitialData = {
  site: 'las-vegas',
  brand: {
    name:    'Boca Dental and Braces',
    tagline: 'Knocking Out the Competition',
    phone:   '(702) 456-0005',
    domain:  'bocadentalandbraces.com',
  },
  announcement: {
    enabled:   true,
    text:      'Now accepting new patients at all 9 Las Vegas locations · Se Habla Español',
    link:      '/contact',
    linkLabel: 'Book Today',
  },
  // 9 LV locations only. Slugs + labels match the Expansion sheet of
  // ~/Desktop/Boca Dental Web Build Sitemap V1.xlsx (the authoritative URL list).
  // Henderson Boca Kids has been removed — it belongs to the future Reno/Tahoe site.
  locations: [
    {
      id:           1,
      slug:         'russell-eastern',
      label:        'Russell & Eastern',
      address:      '5642 S Eastern Ave, Ste B',
      city:         'Las Vegas',
      state:        'NV',
      zip:          '89119',
      phone:        '(702) 984-3678',
      hours:        'Mon–Fri 9am–7pm · Sat 9am–7pm',
      kids:         false,
      rating:       4.9,
      review_count: 312,
      neighborhood: 'Southeast Las Vegas',
      narrative:
        'Our Russell & Eastern clinic is the original Boca Dental & Braces location, anchoring Southeast Las Vegas just north of the 215 Beltway and a short drive from McCarran International, Henderson, and the Sunset Park corridor. The office sits inside the Eastern Marketplace plaza, with free parking right at the door and Spanish-speaking staff on every shift. We see a steady mix of working families from the 89119 and 89120 ZIP codes, hospitality-industry employees coming off late shifts on the Strip, and longtime patients who have been with us since 2006. Same-day emergency appointments, Saturday hours, and most major insurance — including Nevada Medicaid — are all available here.',
      gbp_id:       'ChIJ-russell-eastern-placeholder',
      faqs: [
        {
          question: 'Does Boca Dental on Eastern Ave accept walk-ins?',
          answer:   'Yes — we accept walk-ins at our Russell & Eastern location during regular business hours, though we recommend calling ahead to minimize wait times.',
        },
        {
          question: 'Do you accept Medicaid at the Russell & Eastern office?',
          answer:   'Yes. Our Russell & Eastern location accepts Nevada Medicaid and CHIP for qualifying patients including children.',
        },
      ],
    },
    {
      id:           2,
      slug:         'boca-kids-dentistry',
      label:        'Boca Kids Dentistry',
      address:      '5642 S Eastern Ave, Ste F',
      city:         'Las Vegas',
      state:        'NV',
      zip:          '89119',
      phone:        '(702) 389-1543',
      hours:        'Mon–Fri 9am–7pm · Sat 9am–7pm',
      kids:         true,
      rating:       4.9,
      review_count: 198,
      neighborhood: 'Southeast Las Vegas',
      narrative:
        'Boca Kids Dentistry is a fully dedicated pediatric dental office sharing the same plaza as our Russell & Eastern flagship adult clinic — different door, kid-scaled everything inside. We designed this space specifically for babies, kids, and teens in the Southeast Las Vegas community: low-lit private rooms for nervous first visits, an open-bay layout for siblings, ceiling-mounted screens, and a sensory-quiet treatment room for kids with autism spectrum needs. Most families come from the Whitney, Paradise, and Henderson border neighborhoods. We accept Nevada Medicaid and CHIP, see infants from age one for first-tooth visits, and offer Saturday appointments so school is never missed. Spanish-speaking pediatric assistants are on staff daily.',
      gbp_id:       'ChIJ-boca-kids-dentistry-placeholder',
      faqs: [
        {
          question: 'At what age should my child first see a dentist?',
          answer:   'We recommend a child\'s first dental visit by age 1, or within 6 months of their first tooth appearing.',
        },
        {
          question: 'Does Boca Kids accept Medicaid for children?',
          answer:   'Yes. Boca Kids accepts Nevada Medicaid and CHIP. We believe every child deserves quality dental care regardless of budget.',
        },
      ],
    },
    {
      id:           3,
      slug:         'bonanza-eastern',
      label:        'Bonanza & Eastern',
      address:      '556 N Eastern Ave, Ste I',
      city:         'Las Vegas',
      state:        'NV',
      zip:          '89101',
      phone:        '(702) 960-4484',
      hours:        'Mon–Fri 9am–7pm · Sat 9am–3pm',
      kids:         false,
      rating:       4.8,
      review_count: 156,
      neighborhood: 'Downtown Las Vegas',
      narrative:
        'Our Bonanza & Eastern office serves Downtown Las Vegas and the Cultural Corridor — patients walking over from the Las Vegas Medical District, residents in the historic John S. Park and Huntridge neighborhoods, and a daily flow of casino and resort workers from the Fremont East Entertainment District. The clinic is on N Eastern Ave just south of Charleston, with a covered entry and 14 dedicated parking spaces. Many of our patients here are bilingual, and our hygiene team includes Spanish, Tagalog, and Mandarin speakers. Same-day emergency slots are reserved every morning for walk-in toothaches and dental trauma — a real need in a downtown that runs 24 hours.',
      gbp_id:       'ChIJ-bonanza-eastern-placeholder',
      faqs: [],
    },
    {
      id:           4,
      slug:         'sahara-decatur',
      label:        'Sahara & Decatur',
      address:      '4750 W Sahara Ave, Ste 12',
      city:         'Las Vegas',
      state:        'NV',
      zip:          '89102',
      phone:        '(702) 381-7059',
      hours:        'Mon–Fri 9am–7pm · Sat 9am–7pm',
      kids:         false,
      rating:       4.8,
      review_count: 203,
      neighborhood: 'West Las Vegas',
      narrative:
        'Sahara & Decatur is our West Las Vegas anchor — a busy corner where Las Vegas residents from Spring Valley, Chinatown, and the Meadows neighborhood converge daily. Our office is inside the Sahara West Plaza, one block east of the 215 Beltway, with bus stops served by RTC routes 119 and 204 directly out front. We see a wide cross-section of patients here: families from the Las Vegas Chinatown corridor (we have Mandarin- and Cantonese-speaking front desk staff), retirees from nearby 55+ communities, and shift workers from the medical offices along W Sahara Ave. The clinic offers same-day crowns through CEREC, in-office whitening, and Saturday hours for working parents.',
      gbp_id:       'ChIJ-sahara-decatur-placeholder',
      faqs: [],
    },
    {
      id:           5,
      slug:         'jones-i95',
      label:        'Jones & I-95',
      address:      '240 N Jones Blvd, Ste B',
      city:         'Las Vegas',
      state:        'NV',
      zip:          '89107',
      phone:        '(702) 508-0755',
      hours:        'Mon–Fri 9am–7pm · Sat 9am–3pm',
      kids:         false,
      rating:       4.7,
      review_count: 134,
      neighborhood: 'West Las Vegas',
      narrative:
        'The Jones & I-95 clinic sits just off Charleston Boulevard in Westside Las Vegas, with easy access from the U.S. 95 freeway interchange. Most patients here are West Las Vegas residents from the 89107 and 89108 ZIPs — a tight-knit, multigenerational community where dental care often spans grandparents, parents, and kids inside the same family folder. We focus heavily on preventive care, periodontal maintenance, and restorative work for older adults, plus pediatric exams for kids referred over from Boca Kids Dentistry. The office accepts Nevada Medicaid and offers in-house payment plans with no credit check. Parking is free and the entrance is fully wheelchair accessible.',
      gbp_id:       'ChIJ-jones-i95-placeholder',
      faqs: [],
    },
    {
      id:           6,
      slug:         'charleston-lamb',
      label:        'Charleston & Lamb',
      address:      '4235 E Charleston Blvd',
      city:         'Las Vegas',
      state:        'NV',
      zip:          '89104',
      phone:        '(702) 505-9180',
      hours:        'Mon–Fri 9am–7pm · Sat 9am–7pm',
      kids:         false,
      rating:       4.8,
      review_count: 178,
      neighborhood: 'East Las Vegas',
      narrative:
        'Charleston & Lamb is our East Las Vegas office, serving the dense residential corridors along E Charleston Boulevard from Maryland Parkway out to Boulder Highway. This is one of our busiest clinics for general dentistry, with families from Sunrise Manor, the East Las Vegas Community Center area, and the historic neighborhoods near Bonanza High School filling our chairs daily. We staff six full operatories here, run two hygiene chairs throughout the day, and keep emergency slots open every afternoon for the walk-in toothaches that are common in any high-density urban neighborhood. Spanish is spoken at every front desk shift, and we accept Nevada Medicaid for both adults and children.',
      gbp_id:       'ChIJ-charleston-lamb-placeholder',
      faqs: [],
    },
    {
      id:           7,
      slug:         'flamingo-torrey',
      label:        'Flamingo & Torrey Pines',
      address:      '6680 W Flamingo Rd, Ste A',
      city:         'Las Vegas',
      state:        'NV',
      zip:          '89103',
      phone:        '(702) 389-0430',
      hours:        'Mon–Fri 9am–7pm · Sat 9am–7pm',
      kids:         false,
      rating:       4.9,
      review_count: 241,
      neighborhood: 'Spring Valley',
      narrative:
        'Flamingo & Torrey Pines is our Spring Valley flagship, sitting on the southwest corner of one of the busiest intersections on the west side of Las Vegas. Patients here come from across Spring Valley, Mountain\'s Edge, and the southern reach of Summerlin. The clinic is purpose-built for cosmetic and restorative work — we run an iTero scanner for Invisalign consults, offer same-day veneer try-ins, and have an on-site CEREC mill for single-visit crowns. The neighborhood skews young-professional and family, with patients often booking ortho consults for teens and cosmetic whitening or veneers for parents in the same visit. Evening and Saturday appointments are heavily used by working couples.',
      gbp_id:       'ChIJ-flamingo-torrey-placeholder',
      faqs: [],
    },
    {
      id:           8,
      slug:         'cheyenne-commons',
      label:        'Cheyenne Commons',
      address:      '3163 N Rainbow Blvd',
      city:         'Las Vegas',
      state:        'NV',
      zip:          '89108',
      phone:        '(702) 805-1178',
      hours:        'Mon–Fri 9am–7pm · Sat 9am–3pm',
      kids:         false,
      rating:       4.7,
      review_count: 112,
      neighborhood: 'Northwest Las Vegas',
      narrative:
        'Our Cheyenne Commons clinic anchors Northwest Las Vegas, serving Centennial Hills, Lone Mountain, the western edge of North Las Vegas, and patients all the way out to the Painted Desert. The office sits inside the Cheyenne Commons retail plaza, with easy access from the U.S. 95 and Cheyenne Avenue interchange. Many of our patients here are growing families — first-time homeowners in the newer subdivisions north of Cheyenne who joined us for a pediatric checkup and stayed for the whole household\'s dental care. We offer expanded weekend hours twice a month, accept Nevada Medicaid for children, and run a robust orthodontic program with both Invisalign and traditional braces for teens.',
      gbp_id:       'ChIJ-cheyenne-commons-placeholder',
      faqs: [],
    },
    {
      // Beltway Marketplace — the 9th LV clinic per the Expansion sitemap.
      // Address/phone/hours/rating are placeholders awaiting Frankie/GBP confirmation.
      id:           9,
      slug:         'beltway-marketplace',
      label:        'Beltway Marketplace',
      address:      'Eastern Ave & E Serene Ave',
      city:         'Las Vegas',
      state:        'NV',
      zip:          '89123',
      phone:        '(702) 000-0000',
      hours:        'Mon–Fri 9am–7pm · Sat 9am–7pm',
      kids:         false,
      rating:       4.8,
      review_count: 0,
      neighborhood: 'Southeast Las Vegas',
      narrative:
        'Beltway Marketplace is our newest Boca Dental clinic, opening at the southern edge of Las Vegas where the 215 Beltway meets Eastern Avenue near Serene. The location was chosen specifically to serve the rapidly growing Southern Highlands, Mountain\'s Edge South, and Inspirada master-planned communities, where many families had been driving north to our Russell & Eastern flagship. The office is modern from the ground up: ten operatories, a dedicated quiet room for sedation, an in-house digital lab, and direct-to-Invisalign scanning. We accept most major PPO plans plus Nevada Medicaid for kids, and we are actively welcoming new patients across general dentistry, ortho, pediatric, and cosmetic services as this neighborhood continues to expand.',
      gbp_id:       'ChIJ-beltway-marketplace-placeholder',
      faqs: [],
    },
  ],
  // 9 service categories shown on the homepage 3×3 grid (Treysyde Homepage §3).
  // The full sitemap has 12 categories (+ ~38 sub-services); Endodontics,
  // Prosthodontics, and Preventive are surfaced under their parent categories
  // on the homepage. Each card links to `/[category-slug]/` (NOT /services/...).
  services: [
    { slug: 'general-dentistry',     label: 'General Dentistry',     desc: 'Exams, cleanings, X-rays, fillings, emergency care',     category: 'General' },
    { slug: 'cosmetic-dentistry',    label: 'Cosmetic Dentistry',    desc: 'Teeth whitening, veneers, bonding, smile makeovers',     category: 'Cosmetic' },
    { slug: 'restorative-dentistry', label: 'Restorative Dentistry', desc: 'Crowns, bridges, dentures, fillings, cracked tooth repair', category: 'Restorative' },
    { slug: 'dental-implants',       label: 'Dental Implants',       desc: 'Single tooth, full arch, All-on-4, implant dentures',     category: 'Implants' },
    { slug: 'orthodontics',          label: 'Orthodontics',          desc: 'Invisalign, traditional braces, teen & adult ortho',     category: 'Orthodontics' },
    { slug: 'pediatric-dentistry',   label: 'Pediatric Dentistry',   desc: 'Kids exams, infant care, sealants, emergency pedo',      category: 'Pediatric' },
    { slug: 'sedation-dentistry',    label: 'Sedation Dentistry',    desc: 'Nitrous oxide, oral sedation, IV sedation',              category: 'Sedation' },
    { slug: 'oral-surgery',          label: 'Oral Surgery',          desc: 'Extractions, wisdom teeth, bone grafting',               category: 'Surgery' },
    { slug: 'periodontal',           label: 'Periodontal Care',      desc: 'Gum disease treatment, deep cleaning, maintenance',      category: 'Periodontal' },
  ],
  doctors: [
    // PLACEHOLDER DOCTORS — names from sitemap, titles/bios/photos/location
    // assignments are mock values during design phase. Real bios + photos + per-
    // location assignments come from Frankie via the admin dashboard later.
    { slug: 'dr-wyatt-dannels',    name: 'Dr. Wyatt Dannels, DDS',    title: 'Lead Dentist & Founder',     bio: '', locations: [] },
    { slug: 'dr-harrison-luu',     name: 'Dr. Harrison Luu, DDS',     title: 'General Dentist',            bio: '', locations: [] },
    { slug: 'dr-sana-fahim',       name: 'Dr. Sana Fahim, DDS',       title: 'General Dentist',            bio: '', locations: [] },
    { slug: 'dr-justin-wall',      name: 'Dr. Justin Wall, DDS',      title: 'General Dentist',            bio: '', locations: [] },
    { slug: 'dr-kelcey-loveland',  name: 'Dr. Kelcey Loveland, DDS',  title: 'General Dentist',            bio: '', locations: [] },
    { slug: 'minh-nguyen',         name: 'Minh Nguyen, DDS',          title: 'General Dentist',            bio: '', locations: [] },
    { slug: 'dr-johnson-fong',     name: 'Dr. Johnson Fong, DDS',     title: 'General Dentist',            bio: '', locations: [] },
    { slug: 'dr-michael-st-laurent', name: 'Dr. Michael St Laurent, DDS', title: 'General Dentist',        bio: '', locations: [] },
    { slug: 'dr-bredan-marlin',    name: 'Dr. Bredan Marlin, DDS',    title: 'General Dentist',            bio: '', locations: [] },
    { slug: 'dr-charles-calder',   name: 'Dr. Charles Calder, DDS',   title: 'General Dentist',            bio: '', locations: [] },
    { slug: 'dr-james-yun',        name: 'Dr. James Yun, DDS',        title: 'General Dentist',            bio: '', locations: [] },
    { slug: 'dr-kathy-gonzalez',   name: 'Dr. Kathy Gonzalez, DDS',   title: 'General Dentist',            bio: '', locations: [] },
    { slug: 'dr-cole-thompson',    name: 'Dr. Cole Thompson, DDS',    title: 'General Dentist',            bio: '', locations: [] },
    { slug: 'dr-farhan-hossain',   name: 'Dr. Farhan Hossain, DDS',   title: 'General Dentist',            bio: '', locations: [] },
  ],
};
