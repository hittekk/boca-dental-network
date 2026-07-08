import json

# ── column-backed meta (from doc PAGE META) ──
cols = {
    "slug": "dental-exams-cleanings",
    "category_slug": "general-dentistry",
    "label": "Dental Exams & Cleanings",
    "short_desc": "Comprehensive exams, digital X-rays, and professional teeth cleanings at all 9 Boca Dental & Braces locations across Las Vegas.",
    "title_tag": "Dental Exams & Cleanings in Las Vegas, NV | Boca Dental & Braces",
    "meta_description": "Professional dental exams and cleanings at 9 Las Vegas locations. Boca Dental & Braces — Nevada Medicaid accepted, most PPO insurance, same-week appointments. Book now.",
    "primary_keyword": "dental exam Las Vegas NV",
    "secondary_keywords": [
        "teeth cleaning Las Vegas","dental cleaning near me Las Vegas",
        "dentist checkup Las Vegas NV","dental exam Henderson NV",
        "Summerlin dentist cleaning","North Las Vegas dental exam",
    ],
    "h1": "Dental Exams & Cleanings in Las Vegas, NV — 9 Locations, No Waiting at Boca Dental & Braces",
    "hero_intro": ("Las Vegas never stops — and neither should your dental health. Boca Dental & Braces makes it "
        "easier than ever to stay current with your cleanings and checkups, with 9 convenient locations across "
        "the Las Vegas valley. Whether you're in Summerlin, Henderson, North Las Vegas, or anywhere in between, "
        "there's a Boca location near you. Most PPO insurance accepted. Nevada Medicaid welcome. New patients "
        "seen promptly — no months-long waits."),
    "hero_alt": "Dental exams and cleanings in Las Vegas at Boca Dental & Braces.",
    "is_pediatric": False,
    "is_published": True,
    "sort_order": 1,
}

# ── content jsonb (the 11-section body, camelCase to match ServiceContent) ──
content = {
  "whatIsHeader": "Why Las Vegas Residents Shouldn't Skip Their Dental Cleanings",
  "whatIsBody": [
    "Las Vegas presents unique oral health challenges that make regular professional care especially important. The Mojave Desert's low humidity accelerates dry mouth — reducing saliva flow and increasing cavity and gum disease risk. Hospitality workers, casino employees, and outdoor workers are particularly affected.",
    "The city's 24/7 lifestyle adds to the risk. Irregular sleep schedules, shift work, stress, and frequent dining out increase exposure to sugar and acid, along with habits that elevate dental risk. A twice-yearly cleaning is the check-in your smile needs to stay ahead of problems before they start.",
    "Las Vegas also has a large population of residents who have gone years without dental care — due to insurance gaps, cost concerns, or busy lives. Boca's 9 locations, extended hours, and Nevada Medicaid acceptance make getting back on track genuinely accessible.",
  ],
  "keyFacts": [
    {"value": "9", "label": "Las Vegas valley locations"},
    {"value": "Every 6 mo", "label": "Recommended cleaning interval for most patients"},
    {"value": "45–90 min", "label": "Typical exam & cleaning visit"},
  ],
  "signsLabel": "Signs It's Time for a Dental Exam or Cleaning",
  "signs": [
    "It has been more than six months since your last professional cleaning",
    "Your gums bleed when you brush or floss",
    "You notice visible tartar buildup or staining on your teeth",
    "You have persistent bad breath that brushing doesn't resolve",
    "You're new to the area or have gone years without seeing a dentist",
    "You have increased tooth sensitivity or notice food trapping between teeth",
  ],
  "candidacyLabel": "Who Should Schedule Regular Exams & Cleanings?",
  "candidacy": [
    "Adults due for their twice-yearly preventive cleaning and checkup",
    "New patients who haven't seen a dentist in years and want to get back on track",
    "Families looking for a practice that accepts Nevada Medicaid for kids",
    "Patients with a history of gum disease, who often benefit from 3–4 month intervals",
    "Anyone with dry mouth, high cavity risk, or tobacco use who needs closer monitoring",
  ],
  "candidacyCaveat": "If your exam reveals active gum disease, your Boca dentist may recommend a deep cleaning (scaling and root planing) and a more frequent maintenance schedule rather than a standard cleaning. We'll explain exactly what you need before any treatment begins.",
  "processHeader": "What to Expect at Your Boca Dental Exam & Cleaning in Las Vegas",
  "processIntro": "Here's what a comprehensive exam and cleaning looks like at Boca Dental & Braces — from check-in to your next appointment.",
  "steps": [
    {"number":"01","title":"Check-In & Medical History Review","body":"A brief review of any health changes, medications, or concerns since your last visit. New patient forms can be completed in advance or on arrival."},
    {"number":"02","title":"Digital X-Rays (if due)","body":"Low-dose digital radiographs for cavity detection, bone-level assessment, and a full diagnostic picture. Typically needed annually or at new-patient visits."},
    {"number":"03","title":"Professional Cleaning","body":"Your hygienist removes plaque, tartar, and biofilm from all tooth surfaces — including below the gumline and between teeth where brushing can't reach — then polishes your teeth."},
    {"number":"04","title":"Periodontal Charting","body":"Gum pocket depths are measured at six points per tooth to assess gum health and detect early periodontal disease."},
    {"number":"05","title":"Dentist Exam","body":"A full clinical exam of teeth, gums, bite, jaw joints, and soft tissue. Digital X-rays are reviewed and an oral cancer screening is performed."},
    {"number":"06","title":"Treatment Discussion","body":"Any findings are explained clearly, treatment options are reviewed, and your next appointment is scheduled before you leave."},
  ],
  "duration": "Plan for 60–90 minutes for a comprehensive new-patient exam, and 45–60 minutes for a routine recall cleaning. Most patients are seen, cleaned, and out the door within the hour.",
  "technology": "Boca Dental & Braces uses low-dose digital radiography for sharp, immediate imaging with a fraction of the radiation of older film X-rays, along with digital periodontal charting to track gum health precisely from visit to visit.",
  "benefitsHeader": "Why Patients Choose Boca for Exams & Cleanings",
  "benefits": [
    {"icon":"Target","label":"9 Valley Locations","body":"The most convenient dental network in Clark County — there's a Boca location near your home or work, wherever you are in the valley."},
    {"icon":"Calendar","label":"Evening & Saturday Hours","body":"Appointments available outside the 9-to-5 at most locations, so a cleaning never has to mean a day off work."},
    {"icon":"CircleCheck","label":"Medicaid & PPO Accepted","body":"Nevada Medicaid (DHCFP) accepted, along with most major PPO plans — we verify your benefits before your visit."},
    {"icon":"Sparkles","label":"Comprehensive In-House Care","body":"From cleanings to specialty treatment, most needs are handled in-house — no chasing referrals across town."},
    {"icon":"Smile","label":"Se Habla Español","body":"Bilingual staff at all locations make every step of your visit clear and comfortable."},
    {"icon":"Eye","label":"Thorough, Honest Exams","body":"Every cleaning includes a full clinical exam and oral cancer screening — catching small issues before they become big ones."},
  ],
  "differentiators": [
    "9 Las Vegas valley locations — the most convenient dental network in Clark County",
    "Evening and Saturday appointments available at most locations",
    "Nevada Medicaid (DHCFP) accepted — dental care accessible for all Las Vegas families",
    "Most major PPO insurance plans accepted, with complimentary benefits verification",
    "Bilingual (English and Spanish) staff at every location",
    "Comprehensive in-house care — no referrals needed for most dental needs",
    "A dedicated pediatric location for kids' preventive care",
  ],
  "providerInline": {
    "sentence": "Every exam at Boca Dental & Braces is performed by a licensed Nevada dentist, with cleanings carried out by experienced dental hygienists. Your care team reviews your X-rays, screens for oral cancer, and walks you through anything they find — so you always leave knowing exactly where your oral health stands."
  },
  "nineLocationStatement": "Dental exams and cleanings are available at all 9 Boca Dental & Braces clinics across the Las Vegas valley — with convenient locations on Charleston, Rainbow, Eastern, Flamingo, Sahara, and Jones, plus a dedicated pediatric office. There's a Boca location near you, open six days a week.",
  "faqs": [
    {"question":"How often do I need a dental cleaning in Las Vegas?","answer":"Most adults benefit from a professional cleaning every 6 months. Patients with a history of gum disease, high cavity risk, dry mouth, or tobacco use may benefit from 3–4 month intervals. Your Boca dentist will recommend the appropriate schedule based on your specific oral health profile at your first exam."},
    {"question":"Does Boca Dental & Braces accept Nevada Medicaid?","answer":"Yes. Boca Dental & Braces accepts Nevada Medicaid (DHCFP) at all 9 Las Vegas valley locations. Medicaid covers dental exams, cleanings, X-rays, and most necessary dental treatment for qualifying adults and children. Call your nearest location to confirm your specific coverage."},
    {"question":"What is included in a new patient dental exam at Boca?","answer":"Your first comprehensive exam includes digital X-rays, a full clinical exam, periodontal charting, an oral cancer screening, a professional cleaning (in most cases completed the same visit), and a complete treatment plan discussion. New patient exams at Boca are thorough — plan for 60–90 minutes."},
    {"question":"Do you offer same-day dental cleaning appointments in Las Vegas?","answer":"We do our best to accommodate same-day and next-day appointments across our 9 Las Vegas locations. Book online or call, and our scheduling team will find the nearest available opening across all locations."},
    {"question":"Do I need to fast before a dental cleaning?","answer":"No — you don't need to fast before a routine dental exam or cleaning. We recommend brushing and flossing before your appointment. If you're scheduled for a procedure requiring sedation, you'll receive specific pre-procedure fasting instructions."},
  ],  "inlineCTA": "Not sure what's covered? Our team verifies your insurance benefits at no charge before your appointment, and flexible payment and financing options are available for any treatment you may need. Book your cleaning today and we'll handle the rest.",
  "relatedSlugs": ["gum-disease-treatment","scaling-root-planing","teeth-whitening","childrens-exams-cleanings","emergency-dental-care"],
  "geoParagraph": "Boca Dental & Braces provides professional dental exams and cleanings at 9 locations across the Las Vegas valley — serving Henderson, Summerlin, North Las Vegas, Enterprise, Spring Valley, Whitney, Sunrise Manor, Paradise, and all of Clark County. Nevada Medicaid accepted. New patients are always welcome.",
}

def dq(s): return "$boca$" + s + "$boca$"
kw = "ARRAY[" + ",".join(dq(k) for k in cols["secondary_keywords"]) + "]::text[]"
sql = f"""DELETE FROM service_pages WHERE slug = 'dental-exams-cleanings';
INSERT INTO service_pages
 (slug, category_slug, label, short_desc, title_tag, meta_description,
  primary_keyword, secondary_keywords, h1, hero_intro, hero_alt, content,
  is_pediatric, is_published, sort_order)
VALUES (
 {dq(cols['slug'])}, {dq(cols['category_slug'])}, {dq(cols['label'])},
 {dq(cols['short_desc'])}, {dq(cols['title_tag'])}, {dq(cols['meta_description'])},
 {dq(cols['primary_keyword'])}, {kw}, {dq(cols['h1'])},
 {dq(cols['hero_intro'])}, {dq(cols['hero_alt'])},
 {dq(json.dumps(content, ensure_ascii=False))}::jsonb,
 {str(cols['is_pediatric']).lower()}, {str(cols['is_published']).lower()}, {cols['sort_order']}
);"""
open("/tmp/seed_dec.sql","w").write(sql)
print("SQL bytes:", len(sql), "| content keys:", len(content), "| faqs:", len(content['faqs']), "| steps:", len(content['steps']), "| benefits:", len(content['benefits']))
print("delimiter-safe:", "$boca$" not in json.dumps(content))
