/**
 * Mock for window.INITIAL_DATA.
 *
 * In production, the WordPress PHP plugin injects an INITIAL_DATA object
 * onto `window` before the React bundle loads. During local development we
 * import this file instead. Shape must stay in sync with the PHP serializer.
 */

export interface Brand {
  name: string;
  tagline: string;
  phone: string;
  domain: string;
}

export interface LocationFaq {
  q: string;
  a: string;
}

export interface Location {
  id: number;
  slug: string;
  label: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours: string;
  kids: boolean;
  rating: number;
  review_count: number;
  neighborhood: string;
  gbp_id: string;
  faqs: LocationFaq[];
}

export interface Service {
  slug: string;
  label: string;
  desc: string;
}

export interface InitialData {
  site: string;
  brand: Brand;
  locations: Location[];
  services: Service[];
}

export const INITIAL_DATA: InitialData = {
  site: "las-vegas",
  brand: {
    name: "Boca Dental and Braces",
    tagline: "Knocking Out the Competition",
    phone: "(702) 456-0005",
    domain: "bocadentalandbraces.com",
  },
  locations: [
    {
      id: 1,
      slug: "russell",
      label: "Russell",
      address: "5642 S Eastern Ave, Ste B",
      city: "Las Vegas",
      state: "NV",
      zip: "89119",
      phone: "(702) 984-3678",
      hours: "Mon–Fri 9am–7pm · Sat 9am–7pm",
      kids: false,
      rating: 4.9,
      review_count: 312,
      neighborhood: "Southeast Las Vegas",
      gbp_id: "ChIJ-russell-placeholder",
      faqs: [],
    },
    {
      id: 2,
      slug: "russell-kids",
      label: "Russell — Kids",
      address: "5642 S Eastern Ave, Ste F",
      city: "Las Vegas",
      state: "NV",
      zip: "89119",
      phone: "(702) 389-1543",
      hours: "Mon–Fri 9am–7pm · Sat 9am–7pm",
      kids: true,
      rating: 4.9,
      review_count: 198,
      neighborhood: "Southeast Las Vegas",
      gbp_id: "ChIJ-russell-kids-placeholder",
      faqs: [],
    },
    {
      id: 3,
      slug: "bonanza",
      label: "Bonanza",
      address: "556 N Eastern Ave, Ste I",
      city: "Las Vegas",
      state: "NV",
      zip: "89101",
      phone: "(702) 960-4484",
      hours: "Mon–Fri 9am–7pm · Sat 9am–3pm",
      kids: false,
      rating: 4.8,
      review_count: 156,
      neighborhood: "Downtown Las Vegas",
      gbp_id: "ChIJ-bonanza-placeholder",
      faqs: [],
    },
    {
      id: 4,
      slug: "sahara",
      label: "Sahara",
      address: "4750 W Sahara Ave, Ste 12",
      city: "Las Vegas",
      state: "NV",
      zip: "89102",
      phone: "(702) 381-7059",
      hours: "Mon–Fri 9am–7pm · Sat 9am–7pm",
      kids: false,
      rating: 4.8,
      review_count: 203,
      neighborhood: "West Las Vegas",
      gbp_id: "ChIJ-sahara-placeholder",
      faqs: [],
    },
    {
      id: 5,
      slug: "jones",
      label: "Jones",
      address: "240 N Jones Blvd, Ste B",
      city: "Las Vegas",
      state: "NV",
      zip: "89107",
      phone: "(702) 508-0755",
      hours: "Mon–Fri 9am–7pm · Sat 9am–3pm",
      kids: false,
      rating: 4.7,
      review_count: 134,
      neighborhood: "West Las Vegas",
      gbp_id: "ChIJ-jones-placeholder",
      faqs: [],
    },
    {
      id: 6,
      slug: "charleston",
      label: "Charleston",
      address: "4235 E Charleston Blvd",
      city: "Las Vegas",
      state: "NV",
      zip: "89104",
      phone: "(702) 505-9180",
      hours: "Mon–Fri 9am–7pm · Sat 9am–7pm",
      kids: false,
      rating: 4.8,
      review_count: 178,
      neighborhood: "East Las Vegas",
      gbp_id: "ChIJ-charleston-placeholder",
      faqs: [],
    },
    {
      id: 7,
      slug: "flamingo",
      label: "Flamingo",
      address: "6680 W Flamingo Rd, Ste A",
      city: "Las Vegas",
      state: "NV",
      zip: "89103",
      phone: "(702) 389-0430",
      hours: "Mon–Fri 9am–7pm · Sat 9am–7pm",
      kids: false,
      rating: 4.9,
      review_count: 241,
      neighborhood: "Spring Valley",
      gbp_id: "ChIJ-flamingo-placeholder",
      faqs: [],
    },
    {
      id: 8,
      slug: "cheyenne-rainbow",
      label: "Cheyenne & Rainbow",
      address: "3163 N Rainbow Blvd",
      city: "Las Vegas",
      state: "NV",
      zip: "89108",
      phone: "(702) 805-1178",
      hours: "Mon–Fri 9am–7pm · Sat 9am–3pm",
      kids: false,
      rating: 4.7,
      review_count: 112,
      neighborhood: "Northwest Las Vegas",
      gbp_id: "ChIJ-cheyenne-placeholder",
      faqs: [],
    },
    {
      id: 9,
      slug: "eastern-serene",
      label: "Eastern & Serene",
      address: "9210 S Eastern Ave, Ste 130",
      city: "Las Vegas",
      state: "NV",
      zip: "89123",
      phone: "(702) 508-0848",
      hours: "Mon–Fri 9am–7pm · Sat 9am–7pm",
      kids: false,
      rating: 4.8,
      review_count: 167,
      neighborhood: "Henderson Border",
      gbp_id: "ChIJ-eastern-serene-placeholder",
      faqs: [],
    },
  ],
  services: [
    { slug: "general",    label: "General Dentistry",     desc: "Cleanings, exams, fillings, X-rays" },
    { slug: "braces",     label: "Braces & Orthodontics", desc: "Metal, clear, lingual & retainers" },
    { slug: "invisalign", label: "Invisalign",            desc: "Virtually invisible straightening" },
    { slug: "implants",   label: "Dental Implants",       desc: "Single tooth, full arch, same-day" },
    { slug: "whitening",  label: "Teeth Whitening",       desc: "In-office and take-home kits" },
    { slug: "emergency",  label: "Emergency Dental",      desc: "Same-day appointments available" },
    { slug: "kids",       label: "Pediatric Care",        desc: "Kids dentistry from age 1" },
    { slug: "crowns",     label: "Crowns & Veneers",      desc: "Porcelain, zirconia, same-day" },
  ],
};
