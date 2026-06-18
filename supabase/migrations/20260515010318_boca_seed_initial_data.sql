-- Seed locations from INITIAL_DATA
insert into public.locations (legacy_id, slug, label, address, city, state, zip, phone, hours, is_kids_clinic, rating, review_count, neighborhood, narrative, gbp_id, languages, sort_order) values
(1, 'russell-eastern', 'Russell & Eastern', '5642 S Eastern Ave, Ste B', 'Las Vegas', 'NV', '89119', '(702) 984-3678', 'Mon–Fri 9am–7pm · Sat 9am–7pm', false, 4.9, 312, 'Southeast Las Vegas',
'Our Russell & Eastern clinic is the original Boca Dental & Braces location, anchoring Southeast Las Vegas just north of the 215 Beltway and a short drive from McCarran International, Henderson, and the Sunset Park corridor. The office sits inside the Eastern Marketplace plaza, with free parking right at the door and Spanish-speaking staff on every shift. We see a steady mix of working families from the 89119 and 89120 ZIP codes, hospitality-industry employees coming off late shifts on the Strip, and longtime patients who have been with us since 2006. Same-day emergency appointments, Saturday hours, and most major insurance — including Nevada Medicaid — are all available here.',
'ChIJ-russell-eastern-placeholder', '{English,Spanish}', 1),

(2, 'boca-kids-dentistry', 'Boca Kids Dentistry', '5642 S Eastern Ave, Ste F', 'Las Vegas', 'NV', '89119', '(702) 389-1543', 'Mon–Fri 9am–7pm · Sat 9am–7pm', true, 4.9, 198, 'Southeast Las Vegas',
'Boca Kids Dentistry is a fully dedicated pediatric dental office sharing the same plaza as our Russell & Eastern flagship adult clinic — different door, kid-scaled everything inside. We designed this space specifically for babies, kids, and teens in the Southeast Las Vegas community: low-lit private rooms for nervous first visits, an open-bay layout for siblings, ceiling-mounted screens, and a sensory-quiet treatment room for kids with autism spectrum needs. Most families come from the Whitney, Paradise, and Henderson border neighborhoods. We accept Nevada Medicaid and CHIP, see infants from age one for first-tooth visits, and offer Saturday appointments so school is never missed. Spanish-speaking pediatric assistants are on staff daily.',
'ChIJ-boca-kids-dentistry-placeholder', '{English,Spanish}', 2),

(3, 'bonanza-eastern', 'Bonanza & Eastern', '556 N Eastern Ave, Ste I', 'Las Vegas', 'NV', '89101', '(702) 960-4484', 'Mon–Fri 9am–7pm · Sat 9am–3pm', false, 4.8, 156, 'Downtown Las Vegas',
'Our Bonanza & Eastern office serves Downtown Las Vegas and the Cultural Corridor — patients walking over from the Las Vegas Medical District, residents in the historic John S. Park and Huntridge neighborhoods, and a daily flow of casino and resort workers from the Fremont East Entertainment District. The clinic is on N Eastern Ave just south of Charleston, with a covered entry and 14 dedicated parking spaces. Many of our patients here are bilingual, and our hygiene team includes Spanish, Tagalog, and Mandarin speakers. Same-day emergency slots are reserved every morning for walk-in toothaches and dental trauma — a real need in a downtown that runs 24 hours.',
'ChIJ-bonanza-eastern-placeholder', '{English,Spanish,Tagalog,Mandarin}', 3),

(4, 'sahara-decatur', 'Sahara & Decatur', '4750 W Sahara Ave, Ste 12', 'Las Vegas', 'NV', '89102', '(702) 381-7059', 'Mon–Fri 9am–7pm · Sat 9am–7pm', false, 4.8, 203, 'West Las Vegas',
'Sahara & Decatur is our West Las Vegas anchor — a busy corner where Las Vegas residents from Spring Valley, Chinatown, and the Meadows neighborhood converge daily. Our office is inside the Sahara West Plaza, one block east of the 215 Beltway, with bus stops served by RTC routes 119 and 204 directly out front. We see a wide cross-section of patients here: families from the Las Vegas Chinatown corridor (we have Mandarin- and Cantonese-speaking front desk staff), retirees from nearby 55+ communities, and shift workers from the medical offices along W Sahara Ave. The clinic offers same-day crowns through CEREC, in-office whitening, and Saturday hours for working parents.',
'ChIJ-sahara-decatur-placeholder', '{English,Mandarin,Cantonese}', 4),

(5, 'jones-i95', 'Jones & I-95', '240 N Jones Blvd, Ste B', 'Las Vegas', 'NV', '89107', '(702) 508-0755', 'Mon–Fri 9am–7pm · Sat 9am–3pm', false, 4.7, 134, 'West Las Vegas',
'The Jones & I-95 clinic sits just off Charleston Boulevard in Westside Las Vegas, with easy access from the U.S. 95 freeway interchange. Most patients here are West Las Vegas residents from the 89107 and 89108 ZIPs — a tight-knit, multigenerational community where dental care often spans grandparents, parents, and kids inside the same family folder. We focus heavily on preventive care, periodontal maintenance, and restorative work for older adults, plus pediatric exams for kids referred over from Boca Kids Dentistry. The office accepts Nevada Medicaid and offers in-house payment plans with no credit check. Parking is free and the entrance is fully wheelchair accessible.',
'ChIJ-jones-i95-placeholder', '{English,Spanish}', 5),

(6, 'charleston-lamb', 'Charleston & Lamb', '4235 E Charleston Blvd', 'Las Vegas', 'NV', '89104', '(702) 505-9180', 'Mon–Fri 9am–7pm · Sat 9am–7pm', false, 4.8, 178, 'East Las Vegas',
'Charleston & Lamb is our East Las Vegas office, serving the dense residential corridors along E Charleston Boulevard from Maryland Parkway out to Boulder Highway. This is one of our busiest clinics for general dentistry, with families from Sunrise Manor, the East Las Vegas Community Center area, and the historic neighborhoods near Bonanza High School filling our chairs daily. We staff six full operatories here, run two hygiene chairs throughout the day, and keep emergency slots open every afternoon for the walk-in toothaches that are common in any high-density urban neighborhood. Spanish is spoken at every front desk shift, and we accept Nevada Medicaid for both adults and children.',
'ChIJ-charleston-lamb-placeholder', '{English,Spanish}', 6),

(7, 'flamingo-torrey', 'Flamingo & Torrey Pines', '6680 W Flamingo Rd, Ste A', 'Las Vegas', 'NV', '89103', '(702) 389-0430', 'Mon–Fri 9am–7pm · Sat 9am–7pm', false, 4.9, 241, 'Spring Valley',
'Flamingo & Torrey Pines is our Spring Valley flagship, sitting on the southwest corner of one of the busiest intersections on the west side of Las Vegas. Patients here come from across Spring Valley, Mountain''s Edge, and the southern reach of Summerlin. The clinic is purpose-built for cosmetic and restorative work — we run an iTero scanner for Invisalign consults, offer same-day veneer try-ins, and have an on-site CEREC mill for single-visit crowns. The neighborhood skews young-professional and family, with patients often booking ortho consults for teens and cosmetic whitening or veneers for parents in the same visit. Evening and Saturday appointments are heavily used by working couples.',
'ChIJ-flamingo-torrey-placeholder', '{English,Spanish}', 7),

(8, 'cheyenne-commons', 'Cheyenne Commons', '3163 N Rainbow Blvd', 'Las Vegas', 'NV', '89108', '(702) 805-1178', 'Mon–Fri 9am–7pm · Sat 9am–3pm', false, 4.7, 112, 'Northwest Las Vegas',
'Our Cheyenne Commons clinic anchors Northwest Las Vegas, serving Centennial Hills, Lone Mountain, the western edge of North Las Vegas, and patients all the way out to the Painted Desert. The office sits inside the Cheyenne Commons retail plaza, with easy access from the U.S. 95 and Cheyenne Avenue interchange. Many of our patients here are growing families — first-time homeowners in the newer subdivisions north of Cheyenne who joined us for a pediatric checkup and stayed for the whole household''s dental care. We offer expanded weekend hours twice a month, accept Nevada Medicaid for children, and run a robust orthodontic program with both Invisalign and traditional braces for teens.',
'ChIJ-cheyenne-commons-placeholder', '{English,Spanish}', 8),

(9, 'beltway-marketplace', 'Beltway Marketplace', 'Eastern Ave & E Serene Ave', 'Las Vegas', 'NV', '89123', '(702) 000-0000', 'Mon–Fri 9am–7pm · Sat 9am–7pm', false, 4.8, 0, 'Southeast Las Vegas',
'Beltway Marketplace is our newest Boca Dental clinic, opening at the southern edge of Las Vegas where the 215 Beltway meets Eastern Avenue near Serene. The location was chosen specifically to serve the rapidly growing Southern Highlands, Mountain''s Edge South, and Inspirada master-planned communities, where many families had been driving north to our Russell & Eastern flagship. The office is modern from the ground up: ten operatories, a dedicated quiet room for sedation, an in-house digital lab, and direct-to-Invisalign scanning. We accept most major PPO plans plus Nevada Medicaid for kids, and we are actively welcoming new patients across general dentistry, ortho, pediatric, and cosmetic services as this neighborhood continues to expand.',
'ChIJ-beltway-marketplace-placeholder', '{English,Spanish}', 9);

-- Seed location FAQs (Russell & Eastern + Boca Kids only — others were empty in INITIAL_DATA)
insert into public.location_faqs (location_id, question, answer, sort_order)
select l.id, 'Does Boca Dental on Eastern Ave accept walk-ins?', 'Yes — we accept walk-ins at our Russell & Eastern location during regular business hours, though we recommend calling ahead to minimize wait times.', 1
from public.locations l where l.slug = 'russell-eastern';

insert into public.location_faqs (location_id, question, answer, sort_order)
select l.id, 'Do you accept Medicaid at the Russell & Eastern office?', 'Yes. Our Russell & Eastern location accepts Nevada Medicaid and CHIP for qualifying patients including children.', 2
from public.locations l where l.slug = 'russell-eastern';

insert into public.location_faqs (location_id, question, answer, sort_order)
select l.id, 'At what age should my child first see a dentist?', 'We recommend a child''s first dental visit by age 1, or within 6 months of their first tooth appearing.', 1
from public.locations l where l.slug = 'boca-kids-dentistry';

insert into public.location_faqs (location_id, question, answer, sort_order)
select l.id, 'Does Boca Kids accept Medicaid for children?', 'Yes. Boca Kids accepts Nevada Medicaid and CHIP. We believe every child deserves quality dental care regardless of budget.', 2
from public.locations l where l.slug = 'boca-kids-dentistry';

-- Seed services
insert into public.services (slug, label, short_description, category, show_on_homepage, sort_order) values
('general-dentistry',     'General Dentistry',     'Exams, cleanings, X-rays, fillings, emergency care',           'General',     true, 1),
('cosmetic-dentistry',    'Cosmetic Dentistry',    'Teeth whitening, veneers, bonding, smile makeovers',           'Cosmetic',    true, 2),
('restorative-dentistry', 'Restorative Dentistry', 'Crowns, bridges, dentures, fillings, cracked tooth repair',    'Restorative', true, 3),
('dental-implants',       'Dental Implants',       'Single tooth, full arch, All-on-4, implant dentures',          'Implants',    true, 4),
('orthodontics',          'Orthodontics',          'Invisalign, traditional braces, teen & adult ortho',           'Orthodontics',true, 5),
('pediatric-dentistry',   'Pediatric Dentistry',   'Kids exams, infant care, sealants, emergency pedo',            'Pediatric',   true, 6),
('sedation-dentistry',    'Sedation Dentistry',    'Nitrous oxide, oral sedation, IV sedation',                    'Sedation',    true, 7),
('oral-surgery',          'Oral Surgery',          'Extractions, wisdom teeth, bone grafting',                     'Surgery',     true, 8),
('periodontal',           'Periodontal Care',      'Gum disease treatment, deep cleaning, maintenance',            'Periodontal', true, 9);

-- Seed doctors
insert into public.doctors (slug, name, title, sort_order) values
('dr-wyatt-dannels',      'Dr. Wyatt Dannels, DDS',      'Lead Dentist & Founder', 1),
('dr-harrison-luu',       'Dr. Harrison Luu, DDS',       'General Dentist',        2),
('dr-sana-fahim',         'Dr. Sana Fahim, DDS',         'General Dentist',        3),
('dr-justin-wall',        'Dr. Justin Wall, DDS',        'General Dentist',        4),
('dr-kelcey-loveland',    'Dr. Kelcey Loveland, DDS',    'General Dentist',        5),
('minh-nguyen',           'Minh Nguyen, DDS',            'General Dentist',        6),
('dr-johnson-fong',       'Dr. Johnson Fong, DDS',       'General Dentist',        7),
('dr-michael-st-laurent', 'Dr. Michael St Laurent, DDS', 'General Dentist',        8),
('dr-bredan-marlin',      'Dr. Bredan Marlin, DDS',      'General Dentist',        9),
('dr-charles-calder',     'Dr. Charles Calder, DDS',     'General Dentist',       10),
('dr-james-yun',          'Dr. James Yun, DDS',          'General Dentist',       11),
('dr-kathy-gonzalez',     'Dr. Kathy Gonzalez, DDS',     'General Dentist',       12),
('dr-cole-thompson',      'Dr. Cole Thompson, DDS',      'General Dentist',       13),
('dr-farhan-hossain',     'Dr. Farhan Hossain, DDS',     'General Dentist',       14);

-- Seed page_meta defaults
insert into public.page_meta (page_key, meta_title, meta_description) values
('home', 'Boca Dental and Braces · 9 Las Vegas Locations · Same-Day Emergency Appointments',
 'Las Vegas''s most trusted dental network — 9 neighborhood clinics, Spanish-speaking staff, Medicaid accepted, same-day emergency care. General, cosmetic, ortho, and pediatric dentistry.');
