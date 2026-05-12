import { useEffect, useState } from 'react'

// Variant A — Modern Clinic
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { Services } from './components/Services/Services'
import { WhyBoca } from './components/WhyBoca/WhyBoca'
import { Steps } from './components/Steps/Steps'
import { BocaKids } from './components/BocaKids/BocaKids'
import { Testimonials } from './components/Testimonials/Testimonials'
import { FAQ } from './components/FAQ/FAQ'
import { Financing } from './components/Financing/Financing'
import { Locations } from './components/Locations/Locations'
import { CTA } from './components/CTA/CTA'
import { ConsultationForm } from './components/ConsultationForm/ConsultationForm'
import { Footer } from './components/Footer/Footer'

// Variant B — Warm Editorial
import { HeroV2 } from './components/v2/HeroV2'
import { ServicesV2 } from './components/v2/ServicesV2'
import { WhyBocaV2 } from './components/v2/WhyBocaV2'
import { CTAv2 } from './components/v2/CTAv2'

// Variant C — Super Modern
import { HeaderV3 } from './components/v3/HeaderV3'
import { HeroV3 } from './components/v3/HeroV3'
import { ServicesV3 } from './components/v3/ServicesV3'
import { WhyBocaV3 } from './components/v3/WhyBocaV3'
import { StepsV3 } from './components/v3/StepsV3'
import { BocaKidsV3 } from './components/v3/BocaKidsV3'
import { TestimonialsV3 } from './components/v3/TestimonialsV3'
import { FAQV3 } from './components/v3/FAQV3'
import { FinancingV3 } from './components/v3/FinancingV3'
import { LocationsV3 } from './components/v3/LocationsV3'
import { ConsultationFormV3 } from './components/v3/ConsultationFormV3'
import { CTAv3 } from './components/v3/CTAv3'
import { FooterV3 } from './components/v3/FooterV3'

// Variant D — Futuristic Light
import { HeaderV4 } from './components/v4/HeaderV4'
import { HeroV4 } from './components/v4/HeroV4'
import { ServicesV4 } from './components/v4/ServicesV4'
import { WhyBocaV4 } from './components/v4/WhyBocaV4'
import { StepsV4 } from './components/v4/StepsV4'
import { BocaKidsV4 } from './components/v4/BocaKidsV4'
import { TestimonialsV4 } from './components/v4/TestimonialsV4'
import { FAQV4 } from './components/v4/FAQV4'
import { FinancingV4 } from './components/v4/FinancingV4'
import { LocationsV4 } from './components/v4/LocationsV4'
import { ConsultationFormV4 } from './components/v4/ConsultationFormV4'
import { CTAv4 } from './components/v4/CTAv4'
import { FooterV4 } from './components/v4/FooterV4'

// Shared (Treysyde spec sections — drop in across all variants)
import { TrustBar } from './components/shared/TrustBar'
import { AudienceRouting } from './components/shared/AudienceRouting'
import { MeetTheTeam } from './components/shared/MeetTheTeam'

import { VariantSwitcher, type Variant } from './components/VariantSwitcher'
import { INITIAL_DATA } from './data/initialData'

function readVariantFromUrl(): Variant {
  if (typeof window === 'undefined') return 'a'
  const v = new URLSearchParams(window.location.search).get('variant')
  if (v === 'b') return 'b'
  if (v === 'c') return 'c'
  if (v === 'd') return 'd'
  return 'a'
}

function App() {
  const [variant, setVariant] = useState<Variant>('a')

  useEffect(() => {
    setVariant(readVariantFromUrl())
    const onPop = () => setVariant(readVariantFromUrl())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const switchVariant = (next: Variant) => {
    setVariant(next)
    const params = new URLSearchParams(window.location.search)
    if (next === 'a') params.delete('variant')
    else params.set('variant', next)
    const qs = params.toString()
    const url = window.location.pathname + (qs ? '?' + qs : '')
    window.history.replaceState({}, '', url)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }

  return (
    <div>
      {/*
        Homepage section order follows Treysyde 10-section spec:
        Hero → TrustBar → S2 AudienceRouting → S3 Services → S4 WhyBoca →
        S5 Testimonials → S6 Locations → S8 MeetTheTeam → S9 FAQ → S10 CTA
        + bonus sections (Steps, BocaKids, Financing, Form) tucked between
        spec sections for richer demo. S7 Smile Transformations deferred to Phase 2.
      */}

      {/* ────────── VARIANT A — Modern Clinic ────────── */}
      {variant === 'a' && (
        <>
          <Header
            brand={INITIAL_DATA.brand}
            announcement={INITIAL_DATA.announcement}
          />
          <Hero brand={INITIAL_DATA.brand} />
          <TrustBar theme="light" />
          <AudienceRouting theme="light" />
          <Services />
          <WhyBoca />
          <Steps />
          <Testimonials />
          <BocaKids />
          <Locations />
          <MeetTheTeam theme="light" />
          <Financing />
          <FAQ />
          <ConsultationForm />
          <CTA />
          <Footer />
        </>
      )}

      {/* ────────── VARIANT B — Warm Editorial ────────── */}
      {variant === 'b' && (
        <>
          <Header
            brand={INITIAL_DATA.brand}
            announcement={INITIAL_DATA.announcement}
          />
          <HeroV2 brand={INITIAL_DATA.brand} />
          <TrustBar theme="cream" />
          <AudienceRouting theme="cream" />
          <ServicesV2 />
          <WhyBocaV2 />
          <Steps />
          <Testimonials />
          <BocaKids />
          <Locations />
          <MeetTheTeam theme="cream" />
          <Financing />
          <FAQ />
          <ConsultationForm />
          <CTAv2 />
          <Footer />
        </>
      )}

      {/* ────────── VARIANT C — Super Modern (Dark) ────────── */}
      {variant === 'c' && (
        <>
          <HeaderV3
            brand={INITIAL_DATA.brand}
            announcement={INITIAL_DATA.announcement}
          />
          <HeroV3 brand={INITIAL_DATA.brand} />
          <TrustBar theme="dark" />
          <AudienceRouting theme="dark" />
          <ServicesV3 />
          <WhyBocaV3 />
          <StepsV3 />
          <TestimonialsV3 />
          <BocaKidsV3 />
          <LocationsV3 />
          <MeetTheTeam theme="dark" />
          <FinancingV3 />
          <FAQV3 />
          <ConsultationFormV3 />
          <CTAv3 />
          <FooterV3 />
        </>
      )}

      {/* ────────── VARIANT D — Futuristic Light ────────── */}
      {variant === 'd' && (
        <>
          <HeaderV4
            brand={INITIAL_DATA.brand}
            announcement={INITIAL_DATA.announcement}
          />
          <HeroV4 brand={INITIAL_DATA.brand} />
          <TrustBar theme="light" />
          <AudienceRouting theme="light" />
          <ServicesV4 />
          <WhyBocaV4 />
          <StepsV4 />
          <TestimonialsV4 />
          <BocaKidsV4 />
          <LocationsV4 />
          <MeetTheTeam theme="light" />
          <FinancingV4 />
          <FAQV4 />
          <ConsultationFormV4 />
          <CTAv4 />
          <FooterV4 />
        </>
      )}

      <VariantSwitcher current={variant} onChange={switchVariant} />
    </div>
  )
}

export default App
