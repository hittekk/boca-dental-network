// ─────────────────────────────────────────────────────────────────────────────
// src/data/serviceContent.ts
// Full Treysyde 11-section content for each service page, keyed by slug.
// Services without entries fall back to a scaffolded template at render time
// (so every URL in the sitemap still resolves with reasonable copy).
//
// Invisalign is the designated pilot per Treysyde — its content comes directly
// from `~/Desktop/Boca Dental Invisalign Service Example.pdf`.
// ─────────────────────────────────────────────────────────────────────────────

export interface ServiceFAQ {
  question: string
  answer:   string
}

export interface ServiceBenefit {
  /** Lucide icon name (resolved at render) */
  icon:   string
  label:  string
  body:   string
}

export interface ServiceStep {
  /** "01", "02", … */
  number: string
  title:  string
  body:   string
}

export interface ServiceFact {
  value: string
  label: string
}

export interface ServiceComparison {
  /** Two columns: this service vs. alternative */
  thisLabel:        string
  altLabel:         string
  rows: { factor: string; thisValue: string; altValue: string }[]
}

export interface ServiceContent {
  /** category-slug/slug — also used for URL: `/[categorySlug]/[slug]/` */
  categorySlug:  string
  slug:          string
  label:         string

  // Meta
  titleTag:      string
  metaDesc:      string
  primaryKeyword: string
  secondaryKeywords: string[]
  h1:            string
  /** Hero intro paragraph — 2-3 sentences, GEO citation foundation */
  heroIntro:     string
  /** Service-relevant hero image alt text — "[service] at Boca Dental Las Vegas." */
  heroAlt:       string

  // §2 What Is
  whatIsHeader:  string
  whatIsBody:    string[]  // multi-paragraph
  keyFacts:      ServiceFact[]  // 2-3 stat callouts
  /** Optional H3 sub-types (e.g. Full vs Partial Dentures) */
  subTypes?:     { title: string; body: string }[]

  // §3 Signs + Candidacy
  signsLabel:    string  // "Signs You May Need Invisalign"
  signs:         string[]
  candidacyLabel: string  // "Who Is a Good Candidate for Invisalign?"
  candidacy:     string[]
  /** Optional caveat block */
  candidacyCaveat?: string

  // §4 Process
  processHeader: string  // "What Is the Process of Getting Invisalign?"
  processIntro:  string  // 1 sentence anchor
  steps:         ServiceStep[]
  /** Duration / Timeline callout */
  duration:      string
  /** Technology mention */
  technology:    string

  // §5 Benefits
  benefitsHeader: string
  benefits:       ServiceBenefit[]
  /** Optional comparison table */
  comparison?:    ServiceComparison

  // §6 Why Boca (custom = differentiator bullets + provider credentials inline)
  differentiators: string[]
  providerInline:  { sentence: string; providerSlug?: string }
  /** 9-Location convenience statement — names locations explicitly */
  nineLocationStatement: string

  // §8 FAQs
  faqs:          ServiceFAQ[]

  // §9 Cost & Insurance
  costHeader:    string
  costRange:     { value: string; context: string }
  /** Inline financing callout text */
  inlineCTA:     string

  // §10 Related services
  relatedSlugs:  string[]  // slugs to look up in SERVICE_PAGES

  // §11 the location anchor uses the standard 9-location GEO paragraph; per-page override:
  geoParagraph?: string
}

const INVISALIGN: ServiceContent = {
  categorySlug:  'orthodontics',
  slug:          'invisalign',
  label:         'Invisalign Clear Aligners',

  titleTag:      'Invisalign in Las Vegas, NV | Clear Aligners | Boca Dental & Braces',
  metaDesc:      'Get a straighter smile with Invisalign clear aligners at Boca Dental & Braces. Serving Las Vegas at 9 convenient locations. Free consultations available — book today.',
  primaryKeyword: 'Invisalign Las Vegas',
  secondaryKeywords: [
    'clear aligners Las Vegas',
    'Invisalign cost Las Vegas',
    'Invisalign for teens Las Vegas',
    'invisible braces Las Vegas',
    'Invisalign near me',
  ],
  h1:            'Invisalign in Las Vegas — Clear Aligners at Boca Dental & Braces',
  heroIntro:
    "Boca Dental & Braces offers Invisalign clear aligner treatment at all 9 of its Las Vegas dental clinics, giving patients a comfortable, nearly invisible way to achieve a straighter smile without traditional metal braces. Our board-eligible orthodontist, Dr. Kelcey Loveland, designs every Invisalign treatment plan using 3D digital imaging technology for results that are as precise as they are discreet. Whether you're an adult who has put off orthodontic care, a teen looking for a confidence-friendly option, or a parent exploring treatment for your child, Boca Dental & Braces makes Invisalign accessible and affordable across Las Vegas.",
  heroAlt:       'Invisalign clear aligners in Las Vegas at Boca Dental & Braces.',

  whatIsHeader:  'What Is Invisalign and How Does It Work?',
  whatIsBody: [
    'Invisalign is a modern orthodontic system that uses a series of custom-made, removable clear plastic aligners to gradually shift teeth into their correct positions. Unlike traditional metal braces, Invisalign aligners contain no wires or brackets — they fit snugly over the teeth and are virtually invisible during wear. Each set of aligners is worn for approximately one to two weeks before being replaced by the next in the series, slowly moving teeth toward the final planned position.',
    'The Invisalign system is designed and manufactured by Align Technology using proprietary SmartTrack® material, which is engineered for a precise, comfortable fit. Treatment plans are created using 3D digital scanning technology — at Boca Dental & Braces, this means no messy physical impressions. Patients can even preview their projected final smile using our digital outcome simulator before treatment begins.',
    'Invisalign can address a wide range of orthodontic issues, including crowded teeth, gaps between teeth, overbites, underbites, crossbites, and open bites. It is suitable for teens and adults and is available at all 9 Boca Dental & Braces locations across Las Vegas.',
  ],
  keyFacts: [
    { value: '10M+',      label: 'Patients treated worldwide with Invisalign' },
    { value: '6–18 months', label: 'Average treatment duration for most cases' },
    { value: '22 hrs/day',  label: 'Recommended daily wear for best results' },
  ],

  signsLabel: 'Signs You May Need Orthodontic Treatment',
  signs: [
    'Your teeth are visibly crowded, overlapping, or crooked',
    'You have noticeable gaps or spaces between teeth',
    "Your upper and lower teeth don't come together properly when you bite (overbite, underbite, or crossbite)",
    'You experience jaw pain, clicking, or tension — sometimes related to bite misalignment',
    'You avoid smiling in photos or feel self-conscious about your teeth',
    'You have difficulty properly cleaning between crowded teeth, leading to recurring cavities or gum irritation',
  ],
  candidacyLabel: 'Who Is a Good Candidate for Invisalign?',
  candidacy: [
    'Teens and adults with mild to moderate misalignment, crowding, spacing, or bite issues',
    "Patients who want a discreet treatment option that doesn't affect their appearance during treatment",
    'People with active lifestyles, including athletes and musicians, who prefer a removable appliance',
    'Adults who have experienced post-braces relapse and want to correct shifting teeth',
    'Patients committed to wearing aligners for 20–22 hours per day for the duration of treatment',
  ],
  candidacyCaveat:
    'Invisalign may not be the best fit for very young children (whose teeth are still developing) or for highly complex bite corrections that require surgical intervention. Your Boca Dental orthodontist will advise you on the most appropriate treatment at your free consultation.',

  processHeader: 'What Is the Process of Getting Invisalign?',
  processIntro:  "At Boca Dental & Braces, here's what you can expect from your first visit to your final retainer — all at a location near you across Las Vegas.",
  steps: [
    { number: '01', title: 'Free Consultation & Smile Assessment',
      body: "Your journey begins with a no-cost consultation with our orthodontic team. We'll review your dental history, discuss your smile goals, and evaluate your teeth and bite to determine whether Invisalign is the right treatment for you. No pressure, no commitment — just answers." },
    { number: '02', title: '3D Digital Scan (No Impressions)',
      body: "If Invisalign is a good fit, we use a digital iTero intraoral scanner to create a precise 3D model of your teeth in minutes. No goopy impression trays. You can also preview your projected final smile using the iTero Outcome Simulator before your first aligner is even made." },
    { number: '03', title: 'Custom Treatment Plan',
      body: "Dr. Loveland designs your personalized treatment plan, mapping the exact movements your teeth will make at every stage. You'll know upfront how many aligners are in your series, the estimated treatment duration, and what your smile will look like at the end." },
    { number: '04', title: 'Receive Your Aligners & Begin Treatment',
      body: "Your custom aligners are fabricated by Align Technology and delivered to our clinic. You'll pick up your first sets and receive full instructions on wear, care, and what to expect as your teeth begin to move. Each set of aligners is worn for 1–2 weeks." },
    { number: '05', title: 'Progress Check-Ins (Every 6–8 Weeks)',
      body: "You'll visit us roughly every 6–8 weeks so we can confirm your teeth are moving on schedule and provide your next sets of aligners. These appointments are typically short — no tightening or adjustments like traditional braces." },
    { number: '06', title: 'Final Reveal & Retainers',
      body: "Once treatment is complete, we'll take a final scan to confirm your smile matches the original plan. You'll then be fitted for a retainer to maintain your results. Wearing your retainer as directed keeps your new smile exactly where it should be." },
  ],
  duration:
    'Most Invisalign cases at Boca Dental & Braces are completed in 6 to 18 months. Minor corrections can take as little as 6 months. More complex alignment issues may require up to 18–24 months. Your specific timeline will be determined at your free consultation.',
  technology:
    'Boca Dental & Braces uses the iTero Element® intraoral scanner for all Invisalign cases — a digital 3D scanning system that creates a highly accurate model of your teeth without physical impressions. The same scanner powers the iTero Outcome Simulator, which allows patients to preview their post-treatment smile before committing to a plan.',

  benefitsHeader: 'The Benefits of Invisalign: Why Patients Choose Clear Aligners',
  benefits: [
    { icon: 'Eye',         label: 'Nearly Invisible',
      body: "Invisalign aligners are made from a virtually transparent material, making them almost undetectable during wear. Most people won't know you're in treatment." },
    { icon: 'Sparkles',    label: 'Removable & Convenient',
      body: 'Remove your aligners to eat, drink, brush, and floss. No dietary restrictions, no special cleaning tools, and no awkward food traps like traditional braces.' },
    { icon: 'Smile',       label: 'Comfortable Fit',
      body: 'Smooth, custom-fitted plastic with no metal brackets or wires means far less irritation to your gums, cheeks, and tongue throughout your entire treatment.' },
    { icon: 'Target',      label: 'Predictable Results',
      body: 'Every movement is digitally planned before treatment begins. You can see your projected final smile before your first aligner is made — no surprises.' },
    { icon: 'CircleCheck', label: 'Excellent Oral Hygiene',
      body: 'Because aligners come out for brushing and flossing, maintaining proper oral hygiene during Invisalign treatment is significantly easier than with fixed braces.' },
    { icon: 'Calendar',    label: 'Fewer Office Visits',
      body: 'Check-ins every 6–8 weeks, compared to the more frequent visits required for adjustments with metal braces — ideal for busy Las Vegas schedules.' },
  ],
  comparison: {
    thisLabel: 'Invisalign',
    altLabel:  'Traditional Braces',
    rows: [
      { factor: 'Appearance',         thisValue: 'Virtually invisible clear plastic', altValue: 'Visible metal brackets and wires' },
      { factor: 'Removability',       thisValue: 'Fully removable for eating, drinking & hygiene', altValue: 'Fixed — cannot be removed during treatment' },
      { factor: 'Diet restrictions',  thisValue: 'None — remove before meals', altValue: 'Avoid sticky, hard, crunchy foods' },
      { factor: 'Comfort',            thisValue: 'Smooth plastic — no wire irritation', altValue: 'Wires and brackets can cause soreness and cuts' },
      { factor: 'Hygiene',            thisValue: 'Standard brushing and flossing', altValue: 'Requires special tools; harder to keep clean' },
      { factor: 'Check-in frequency', thisValue: 'Every 6–8 weeks', altValue: 'Every 4–6 weeks for tightening' },
      { factor: 'Treatment time',     thisValue: '6–18 months (most cases)', altValue: '12–24 months (average)' },
      { factor: 'Effectiveness',      thisValue: 'Mild to moderate cases; also complex cases', altValue: 'Mild to severe cases including complex movements' },
    ],
  },

  differentiators: [
    'Free Invisalign consultations — no cost, no commitment to get started',
    'Orthodontic treatment available at all 9 Las Vegas locations for maximum convenience',
    'Accepts most major PPO dental insurance plans; our team verifies your benefits at no charge before treatment begins',
    'Flexible payment options including CareCredit financing and in-house payment plans',
    'Evening and weekend appointment availability to fit around your work or school schedule',
    'Bilingual staff (English and Spanish) at multiple locations',
  ],
  providerInline: {
    sentence:
      'Invisalign treatment at Boca Dental & Braces is overseen by Dr. Kelcey Loveland, our board-eligible orthodontist with advanced training in clear aligner therapy. Dr. Loveland personally reviews and approves every Invisalign treatment plan developed at our Las Vegas clinics.',
    providerSlug: 'dr-kelcey-loveland',
  },
  nineLocationStatement:
    'Invisalign is available at all 9 Boca Dental & Braces clinics across Las Vegas, including locations near Bonanza & Eastern, Russell & Eastern, Sahara & Decatur, Charleston & Lamb, Flamingo & Torrey Pines, Cheyenne Commons, Beltway Marketplace, and Jones & I-95. Our Boca Kids Dentistry location also offers Invisalign Teen for younger patients.',

  faqs: [
    { question: 'How much does Invisalign cost in Las Vegas?',
      answer: 'Invisalign treatment in Las Vegas typically ranges from $3,000 to $7,000, depending on the complexity of your case, the number of aligners required, and the length of treatment. At Boca Dental & Braces, we offer flexible financing through CareCredit and in-house payment plans to make treatment accessible on any budget. We also accept most major PPO dental insurance plans, which often cover a portion of orthodontic treatment — our team will verify your benefits at no cost before you begin.' },
    { question: 'Does dental insurance cover Invisalign?',
      answer: 'Many PPO dental and orthodontic insurance plans cover Invisalign the same way they cover traditional braces — typically up to your plan\'s annual or lifetime orthodontic maximum. Coverage varies by plan, so it is important to verify your specific benefits before starting treatment. The team at Boca Dental & Braces will perform a complimentary benefits check and provide you with your estimated out-of-pocket cost before your first aligner is made.' },
    { question: 'How long does Invisalign treatment take?',
      answer: 'Most Invisalign cases at Boca Dental & Braces are completed in 6 to 18 months. Minor corrections, such as closing small gaps or straightening mildly crowded teeth, can be resolved in as little as 6 months. More complex alignment or bite issues may require 18 to 24 months of treatment. Your exact treatment timeline will be determined during your free consultation and mapped out in your personalized digital treatment plan.' },
    { question: 'Is Invisalign painful?',
      answer: 'Invisalign aligners are generally more comfortable than traditional metal braces. Patients may experience mild soreness or pressure for a day or two after switching to a new set of aligners — this is a sign the aligners are working and your teeth are moving. There are no sharp wires or metal brackets to cause irritation. Most patients find the discomfort manageable and short-lived.' },
    { question: 'Can I eat and drink with Invisalign?',
      answer: 'Yes — one of the biggest advantages of Invisalign is that the aligners are completely removable. You remove them before eating or drinking anything other than plain water. This means there are no dietary restrictions: you can enjoy all your favorite foods throughout treatment. Simply brush your teeth before reinserting your aligners after meals.' },
    { question: 'Is Invisalign available for teens?',
      answer: 'Yes. Boca Dental & Braces offers Invisalign Teen, a version of the Invisalign system specifically designed for adolescent patients. Invisalign Teen includes compliance indicators (small blue dots that fade with wear) to help parents and orthodontists track usage, and includes replacement aligners in case any are lost. It is available at all of our Las Vegas locations, including our Boca Kids Dentistry clinic.' },
    { question: 'How is Invisalign different from at-home aligner kits?',
      answer: "Invisalign treatment at Boca Dental & Braces is supervised by a licensed orthodontist, Dr. Kelcey Loveland, from start to finish. At-home aligner kits lack professional supervision, do not include in-person examinations, and have been associated with complications including tooth root damage, gum recession, and bite problems. For a treatment that permanently affects the position of your teeth and jaw, professional oversight is not optional — it is essential." },
    { question: 'How do I get started with Invisalign at Boca Dental & Braces in Las Vegas?',
      answer: "Getting started is simple. Book a free Invisalign consultation online or by phone at any of our 9 Las Vegas locations. At your appointment, Dr. Loveland's team will assess your teeth, answer your questions, and create a digital preview of your projected results. There is no cost and no obligation for the initial consultation." },
  ],

  costHeader: 'How Much Does Invisalign Cost in Las Vegas?',
  costRange: {
    value: '$3,000 – $7,000',
    context:
      "The cost of Invisalign treatment at Boca Dental & Braces in Las Vegas typically ranges from $3,000 to $7,000. Your final cost depends on the complexity of your case, the number of aligner sets needed, and the projected treatment duration. Patients requiring minor corrections tend to fall toward the lower end of this range, while more comprehensive full-arch alignment or bite corrections may cost more. Every Invisalign case is different, which is why we provide a detailed cost estimate at your free consultation — based on your actual scan and treatment plan, not a generic quote.",
  },
  inlineCTA:
    'Get a personalized Invisalign cost estimate with no obligation. Book your free consultation at any of our 9 Las Vegas locations and our team will walk you through your treatment plan and financing options before you commit to anything.',

  relatedSlugs: ['braces', 'teen-dentistry', 'retainers', 'teeth-whitening'],

  geoParagraph:
    'Boca Dental & Braces offers Invisalign clear aligner treatment at all 9 of its Las Vegas dental clinics, including locations near Bonanza & Eastern, Russell & Eastern, Sahara & Decatur, Charleston & Lamb, Flamingo & Torrey Pines, Cheyenne Commons, Beltway Marketplace, Jones & I-95, and our Boca Kids Dentistry location. Patients across Las Vegas can access affordable Invisalign treatment with flexible financing and free consultations at the location most convenient to them.',
}

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  invisalign: INVISALIGN,
}

/** Look up full content by service slug; undefined falls back to scaffold copy. */
export function serviceContentFor(slug: string): ServiceContent | undefined {
  return SERVICE_CONTENT[slug]
}
